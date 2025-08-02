<template>
  <div class="app">
    <FolderTree 
      v-if="folderTreeNodes.length" 
      :data="folderTreeNodes"
      v-model="selectedItemModel"
    >
      <template #post-content="{ clear }">
        <div class="app__item-ids">
          Selected item IDs: <template v-for="(id, key) in selectedItemModel">
            {{ id + (key < (selectedItemModel.length - 1) ? ', ' : '') }}
          </template>
          <template v-if="!selectedItemModel.length">-</template>
        </div>
        <div class="app__clear-data">
          <ThemeButton 
            class="app__clear-data__button"
            @click="clear">
            Clear selection
          </ThemeButton>
        </div>
      </template>
    </FolderTree>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FolderTree from './components/FolderTree/FolderTree.vue';
import { apiFetch } from './services/apiFetch';
import type { ColumnDataRaw, IFolder, IFolderTreeNode, IItem } from './types';
import { mapColumnData } from './mappers/mapColumnData';
import { mapFoldersAndItemsToTree } from './mappers/mapFoldersAndItemsToTree';
import ThemeButton from './components/ThemeButton/ThemeButton.vue';

defineOptions({
  name: 'App'
})

const folderTreeNodes = ref<IFolderTreeNode[]>([])
const selectedItemModel = ref<number[]>([])

apiFetch.get<{ folders: ColumnDataRaw, items: ColumnDataRaw }>('/data/response.json').then((rawData) => {
  const folders = mapColumnData<IFolder>(rawData.folders)
  const items = mapColumnData<IItem>(rawData.items)
  folderTreeNodes.value = mapFoldersAndItemsToTree(folders, items)
})
</script>

<style scoped lang="scss">
.app {
  margin: spacing(1);

  &__item-ids {
    margin: spacing(1) 0;
  }

  &__clear-data {
    display: flex;

    &__button {
      margin-left: auto;
    }
  }
}
</style>
