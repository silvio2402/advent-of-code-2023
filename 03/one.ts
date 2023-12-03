import { perf } from "../utils/perf";

function getValidPartNumbers(input: string) {
  const validPartNumbers: number[] = [];

  const lines = input.split("\n");
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];

    let currNum = "";

    for (let i = 0; i < line.length + 1; i++) {
      const c = line[i];

      if (!(c >= "0" && c <= "9")) {
        if (currNum !== "") {
          const leftI = i - currNum.length - 1;
          const left = line[leftI] ?? "";
          const right = c ?? "";
          const top = (lines[row - 1] ?? "").slice(Math.max(0, leftI), i + 1);
          const bottom = (lines[row + 1] ?? "").slice(
            Math.max(0, leftI),
            i + 1
          );
          const around = top + right + bottom + left;
          if (!/^[0-9\.]+$/.test(around)) {
            validPartNumbers.push(parseInt(currNum));
          }
          currNum = "";
        }

        continue;
      }

      currNum += c;
    }
  }

  return validPartNumbers;
}

async function main() {
  const file = await Bun.file(`${import.meta.dir}/input.txt`);
  const input = await file.text();

  const validPartNumbers = getValidPartNumbers(input);

  let sum = 0;

  for (const partNumber of validPartNumbers) {
    sum += partNumber;
  }

  console.log(`Solution: ${sum}`);
}

perf(main);
