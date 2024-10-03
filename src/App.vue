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

const onPrevious = async () => {
  console.log('Previous page')

  // wait 1 second
  await new Promise(resolve => setTimeout(resolve, 1000))

  // insert at the beginning
  pages.value.unshift({
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

const onNext = async () => {
  console.log('Next page')

  await new Promise(resolve => setTimeout(resolve, 1000))

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
  <WyxosMasonry :pages="pages" :on-load-next="onNext" :on-load-previous="onPrevious"></WyxosMasonry>
</template>

