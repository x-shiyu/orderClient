import { CoffeOrderInfo } from './service'

export interface FormattedCoffeInfo {
  category_name: string
  category: number
  children: CoffeOrderInfo[]
}
export function formatCoffeList(list: CoffeOrderInfo[]): FormattedCoffeInfo[] {
  const newList: FormattedCoffeInfo[] = []
  const newListMap: Record<string, any> = {}
  list.forEach((item) => {
    if (newListMap[item.category_name]) {
      newListMap[item.category_name].push(item)
    } else {
      newListMap[item.category_name] = [item]
    }
  })
  return Object.keys(newListMap).map((item) => {
    return {
      category_name: item,
      category: newListMap[item][0].category,
      children: newListMap[item],
    }
  })
}
