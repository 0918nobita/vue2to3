import { createApp, type Component } from 'vue';

type ComponentName = string;

const componentLoaders: Partial<Record<ComponentName, () => Promise<{ default: Component }>>> = {
  MyApp: () => import('./MyApp.vue'),
  MyCounter: () => import('./MyCounter.vue'),
  AppendElement: () => import('./AppendElement.vue'),
};

const componentCache = new Map<ComponentName, Component>();

export const mountAll = () => {
  const mountPoints = document.querySelectorAll('[data-vue-component]');

  const mountPlans = new Map<ComponentName, Element[]>();

  for (const mountPoint of mountPoints) {
    const componentName = mountPoint.getAttribute('data-vue-component');
    if (typeof componentName !== 'string') {
      console.error('componentName not specified');
      continue;
    }

    if (!(componentName in componentLoaders)) {
      console.error(`${componentName} is not registered, skipping mount`);
      continue;
    }

    mountPoint.removeAttribute('data-vue-component');

    const sameCompMountPoints = mountPlans.get(componentName) ?? [];

    mountPlans.set(componentName, [...sameCompMountPoints, mountPoint]);
  }

  for (const [componentName, mountPoints] of mountPlans) {
    const component = componentCache.get(componentName);
    if (component !== undefined) {
      for (const mountPoint of mountPoints) {
        createApp(component).mount(mountPoint);
      }
      continue;
    }

    void componentLoaders[componentName]!().then(({ default: component }) => {
      componentCache.set(componentName, component);
      for (const mountPoint of mountPoints) {
        createApp(component).mount(mountPoint);
      }
    });
  }
};
