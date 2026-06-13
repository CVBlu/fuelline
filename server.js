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
    name: "Kinder Morgan O'Hare Terminal",
    address: "1111 Elmhurst Rd, Elk Grove Village, IL 60007",
    phone: "(847) 824-5176",
    latitude: 42.0101,
    longitude: -87.9399,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }, { number: 3, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }, { name: "Renewable Fuels", available: true }, { name: "Additives", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 2,
    name: "Marathon - Mt. Prospect Terminal",
    address: "3231 Busse Rd, Arlington Heights, IL 60005",
    phone: "(847) 439-1537",
    latitude: 42.0280,
    longitude: -87.9570,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }, { number: 3, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 3,
    name: "ExxonMobil Terminal",
    address: "2312 Terminal Dr, Arlington Heights, IL 60005",
    phone: "",
    latitude: 42.0252,
    longitude: -87.9540,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }, { name: "Ethanol Blends", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 4,
    name: "Shell - Algonquin Road Terminal",
    address: "1605 E Algonquin Rd, Arlington Heights, IL 60005",
    phone: "(847) 774-1090",
    latitude: 42.0296,
    longitude: -87.9463,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 5,
    name: "CITGO - Arlington Heights Terminal",
    address: "2316 Terminal Dr, Arlington Heights, IL 60005",
    phone: "(847) 437-3402",
    latitude: 42.0246,
    longitude: -87.9555,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }, { number: 3, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 6,
    name: "Buckeye Terminals - Argo",
    address: "8600 W 71st St, Bedford Park, IL 60501",
    phone: "(708) 563-6347",
    latitude: 41.7622,
    longitude: -87.8362,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }, { number: 3, status: "open" }, { number: 4, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }, { name: "Blending Components", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 7,
    name: "Kinder Morgan - Argo Terminal",
    address: "8500 W 68th St, Summit, IL 60501",
    phone: "(708) 496-2849",
    latitude: 41.7690,
    longitude: -87.8259,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }, { number: 3, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }, { name: "Renewable Fuels", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 8,
    name: "CITGO - Lemont Terminal",
    address: "127th St & New Ave, Lemont, IL 60439",
    phone: "(630) 257-7761",
    latitude: 41.6557,
    longitude: -88.0462,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }, { number: 3, status: "open" }, { number: 4, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }, { name: "Ethanol Blends", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 9,
    name: "Sunoco - Lockport Terminal",
    address: "12909 High Rd, Lockport, IL 60441",
    phone: "(800) 243-9966",
    latitude: 41.6508,
    longitude: -88.0451,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 10,
    name: "Apex Oil - Forest View Terminal",
    address: "4805 S Harlem Ave, Forest View, IL 60402",
    phone: "(708) 788-1611",
    latitude: 41.8064,
    longitude: -87.7936,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 11,
    name: "Kinder Morgan - Forest View Terminal",
    address: "4811 S Harlem Ave, Forest View, IL 60402",
    phone: "(713) 369-9000",
    latitude: 41.8055,
    longitude: -87.8015,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }, { number: 3, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 12,
    name: "Sunoco - Blue Island Terminal",
    address: "3210 W 131st St, Blue Island, IL 60406",
    phone: "(708) 388-5801",
    latitude: 41.6556,
    longitude: -87.7009,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }],
    products: [{ name: "Ethanol", available: true }, { name: "Gasoline Blendstock", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 13,
    name: "Buckeye Terminals - Rockford",
    address: "1511 S Meridian Rd, Rockford, IL 61102",
    phone: "(610) 904-4000",
    latitude: 42.2614,
    longitude: -89.1740,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 14,
    name: "IMTT - Channahon Terminal",
    address: "24420 W Durkee Rd, Channahon, IL 60410",
    phone: "(815) 423-2500",
    latitude: 41.4140,
    longitude: -88.2035,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
  },
  {
    id: 15,
    name: "Kinder Morgan - Stony Island Terminal",
    address: "12200 S Stony Island Ave, Chicago, IL 60633",
    phone: "(773) 646-4440",
    latitude: 41.6731,
    longitude: -87.5760,
    distance_miles: 0,
    wait_minutes: 0,
    trucks_in_queue: 0,
    lanes: [{ number: 1, status: "open" }, { number: 2, status: "open" }, { number: 3, status: "open" }],
    products: [{ name: "Gasoline", available: true }, { name: "Diesel", available: true }],
    status: "open",
    last_updated: "Pending reports"
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

  const { wait_minutes, lane_issue, note, closed_lanes } = req.body;

  if (closed_lanes && Array.isArray(closed_lanes)) {
    closed_lanes.forEach(function(num) {
      var lane = terminal.lanes.find(function(l) { return l.number === num; });
      if (lane) lane.status = 'closed';
    });
  }

  if (note) terminal.note = note;
  if (lane_issue) terminal.lane_issue = lane_issue;
  terminal.report_time = Date.now();

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
// Auto-reset terminal data older than 4 hours
setInterval(function() {
  var fourHours = 4 * 60 * 60 * 1000;
  terminals.forEach(function(t) {
    if (t.report_time && (Date.now() - t.report_time) > fourHours) {
      t.wait_minutes = 0;
      t.trucks_in_queue = 0;
      t.status = 'open';
      t.note = null;
      t.lane_issue = null;
      t.last_updated = 'Pending reports';
      t.report_time = null;
      t.lanes.forEach(function(l) { l.status = 'open'; });
    }
  });
}, 60000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FuelLine is running on port ${PORT}`);
});
