class Money {
  private actual: bigint
  private minorsPower: bigint
  private precision: bigint
  constructor(
    amount: number | string,
    minorsPower: number = 2,
    precision: number = 3,
  ) {
    if (Number.isInteger(minorsPower)) {
      this.minorsPower = BigInt(minorsPower)
    } else {
      this.minorsPower = 2n
    }

    if (Number.isInteger(precision)) {
      this.precision = BigInt(precision)
    } else {
      this.precision = 3n
    }

    let majors: bigint, minors: bigint

    if (typeof amount === 'string') {
      [majors, minors] = fromString(amount, Number(this.minorsPower))
    } else if (Number.isInteger(amount)) {
      this.actual = BigInt(amount) * (10n ** this.precision)
      return
    } else {
      [majors, minors] = fromString(String(amount), Number(this.minorsPower))
    }

    this.actual = (majors * 10n ** this.minorsPower + minors) * 10n ** this.precision
  }

  get value (): bigint {
    return this.actual
  }

  get minors (): number {
    return Number(this.actual / (10n ** this.precision))
  }

  get majors (): number {
    return Number(this.actual / (10n ** this.precision * 10n ** this.minorsPower))
  }

  get minorsRemainder(): number {
    return Number(
      (this.actual / (10n ** this.precision))
      -
      (this.actual / (10n ** this.precision * 10n ** this.minorsPower))
      * 10n ** this.minorsPower
    )
  }
}

const fromString = (input: string, pad: number = 2): [bigint, bigint] => {
  if (!/^\d+[,.]\d+$/i.test(input)) {
    return [0n, 0n]
  }
  const split = input.split(/[,.]/i)
  return [
    BigInt(parseInt(split[0], 10)),
    BigInt(parseInt(split[1].padEnd(pad, '0'), 10)),
  ]
}

export default Money
