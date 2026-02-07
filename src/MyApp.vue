<script lang="ts">
import Vue, { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      count: { innerValue: 0 },
    };
  },
  methods: {
    increment() {
      Vue.set(this.count, 'innerValue', this.count.innerValue + 1);
    },
  },
});
</script>

<template>
  <h2>Vue</h2>

  <button
    type="button"
    @click="increment()"
  >
    Count: {{ count.innerValue }}
  </button>
</template>

<style scoped>
h2 {
  color: purple;
}
</style>
