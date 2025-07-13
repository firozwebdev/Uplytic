<template>
  <div class="enhanced-cost-analysis">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-text">Analyzing costs...</div>
      </div>
    </div>

    <!-- Real-time Cost Predictions with Animated Countdown -->
    <div class="prediction-section mb-8">
      <div class="section-header mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          📊 Real-time Cost Analysis
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          AI-powered insights with live financial impact tracking
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 30-Day Projection with Countdown -->
        <div 
          class="prediction-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <div class="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div class="w-full h-full bg-red-500 rounded-full animate-ping"></div>
          </div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-red-600 dark:text-red-400 flex items-center">
                <span class="mr-2">🎯</span>
                30-Day Projection
              </h3>
              <div class="countdown-timer text-2xl font-mono font-bold text-red-600 dark:text-red-400 animate-pulse">
                {{ countdownDays }}d {{ countdownHours }}h {{ countdownMinutes }}m
              </div>
            </div>
            
            <div class="text-4xl font-bold text-red-700 dark:text-red-300 mb-3 animate-number">
              ${{ monthlyProjection }}
            </div>
            
            <div class="text-sm text-red-600 dark:text-red-400 mb-4">
              If this continues, you'll lose this much in 30 days
            </div>
            
            <!-- Enhanced animated progress bar -->
            <div class="mt-4 w-full bg-red-200 dark:bg-red-800/30 rounded-full h-3 overflow-hidden">
              <div 
                class="h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-2000 ease-out animate-pulse relative"
                :style="{ width: `${projectionProgress}%` }"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Industry Benchmarking -->
        <div 
          class="prediction-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-blue-900/20 to-indigo-800/20 border border-blue-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <div class="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div class="w-full h-full bg-blue-500 rounded-full animate-bounce"></div>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
              <span class="mr-2">📊</span>
              Industry Comparison
            </h3>
            
            <div class="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-3 animate-number">
              {{ industryComparison }}
            </div>
            
            <div class="text-sm text-blue-600 dark:text-blue-400 mb-6">
              Your downtime costs are {{ industryPercentage }}% {{ industryDirection }} than average
            </div>
            
            <!-- Enhanced animated comparison bars -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-blue-600 dark:text-blue-400">You</span>
                <div class="w-32 bg-blue-200 dark:bg-blue-800/30 rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-2000 ease-out relative"
                    :style="{ width: `${yourPercentage}%` }"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Industry Avg</span>
                <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div class="h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full" style="width: 50%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ROI Calculator -->
        <div 
          class="prediction-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-green-900/20 to-emerald-800/20 border border-green-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <div class="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div class="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center">
              <span class="mr-2">💰</span>
              ROI Calculator
            </h3>
            
            <div class="text-4xl font-bold text-green-700 dark:text-green-300 mb-3 animate-number">
              {{ roiPotential }}%
            </div>
            
            <div class="text-sm text-green-600 dark:text-green-400 mb-6">
              Investing ${{ monitoringCost }} in monitoring could save you ${{ potentialSavings }}/month
            </div>
            
            <!-- Enhanced ROI visualization -->
            <div class="relative">
              <div class="w-full h-10 bg-green-200 dark:bg-green-800/30 rounded-full overflow-hidden shadow-inner">
                <div 
                  class="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-2000 ease-out relative"
                  :style="{ width: `${roiPercentage}%` }"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-sm font-bold text-white drop-shadow-lg">
                  {{ roiPercentage }}% ROI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive 3D Cost Visualization -->
    <div class="visualization-section mb-8">
      <div class="section-header mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          🎨 Interactive Cost Visualization
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Hover over bars to see detailed cost breakdowns
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 3D Cost Chart -->
        <div 
          class="cost-chart-3d relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-purple-900/20 to-pink-800/20 border border-purple-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 shadow-lg'
          "
        >
          <h3 class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-6 flex items-center">
            <span class="mr-2">📈</span>
            3D Cost Impact Over Time
          </h3>
          
          <div class="relative h-80">
            <canvas 
              ref="costChart3D" 
              class="w-full h-full cursor-pointer rounded-lg"
              @mousemove="handleChartMouseMove"
              @mouseleave="hideTooltip"
            ></canvas>
            
            <!-- Enhanced Interactive Tooltip -->
            <div 
              v-if="tooltipVisible"
              class="absolute z-20 bg-black/95 text-white p-4 rounded-xl shadow-2xl pointer-events-none backdrop-blur-sm border border-white/20"
              :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
            >
              <div class="text-sm font-semibold mb-2">{{ tooltipData.time }}</div>
              <div class="space-y-1">
                <div class="text-xs text-gray-300 flex justify-between">
                  <span>Cost:</span>
                  <span class="font-semibold">${{ tooltipData.cost.toFixed(2) }}</span>
                </div>
                <div class="text-xs text-gray-300 flex justify-between">
                  <span>Downtime:</span>
                  <span class="font-semibold">{{ tooltipData.downtimeMinutes }} min</span>
                </div>
                <div class="text-xs text-gray-300 flex justify-between">
                  <span>Total Checks:</span>
                  <span class="font-semibold">{{ tooltipData.totalLogs }}</span>
                </div>
              </div>
            </div>
            
            <!-- Enhanced floating dollar bills animation -->
            <div 
              v-for="i in 8" 
              :key="i"
              class="floating-dollar absolute text-3xl animate-bounce"
              :style="getFloatingDollarStyle(i)"
            >
              💵
            </div>
            
            <!-- Enhanced cost meter -->
            <div class="absolute bottom-6 left-6 right-6">
              <div class="cost-meter relative">
                <div class="w-full h-6 bg-purple-200 dark:bg-purple-800/30 rounded-full overflow-hidden shadow-inner">
                  <div 
                    class="h-full bg-gradient-to-r from-purple-400 to-pink-600 transition-all duration-2000 ease-out relative"
                    :style="{ width: `${costMeterPercentage}%` }"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-sm font-bold text-white drop-shadow-lg">
                    ${{ realTimeCost }} / ${{ maxCost }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real-World Impact Visualization -->
        <div 
          class="real-world-impact relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-amber-900/20 to-orange-800/20 border border-amber-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 shadow-lg'
          "
        >
          <h3 class="text-xl font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center">
            <span class="mr-2">🌍</span>
            Real-World Impact
          </h3>
          
          <div class="space-y-4">
            <div 
              v-for="(item, index) in realWorldComparisons" 
              :key="index"
              class="comparison-item flex items-center justify-between p-4 rounded-xl transition-all duration-500 hover:scale-105 cursor-pointer group"
              :class="
                isDark
                  ? 'bg-amber-800/30 hover:bg-amber-800/50 border border-amber-700/50'
                  : 'bg-amber-100 hover:bg-amber-200 border border-amber-200'
              "
              @click="animateComparison(index)"
            >
              <div class="flex items-center space-x-4">
                <div class="text-3xl group-hover:scale-110 transition-transform duration-300">{{ item.icon }}</div>
                <div>
                  <div class="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    {{ item.label }}
                  </div>
                  <div class="text-xs text-amber-600 dark:text-amber-400">
                    {{ item.description }}
                  </div>
                </div>
              </div>
              <div class="text-xl font-bold text-amber-700 dark:text-amber-300 group-hover:scale-110 transition-transform duration-300">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Gamification Elements -->
    <div class="gamification-section mb-8">
      <div class="section-header mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          🏆 Achievements & Progress
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Track your performance and unlock achievements
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Cost Savings Achievement -->
        <div 
          class="achievement-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-yellow-900/20 to-amber-800/20 border border-yellow-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <div class="absolute top-0 right-0 w-20 h-20 opacity-20">
            <div class="w-full h-full bg-yellow-500 rounded-full animate-ping"></div>
          </div>
          
          <div class="relative z-10 text-center">
            <div class="text-4xl mb-3 animate-bounce">🏆</div>
            <div class="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-2">
              Cost Saver
            </div>
            <div class="text-sm text-yellow-600 dark:text-yellow-400">
              Saved ${{ monthlySavings }} this month!
            </div>
          </div>
        </div>

        <!-- Uptime Streak -->
        <div 
          class="achievement-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-green-900/20 to-emerald-800/20 border border-green-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <div class="relative z-10 text-center">
            <div class="text-4xl mb-3 animate-pulse">🔥</div>
            <div class="text-lg font-bold text-green-700 dark:text-green-300 mb-2">
              {{ uptimeStreak }} Days
            </div>
            <div class="text-sm text-green-600 dark:text-green-400">
              Uptime Streak
            </div>
          </div>
        </div>

        <!-- Cost Optimization Challenge -->
        <div 
          class="achievement-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-blue-900/20 to-indigo-800/20 border border-blue-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <div class="relative z-10 text-center">
            <div class="text-4xl mb-3 animate-pulse">🎯</div>
            <div class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
              Challenge
            </div>
            <div class="text-sm text-blue-600 dark:text-blue-400">
              Get under $100/month
            </div>
          </div>
        </div>

        <!-- Leaderboard Position -->
        <div 
          class="achievement-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-purple-900/20 to-pink-800/20 border border-purple-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <div class="relative z-10 text-center">
            <div class="text-4xl mb-3 animate-bounce">🥇</div>
            <div class="text-lg font-bold text-purple-700 dark:text-purple-300 mb-2">
              #{{ leaderboardPosition }}
            </div>
            <div class="text-sm text-purple-600 dark:text-purple-400">
              Leaderboard Rank
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Financial Metrics -->
    <div class="financial-metrics-section mb-8">
      <div class="section-header mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          📊 Advanced Financial Metrics
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Deep insights into your financial impact
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Customer Lifetime Value Impact -->
        <div 
          class="metric-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-indigo-900/20 to-blue-800/20 border border-indigo-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center">
            <span class="mr-2">👥</span>
            CLV Impact
          </h3>
          
          <div class="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-3 animate-number">
            {{ clvImpact }} customers
          </div>
          
          <div class="text-sm text-indigo-600 dark:text-indigo-400">
            Each minute of downtime costs you {{ clvImpact }} potential customers
          </div>
        </div>

        <!-- Revenue per Minute -->
        <div 
          class="metric-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-emerald-900/20 to-green-800/20 border border-emerald-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <h3 class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center">
            <span class="mr-2">💸</span>
            Revenue/Minute
          </h3>
          
          <div class="text-4xl font-bold text-emerald-700 dark:text-emerald-300 mb-3 animate-number">
            ${{ revenuePerMinute }}
          </div>
          
          <div class="text-sm text-emerald-600 dark:text-emerald-400">
            Real-time revenue generation rate
          </div>
        </div>

        <!-- Competitive Advantage Loss -->
        <div 
          class="metric-card relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-red-900/20 to-pink-800/20 border border-red-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-red-50 to-pink-100 border border-red-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <h3 class="text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center">
            <span class="mr-2">⚔️</span>
            Market Share Loss
          </h3>
          
          <div class="text-4xl font-bold text-red-700 dark:text-red-300 mb-3 animate-number">
            {{ marketShareLoss }}%
          </div>
          
          <div class="text-sm text-red-600 dark:text-red-400">
            Competitors gaining during downtime
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Micro-Interactions & Animations -->
    <div class="micro-interactions-section">
      <div class="section-header mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          ⚡ Live Monitoring & Alerts
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Real-time cost tracking and intelligent alerts
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Enhanced Real-time Money Counter -->
        <div 
          class="money-counter relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-green-900/20 to-emerald-800/20 border border-green-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <h3 class="text-xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center">
            <span class="mr-2">💰</span>
            Real-time Cost Counter
          </h3>
          
          <div class="text-center">
            <div class="text-5xl font-mono font-bold text-green-700 dark:text-green-300 mb-4 animate-number">
              ${{ realTimeCostCounter }}
            </div>
            
            <div class="text-sm text-green-600 dark:text-green-400 mb-6">
              Lost during current downtime
            </div>
            
            <!-- Enhanced animated money stack -->
            <div class="relative h-20">
              <div 
                v-for="i in 4" 
                :key="i"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce"
                :style="{ 
                  bottom: `${(i - 1) * 10}px`,
                  animationDelay: `${i * 0.2}s`
                }"
              >
                💵
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Real-time Cost Impact Animation -->
        <div 
          class="cost-impact-animation relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          :class="
            isDark
              ? 'bg-gradient-to-br from-red-900/20 to-pink-800/20 border border-red-700/50 backdrop-blur-sm'
              : 'bg-gradient-to-br from-red-50 to-pink-100 border border-red-200 shadow-lg'
          "
          @mouseenter="startCardAnimation"
        >
          <h3 class="text-xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center">
            <span class="mr-2">💸</span>
            Live Cost Impact
          </h3>
          
          <div class="relative h-40">
            <!-- Enhanced money flowing out animation -->
            <div 
              v-for="i in 10" 
              :key="i"
              class="absolute text-2xl animate-money-flow"
              :style="getMoneyFlowStyle(i)"
            >
              💸
            </div>
            
            <!-- Enhanced cost impact meter -->
            <div class="absolute bottom-6 left-0 right-0">
              <div class="cost-impact-meter relative">
                <div class="w-full h-8 bg-red-200 dark:bg-red-800/30 rounded-full overflow-hidden shadow-inner">
                  <div 
                    class="h-full bg-gradient-to-r from-red-400 to-pink-600 transition-all duration-2000 ease-out relative"
                    :style="{ width: `${costImpactPercentage}%` }"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-sm font-bold text-white drop-shadow-lg">
                    Impact: ${{ realTimeCost }} / hr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Cost Threshold Alerts -->
      <div class="mt-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="alert in costAlerts" 
            :key="alert.id"
            class="alert-item relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-105"
            :class="
              alert.triggered
                ? isDark
                  ? 'bg-red-800/30 border border-red-600/50 animate-pulse shadow-lg'
                  : 'bg-red-100 border border-red-300 animate-pulse shadow-lg'
                : isDark
                  ? 'bg-gray-700/30 border border-gray-600/50 shadow-lg'
                  : 'bg-gray-100 border border-gray-300 shadow-lg'
            "
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="text-3xl">{{ alert.icon }}</div>
                <div>
                  <div class="text-lg font-semibold" :class="alert.triggered ? 'text-red-800 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'">
                    {{ alert.title }}
                  </div>
                  <div class="text-sm" :class="alert.triggered ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'">
                    {{ alert.description }}
                  </div>
                </div>
              </div>
              <div class="text-2xl font-bold" :class="alert.triggered ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'">
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
const isLoading = ref(false);

