<template>
  <button class="theme-button">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: 'ThemeButton' })
</script>

<style scoped lang="scss">
.theme-button {
  background-color: var(--color-primary);
  color: var(--color-surface);
  border-radius: var(--default-border-radius);
  padding: spacing(0.5) spacing(1);
  font-size: 12px;
  border: 0;
  cursor: pointer;
}
</style>