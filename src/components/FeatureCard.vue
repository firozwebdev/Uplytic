<script setup>
defineProps({
  title: String,
  description: String,
  icon: String,
})
</script>

<template>
  <div class="card p-6 hover:scale-105 transition-transform duration-300 group">
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 group-hover:animate-bounce-gentle">
        <span class="text-2xl">{{ icon }}</span>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ title }}</h3>
      <p class="text-gray-600 leading-relaxed">{{ description }}</p>
    </div>
  </div>
</template>