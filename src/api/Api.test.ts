import shop from './Api'

describe("Testing api", () => {
  test("Shop instance must be defined", () => {
    expect(shop).toBeDefined()
  })

  test("Shop instance must have user class instance", () => {
    expect(shop.user).toBeDefined()
  })

  test("Shop instance must have products class instance", () => {
    expect(shop.products).toBeDefined()
  })
})