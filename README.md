# 🚀 Uplytic - API Health Monitoring Platform

A production-grade API monitoring solution built for the DevNetwork Hackathon 2025. Monitor your APIs in real-time with AI-powered insights, **enhanced cost analysis with WOW factors**, automated alerts, and a beautiful interactive world map.

## ✨ Features

### 🎯 Core Monitoring
- **Real-time API Health Checks** - Monitor API endpoints every 60 seconds
- **Response Time Tracking** - Measure and analyze latency trends
- **Uptime Calculation** - Track availability percentages
- **Status Code Monitoring** - Monitor HTTP response codes

### 🗺️ Interactive World Map
- **Global API Visualization** - See all your APIs on an interactive world map
- **Real-time Status Markers** - Beautiful animated markers showing API health
- **Geographic Distribution** - Monitor APIs across different regions
- **Outage Alerts** - Visual indicators for down APIs with pulsing animations
- **Smart Centering** - Map automatically centers on selected APIs
- **Responsive Design** - Works perfectly on all devices

### 🤖 AI-Powered Insights
- **Automated Issue Detection** - AI engine identifies performance anomalies
- **Smart Recommendations** - Actionable insights for optimization
- **Pattern Recognition** - Detects latency spikes and error patterns
- **Predictive Analysis** - Early warning system for potential issues
- **Natural Language Queries** - Ask Uplytic AI about your API performance

### 💰 **Enhanced Cost Impact Analysis with WOW Factors** 🎨
- **Real-time Cost Predictions** - Live 30-day projections with animated countdown
- **Interactive 3D Cost Visualization** - Hover over bars to see detailed breakdowns
- **Industry Benchmarking** - Compare your costs against industry averages
- **ROI Calculator** - Calculate return on investment for monitoring solutions
- **Real-world Impact Comparisons** - See costs in relatable terms (coffee, pizza, etc.)
- **Gamification Elements** - Achievements, streaks, and leaderboards
- **Advanced Financial Metrics** - CLV impact, revenue per minute, market share loss
- **Live Cost Impact Animation** - Real-time money flowing animations
- **Professional Animations** - Shimmer effects, smooth transitions, hover interactions
- **Theme Responsive Design** - Beautiful dark/light mode support

### 📊 Advanced Analytics
- **Interactive Charts** - Latency trends and status distribution
- **Historical Data** - Track performance over time
- **Custom Dashboards** - Tailored views for different APIs
- **Export Capabilities** - PDF reports with charts and insights (see below)
- **Multiple Dashboard Views** - Full, Simple, and New dashboard layouts

### 🚨 Alert System
- **Real-time Notifications** - Instant alerts for critical issues
- **Configurable Thresholds** - Custom alert rules
- **Alert Management** - Mark alerts as resolved
- **Alert Statistics** - Track alert patterns and resolution times
- **Postmortem Analysis** - Detailed incident analysis and documentation

### 🌐 Public Sharing
- **Public Dashboards** - Share API status via unique URLs
- **Read-only Views** - Secure public access
- **Branded Reports** - Professional appearance for stakeholders

### 📝 PDF Export (Modern, Branded, Per-API)
- **One-click PDF Export** for any API: Each API card has an Export PDF button
- **Dynamic, Context-Aware**: Only the selected/clicked API's data is exported
- **Modern, Production-Grade Design**: 
  - Branded header with logo and product name
  - Key metrics as colored cards
  - Cost analysis with bar chart and financial breakdown
  - Recent activity table (last 10 checks)
  - AI insights with severity badges and recommendations
  - Subtle, fixed footer with Foxit PDF SDK credit and page numbers
- **Robust Error Handling**: All values are stringified for jsPDF compatibility
- **Powered by jsPDF + jspdf-autotable** (no longer uses html2pdf.js)

## 🎨 **WOW Factor Features**

### **Enhanced Cost Analysis Dashboard**
- **Professional UI/UX** - Glassmorphism effects, smooth animations, hover interactions
- **Interactive 3D Charts** - Real data visualization with floating particles and tooltips
- **Real-time Animations** - Money flowing effects, shimmer animations, bouncing elements
- **Smart Data Processing** - Uses actual API logs for accurate cost calculations
- **Responsive Design** - Perfect on all devices with theme support

