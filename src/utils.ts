const PREFIX = "👉 "
const SEP = " ⌛ "

interface Stringable {
  toString: () => string;
}

function toString(arg: Stringable) {
  return arg.toString()
}

export function log(...msg: Stringable[]) {
  console.log(`${PREFIX}${msg.map((s) => toString(s)).join(SEP)}`)
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
