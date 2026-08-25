const VERSION = "v10.39";
// script.js – HP | Poly Configurator – v10.39: in-box mount notes + per-option QSG links
// v10.38: live Audio phone catalog (Trio/CCX/Edge E/Rove) + G6 dock option
// v10.37: polarized filter moved to Hardware options (E70/X72/V72)
// v10.36: dedupe host mount lists (one VESA per family; X32/V12 wall+VESA is one kit)
// v10.35: TAA Google Meet does not add TC10; V72 A2 max 4
// v10.34: camera power options cleaned up (drop PoE+ injector; unified labels)
// v10.33: Lens Pro Rooms checkbox reveals 3-band dropdown (default 1–65)
// v10.32: resource links (Spaces, dimensional drawings, Glen Bevcar Excel) + AI disclaimer
// v10.31: VIDEO | AUDIO | HEADSETS tabs (audio/headset mock catalogs)
// v10.30: Netgear Pro AV switch disclaimer + optional switch picker; mount QSG links while selecting mounts
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
  function bomOffersPolarFilter(results) {
    const skus = ["842F8AA","886C9AA","886C8AA","A4MA2AA","A4MA1AA","A4LZ8AA#ABA","AV1E4AA","AV1E3AA#ABA"];
    return results.some(x => skus.includes(x.sku));
  }
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
    x72:        { poly1: "U99P8PV",   poly3: "U99P9PV",   poly5: "UL5V2PV", analyze1: "UR5C3PV", analyze3: "UR5C4PV", analyze5: "UR5C6PV" },
    trio_c60:    { poly1: "P86240112", poly3: "P86240312", poly5: "UM5V3PB", analyze1: "UQ7U6PB", analyze3: "UQ7U7PB", analyze5: null },
    trio_8300:   { poly1: "P66800112", poly3: "P66800312", poly5: "UM5V1PB", analyze1: "UQ7S3PB", analyze3: "UQ7S4PB", analyze5: null },
    ccx_350:     { poly1: "P49690112", poly3: "P49690312", poly5: null,     analyze1: "UQ7C4PB", analyze3: "UQ7C5PB", analyze5: null },
    ccx_400:     { poly1: "P49700112", poly3: "P49700312", poly5: null,     analyze1: "UQ7C9PB", analyze3: "UQ7D0PB", analyze5: null },
    ccx_505:     { poly1: "P49735112", poly3: "P49735312", poly5: null,     analyze1: "UQ7D9PB", analyze3: "UQ7E0PB", analyze5: null },
    ccx_600:     { poly1: "P49780112", poly3: "P49780312", poly5: null,     analyze1: "UQ7E4PB", analyze3: "UQ7E5PB", analyze5: null },
    ccx_em60:    { poly1: "U73W3PP",   poly3: "U73W4PP",   poly5: null,     analyze1: null,     analyze3: null,     analyze5: null },
    edge_e100:   { poly1: "P86980112", poly3: "P86980312", poly5: "UM5T1PB", analyze1: "UQ7G8PB", analyze3: "UQ7G9PB", analyze5: "UQ7H1PB" },
    edge_e220:   { poly1: "P86990112", poly3: "P86990312", poly5: "UM5T2PB", analyze1: "UQ7H4PB", analyze3: "UQ7H5PB", analyze5: "UQ7H7PB" },
    edge_e300:   { poly1: "P87815112", poly3: "P87815312", poly5: "UM5T7PB", analyze1: "UQ7J0PB", analyze3: "UQ7J1PB", analyze5: "UQ7J3PB" },
    edge_e320:   { poly1: "P87000112", poly3: "P87000312", poly5: "UM5T3PB", analyze1: "UQ7J6PB", analyze3: "UQ7J7PB", analyze5: "UQ7J9PB" },
    edge_e350:   { poly1: "P87010112", poly3: "P87010312", poly5: "UM5T4PB", analyze1: "UQ7K2PB", analyze3: "UQ7K3PB", analyze5: "UQ7K5PB" },
    edge_e400:   { poly1: "P87835112", poly3: "P87835312", poly5: "UM5T8PB", analyze1: "UQ7K8PB", analyze3: "UQ7K9PB", analyze5: "UQ7L1PB" },
    edge_e450:   { poly1: "P87030112", poly3: "P87030312", poly5: "UM5T5PB", analyze1: "UQ7L4PB", analyze3: "UQ7L5PB", analyze5: "UQ7L7PB" },
    edge_e550:   { poly1: "P87050112", poly3: "P87050312", poly5: "UM5T6PB", analyze1: "UQ7M6PB", analyze3: null,     analyze5: "UQ7M9PB" },
    edge_em:     { poly1: "P87020112", poly3: "P87020312", poly5: null,     analyze1: null,     analyze3: null,     analyze5: null },
    rove_20:     { poly1: "P88090112", poly3: "P88090312", poly5: "UM5U3PB", analyze1: null,     analyze3: null,     analyze5: null },
    rove_20_b1:  { poly1: "P88080112", poly3: "P88080312", poly5: "UM5U2PB", analyze1: null,     analyze3: null,     analyze5: null },
    rove_30:     { poly1: "P86930112", poly3: "P86930312", poly5: "UM5V0PB", analyze1: "UQ7N8PB", analyze3: "UQ7N9PB", analyze5: "UQ7P1PB" },
    rove_40:     { poly1: "P86810112", poly3: "P86810312", poly5: "UM5U4PB", analyze1: "UQ7P4PB", analyze3: "UQ7P5PB", analyze5: "UQ7P7PB" },
    rove_b2:     { poly1: "P86820112", poly3: "P86820312", poly5: "UM5U5PB", analyze1: "UQ7Q0PB", analyze3: "UQ7Q1PB", analyze5: "UQ7Q3PB" },
    rove_b4:     { poly1: "P86830112", poly3: "P86830312", poly5: "UM5U6PB", analyze1: "UQ7Q6PB", analyze3: "UQ7Q7PB", analyze5: "UQ7Q9PB" },
    rove_r8:     { poly1: "P86840112", poly3: "P86840312", poly5: "UM5U7PB", analyze1: "UQ7R2PB", analyze3: "UQ7R3PB", analyze5: "UQ7R5PB" },
    g6_dock:     { poly1: "US2A4PV",   poly3: "US2A5PV",   poly5: null,     analyze1: null,     analyze3: null,     analyze5: null }
  };

  const addSupport = (arr, key, term, qty = 1) => {
    if (!term) return;
    const map = SUPPORT_MAP[key];
    if (!map) return;
    const sku = map[term];
    if (sku) addLine(arr, sku, undefined, qty);
  };

  const LENS_PRO_SKUS = ["UJ8T6LN", "UJ8T5LN", "UJ8T4LN"];
  function lensProSkuForQty(n) {
    const q = Math.max(0, Number(n) || 0);
    if (q <= 65) return "UJ8T6LN";
    if (q <= 250) return "UJ8T5LN";
    return "UJ8T4LN";
  }
  function applyLensProBand(line) {
    if (!line || !LENS_PRO_SKUS.includes(line.sku)) return;
    const sku = lensProSkuForQty(line.quantity);
    const item = getItem(sku);
    line.sku = sku;
    if (item) {
      if (item.description) line.description = item.description;
      line.msrp = (item.msrp != null) ? item.msrp : line.msrp;
    }
  }

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
    <p class="font-medium">Optional camera power</p>
    <p class="text-xs text-gray-600 mb-1">E60 and E70 need PoE+ (Class 4 / 30W). Leave unchecked if the switch already provides PoE+.</p>
    <label class="flex items-center gap-2 mt-1 text-sm">
      <input id="camPowerWall" type="checkbox" class="border">
      <span id="camPowerWallLabel">Wall power accessory (SKU) — $0</span>
    </label>
    <label class="flex items-center gap-2 mt-1 text-sm">
      <input id="camPowerPoePP" type="checkbox" class="border">
      <span>45W PoE++ adapter (B5NH6AA) — $102</span>
    </label>`;
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

  // Netgear Pro AV switch (LLN / StudioNet) — G62 / X52 / V52 / X72 / V72, and X32 if A2/IP extras
  const netgearWrap = document.createElement("div");
  netgearWrap.id = "netgearWrap";
  netgearWrap.className = "hidden p-3 border-2 border-amber-400 rounded bg-blue-50 space-y-2";
  netgearWrap.innerHTML = `
    <div class="font-semibold text-amber-900">Netgear Pro AV switch required for more than one IP device</div>
    <p class="text-sm text-blue-950">If this room has more than one IP-connected peripheral (extra camera + A2 mics, IP table/ceiling mics, etc.) on G62, X52/V52, or X72/V72, Poly requires a dedicated Netgear Pro AV switch on the LLN / StudioNet path. Do not use a generic office switch. Currently documented model: GSM4210PD. From October 2025 the Poly profile also covers M4250 / M4300 / M4350. High-side list estimates below are CDW advertised list, not Poly MSRP.</p>
    <p class="text-xs">
      <a href="https://support.hp.com/ie-en/document/ish_13031025-13026020-16" target="_blank" rel="noopener" class="text-blue-700 underline">HP article: HP Poly increasing the number of supported Netgear network switch models for Poly StudioNet</a>
      ·
      <a href="https://downloads1.netgear.com/files/netgear/documents/AV-over-IP-Switch-Reference-Guide-110v.pdf" target="_blank" rel="noopener" class="text-blue-700 underline">Netgear AV Product Reference Guide (PDF)</a>
    </p>
    <label class="block font-medium">Netgear Pro AV switch</label>
    <select id="netgearSwitch" class="border p-2 w-full">
      <option value="None">None — using existing supported switch / not adding to BOM</option>
      <option value="GSM4210PD-100NAS">GSM4210PD-100NAS — 8-port PoE+ desktop (~$865 high-side)</option>
      <option value="GSM4210PX-100NAS">GSM4210PX-100NAS — 8-port PoE+ 220W (~$1,362)</option>
      <option value="GSM4212PX-100NAS">GSM4212PX-100NAS — 10-port PoE+ (~$1,910)</option>
      <option value="GSM4230PX-100NAS">GSM4230PX-100NAS — 26-port PoE+ (~$2,752)</option>
      <option value="GSM4248PX-100NAS">GSM4248PX-100NAS — 40-port PoE+ (~$4,521)</option>
    </select>`;
  hwSection.appendChild(netgearWrap);

  const g6DockWrap = document.createElement("div");
  g6DockWrap.id = "g6DockWrap";
  g6DockWrap.className = "hidden mt-2";
  g6DockWrap.innerHTML = `
    <label class="flex items-center gap-2 text-sm">
      <input id="g6DockOpt" type="checkbox" class="border">
      <span>HP Thunderbolt 4 Ultra 180W G6 Dock (9X481UT#ABA) — $394</span>
    </label>
    <p class="text-xs text-gray-600 ml-6">Optional for Windows PC based rooms. Not added unless checked.</p>`;
  hwSection.appendChild(g6DockWrap);

  const polarFilterWrap = document.createElement("div");
  polarFilterWrap.id = "polarFilterWrap";
  polarFilterWrap.className = "hidden mt-2";
  polarFilterWrap.innerHTML = `
    <label class="flex items-center gap-2 text-sm">
      <input id="polarFilterOpt" type="checkbox" class="border">
      <span>Optional polarized filter (875K9AA) — $181</span>
    </label>
    <p class="text-xs text-gray-600 ml-6">For E70, X72, and V72. Cuts window glare on the camera lens. Not added unless checked.</p>`;
  hwSection.appendChild(polarFilterWrap);
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

  const lensProWrap = document.createElement("div");
  lensProWrap.className = "mt-2 space-y-2";
  lensProWrap.innerHTML = `
    <label class="inline-flex items-start gap-2">
      <input id="lensProRooms" type="checkbox" class="border mt-1">
      <span>
        <span class="font-medium">1 Year Lens Pro for Rooms</span>
        <span class="block text-xs text-gray-600">Check the box, then pick a room band. 1–65 rooms ($99) is selected by default.</span>
      </span>
    </label>`;
  const lensProBandSel = select("lensProBand", "Lens Pro room band", [
    { value: "UJ8T6LN", label: "1–65 rooms — UJ8T6LN — $99" },
    { value: "UJ8T5LN", label: "66–250 rooms — UJ8T5LN — $79" },
    { value: "UJ8T4LN", label: "251+ rooms — UJ8T4LN — $59" }
  ], false);
  lensProBandSel.classList.add("hidden", "ml-6");
  lensProWrap.appendChild(lensProBandSel);
  lensProWrap.querySelector("#lensProRooms").addEventListener("change", () => {
    const on = document.getElementById("lensProRooms").checked;
    lensProBandSel.classList.toggle("hidden", !on);
  });
  svcSection.appendChild(lensProWrap);

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
  let lastBom = null;
  let lastAudioBom = null;
  let lastHeadsetBom = null;

  const MOCK_BANNER = `
    <div class="p-3 border-2 border-amber-400 rounded bg-amber-50 space-y-1">
      <div class="font-semibold text-amber-900">Under construction. Mock catalog only — a few popular SKUs so you can click through. Support SKU mapping is not loaded yet. Do not use for a live quote.</div>
    </div>`;
  const AUDIO_BANNER = `
    <div class="p-3 border border-blue-200 rounded bg-blue-50 space-y-1">
      <div class="text-sm text-blue-950">Audio is live from the Aug 2026 HP Poly Collab Reference (Voice-Desk&amp;Conf Phone). Headsets remain under construction.</div>
    </div>`;
  const SUPPORT_OPTS = [
    { value: "",         label: "None" },
    { value: "poly1",    label: "1yr - Poly+" },
    { value: "poly3",    label: "3yr - Poly+" },
    { value: "poly5",    label: "5yr - Poly+" },
    { value: "analyze1", label: "1yr - Poly+ Analyze" },
    { value: "analyze3", label: "3yr - Poly+ Analyze" },
    { value: "analyze5", label: "5yr - Poly+ Analyze" }
  ];

  const panelVideo = document.createElement("div");
  panelVideo.id = "panelVideo";
  const panelAudio = document.createElement("div");
  panelAudio.id = "panelAudio";
  panelAudio.className = "hidden space-y-4";
  const panelHeadset = document.createElement("div");
  panelHeadset.id = "panelHeadset";
  panelHeadset.className = "hidden space-y-4";

  const audioForm = document.createElement("form");
  audioForm.className = "space-y-4";
  audioForm.innerHTML = AUDIO_BANNER;
  const audioSection = document.createElement("fieldset");
  audioSection.className = "space-y-3 p-4 border border-gray-200 rounded";
  audioSection.innerHTML = '<legend class="font-semibold px-1">Audio</legend>';
  audioSection.appendChild(select("audioPlatform", "Platform", ["Microsoft Teams", "Zoom", "OpenSIP"], true));
  audioSection.appendChild(select("audioFamily", "Family", ["Trio", "CCX", "Edge E", "Rove"], true));
  audioSection.appendChild(select("audioModel", "Model", [], true));
  const audioNote = document.createElement("p");
  audioNote.id = "audioPlatformNote";
  audioNote.className = "text-sm text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded hidden";
  audioSection.appendChild(audioNote);
  const audioRadioWrap = document.createElement("div");
  audioRadioWrap.className = "space-y-1";
  audioRadioWrap.innerHTML = `
    <p class="text-xs text-gray-600">Wi-Fi and Bluetooth are included radios on these SKUs and do not add extra lines.</p>
    <label class="inline-flex items-center gap-2"><input id="audioWifi" type="checkbox" class="border" checked><span>Wi-Fi</span></label>
    <label class="inline-flex items-center gap-2 ml-4"><input id="audioBt" type="checkbox" class="border" checked><span>Bluetooth</span></label>`;
  audioSection.appendChild(audioRadioWrap);
  const audioAccWrap = document.createElement("div");
  audioAccWrap.id = "audioAccWrap";
  audioAccWrap.className = "space-y-1";
  audioAccWrap.innerHTML = `
    <label id="audioExpWrap" class="hidden flex items-center gap-2 text-sm"><input id="audioExpMics" type="checkbox" class="border"><span id="audioExpLabel">Include expansion mics</span></label>
    <label id="audioEmWrap" class="hidden flex items-center gap-2 text-sm"><input id="audioEm" type="checkbox" class="border"><span id="audioEmLabel">Include expansion module</span></label>
    <label id="audioPsuWrap" class="hidden flex items-center gap-2 text-sm"><input id="audioPsu" type="checkbox" class="border"><span id="audioPsuLabel">Include power supply (if no PoE)</span></label>`;
  audioSection.appendChild(audioAccWrap);
  audioSection.appendChild(select("audioSupportTerm", "Select Support term", SUPPORT_OPTS));
  audioForm.appendChild(audioSection);
  const audioActions = document.createElement("div");
  audioActions.className = "flex flex-wrap items-center gap-x-6 gap-y-3 pt-1";
  audioActions.innerHTML = `
    <label class="inline-flex items-center gap-2 shrink-0 whitespace-nowrap"><input id="audioIncludePrices" type="checkbox" class="border"> Include Prices (MSRP)</label>
    <button type="button" id="audioGenerateBtn" class="px-4 py-2 bg-blue-600 text-white rounded shrink-0">Generate BOM</button>`;
  audioForm.appendChild(audioActions);
  const audioResult = document.createElement("div");
  audioResult.id = "audioResult";
  audioResult.className = "mt-6 space-y-4";
  panelAudio.appendChild(audioForm);
  panelAudio.appendChild(audioResult);

  const headsetForm = document.createElement("form");
  headsetForm.className = "space-y-4";
  headsetForm.innerHTML = MOCK_BANNER;
  const headsetSection = document.createElement("fieldset");
  headsetSection.className = "space-y-3 p-4 border border-gray-200 rounded";
  headsetSection.innerHTML = '<legend class="font-semibold px-1">Headsets (mock)</legend>';
  headsetSection.appendChild(select("headsetPlatform", "Platform", ["Microsoft Teams", "Zoom", "OpenSIP"], true));
  headsetSection.appendChild(select("headsetConn", "Connectivity", ["Wire", "Bluetooth", "DECT"], true));
  headsetSection.appendChild(select("headsetWear", "Wearing style", ["Over-ear", "On-ear", "In-ear"]));
  headsetSection.appendChild(select("headsetPrice", "Price range", ["Under $200", "$200–300", "$300+"]));
  headsetSection.appendChild(select("headsetSupportTerm", "Select Support term", SUPPORT_OPTS));
  headsetForm.appendChild(headsetSection);
  const headsetActions = document.createElement("div");
  headsetActions.className = "flex flex-wrap items-center gap-x-6 gap-y-3 pt-1";
  headsetActions.innerHTML = `
    <label class="inline-flex items-center gap-2 shrink-0 whitespace-nowrap"><input id="headsetIncludePrices" type="checkbox" class="border"> Include Prices (MSRP)</label>
    <button type="button" id="headsetGenerateBtn" class="px-4 py-2 bg-blue-600 text-white rounded shrink-0">Generate BOM</button>`;
  headsetForm.appendChild(headsetActions);
  const headsetResult = document.createElement("div");
  headsetResult.id = "headsetResult";
  headsetResult.className = "mt-6 space-y-4";
  panelHeadset.appendChild(headsetForm);
  panelHeadset.appendChild(headsetResult);

  panelVideo.appendChild(form);
  panelVideo.appendChild(resultDiv);
  app.appendChild(panelVideo);
  app.appendChild(panelAudio);
  app.appendChild(panelHeadset);

  // Single compact legalese at bottom of page only
  const legalFooter = document.createElement("p");
  legalFooter.className = "mt-6 text-[11px] text-gray-500 border-t border-gray-300 pt-2 leading-snug";
  legalFooter.innerHTML = `<strong>Estimate only.</strong> Subject to change. Confirm SKUs, pricing &amp; support with your HP Poly and distributor reps.<br>Created with AI tools that seem to have a track record of accuracy, but please be aware that I could make mistakes.`;
  app.appendChild(legalFooter);

  function setActiveTab(name) {
    panelVideo.classList.toggle("hidden", name !== "video");
    panelAudio.classList.toggle("hidden", name !== "audio");
    panelHeadset.classList.toggle("hidden", name !== "headset");
    [["tabVideo", "video"], ["tabAudio", "audio"], ["tabHeadset", "headset"]].forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle("opacity-100", name === key);
      el.classList.toggle("opacity-30", name !== key);
      el.classList.add("text-gray-900");
    });
  }
  document.getElementById("tabBar")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    setActiveTab(btn.getAttribute("data-panel"));
  });

  const AUDIO_CATALOG = {
    Trio: {
      C60:  { teams: "849B6AA#ABA", sip: "849B4AA#ABA", support: "trio_c60",  exp: "85X02AA", psu: "85X03AA#ABA" },
      "8300": { teams: null, sip: "849A0AA#AC3", support: "trio_8300", exp: "85X00AA", psu: "85W92AA#ABA",
        teamsNote: "Trio 8300 is OpenSIP only (not native Teams). BOM uses the OpenSIP SKU." }
    },
    CCX: {
      "350": { teams: "848Z7AA#AC3", sip: null, support: "ccx_350", em: "8F3R9AA", psu: "86H66AA#ABA",
        sipNote: "CCX 350 is Teams-native only — no OpenSIP/Zoom SKU on the Voice sheet." },
      "400": { teams: "848Z8AA#AC3", sip: "849A1AA#AC3", support: "ccx_400", em: "8F3R9AA" },
      "505": { teams: "82Z79AA", sip: "82Z82AA", support: "ccx_505", em: "8F3R9AA", psu: "86P04AA#ABA" },
      "600": { teams: "82Z84AA", sip: "82Z85AA", support: "ccx_600", em: "8F3R9AA", psu: "86P04AA#ABA" }
    },
    "Edge E": {
      E100: { sip: "82M86AA", support: "edge_e100", psu: "86H66AA#ABA", em: "85W93AA" },
      E220: { sip: "82M87AA", support: "edge_e220", psu: "86H66AA#ABA", em: "85W93AA" },
      E300: { sip: "82M92AA", support: "edge_e300", psu: "86H66AA#ABA", em: "85W93AA" },
      E320: { sip: "82M88AA", support: "edge_e320", psu: "86H66AA#ABA", em: "85W93AA" },
      E350: { sip: "82M89AA", support: "edge_e350", psu: "86H66AA#ABA", em: "85W93AA" },
      E400: { sip: "82M93AA", support: "edge_e400", psu: "86H66AA#ABA", em: "85W93AA" },
      E450: { sip: "82M90AA", support: "edge_e450", psu: "86H66AA#ABA", em: "85W93AA" },
      E550: { sip: "82M91AA", support: "edge_e550", psu: "86P04AA#ABA", em: "85W93AA" }
    },
    Rove: {
      "20": { sip: "8F3E4AA#ABA", support: "rove_20" },
      "30": { sip: "84H76AA#ABA", support: "rove_30" },
      "40": { sip: "84H77AA#ABA", support: "rove_40" },
      B2: { sip: "84H80AA#ABA", support: "rove_b2" },
      B4: { sip: "84H78AA#ABA", support: "rove_b4" },
      R8: { sip: "84H79AA#ABA", support: "rove_r8" },
      "20 + B1 kit": { sip: "8F3E1AA#ABA", support: "rove_20_b1" }
    }
  };
  function audioCfg() {
    const family = document.getElementById("audioFamily")?.value || "";
    const model = document.getElementById("audioModel")?.value || "";
    return (AUDIO_CATALOG[family] || {})[model] || null;
  }
  function updateAudioNotesAndAcc() {
    const platform = document.getElementById("audioPlatform")?.value || "";
    const family = document.getElementById("audioFamily")?.value || "";
    const cfg = audioCfg();
    const note = document.getElementById("audioPlatformNote");
    const isTeams = platform === "Microsoft Teams";
    const isSip = platform === "Zoom" || platform === "OpenSIP";
    let msg = "";
    if (cfg) {
      if (family === "Edge E" && isTeams) {
        msg = "No Edge E native Teams SKU. Edge E is OpenSIP only — basic Teams calling via MS SIP Gateway. BOM uses the OpenSIP SKU.";
      } else if (cfg.teamsNote && isTeams) {
        msg = cfg.teamsNote;
      } else if (cfg.sipNote && isSip) {
        msg = cfg.sipNote;
      } else if (family === "CCX" && isSip) {
        msg = "No Zoom-branded CCX SKU. Zoom Phone uses the OpenSIP/SIP SKU.";
      } else if (family === "Rove" && isTeams) {
        msg = "Rove DECT is OpenSIP (not native Teams). BOM uses the OpenSIP SKU.";
      }
    }
    if (note) {
      note.textContent = msg;
      note.classList.toggle("hidden", !msg);
    }
    const expWrap = document.getElementById("audioExpWrap");
    const emWrap = document.getElementById("audioEmWrap");
    const psuWrap = document.getElementById("audioPsuWrap");
    const expLabel = document.getElementById("audioExpLabel");
    const emLabel = document.getElementById("audioEmLabel");
    const psuLabel = document.getElementById("audioPsuLabel");
    if (expWrap) {
      const show = !!(cfg && cfg.exp);
      expWrap.classList.toggle("hidden", !show);
      if (expLabel && show) {
        const item = getItem(cfg.exp);
        const price = item && item.msrp != null ? " — $" + item.msrp : "";
        expLabel.textContent = "Include expansion mics (" + cfg.exp + ")" + price;
      }
      if (!show) {
        const cb = document.getElementById("audioExpMics");
        if (cb) cb.checked = false;
      }
    }
    if (emWrap) {
      const show = !!(cfg && cfg.em);
      emWrap.classList.toggle("hidden", !show);
      if (emLabel && show) {
        const item = getItem(cfg.em);
        const price = item && item.msrp != null ? " — $" + item.msrp : "";
        emLabel.textContent = "Include expansion module (" + cfg.em + ")" + price;
      }
      if (!show) {
        const cb = document.getElementById("audioEm");
        if (cb) cb.checked = false;
      }
    }
    if (psuWrap) {
      const show = !!(cfg && cfg.psu);
      psuWrap.classList.toggle("hidden", !show);
      if (psuLabel && show) {
        const item = getItem(cfg.psu);
        const price = item && item.msrp != null ? " — $" + item.msrp : "";
        psuLabel.textContent = "Include power supply if no PoE (" + cfg.psu + ")" + price;
      }
      if (!show) {
        const cb = document.getElementById("audioPsu");
        if (cb) cb.checked = false;
      }
    }
  }
  function rebuildAudioModel() {
    const family = document.getElementById("audioFamily")?.value || "";
    const sel = document.getElementById("audioModel");
    if (!sel) return;
    const prev = sel.value;
    const models = Object.keys(AUDIO_CATALOG[family] || {});
    sel.innerHTML = '<option value="">--</option>' + models.map(m => `<option value="${m}">${m}</option>`).join("");
    sel.value = models.includes(prev) ? prev : "";
    updateAudioNotesAndAcc();
  }
  document.getElementById("audioFamily")?.addEventListener("change", rebuildAudioModel);
  document.getElementById("audioModel")?.addEventListener("change", updateAudioNotesAndAcc);
  document.getElementById("audioPlatform")?.addEventListener("change", updateAudioNotesAndAcc);
  rebuildAudioModel();

  // ---------- dynamic UI helpers ----------
  // Max A2 table mics per host (HP Poly Studio A2 admin guide)
  // V12: 1 | X32: 2 | X52/V52: 4 | X72/V72: 4 | G62: 8
  function a2MaxForSelection() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    const r = document.getElementById("roomSize")?.value || "";
    const isUSB = (t === "BYOD USB Bar only" || t === "Windows PC based solution");
    if (r === "Very large") return isUSB ? 4 : 8; // V72 vs G62
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
      else if (r === "Very large") host = isUSB ? "V72 (max 4)" : "G62 (max 8)";
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
  function qsgLink(href, label) {
    if (!href) return "";
    return `<a target="_blank" rel="noopener" class="text-blue-700 underline" href="${href}">${label}</a>`;
  }
  function refreshMountHint() {
    const hint = document.getElementById("mountingHint");
    const sel = document.getElementById("mounting");
    if (!hint || !sel) return;
    const family = hostFamily();
    const choice = sel.value || "None";
    const usb = family === "v12" || family === "v52" || family === "v72";
    let included = "";
    let qsg = "";
    if (family === "v12" || family === "x32") {
      included = (usb ? "V12" : "X32") + " includes a display clamp in the box. Wall/VESA kit, table stand, and inverted wall are sold separately.";
      if (choice === "Wall") qsg = qsgLink("https://media.dustin.eu/media/d2000010011101422/poly-studio-x30-vesa-display-mount-wall-mount-quick-start-guide.pdf", "X30/X32/V12 wall + VESA kit setup sheet (PDF)");
      else if (choice === "Table" || choice === "Inverted wall" || choice === "None") qsg = qsgLink("https://docs.poly.com/bundle/studio-x-ug/page/poly-studio-x-hardware-installation.html", "X32/V12 hardware install (included display clamp)");
    } else if (family === "v52" || family === "x52") {
      included = (usb ? "V52" : "X52") + " includes a display clamp and a wall mount in the box. VESA and table stand are sold separately.";
      if (choice === "Wall") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9580259_en-US-1.pdf", "X52/V52 wall mount quick start (PDF)");
      else if (choice === "VESA style display mount") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9580398_en-US-1.pdf", "X52/V52 VESA mount quick start (PDF)");
      else if (choice === "Table") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9580389_en-US-1.pdf", "X52/V52 table stand quick start (PDF)");
      else qsg = qsgLink("https://h30434.www3.hp.com/t5/Poly-Video-Conferencing-Knowledge-Base/Poly-Studio-X52-V52-Accessories-Quick-Start-Guide/ta-p/9119238", "X52/V52 accessories quick starts (clamp, wall, VESA, stand)");
    } else if (family === "v72" || family === "x72") {
      included = (usb ? "V72" : "X72") + " includes a wall mount in the box. No extra wall SKU. VESA and table stand are sold separately.";
      if (usb) qsg = qsgLink("https://docs.poly.com/bundle/poly-studio-v72-ug-current/page/mounting-the-poly-studio-v72.html", "V72 mounting guide (included wall mount)");
      else qsg = qsgLink("https://docs.poly.com/bundle/studio-x72-ug/page/poly-studio-x-hardware-installation.html", "X72 hardware install (included wall mount)");
    } else if (family === "g62") {
      included = "G62 commercial kit includes the mount; no extra bar-mount SKU is added.";
    }
    hint.innerHTML = included + (qsg ? "<br>Quick start: " + qsg : "");
  }
  function refreshCameraMountHint() {
    const hint = document.getElementById("cameraMountHint");
    const sel = document.getElementById("cameraMount");
    const cam = document.getElementById("cameraChoice")?.value || "None";
    if (!hint) return;
    const choice = sel ? (sel.value || "None") : "None";
    let included = "";
    let qsg = "";
    if (cam === "E70") {
      included = "E70 includes a display clamp and a wall mount in the box. VESA kit is sold separately.";
      if (choice === "Clamp") qsg = qsgLink("https://cdn.cs.1worldsync.com/f2/f6/f2f666a4-534d-4221-9882-367ac6606549.pdf", "E70 display clamp quick start (PDF)");
      else qsg = qsgLink("https://cdn.cs.1worldsync.com/f2/f6/f2f666a4-534d-4221-9882-367ac6606549.pdf", "E70 display clamp quick start (PDF)");
    } else if (cam === "E60") {
      included = "E60 includes a wall mount in the box. Ceiling and HDCI brackets are sold separately.";
      qsg = qsgLink("https://h30434.www3.hp.com/t5/Poly-Video-Conferencing-Knowledge-Base/How-to-unbox-and-set-up-the-Poly-Studio-E60/ta-p/9223557", "E60 unbox and setup (included wall mount)");
    }
    hint.innerHTML = included + (qsg ? "<br>Quick start: " + qsg : "");
  }
  function updateMountingOptions() {
    const wrap = document.getElementById("mountingWrap");
    const sel = document.getElementById("mounting");
    if (!wrap || !sel) return;
    const family = hostFamily();
    const prev = sel.value || "None";
    if (!family || family === "g62") {
      wrap.classList.add("hidden");
      sel.innerHTML = `<option value="None">None</option>`;
      sel.value = "None";
      refreshMountHint();
      return;
    }
    wrap.classList.remove("hidden");
    const opts = [{ value: "None", label: "None — use in-box mount" }];
    if (family === "v12" || family === "x32") {
      opts.push({ value: "Wall", label: "Wall / VESA kit (875L6AA)" });
      opts.push({ value: "Table", label: "Table stand (875L5AA)" });
      opts.push({ value: "Inverted wall", label: "Inverted wall (875L7AA)" });
    } else if (family === "v52" || family === "x52") {
      opts.push({ value: "Wall", label: "Wall (875L8AA) — spare / extra" });
      opts.push({ value: "VESA style display mount", label: "VESA (875L9AA)" });
      opts.push({ value: "Table", label: "Table stand (875M0AA)" });
    } else if (family === "v72" || family === "x72") {
      opts.push({ value: "VESA style display mount", label: "VESA (875L2AA)" });
      opts.push({ value: "Table", label: "Table stand (875L3AA)" });
    }
    sel.innerHTML = opts.map(o => `<option value="${o.value}">${o.label}</option>`).join("");
    sel.value = opts.some(o => o.value === prev) ? prev : "None";
    refreshMountHint();
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
  function extraIpPeripheralSelected() {
    const exp = document.getElementById("expansionMic")?.value || "";
    const cam = document.getElementById("cameraChoice")?.value || "None";
    const ipMic = exp.includes("New White A2") || exp.includes("New Black A2")
      || exp.includes("Existing IP table") || exp.includes("Existing IP Ceiling");
    const extraCam = canShowCameraAddOn() && (cam === "E60" || cam === "E70");
    return ipMic || extraCam;
  }
  function updateNetgearVisibility() {
    const wrap = document.getElementById("netgearWrap");
    if (!wrap) return;
    const family = hostFamily();
    const hostOk = family === "g62" || family === "x32" || family === "x52"
      || family === "v52" || family === "x72" || family === "v72";
    const show = !!(hostOk && extraIpPeripheralSelected());
    wrap.classList.toggle("hidden", !show);
    if (!show) {
      const sel = document.getElementById("netgearSwitch");
      if (sel) sel.value = "None";
    }
  }
  function updateG6DockVisibility() {
    const wrap = document.getElementById("g6DockWrap");
    if (!wrap) return;
    const t = document.getElementById("typeOfSystem")?.value || "";
    const show = t === "Windows PC based solution";
    wrap.classList.toggle("hidden", !show);
    if (!show) {
      const cb = document.getElementById("g6DockOpt");
      if (cb) cb.checked = false;
    }
  }
  function updatePolarFilterVisibility() {
    const wrap = document.getElementById("polarFilterWrap");
    if (!wrap) return;
    const family = hostFamily();
    const cam = document.getElementById("cameraChoice")?.value || "None";
    const show = family === "x72" || family === "v72" || cam === "E70";
    wrap.classList.toggle("hidden", !show);
    if (!show) {
      const cb = document.getElementById("polarFilterOpt");
      if (cb) cb.checked = false;
    }
  }
  function refreshDependentControls() {
    updatePlatformVisibility();
    updateMountingOptions();
    updateExpansionOptions();
    updateCameraVisibility();
    updateA2QtyVisibility();
    updateNetgearVisibility();
    updateG6DockVisibility();
    updatePolarFilterVisibility();
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
    const wallLabel = document.getElementById("camPowerWallLabel");
    if (wallLabel) {
      if (cam === "E60") wallLabel.textContent = "E60 wall power accessory (9W1A9AA) — $25.65";
      else if (cam === "E70") wallLabel.textContent = "E70 wall / external PSU (875K6AA) — $162";
    }

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
        refreshCameraMountHint();
      } else if (cam === "E60") {
        if (getItem("9W1A8AA#AC3") || getItem("9W1A8AA")) {
          mountSel.innerHTML += `<option value="Ceiling">Ceiling mount (9W1A8AA#AC3)</option>`;
          mountOptions++;
        }
        if (getItem("89L88AA")) {
          mountSel.innerHTML += `<option value="HDCI">HDCI camera bracket (89L88AA)</option>`;
          mountOptions++;
        }
        refreshCameraMountHint();
      } else {
        if (hint) hint.textContent = "";
      }
      if ([...mountSel.options].some(o => o.value === prev)) mountSel.value = prev;
      else mountSel.value = "None";
      if (cam === "E70" || cam === "E60") refreshCameraMountHint();
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
  document.getElementById("cameraChoice")?.addEventListener("change", () => {
    updateCameraAccessoryVisibility();
    updateNetgearVisibility();
    updatePolarFilterVisibility();
  });
  document.getElementById("expansionMic")?.addEventListener("change", () => {
    updateA2QtyVisibility();
    updateNetgearVisibility();
  });
  document.getElementById("mounting")?.addEventListener("change", refreshMountHint);
  document.getElementById("cameraMount")?.addEventListener("change", refreshCameraMountHint);
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
      updateNetgearVisibility();
      generate();
      const res = document.getElementById("result");
      if (res) res.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderBom(focusIdx, caretPos, dest, bom) {
    dest = dest || resultDiv;
    bom = bom || lastBom;
    if (!bom) return;
    const { results, includePrices, googleMeetNote } = bom;
    const EXCEL_URL = "https://hpdigitalroom.sales.ext.hp.com/ls/220d4a87-7110-4c75-83aa-53af74106f7b/Yv7NSgCbYloyQ79p";
    const SPACES_URL = "https://www.hp.com/us-en/poly/spaces.html";
    const DIM_URL = "https://h30434.www3.hp.com/t5/Meeting-Room-Solutions/Dimensional-Drawings-for-Poly-Products-and-accessories/td-p/8738366";
    let html = `<p class="text-xs text-gray-500 mb-1">Build ${VERSION} — generated ${new Date().toLocaleDateString()}</p>`;
    html += `<p class="text-sm italic text-gray-600 mb-2">Disclaimer: Created with AI tools that seem to have a track record of accuracy, but please be aware that I could make mistakes.</p>`;
    html += `<p class="text-sm mb-1"><a class="text-blue-600 underline" target="_blank" rel="noopener" href="${EXCEL_URL}">Quoting Guide</a>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a class="text-blue-600 underline" target="_blank" rel="noopener" href="${SPACES_URL}">Poly Spaces</a></p>`;
    html += `<p class="text-sm mb-3"><a class="text-blue-600 underline" target="_blank" rel="noopener" href="${EXCEL_URL}">Glen Bevcar's Collab Reference Excel cheat sheet</a>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a class="text-blue-600 underline" target="_blank" rel="noopener" href="${DIM_URL}">Dimensional Drawings for Poly Products</a></p>`;
    html += `<h2 class="font-semibold mb-2">Your BOM:</h2>`;
    if (googleMeetNote) {
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

    results.forEach((r, i) => {
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
        <td class="border px-4 py-2">
          <div class="inline-flex items-center gap-1">
            <button type="button" data-qty-delta="-1" data-i="${i}" class="qty-btn px-2 py-0.5 border rounded leading-none bg-gray-50 hover:bg-gray-100" aria-label="Decrease quantity">−</button>
            <input type="number" min="0" step="1" data-i="${i}" class="qty-input w-16 border rounded px-2 py-1 text-center" value="${qty}">
            <button type="button" data-qty-delta="1" data-i="${i}" class="qty-btn px-2 py-0.5 border rounded leading-none bg-gray-50 hover:bg-gray-100" aria-label="Increase quantity">+</button>
          </div>
        </td>
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


    if (bom.footnote) {
      html += `<p class="text-xs text-amber-800 mt-2">${bom.footnote}</p>`;
    }
    if (bom.closestNote) {
      html += `<p class="text-xs text-gray-600 mt-2">${bom.closestNote}</p>`;
    }

    dest.innerHTML = html;
    if (focusIdx != null) {
      const el = dest.querySelector(`.qty-input[data-i="${focusIdx}"]`);
      if (el) {
        el.focus();
        const pos = (caretPos != null && caretPos >= 0) ? Math.min(caretPos, String(el.value).length) : String(el.value).length;
        try { el.setSelectionRange(pos, pos); } catch (e) { el.select(); }
      }
    }
  }

  function applyQty(i, n, restoreFocus, caretPos, dest, bom) {
    dest = dest || resultDiv;
    bom = bom || lastBom;
    if (!bom || !bom.results[i]) return;
    bom.results[i].quantity = n;
    renderBom(restoreFocus ? i : undefined, restoreFocus ? caretPos : undefined, dest, bom);
  }

  function bindQtyHandlers(dest, getBom) {
    dest.addEventListener("click", (e) => {
      const btn = e.target.closest(".qty-btn");
      if (!btn || !dest.contains(btn)) return;
      const i = Number(btn.getAttribute("data-i"));
      const delta = Number(btn.getAttribute("data-qty-delta"));
      const bom = getBom();
      if (!bom || !bom.results[i]) return;
      const current = Number(bom.results[i].quantity) || 0;
      applyQty(i, Math.max(0, current + delta), false, undefined, dest, bom);
    });
    dest.addEventListener("input", (e) => {
      if (!e.target.classList.contains("qty-input")) return;
      const i = Number(e.target.getAttribute("data-i"));
      const n = parseInt(e.target.value, 10);
      if (Number.isNaN(n)) return;
      const caret = (typeof e.target.selectionStart === "number") ? e.target.selectionStart : String(e.target.value).length;
      applyQty(i, Math.max(0, n), true, caret, dest, getBom());
    });
    dest.addEventListener("change", (e) => {
      if (!e.target.classList.contains("qty-input")) return;
      const i = Number(e.target.getAttribute("data-i"));
      const n = parseInt(e.target.value, 10);
      if (Number.isNaN(n)) return;
      const caret = (typeof e.target.selectionStart === "number") ? e.target.selectionStart : String(e.target.value).length;
      applyQty(i, Math.max(0, n), true, caret, dest, getBom());
    });
  }
  bindQtyHandlers(audioResult, () => lastAudioBom);
  bindQtyHandlers(headsetResult, () => lastHeadsetBom);

  resultDiv.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn || !resultDiv.contains(btn)) return;
    const i = Number(btn.getAttribute("data-i"));
    const delta = Number(btn.getAttribute("data-qty-delta"));
    if (!lastBom || !lastBom.results[i]) return;
    const current = Number(lastBom.results[i].quantity) || 0;
    applyQty(i, Math.max(0, current + delta));
  });

  function handleQtyInputEvent(el, restoreFocus) {
    const i = Number(el.getAttribute("data-i"));
    const n = parseInt(el.value, 10);
    if (Number.isNaN(n)) return;
    const caret = (typeof el.selectionStart === "number") ? el.selectionStart : String(el.value).length;
    applyQty(i, Math.max(0, n), restoreFocus, caret);
  }

  resultDiv.addEventListener("input", (e) => {
    if (!e.target.classList.contains("qty-input")) return;
    handleQtyInputEvent(e.target, true);
  });
  resultDiv.addEventListener("change", (e) => {
    if (!e.target.classList.contains("qty-input")) return;
    handleQtyInputEvent(e.target, true);
  });

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
          } else if (platform === "Zoom") {
            // No TAA Zoom room PC in catalog — TC10 only, do not invent a compute SKU
            addLine(results, tc10Sku());
            addSupport(results, "tc10", supportTerm);
          }
          // Google Meet: USB bar only (no room PC or TC10)
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
        const a2Qty = Math.max(1, Math.min(a2MaxForSelection(), parseInt(document.getElementById("a2Qty")?.value || "1", 10) || 1));
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
          const wantWall = !!document.getElementById("camPowerWall")?.checked;
          const wantPoePP = !!document.getElementById("camPowerPoePP")?.checked;
          const camMount = document.getElementById("cameraMount")?.value || "None";
          if (cam === "E60") {
            addLine(results, "9W1A7AA"); // E60 TAA
            addSupport(results, "e60", supportTerm);
            if (wantWall && !hasSku(results, "9W1A9AA#ABA") && !hasSku(results, "9W1A9AA")) {
              addLine(results, "9W1A9AA#ABA", "Poly Studio E60 Power Accessory (wall power supply)");
            }
            if (wantPoePP) addLine(results, "B5NH6AA");
            if (camMount === "Ceiling" && !hasSku(results, "9W1A8AA#AC3") && !hasSku(results, "9W1A8AA")) {
              addLine(results, "9W1A8AA#AC3", "Poly Studio E60 Ceiling Mount");
            }
            if (camMount === "HDCI" && !hasSku(results, "89L88AA")) {
              addLine(results, "89L88AA", "Poly Studio E60 EagleEye IV HDCI Camera Mounting Bracket");
            }
          } else if (cam === "E70") {
            addLine(results, pick("886C9AA", "886C8AA")); // E70 TAA JITC / TAA
            addSupport(results, "e70", supportTerm);
            if (wantWall && !hasSku(results, "875K6AA")) {
              addLine(results, "875K6AA", "Poly E70 wall / external power supply (12V 5A)");
            }
            if (wantPoePP) addLine(results, "B5NH6AA");
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
        const wantWall = !!document.getElementById("camPowerWall")?.checked;
        const wantPoePP = !!document.getElementById("camPowerPoePP")?.checked;
        const camMount = document.getElementById("cameraMount")?.value || "None";
        if (cam === "E70") {
          if (!hasSku(results, "842F8AA")) addLine(results, "842F8AA");
          addSupport(results, "e70", supportTerm);
          if (wantWall && !hasSku(results, "875K6AA")) {
            addLine(results, "875K6AA", "Poly E70 wall / external power supply (12V 5A)");
          }
          if (wantPoePP) addLine(results, "B5NH6AA");
          if (camMount === "VESA" && !hasSku(results, "875K7AA")) {
            addLine(results, "875K7AA", "Poly Studio E70 VESA Mounting Kit");
          }
          if (camMount === "Clamp" && !hasSku(results, "875K8AA")) {
            addLine(results, "875K8AA", "E70 display clamp");
          }
        } else if (cam === "E60") {
          if (!hasSku(results, "9W1A6AA#AC3")) addLine(results, "9W1A6AA#AC3");
          addSupport(results, "e60", supportTerm);
          if (wantWall && !hasSku(results, "9W1A9AA#ABA") && !hasSku(results, "9W1A9AA")) {
            addLine(results, "9W1A9AA", "Poly Studio E60 Power Accessory");
          }
          if (wantPoePP) addLine(results, "B5NH6AA");
          if (camMount === "Ceiling" && !hasSku(results, "9W1A8AA#AC3") && !hasSku(results, "9W1A8AA")) {
            addLine(results, "9W1A8AA#AC3", "Poly Studio E60 Ceiling Mount");
          }
          if (camMount === "HDCI" && !hasSku(results, "89L88AA")) {
            addLine(results, "89L88AA", "Poly Studio E60 EagleEye IV HDCI Camera Mounting Bracket");
          }
        }
      }

      // A2 mics (commercial)
      {
        const wantsA2White = (expansionMic || "").includes("New White A2");
        const wantsA2Black = (expansionMic || "").includes("New Black A2");
        if (wantsA2White || wantsA2Black) {
          const a2Qty = Math.max(1, Math.min(a2MaxForSelection(), parseInt(document.getElementById("a2Qty")?.value || "1", 10) || 1));
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
        else if (mounting === "Inverted wall") addLine(results, "875L7AA");
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
      if (implHelp === "Onsite Implementation help") {
        addLine(results, "PROSMTHND04");
        // Extra peripherals only: base host is already in the onsite install.
        // One PROADDON004 per camera and per A2 mic pod (not the A2 bridge).
        const cameraSkus = ["842F8AA", "9W1A6AA#AC3", "9W1A7AA", "886C9AA", "886C8AA"];
        const a2PodSkus = ["B22X4AA#AC3", "B22X6AA#AC3", "B22X5AA", "B22X7AA"];
        const extra = results
          .filter(x => cameraSkus.includes(x.sku) || a2PodSkus.includes(x.sku))
          .reduce((n, x) => n + (x.quantity || 1), 0);
        if (extra > 0) addLine(results, "PROADDON004", "Poly Remote install one additional peripheral", extra);
      }
    }

    // Free-form accessories
    accessories.forEach(sku => addLine(results, sku, sku));

    if (document.getElementById("lensProRooms")?.checked) {
      const sku = document.getElementById("lensProBand")?.value || "UJ8T6LN";
      addLine(results, sku, "Poly Lens Pro for Rooms 1 Year", 1);
    }

    const netgearSku = document.getElementById("netgearSwitch")?.value || "";
    if (netgearSku && netgearSku.startsWith("GSM")) {
      addLine(results, netgearSku);
    }

    const polarWrap = document.getElementById("polarFilterWrap");
    const polarOn = document.getElementById("polarFilterOpt")?.checked;
    if (polarOn && polarWrap && !polarWrap.classList.contains("hidden")) {
      addLine(results, "875K9AA", "Poly Studio E70/X70/X72/V72 Polarized Filter", 1);
    }

    const g6Wrap = document.getElementById("g6DockWrap");
    const g6On = document.getElementById("g6DockOpt")?.checked;
    if (g6On && g6Wrap && !g6Wrap.classList.contains("hidden") && typeOfSystem === "Windows PC based solution") {
      addLine(results, "9X481UT#ABA", "HP Thunderbolt 4 Ultra 180W G6 Dock", 1);
      addSupport(results, "g6_dock", supportTerm);
    }

    lastBom = {
      results,
      includePrices,
      googleMeetNote: !!(needsPlatform && platform === "Google Meet")
    };
    renderBom();
  }

  function mockError(el, msg) {
    el.innerHTML = `<div class="text-red-700 bg-red-50 border border-red-200 p-3 rounded">${msg}</div>`;
  }

  document.getElementById("audioGenerateBtn")?.addEventListener("click", () => {
    const platform = document.getElementById("audioPlatform")?.value || "";
    const family = document.getElementById("audioFamily")?.value || "";
    const model = document.getElementById("audioModel")?.value || "";
    const supportTerm = document.getElementById("audioSupportTerm")?.value || "";
    const includePrices = !!document.getElementById("audioIncludePrices")?.checked;
    const missing = [];
    if (!platform) missing.push("Platform");
    if (!family) missing.push("Family");
    if (!model) missing.push("Model");
    if (missing.length) {
      lastAudioBom = null;
      mockError(audioResult, "Please select " + missing.join(", ") + " to generate a BOM.");
      return;
    }
    const cfg = audioCfg();
    if (!cfg) {
      lastAudioBom = null;
      mockError(audioResult, "Unknown family/model combination.");
      return;
    }
    const isTeams = platform === "Microsoft Teams";
    const sku = isTeams ? (cfg.teams || cfg.sip) : (cfg.sip || cfg.teams);
    if (!sku) {
      lastAudioBom = null;
      mockError(audioResult, cfg.sipNote || cfg.teamsNote || "No SKU for this platform/model (not invented).");
      return;
    }
    const results = [];
    addLine(results, sku);
    addSupport(results, cfg.support, supportTerm);
    if (document.getElementById("audioExpMics")?.checked && cfg.exp) addLine(results, cfg.exp);
    if (document.getElementById("audioEm")?.checked && cfg.em) {
      addLine(results, cfg.em);
      if (family === "CCX") addSupport(results, "ccx_em60", supportTerm);
      if (family === "Edge E") addSupport(results, "edge_em", supportTerm);
    }
    if (document.getElementById("audioPsu")?.checked && cfg.psu) addLine(results, cfg.psu);
    const notes = [];
    if (family === "Edge E" && isTeams) {
      notes.push("Edge E has no native Teams SKU. OpenSIP SKU used (basic Teams calling via MS SIP Gateway).");
    }
    if (cfg.teamsNote && isTeams) notes.push(cfg.teamsNote);
    if (family === "CCX" && !isTeams) notes.push("No Zoom-branded CCX SKU; OpenSIP/SIP SKU used for Zoom Phone.");
    if (family === "Rove" && isTeams) notes.push("Rove DECT is OpenSIP (not native Teams).");
    const map = SUPPORT_MAP[cfg.support] || {};
    if (supportTerm && !map[supportTerm]) {
      notes.push("No " + supportTerm + " SKU mapped for this model (not invented).");
    }
    lastAudioBom = {
      results,
      includePrices,
      footnote: notes.length ? notes.join(" ") : null
    };
    renderBom(undefined, undefined, audioResult, lastAudioBom);
  });

  document.getElementById("headsetGenerateBtn")?.addEventListener("click", () => {
    const platform = document.getElementById("headsetPlatform")?.value || "";
    const conn = document.getElementById("headsetConn")?.value || "";
    const supportTerm = document.getElementById("headsetSupportTerm")?.value || "";
    const priceBand = document.getElementById("headsetPrice")?.value || "";
    const includePrices = !!document.getElementById("headsetIncludePrices")?.checked;
    const missing = [];
    if (!platform) missing.push("Platform");
    if (!conn) missing.push("Connectivity");
    if (missing.length) {
      lastHeadsetBom = null;
      mockError(headsetResult, "Please select " + missing.join(", ") + " to generate a BOM.");
      return;
    }
    let sku = null;
    if (conn === "Wire") sku = "8X223AA";
    else if (conn === "Bluetooth") sku = (platform === "Microsoft Teams") ? "77Y98AA" : "76U49AA";
    else if (conn === "DECT") sku = "77T33AA#ABA";
    const results = [];
    addLine(results, sku);
    let closestNote = null;
    const unit = results[0] && typeof results[0].msrp === "number" ? results[0].msrp : null;
    if (priceBand && unit != null) {
      const inBand = priceBand === "Under $200" ? unit < 200
        : priceBand === "$200–300" ? (unit >= 200 && unit <= 300)
        : priceBand === "$300+" ? unit > 300
        : true;
      if (!inBand) closestNote = "closest mock SKU in this catalog";
    }
    lastHeadsetBom = {
      results,
      includePrices,
      footnote: supportTerm ? "Phone/headset Poly+ SKUs not in this mock yet." : null,
      closestNote
    };
    renderBom(undefined, undefined, headsetResult, lastHeadsetBom);
  });
}

window.onload = init;
