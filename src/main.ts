import { configureCompat } from 'vue';

import { mountAll } from '~/mounter';

configureCompat({
  MODE: 2,
});

document.addEventListener('DOMContentLoaded', () => {
  mountAll();
});
