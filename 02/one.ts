import { perf } from "../utils/perf";

type BagLoad = Record<string, number>;

async function isGamePossible(content: string, bagLoad: BagLoad) {
  const reveals = content.split(";");

  for (const reveal of reveals) {
    const colorSets = reveal.split(",");

    for (const colorSet of colorSets) {
      const [strCount, color] = colorSet.trim().split(" ");

      const count = parseInt(strCount);

      if (bagLoad[color] < count) {
        return false;
      }
    }
  }

  return true;
}

async function main() {
  const file = await Bun.file(`${import.meta.dir}/input.txt`);
  const input = await file.text();

  const bagLoad: BagLoad = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let possibleIdSum = 0;

  for (const game of input.split("\n")) {
    const [pre, content] = game.split(":");
    const gameId = parseInt(pre.split(" ")[1]);

    if (await isGamePossible(content, bagLoad)) {
      possibleIdSum += gameId;
    }
  }

  console.log(`Solution: ${possibleIdSum}`);
}

perf(main);