### **Advanced Visualizations**
- **3D Cost Impact Charts** - Interactive bars with real-time data
- **Floating Dollar Animations** - Dynamic money symbols based on cost data
- **Shimmer Effects** - Professional gradient animations on progress bars
- **Enhanced Tooltips** - Detailed cost breakdowns with backdrop blur effects

### **Gamification & Engagement**
- **Achievement System** - Cost saver badges, uptime streaks, leaderboards
- **Progress Tracking** - Visual progress indicators and milestone celebrations
- **Interactive Elements** - Clickable comparisons with scale animations
- **Real-time Counters** - Animated money counters with bouncing effects

## 🛠 Tech Stack

- **Frontend**: Vue 3 + Vite + TailwindCSS + Pinia
- **Backend**: Supabase (PostgreSQL, Auth, RLS, Edge Functions)
- **Charts**: Chart.js + Vue-ChartJS + Custom 3D Canvas
- **Maps**: Leaflet + Vue-Leaflet
- **PDF Export**: jsPDF + jspdf-autotable (modern, branded, robust)
- **AI Integration**: Google Gemini AI
- **Markdown**: markdown-it + vue3-markdown-it
- **Notifications**: Vue Toastification
- **Animations**: CSS3 + Vue Transitions + Canvas API
- **Hosting**: Netlify
- **CI/CD**: Netlify Git Integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account
- Git

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd Uplytic
npm install
```

### 2. Supabase Setup
1. Create a new Supabase project
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
1. Open your Supabase SQL Editor
2. Run the `supabase-setup.sql` script
3. This creates all necessary tables, indexes, and RLS policies

### 4. Development
```bash
npm run dev
```

### 5. Deploy to Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

### 6. PDF Export Usage
- On the dashboard, expand any API card and click the **Export PDF** button to generate a modern, branded PDF report for that API.
- The PDF will include only the selected API's data, with all key metrics, cost analysis, recent activity, and AI insights.

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/          # Chart.js components (LatencyChart, StatusChart, SimpleChart)
│   ├── dashboard/       # Dashboard widgets (OutageMap, AlertsPanel, EnhancedCostAnalysis, etc.)
│   ├── icons/          # SVG icons (ApiIcons)
│   └── ui/             # Reusable UI components (AddApiModal, AskUplyticAI)
├── layouts/            # Page layouts (DashboardLayout)
├── pages/              # Vue router pages (DashboardFull, DashboardNew, DashboardSimple, PublicDashboard, CostAnalysisPage)
├── services/           # API and external services (apiService, alertService, logService, pollingService)
├── stores/             # Pinia state management (api store)
├── utils/              # Utility functions (aiGeminiClient, insightsEngine, pdfExport)
└── router/             # Vue router configuration
```

## �� Configuration

### API Monitoring Settings
- **Polling Interval**: 60 seconds (configurable in `pollingService.js`)
- **Alert Thresholds**: 
  - Consecutive failures: 3
  - Error rate: 30%
  - Latency threshold: 2000ms
  - Uptime threshold: 95%

### Map Configuration
- **Default Zoom**: 2 (world view)
- **Marker Animations**: Pulsing, glowing effects for status indicators
- **Auto-centering**: Map centers on selected API
- **Responsive Design**: Adapts to different screen sizes

### **Enhanced Cost Analysis Configuration**
- **Cost per Hour**: Set `cost_per_hour` for each API to enable financial calculations
- **Real-time Updates**: Cost data updates every 5 seconds
- **3D Chart Data**: Uses actual API logs grouped by hour
- **Theme Support**: Automatic dark/light mode adaptation
- **Interactive Features**: Hover tooltips, click animations, floating particles

### Public Sharing
Enable `is_public` flag on APIs to generate shareable dashboard URLs.

## 📊 Database Schema

### Tables
- `apis` - API endpoints and configuration
- `logs` - Health check results and metrics
- `alerts` - Generated alerts and notifications

### Key Fields
- `cost_per_hour` - For financial calculations
- `uuid` - For public dashboard URLs
- `is_public` - Controls public access
- `lat`, `lng` - Geographic coordinates for map display

## 🎨 Customization

### Themes
The app supports dark/light themes with TailwindCSS classes and automatic adaptation.