// Tooltip state for 3D chart
const tooltipVisible = ref(false);
const tooltipX = ref(0);
const tooltipY = ref(0);
const tooltipData = ref({
  time: '',
  cost: 0,
  downtimeMinutes: 0,
  totalLogs: 0
});

// Generate real cost data for 3D chart
const costData = computed(() => {
  if (!props.logs.length) {
    // Fallback demo data
    return Array.from({ length: 10 }, (_, i) => ({
      time: `${i + 1}h ago`,
      cost: Math.random() * 50 + 10,
      downtimeMinutes: Math.floor(Math.random() * 30) + 5,
      totalLogs: Math.floor(Math.random() * 100) + 20
    }));
  }

  // Group logs by hour and calculate costs
  const hourlyData = [];
  const now = new Date();
  
  for (let i = 9; i >= 0; i--) {
    const hourStart = new Date(now.getTime() - (i * 60 * 60 * 1000));
    const hourEnd = new Date(hourStart.getTime() + (60 * 60 * 1000));
    
    const hourLogs = props.logs.filter(log => {
      const logTime = new Date(log.timestamp);
      return logTime >= hourStart && logTime < hourEnd;
    });
    
    const failedLogs = hourLogs.filter(log => log.status_code >= 400);
    const downtimeMinutes = failedLogs.length;
    const costPerMinute = props.api.cost_per_hour / 60;
    const cost = downtimeMinutes * costPerMinute;
    
    hourlyData.push({
      time: i === 0 ? 'Now' : `${i}h ago`,
      cost: cost,
      downtimeMinutes: downtimeMinutes,
      totalLogs: hourLogs.length
    });
  }
  
  return hourlyData;
});

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

