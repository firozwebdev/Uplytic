# Uplytic – Unified API Health Dashboard

## Tech Stack
- **Frontend:** Vue 3 + Vite + TailwindCSS + Pinia
- **Backend/DB:** Supabase (Postgres, Auth, RLS, Edge Functions)
- **Data Viz:** Chart.js
- **Export:** html2pdf.js (planned)
- **Hosting:** Netlify

## Folder Structure
```
src/
├── assets/
├── components/
│   ├── charts/
│   ├── dashboard/
│   ├── icons/
│   └── ui/
├── layouts/
├── pages/
├── router/
├── services/
├── stores/
├── style.css
└── App.vue
```

## Features & Progress (POC)

### ✅ Phase 1: Setup & Scaffolding
- Vue 3 + Vite project
- Tailwind CSS configured
- Pinia for state management
- Vue Router with dashboard routes
- Basic layout: Navbar, Sidebar, Router View

### ✅ Phase 2: Supabase Integration
- Supabase client configured
- Service layer for CRUD operations (APIs, logs)
- RLS and uuid support (structure ready)

### ✅ Phase 3: API Manager UI
- Add/edit/delete API endpoints with robust validation (including duplicate check)
- List view of APIs
- Real-time sync with Supabase
- Selected API stored in Pinia

### ✅ Phase 4: Polling Engine & Logging
- Polls all APIs every 60 seconds
- Measures latency, logs status code and latency to Supabase
- Robust error handling for polling
- Dashboard auto-refreshes logs

### ✅ Phase 5: Dashboard & Visualization
- KPI cards (Uptime, Avg Latency, Errors, APIs Monitored) per selected API
- Latency and status distribution charts (Chart.js) per selected API
- Recent activity log per selected API
- All dashboard data is fully dynamic and synced with selection

### 🚧 Next Steps
- AI insights & cost analysis
- PDF report generator
- Alerts & sponsor integration
- Public dashboard view
- Polish, responsiveness, and demo assets

---

## Usage
- Add APIs to monitor (with name, URL, cost, public/private)
- Dashboard will poll and visualize health in real time
- Click any API block to see detailed stats, charts, and logs for that API

---

## Development
- Run `npm install` to install dependencies
- Run `npm run dev` to start the local server

---

## License
MIT
