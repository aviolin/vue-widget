<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from './stores/counter';

const counterStore = useCounterStore();
</script>

<template>
  <main style="background: #345; color: #fff; padding: 1rem;">
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