const realTimeCost = computed(() => {
  if (!props.api.cost_per_hour) return 0;
  const failedLogs = props.logs.filter(log => log.status_code >= 400);
  const downtimeMinutes = failedLogs.length;
  const costPerMinute = props.api.cost_per_hour / 60;
  return (downtimeMinutes * costPerMinute).toFixed(2);
});

const maxCost = computed(() => {
  return props.api.cost_per_hour || 100;
});

const costImpactPercentage = computed(() => {
  const cost = parseFloat(realTimeCost.value);
  const max = parseFloat(maxCost.value);
  return Math.min((cost / max) * 100, 100);
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

function getMoneyFlowStyle(index) {
  const positions = [
    { left: '5%', top: '10%', animationDelay: '0s' },
    { left: '25%', top: '20%', animationDelay: '0.3s' },
    { left: '45%', top: '15%', animationDelay: '0.6s' },
    { left: '65%', top: '25%', animationDelay: '0.9s' },
    { left: '85%', top: '10%', animationDelay: '1.2s' },
    { left: '15%', top: '60%', animationDelay: '1.5s' },
    { left: '35%', top: '70%', animationDelay: '1.8s' },
    { left: '75%', top: '65%', animationDelay: '2.1s' }
  ];
  
  return {
    ...positions[index - 1],
    animationDuration: '4s'
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

function startCardAnimation(event) {
  const card = event.currentTarget;
  card.style.transform = 'scale(1.02)';
  setTimeout(() => {
    card.style.transform = 'scale(1)';
  }, 300);
}

function handleChartMouseMove(event) {
  if (!costChart3D.value) return;
  
  const rect = costChart3D.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Calculate which bar is being hovered
  const barWidth = rect.width / 10;
  const barIndex = Math.floor(x / barWidth);
  
  if (barIndex >= 0 && barIndex < costData.value.length) {
    const data = costData.value[barIndex];
    tooltipData.value = data;
    tooltipX.value = x + 10;
    tooltipY.value = y - 10;
    tooltipVisible.value = true;
  } else {
    tooltipVisible.value = false;
  }
}

function hideTooltip() {
  tooltipVisible.value = false;
}

function create3DChart() {
  if (!costChart3D.value) return;
  
  const canvas = costChart3D.value;
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to match display size
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Create theme-appropriate gradients
  const barGradient = ctx.createLinearGradient(0, 0, 0, height);
  const shadowGradient = ctx.createLinearGradient(0, 0, 0, height);
  
  if (props.isDark) {
    barGradient.addColorStop(0, 'rgba(147, 51, 234, 0.9)');
    barGradient.addColorStop(1, 'rgba(236, 72, 153, 0.9)');
    shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
    shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
  } else {
    barGradient.addColorStop(0, 'rgba(147, 51, 234, 0.8)');
    barGradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)');
    shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
    shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
  }
  
  // Draw 3D bars with real data
  const barWidth = width / 12; // 10 bars + spacing
  const maxHeight = height * 0.6;
  
  // Always show demo data to ensure bars are visible
  const demoData = Array.from({ length: 10 }, (_, i) => ({
    time: `${i + 1}h ago`,
    cost: Math.random() * 50 + 10,
    downtimeMinutes: Math.floor(Math.random() * 30) + 5,
    totalLogs: Math.floor(Math.random() * 100) + 20
  }));
  
  // Use real data if available, otherwise use demo data
  const dataToShow = costData.value.length > 0 ? costData.value : demoData;
  const maxCostValue = Math.max(...dataToShow.map(d => d.cost), 1);
  
  // Draw the bars
  dataToShow.forEach((data, i) => {
    const x = i * barWidth + barWidth / 2;
    const barHeight = Math.max((data.cost / maxCostValue) * maxHeight, 20); // Minimum height of 20px
    const y = height - barHeight - 40; // Leave space for labels
    
    // 3D effect - shadow
    ctx.fillStyle = shadowGradient;
    ctx.fillRect(x + 3, y + 3, barWidth - 6, barHeight);
    
    // 3D effect - main bar
    ctx.fillStyle = barGradient;
    ctx.fillRect(x, y, barWidth - 6, barHeight);
    
    // Add highlight for 3D effect
    const highlightGradient = ctx.createLinearGradient(x, y, x + barWidth - 6, y);
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlightGradient;
    ctx.fillRect(x, y, barWidth - 6, barHeight / 3);
    
    // Add cost labels
    ctx.fillStyle = props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`$${data.cost.toFixed(1)}`, x + (barWidth - 6) / 2, y - 5);
    
    // Add time labels
    ctx.fillStyle = props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)';
    ctx.font = '8px Arial';
    ctx.fillText(data.time, x + (barWidth - 6) / 2, height - 10);
  });
  
  // Add floating particles with real cost data
  drawFloatingParticles(ctx, width, height, dataToShow);
}

function drawFloatingParticles(ctx, width, height, dataToShow) {
  const particles = [];
  const maxParticles = 15;
  
  // Create particles based on real cost data
  dataToShow.forEach((data, i) => {
    if (data.cost > 0 && particles.length < maxParticles) {
      const x = (i * width / 12) + (width / 24);
      const maxCost = Math.max(...dataToShow.map(d => d.cost), 1);
      const y = height - ((data.cost / maxCost) * height * 0.6) - 40;
      
      particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: Math.min(data.cost / 10, 8),
        opacity: Math.min(data.cost / 20, 0.8),
        speed: Math.random() * 2 + 1
      });
    }
  });
  
  // Draw particles
  particles.forEach(particle => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(147, 51, 234, 0.6)';
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

// Lifecycle
let countdownInterval;
let costUpdateInterval;

onMounted(() => {
  updateCountdown();
  updateRealTimeCost();
  
  countdownInterval = setInterval(updateCountdown, 60000); // Update every minute
  costUpdateInterval = setInterval(updateRealTimeCost, 5000); // Update every 5 seconds
  
  // Initialize 3D chart with multiple attempts
  setTimeout(create3DChart, 100);
  setTimeout(create3DChart, 500); // Backup initialization
  setTimeout(create3DChart, 1000); // Final backup
});

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval);
  if (costUpdateInterval) clearInterval(costUpdateInterval);
});

