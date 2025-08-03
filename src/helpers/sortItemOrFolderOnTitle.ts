import type { IFolder, IItem } from "@/types";

export function sortItemOrFolderOnTitle(a: IFolder | IItem, b: IFolder | IItem): number {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}
