import { AxiosError, type AxiosResponse } from "axios"
import { describe, expect, it } from "vitest"

import { getApiErrorMessage } from "./errors"

describe("getApiErrorMessage", () => {
  it("uses a message returned by the API", () => {
    const error = new AxiosError("Request failed")
    error.response = { data: { message: "Category name is required" } } as AxiosResponse

    expect(getApiErrorMessage(error, "Request failed")).toBe("Category name is required")
  })

  it("uses the localized fallback when the error has no API message", () => {
    expect(getApiErrorMessage(new Error("Network Error"), "Could not load categories")).toBe(
      "Could not load categories",
    )
  })
})
