declare function log(n: i32): void

export function minusOne(n: i32): i32 {
  if (n === 44) {
    log(n);
  }

  return n - 1;
}

export function fizzbuzz(n: i32): String | null {
  if (n % 15 === 0) {
    return "fizzbuzz";
  }

  if (n % 3 === 0) {
    return "fizz";
  }

  if (n % 5 === 0) {
    return "buzz";
  }

  return null;
}