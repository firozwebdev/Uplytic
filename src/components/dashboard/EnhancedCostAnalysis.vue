<template>
  <div class="enhanced-cost-analysis">
    <!-- Real-time Cost Predictions with Animated Countdown -->
    <div class="prediction-section mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 30-Day Projection with Countdown -->
        <div 
          class="prediction-card relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-700/50'
              : 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200'
          "
        >
          <div class="absolute top-0 right-0 w-20 h-20 opacity-10">
            <div class="w-full h-full bg-red-500 rounded-full animate-ping"></div>
          </div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-bold text-red-600 dark:text-red-400">
                🎯 30-Day Projection
              </h3>
              <div class="countdown-timer text-2xl font-mono font-bold text-red-600 dark:text-red-400">
                {{ countdownDays }}d {{ countdownHours }}h {{ countdownMinutes }}m
              </div>
            </div>
            
            <div class="text-3xl font-bold text-red-700 dark:text-red-300 mb-2">
              ${{ monthlyProjection }}
            </div>
            
            <div class="text-sm text-red-600 dark:text-red-400">
              If this continues, you'll lose this much in 30 days
            </div>
            
            <!-- Animated progress bar -->
            <div class="mt-4 w-full bg-red-200 dark:bg-red-800/30 rounded-full h-2">
              <div 
                class="h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000 ease-out animate-pulse"
                :style="{ width: `${projectionProgress}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Industry Benchmarking -->
        <div 
          class="prediction-card relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-blue-900/20 to-indigo-800/20 border border-blue-700/50'
              : 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200'
          "
        >
          <div class="absolute top-0 right-0 w-20 h-20 opacity-10">
            <div class="w-full h-full bg-blue-500 rounded-full animate-bounce"></div>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
              📊 Industry Comparison
            </h3>
            
            <div class="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              {{ industryComparison }}
            </div>
            
            <div class="text-sm text-blue-600 dark:text-blue-400 mb-4">
              Your downtime costs are {{ industryPercentage }}% {{ industryDirection }} than average
            </div>
            
            <!-- Animated comparison bars -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs text-blue-600 dark:text-blue-400">You</span>
                <div class="w-24 bg-blue-200 dark:bg-blue-800/30 rounded-full h-2">
                  <div 
                    class="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                    :style="{ width: `${yourPercentage}%` }"
                  ></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-600 dark:text-gray-400">Industry Avg</span>
                <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="h-2 bg-gray-500 rounded-full" style="width: 50%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ROI Calculator -->
        <div 
          class="prediction-card relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-green-900/20 to-emerald-800/20 border border-green-700/50'
              : 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200'
          "
        >
          <div class="absolute top-0 right-0 w-20 h-20 opacity-10">
            <div class="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
              💰 ROI Calculator
            </h3>
            
            <div class="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
              {{ roiPotential }}
            </div>
            
            <div class="text-sm text-green-600 dark:text-green-400 mb-4">
              Investing ${{ monitoringCost }} in monitoring could save you ${{ potentialSavings }}/month
            </div>
            
            <!-- ROI visualization -->
            <div class="relative">
              <div class="w-full h-8 bg-green-200 dark:bg-green-800/30 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out"
                  :style="{ width: `${roiPercentage}%` }"
                ></div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xs font-bold text-white drop-shadow">
                  {{ roiPercentage }}% ROI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive 3D Cost Visualization -->
    <div class="visualization-section mb-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 3D Cost Chart -->
        <div 
          class="cost-chart-3d relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-purple-900/20 to-pink-800/20 border border-purple-700/50'
              : 'bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200'
          "
        >
          <h3 class="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">
            🎨 3D Cost Impact Over Time
          </h3>
          
          <div class="relative h-64">
            <canvas ref="costChart3D" class="w-full h-full"></canvas>
            
            <!-- Floating dollar bills animation -->
            <div 
              v-for="i in 5" 
              :key="i"
              class="floating-dollar absolute text-2xl animate-bounce"
              :style="getFloatingDollarStyle(i)"
            >
              💵
            </div>
            
            <!-- Cost meter -->
            <div class="absolute bottom-4 left-4 right-4">
              <div class="cost-meter relative">
                <div class="w-full h-4 bg-purple-200 dark:bg-purple-800/30 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-purple-400 to-pink-600 transition-all duration-2000 ease-out"
                    :style="{ width: `${costMeterPercentage}%` }"
                  ></div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-sm font-bold text-white drop-shadow">
                    ${{ realTimeCost }} / ${{ maxCost }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real-World Impact Visualization -->
        <div 
          class="real-world-impact relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-amber-900/20 to-orange-800/20 border border-amber-700/50'
              : 'bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200'
          "
        >
          <h3 class="text-lg font-bold text-amber-600 dark:text-amber-400 mb-4">
            🌍 Real-World Impact
          </h3>
          
          <div class="space-y-4">
            <div 
              v-for="(item, index) in realWorldComparisons" 
              :key="index"
              class="comparison-item flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              :class="
                isDark
                  ? 'bg-amber-800/30 hover:bg-amber-800/50'
                  : 'bg-amber-100 hover:bg-amber-200'
              "
              @click="animateComparison(index)"
            >
              <div class="flex items-center space-x-3">
                <div class="text-2xl">{{ item.icon }}</div>
                <div>
                  <div class="text-sm font-medium text-amber-800 dark:text-amber-300">
                    {{ item.label }}
                  </div>
                  <div class="text-xs text-amber-600 dark:text-amber-400">
                    {{ item.description }}
                  </div>
                </div>
              </div>
              <div class="text-lg font-bold text-amber-700 dark:text-amber-300">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gamification Elements -->
    <div class="gamification-section mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Cost Savings Achievement -->
        <div 
          class="achievement-card relative overflow-hidden rounded-xl p-4 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-yellow-900/20 to-amber-800/20 border border-yellow-700/50'
              : 'bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200'
          "
        >
          <div class="absolute top-0 right-0 w-16 h-16 opacity-20">
            <div class="w-full h-full bg-yellow-500 rounded-full animate-ping"></div>
          </div>
          
          <div class="relative z-10 text-center">
            <div class="text-3xl mb-2">🏆</div>
            <div class="text-lg font-bold text-yellow-700 dark:text-yellow-300">
              Cost Saver
            </div>
            <div class="text-sm text-yellow-600 dark:text-yellow-400">
              Saved ${{ monthlySavings }} this month!
            </div>
          </div>
        </div>

        <!-- Uptime Streak -->
        <div 
          class="achievement-card relative overflow-hidden rounded-xl p-4 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-green-900/20 to-emerald-800/20 border border-green-700/50'
              : 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200'
          "
        >
          <div class="relative z-10 text-center">
            <div class="text-3xl mb-2">🔥</div>
            <div class="text-lg font-bold text-green-700 dark:text-green-300">
              {{ uptimeStreak }} Days
            </div>
            <div class="text-sm text-green-600 dark:text-green-400">
              Uptime Streak
            </div>
          </div>
        </div>

        <!-- Cost Optimization Challenge -->
        <div 
          class="achievement-card relative overflow-hidden rounded-xl p-4 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-blue-900/20 to-indigo-800/20 border border-blue-700/50'
              : 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200'
          "
        >
          <div class="relative z-10 text-center">
            <div class="text-3xl mb-2">🎯</div>
            <div class="text-lg font-bold text-blue-700 dark:text-blue-300">
              Challenge
            </div>
            <div class="text-sm text-blue-600 dark:text-blue-400">
              Get under $100/month
            </div>
          </div>
        </div>

        <!-- Leaderboard Position -->
        <div 
          class="achievement-card relative overflow-hidden rounded-xl p-4 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-purple-900/20 to-pink-800/20 border border-purple-700/50'
              : 'bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200'
          "
        >
          <div class="relative z-10 text-center">
            <div class="text-3xl mb-2">🥇</div>
            <div class="text-lg font-bold text-purple-700 dark:text-purple-300">
              #{{ leaderboardPosition }}
            </div>
            <div class="text-sm text-purple-600 dark:text-purple-400">
              Leaderboard Rank
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Financial Metrics -->
    <div class="financial-metrics-section mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Customer Lifetime Value Impact -->
        <div 
          class="metric-card relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-indigo-900/20 to-blue-800/20 border border-indigo-700/50'
              : 'bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200'
          "
        >
          <h3 class="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3">
            👥 CLV Impact
          </h3>
          
          <div class="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
            {{ clvImpact }} customers
          </div>
          
          <div class="text-sm text-indigo-600 dark:text-indigo-400">
            Each minute of downtime costs you {{ clvImpact }} potential customers
          </div>
        </div>

        <!-- Revenue per Minute -->
        <div 
          class="metric-card relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-emerald-900/20 to-green-800/20 border border-emerald-700/50'
              : 'bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200'
          "
        >
          <h3 class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-3">
            💸 Revenue/Minute
          </h3>
          
          <div class="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
            ${{ revenuePerMinute }}
          </div>
          
          <div class="text-sm text-emerald-600 dark:text-emerald-400">
            Real-time revenue generation rate
          </div>
        </div>

        <!-- Competitive Advantage Loss -->
        <div 
          class="metric-card relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-red-900/20 to-pink-800/20 border border-red-700/50'
              : 'bg-gradient-to-br from-red-50 to-pink-100 border border-red-200'
          "
        >
          <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-3">
            ⚔️ Market Share Loss
          </h3>
          
          <div class="text-3xl font-bold text-red-700 dark:text-red-300 mb-2">
            {{ marketShareLoss }}%
          </div>
          
          <div class="text-sm text-red-600 dark:text-red-400">
            Competitors gaining during downtime
          </div>
        </div>
      </div>
    </div>

    <!-- Micro-Interactions & Animations -->
    <div class="micro-interactions-section">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Real-time Money Counter -->
        <div 
          class="money-counter relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-green-900/20 to-emerald-800/20 border border-green-700/50'
              : 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200'
          "
        >
          <h3 class="text-lg font-bold text-green-600 dark:text-green-400 mb-4">
            💰 Real-time Cost Counter
          </h3>
          
          <div class="text-center">
            <div class="text-4xl font-mono font-bold text-green-700 dark:text-green-300 mb-2">
              ${{ realTimeCostCounter }}
            </div>
            
            <div class="text-sm text-green-600 dark:text-green-400 mb-4">
              Lost during current downtime
            </div>
            
            <!-- Animated money stack -->
            <div class="relative h-16">
              <div 
                v-for="i in 3" 
                :key="i"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce"
                :style="{ 
                  bottom: `${(i - 1) * 8}px`,
                  animationDelay: `${i * 0.2}s`
                }"
              >
                💵
              </div>
            </div>
          </div>
        </div>

        <!-- Cost Threshold Alerts -->
        <div 
          class="threshold-alerts relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-orange-900/20 to-red-800/20 border border-orange-700/50'
              : 'bg-gradient-to-br from-orange-50 to-red-100 border border-orange-200'
          "
        >
          <h3 class="text-lg font-bold text-orange-600 dark:text-orange-400 mb-4">
            🚨 Cost Alerts
          </h3>
          
          <div class="space-y-3">
            <div 
              v-for="alert in costAlerts" 
              :key="alert.id"
              class="alert-item flex items-center justify-between p-3 rounded-lg transition-all duration-300"
              :class="
                alert.triggered
                  ? isDark
                    ? 'bg-red-800/30 border border-red-600/50 animate-pulse'
                    : 'bg-red-100 border border-red-300 animate-pulse'
                  : isDark
                    ? 'bg-gray-700/30 border border-gray-600/50'
                    : 'bg-gray-100 border border-gray-300'
              "
            >
              <div class="flex items-center space-x-3">
                <div class="text-xl">{{ alert.icon }}</div>
                <div>
                  <div class="text-sm font-medium" :class="alert.triggered ? 'text-red-800 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'">
                    {{ alert.title }}
                  </div>
                  <div class="text-xs" :class="alert.triggered ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'">
                    {{ alert.description }}
                  </div>
                </div>
              </div>
              <div class="text-sm font-bold" :class="alert.triggered ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'">
                ${{ alert.threshold }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  api: {
    type: Object,
    required: true
  },
  logs: {
    type: Array,
    default: () => []
  },
  isDark: {
    type: Boolean,
    default: false
  }
});

