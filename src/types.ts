export interface ColumnDataRaw { 
  columns: string[], 
  data: any[][] 
}

export interface IFolder {
  id: number
  title: string
  parent_id: number,
}

export interface IItem {
  id: number
  title: string
  folder_id: number
}

export interface IFolderTreeNode extends IFolder {
  sub_folders: IFolderTreeNode[],
  items: IItem[]
}
