import { sortItemOrFolderOnTitle } from "@/helpers/sortItemOrFolderOnTitle";
import type { IFolder, IFolderTreeNode, IItem } from "@/types";

export function mapFoldersAndItemsToTree(folders: IFolder[], items: IItem[]): IFolderTreeNode[] {
  const roots = folders.filter(f => f.parent_id === null).sort(sortItemOrFolderOnTitle);

  const mapFolderToTreeNode = (f: IFolder): IFolderTreeNode => ({
    ...f,
    sub_folders: populateChildFolders(f.id).sort(sortItemOrFolderOnTitle),
    items: items.filter(i => i.folder_id === f.id).sort(sortItemOrFolderOnTitle)
  });
  
  const populateChildFolders = (folder_id: number): IFolderTreeNode[] => 
    folders.filter(f => f.parent_id === folder_id).map(mapFolderToTreeNode);
  
  return roots.map(mapFolderToTreeNode);
}
