<template>
  <div class="folder-tree">
    <div class="folder-tree__container">
      <FolderTreeNodes :data="data" />
    </div>
    <slot
      name="post-content"
      :clear="() => { model = [] }"
    />
  </div>
</template>

<script setup lang="ts">
import type { IFolderTreeNode } from '@/types';
import { provide, ref, watch, type PropType } from 'vue';
import FolderTreeNodes from './FolderTreeNodes.vue';
import { type FolderTreeSelectionModel } from './types';
import { folderTreeInjectionKey } from './constants';

defineOptions({
  name: 'FolderTree'
});

const props = defineProps({
  data: { type: Array as PropType<IFolderTreeNode[]>, default: () => [] },
  modelValue: { type: Array as PropType<number[]>, default: () => [] }
});

const emit = defineEmits<{
  (e: 'update:modelValue', payload: number[]): void
}>();

const model = ref<FolderTreeSelectionModel>(mapFolderArrayToObj(props.modelValue));

provide(folderTreeInjectionKey, model);

watch(model, (v) => {
  emit('update:modelValue', Object.entries(v).reduce((a, [key, val]) =>
    val ? [...a, parseInt(key)] : a
    , <number[]>[]));
}, { deep: true });


function mapFolderArrayToObj(val: number[]) {
  return val.reduce((a, b) => {
    return { ...a, [b]: true };
  }, <FolderTreeSelectionModel>{});
}
</script>

<style lang="scss" scoped>
.folder-tree {
  width: 275px;

  &__container {
    position: relative;
    border: 1px solid var(--color-border);
    border-radius: var(--default-border-radius);
  }
}
</style>