// Reactive state
const countdownDays = ref(30);
const countdownHours = ref(0);
const countdownMinutes = ref(0);
const realTimeCostCounter = ref(0);
const costMeterPercentage = ref(0);
const projectionProgress = ref(0);
const costChart3D = ref(null);

// Computed properties
const monthlyProjection = computed(() => {
  if (!props.api.cost_per_hour) return '0.00';
  const failedLogs = props.logs.filter(log => log.status_code >= 400);
  const downtimeHours = failedLogs.length * (1 / 60);
  const dailyLoss = downtimeHours * props.api.cost_per_hour;
  return (dailyLoss * 30).toFixed(2);
});

const industryComparison = computed(() => {
  const avgCost = 150; // Industry average
  const currentCost = parseFloat(monthlyProjection.value);
  return currentCost > avgCost ? 'Above Average' : 'Below Average';
});

const industryPercentage = computed(() => {
  const avgCost = 150;
  const currentCost = parseFloat(monthlyProjection.value);
  return Math.abs(Math.round(((currentCost - avgCost) / avgCost) * 100));
});

const industryDirection = computed(() => {
  const avgCost = 150;
  const currentCost = parseFloat(monthlyProjection.value);
  return currentCost > avgCost ? 'higher' : 'lower';
});

const yourPercentage = computed(() => {
  const avgCost = 150;
  const currentCost = parseFloat(monthlyProjection.value);
  return Math.min(Math.round((currentCost / avgCost) * 100), 100);
});

