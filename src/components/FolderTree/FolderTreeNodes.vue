<template>
  <ul class="folder-tree-nodes">
    <li
      v-for="node in data"
      :key="node.id"
    >
      <ul>
        <li class="folder-tree-nodes__node folder-tree-nodes__node--folder">
          <input 
            :id="`folder-${node.id}`" 
            class="folder-tree-nodes__node__checkbox"
            :indeterminate="getIndeterminateState(node)" 
            :checked="allWithinFolderChecked(node)"
            type="checkbox" 
            @change="toggleAllChildItems(node)" 
          >
          <label :for="`folder-${node.id}`">{{ node.title }}</label>
          <button 
            :class="['folder-tree-nodes__node__toggle', {
              'folder-tree-nodes__node__toggle--collapsed': folderIsCollapsed(node.id)
            }]"
            :title="folderIsCollapsed(node.id) ? 'Expand folder' : 'Collapse folder'" 
            @click="onFolderCollapse(node.id)" 
          />
        </li>
        <template v-if="!collapsedFolders.includes(node.id)">
          <li v-if="node.sub_folders.length">
            <FolderTreeNodes  
              class="folder-tree-nodes--child" 
              :data="node.sub_folders"
              :itteration="itteration + 1"
            />
          </li>
          <li 
            v-for="item in node.items"
            :key="item.id"
            class="folder-tree-nodes__node folder-tree-nodes__node--item folder-tree-nodes--child"
          >
            <input 
              :id="`item-${item.id}`" 
              v-model="model[item.id]" 
              class="folder-tree-nodes__node__checkbox"
              type="checkbox" 
            >
            <label :for="`item-${item.id}`">{{ item.title }}</label>
          </li>
        </template>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IFolderTreeNode, IItem } from '@/types';
import { inject, ref, type PropType, type Ref } from 'vue';
import { type FolderTreeSelectionModel } from './types';
import { folderTreeInjectionKey } from './constants';

defineOptions({
  name: 'FolderTreeNodes'
});

defineProps({
  data: { type: Array as PropType<IFolderTreeNode[]>, default: () => [] },
  itteration: { type: Number, default: 1 }
});

const model = inject(folderTreeInjectionKey) as Ref<FolderTreeSelectionModel>;
const collapsedFolders = ref<number[]>([]);

function toggleAllChildItems(folder: IFolderTreeNode): void {
  const allChildItems = getAllChildItemNodes(folder);
  const allSelected = allWithinFolderChecked(folder);
  allChildItems.forEach(c => { model.value[c.id] = !allSelected; });
}

function getAllChildItemNodes(folder: IFolderTreeNode): IItem[] {
  return [folder.items, ...(
    folder.sub_folders.length ?
      folder.sub_folders.flatMap(f => getAllChildItemNodes(f)) :
      []
  )].flat();
}

function allWithinFolderChecked(folder: IFolderTreeNode): boolean {
  const allChildItems = getAllChildItemNodes(folder);
  return !allChildItems.some(c => !model.value[c.id]);
}

function getIndeterminateState(folder: IFolderTreeNode): boolean {
  const allChildItems = getAllChildItemNodes(folder);
  return allChildItems.some(c => model.value[c.id]) && !allWithinFolderChecked(folder);
}

function onFolderCollapse(folderId: number) {
  if (!collapsedFolders.value.includes(folderId)) {
    collapsedFolders.value.push(folderId);
  } else {
    collapsedFolders.value = collapsedFolders.value.filter(cId => cId !== folderId);
  }
}

function folderIsCollapsed (folderId: number) {
  return collapsedFolders.value.includes(folderId);
}

</script>

<style lang="scss" scoped>

$listItemHeight: 34px; 

.folder-tree-nodes {
  &--child {
    margin-left: spacing(1);
  }

  &__node {
    display: flex;
    align-items: center;
    padding: 0 spacing(1);
    height: $listItemHeight;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      display: block;
      height: $listItemHeight;
      opacity: 0;
      z-index: -1;
      background-color: var(--color-hover);
    }

    &:hover {
      &:after {
        opacity: 1;
      }
    }

    &--folder {
      padding-right: 0;
      label {
        font-weight: bold;
      }
    }

    label {
      flex: 1;
      margin-left: 12px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    &__checkbox {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    &__toggle {
      position: relative;
      width: 28px;
      height: 28px;
      margin: 6px;
      display: block;
      border-radius: 6px;
      border: 0;
      background: transparent;
      cursor: pointer;
      

      &::after {
        content: '';
        position: absolute;
        display: block;
        left: 50%;
        top: 50%;
        border-left: 0;
        border-top: 0;
        background-color: transparent;
        border-right: 2px solid var(--color-text);
        border-bottom: 2px solid var(--color-text);
        width: 6px;
        height: 6px;
        margin-top: 2px;
        transform: translate(-50%, -50%) rotate(-135deg);
        transform-origin: center;
      }

      &:hover {
        background-color: var(--color-border);
      }

      &--collapsed {
        &:after {
          margin-top: -2px;
          transform: translate(-50%, -50%) rotate(45deg);
        }
      }
    }
  }
}
</style>
