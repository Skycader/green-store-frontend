import { setLoadingAction } from "./loadingReducer";

describe("Testing loading reducer", () => {
  test("SET_LOADING MUST SET LOADING", () => {
    expect(setLoadingAction({ loading: false })).toEqual({
      type: "SET_LOADING",
      payload: { loading: false },
    });
  });
});
