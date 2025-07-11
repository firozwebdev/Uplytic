<template>
  <div
    class="min-h-screen transition-colors duration-300"
    :class="
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    "
  >
    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 z-40 h-screen w-64 transform transition-all duration-300 ease-in-out"
      :class="
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      "
    >
      <div
        class="flex h-full flex-col backdrop-blur-xl shadow-xl border-r transition-colors duration-300"
        :class="
          isDark
            ? 'bg-gray-900/90 border-gray-700/50'
            : 'bg-white/80 border-gray-200/50'
        "
      >
        <!-- Logo -->
        <div
          class="flex h-16 items-center justify-center border-b transition-colors duration-300"
          :class="isDark ? 'border-gray-700/50' : 'border-gray-200/50'"
        >
          <div class="flex items-center space-x-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg"
            >
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h1
                class="text-xl font-bold transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                Uplytic
              </h1>
              <p
                class="text-xs transition-colors duration-300"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                API Health Monitor
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 space-y-1 px-4 py-6">
          <router-link
            to="/dashboard"
            class="group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200"
            :class="
              $route.name === 'Dashboard'
                ? isDark
                  ? 'bg-blue-600/20 text-blue-400 shadow-sm border border-blue-500/30'
                  : 'bg-blue-50 text-blue-700 shadow-sm'
                : isDark
                ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            "
          >
            <svg
              class="mr-3 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
              />
            </svg>
            Dashboard
          </router-link>

          <button
            @click="showAddApiModal = true"
            class="group flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200"
            :class="
              isDark
                ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            "
          >
            <svg
              class="mr-3 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add API
          </button>
        </nav>

        <!-- Footer -->
        <div
          class="border-t p-4 transition-colors duration-300"
          :class="isDark ? 'border-gray-700/50' : 'border-gray-200/50'"
        >
          <div
            class="rounded-lg p-3 transition-colors duration-300"
            :class="
              isDark
                ? 'bg-gradient-to-r from-gray-800 to-gray-700'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50'
            "
          >
            <p
              class="text-xs text-center transition-colors duration-300"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Built for DevNetwork Hackathon 2025
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Top Navigation -->
      <header
        class="sticky top-0 z-30 backdrop-blur-xl border-b transition-colors duration-300"
        :class="
          isDark
            ? 'bg-gray-900/80 border-gray-700/50'
            : 'bg-white/80 border-gray-200/50'
        "
      >
        <div
          class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <!-- Mobile menu button -->
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden rounded-lg p-2 transition-colors duration-200"
            :class="
              isDark
                ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            "
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <!-- Page title -->
          <div class="flex-1 lg:flex-none">
            <h1
              class="text-xl font-semibold transition-colors duration-300"
              :class="isDark ? 'text-white' : 'text-gray-900'"
            >
              {{ pageTitle }}
            </h1>
          </div>

          <!-- Right side actions -->
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="relative inline-flex h-10 w-20 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :class="
                isDark
                  ? 'bg-blue-600 focus:ring-offset-gray-900'
                  : 'bg-gray-200 focus:ring-offset-white'
              "
            >
              <span
                class="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300"
                :class="isDark ? 'translate-x-11' : 'translate-x-1'"
              />
              <svg
                class="absolute left-2 h-4 w-4 text-yellow-500 transition-opacity duration-300"
                :class="isDark ? 'opacity-0' : 'opacity-100'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="absolute right-2 h-4 w-4 text-gray-400 transition-opacity duration-300"
                :class="isDark ? 'opacity-100' : 'opacity-0'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                />
              </svg>
            </button>

            <button
              @click="exportPDF"
              class="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :class="
                isDark
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-offset-gray-900'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-offset-white'
              "
            >
              <svg
                class="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot :isDark="isDark" />
      </main>
    </div>

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 lg:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const sidebarOpen = ref(false);
const showAddApiModal = ref(false);
const isDark = ref(false);

const pageTitle = computed(() => {
  switch (route.name) {
    case "Dashboard":
      return "API Health Dashboard";
    case "PublicDashboard":
      return "Public Dashboard";
    default:
      return "Uplytic";
  }
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark", isDark.value);
};

const exportPDF = () => {
  // TODO: Implement PDF export
  console.log("Exporting PDF...");
};

onMounted(() => {
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  isDark.value = savedTheme === "dark" || (!savedTheme && prefersDark);
  document.documentElement.classList.toggle("dark", isDark.value);
});
</script>
