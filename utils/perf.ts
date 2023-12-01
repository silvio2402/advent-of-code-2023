type MaybePromise<T> = T | Promise<T>;

export async function perf<T extends (...args: any[]) => MaybePromise<any>>(
  func: T
) {
  const start = Bun.nanoseconds();
  await func();
  const end = Bun.nanoseconds();
  const time = end - start;
  console.log(`Took ${Math.round(time / 1000) / 1000}ms`);
}