const roiPotential = computed(() => {
  const monitoringCost = 500;
  const potentialSavings = parseFloat(monthlyProjection.value) * 0.3;
  return Math.round((potentialSavings / monitoringCost) * 100);
});

const monitoringCost = computed(() => 500);

const potentialSavings = computed(() => {
  return (parseFloat(monthlyProjection.value) * 0.3).toFixed(2);
});

const roiPercentage = computed(() => {
  return Math.min(roiPotential.value, 100);
});

const realWorldComparisons = computed(() => {
  const cost = parseFloat(monthlyProjection.value);
  return [
    {
      icon: '☕',
      label: 'Cups of Coffee',
      description: 'This downtime cost equals',
      value: Math.round(cost / 5)
    },
    {
      icon: '🍕',
      label: 'Pizzas',
      description: 'You could buy',
      value: Math.round(cost / 15)
    },
    {
      icon: '⏰',
      label: 'Developer Hours',
      description: 'This is equivalent to',
      value: Math.round(cost / 50)
    },
    {
      icon: '📱',
      label: 'iPhone 15s',
      description: 'You could buy',
      value: Math.round(cost / 800)
    }
  ];
});

const monthlySavings = computed(() => {
  return (parseFloat(monthlyProjection.value) * 0.2).toFixed(2);
});

