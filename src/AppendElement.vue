<script setup lang="ts">
import { mountAll } from '~/mounter';

const appendElement = () => {
  const newMountPoint = document.createElement('div');
  newMountPoint.setAttribute('data-vue-component', 'MyCounter');
  document.body.appendChild(newMountPoint);

  mountAll();
};
</script>

<template>
  <button
    type="button"
    @click="appendElement()"
  >
    Append element
  </button>
</template>
