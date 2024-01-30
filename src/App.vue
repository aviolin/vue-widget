<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from './stores/counter';
import { useWidgetUpdateEvent } from './composables/useWidgetUpdateEvent'

const counterStore = useCounterStore();
const widgetStyles = useWidgetUpdateEvent();
</script>

<template>
  <main :style="widgetStyles">
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>
    <button @click="counterStore.increment">Click me</button>
    <p>You clicked the button {{ counterStore.count }} times.</p>
  </main>
</template>