const uptimeStreak = computed(() => {
  const successfulLogs = props.logs.filter(log => log.status_code < 400);
  return Math.min(successfulLogs.length, 30);
});

const leaderboardPosition = computed(() => {
  const cost = parseFloat(monthlyProjection.value);
  if (cost < 50) return 1;
  if (cost < 100) return 2;
  if (cost < 200) return 3;
  return 4;
});

const clvImpact = computed(() => {
  const cost = parseFloat(monthlyProjection.value);
  return Math.round(cost / 10);
});

const revenuePerMinute = computed(() => {
  if (!props.api.cost_per_hour) return '0.00';
  return (props.api.cost_per_hour / 60).toFixed(2);
});

const marketShareLoss = computed(() => {
  const cost = parseFloat(monthlyProjection.value);
  return Math.min(Math.round(cost / 10), 25);
});

const costAlerts = computed(() => [
  {
    id: 1,
    icon: '💰',
    title: 'Daily Budget Exceeded',
    description: 'You\'ve exceeded your daily budget!',
    threshold: '100',
    triggered: parseFloat(monthlyProjection.value) > 100
  },
  {
    id: 2,
    icon: '📈',
    title: 'Cost Trend Alert',
    description: 'Your costs are trending upward',
    threshold: '200',
    triggered: parseFloat(monthlyProjection.value) > 200
  },
  {
    id: 3,
    icon: '🎉',
    title: 'Savings Celebration',
    description: 'Congratulations! You saved money this week',
    threshold: '50',
    triggered: parseFloat(monthlyProjection.value) < 50
  }
]);

