<template>
  <div
    class="rounded-xl border transition-all duration-500 overflow-hidden"
    :class="
      isDark
        ? 'bg-gray-800/95 border-gray-700/50 backdrop-blur-sm'
        : 'bg-white/95 border-gray-200/50 backdrop-blur-sm'
    "
  >
    <!-- Header with AI Status -->
    <div class="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div v-if="aiStatus === 'loading'" class="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
            <div v-else-if="aiStatus === 'success'" class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
            <div v-else-if="aiStatus === 'error'" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
          </div>
          <div>
            <h4
              class="text-xl font-bold transition-colors duration-300"
              :class="isDark ? 'text-white' : 'text-gray-900'"
            >
              💰 Advanced Cost Analysis
            </h4>
            <p class="text-sm transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              AI-powered financial impact assessment
            </p>
          </div>
        </div>
        
        <!-- AI Status Badge -->
        <div class="flex items-center space-x-2">
          <div
            class="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
            :class="
              aiStatus === 'loading'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                : aiStatus === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : aiStatus === 'error'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            "
          >
            <div
              class="w-2 h-2 rounded-full"
              :class="
                aiStatus === 'loading'
                  ? 'bg-yellow-500 animate-pulse'
                  : aiStatus === 'success'
                  ? 'bg-green-500'
                  : aiStatus === 'error'
                  ? 'bg-red-500'
                  : 'bg-gray-500'
              "
            ></div>
            <span v-if="aiStatus === 'loading'">AI Analyzing...</span>
            <span v-else-if="aiStatus === 'success'">AI Enhanced</span>
            <span v-else-if="aiStatus === 'error'">Manual Mode</span>
            <span v-else>Initializing...</span>
          </div>
        </div>
      </div>

      <!-- Main Cost Impact Display -->
      <div v-if="enhancedCostImpact" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Total Loss Card -->
        <div
          class="relative p-4 rounded-xl transition-all duration-300 hover:scale-105"
          :class="
            enhancedCostImpact.totalLoss > 0
              ? isDark
                ? 'bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-700/50 hover:from-red-900/30 hover:to-red-800/30'
                : 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200 hover:from-red-100 hover:to-red-200'
              : isDark
                ? 'bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-700/50 hover:from-green-900/30 hover:to-green-800/30'
                : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:from-green-100 hover:to-green-200'
          "
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              Total Loss (24h)
            </span>
            <div v-if="enhancedCostImpact.totalLoss > 0" class="animate-bounce">
              <svg class="w-4 h-4 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div
            class="text-3xl font-bold transition-colors duration-300"
            :class="
              enhancedCostImpact.totalLoss > 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
            "
          >
            ${{ enhancedCostImpact.totalLoss.toFixed(2) }}
          </div>
          <div class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            {{ enhancedCostImpact.downtimeMinutes }} minutes downtime
          </div>
        </div>

        <!-- Uptime Impact Card -->
        <div 
          class="p-4 rounded-xl transition-all duration-300 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-blue-900/20 to-indigo-800/20 border border-blue-700/50 hover:from-blue-900/30 hover:to-indigo-800/30'
              : 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 hover:from-blue-100 hover:to-indigo-200'
          "
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              Uptime
            </span>
            <span
              class="text-sm font-bold transition-colors duration-300"
              :class="
                enhancedCostImpact.uptimePercentage >= 99.9
                  ? 'text-green-600 dark:text-green-400'
                  : enhancedCostImpact.uptimePercentage >= 99
                  ? 'text-blue-600 dark:text-blue-400'
                  : enhancedCostImpact.uptimePercentage >= 95
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-red-600 dark:text-red-400'
              "
            >
              {{ enhancedCostImpact.uptimePercentage.toFixed(2) }}%
            </span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div
              class="h-3 rounded-full transition-all duration-1000 ease-out"
              :class="
                enhancedCostImpact.uptimePercentage >= 99.9
                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                  : enhancedCostImpact.uptimePercentage >= 99
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                  : enhancedCostImpact.uptimePercentage >= 95
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                  : 'bg-gradient-to-r from-red-400 to-red-600'
              "
              :style="{ width: `${Math.min(enhancedCostImpact.uptimePercentage, 100)}%` }"
            ></div>
          </div>
          <div class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            {{ getUptimeStatus(enhancedCostImpact.uptimePercentage) }}
          </div>
        </div>

        <!-- Cost Rate Card -->
        <div 
          class="p-4 rounded-xl transition-all duration-300 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-purple-900/20 to-pink-800/20 border border-purple-700/50 hover:from-purple-900/30 hover:to-pink-800/30'
              : 'bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 hover:from-purple-100 hover:to-pink-200'
          "
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              Cost Rate
            </span>
            <svg class="w-4 h-4 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
            ${{ enhancedCostImpact.costPerHour }}/hr
          </div>
          <div class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            {{ getCostRateDescription(enhancedCostImpact.costPerHour) }}
          </div>
        </div>
      </div>
    </div>

    <!-- AI-Powered Insights Section -->
    <div v-if="enhancedCostImpact && enhancedCostImpact.aiInsights" class="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="flex items-center space-x-2 mb-4">
        <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
          </svg>
        </div>
        <h5 class="text-lg font-semibold transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-900'">
          AI-Powered Insights
        </h5>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Predictions -->
        <div 
          class="p-4 rounded-xl transition-all duration-300 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-amber-900/20 to-orange-800/20 border border-amber-700/50 hover:from-amber-900/30 hover:to-orange-800/30'
              : 'bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 hover:from-amber-100 hover:to-orange-200'
          "
        >
          <h6 class="text-sm font-semibold mb-3 transition-colors duration-300" :class="isDark ? 'text-amber-400' : 'text-amber-800'">
            📊 30-Day Projections
          </h6>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Monthly Loss:</span>
              <span class="text-sm font-bold text-red-600 dark:text-red-400">
                ${{ enhancedCostImpact.aiInsights.monthlyProjection }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Industry Avg:</span>
              <span class="text-sm font-bold text-blue-600 dark:text-blue-400">
                {{ enhancedCostImpact.aiInsights.industryComparison }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Risk Level:</span>
              <span 
                class="text-xs px-2 py-1 rounded-full font-medium"
                :class="
                  enhancedCostImpact.aiInsights.riskLevel === 'High'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    : enhancedCostImpact.aiInsights.riskLevel === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                "
              >
                {{ enhancedCostImpact.aiInsights.riskLevel }}
              </span>
            </div>
          </div>
        </div>

        <!-- Optimization Potential -->
        <div 
          class="p-4 rounded-xl transition-all duration-300 hover:scale-105"
          :class="
            isDark
              ? 'bg-gradient-to-br from-emerald-900/20 to-green-800/20 border border-emerald-700/50 hover:from-emerald-900/30 hover:to-green-800/30'
              : 'bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 hover:from-emerald-100 hover:to-green-200'
          "
        >
          <h6 class="text-sm font-semibold mb-3 transition-colors duration-300" :class="isDark ? 'text-emerald-400' : 'text-emerald-800'">
            💡 Optimization Potential
          </h6>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Annual Savings:</span>
              <span class="text-sm font-bold text-green-600 dark:text-green-400">
                ${{ enhancedCostImpact.aiInsights.optimizationPotential }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">ROI Potential:</span>
              <span class="text-sm font-bold text-green-600 dark:text-green-400">
                {{ enhancedCostImpact.aiInsights.roiPotential }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Priority:</span>
              <span class="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {{ enhancedCostImpact.aiInsights.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Recommendations -->
    <div v-if="enhancedCostImpact && enhancedCostImpact.aiInsights && enhancedCostImpact.aiInsights.recommendations" class="p-6">
      <div class="flex items-center space-x-2 mb-4">
        <div class="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <h5 class="text-lg font-semibold transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-900'">
          AI Recommendations
        </h5>
      </div>

      <div class="space-y-3">
        <div
          v-for="(recommendation, index) in enhancedCostImpact.aiInsights.recommendations"
          :key="index"
          class="p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          :class="
            isDark 
              ? 'bg-gray-700/50 border border-gray-600/50 hover:bg-gray-700/70 hover:border-gray-500/50' 
              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
          "
          @click="showRecommendationDetails(recommendation)"
        >
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <h6 class="text-sm font-semibold mb-1 transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ recommendation.title }}
              </h6>
              <p class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                {{ recommendation.description }}
              </p>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs font-medium text-green-600 dark:text-green-400">
                  Save ${{ recommendation.savings }}/year
                </span>
                <span class="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {{ recommendation.implementation }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback State -->
    <div
      v-else-if="!enhancedCostImpact"
      class="text-center py-12 transition-colors duration-300"
      :class="isDark ? 'text-gray-400' : 'text-gray-500'"
    >
      <div class="mx-auto w-16 h-16 mb-4">
        <div 
          class="w-full h-full rounded-xl flex items-center justify-center"
          :class="
            isDark
              ? 'bg-gradient-to-br from-gray-500 to-gray-700'
              : 'bg-gradient-to-br from-gray-400 to-gray-600'
          "
        >
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <h5 class="text-lg font-semibold mb-2 transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
        No Cost Data Available
      </h5>
      <p class="text-sm mb-4">Set cost per hour in API settings to enable advanced financial analysis</p>
      <button
        class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        @click="showApiSettings"
      >
        Configure API Settings
      </button>
    </div>

    <!-- Loading State -->
    <div
      v-else-if="aiStatus === 'loading'"
      class="text-center py-12 transition-colors duration-300"
      :class="isDark ? 'text-gray-400' : 'text-gray-500'"
    >
      <div class="mx-auto w-16 h-16 mb-4">
        <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
          <svg class="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>
      <h5 class="text-lg font-semibold mb-2 transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
        AI Analysis in Progress
      </h5>
      <p class="text-sm">Analyzing your API performance and generating intelligent insights...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { insightsEngine } from '../../utils/insightsEngine';
import { getGeminiInsights } from '../../utils/aiGeminiClient';

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
const aiStatus = ref('idle'); // 'idle', 'loading', 'success', 'error'
const enhancedCostImpact = ref(null);
const aiInsights = ref(null);

// Computed properties
const basicCostImpact = computed(() => {
  const insights = insightsEngine.analyzeApi(props.api, props.logs);
  return insights.costImpact;
});

// Methods
async function generateAIInsights() {
  console.log('🔄 Generating AI insights for API:', props.api.name, 'Cost per hour:', props.api.cost_per_hour);
  
  if (!basicCostImpact.value || !props.api.cost_per_hour) {
    console.log('❌ No cost data available for API:', props.api.name);
    aiStatus.value = 'error';
    return;
  }

  aiStatus.value = 'loading';
  console.log('🤖 Starting AI analysis for API:', props.api.name);
  
  try {
    const prompt = `Analyze this API cost data and provide professional insights:
    - API: ${props.api.name}
    - Cost per hour: $${props.api.cost_per_hour}
    - Total loss (24h): $${basicCostImpact.value.totalLoss}
    - Downtime minutes: ${basicCostImpact.value.downtimeMinutes}
    - Uptime percentage: ${basicCostImpact.value.uptimePercentage}%
    
    Provide:
    1. 30-day monthly projection
    2. Industry comparison (higher/lower than average)
    3. Risk level assessment
    4. Optimization potential with specific recommendations
    5. ROI potential percentage
    6. Implementation priority
    7. 3 specific actionable recommendations with savings estimates`;

    const response = await getGeminiInsights({
      logs: props.logs.slice(0, 50), // Send recent logs
      stats: {
        totalLoss: basicCostImpact.value.totalLoss,
        downtimeMinutes: basicCostImpact.value.downtimeMinutes,
        uptimePercentage: basicCostImpact.value.uptimePercentage,
        costPerHour: props.api.cost_per_hour
      },
      cost: basicCostImpact.value,
      prompt
    });

    // Parse AI response and create structured insights
    aiInsights.value = parseAIResponse(response);
    aiStatus.value = 'success';
    console.log('✅ AI analysis completed for API:', props.api.name, 'Total loss:', basicCostImpact.value.totalLoss);
  } catch (error) {
    console.warn('⚠️ AI analysis failed for API:', props.api.name, 'Using manual calculations:', error);
    aiStatus.value = 'error';
    // Fallback to manual insights
    aiInsights.value = generateManualInsights();
    console.log('📊 Manual calculations completed for API:', props.api.name);
  }
}

function parseAIResponse(response) {
  // Extract insights from AI response using regex patterns
  const monthlyProjection = extractAmount(response, /monthly.*?\$([\d,]+)/i) || 
                           (basicCostImpact.value.totalLoss * 30).toFixed(2);
  
  const industryComparison = extractText(response, /industry.*?(higher|lower|average)/i) || 
                            'Industry average';
  
  const riskLevel = extractText(response, /risk.*?(high|medium|low)/i) || 
                   (basicCostImpact.value.totalLoss > 100 ? 'High' : 'Medium');
  
  const optimizationPotential = extractAmount(response, /savings.*?\$([\d,]+)/i) || 
                               (basicCostImpact.value.totalLoss * 12 * 0.3).toFixed(2);
  
  const roiPotential = extractText(response, /roi.*?(\d+%)/i) || '150%';
  
  const priority = extractText(response, /priority.*?(high|medium|low)/i) || 'Medium';

  // Generate recommendations
  const recommendations = generateRecommendationsFromAI(response);

  return {
    monthlyProjection,
    industryComparison,
    riskLevel,
    optimizationPotential,
    roiPotential,
    priority,
    recommendations
  };
}

function extractAmount(text, pattern) {
  const match = text.match(pattern);
  return match ? match[1].replace(/,/g, '') : null;
}

function extractText(text, pattern) {
  const match = text.match(pattern);
  return match ? match[1] : null;
}

function generateRecommendationsFromAI(aiResponse) {
  // Extract recommendations from AI response or generate defaults
  const recommendations = [];
  
  // Look for specific recommendations in AI response
  const recommendationMatches = aiResponse.match(/(?:recommend|suggest|implement).*?(?:save|reduce|improve).*?\$[\d,]+/gi);
  
  if (recommendationMatches && recommendationMatches.length >= 3) {
    recommendationMatches.slice(0, 3).forEach((rec, index) => {
      const savings = extractAmount(rec, /\$([\d,]+)/) || '1,000';
      recommendations.push({
        title: `AI Recommendation ${index + 1}`,
        description: rec.replace(/\$[\d,]+.*$/, ''),
        savings: savings,
        implementation: 'Medium'
      });
    });
  } else {
    // Fallback recommendations
    recommendations.push(
      {
        title: 'Implement Auto-Scaling',
        description: 'Automatically scale resources based on traffic patterns',
        savings: '2,400',
        implementation: 'Medium'
      },
      {
        title: 'Add CDN Distribution',
        description: 'Reduce latency and improve global performance',
        savings: '1,800',
        implementation: 'Low'
      },
      {
        title: 'Database Optimization',
        description: 'Optimize queries and add proper indexing',
        savings: '4,000',
        implementation: 'High'
      }
    );
  }
  
  return recommendations;
}

function generateManualInsights() {
  const totalLoss = basicCostImpact.value.totalLoss;
  const monthlyProjection = (totalLoss * 30).toFixed(2);
  const riskLevel = totalLoss > 100 ? 'High' : totalLoss > 50 ? 'Medium' : 'Low';
  const optimizationPotential = (totalLoss * 12 * 0.3).toFixed(2);
  
  return {
    monthlyProjection,
    industryComparison: 'Industry average',
    riskLevel,
    optimizationPotential,
    roiPotential: '150%',
    priority: 'Medium',
    recommendations: [
      {
        title: 'Implement Auto-Scaling',
        description: 'Automatically scale resources based on traffic patterns',
        savings: '2,400',
        implementation: 'Medium'
      },
      {
        title: 'Add CDN Distribution',
        description: 'Reduce latency and improve global performance',
        savings: '1,800',
        implementation: 'Low'
      },
      {
        title: 'Database Optimization',
        description: 'Optimize queries and add proper indexing',
        savings: '4,000',
        implementation: 'High'
      }
    ]
  };
}

function getUptimeStatus(percentage) {
  if (percentage >= 99.9) return 'Excellent';
  if (percentage >= 99) return 'Good';
  if (percentage >= 95) return 'Fair';
  return 'Poor';
}

function getCostRateDescription(rate) {
  if (rate >= 100) return 'Enterprise level';
  if (rate >= 50) return 'High value';
  if (rate >= 20) return 'Medium value';
  return 'Standard';
}

function showRecommendationDetails(recommendation) {
  // This could open a modal with detailed implementation steps
  console.log('Show details for:', recommendation);
}

function showApiSettings() {
  // This could navigate to API settings or open a modal
  console.log('Show API settings');
}

// Enhanced cost impact computation
const enhancedCostImpactComputed = computed(() => {
  if (!basicCostImpact.value) return null;
  
  return {
    ...basicCostImpact.value,
    aiInsights: aiInsights.value
  };
});

// Watch for changes and update enhanced cost impact
watch(enhancedCostImpactComputed, (newValue) => {
  enhancedCostImpact.value = newValue;
}, { immediate: true });

// Watch for API changes (when user selects different API)
watch(() => props.api, async (newApi) => {
  console.log('API changed, recalculating costs for:', newApi.name);
  if (newApi && newApi.cost_per_hour) {
    await generateAIInsights();
  } else {
    aiStatus.value = 'idle';
    enhancedCostImpact.value = null;
  }
}, { deep: true });

// Watch for logs changes (when new data comes in)
watch(() => props.logs, async (newLogs) => {
  console.log('Logs changed, recalculating costs. Logs count:', newLogs.length);
  if (props.api && props.api.cost_per_hour) {
    await generateAIInsights();
  }
}, { deep: true });

// Lifecycle
onMounted(async () => {
  if (props.api.cost_per_hour) {
    await generateAIInsights();
  }
});

// Watch for API cost_per_hour changes (legacy watcher for backward compatibility)
watch(() => props.api.cost_per_hour, async (newValue) => {
  if (newValue) {
    await generateAIInsights();
  } else {
    aiStatus.value = 'idle';
    enhancedCostImpact.value = null;
  }
});
</script>

<style scoped>
/* Enhanced animations and effects */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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