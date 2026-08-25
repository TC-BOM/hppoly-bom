const VERSION = "v10.25.1";
// script.js – HP | Poly Configurator – v10.25.1: mapping/efficiency audit (stay on v10.25 catalog)
// Features: V72 poly5, Expandable support comparison, A2 bridge PoE, Announcement, A2 qty, E60/E70 mounts

document.title = 'Poly Video Conferencing "Bill" of Materials Generator';

async function init() {
  // Cache-bust so browsers/CDN never serve a stale skus_merged.json
  const res = await fetch('skus_merged.json?v=' + encodeURIComponent(VERSION) + '&t=' + Date.now(), { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load skus_merged.json (' + res.status + ')');
  const catalog = await res.json();

  // ---------- helpers ----------
  const getItem = sku => {
    if (!sku) return null;
    if (catalog[sku]) return catalog[sku];
    const base = String(sku).split('#')[0];
    if (catalog[base]) return catalog[base];
    if (catalog[base + '#ABA']) return catalog[base + '#ABA'];
    if (catalog[base + '#AC3']) return catalog[base + '#AC3'];
    if (catalog[sku + '#ABA']) return catalog[sku + '#ABA'];
    if (catalog[sku + '#AC3']) return catalog[sku + '#AC3'];
    return null;
  };
  const hasSku = (arr, sku) => arr.some(x => x.sku === sku);
  const addLine = (arr, sku, fallback = "(Custom item)", qty = 1) => {
    const item = getItem(sku);
    const existing = arr.find(x => x.sku === sku);
    if (existing) { existing.quantity += qty; return; }
    arr.push({
      sku,
      description: (item && item.description) ? item.description : fallback,
      msrp: (item && item.msrp != null) ? item.msrp : "",
      quantity: qty
    });
  };
  const fmtCurrency = v => {
    if (v === "" || v === null || v === undefined) return "—";
    if (typeof v !== "number") return String(v);
    return "$" + v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  // Support map
  const SUPPORT_MAP = {
    tc10:       { poly1: "P37760112", poly3: "P37760312", poly5: "UF4W1PV", analyze1: "UR5F3PV", analyze3: "UR5F4PV", analyze5: "UR5F6PV" },
    g9plus_mtr: { poly1: "P88230112", poly3: "P88230312", poly5: "UJ9E5PV", analyze1: "UR5J9PV", analyze3: "UR5K0PV", analyze5: "UR5K2PV" },
    zoom_pc:    { poly1: "P88120112", poly3: "P88120312", poly5: null,     analyze1: null,     analyze3: null,     analyze5: null },
    g62:        { poly1: "U86WDPV",   poly3: "U77D3PV",   poly5: "UL5V0PV", analyze1: "UR4H9PV", analyze3: "UR4J0PV", analyze5: "UR4J2PV" },
    e70:        { poly1: "P87090112", poly3: "P87090312", poly5: "UF4W3PV", analyze1: "UR7Z1PV", analyze3: "UR7Z2PV", analyze5: null },
    e60:        { poly1: "U86LCPV",   poly3: "U86LDPV",   poly5: "UF4W2PV", analyze1: "UR7X9PV", analyze3: "UR7Y0PV", analyze5: "UR7Y2PV" },
    a2_mic:     { poly1: "UJ9B5PV",   poly3: "UJ9B6PV",   poly5: null,     analyze1: null,     analyze3: null,     analyze5: null },
    a2_bridge:  { poly1: "UJ9C3PV",   poly3: "UJ9C4PV",   poly5: null,     analyze1: null,     analyze3: null,     analyze5: null },
    v12:        { poly1: "UE1X6PV",   poly3: "UE1X7PV",   poly5: "UJ9J6PV", analyze1: "UR8C8PV", analyze3: "UR8C9PV", analyze5: "UR8D1PV" },
    v52:        { poly1: "U86MNPV",   poly3: "U86MQPV",   poly5: null,     analyze1: "UR8E0PV", analyze3: "UR8E1PV", analyze5: "UR8E3PV" },
    v72:        { poly1: "U98X0PV",   poly3: "U98X1PV",   poly5: "UF4W0PV", analyze1: "UR8F2PV", analyze3: "UR8F3PV", analyze5: "UR8F5PV" },
    x32:        { poly1: "UE1Q8PV",   poly3: "UE1Q9PV",   poly5: null,     analyze1: "UR4R6PV", analyze3: "UR4R7PV", analyze5: "UR4R9PV" },
    x52:        { poly1: "P87620112", poly3: "P87620312", poly5: "UL5R7PV", analyze1: "UR4V4PV", analyze3: "UR4V5PV", analyze5: "UR4V7PV" },
    x72:        { poly1: "U99P8PV",   poly3: "U99P9PV",   poly5: "UL5V2PV", analyze1: "UR5C3PV", analyze3: "UR5C4PV", analyze5: "UR5C6PV" }
  };

  const addSupport = (arr, key, term, qty = 1) => {
    if (!term) return;
    const map = SUPPORT_MAP[key];
    if (!map) return;
    const sku = map[term];
    if (sku) addLine(arr, sku, undefined, qty);
  };

  const SCHEDULING_MAP = {
    tc10_black_wall:  { commercialTc10: "875K5AA", taaTc10: "973F9AA", glassMount: null,      label: "TC10 Black scheduling panel (wall mount included)" },
    tc10_white_wall:  { commercialTc10: "973G1AA", taaTc10: "9A135AA", glassMount: null,      label: "TC10 White scheduling panel (wall mount included)" },
    tc10_black_glass: { commercialTc10: "875K5AA", taaTc10: "973F9AA", glassMount: "874P9AA", label: "TC10 Black scheduling panel + glass mount" },
    tc10_white_glass: { commercialTc10: "973G1AA", taaTc10: "9A135AA", glassMount: "874P6AA", label: "TC10 White scheduling panel + glass mount" }
  };

  // ---------- UI ----------
  const app = document.getElementById("app");
  app.innerHTML = "";
  const pageTitle = document.querySelector("h1");
  if (pageTitle && !document.getElementById("appVersion")) {
    const ver = document.createElement("span");
    ver.id = "appVersion";
    ver.className = "ml-3 text-base font-medium text-gray-500 align-middle";
    ver.textContent = VERSION;
    pageTitle.appendChild(ver);
  }


  const select = (id, label, options, required = false) => {
    const wrap = document.createElement("div");
    wrap.id = id + "Wrap";
    const opts = options.map(o => typeof o === "string" ? { value: o, label: o } : o);
    wrap.innerHTML = `
      <label class="block font-medium">${label}${required ? ' <span class="text-red-600">*</span>' : ""}</label>
      <select id="${id}" class="border p-2 w-full">
        ${required ? '<option value="">--</option>' : ""}
        ${opts.map(o => `<option value="${o.value}">${o.label ?? o.value}</option>`).join("")}
      </select>`;
    return wrap;
  };
  const input = (id, label, ph = "") => {
    const wrap = document.createElement("div");
    wrap.innerHTML = `<label class="block font-medium">${label}</label>
      <input id="${id}" class="border p-2 w-full" placeholder="${ph}">`;
    return wrap;
  };

  const form = document.createElement("form");
  form.className = "space-y-4";

  // Announcement banner (support + TC10 scheduler updates)
  const promoWrap = document.createElement("div");
  promoWrap.id = "promoBox";
  promoWrap.className = "p-3 border-2 border-amber-400 rounded bg-amber-50 space-y-2";
  promoWrap.innerHTML = `
    <div class="font-semibold text-amber-900">📢 Announcement — new support &amp; TC10 scheduler options</div>
    <ul class="text-sm text-amber-950 list-disc pl-5 space-y-1">
      <li><strong>Support additions:</strong> 1 / 3 / 5 year <strong>Poly+</strong> and <strong>Poly+ Analyze</strong> terms are now selectable for the main system, cameras (E60/E70), A2 mics, and TC10. Poly+ Analyze includes estate-wide coverage and Lens Pro insights.</li>
      <li><strong>TC10 scheduler additions:</strong> Optional outside-room TC10 scheduling panel in Black or White, with wall mount (included) or glass mount. Available in both commercial and TAA/JITC paths.</li>
    </ul>
    <p class="text-xs text-amber-800">Select Support term and Scheduling panel below to include these on the BOM.</p>`;
  form.appendChild(promoWrap);

  // TAA / JITC
  const taaWrap = document.createElement("div");
  taaWrap.className = "p-3 border-2 border-blue-300 rounded bg-blue-50 space-y-1";
  taaWrap.innerHTML = `
    <label class="inline-flex items-center gap-2 cursor-pointer">
      <input id="taaJitc" type="checkbox" class="w-4 h-4 border">
      <span class="font-semibold text-blue-900">TAA / JITC compliant configuration only</span>
    </label>
    <p class="text-xs text-blue-800 ml-6">When checked, only TAA/JITC-compliant SKUs are used. Standard commercial hardware is excluded. Support terms still apply.</p>`;

  const roomSection = document.createElement("fieldset");
  roomSection.className = "space-y-3 p-4 border border-gray-200 rounded";
  roomSection.innerHTML = '<legend class="font-semibold px-1">Room configuration</legend>';
  roomSection.appendChild(taaWrap);

  roomSection.appendChild(select("typeOfSystem", "Select System Type", [
    "BYOD USB Bar only",
    "Windows PC based solution",
    "Android appliance based solution"
  ], true));
  const platformWrap = select("platform", "Select Primary Platform", ["Zoom", "Microsoft Teams", "Google Meet"], true);
  platformWrap.classList.add("hidden");
  const platformHint = document.createElement("p");
  platformHint.id = "platformHint";
  platformHint.className = "text-xs text-gray-600 mt-1";
  platformWrap.appendChild(platformHint);
  roomSection.appendChild(platformWrap);
  roomSection.appendChild(select("roomSize", "Select Room Size", [
    { value: "Small",  label: "Small — Up to 12' from front of room to furthest person to cover" },
    { value: "Medium", label: "Medium — Up to 16' from front of room to furthest person to cover" },
    { value: "Large",  label: "Large — Up to 25' from front of room to furthest person to cover" },
    { value: "Very large", label: "Very Large room. Distance of > 25' from front of room to furthest person to cover" }
  ], true));
  form.appendChild(roomSection);

  const hwSection = document.createElement("fieldset");
  hwSection.className = "space-y-3 p-4 border border-gray-200 rounded";
  hwSection.innerHTML = '<legend class="font-semibold px-1">Hardware options</legend>';
  const mountingWrapEl = select("mounting", "Select Mounting option", ["None", "Wall", "VESA style display mount", "Table"]);
  const mountingHint = document.createElement("p");
  mountingHint.id = "mountingHint";
  mountingHint.className = "text-xs text-gray-600 mt-1";
  mountingWrapEl.appendChild(mountingHint);
  hwSection.appendChild(mountingWrapEl);
  hwSection.appendChild(select("expansionMic", "Include Expansion Mic?", [
    "None",
    "Single Analog Exp mic",
    "Existing IP table mics",
    "Existing IP Ceiling mics",
    "New White A2 table mic pod(s)",
    "New Black A2 table mic pod(s)"
  ]));

  // A2 quantity (shown only when New White/Black A2 is selected)
  const a2QtyWrap = document.createElement("div");
  a2QtyWrap.id = "a2QtyWrap";
  a2QtyWrap.className = "hidden";
  a2QtyWrap.innerHTML = `
    <label class="block font-medium">Number of A2 mic pods</label>
    <select id="a2Qty" class="border p-2 w-full"><option value="1">1</option></select>
    <p id="a2QtyHint" class="text-xs text-gray-600 mt-1"></p>`;
  hwSection.appendChild(a2QtyWrap);

  // Camera add-on (shown for Android Medium / Large / Very large)
  const camWrap = document.createElement("div");
  camWrap.id = "cameraWrap";
  camWrap.className = "hidden";
  camWrap.innerHTML = `
    <label class="block font-medium">Optional Camera add-on</label>
    <select id="cameraChoice" class="border p-2 w-full">
      <option value="None">None (use built-in camera)</option>
      <option value="E70">Poly E70 (842F8AA) — AI Director auto-tracking / camera switching</option>
      <option value="E60">Poly E60 (9W1A6AA#AC3)</option>
    </select>
    <p class="text-xs text-gray-600 mt-1">E70 recommended for AI camera switching on X52 only.</p>`;
  hwSection.appendChild(camWrap);

  // Camera power option (E60 + E70) — PoE+ injector or wall PSU
  const cameraPowerWrap = document.createElement("div");
  cameraPowerWrap.id = "cameraPowerWrap";
  cameraPowerWrap.className = "hidden";
  cameraPowerWrap.innerHTML = `
    <label class="block font-medium">Camera power option</label>
    <select id="cameraPower" class="border p-2 w-full">
      <option value="None">None — using existing PoE+ switch</option>
      <option value="Wall">Wall power supply</option>
      <option value="Injector">PoE+ midspan injector kit (85X03AA#ABA)</option>
    </select>
    <p class="text-xs text-gray-600 mt-1">E60 &amp; E70 require PoE+ (Class 4 / 30W). Use injector if your switch is not PoE+.</p>`;
  hwSection.appendChild(cameraPowerWrap);

  // Camera mount option (VESA for E70, Ceiling for E60)
  const cameraMountWrap = document.createElement("div");
  cameraMountWrap.id = "cameraMountWrap";
  cameraMountWrap.className = "hidden";
  cameraMountWrap.innerHTML = `
    <label class="block font-medium">Camera mount option</label>
    <select id="cameraMount" class="border p-2 w-full">
      <option value="None">None</option>
    </select>
    <p class="text-xs text-gray-600 mt-1" id="cameraMountHint"></p>`;
  hwSection.appendChild(cameraMountWrap);
  form.appendChild(hwSection);

  const svcSection = document.createElement("fieldset");
  svcSection.className = "space-y-3 p-4 border border-gray-200 rounded";
  svcSection.innerHTML = '<legend class="font-semibold px-1">Scheduling, support &amp; services</legend>';
  svcSection.appendChild(select("schedulingPanel", "Scheduling panel (additional TC10 outside room)", [
    { value: "None", label: "None" },
    { value: "tc10_black_wall",  label: "TC10 Black — wall mount (included)" },
    { value: "tc10_white_wall",  label: "TC10 White — wall mount (included)" },
    { value: "tc10_black_glass", label: "TC10 Black — glass mount" },
    { value: "tc10_white_glass", label: "TC10 White — glass mount" }
  ]));
  svcSection.appendChild(select("supportTerm", "Select Support term", [
    { value: "",         label: "None" },
    { value: "poly1",    label: "1yr - Poly+" },
    { value: "poly3",    label: "3yr - Poly+" },
    { value: "poly5",    label: "5yr - Poly+" },
    { value: "analyze1", label: "1yr - Poly+ Analyze" },
    { value: "analyze3", label: "3yr - Poly+ Analyze" },
    { value: "analyze5", label: "5yr - Poly+ Analyze" }
  ]));

  // Brief overview of Poly+ vs Poly+ Analyze
  const supportInfo = document.createElement("div");
  supportInfo.className = "text-xs text-gray-700 mt-1 p-2 border-l-4 border-blue-400 bg-blue-50 rounded";
  supportInfo.innerHTML = `
    <strong>Poly+</strong> — Essential support: unlimited 24/7 priority technical support, next-business-day advance hardware replacement, and ecosystem cloud partner support.<br>
    <strong>Poly+ Analyze</strong> — Premium tier that includes everything in Poly+ <em>plus</em> coverage for your entire HP Poly estate, HP Poly Lens Pro for Rooms (advanced insights), and enterprise integration / IT tools.<br>
    <a href="https://info.lens.poly.com/docs/premium-Poly-Lens/poly-plus-enterprise#hp-poly-analyze" target="_blank" rel="noopener" class="text-blue-700 underline">Learn more about Poly+ and Poly+ Analyze</a>`;
  svcSection.appendChild(supportInfo);

  // Expandable Poly+ vs Poly+ Analyze comparison table
  const featuresDetails = document.createElement("details");
  featuresDetails.className = "text-xs mt-2 border border-blue-200 rounded bg-white";
  featuresDetails.innerHTML = `
    <summary class="cursor-pointer select-none px-3 py-2 font-medium text-blue-900 hover:bg-blue-50 rounded">
      Poly+ vs Poly+ Analyze feature comparison — click to expand
    </summary>
    <div class="px-3 pb-3 overflow-x-auto">
      <p class="text-gray-600 mb-2">
        Poly+ Analyze includes everything in Poly+ plus Poly Lens Pro for Rooms / Premium analytics.
        <a href="https://info.lens.poly.com/docs/premium-Poly-Lens/poly-plus-features" target="_blank" rel="noopener" class="text-blue-700 underline">Source</a>
        ·
        <a href="https://info.lens.poly.com/docs/premium-Poly-Lens/poly-plus-enterprise#hp-poly-analyze" target="_blank" rel="noopener" class="text-blue-700 underline">Poly+ Analyze overview</a>
      </p>
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="bg-blue-50">
            <th class="border border-blue-100 px-2 py-1">Feature</th>
            <th class="border border-blue-100 px-2 py-1">Description</th>
            <th class="border border-blue-100 px-2 py-1 text-center whitespace-nowrap">Poly+</th>
            <th class="border border-blue-100 px-2 py-1 text-center whitespace-nowrap">Poly+ Analyze</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">24/7 priority technical support</td>
            <td class="border border-blue-100 px-2 py-1">Unlimited global support via phone, chat, web, and video.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Advance hardware replacement</td>
            <td class="border border-blue-100 px-2 py-1">Next-business-day replacement before returning the failed unit.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Ecosystem cloud partner support</td>
            <td class="border border-blue-100 px-2 py-1">Faster resolution with Teams, Zoom, and other cloud partners.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Coverage for entire HP Poly estate</td>
            <td class="border border-blue-100 px-2 py-1">Unified entitlement across your Poly inventory (not device-by-device only).</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Office 365 Calendar</td>
            <td class="border border-blue-100 px-2 py-1">Integrate Microsoft 365 calendars with Poly Lens for room schedule insights and utilization.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Room Analytics</td>
            <td class="border border-blue-100 px-2 py-1">Customizable reports on room utilization and meeting behavior trends.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Room Insights Dashboard</td>
            <td class="border border-blue-100 px-2 py-1">Interactive dashboard for trends, utilization, and KPIs across your Poly estate.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Room Insights Feed</td>
            <td class="border border-blue-100 px-2 py-1">Curated feed of significant room utilization and meeting metrics.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Remote Access (TC8 / TC10)</td>
            <td class="border border-blue-100 px-2 py-1">Remotely access and control touch controllers from Poly Lens.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Visual Analytics with Power BI</td>
            <td class="border border-blue-100 px-2 py-1">Visualize Poly inventory and combine with other UC datasets in Power BI.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Zoom Device Management</td>
            <td class="border border-blue-100 px-2 py-1">Monitor Zoom device/room health and manage Poly devices in Poly Lens.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">API Access to Premium Features</td>
            <td class="border border-blue-100 px-2 py-1">Poly Lens Premium APIs (requires Premium entitlement). Core APIs remain free.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Enterprise integration &amp; IT tools</td>
            <td class="border border-blue-100 px-2 py-1">Broader estate tooling and integration for IT success.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  svcSection.appendChild(featuresDetails);

  svcSection.appendChild(select("implementationHelp", "Implementation Help", [
    "None", "Remote Implementation help", "Onsite Implementation help"
  ]));
  svcSection.appendChild(input("accessories", "Optional: any additional accessories (comma-separated SKUs)", "e.g. extra cameras, cables"));
  form.appendChild(svcSection);

  const actionsRow = document.createElement("div");
  actionsRow.className = "flex flex-wrap items-center gap-x-6 gap-y-3 pt-1";
  const priceWrap = document.createElement("label");
  priceWrap.className = "inline-flex items-center gap-2 shrink-0 whitespace-nowrap";
  priceWrap.innerHTML = `<input id="includePrices" type="checkbox" class="border"> Include Prices (MSRP)`;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "generateBtn";
  btn.className = "px-4 py-2 bg-blue-600 text-white rounded shrink-0";
  btn.textContent = "Generate BOM";
  actionsRow.appendChild(priceWrap);
  actionsRow.appendChild(btn);
  form.appendChild(actionsRow);

  const resultDiv = document.createElement("div");
  resultDiv.id = "result";
  resultDiv.className = "mt-6 space-y-4";

  app.appendChild(form);
  app.appendChild(resultDiv);

  // Single compact legalese at bottom of page only
  const legalFooter = document.createElement("p");
  legalFooter.className = "mt-6 text-[11px] text-gray-500 border-t border-gray-300 pt-2 leading-snug";
  legalFooter.innerHTML = `<strong>Estimate only.</strong> Subject to change. Confirm SKUs, pricing &amp; support with your HP Poly and distributor reps.`;
  app.appendChild(legalFooter);

  // ---------- dynamic UI helpers ----------
  // Max A2 table mics per host (HP Poly Studio A2 admin guide)
  // V12: 1 | X32: 2 | X52/V52: 4 | X72/V72: 4 | G62: 8
  function a2MaxForSelection() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    const r = document.getElementById("roomSize")?.value || "";
    const isUSB = (t === "BYOD USB Bar only" || t === "Windows PC based solution");
    if (r === "Very large") return 8; // G62
    if (r === "Large") return 4;      // X72 / V72
    if (r === "Medium") return 4;     // X52 / V52
    if (r === "Small") {
      if (isUSB) return 1;            // V12
      return 2;                       // X32
    }
    return 4;
  }
  function refreshA2QtyOptions() {
    const sel = document.getElementById("a2Qty");
    const hint = document.getElementById("a2QtyHint");
    if (!sel) return;
    const max = a2MaxForSelection();
    const prev = parseInt(sel.value || "1", 10) || 1;
    sel.innerHTML = "";
    for (let n = 1; n <= 8; n++) {
      const opt = document.createElement("option");
      opt.value = String(n);
      opt.textContent = n > max ? n + " (exceeds max for this system)" : String(n);
      if (n > max) opt.disabled = true;
      sel.appendChild(opt);
    }
    sel.value = String(Math.min(prev, max));
    if (hint) {
      const t = document.getElementById("typeOfSystem")?.value || "";
      const r = document.getElementById("roomSize")?.value || "";
      const isUSB = (t === "BYOD USB Bar only" || t === "Windows PC based solution");
      let host = "selected system";
      if (r === "Small" && isUSB) host = "V12 (max 1)";
      else if (r === "Small") host = "X32 (max 2)";
      else if (r === "Medium") host = "X52 / V52 (max 4)";
      else if (r === "Large") host = "X72 / V72 (max 4)";
      else if (r === "Very large") host = "G62 (max 8)";
      hint.textContent = "Per HP Poly Studio A2 admin guide: " + host + ".";
    }
  }
  function updateA2QtyVisibility() {
    const exp = document.getElementById("expansionMic")?.value || "";
    const show = exp.includes("New White A2") || exp.includes("New Black A2");
    const wrap = document.getElementById("a2QtyWrap");
    refreshA2QtyOptions();
    if (wrap) wrap.classList.toggle("hidden", !show);
  }

  function isUsbOrPc(t) {
    return t === "BYOD USB Bar only" || t === "Windows PC based solution";
  }
  function hostFamily() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    const r = document.getElementById("roomSize")?.value || "";
    if (!t || !r) return null;
    const usb = isUsbOrPc(t);
    if (r === "Small") return usb ? "v12" : "x32";
    if (r === "Medium") return usb ? "v52" : "x52";
    if (r === "Large") return usb ? "v72" : "x72";
    if (r === "Very large") return usb ? "v72" : "g62";
    return null;
  }
  function analogMicApplies() {
    // 875M6AA: Analog expansion mic for Studio USB/X50/X52/V52/X70/X72/V72
    const family = hostFamily();
    return family === "v52" || family === "x52" || family === "v72" || family === "x72";
  }
  function updatePlatformVisibility() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    const show = t === "Windows PC based solution";
    const wrap = document.getElementById("platformWrap");
    if (wrap) wrap.classList.toggle("hidden", !show);
    const hint = document.getElementById("platformHint");
    const p = document.getElementById("platform")?.value || "";
    if (!hint) return;
    if (!show) { hint.textContent = ""; return; }
    if (p === "Google Meet") {
      hint.textContent = "No Google Meet compute SKU is in this catalog. The BOM will include the USB bar only (no room PC or TC10).";
    } else if (!p) {
      hint.textContent = "Required for Windows PC solutions. Zoom and Teams add a room compute plus in-room TC10.";
    } else {
      hint.textContent = "Windows room compute and in-room TC10 are added for Zoom and Teams.";
    }
  }
  function updateMountingOptions() {
    const wrap = document.getElementById("mountingWrap");
    const sel = document.getElementById("mounting");
    const hint = document.getElementById("mountingHint");
    if (!wrap || !sel) return;
    const family = hostFamily();
    const prev = sel.value || "None";
    // Hide until host is known; G62 kit already includes mount (no extra SKU in this generator)
    if (!family || family === "g62") {
      wrap.classList.add("hidden");
      sel.innerHTML = `<option value="None">None</option>`;
      sel.value = "None";
      if (hint) {
        hint.textContent = family === "g62"
          ? "G62 commercial kit includes the mount; no extra mounting SKU is added."
          : "";
      }
      return;
    }
    wrap.classList.remove("hidden");
    const opts = [{ value: "None", label: "None" }];
    if (family === "v12" || family === "x32") {
      opts.push({ value: "Wall", label: "Wall (875L6AA wall + VESA kit)" });
      opts.push({ value: "VESA style display mount", label: "VESA (875L6AA wall + VESA kit)" });
      opts.push({ value: "Table", label: "Table (875L5AA)" });
      if (hint) hint.textContent = "V12 / X32 share one wall+VESA kit SKU.";
    } else if (family === "v52" || family === "x52") {
      opts.push({ value: "Wall", label: "Wall (875L8AA)" });
      opts.push({ value: "VESA style display mount", label: "VESA (875L9AA)" });
      opts.push({ value: "Table", label: "Table (875M0AA)" });
      if (hint) hint.textContent = "";
    } else if (family === "v72" || family === "x72") {
      // No dedicated wall SKU in catalog for X72/V72
      opts.push({ value: "VESA style display mount", label: "VESA (875L2AA)" });
      opts.push({ value: "Table", label: "Table (875L3AA)" });
      if (hint) hint.textContent = "No wall-mount SKU in this catalog for X72 / V72; VESA or table only.";
    }
    sel.innerHTML = opts.map(o => `<option value="${o.value}">${o.label}</option>`).join("");
    sel.value = opts.some(o => o.value === prev) ? prev : "None";
  }
  function updateExpansionOptions() {
    const sel = document.getElementById("expansionMic");
    if (!sel) return;
    const prev = sel.value || "None";
    const analog = analogMicApplies();
    const opts = [{ value: "None", label: "None" }];
    if (analog) opts.push({ value: "Single Analog Exp mic", label: "Single Analog Exp mic (875M6AA)" });
    opts.push({ value: "Existing IP table mics", label: "Existing IP table mics (not added to BOM)" });
    opts.push({ value: "Existing IP Ceiling mics", label: "Existing IP Ceiling mics (not added to BOM)" });
    opts.push({ value: "New White A2 table mic pod(s)", label: "New White A2 table mic pod(s)" });
    opts.push({ value: "New Black A2 table mic pod(s)", label: "New Black A2 table mic pod(s)" });
    sel.innerHTML = opts.map(o => `<option value="${o.value}">${o.label}</option>`).join("");
    sel.value = opts.some(o => o.value === prev) ? prev : "None";
  }
  function refreshDependentControls() {
    updatePlatformVisibility();
    updateMountingOptions();
    updateExpansionOptions();
    updateCameraVisibility();
    updateA2QtyVisibility();
  }
  function canShowCameraAddOn() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    const r = document.getElementById("roomSize")?.value || "";
    return t === "Android appliance based solution" && (r === "Medium" || r === "Large" || r === "Very large");
  }
  function updateCameraAccessoryVisibility() {
    const cam = document.getElementById("cameraChoice")?.value || "None";
    const show = cam === "E60" || cam === "E70";
    const powerWrap = document.getElementById("cameraPowerWrap");
    const mountWrap = document.getElementById("cameraMountWrap");
    if (powerWrap) powerWrap.classList.toggle("hidden", !show);

    // Rebuild mount options from real catalog SKUs; hide the control if none exist
    const mountSel = document.getElementById("cameraMount");
    const hint = document.getElementById("cameraMountHint");
    let mountOptions = 0;
    if (mountSel) {
      const prev = mountSel.value;
      mountSel.innerHTML = `<option value="None">None</option>`;
      if (cam === "E70") {
        if (getItem("875K7AA")) {
          mountSel.innerHTML += `<option value="VESA">VESA mount (875K7AA)</option>`;
          mountOptions++;
        }
        if (getItem("875K8AA")) {
          mountSel.innerHTML += `<option value="Clamp">Display clamp (875K8AA)</option>`;
          mountOptions++;
        }
        if (hint) hint.textContent = "Optional E70 mounts from catalog. Default None (use included hardware).";
      } else if (cam === "E60") {
        if (getItem("9W1A8AA#AC3") || getItem("9W1A8AA")) {
          mountSel.innerHTML += `<option value="Ceiling">Ceiling mount (9W1A8AA#AC3)</option>`;
          mountOptions++;
        }
        if (hint) hint.textContent = "Optional ceiling mount for Poly Studio E60 (wall mount is included with camera).";
      } else {
        if (hint) hint.textContent = "";
      }
      if ([...mountSel.options].some(o => o.value === prev)) mountSel.value = prev;
      else mountSel.value = "None";
    }
    if (mountWrap) mountWrap.classList.toggle("hidden", !show || mountOptions === 0);
  }
  function updateCameraVisibility() {
    camWrap.classList.toggle("hidden", !canShowCameraAddOn());
    updateCameraAccessoryVisibility();
  }

  ["platform", "typeOfSystem", "roomSize"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", refreshDependentControls);
  });
  document.getElementById("cameraChoice")?.addEventListener("change", updateCameraAccessoryVisibility);
  document.getElementById("expansionMic")?.addEventListener("change", updateA2QtyVisibility);
  refreshDependentControls();

  // ---------- promo button ----------
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener("click", () => {
      const taaCb = document.getElementById("taaJitc");
      if (taaCb) taaCb.checked = false;
      document.getElementById("typeOfSystem").value = "Android appliance based solution";
      document.getElementById("platform").value = "Microsoft Teams";
      document.getElementById("roomSize").value = "Medium";
      document.getElementById("mounting").value = "None";
      document.getElementById("expansionMic").value = "None";
      document.getElementById("schedulingPanel").value = "None";
      document.getElementById("supportTerm").value = "poly3";
      document.getElementById("implementationHelp").value = "None";
      document.getElementById("typeOfSystem").dispatchEvent(new Event("change"));
      document.getElementById("platform").dispatchEvent(new Event("change"));
      document.getElementById("roomSize").dispatchEvent(new Event("change"));
      const camSel = document.getElementById("cameraChoice");
      if (camSel) camSel.value = "E70";
      updateCameraAccessoryVisibility();
      generate();
      const res = document.getElementById("result");
      if (res) res.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ---------- core generate ----------
  btn.addEventListener("click", () => generate());

  function generate() {
    const typeOfSystem = document.getElementById("typeOfSystem").value;
    const platform     = document.getElementById("platform").value;
    const roomSize     = document.getElementById("roomSize").value;
    const mounting     = document.getElementById("mounting").value;
    const expansionMic = document.getElementById("expansionMic").value;
    const scheduling   = document.getElementById("schedulingPanel").value;
    const supportTerm  = document.getElementById("supportTerm").value;
    const implHelp     = document.getElementById("implementationHelp").value;
    const accessories  = (document.getElementById("accessories").value || "").split(",").map(s => s.trim()).filter(Boolean);
    const includePrices = document.getElementById("includePrices").checked;
    const taaJitc      = document.getElementById("taaJitc")?.checked || false;

    const needsPlatform = typeOfSystem === "Windows PC based solution";
    const missing = [];
    if (!typeOfSystem) missing.push("System type");
    if (needsPlatform && !platform) missing.push("Primary platform");
    if (!roomSize) missing.push("Room size");
    if (missing.length) {
      resultDiv.innerHTML = `<div class="text-red-700 bg-red-50 border border-red-200 p-3 rounded">Please select ${missing.join(", ")} to generate a BOM. Optional fields default to None and are not required.</div>`;
      return;
    }

    const results = [];
    const isUSBorPC = (typeOfSystem === "BYOD USB Bar only" || typeOfSystem === "Windows PC based solution");


    // ========== TAA / JITC MODE ==========
    // Prefer JITC variant when available; fall back to TAA-only.
    if (taaJitc) {
      const pick = (jitcSku, taaSku) => jitcSku || taaSku;
      const tc10Sku = () => pick("973F9AA", "977L6AA"); // Black TC10 TAA JITC / TAA

      if (isUSBorPC) {
        // USB / PC based → V-series bars (TAA)
        if (roomSize === "Small") {
          addLine(results, "B95SPAA"); // V12 TAA
          addSupport(results, "v12", supportTerm);
        } else if (roomSize === "Medium") {
          addLine(results, pick("A09D6AA", "A09D5AA")); // V52
          addSupport(results, "v52", supportTerm);
        } else {
          addLine(results, pick("AV1E4AA", null)); // V72
          addSupport(results, "v72", supportTerm);
        }
        if (typeOfSystem === "Windows PC based solution") {
          if (platform === "Microsoft Teams") {
            if (roomSize === "Small" || roomSize === "Medium") {
              addLine(results, "DS1R6AW"); // Studio 5 Room Compute TAA
            } else {
              addLine(results, "DS0W9AW"); // Studio 7 Room Compute TAA
            }
            addSupport(results, "g9plus_mtr", supportTerm);
            addLine(results, tc10Sku());
            addSupport(results, "tc10", supportTerm);
          } else {
            addLine(results, tc10Sku());
            addSupport(results, "tc10", supportTerm);
          }
        }
      } else {
        // Android appliance → X-series / G62 (TAA)
        if (roomSize === "Small") {
          addLine(results, pick("A3SW0AA", "A3SV9AA")); // X32
          addSupport(results, "x32", supportTerm);
          addLine(results, tc10Sku());
          addSupport(results, "tc10", supportTerm);
        } else if (roomSize === "Medium") {
          addLine(results, pick("8D8K4AA", "8D8K3AA")); // X52
          addSupport(results, "x52", supportTerm);
          addLine(results, tc10Sku());
          addSupport(results, "tc10", supportTerm);
        } else if (roomSize === "Large") {
          addLine(results, pick("A4MA2AA", "A4MA1AA")); // X72
          addSupport(results, "x72", supportTerm);
          addLine(results, tc10Sku());
          addSupport(results, "tc10", supportTerm);
        } else {
          addLine(results, pick("99T11AA", "99T10AA")); // G62
          addSupport(results, "g62", supportTerm);
          addLine(results, tc10Sku());
          addSupport(results, "tc10", supportTerm);
        }
      }

      // Scheduling panel (TAA path)
      if (scheduling && scheduling !== "None" && SCHEDULING_MAP[scheduling]) {
        const sch = SCHEDULING_MAP[scheduling];
        addLine(results, sch.taaTc10 || tc10Sku(), sch.label);
        addSupport(results, "tc10", supportTerm);
        if (sch.glassMount) addLine(results, sch.glassMount);
      }

      // A2 mics (TAA versions)
      const wantsA2White = (expansionMic || "").includes("New White A2");
      const wantsA2Black = (expansionMic || "").includes("New Black A2");
      if (wantsA2White || wantsA2Black) {
        const a2Qty = Math.max(1, Math.min(8, parseInt(document.getElementById("a2Qty")?.value || "1", 10) || 1));
        const podSku = wantsA2White ? "B22X5AA" : "B22X7AA"; // TAA White / Black
        addLine(results, podSku, "(A2 mic pod TAA)", a2Qty);
        addSupport(results, "a2_mic", supportTerm, a2Qty);
        addLine(results, "B22X3AA"); // A2 Bridge TAA (one per system)
        addSupport(results, "a2_bridge", supportTerm);
        // Required PoE for A2 bridge
        if (!hasSku(results, "A02F9AA")) addLine(results, "A02F9AA", "PoE power injector for G62 or A2 Audio bridge");
      }

      // Camera add-ons (TAA) for X52 / X72 / G62
      {
        const isG62 = hasSku(results, "99T11AA") || hasSku(results, "99T10AA");
        const isX52 = hasSku(results, "8D8K4AA") || hasSku(results, "8D8K3AA");
        const isX72 = hasSku(results, "A4MA2AA") || hasSku(results, "A4MA1AA");
        if (isG62 || isX52 || isX72) {
          const cam = document.getElementById("cameraChoice")?.value;
          const camPwr = document.getElementById("cameraPower")?.value || "None";
          const camMount = document.getElementById("cameraMount")?.value || "None";
          if (cam === "E60") {
            addLine(results, "9W1A7AA"); // E60 TAA
            addSupport(results, "e60", supportTerm);
            if (camPwr === "Wall" && !hasSku(results, "9W1A9AA#ABA") && !hasSku(results, "9W1A9AA")) {
              addLine(results, "9W1A9AA#ABA", "Poly Studio E60 Power Accessory (wall power supply)");
            }
            if (camPwr === "Injector" && !hasSku(results, "85X03AA#ABA")) {
              addLine(results, "85X03AA#ABA", "Poly PoE+ midspan injector kit");
            }
            if (camMount === "Ceiling" && !hasSku(results, "9W1A8AA#AC3") && !hasSku(results, "9W1A8AA")) {
              addLine(results, "9W1A8AA#AC3", "Poly Studio E60 Ceiling Mount");
            }
          } else if (cam === "E70") {
            addLine(results, pick("886C9AA", "886C8AA")); // E70 TAA JITC / TAA
            addSupport(results, "e70", supportTerm);
            if (camPwr === "Wall" && !hasSku(results, "875K6AA")) {
              addLine(results, "875K6AA", "Poly E70 wall / external power supply (12V 5A)");
            }
            if (camPwr === "Injector" && !hasSku(results, "85X03AA#ABA")) {
              addLine(results, "85X03AA#ABA", "Poly PoE+ midspan injector kit");
            }
            if (camMount === "VESA" && !hasSku(results, "875K7AA")) {
              addLine(results, "875K7AA", "Poly Studio E70 VESA Mounting Kit");
            }
            if (camMount === "Clamp" && !hasSku(results, "875K8AA")) {
              addLine(results, "875K8AA", "E70 display clamp");
            }
          }
        }
      }

      // Mounting applied after both TAA and commercial paths (same physical SKUs)
    }
    // ========== END TAA / JITC MODE ==========

    // ========== STANDARD COMMERCIAL PATH ==========
    if (!taaJitc) {
      if (isUSBorPC) {
        if (roomSize === "Small") {
          addLine(results, "A9DD8AA#ABA"); // V12
          addSupport(results, "v12", supportTerm);
        } else if (roomSize === "Medium") {
          addLine(results, "A09D4AA#ABA"); // V52
          addSupport(results, "v52", supportTerm);
        } else { // Large or Very large → V72
          addLine(results, "AV1E3AA#ABA");
          addSupport(results, "v72", supportTerm);
        }
        if (typeOfSystem === "Windows PC based solution") {
          if (platform === "Zoom") {
            addLine(results, "9C422AW#ABA");
            addSupport(results, "zoom_pc", supportTerm);
            addLine(results, "875K5AA");
            addSupport(results, "tc10", supportTerm);
          } else if (platform === "Microsoft Teams") {
            addLine(results, "A1ZB6AW#ABA");
            addSupport(results, "g9plus_mtr", supportTerm);
            addLine(results, "875K5AA");
            addSupport(results, "tc10", supportTerm);
          }
        }
      } else {
        // Android appliance
        if (roomSize === "Small") {
          addLine(results, "A3SV5AA#ABA"); // X32
          addSupport(results, "x32", supportTerm);
          // X32 also gets TC10
          if (!hasSku(results, "875K5AA")) addLine(results, "875K5AA");
          addSupport(results, "tc10", supportTerm);
        } else if (roomSize === "Medium") {
          addLine(results, "8D8K2AA#ABA"); // X52
          addSupport(results, "x52", supportTerm);
          addLine(results, "875K5AA");
          addSupport(results, "tc10", supportTerm);
        } else if (roomSize === "Large") {
          addLine(results, "A4LZ8AA#ABA"); // X72
          addSupport(results, "x72", supportTerm);
          addLine(results, "875K5AA");
          addSupport(results, "tc10", supportTerm);
        } else { // Very large → G62
          addLine(results, "A01KCAA#AC3");
          addSupport(results, "g62", supportTerm);
          addLine(results, "875K5AA");
          addSupport(results, "tc10", supportTerm);
        }
      }

      // Camera add-ons for X52 / X72 / G62
      const isX52 = hasSku(results, "8D8K2AA#ABA");
      const isX72 = hasSku(results, "A4LZ8AA#ABA");
      const isG62 = hasSku(results, "A01KCAA#AC3");
      if (isX52 || isX72 || isG62) {
        const cam = document.getElementById("cameraChoice")?.value;
        const camPwr = document.getElementById("cameraPower")?.value || "None";
        const camMount = document.getElementById("cameraMount")?.value || "None";
        if (cam === "E70") {
          if (!hasSku(results, "842F8AA")) addLine(results, "842F8AA");
          addSupport(results, "e70", supportTerm);
          if (camPwr === "Wall" && !hasSku(results, "875K6AA")) {
            addLine(results, "875K6AA", "Poly E70 wall / external power supply (12V 5A)");
          }
          if (camPwr === "Injector" && !hasSku(results, "85X03AA#ABA")) {
            addLine(results, "85X03AA#ABA", "Poly PoE+ midspan injector kit");
          }
          if (camMount === "VESA" && !hasSku(results, "875K7AA")) {
            addLine(results, "875K7AA", "Poly Studio E70 VESA Mounting Kit");
          }
          if (camMount === "Clamp" && !hasSku(results, "875K8AA")) {
            addLine(results, "875K8AA", "E70 display clamp");
          }
        } else if (cam === "E60") {
          if (!hasSku(results, "9W1A6AA#AC3")) addLine(results, "9W1A6AA#AC3");
          addSupport(results, "e60", supportTerm);
          if (camPwr === "Wall" && !hasSku(results, "9W1A9AA#ABA") && !hasSku(results, "9W1A9AA")) {
            addLine(results, "9W1A9AA#ABA", "Poly Studio E60 Power Accessory (wall power supply)");
          }
          if (camPwr === "Injector" && !hasSku(results, "85X03AA#ABA")) {
            addLine(results, "85X03AA#ABA", "Poly PoE+ midspan injector kit");
          }
          if (camMount === "Ceiling" && !hasSku(results, "9W1A8AA#AC3") && !hasSku(results, "9W1A8AA")) {
            addLine(results, "9W1A8AA#AC3", "Poly Studio E60 Ceiling Mount");
          }
        }
      }

      // A2 mics (commercial)
      {
        const wantsA2White = (expansionMic || "").includes("New White A2");
        const wantsA2Black = (expansionMic || "").includes("New Black A2");
        if (wantsA2White || wantsA2Black) {
          const a2Qty = Math.max(1, Math.min(8, parseInt(document.getElementById("a2Qty")?.value || "1", 10) || 1));
          const podSku = wantsA2White ? "B22X4AA#AC3" : "B22X6AA#AC3"; // commercial White / Black
          addLine(results, podSku, wantsA2White ? "Poly Studio A2 Table Microphone — White" : "Poly Studio A2 Table Microphone — Black", a2Qty);
          addSupport(results, "a2_mic", supportTerm, a2Qty);
          if (!hasSku(results, "B22X2AA#AC3")) {
            addLine(results, "B22X2AA#AC3", "Poly Studio A2 Audio Bridge");
          }
          addSupport(results, "a2_bridge", supportTerm);
          // Required PoE for A2 bridge
          if (!hasSku(results, "A02F9AA")) addLine(results, "A02F9AA", "PoE power injector for G62 or A2 Audio bridge");
        }
      }

      // Scheduling panel
      if (scheduling && scheduling !== "None" && SCHEDULING_MAP[scheduling]) {
        const sch = SCHEDULING_MAP[scheduling];
        addLine(results, sch.commercialTc10, sch.label);
        addSupport(results, "tc10", supportTerm);
        if (sch.glassMount) addLine(results, sch.glassMount);
      }
    }
    // ========== END STANDARD PATH ==========

    // Analog expansion mic (875M6AA) — commercial SKU is the only catalog key
    if ((expansionMic || "").includes("Single Analog Exp mic")) {
      addLine(results, "875M6AA");
    }

    // Mounting (commercial + TAA hosts share these physical mount SKUs)
    if (mounting && mounting !== "None") {
      const isV12 = hasSku(results, "B95SPAA") || hasSku(results, "A9DD8AA#ABA");
      const isV52 = hasSku(results, "A09D6AA") || hasSku(results, "A09D5AA") || hasSku(results, "A09D4AA#ABA");
      const isV72 = hasSku(results, "AV1E4AA") || hasSku(results, "AV1E3AA#ABA");
      const isX32 = hasSku(results, "A3SW0AA") || hasSku(results, "A3SV9AA") || hasSku(results, "A3SV5AA#ABA");
      const isX52 = hasSku(results, "8D8K4AA") || hasSku(results, "8D8K3AA") || hasSku(results, "8D8K2AA#ABA");
      const isX72 = hasSku(results, "A4MA2AA") || hasSku(results, "A4MA1AA") || hasSku(results, "A4LZ8AA#ABA");
      if (isV12 || isX32) {
        if (mounting === "Table") addLine(results, "875L5AA");
        else if (mounting === "Wall" || mounting === "VESA style display mount") addLine(results, "875L6AA");
      } else if (isX52 || isV52) {
        if (mounting === "Wall") addLine(results, "875L8AA");
        else if (mounting === "VESA style display mount") addLine(results, "875L9AA");
        else if (mounting === "Table") addLine(results, "875M0AA");
      } else if (isX72 || isV72) {
        if (mounting === "VESA style display mount") addLine(results, "875L2AA");
        else if (mounting === "Table") addLine(results, "875L3AA");
      }
    }

    // Implementation Help (PRO* SKUs already in catalog; was a dead control)
    if (implHelp && implHelp !== "None") {
      let remoteSku = null;
      if (isUSBorPC) remoteSku = "PROECOSYS02";
      else if (roomSize === "Very large") remoteSku = "PROG7500RE2";
      else remoteSku = "PROSTDIOXR2";
      if (remoteSku) addLine(results, remoteSku);
      if (implHelp === "Onsite Implementation help") addLine(results, "PROSMTHND04");
    }

    // Free-form accessories
    accessories.forEach(sku => addLine(results, sku, sku));

    // ---------- render table + correct total ----------
    let html = `<p class="text-xs text-gray-500 mb-1">Build ${VERSION} — generated ${new Date().toLocaleDateString()}</p>`;
    html += `<h2 class="font-semibold mb-2">Your BOM:</h2>`;
    if (needsPlatform && platform === "Google Meet") {
      html += `<p class="text-sm text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded mb-2">No Google Meet compute SKU is in this catalog. This BOM includes the USB bar only (no room PC or TC10).</p>`;
    }
    html += `<table class="w-full border-collapse text-sm"><thead><tr>`;
    html += `<th class="border px-4 py-2 text-left">Qty</th>`;
    html += `<th class="border px-4 py-2 text-left">SKU</th>`;
    html += `<th class="border px-4 py-2 text-left">Description</th>`;
    if (includePrices) html += `<th class="border px-4 py-2 text-left">MSRP</th>`;
    html += `</tr></thead><tbody>`;

    let grandTotal = 0;
    let pricedLines = 0;
    let unpricedLines = 0;

    results.forEach(r => {
      const sku = r.sku || "—";
      const qty = Number(r.quantity) || 0;
      const unit = (typeof r.msrp === "number") ? r.msrp : null;

      if (unit != null) {
        grandTotal += unit * qty;
        pricedLines++;
      } else {
        unpricedLines++;
      }

      html += `<tr>
        <td class="border px-4 py-2">${r.quantity}</td>
        <td class="border px-4 py-2">${sku}</td>
        <td class="border px-4 py-2">${r.description}</td>`;
      if (includePrices) {
        html += `<td class="border px-4 py-2">${fmtCurrency(r.msrp)}</td>`;
      }
      html += `</tr>`;
    });

    if (includePrices) {
      html += `<tr class="bg-blue-50 font-semibold">
        <td class="border px-4 py-2" colspan="3">Estimated MSRP Total</td>
        <td class="border px-4 py-2">${fmtCurrency(grandTotal)}</td>
      </tr>`;
    }

    html += `</tbody></table>`;

    if (includePrices) {
      html += `<p class="text-xs text-gray-600 mt-2">Total is Qty × unit MSRP for lines with a known price (${pricedLines} priced line${pricedLines === 1 ? "" : "s"}).`;
      if (unpricedLines > 0) {
        html += ` ${unpricedLines} line${unpricedLines === 1 ? "" : "s"} have no MSRP in the catalog and are excluded from the total.`;
      }
      html += ` Prices are list MSRP and may not reflect final quote.</p>`;
    }

    resultDiv.innerHTML = html;
  }
}

window.onload = init;
