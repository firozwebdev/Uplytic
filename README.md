# 🚀 Uplytic - API Health Monitoring Platform

A production-grade API monitoring solution built for the DevNetwork Hackathon 2025. Monitor your APIs in real-time with AI-powered insights, cost analysis, and automated alerts.

## ✨ Features

### 🎯 Core Monitoring
- **Real-time API Health Checks** - Monitor API endpoints every 60 seconds
- **Response Time Tracking** - Measure and analyze latency trends
- **Uptime Calculation** - Track availability percentages
- **Status Code Monitoring** - Monitor HTTP response codes

### 🤖 AI-Powered Insights
- **Automated Issue Detection** - AI engine identifies performance anomalies
- **Smart Recommendations** - Actionable insights for optimization
- **Pattern Recognition** - Detects latency spikes and error patterns
- **Predictive Analysis** - Early warning system for potential issues

### 💰 Cost Impact Analysis
- **Downtime Cost Calculation** - Financial impact of API outages
- **Hourly Cost Tracking** - Set cost per hour for each API
- **Projection Modeling** - Daily/monthly loss estimates
- **Optimization Tips** - Cost-saving recommendations

### 📊 Advanced Analytics
- **Interactive Charts** - Latency trends and status distribution
- **Historical Data** - Track performance over time
- **Custom Dashboards** - Tailored views for different APIs
- **Export Capabilities** - PDF reports with charts and insights

### 🚨 Alert System
- **Real-time Notifications** - Instant alerts for critical issues
- **Configurable Thresholds** - Custom alert rules
- **Alert Management** - Mark alerts as resolved
- **Alert Statistics** - Track alert patterns and resolution times

### 🌐 Public Sharing
- **Public Dashboards** - Share API status via unique URLs
- **Read-only Views** - Secure public access
- **Branded Reports** - Professional appearance for stakeholders

## 🛠 Tech Stack

- **Frontend**: Vue 3 + Vite + TailwindCSS + Pinia
- **Backend**: Supabase (PostgreSQL, Auth, RLS, Edge Functions)
- **Charts**: Chart.js + Vue-ChartJS
- **PDF Export**: html2pdf.js
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

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/          # Chart.js components
│   ├── dashboard/       # Dashboard widgets
│   ├── icons/          # SVG icons
│   └── ui/             # Reusable UI components
├── layouts/            # Page layouts
├── pages/              # Vue router pages
├── services/           # API and external services
├── stores/             # Pinia state management
├── utils/              # Utility functions
└── router/             # Vue router configuration
```

## 🔧 Configuration

### API Monitoring Settings
- **Polling Interval**: 60 seconds (configurable in `pollingService.js`)
- **Alert Thresholds**: 
  - Consecutive failures: 3
  - Error rate: 30%
  - Latency threshold: 2000ms
  - Uptime threshold: 95%

### Cost Analysis
Set `cost_per_hour` for each API to enable financial impact calculations.

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

## 🎨 Customization

### Themes
The app supports dark/light themes with TailwindCSS classes.

### Charts
Modify chart configurations in `components/charts/` directory.

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
```

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

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ for DevNetwork Hackathon 2025**
