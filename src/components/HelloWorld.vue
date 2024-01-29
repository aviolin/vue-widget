<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <h3>
      You’ve successfully created a embedded widget with Vue 3.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  color: red;
}
</style>