// Methods
function updateCountdown() {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const timeLeft = endOfMonth - now;
  
  countdownDays.value = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  countdownHours.value = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  countdownMinutes.value = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
}

function updateRealTimeCost() {
  if (!props.api.cost_per_hour) return;
  
  const failedLogs = props.logs.filter(log => log.status_code >= 400);
  const downtimeMinutes = failedLogs.length;
  const costPerMinute = props.api.cost_per_hour / 60;
  realTimeCostCounter.value = (downtimeMinutes * costPerMinute).toFixed(2);
  
  // Update cost meter
  const maxCost = props.api.cost_per_hour;
  costMeterPercentage.value = Math.min((realTimeCostCounter.value / maxCost) * 100, 100);
  
  // Update projection progress
  const maxProjection = 1000;
  projectionProgress.value = Math.min((parseFloat(monthlyProjection.value) / maxProjection) * 100, 100);
}

function getFloatingDollarStyle(index) {
  const positions = [
    { left: '10%', top: '20%', animationDelay: '0s' },
    { left: '30%', top: '40%', animationDelay: '0.5s' },
    { left: '50%', top: '60%', animationDelay: '1s' },
    { left: '70%', top: '30%', animationDelay: '1.5s' },
    { left: '90%', top: '50%', animationDelay: '2s' }
  ];
  
  return {
    ...positions[index - 1],
    animationDuration: '3s'
  };
}

function animateComparison(index) {
  // Add animation effect when clicking comparison items
  const element = event.target.closest('.comparison-item');
  if (element) {
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 200);
  }
}

function create3DChart() {
  if (!costChart3D.value) return;
  
  const ctx = costChart3D.value.getContext('2d');
  const width = costChart3D.value.width;
  const height = costChart3D.value.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Create 3D effect with gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(147, 51, 234, 0.8)');
  gradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)');
  
  // Draw 3D bars
  const barWidth = width / 10;
  const maxHeight = height * 0.6;
  
  for (let i = 0; i < 10; i++) {
    const x = i * barWidth + barWidth / 2;
    const barHeight = Math.random() * maxHeight;
    const y = height - barHeight - 20;
    
    // 3D effect
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth - 4, barHeight);
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(x + 2, y + 2, barWidth - 4, barHeight);
  }
}

// Lifecycle
let countdownInterval;
let costUpdateInterval;

onMounted(() => {
  updateCountdown();
  updateRealTimeCost();
  
  countdownInterval = setInterval(updateCountdown, 60000); // Update every minute
  costUpdateInterval = setInterval(updateRealTimeCost, 5000); // Update every 5 seconds
  
  // Initialize 3D chart
  setTimeout(create3DChart, 100);
});

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval);
  if (costUpdateInterval) clearInterval(costUpdateInterval);
});

// Watch for changes
watch(() => props.logs, updateRealTimeCost, { deep: true });
watch(() => props.api.cost_per_hour, updateRealTimeCost);
</script>

<style scoped>
.enhanced-cost-analysis {
  @apply space-y-6;
}

.prediction-card,
.cost-chart-3d,
.real-world-impact,
.achievement-card,
.metric-card,
.money-counter,
.threshold-alerts {
  @apply shadow-lg hover:shadow-xl;
}

.floating-dollar {
  pointer-events: none;
}

.comparison-item {
  cursor: pointer;
}

.comparison-item:hover {
  transform: scale(1.02);
}

.alert-item.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Enhanced animations */
.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Glassmorphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Gradient animations */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Dark theme specific enhancements */
.dark .bg-gradient-to-br {
  background-size: 150% 150%;
}

.dark .hover\:scale-105:hover {
  transform: scale(1.02);
}

/* Enhanced dark theme contrast */
.dark .text-gray-300 {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dark .text-white {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Improved dark theme borders */
.dark .border-gray-700\/50 {
  border-color: rgba(55, 65, 81, 0.5);
}

.dark .border-gray-600\/50 {
  border-color: rgba(75, 85, 99, 0.5);
}

/* Dark theme hover states */
.dark .hover\:bg-gray-700\/70:hover {
  background-color: rgba(55, 65, 81, 0.7);
}

.dark .hover\:border-gray-500\/50:hover {
  border-color: rgba(107, 114, 128, 0.5);
}
</style> 