<script setup>
import HelloWorld from './components/HelloWorld.vue'
import FeatureCard from './components/FeatureCard.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">V</span>
            </div>
            <span class="text-xl font-bold text-gray-900">Vue Template</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <button class="btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="animate-fade-in">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Beautiful
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vue Template
            </span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            A modern, responsive template built with Vue 3, Vite, and Tailwind CSS. 
            Perfect for building fast, beautiful web applications.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-primary">Start Building</button>
            <button class="btn-secondary">View Documentation</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose This Template?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to build modern web applications
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Vue 3 Composition API"
            description="Modern Vue 3 with Composition API for better code organization and reusability"
            icon="⚡"
          />
          <FeatureCard
            title="Vite Build Tool"
            description="Lightning fast development server and optimized production builds"
            icon="🚀"
          />
          <FeatureCard
            title="Tailwind CSS"
            description="Utility-first CSS framework for rapid UI development"
            icon="🎨"
          />
          <FeatureCard
            title="Responsive Design"
            description="Mobile-first design that works perfectly on all devices"
            icon="📱"
          />
          <FeatureCard
            title="Modern Animations"
            description="Smooth transitions and micro-interactions for better UX"
            icon="✨"
          />
          <FeatureCard
            title="TypeScript Ready"
            description="Easily add TypeScript support for better development experience"
            icon="🔧"
          />
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <HelloWorld msg="Interactive Demo" />
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">V</span>
              </div>
              <span class="text-xl font-bold">Vue Template</span>
            </div>
            <p class="text-gray-400">
              A modern Vue 3 template with Vite and Tailwind CSS
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" class="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Resources</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Vue.js</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Vite</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Tailwind CSS</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Vue Template. Built with ❤️ using Vue 3, Vite, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>