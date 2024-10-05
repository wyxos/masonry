<script setup>
import { ref } from 'vue'
import WyxosMasonry from "./components/WyxosMasonry.vue";

function createID() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}


const pages = ref([
  {
    page: 1,
    items: [
      { src: 'https://picsum.photos/id/1011/400/300', alt: 'Mountain Landscape', id: createID() },
      { src: 'https://picsum.photos/id/1025/400/300', alt: 'Golden Retriever', id: createID() },
      { src: 'https://picsum.photos/id/1035/400/300', alt: 'Forest Pathway', id: createID() },
      { src: 'https://picsum.photos/id/1049/400/300', alt: 'Sunset Over Sea', id: createID() },
      { src: 'https://picsum.photos/id/1059/400/300', alt: 'Colorful Bird', id: createID() },
      { src: 'https://picsum.photos/id/1069/400/300', alt: 'Snowy Mountains', id: createID() },
      { src: 'https://picsum.photos/id/1084/400/300', alt: 'Flower Close-up', id: createID() },
      { src: 'https://picsum.photos/id/109/400/300', alt: 'Cityscape', id: createID() },
      { src: 'https://picsum.photos/id/110/400/300', alt: 'Desert Dunes', id: createID() },
      { src: 'https://picsum.photos/id/111/400/300', alt: 'Starry Night Sky', id: createID() },
    ]
  }
]);



const onPrevious = async () => {
  console.log('Previous page')

  // wait 1 second
  await new Promise(resolve => setTimeout(resolve, 1000))

  // insert at the beginning
  pages.value.unshift({
    page: pages.value.length + 1,
    items: [
      { src: 'https://picsum.photos/id/112/400/300', alt: 'Ocean Waves', id: createID() },
      { src: 'https://picsum.photos/id/113/400/300', alt: 'Majestic Lion', id: createID() },
      { src: 'https://picsum.photos/id/114/400/300', alt: 'Rustic Barn', id: createID() },
      { src: 'https://picsum.photos/id/115/400/300', alt: 'Calm Lake', id: createID() },
      { src: 'https://picsum.photos/id/116/400/300', alt: 'Autumn Forest', id: createID() },
      { src: 'https://picsum.photos/id/117/400/300', alt: 'City Lights', id: createID() },
      { src: 'https://picsum.photos/id/118/400/300', alt: 'Mountain Peak', id: createID() },
      { src: 'https://picsum.photos/id/119/400/300', alt: 'Green Fields', id: createID() },
      { src: 'https://picsum.photos/id/120/400/300', alt: 'Waterfall', id: createID() },
      { src: 'https://picsum.photos/id/121/400/300', alt: 'Bridge in Fog', id: createID() },
    ]
  });
}

const onNext = async () => {
  console.log('Next page')

  await new Promise(resolve => setTimeout(resolve, 1000))

  pages.value.push({
    page: pages.value.length + 1,
    items: [
      { src: 'https://picsum.photos/id/122/400/300', alt: 'Vast Desert', id: createID() },
      { src: 'https://picsum.photos/id/123/400/300', alt: 'Old Lighthouse', id: createID() },
      { src: 'https://picsum.photos/id/124/400/300', alt: 'Pine Trees', id: createID() },
      { src: 'https://picsum.photos/id/125/400/300', alt: 'Blue Sky Over Hills', id: createID() },
      { src: 'https://picsum.photos/id/126/400/300', alt: 'Snowfall', id: createID() },
      { src: 'https://picsum.photos/id/127/400/300', alt: 'Mountain Cabin', id: createID() },
      { src: 'https://picsum.photos/id/128/400/300', alt: 'Sunny Meadow', id: createID() },
      { src: 'https://picsum.photos/id/129/400/300', alt: 'Wild River', id: createID() },
      { src: 'https://picsum.photos/id/130/400/300', alt: 'Tulip Garden', id: createID() },
      { src: 'https://picsum.photos/id/131/400/300', alt: 'Hazy Forest', id: createID() },
    ]
  });
}

const onRemoveItem = (item) => {
  console.log('Remove item', item)

  const index = pages.value.findIndex(page => page.items.some(i => i.id === item))

  if (index !== -1) {
    const pageIndex = pages.value[index].items.findIndex(i => i.id === item)
    pages.value[index].items.splice(pageIndex, 1)
  }
}
</script>

<template>
  <WyxosMasonry :pages="pages" :on-load-next="onNext" :on-load-previous="onPrevious"
                @removeItem="onRemoveItem($event)" :max-pages="5"></WyxosMasonry>
</template>