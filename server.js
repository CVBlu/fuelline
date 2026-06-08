const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Terminal Data ───────────────────────────────────────────────
// latitude and longitude added to each terminal — required for geofencing.
// These are the actual GPS coordinates of each facility.
let terminals = [
  {
    id: 1,
    name: "Buckeye Pipe Line — Argo",
    address: "7600 W 63rd St, Summit, IL 60501",
    phone: "(708) 458-2000",
    latitude: 41.7772,
    longitude: -87.8226,
    distance_miles: 4.2,
    wait_minutes: 47,
    trucks_in_queue: 8,
    lanes: [
      { number: 1, status: "open" },
      { number: 2, status: "open" },
      { number: 3, status: "closed", reason: "Meter calibration", reopen: "2:30 PM" },
      { number: 4, status: "busy" }
    ],
    products: [
      { name: "Diesel #2", available: true },
      { name: "Unleaded 87", available: true },
      { name: "Unleaded 89", available: true },
      { name: "DEF", available: true },
      { name: "E85", available: false, note: "Out of stock" },
      { name: "Premium", available: false, note: "Rack offline" }
    ],
    status: "busy",
    last_updated: "10 min ago"
  },
  {
    id: 2,
    name: "Kinder Morgan — Lockport",
    address: "1200 E 9th St, Lockport, IL 60441",
    phone: "(815) 838-0550",
    latitude: 41.5895,
    longitude: -88.0418,
    distance_miles: 11.8,
    wait_minutes: 12,
    trucks_in_queue: 2,
    lanes: [
      { number: 1, status: "open" },
      { number: 2, status: "open" },
      { number: 3, status: "open" }
    ],
    products: [
      { name: "Diesel #2", available: true },
      { name: "Unleaded 87", available: true },
      { name: "Unleaded 89", available: true },
      { name: "Premium", available: true },
      { name: "DEF", available: true }
    ],
    status: "open",
    last_updated: "5 min ago"
  },
  {
    id: 3,
    name: "IMTT — Lemont",
    address: "100 Lemont Rd, Lemont, IL 60439",
    phone: "(630) 257-6511",
    latitude: 41.6731,
    longitude: -88.0001,
    distance_miles: 18.4,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [
      { number: 1, status: "closed", reason: "Terminal shutdown", reopen: "Unknown" },
      { number: 2, status: "closed", reason: "Terminal shutdown", reopen: "Unknown" }
    ],
    products: [
      { name: "Diesel #2", available: false, note: "Terminal closed" },
      { name: "Unleaded 87", available: false, note: "Terminal closed" }
    ],
    status: "closed",
    last_updated: "2 hrs ago"
  },
  {
    id: 4,
    name: "Citgo — Lemont Refinery",
    address: "135th St & New Avenue, Lemont, IL 60439",
    phone: "(630) 257-5000",
    latitude: 41.6598,
    longitude: -88.0070,
    distance_miles: 19.1,
    wait_minutes: 25,
    trucks_in_queue: 4,
    lanes: [
      { number: 1, status: "open" },
      { number: 2, status: "busy" },
      { number: 3, status: "open" },
      { number: 4, status: "open" }
    ],
    products: [
      { name: "Diesel #2", available: true },
      { name: "Unleaded 87", available: true },
      { name: "Unleaded 89", available: true },
      { name: "Premium", available: true },
      { name: "DEF", available: true },
      { name: "E85", available: true }
    ],
    status: "open",
    last_updated: "3 min ago"
  },
  {
    id: 5,
    name: "Marathon — Willow Springs",
    address: "8500 Archer Ave, Willow Springs, IL 60480",
    phone: "(708) 839-1200",
    latitude: 41.7423,
    longitude: -87.8803,
    distance_miles: 7.6,
    wait_minutes: 65,
    trucks_in_queue: 12,
    lanes: [
      { number: 1, status: "busy" },
      { number: 2, status: "busy" },
      { number: 3, status: "closed", reason: "Equipment failure", reopen: "Tomorrow AM" }
    ],
    products: [
      { name: "Diesel #2", available: true },
      { name: "Unleaded 87", available: true },
      { name: "DEF", available: false, note: "Resupply tomorrow" }
    ],
    status: "busy",
    last_updated: "7 min ago"
  }
];

// ─── Driver reports ──────────────────────────────────────────────
let reports = [];

// ─── API Routes ──────────────────────────────────────────────────

// GET all terminals
app.get('/api/terminals', (req, res) => {
  res.json(terminals);
});

// GET one terminal
app.get('/api/terminals/:id', (req, res) => {
  const terminal = terminals.find(t => t.id === parseInt(req.params.id));
  if (!terminal) return res.status(404).json({ error: 'Terminal not found' });
  res.json(terminal);
});

// POST a wait time report — geofence is enforced on the front end;
// server accepts the report if it arrives
app.post('/api/terminals/:id/report', (req, res) => {
  const terminal = terminals.find(t => t.id === parseInt(req.params.id));
  if (!terminal) return res.status(404).json({ error: 'Terminal not found' });

  const { wait_minutes, lane_issue, note } = req.body;

  if (wait_minutes !== undefined) {
    terminal.wait_minutes = parseInt(wait_minutes);
    terminal.last_updated = 'Just now';
    if (wait_minutes === 0) terminal.status = 'closed';
    else if (wait_minutes < 20) terminal.status = 'open';
    else terminal.status = 'busy';
  }

  reports.push({
    terminal_id: terminal.id,
    terminal_name: terminal.name,
    wait_minutes,
    lane_issue,
    note,
    submitted_at: new Date().toLocaleTimeString()
  });

  res.json({ success: true, message: 'Report submitted. Thank you!', terminal });
});

// GET all reports
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

// Catch-all: serve index.html for any route not matched above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start server ─────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FuelLine is running on port ${PORT}`);
});
