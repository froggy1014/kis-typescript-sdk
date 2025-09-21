import fs from 'node:fs';
import path from 'node:path';

// CSV 파일 파싱 함수
interface CSVRow {
  [key: string]: string;
}

function parseCSV(csvContent: string): CSVRow[] {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const data: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values: string[] = [];
    let currentValue = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    if (values.length >= headers.length) {
      const row: CSVRow = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index] || '';
      });
      data.push(row);
    }
  }

  return data;
}

// TR_ID 정리 함수
function cleanTrId(trId: string): string | null {
  if (!trId || trId === '모의투자 미지원' || trId === '') {
    return null;
  }

  // 괄호 안의 설명 제거하고 쉼표로 분리된 첫 번째 값만 사용
  return trId.split(',')[0].replace(/\([^)]*\)/g, '').trim();
}

// URL 정리 함수
function cleanUrl(url: string): string {
  return url.replace(/^\/uapi/, '').trim();
}

// 카테고리 정리 함수
function cleanCategory(category: string): string {
  return category.replace(/[[\]]/g, '').trim();
}

// 메인 처리 함수
function generateTrIdMappings(): void {
  try {
    const csvPath = path.join(process.cwd(), 'kis-api-table.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const data = parseCSV(csvContent);

    console.log(`총 ${data.length}개의 API 처리 중...`);

    const mappings = {};
    const categories = {};
    const apiInfo = {};
    let realCount = 0;
    let mockCount = 0;
    let totalCount = 0;

    data.forEach((row) => {
      const url = cleanUrl(row['URL 명']);
      const realTrId = cleanTrId(row['실전 TR_ID']);
      const mockTrId = cleanTrId(row['모의 TR_ID']);
      const apiName = row['API 명'];
      const category = cleanCategory(row['메뉴 위치']);
      const method = row['HTTP Method'];

      if (!url || url === '/hashkey') {
        return; // hashkey는 TR_ID가 필요 없음
      }

      totalCount++;

      // 매핑 정보 저장
      if (realTrId || mockTrId) {
        mappings[url] = {};

        if (realTrId) {
          mappings[url].real = realTrId;
          realCount++;
        }

        if (mockTrId && mockTrId !== '모의투자 미지원') {
          mappings[url].mock = mockTrId;
          mockCount++;
        }

        // API 정보 저장
        apiInfo[url] = {
          name: apiName,
          category: category,
          method: method,
          supportsMock: !!(mockTrId && mockTrId !== '모의투자 미지원')
        };

        // 카테고리별 분류
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(url);
      }
    });

    // TypeScript 파일 생성
    const tsContent = `// 이 파일은 kis-api-table.csv에서 자동 생성됩니다.
// 수동으로 편집하지 마세요.

export interface TrIdMapping {
  real?: string;
  mock?: string;
}

export interface ApiInfo {
  name: string;
  category: string;
  method: string;
  supportsMock: boolean;
}

// TR_ID 매핑 테이블
export const TR_ID_MAPPINGS: Record<string, TrIdMapping> = ${JSON.stringify(mappings, null, 2)};

// API 정보 테이블
export const API_INFO: Record<string, ApiInfo> = ${JSON.stringify(apiInfo, null, 2)};

// 카테고리별 API 목록
export const API_CATEGORIES: Record<string, string[]> = ${JSON.stringify(categories, null, 2)};

/**
 * URL에 따라 TR_ID를 반환하는 함수
 */
export function getTrId(url: string, environment: 'real' | 'mock' = 'real'): string | undefined {
  const mapping = TR_ID_MAPPINGS[url];
  if (!mapping) {
    return undefined;
  }

  return environment === 'mock' ? mapping.mock : mapping.real;
}

/**
 * API 정보를 반환하는 함수
 */
export function getApiInfo(url: string): ApiInfo | undefined {
  return API_INFO[url];
}

/**
 * 모의투자 지원 여부를 확인하는 함수
 */
export function supportsMockTrading(url: string): boolean {
  const info = API_INFO[url];
  return info ? info.supportsMock : false;
}

/**
 * 카테고리별 API 목록을 반환하는 함수
 */
export function getApisByCategory(category: string): string[] {
  return API_CATEGORIES[category] || [];
}

/**
 * 모든 카테고리 목록을 반환하는 함수
 */
export function getAllCategories(): string[] {
  return Object.keys(API_CATEGORIES);
}

// 통계 정보
export const STATISTICS = {
  totalApis: ${totalCount},
  realTradingSupported: ${realCount},
  mockTradingSupported: ${mockCount},
  categories: ${Object.keys(categories).length}
};
`;

    // 파일 저장
    const outputPath = path.join(process.cwd(), 'package', 'utils', 'kis-tr-id-mappings.ts');
    fs.writeFileSync(outputPath, tsContent, 'utf-8');

    console.log(`✅ TR_ID 매핑 파일 생성 완료: ${outputPath}`);
    console.log(`📊 통계:`);
    console.log(`   - 총 API 수: ${totalCount}`);
    console.log(`   - 실전투자 지원: ${realCount}`);
    console.log(`   - 모의투자 지원: ${mockCount}`);
    console.log(`   - 카테고리 수: ${Object.keys(categories).length}`);
    console.log(`   - 모의투자 지원율: ${Math.round((mockCount/totalCount)*100)}%`);

  } catch (error) {
    console.error('❌ TR_ID 매핑 생성 실패:', error.message);
  }
}

// 스크립트 실행
generateTrIdMappings();