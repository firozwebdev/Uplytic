<template>
  <div
    class="group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
    :class="[
      isDark
        ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border border-gray-600/50 hover:border-gray-500/70'
        : 'bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
    ]"
    @mouseenter="startAnimation"
    @mouseleave="stopAnimation"
  >
    <!-- Animated background gradient -->
    <div
      ref="gradientBg"
      class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      :class="gradientClass"
    ></div>
    
    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon -->
      <div class="mb-4">
        <div
          class="inline-flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 group-hover:scale-110"
          :class="iconBgClass"
        >
          <component
            :is="icon"
            class="w-6 h-6 transition-all duration-300"
            :class="iconColorClass"
          />
        </div>
      </div>

      <!-- Value -->
      <div class="mb-2">
        <div
          ref="valueElement"
          class="text-3xl font-bold transition-all duration-300"
          :class="isDark ? 'text-white' : 'text-gray-900'"
        >
          {{ animatedValue }}
        </div>
      </div>

      <!-- Label -->
      <div class="mb-3">
        <div
          class="text-sm font-medium transition-colors duration-300"
          :class="isDark ? 'text-gray-300' : 'text-gray-600'"
        >
          {{ label }}
        </div>
      </div>

      <!-- Trend -->
      <div v-if="trend" class="flex items-center space-x-2">
        <div
          class="flex items-center space-x-1 transition-all duration-300"
          :class="trendColorClass"
        >
          <component
            :is="trendIcon"
            class="w-4 h-4 transition-transform duration-300"
            :class="{ 'animate-bounce': isAnimating }"
          />
          <span class="text-sm font-medium">{{ trendValue }}</span>
        </div>
        <span
          class="text-xs transition-colors duration-300"
          :class="isDark ? 'text-gray-400' : 'text-gray-500'"
        >
          vs last period
        </span>
      </div>
    </div>

    <!-- Floating particles effect -->
    <div
      v-for="i in 3"
      :key="i"
      class="absolute w-2 h-2 rounded-full opacity-0 transition-all duration-1000"
      :class="particleClass"
      :style="getParticleStyle(i)"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  value: {
    type: [Number, String],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  trend: {
    type: String,
    default: null
  },
  trendValue: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: 'blue', // blue, green, purple, orange
    validator: (value) => ['blue', 'green', 'purple', 'orange'].includes(value)
  },
  isDark: {
    type: Boolean,
    default: false
  }
})

const valueElement = ref(null)
const gradientBg = ref(null)
const animatedValue = ref(props.value)
const isAnimating = ref(false)

const iconBgClass = computed(() => {
  const classes = {
    blue: 'bg-blue-500/20 group-hover:bg-blue-500/30',
    green: 'bg-green-500/20 group-hover:bg-green-500/30',
    purple: 'bg-purple-500/20 group-hover:bg-purple-500/30',
    orange: 'bg-orange-500/20 group-hover:bg-orange-500/30'
  }
  return classes[props.variant]
})

const iconColorClass = computed(() => {
  const classes = {
    blue: 'text-blue-600 group-hover:text-blue-700',
    green: 'text-green-600 group-hover:text-green-700',
    purple: 'text-purple-600 group-hover:text-purple-700',
    orange: 'text-orange-600 group-hover:text-orange-700'
  }
  return classes[props.variant]
})

const gradientClass = computed(() => {
  const classes = {
    blue: 'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-600/10',
    green: 'bg-gradient-to-br from-green-500/10 via-green-400/5 to-green-600/10',
    purple: 'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-purple-600/10',
    orange: 'bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-orange-600/10'
  }
  return classes[props.variant]
})

const trendColorClass = computed(() => {
  if (!props.trend) return ''
  return props.trend === 'up' ? 'text-green-500' : 'text-red-500'
})

const trendIcon = computed(() => {
  if (!props.trend) return null
  return props.trend === 'up' ? 'TrendingUpIcon' : 'TrendingDownIcon'
})

const particleClass = computed(() => {
  const classes = {
    blue: 'bg-blue-400',
    green: 'bg-green-400',
    purple: 'bg-purple-400',
    orange: 'bg-orange-400'
  }
  return classes[props.variant]
})

const startAnimation = () => {
  isAnimating.value = true
  animateValue()
}

const stopAnimation = () => {
  isAnimating.value = false
}

const animateValue = () => {
  if (typeof props.value === 'number') {
    const start = 0
    const end = props.value
    const duration = 1000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.round(start + (end - start) * easeOutQuart)
      
      animatedValue.value = currentValue

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }
}

const getParticleStyle = (index) => {
  const baseDelay = index * 200
  return {
    left: `${20 + index * 20}%`,
    top: `${30 + index * 10}%`,
    animationDelay: `${baseDelay}ms`,
    animationDuration: '2s'
  }
}

onMounted(() => {
  // Initial animation
  setTimeout(() => {
    animateValue()
  }, 500)
})

watch(() => props.value, (newValue) => {
  animatedValue.value = newValue
})

// Icon components
const TrendingUpIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>
  `
}

const TrendingDownIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"/>
    </svg>
  `
}
</script>

<style scoped>
/* Particle animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.6;
  }
}

.group:hover .absolute {
  animation: float 2s ease-in-out infinite;
}

/* Smooth transitions */
.group {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.group:hover {
  transform: translateY(-2px) scale(1.02);
}

/* Gradient animation */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.group:hover .bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}
</style> 