import Money from '../src'

describe('Money', () => {
  it('constructs from integer', () => {
    const five = new Money(5)
    expect(five.value).toEqual(5000n)
    expect(five.minors).toEqual(5)
    expect(five.majors).toEqual(0)
    expect(five.minorsRemainder).toEqual(5)
  })
  it('constructs from float', () => {
    const fiveFifty = new Money(5.5)
    expect(fiveFifty.value).toEqual(550000n)
    expect(fiveFifty.minors).toEqual(550)
    expect(fiveFifty.majors).toEqual(5)
    expect(fiveFifty.minorsRemainder).toEqual(50)
  })
  it('constructs from string', () => {
    const twelveOhFive = new Money('12.05')
    expect(twelveOhFive.value).toEqual(1205000n)
    expect(twelveOhFive.minors).toEqual(1205)
    expect(twelveOhFive.majors).toEqual(12)
    expect(twelveOhFive.minorsRemainder).toEqual(5)
  })
})
