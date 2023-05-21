export function validator(value: Record<string, string | number | symbol>) {
  const error: string[] = [];

  for (const [key, val] of Object.entries(value)) {
    if (val === undefined) {
      error.push(`value of ${key} is undefined`);
    }
  }

  return error.join(" | ");
}
