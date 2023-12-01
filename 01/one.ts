import { perf } from "../utils/perf";

async function getCalibrationValue(line: string) {
  let first: string = "";
  let second: string = "";

  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c >= "0" && c <= "9") {
      first = c;
      break;
    }
  }

  for (let i = line.length - 1; i >= 0; i--) {
    const c = line[i];
    if (c >= "0" && c <= "9") {
      second = c;
      break;
    }
  }

  return parseInt(first + second);
}

async function main() {
  const file = await Bun.file(`${import.meta.dir}/input.txt`);
  const input = await file.text();

  let sum = 0;

  for (const line of input.split("\n")) {
    sum += await getCalibrationValue(line);
  }

  console.log(`Solution: ${sum}`);
}

perf(main);
