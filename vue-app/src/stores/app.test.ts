import { AxiosError, type AxiosResponse } from "axios"
import { createPinia, setActivePinia } from "pinia"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import api from "@/service"
import { useAppStore } from "./app"

vi.mock("@/service", () => ({
  default: {
    get: vi.fn(),
  },
}))

describe("app store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("loads products and categories together", async () => {
    vi.mocked(api.get).mockImplementation(async (path) => ({
      status: 200,
      data: {
        data: path.endsWith("categories") ? [{ id: 1, name: "Accessories" }] : [{ id: 2, name: "Lamp" }],
      },
    }) as never)

    const store = useAppStore()
    await store.initData()

    expect(store.categories).toEqual([{ id: 1, name: "Accessories" }])
    expect(store.products).toEqual([{ id: 2, name: "Lamp" }])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it("shows a useful API error and resets loading when a request fails", async () => {
    const error = new AxiosError("Request failed")
    error.response = {
      data: { message: "Catalog is unavailable" },
    } as AxiosResponse
    vi.mocked(api.get).mockRejectedValue(error)

    const store = useAppStore()

    await expect(store.initData()).rejects.toBe(error)
    expect(store.error).toBe("Catalog is unavailable")
    expect(store.isLoading).toBe(false)
  })

  it("expires each toast without removing a newer toast", () => {
    vi.useFakeTimers()
    const store = useAppStore()
    const firstToast = { title: "Error", text: "First" }
    const nextToast = { title: "Error", text: "Next" }

    store.addToast(firstToast)
    vi.advanceTimersByTime(2000)
    store.addToast(nextToast)
    vi.advanceTimersByTime(2000)

    expect(store.toastItems).toEqual([nextToast])

    vi.advanceTimersByTime(2000)
    expect(store.toastItems).toEqual([])
  })
})