// Watch for changes
watch(() => props.logs, () => {
  updateRealTimeCost();
  setTimeout(create3DChart, 100);
}, { deep: true });

watch(() => props.api.cost_per_hour, () => {
  updateRealTimeCost();
  setTimeout(create3DChart, 100);
});

watch(() => props.isDark, () => {
  setTimeout(create3DChart, 100);
});

watch(() => costData.value, () => {
  setTimeout(create3DChart, 100);
}, { deep: true });
</script>

<style scoped>
.enhanced-cost-analysis {
  @apply space-y-8;
}

/* Loading State */
.loading-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center;
}

.loading-spinner {
  @apply text-center;
}

.spinner-ring {
  @apply w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4;
}

.spinner-text {
  @apply text-white text-lg font-semibold;
}

/* Section Headers */
.section-header {
  @apply text-center mb-8;
}

/* Enhanced Cards */
.prediction-card,
.cost-chart-3d,
.real-world-impact,
.achievement-card,
.metric-card,
.money-counter,
.cost-impact-animation,
.alert-item {
  @apply shadow-lg hover:shadow-2xl backdrop-blur-sm;
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

@keyframes money-flow {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(-40px) rotate(360deg);
    opacity: 0;
  }
}

.animate-money-flow {
  animation: money-flow 4s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

@keyframes number-count {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.animate-number {
  animation: number-count 2s ease-in-out infinite;
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