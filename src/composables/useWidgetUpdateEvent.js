import { ref, inject, onMounted, onUnmounted } from 'vue'

export function useWidgetUpdateEvent() {
  const appRoot = inject('appRoot')

  const data = ref({
    'background-color': '#345',
  })

  function update(event) {
    console.log('Handling widget update event:', event.detail?.[0])
    data.value = event.detail?.[0]
  }

  onMounted(() => appRoot.addEventListener('widget-update', update))
  onUnmounted(() => appRoot.removeEventListener('widget-update', update))

  return data;
}