<script setup>
import { ref } from 'vue'
import WyxosMasonry from "./components/WyxosMasonry.vue";

const pages = ref([
  {
    page: 1,
    items: [
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
    ]
  }
])

const onPrevious = () => {
  console.log('Previous page')
}

const onNext = () => {
  console.log('Next page')

  pages.value.push({
    page: pages.value.length + 1,
    items: [
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
      { src: 'https://vuejs.org/images/logo.png', alt: 'Vue.js Logo' },
    ]
  })
}
</script>

<template>
  <WyxosMasonry :pages="pages" @previous="onPrevious" @next="onNext"></WyxosMasonry>
</template>

