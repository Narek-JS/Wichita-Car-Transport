import { MenuItem } from "@/model/menu";

export const getMenuItemsWithChildeFormat = (arr: Array<MenuItem>, parent_id: number | null = null): Array<MenuItem> =>
    arr
      .filter(item => item.parent_id === parent_id)
      .map(item => ({
        ...item,
        children: getMenuItemsWithChildeFormat(arr, item.id),
      }));