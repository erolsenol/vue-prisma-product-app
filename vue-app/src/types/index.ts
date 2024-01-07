export interface categoryType {
  id: number
  name: string
  picture: string
  parent_id?: number | string
  parent_category?: categoryType
  child_category?: categoryType[]
  products?: productType[]
}

export interface productType {
  id: number
  name: string
  picture: string
  category_id: number
  category: categoryType
}

export interface toastType {
  title: string
  text: string
}

export interface stateType {
  products: productType[]
  categories: categoryType[]
  toastItems: toastType[]
}

export interface paginationType {
  page: number
  limit: number
  count: number
  totalPage: number
}

export interface tableType {
  headers: string[]
  items: categoryType[]
  actions: object[]
}
