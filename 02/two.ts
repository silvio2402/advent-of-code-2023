import { perf } from "../utils/perf";

type CubeSets = Record<string, number>;

async function getSetPower(cubeSets: CubeSets) {
  return cubeSets["red"] * cubeSets["green"] * cubeSets["blue"];
}

async function getGamePower(content: string) {
  const reveals = content.split(";");

  const cubeSets: CubeSets = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const reveal of reveals) {
    const colorSets = reveal.split(",");

    for (const colorSet of colorSets) {
      const [strCount, color] = colorSet.trim().split(" ");

      const count = parseInt(strCount);

      if (cubeSets[color] < count) {
        cubeSets[color] = count;
      }
    }
  }

  return getSetPower(cubeSets);
}

async function main() {
  const file = await Bun.file(`${import.meta.dir}/input.txt`);
  const input = await file.text();

  let powerSum = 0;

  for (const game of input.split("\n")) {
    const content = game.split(":")[1];

    powerSum += await getGamePower(content);
  }

  console.log(`Solution: ${powerSum}`);
}

perf(main);
