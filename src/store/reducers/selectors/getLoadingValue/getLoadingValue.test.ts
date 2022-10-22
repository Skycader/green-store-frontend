import {getLoadingValue} from "./getLoadingValue"

describe("Test loading selector", () => {
  test("Mst return 0 when got empty object", () => {
    expect(getLoadingValue({})).toBe(0)
  })

  test("Must return value when got state object", () => {
    expect(getLoadingValue({
      loading: {
        loading: true
      }
    })).toBe(true)
  })
})