### Charts
Modify chart configurations in `components/charts/` directory.

### **Enhanced Cost Analysis**
- **Custom Animations**: Modify CSS animations in `EnhancedCostAnalysis.vue`
- **3D Chart Styling**: Customize canvas rendering in `create3DChart()` function
- **Data Processing**: Adjust cost calculations in computed properties
- **Theme Colors**: Update gradient colors for different themes

### Maps
Customize map styling and markers in `components/dashboard/OutageMap.vue`.

### Alerts
Customize alert rules in `utils/insightsEngine.js`.

## 🔒 Security

- **Row Level Security (RLS)** - Users can only access their own data
- **Public API Protection** - UUID-based access for public dashboards
- **Input Validation** - Form validation and sanitization
- **CORS Protection** - Configured for production use

## 📈 Performance

- **Optimized Queries** - Database indexes for fast retrieval
- **Lazy Loading** - Components load on demand
- **Caching** - Efficient data caching strategies
- **Cleanup Functions** - Automatic cleanup of old data
- **Map Performance** - Efficient marker rendering and animations
- **Canvas Optimization** - Efficient 3D chart rendering with proper cleanup

## 🚀 Deployment

### Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEYS=your_gemini_api_keys
GEMINI_API_URL=your_gemini_api_url
```

## 🗺️ Map Features

### Interactive Markers
- **Healthy APIs**: Green pulsing markers with smooth animations
- **Down APIs**: Red markers with alert indicators and enhanced animations
- **Hover Effects**: Scale and glow effects on marker interaction
- **Popups**: Detailed API information with status, response codes, and last check time

### Visual Enhancements
- **Glassmorphism Design**: Modern semi-transparent UI elements
- **Animated Alerts**: Floating outage notifications with bounce effects
- **Status Cards**: Beautiful cards showing total, healthy, and down API counts
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

## 💰 **Cost Analysis Features**

### **Real-time Financial Insights**
- **Live Cost Counter**: Real-time money lost during downtime
- **30-Day Projections**: Animated countdown with cost predictions
- **Industry Comparisons**: Benchmark against industry averages
- **ROI Calculations**: Investment vs. savings analysis

### **Interactive Visualizations**
- **3D Cost Charts**: Interactive bars with real data and tooltips
- **Floating Particles**: Dynamic animations based on cost data
- **Progress Meters**: Animated progress bars with shimmer effects
- **Money Flow Animations**: Visual representation of cost impact

### **Professional UX**
- **Loading States**: Professional spinners and loading animations
- **Hover Effects**: Smooth scale and shadow transitions
- **Theme Responsive**: Beautiful dark/light mode support
- **Mobile Optimized**: Responsive design for all devices

## 🆕 2024 Dashboard UX Improvements

### Inline API Details Expansion
- When you click any API card, all details (general info, real-time outage map, charts, AI insights, advanced cost analysis, recent activity, alerts, and notifications) are shown immediately below that card, inline in the dashboard grid.
- Only one API's details can be open at a time. Clicking another API closes the previous one and opens the new one.
- All dashboard widgets and features remain fully functional in the expanded view.
- No API details are shown by default on first load, keeping the dashboard clean and focused.

### Animated Loading Experience
- When expanding API details, a professional animated loading message ("Loading API Details...") is shown for 2 seconds before the details appear, providing a smooth and modern user experience.
- The loading state uses theme-aware styling and subtle animation for a polished look.

### Professional Theme & UX
- All features and widgets are fully responsive and support both dark and light themes.
- The dashboard now offers a more intuitive, user-friendly, and visually appealing experience for both technical and non-technical users.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

Built for DevNetwork Hackathon 2025

## 🙏 Acknowledgments

- **Gravitee** - API Gateway inspiration
- **Kong** - API management concepts
- **Tierpoint** - Infrastructure monitoring ideas
- **Foxit** - PDF generation tools
- **Leaflet** - Interactive mapping library
- **Google Gemini** - AI-powered insights
- **Chart.js** - Data visualization library
- **TailwindCSS** - Utility-first CSS framework

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ for DevNetwork Hackathon 2025**

**Featuring Enhanced Cost Analysis with Professional WOW Factors** 🎨✨
