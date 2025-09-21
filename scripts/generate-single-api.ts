import fs from "node:fs";
import path from "node:path";

/**
 * 단일 패키지의 API 인덱스 파일을 생성하는 함수
 * orval의 output hook에서 사용됩니다.
 */
function generateSingleApiIndex(apiDir: string): void {
  if (!fs.existsSync(apiDir)) {
    console.log(`⚠️  API 디렉토리가 존재하지 않음: ${apiDir}`);
    return;
  }

  try {
    const entries = fs.readdirSync(apiDir, { withFileTypes: true });
    const directories = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort();

    if (directories.length === 0) {
      console.log(`⚠️  API 디렉토리에 하위 디렉토리가 없음: ${apiDir}`);
      return;
    }

    // 각 디렉토리에서 실제 존재하는 파일들을 확인하여 export 문 생성
    const exports = [];
    for (const dir of directories) {
      const dirPath = path.join(apiDir, dir);
      const files = fs
        .readdirSync(dirPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".ts"))
        .map((entry) => entry.name.replace(".ts", ""));

      for (const file of files) {
        exports.push(`export * from './${dir}/${file}';`);
      }
    }

    // index.ts 파일 내용 생성
    const indexContent = [
      "// 이 파일은 orval output hook에 의해 자동 생성됩니다.",
      "// 수동으로 편집하지 마세요.",
      "",
      ...exports,
      "",
    ].join("\n");

    const indexPath = path.join(apiDir, "index.ts");
    fs.writeFileSync(indexPath, indexContent, "utf-8");

    const packageName = path.basename(path.dirname(path.dirname(apiDir)));
    console.log(`✅ ${packageName}: ${directories.length}개 API 모듈 index 생성 (glob 패턴으로 자동 entry 처리)`);
  } catch (error) {
    console.error(`❌ API 인덱스 생성 실패 (${apiDir}):`, error.message);
  }
}

/**
 * src/index.ts 파일의 export 문들을 자동으로 활성화하는 함수
 */
function updateMainIndex(packageDir: string): void {
  const indexPath = path.join(packageDir, "src", "index.ts");

  if (!fs.existsSync(indexPath)) {
    console.log(`⚠️  메인 인덱스 파일이 존재하지 않음: ${indexPath}`);
    return;
  }

  try {
    let content = fs.readFileSync(indexPath, "utf-8");

    // 주석 처리된 export 문들을 활성화
    content = content.replace(/\/\/ export \* from '\.\/api';/g, "export * from './api';");
    content = content.replace(/\/\/ export \* from '\.\/model';/g, "export * from './model';");

    fs.writeFileSync(indexPath, content, "utf-8");

    const packageName = path.basename(packageDir);
    console.log(`✅ ${packageName}: 메인 index.ts export 문들 활성화`);
  } catch (error) {
    console.error(`❌ 메인 인덱스 업데이트 실패 (${indexPath}):`, error.message);
  }
}

/**
 * gen 디렉토리의 index.ts 파일을 생성하는 함수
 */
function generateGenIndex(genDir: string): void {
  if (!fs.existsSync(genDir)) {
    console.log(`⚠️  Gen 디렉토리가 존재하지 않음: ${genDir}`);
    return;
  }

  try {
    const endpointsDir = path.join(genDir, "endpoints");
    if (!fs.existsSync(endpointsDir)) {
      console.log(`⚠️  Endpoints 디렉토리가 존재하지 않음: ${endpointsDir}`);
      return;
    }

    const entries = fs.readdirSync(endpointsDir, { withFileTypes: true });
    const directories = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort();

    if (directories.length === 0) {
      console.log(`⚠️  Endpoints 디렉토리에 하위 디렉토리가 없음: ${endpointsDir}`);
      return;
    }

    // index.ts 파일 내용 생성
    const indexContent = [
      "// 이 파일은 orval output hook에 의해 자동 생성됩니다.",
      "// 수동으로 편집하지 마세요.",
      "",
      ...directories.map((dir) => `export * from './endpoints/${dir}/${dir}.zod';`),
      "",
    ].join("\n");

    const indexPath = path.join(genDir, "index.ts");
    fs.writeFileSync(indexPath, indexContent, "utf-8");

    console.log(`✅ Gen: ${directories.length}개 API 모듈 index 생성`);
  } catch (error) {
    console.error(`❌ Gen 인덱스 생성 실패 (${genDir}):`, error.message);
  }
}

export { generateSingleApiIndex, updateMainIndex, generateGenIndex };
