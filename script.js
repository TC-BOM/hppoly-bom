const VERSION = "v10.84";
// v10.84: full-width BOM Please Note; Black A2 above White; per-camera polarizer/mount/PoE stacks; E60 ceiling 9W1A8AA#AC3 on every extra camera.
// v10.83: Camera dropdown; 2 extras on X52/X72/G62/PC; third on G62/PC; 3p above install; drop Teams/Zoom gate on extra cams.
// v10.82: second extra camera on X52/X72/G62 Teams/Zoom; third picker on G62.
// v10.81: main camera dropdown under expansion mic; secondary+accessories in click-down.
// v10.80: keep Optional Camera add-on visible; gray/disable E60/E70 when host cannot take an extra camera; drop HEADSETS tab; Large X72 secondary E60/E70 (max 2 extra cameras per Poly camera-support slide); optional cameras click-down; PoE-only camera power (no wall PSU).
// v10.79: CCX 350 hidden on Zoom/OpenSIP (Teams-only); CCX radio map: 350/400 no Wi-Fi no BT, 505/600 Wi-Fi+BT; Video Lens copy+checkboxes moved into the Poly+/Lens details
// script.js – HP | Poly Configurator – v10.77: V12 B42BFAA; BOM X/G62/PC, V, power/mounts, cameras, A2, support, Lens, install
// v10.72: USB-Ethernet dongle 4Z7Z7AA for A2 on V12/X32/X52/V52 and camera on X52
// v10.71: unify quote options (Lens Pro-style title+SKU, one amber box); Audio TAA box matches Video
// v10.70: split Device vs Controller compliance pickers (independent remap, no regenerate)
// v10.69: post-Generate Video compliance picker (Commercial / TAA / TAA NR / JITC / JITC NR)
// v10.68: TC10 TAA-only SKUs + TAA checkbox label (drop / GSA)
// v10.67: Audio TAA/JITC blue box (match Video)
// v10.66: strip MSRP from form option labels (quote only)
// v10.65: Audio Rove base/handset/R8 picker (replaces flat model list)
// v10.64: Audio Wi-Fi/BT radios under TAA; filter models; C60 NR from radios; drop Edge E500 and VVX
// v10.62: Classic/New site toggle (top-right)
// v10.61: EM pad rules, CCX 500, platform notes, qty field, Lens onboarding
// v10.60: Trio C60 TAA/No Radio/cables + E500/CCX700 support
// v10.59: Voice TAA/PSU bundles, VVX, E500, CCX 700
// v10.58: Lens Pro column on Poly+/Analyze support table
// v10.57: in-box mounts; E70 clamp off; TC10 order; footer Please Note; no suggestion box
// v10.56: G9+ TAA kit A2TP1AA (includes TC10); Suggestions for the site
// v10.55: welcome announcement + feedback box
// v10.54: E70 wall power adds 874T5AA IEC cord
// v10.53: BOM* / estimate only*; hide No Radio
// v10.52: polarizer copy; static BOM qty (no post-generate steppers)
// v10.51: retitle Gem / Bill of Materials Generator
// v10.50: analog 875M6AA+875M4AA, A2/analog QSG, SCT/Netgear accessories
// v10.49: Audio banner matches Video announcement; under construction
// v10.48: Netgear only Large/XL or X/V 52/72 + A2 + camera; G6 dock BYOD only
// v10.47: Room PC picker (Studio 5 / Studio 7 / G9+) after Generate
// v10.46: TAA/JITC/No Radio flags, Huddle R30, HOST_SKUS picker, G62 kit mount
// v10.45: Knauf-style flat home form; HEADSETS tab greyed out
// v10.44: shrink announcement banner
// v10.43: unique HP Documents QSG PDFs per mount option
// v10.42: split Support and Install sections (Knauf layout)
// v10.41: hide optional checkbox MSRP on form (quote only)
// v10.40: polarizer under camera add-on
// v10.39: in-box mount notes + per-option QSG links
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


const PREEXISTING_AUDIO = "Pre-existing / 3rd Party Audio, (not added to BOM)";
const ANALOG_MIC_VALUE = "Single Analog Extension mics";
const ANALOG_QSG = { href: "https://kaas.hpcloud.hp.com/pdf-public/pdf_9575660_en-US-1.pdf", label: "Analog expansion mic quick start (PDF)" };
const A2_QSG = { href: "https://kaas.hpcloud.hp.com/pdf-public/pdf_15155157_en-US-1.pdf", label: "Studio A2 quick start (PDF)" };
const NETGEAR_KITS = [
  { sku: "GSM4210PD-100NAS", label: "GSM4210PD-100NAS — 8-port PoE+ desktop" },
  { sku: "GSM4210PX-100NAS", label: "GSM4210PX-100NAS — 8-port PoE+ 220W" },
  { sku: "GSM4212PX-100NAS", label: "GSM4212PX-100NAS — 10-port PoE+" },
  { sku: "GSM4230PX-100NAS", label: "GSM4230PX-100NAS — 26-port PoE+" },
  { sku: "GSM4248PX-100NAS", label: "GSM4248PX-100NAS — 40-port PoE+" }
];
const SCT_KITS = [
  { sku: "RCU3SL-C30", purpose: "USB 3.2 bar extender (Device Mode USB-C, up to 100 m CAT)", families: ["x32","x52","x72","v52","v72"], drawing: "https://docs.soundcontrol.net/download/3116/", drawingLabel: "RCU3SL-C30 application guide (PDF)" },
  { sku: "RCU3SL-C00", purpose: "USB 3.2 extender; SCT lists Poly Studio V12 (confirm HP support)", families: ["v12"], drawing: "https://docs.soundcontrol.net/download/3107/", drawingLabel: "RCU3SL-C00 application guide (PDF)" },
  { sku: "RCU3SL-B20", purpose: "USB 3.2 extender for Poly Studio E60 (camera >6 ft from codec)", camera: "E60", drawing: "https://docs.soundcontrol.net/download/3800/", drawingLabel: "RCU3SL-B20 application guide (PDF)", drawing2: "https://docs.soundcontrol.net/download/3383/", drawing2Label: "E60 / G62 design guide (PDF)" },
  { sku: "RCU3SL-C50", purpose: "USB 3.2 extender for Poly Studio E70", camera: "E70", drawing: "https://docs.soundcontrol.net/download/3122/", drawingLabel: "RCU3SL-C50 application guide (PDF)", drawing2: "https://docs.soundcontrol.net/download/3753/", drawing2Label: "E70 / G62 design guide (PDF)" },
  { sku: "RCU2S-PSU", purpose: "USB 2.0 extender for X/V bars (USB 2 is limited vs USB 3)", families: ["x32","x52","x72","v52","v72"], drawing: "https://docs.soundcontrol.net/download/763/", drawingLabel: "RCU2S-PSU application guide (PDF)" },
  { sku: "RTK-X57", purpose: "Table BYOM kit: HDMI/USB/Ethernet, TC10 PoE, analog mics, powers the X-bar", families: ["x52","x72"], drawing: "https://docs.soundcontrol.net/download/3386/", drawingLabel: "RTK-X57 X-series design guide (PDF)", drawing2: "https://docs.soundcontrol.net/download/827/", drawing2Label: "RTK-X57 application guide (PDF)" },
  { sku: "RTK-X57-PSU", purpose: "Table BYOM kit for V52/V72", families: ["v52","v72"], drawing: "https://docs.soundcontrol.net/download/1217/", drawingLabel: "RTK-X57 USB design guide (PDF)", drawing2: "https://docs.soundcontrol.net/download/829/", drawing2Label: "RTK-X57-PSU application guide (PDF)" },
  { sku: "RM-X57", purpose: "Extend analog expansion mics (875M6AA) up to 100 m CAT", analog: true, drawing: "https://docs.soundcontrol.net/download/1187/", drawingLabel: "RM-X57 design guide (PDF)", drawing2: "https://docs.soundcontrol.net/download/775/", drawing2Label: "RM-X57 application guide (PDF)" },
  { sku: "RCM-URMX", purpose: "Wall mount for E60 that hides the SCT camera-end module", camera: "E60", drawing: "https://docs.soundcontrol.net/download/3383/", drawingLabel: "E60 / G62 design guide (PDF)" }
];

document.title = 'Poly Video Conferencing \u2018Gem\u2019: "Bill" of Materials Generator';

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
    const family = hostFamily();
    if (family === "x72" || family === "v72") return true;
    const cam = document.getElementById("cameraChoice")?.value;
    if (cam === "E70") return true;
    if (canShowSecondaryCamera() && document.getElementById("cameraChoice2")?.value === "E70") return true;
    if (canShowTertiaryCamera() && document.getElementById("cameraChoice3")?.value === "E70") return true;
    const skus = [
      "842F8AA","886C9AA","886C8AA",
      "A4LZ8AA","A4LZ8AA#ABA","A4MA1AA","A4MA2AA","A4MA4AA","A4MA6AA",
      "AV1E3AA","AV1E3AA#ABA","AV1E4AA","AV1E6AA"
    ];
    return results.some(x => skus.includes(x.sku));
  }

  function placePolarizerInBom(results) {
    if (!results || !results.length) return;
    const polarSku = "875K9AA";
    const iPolar = results.findIndex(x => x.sku === polarSku);
    if (iPolar < 0) return;
    const line = results.splice(iPolar, 1)[0];
    const e70 = ["842F8AA", "886C9AA", "886C8AA"];
    const xv72 = ["A4LZ8AA", "A4LZ8AA#ABA", "A4MA1AA", "A4MA2AA", "A4MA4AA", "A4MA6AA", "AV1E3AA", "AV1E3AA#ABA", "AV1E4AA", "AV1E6AA"];
    let after = results.findIndex(x => e70.includes(x.sku));
    if (after < 0) after = results.findIndex(x => xv72.includes(x.sku));
    if (after >= 0) results.splice(after + 1, 0, line);
    else results.push(line);
  }

  function supportSkuSet() {
    const s = new Set();
    Object.values(SUPPORT_MAP).forEach(m => {
      Object.values(m).forEach(sku => { if (sku) s.add(sku); });
    });
    return s;
  }
  function hostSkuSet() {
    const s = new Set();
    Object.values(HOST_SKUS).forEach(row => Object.values(row).forEach(sku => { if (sku) s.add(sku); }));
    ["A4LZ8AA#ABA", "AV1E3AA#ABA", "A09D4AA#ABA", "A9DD8AA#ABA", "8D8K2AA#ABA", "A01KCAA#AC3"].forEach(x => s.add(x));
    return s;
  }
  const E70_SKUS = new Set(["842F8AA", "886C9AA", "886C8AA"]);
  const E60_SKUS = new Set(["9W1A6AA#AC3", "9W1A6AA", "9W1A7AA"]);
  const A2_POD_SKUS = new Set(["B22X4AA#AC3", "B22X6AA#AC3", "B22X5AA", "B22X7AA"]);
  const A2_BRIDGE_SKUS = new Set(["B22X2AA#AC3", "B22X3AA"]);
  const ANALOG_MIC_SKUS = new Set(["875M6AA"]);
  const HOST_MOUNT_SKUS = new Set(["783S4AA", "875L1AA", "875L5AA", "875L6AA", "875L7AA", "875L8AA", "875L9AA", "875M0AA", "875L2AA", "875L3AA"]);
  const CAM_ACC_E70 = new Set(["B5NH6AA", "875K7AA", "875K9AA"]);
  const CAM_ACC_E60 = new Set(["B5NH6AA", "9W1A8AA#AC3", "9W1A8AA", "89L88AA"]);
  const GLASS_SKUS = new Set(["874P9AA", "874P6AA"]);
  const DONGLE_SKUS = new Set(["4Z7Z7AA", "875M4AA"]);
  const INJECTOR_SKUS = new Set(["A02F9AA"]);
  const R30_DOCK = new Set(["9X478AA"]);
  const G6_SKUS = new Set(["9X481UT#ABA"]);

  function isSupportSku(sku, set) { return set.has(sku); }
  function isPrimaryHardware(sku, hosts, tc10) {
    if (hosts.has(sku)) return true;
    if (E70_SKUS.has(sku) || E60_SKUS.has(sku)) return true;
    if (tc10 && tc10.has(sku)) return true;
    if (A2_POD_SKUS.has(sku) || A2_BRIDGE_SKUS.has(sku)) return true;
    if (ANALOG_MIC_SKUS.has(sku)) return true;
    if (PC_SKU_SET.has(sku)) return true;
    if (G6_SKUS.has(sku)) return true;
    return false;
  }
  function findPrimary(primaries, pred) {
    for (let i = primaries.length - 1; i >= 0; i--) {
      if (pred(primaries[i].sku)) return primaries[i].sku;
    }
    return null;
  }
  function parentHardwareSku(sku, primaries, hosts, tc10) {
    if (sku === "875K9AA") {
      return findPrimary(primaries, s => E70_SKUS.has(s)) || findPrimary(primaries, s => hosts.has(s));
    }
    if (HOST_MOUNT_SKUS.has(sku) || DONGLE_SKUS.has(sku) && sku === "4Z7Z7AA" || R30_DOCK.has(sku) || INJECTOR_SKUS.has(sku) && false) {
      /* handled below */
    }
    if (HOST_MOUNT_SKUS.has(sku) || sku === "4Z7Z7AA" || R30_DOCK.has(sku)) {
      return findPrimary(primaries, s => hosts.has(s));
    }
    if (CAM_ACC_E70.has(sku) && sku !== "875K9AA") {
      return findPrimary(primaries, s => E70_SKUS.has(s)) || findPrimary(primaries, s => E60_SKUS.has(s));
    }
    if (CAM_ACC_E60.has(sku)) {
      return findPrimary(primaries, s => E60_SKUS.has(s)) || findPrimary(primaries, s => E70_SKUS.has(s));
    }
    if (sku === "875M4AA") return findPrimary(primaries, s => ANALOG_MIC_SKUS.has(s));
    if (INJECTOR_SKUS.has(sku)) return findPrimary(primaries, s => A2_BRIDGE_SKUS.has(s)) || findPrimary(primaries, s => A2_POD_SKUS.has(s));
    if (GLASS_SKUS.has(sku)) return findPrimary(primaries, s => tc10.has(s));
    return findPrimary(primaries, s => hosts.has(s));
  }

  const HOST_POWER_SKUS = new Set(["B42BFAA", "9X478AA", "9X481UT#ABA"]);
  const CAMERA_POWER_SKUS = new Set(["B5NH6AA"]);
  const A2_POWER_SKUS = new Set(["A02F9AA"]);
  const LENS_SKU_SET = new Set(["UJ8T6LN", "UJ8T5LN", "UJ8T4LN", "PRO8700101AB"]);
  const INSTALL_SKU_SET = new Set(["PROECOSYS02", "PROG7500RE2", "PROSTDIOXR2", "PROSMTHND04", "PROADDON004"]);
  function tc10SkuSet() {
    return new Set(["875K5AA", "977L6AA", "977L7AA", "973F9AA", "973G0AA", "973G1AA", "93S70AA", "9A135AA", "9A134AA"]);
  }
  function familySkuSet(keys) {
    const s = new Set();
    keys.forEach(k => {
      const row = HOST_SKUS[k];
      if (!row) return;
      Object.values(row).forEach(x => { if (x) s.add(x); });
    });
    return s;
  }
  function supportParentKey(sku) {
    for (const [key, m] of Object.entries(SUPPORT_MAP)) {
      if (Object.values(m).includes(sku)) return key;
    }
    return null;
  }
  function bomLineRank(sku, xg62, vbar, tc10, hasE70) {
    if (xg62.has(sku) || PC_SKU_SET.has(sku)) return 0;
    if (vbar.has(sku)) return 1;
    if (HOST_MOUNT_SKUS.has(sku) || HOST_POWER_SKUS.has(sku)) return 2;
    if (sku === "875K9AA" && !hasE70) return 2;
    if (tc10.has(sku) || GLASS_SKUS.has(sku)) return 3;
    if (E70_SKUS.has(sku) || E60_SKUS.has(sku) || CAMERA_POWER_SKUS.has(sku) || CAM_ACC_E70.has(sku) || CAM_ACC_E60.has(sku)) return 4;
    if (sku === "875K9AA" && hasE70) return 4;
    if (A2_BRIDGE_SKUS.has(sku)) return 5;
    if (A2_POWER_SKUS.has(sku)) return 6;
    if (A2_POD_SKUS.has(sku)) return 7;
    return 8;
  }
  function supportRankForKey(key) {
    if (["x32", "x52", "x72", "g62", "g9plus_mtr", "zoom_pc"].includes(key)) return 0;
    if (["v12", "v52", "v72", "r30"].includes(key)) return 1;
    if (key === "g6_dock") return 2;
    if (key === "tc10") return 3;
    if (key === "e70" || key === "e60") return 4;
    if (key === "a2_bridge") return 5;
    if (key === "a2_mic") return 7;
    return 8;
  }

  function orderFinalBomTable(results) {
    if (!results || !results.length) return;
    const supSet = supportSkuSet();
    const tc10 = tc10SkuSet();
    const xg62 = familySkuSet(["x32", "x52", "x72", "g62", "g62_kit"]);
    ["A3SV5AA#ABA", "8D8K2AA#ABA", "A4LZ8AA#ABA", "A01KCAA#AC3"].forEach(x => xg62.add(x));
    const vbar = familySkuSet(["v12", "v52", "v72", "r30"]);
    ["A9DD8AA#ABA", "A09D4AA#ABA", "AV1E3AA#ABA"].forEach(x => vbar.add(x));
    const hasE70 = results.some(x => E70_SKUS.has(x.sku));
    const hw = [];
    const support = [];
    const lens = [];
    const install = [];
    results.forEach((line, idx) => {
      if (LENS_SKU_SET.has(line.sku)) { lens.push({ line, idx }); return; }
      if (INSTALL_SKU_SET.has(line.sku)) { install.push({ line, idx }); return; }
      if (supSet.has(line.sku)) { support.push({ line, idx }); return; }
      hw.push({ line, idx, rank: bomLineRank(line.sku, xg62, vbar, tc10, hasE70) });
    });
    hw.sort((a, b) => (a.rank - b.rank) || (a.idx - b.idx));
    const orderedHw = hw.map(x => x.line);
    placePolarizerInBom(orderedHw);
    support.sort((a, b) => {
      const ra = supportRankForKey(supportParentKey(a.line.sku));
      const rb = supportRankForKey(supportParentKey(b.line.sku));
      return (ra - rb) || (a.idx - b.idx);
    });
    lens.sort((a, b) => a.idx - b.idx);
    install.sort((a, b) => a.idx - b.idx);
    results.splice(0, results.length, ...orderedHw, ...support.map(s => s.line), ...lens.map(s => s.line), ...install.map(s => s.line));
  }


  function copyBomTableText(bom) {
    if (!bom || !bom.results) return "";
    const priced = !!bom.includePrices;
    const header = priced ? ["Qty", "SKU", "Description", "MSRP"] : ["Qty", "SKU", "Description"];
    const lines = [header.join("\t")];
    bom.results.forEach(r => {
      const cols = [String(r.quantity ?? ""), r.sku || "", r.description || ""];
      if (priced) cols.push((r.msrp === "" || r.msrp == null) ? "" : String(r.msrp));
      lines.push(cols.join("\t"));
    });
    return lines.join("\n");
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
    zoom_pc:    { poly1: "P88120112", poly3: "P88120312", poly5: null,     analyze1: "UR8H2PV", analyze3: "UR8H3PVNK", analyze5: null },
    r30:        { poly1: "U73U3PV",   poly3: "U73U4PV",   poly5: null,     analyze1: "UR8B2PV", analyze3: "UR8B3PV", analyze5: null },
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
    edge_e550:   { poly1: "P87050112", poly3: "P87050312", poly5: "UM5T6PB", analyze1: "UQ7M6PB", analyze3: "UQ7N1PB", analyze5: "UQ7M9PB" },
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

  // Room PC option matrix (Studio 5 / Studio 7 / G9+). Do not invent missing SKUs.
  const PC_SKU_SET = new Set(["DS1E8AW", "DS1G9AW", "A1ZB6AW#ABA", "DS1R6AW", "DS0W9AW", "DS1R5AW", "A2TP1AA"]);
  const PC_CHOICE_ORDER = ["studio5", "studio7", "g9plus"];
  const PC_CHOICE_NAMES = { studio5: "Studio 5", studio7: "Studio 7", g9plus: "G9+" };

  function normalizePcPlatform(platform) {
    if (platform === "Microsoft Teams" || platform === "teams") return "teams";
    if (platform === "Zoom" || platform === "zoom") return "zoom";
    return null;
  }
  function pcFlagsRestricted(flags) {
    flags = flags || {};
    // Align with host pickHost: TAA/JITC path only. NR-only keeps commercial PCs
    // (TAA NO RADIO Studio 5/7 SKUs require TAA or JITC; do not mix with a commercial bar).
    return !!(flags.taa || flags.jitc);
  }
  function getPcOptionMatrix(platform, flags) {
    const p = normalizePcPlatform(platform);
    const restricted = pcFlagsRestricted(flags);
    if (p === "teams") {
      if (restricted) return { studio5: "DS1R6AW", studio7: "DS0W9AW", g9plus: "A2TP1AA" };
      return { studio5: "DS1E8AW", studio7: "DS1G9AW", g9plus: "A1ZB6AW#ABA" };
    }
    if (p === "zoom") {
      if (restricted) return { studio5: null, studio7: null, g9plus: null };
      return { studio5: null, studio7: "DS1R5AW", g9plus: null };
    }
    return { studio5: null, studio7: null, g9plus: null };
  }
  function defaultPcChoice(platform, flags, roomSize) {
    const p = normalizePcPlatform(platform);
    const opts = getPcOptionMatrix(p, flags);
    const restricted = pcFlagsRestricted(flags);
    let choice = null;
    if (p === "teams") {
      if (restricted) choice = (roomSize === "Small" || roomSize === "Medium") ? "studio5" : "studio7";
      else choice = "g9plus";
    } else if (p === "zoom") {
      choice = restricted ? null : "studio7";
    }
    if (choice && !opts[choice]) return null;
    return choice;
  }
  function supportSkusFor(key) {
    const map = SUPPORT_MAP[key];
    if (!map) return [];
    return Object.keys(map).map(k => map[k]).filter(Boolean);
  }
  function resultsHaveSupport(arr, key) {
    const skus = new Set(supportSkusFor(key));
    return arr.some(x => skus.has(x.sku));
  }
  function removeSupportKey(arr, key) {
    const skus = new Set(supportSkusFor(key));
    for (let i = arr.length - 1; i >= 0; i--) {
      if (skus.has(arr[i].sku)) arr.splice(i, 1);
    }
  }

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
    tc10_black_wall:  { color: "black", glassMount: null,      label: "TC10 Black scheduling panel (wall mount included)" },
    tc10_white_wall:  { color: "white", glassMount: null,      label: "TC10 White scheduling panel (wall mount included)" },
    tc10_black_glass: { color: "black", glassMount: "874P9AA", label: "TC10 Black scheduling panel + glass mount" },
    tc10_white_glass: { color: "white", glassMount: "874P6AA", label: "TC10 White scheduling panel + glass mount" }
  };

  const HOST_SKUS = {
    v12:     { commercial: "A9DD8AA#ABA", taa: "B95SPAA", taa_nr: "B95SNAA" },
    v52:     { commercial: "A09D4AA#ABA", taa: "A09D5AA", jitc: "A09D6AA", taa_nr: "A09D8AA", jitc_nr: "A09D9AA" },
    v72:     { commercial: "AV1E3AA#ABA", jitc: "AV1E4AA", jitc_nr: "AV1E6AA" },
    x32:     { commercial: "A3SV5AA#ABA", taa: "A3SV9AA", jitc: "A3SW0AA", taa_nr: "A3SW1AA", jitc_nr: "A3SW2AA" },
    x52:     { commercial: "8D8K2AA#ABA", taa: "8D8K3AA", jitc: "8D8K4AA", taa_nr: "8D8K7AA", jitc_nr: "8D8K8AA" },
    x72:     { commercial: "A4LZ8AA#ABA", taa: "A4MA1AA", jitc: "A4MA2AA", taa_nr: "A4MA4AA", jitc_nr: "A4MA6AA" },
    g62:     { commercial: "99T09AA", taa: "99T10AA", jitc: "99T11AA", taa_nr: "99T12AA", jitc_nr: "99T13AA" },
    g62_kit: { commercial: "A01KCAA#AC3", taa: "A01KBAA", jitc: "A01K9AA", taa_nr: "99T21AA", jitc_nr: "A01K7AA" },
    r30:     { commercial: "9U3U1AA", taa: "980F1AA", jitc: "980F2AA", taa_nr: "980F1AA", jitc_nr: "980F2AA" }
  };
  function pickHost(family, flags) {
    const row = HOST_SKUS[family];
    if (!row) return null;
    flags = flags || {};
    const wantJitc = !!flags.jitc;
    const wantTaa = !!flags.taa;
    const wantNr = !!flags.nr;
    const order = [];
    const push = k => { if (!order.includes(k)) order.push(k); };
    if (wantJitc && wantNr) push("jitc_nr");
    if (wantJitc) push("jitc");
    if (wantTaa && wantNr) push("taa_nr");
    if (wantTaa) push("taa");
    // TAA-compliant JITC fallback when no TAA-only SKU (e.g. V72 TAA → AV1E4AA)
    if (wantTaa && !wantJitc) {
      if (wantNr) push("jitc_nr");
      push("jitc");
    }
    // If nr but no *_nr key, non-nr of same compliance is already in order
    push("commercial");
    for (const k of order) {
      if (row[k]) return row[k];
    }
    return null;
  }
  function complianceFlags() {
    const jitc = !!document.getElementById("optJitc")?.checked;
    const taaBox = !!document.getElementById("optTaa")?.checked;
    const nr = !!document.getElementById("optNoRadio")?.checked;
    return { taa: taaBox || jitc, jitc, nr };
  }
  function pickTc10(color, flags) {
    flags = flags || complianceFlags();
    // Order: JITC+NR, JITC, TAA+NR, TAA, commercial
    if (color === "white") {
      if (flags.jitc && flags.nr) return "9A134AA"; // Poly TC10 White Touch Controller No Radio GSA/TAA JITC
      if (flags.jitc) return "9A135AA"; // Poly TC10 White Touch Controller GSA/TAA JITC
      if (flags.taa && flags.nr) return "93S70AA"; // Poly TC10 White Touch Controller No Radio GSA/TAA
      if (flags.taa) return "973G1AA"; // Poly TC10 White Touch Controller GSA/TAA
      // commercial white not in the sheet — keep using TAA white 973G1AA (do not invent)
      return "973G1AA";
    }
    if (flags.jitc && flags.nr) return "973G0AA"; // Poly TC10 Black Touch Controller No Radio GSA/TAA JITC
    if (flags.jitc) return "973F9AA"; // Poly TC10 Black Touch Controller GSA/TAA JITC
    if (flags.taa && flags.nr) return "977L7AA"; // Poly TC10 Black Touch Controller No Radio GSA/TAA
    if (flags.taa) return "977L6AA"; // Poly TC10 Black Touch Controller GSA/TAA
    return "875K5AA"; // Poly TC10 Touch Controller Black (commercial)
  }

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

  // Welcome banner only (feedback box removed: no safe GitHub Issues post from public Pages)
  const promoWrap = document.createElement("div");
  promoWrap.id = "promoBox";
  promoWrap.className = "px-3 py-2 border border-amber-400 rounded bg-amber-50 mb-4";
  promoWrap.innerHTML = `
    <div class="text-sm text-amber-900">📢 Welcome to the new site! Poly+ Analyze, JITC/TAA, and the new PC Studio Room kits have been added.</div>`;

  // TAA / JITC
  const taaWrap = document.createElement("div");
  taaWrap.className = "p-3 border-2 border-blue-300 rounded bg-blue-50 space-y-1";
  taaWrap.innerHTML = `
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
      <label class="inline-flex items-center gap-2 cursor-pointer">
        <input id="optTaa" type="checkbox" class="w-4 h-4 border">
        <span class="font-semibold text-blue-900">TAA</span>
      </label>
      <label class="inline-flex items-center gap-2 cursor-pointer">
        <input id="optJitc" type="checkbox" class="w-4 h-4 border">
        <span class="font-semibold text-blue-900">JITC</span>
      </label>
    </div>
    <p class="text-xs text-blue-800">JITC SKUs are TAA. Checking JITC auto-checks TAA. Unchecking TAA unchecks JITC.</p>
    <input id="optNoRadio" type="checkbox" hidden aria-hidden="true">`;

  form.appendChild(taaWrap);

  form.appendChild(select("typeOfSystem", "Select System Type", [
    "BYOD USB Bar only",
    "Windows PC based solution",
    "Android appliance based solution"
  ], true));
  const platformWrap = select("platform", "Select Primary Platform", ["Zoom", "Microsoft Teams", "Google Meet"], true);
  platformWrap.id = "platformWrap";
  const platformHint = document.createElement("p");
  platformHint.id = "platformHint";
  platformHint.className = "text-xs text-gray-600 mt-1";
  platformWrap.appendChild(platformHint);
  form.appendChild(platformWrap);
  form.appendChild(select("roomSize", "Select Room Size", [
    { value: "Huddle", label: "Huddle — BYOD only. Poly Studio R30 USB bar + dock" },
    { value: "Small",  label: "Small — Up to 12' from front of room to furthest person to cover" },
    { value: "Medium", label: "Medium — Up to 16' from front of room to furthest person to cover" },
    { value: "Large",  label: "Large — Up to 25' from front of room to furthest person to cover" },
    { value: "Very large", label: "Very Large room. Distance of > 25' from front of room to furthest person to cover" }
  ], true));

  const mountingWrapEl = select("mounting", "Select Mounting option", ["None", "Wall", "VESA style display mount", "Table"]);
  const mountingHint = document.createElement("p");
  mountingHint.id = "mountingHint";
  mountingHint.className = "text-xs text-gray-600 mt-1";
  mountingWrapEl.appendChild(mountingHint);
  form.appendChild(mountingWrapEl);
  const expansionMicWrapEl = select("expansionMic", "Include Expansion Mic?", [
    "None",
    PREEXISTING_AUDIO,
    ANALOG_MIC_VALUE,
    "New Black A2 table mic pod(s)",
    "New White A2 table mic pod(s)"
  ]);
  const expansionHint = document.createElement("p");
  expansionHint.id = "expansionHint";
  expansionHint.className = "text-xs text-gray-600 mt-1";
  expansionMicWrapEl.appendChild(expansionHint);
  form.appendChild(expansionMicWrapEl);

  const expansionInfo = document.createElement("div");
  expansionInfo.id = "expansionInfo";
  expansionInfo.className = "hidden text-sm mt-1 p-2 border-l-4 border-amber-400 bg-amber-50 text-amber-900 rounded";
  expansionInfo.textContent = "Pre-existing / 3rd party audio is noted only. Nothing is added to the BOM.";
  form.appendChild(expansionInfo);

  // A2 quantity (shown only when New White/Black A2 is selected)
  const a2QtyWrap = document.createElement("div");
  a2QtyWrap.id = "a2QtyWrap";
  a2QtyWrap.className = "hidden";
  a2QtyWrap.innerHTML = `
    <label class="block font-medium">Number of A2 mic pods</label>
    <select id="a2Qty" class="border p-2 w-full"><option value="1">1</option></select>
    <p id="a2QtyHint" class="text-xs text-gray-600 mt-1"></p>`;
  form.appendChild(a2QtyWrap);

  // Optional Camera add-on — same dropdown format as Include Expansion Mic? (not inside click-down)
  const camWrap = select("cameraChoice", "Camera", [
    { value: "None", label: "None (use built-in camera)" },
    { value: "E70", label: "Poly E70 (842F8AA) — AI Director auto-tracking / camera switching" },
    { value: "E60", label: "Poly E60 (9W1A6AA#AC3)" }
  ]);
  const cameraChoiceHint = document.createElement("p");
  cameraChoiceHint.id = "cameraChoiceHint";
  cameraChoiceHint.className = "text-xs text-gray-600 mt-1";
  cameraChoiceHint.textContent = "E70 recommended for AI switching on X52.";
  camWrap.appendChild(cameraChoiceHint);
  form.appendChild(camWrap);

  // Secondary camera + accessories — Lens/third-party style click-down
  const cameraDetails = document.createElement("details");
  cameraDetails.id = "cameraDetails";
  cameraDetails.className = "text-xs mt-2 border border-blue-200 rounded bg-white";
  cameraDetails.innerHTML = `
    <summary class="cursor-pointer select-none px-3 py-2 font-medium text-blue-900 hover:bg-blue-50 rounded">
      Camera accessories — click to expand
    </summary>
    <div class="px-3 pb-3 space-y-3"></div>`;
  const cameraDetailsBody = cameraDetails.querySelector("div");

  function polarizerInnerHtml(optId) {
    return `
    <label class="inline-flex items-start gap-2">
      <input id="${optId}" type="checkbox" class="border mt-1">
      <span>
        <span class="font-medium">Optional polarized filter</span>
        <span class="block text-xs text-gray-600">875K9AA. For X72 / V72 / E70. Cuts glare and window washout. Not added unless checked.</span>
      </span>
    </label>`;
  }
  function poeInnerHtml(optId) {
    return `
    <p class="font-medium">Optional camera power</p>
    <p class="text-xs text-gray-600 mb-1">E60 and E70 do not include a PSU. They need PoE+ (Class 4 / 30W). Leave unchecked if the switch already provides PoE+.</p>
    <label class="inline-flex items-center gap-2 mt-1">
      <input id="${optId}" type="checkbox" class="border">
      <span class="font-medium">45W PoE++ adapter (B5NH6AA)</span>
    </label>`;
  }
  function mountInnerHtml(selId, hintId) {
    return `
    <label class="block font-medium">Camera mount option</label>
    <select id="${selId}" class="border p-2 w-full">
      <option value="None">None</option>
    </select>
    <p class="text-xs text-gray-600 mt-1" id="${hintId}"></p>`;
  }

  // Camera 1 accessories (built-in X72/V72 polarizer + Camera dropdown extras)
  const polarFilterWrap = document.createElement("div");
  polarFilterWrap.id = "polarFilterWrap";
  polarFilterWrap.className = "hidden mt-2";
  polarFilterWrap.innerHTML = polarizerInnerHtml("polarFilterOpt");
  cameraDetailsBody.appendChild(polarFilterWrap);

  const cameraMountWrap = document.createElement("div");
  cameraMountWrap.id = "cameraMountWrap";
  cameraMountWrap.className = "hidden";
  cameraMountWrap.innerHTML = mountInnerHtml("cameraMount", "cameraMountHint");
  cameraDetailsBody.appendChild(cameraMountWrap);

  const cameraPowerWrap = document.createElement("div");
  cameraPowerWrap.id = "cameraPowerWrap";
  cameraPowerWrap.className = "hidden";
  cameraPowerWrap.innerHTML = poeInnerHtml("camPowerPoePP");
  cameraDetailsBody.appendChild(cameraPowerWrap);

  const camWrap2 = document.createElement("div");
  camWrap2.id = "cameraWrap2";
  camWrap2.innerHTML = `
    <label class="block font-medium">Secondary camera add-on</label>
    <select id="cameraChoice2" class="border p-2 w-full">
      <option value="None">None (use built-in camera)</option>
      <option value="E70">Poly E70 (842F8AA) — AI Director auto-tracking / camera switching</option>
      <option value="E60">Poly E60 (9W1A6AA#AC3)</option>
    </select>
    <p id="cameraChoice2Hint" class="text-xs text-gray-600 mt-1">Second extra camera (max 2 except G62/PC).</p>`;
  cameraDetailsBody.appendChild(camWrap2);

  const polarFilterWrap2 = document.createElement("div");
  polarFilterWrap2.id = "polarFilterWrap2";
  polarFilterWrap2.className = "hidden mt-2";
  polarFilterWrap2.innerHTML = polarizerInnerHtml("polarFilterOpt2");
  cameraDetailsBody.appendChild(polarFilterWrap2);

  const cameraMountWrap2 = document.createElement("div");
  cameraMountWrap2.id = "cameraMountWrap2";
  cameraMountWrap2.className = "hidden";
  cameraMountWrap2.innerHTML = mountInnerHtml("cameraMount2", "cameraMountHint2");
  cameraDetailsBody.appendChild(cameraMountWrap2);

  const cameraPowerWrap2 = document.createElement("div");
  cameraPowerWrap2.id = "cameraPowerWrap2";
  cameraPowerWrap2.className = "hidden";
  cameraPowerWrap2.innerHTML = poeInnerHtml("camPowerPoePP2");
  cameraDetailsBody.appendChild(cameraPowerWrap2);

  const camWrap3 = document.createElement("div");
  camWrap3.id = "cameraWrap3";
  camWrap3.className = "hidden";
  camWrap3.innerHTML = `
    <label class="block font-medium">Third camera add-on</label>
    <select id="cameraChoice3" class="border p-2 w-full">
      <option value="None">None (use built-in camera)</option>
      <option value="E70">Poly E70 (842F8AA) — AI Director auto-tracking / camera switching</option>
      <option value="E60">Poly E60 (9W1A6AA#AC3)</option>
    </select>
    <p id="cameraChoice3Hint" class="text-xs text-gray-600 mt-1">Third extra camera for G62 or PC.</p>`;
  cameraDetailsBody.appendChild(camWrap3);

  const polarFilterWrap3 = document.createElement("div");
  polarFilterWrap3.id = "polarFilterWrap3";
  polarFilterWrap3.className = "hidden mt-2";
  polarFilterWrap3.innerHTML = polarizerInnerHtml("polarFilterOpt3");
  cameraDetailsBody.appendChild(polarFilterWrap3);

  const cameraMountWrap3 = document.createElement("div");
  cameraMountWrap3.id = "cameraMountWrap3";
  cameraMountWrap3.className = "hidden";
  cameraMountWrap3.innerHTML = mountInnerHtml("cameraMount3", "cameraMountHint3");
  cameraDetailsBody.appendChild(cameraMountWrap3);

  const cameraPowerWrap3 = document.createElement("div");
  cameraPowerWrap3.id = "cameraPowerWrap3";
  cameraPowerWrap3.className = "hidden";
  cameraPowerWrap3.innerHTML = poeInnerHtml("camPowerPoePP3");
  cameraDetailsBody.appendChild(cameraPowerWrap3);

  const cameraMulticamNote = document.createElement("p");
  cameraMulticamNote.id = "cameraMulticamNote";
  cameraMulticamNote.className = "text-xs text-gray-600 mt-2";
  cameraMulticamNote.textContent = "Multicam uses USB or Ethernet.";
  cameraDetailsBody.appendChild(cameraMulticamNote);
  form.appendChild(cameraDetails);

  // Netgear Pro AV lives under Optional accessories (expandable table)

  const g6DockWrap = document.createElement("div");
  g6DockWrap.id = "g6DockWrap";
  g6DockWrap.className = "hidden mt-2";
  g6DockWrap.innerHTML = `
    <label class="inline-flex items-start gap-2">
      <input id="g6DockOpt" type="checkbox" class="border mt-1">
      <span>
        <span class="font-medium">HP Thunderbolt 4 Ultra 180W G6 Dock (9X481UT#ABA)</span>
        <span class="block text-xs text-gray-600">Optional for BYOD USB bar rooms. Not added unless checked.</span>
      </span>
    </label>`;
  form.appendChild(g6DockWrap);


  form.appendChild(select("schedulingPanel", "Include additional TC10 to use as scheduling panel outside room?", [
    { value: "None", label: "None" },
    { value: "tc10_black_wall",  label: "TC10 Black — wall mount (included)" },
    { value: "tc10_black_glass", label: "TC10 Black — glass mount" },
    { value: "tc10_white_wall",  label: "TC10 White — wall mount (included)" },
    { value: "tc10_white_glass", label: "TC10 White — glass mount" }
  ]));

  form.appendChild(select("supportTerm", "Select Support term", [
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
    <strong>Poly+</strong> — Hardware support: unlimited 24/7 priority technical support, next-business-day advance replacement, and ecosystem cloud partner support.<br>
    <strong>Lens Pro for Rooms</strong> — Standalone Poly Lens software for room analytics, remote TC8/TC10 access, and calendar / Power BI / Zoom integrations. Does not include hardware replacement.<br>
    <strong>Poly+ Analyze</strong> — Poly+ hardware support <em>plus</em> Lens Pro for Rooms, plus coverage for the entire HP Poly estate.<br>
    <a href="https://info.lens.poly.com/docs/premium-Poly-Lens/poly-plus-enterprise#hp-poly-analyze" target="_blank" rel="noopener" class="text-blue-700 underline">Poly+ / Analyze</a>
    ·
    <a href="https://info.lens.poly.com/docs/premium-Poly-Lens/poly-plus-features" target="_blank" rel="noopener" class="text-blue-700 underline">Lens Pro features</a>`;

  // Expandable Poly+ vs Poly+ Analyze comparison table
  const featuresDetails = document.createElement("details");
  featuresDetails.className = "text-xs mt-2 border border-blue-200 rounded bg-white";
  featuresDetails.innerHTML = `
    <summary class="cursor-pointer select-none px-3 py-2 font-medium text-blue-900 hover:bg-blue-50 rounded">
      Poly+ vs Lens Pro vs Poly+ Analyze — click to expand
    </summary>
    <div class="px-3 pb-3 overflow-x-auto">
      <p class="text-gray-600 mb-2">
        Lens Pro for Rooms is the software SKU (UJ8T6LN / UJ8T5LN / UJ8T4LN). Poly+ Analyze includes that software plus Poly+ hardware support.
        <a href="https://info.lens.poly.com/docs/premium-Poly-Lens/poly-plus-features" target="_blank" rel="noopener" class="text-blue-700 underline">Lens Pro feature table</a>
        ·
        <a href="https://info.lens.poly.com/docs/premium-Poly-Lens/poly-plus-enterprise#hp-poly-analyze" target="_blank" rel="noopener" class="text-blue-700 underline">Poly+ Analyze overview</a>
      </p>
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="bg-blue-50">
            <th class="border border-blue-100 px-2 py-1">Feature</th>
            <th class="border border-blue-100 px-2 py-1">Description</th>
            <th class="border border-blue-100 px-2 py-1 text-center whitespace-nowrap">Poly+</th>
            <th class="border border-blue-100 px-2 py-1 text-center leading-tight w-12">Lens<br>Pro</th>
            <th class="border border-blue-100 px-2 py-1 text-center leading-tight w-14">Poly+<br>Analyze</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">24/7 priority technical support</td>
            <td class="border border-blue-100 px-2 py-1">Unlimited global support via phone, chat, web, and video.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Advance hardware replacement</td>
            <td class="border border-blue-100 px-2 py-1">Next-business-day replacement before returning the failed unit.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Ecosystem cloud partner support</td>
            <td class="border border-blue-100 px-2 py-1">Faster resolution with Teams, Zoom, and other cloud partners.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Coverage for entire HP Poly estate</td>
            <td class="border border-blue-100 px-2 py-1">Unified entitlement across your Poly inventory (not device-by-device only).</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Office 365 Calendar</td>
            <td class="border border-blue-100 px-2 py-1">Integrate Microsoft 365 calendars with Poly Lens for room schedule insights and utilization.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Room Analytics</td>
            <td class="border border-blue-100 px-2 py-1">Customizable reports on room utilization and meeting behavior trends.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Room Insights Dashboard</td>
            <td class="border border-blue-100 px-2 py-1">Interactive dashboard for trends, utilization, and KPIs across your Poly estate.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Room Insights Feed</td>
            <td class="border border-blue-100 px-2 py-1">Curated feed of significant room utilization and meeting metrics.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Remote Access (TC8 / TC10)</td>
            <td class="border border-blue-100 px-2 py-1">Remotely access and control touch controllers from Poly Lens.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">Visual Analytics with Power BI</td>
            <td class="border border-blue-100 px-2 py-1">Visualize Poly inventory and combine with other UC datasets in Power BI.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Zoom Device Management</td>
            <td class="border border-blue-100 px-2 py-1">Monitor Zoom device/room health and manage Poly devices in Poly Lens.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-blue-100 px-2 py-1 font-medium">API Access to Premium Features</td>
            <td class="border border-blue-100 px-2 py-1">Poly Lens Premium APIs (requires Premium entitlement). Core APIs remain free.</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
          <tr>
            <td class="border border-blue-100 px-2 py-1 font-medium">Enterprise integration &amp; IT tools</td>
            <td class="border border-blue-100 px-2 py-1">Estate-wide entitlement and IT tooling that wraps Lens Pro (Analyze / Enterprise).</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">—</td>
            <td class="border border-blue-100 px-2 py-1 text-center">✓</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  form.appendChild(featuresDetails);

  const lensProWrap = document.createElement("div");
  lensProWrap.className = "mt-2 space-y-2";
  lensProWrap.innerHTML = `
    <label class="inline-flex items-start gap-2">
      <input id="lensProRooms" type="checkbox" class="border mt-1">
      <span>
        <span class="font-medium">1 Year Lens Pro for Rooms</span>
        <span class="block text-xs text-gray-600">Check the box, then pick a room band. 1–65 rooms is selected by default.</span>
      </span>
    </label>`;
  const lensProBandSel = select("lensProBand", "Lens Pro room band", [
    { value: "UJ8T6LN", label: "1–65 rooms — UJ8T6LN" },
    { value: "UJ8T5LN", label: "66–250 rooms — UJ8T5LN" },
    { value: "UJ8T4LN", label: "251+ rooms — UJ8T4LN" }
  ], false);
  lensProBandSel.classList.add("hidden", "ml-6");
  lensProWrap.appendChild(lensProBandSel);
  lensProWrap.querySelector("#lensProRooms").addEventListener("change", () => {
    const on = document.getElementById("lensProRooms").checked;
    lensProBandSel.classList.toggle("hidden", !on);
  });
  const lensOnboardLabel = document.createElement("label");
  lensOnboardLabel.className = "inline-flex items-start gap-2";
  lensOnboardLabel.innerHTML = `
    <input id="lensOnboard" type="checkbox" class="border mt-1">
    <span>
      <span class="font-medium">Poly Lens onboarding — PRO8700101AB</span>
      <span class="block text-xs text-gray-600">Register and configure up to 3 Poly hardware devices on Poly Lens cloud management portal</span>
    </span>`;
  lensProWrap.appendChild(lensOnboardLabel);
  const featuresBody = featuresDetails.querySelector("div.px-3.pb-3");
  featuresBody.prepend(lensProWrap);
  featuresBody.prepend(supportInfo);

  const thirdPartyDetails = document.createElement("details");
  thirdPartyDetails.id = "thirdPartyDetails";
  thirdPartyDetails.className = "text-xs mt-2 border border-blue-200 rounded bg-white";
  thirdPartyDetails.innerHTML = `
    <summary class="cursor-pointer select-none px-3 py-2 font-medium text-blue-900 hover:bg-blue-50 rounded">
      Third-party accessories — click to expand
    </summary>
    <div class="px-3 pb-3 space-y-3"></div>`;
  const thirdPartyBody = thirdPartyDetails.querySelector("div");
  thirdPartyBody.appendChild(input("accessories", "Optional accessories (comma-separated SKUs)", "e.g. extra cables, 3rd-party SKUs"));

  const netgearDetails = document.createElement("details");
  netgearDetails.id = "netgearDetails";
  netgearDetails.className = "border border-blue-100 rounded bg-white";
  netgearDetails.innerHTML = `
    <summary class="cursor-pointer select-none px-3 py-2 font-medium text-blue-900 hover:bg-blue-50 rounded">
      Netgear Pro AV switch — click to expand
    </summary>
    <div class="px-3 pb-3 space-y-2 text-sm">
      <p class="text-gray-600">Poly StudioNet / LLN for more than one IP peripheral. Do not use a generic office switch.
        <a href="https://support.hp.com/ie-en/document/ish_13031025-13026020-16" target="_blank" rel="noopener" class="text-blue-700 underline">HP Poly StudioNet switch article</a>
        ·
        <a href="https://downloads1.netgear.com/files/netgear/documents/AV-over-IP-Switch-Reference-Guide-110v.pdf" target="_blank" rel="noopener" class="text-blue-700 underline">Netgear AV Product Reference Guide (PDF)</a>
      </p>
      <div id="netgearKitList" class="space-y-1"></div>
    </div>`;
  thirdPartyBody.appendChild(netgearDetails);

  const sctDetails = document.createElement("details");
  sctDetails.id = "sctDetails";
  sctDetails.className = "border border-blue-100 rounded bg-white";
  sctDetails.innerHTML = `
    <summary class="cursor-pointer select-none px-3 py-2 font-medium text-blue-900 hover:bg-blue-50 rounded">
      Sound Control Technologies — click to expand
    </summary>
    <div class="px-3 pb-3 space-y-2 text-sm">
      <p class="text-gray-600">Integrator kits mapped to the Poly host/camera selected above. Unchecked by default. SCT does not publish Poly MSRP (dealer quote).
        <a href="https://soundcontrol.net/" target="_blank" rel="noopener" class="text-blue-700 underline">soundcontrol.net</a>
      </p>
      <div id="sctKitList" class="space-y-2"></div>
    </div>`;
  thirdPartyBody.appendChild(sctDetails);
  form.appendChild(thirdPartyDetails);

  form.appendChild(select("implementationHelp", "Implementation Help", [
    "None", "Remote Implementation help", "Onsite Implementation help"
  ]));

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

  const AUDIO_BANNER = `
    <div class="px-3 py-1.5 border border-amber-400 rounded bg-amber-50">
      <div class="text-sm text-amber-900">🚧 Under construction.</div>
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

  const audioForm = document.createElement("form");
  audioForm.className = "space-y-4";
  audioForm.innerHTML = AUDIO_BANNER;
  const audioSection = document.createElement("fieldset");
  audioSection.className = "space-y-3 p-4 border border-gray-200 rounded";
  audioSection.innerHTML = '<legend class="font-semibold px-1">Audio</legend>';
  const audioTaaWrap = document.createElement("div");
  audioTaaWrap.className = "p-3 border-2 border-blue-300 rounded bg-blue-50 space-y-1";
  audioTaaWrap.innerHTML = `
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
      <label class="inline-flex items-center gap-2 cursor-pointer">
        <input id="audioTaa" type="checkbox" class="w-4 h-4 border">
        <span class="font-semibold text-blue-900">TAA</span>
      </label>
      <label class="inline-flex items-center gap-2 cursor-pointer">
        <input id="audioJitc" type="checkbox" class="w-4 h-4 border">
        <span class="font-semibold text-blue-900">JITC</span>
      </label>
    </div>
    <p class="text-xs text-blue-800">JITC SKUs are TAA. Checking JITC auto-checks TAA. Unchecking TAA unchecks JITC.</p>
    <input id="audioNoRadio" type="checkbox" hidden aria-hidden="true">`;
  audioSection.appendChild(audioTaaWrap);
  const audioRadioWrap = document.createElement("div");
  audioRadioWrap.className = "space-y-1";
  audioRadioWrap.innerHTML = `
    <label class="inline-flex items-center gap-2"><input id="audioWifi" type="checkbox" class="border" checked><span>Wi-Fi</span></label>
    <label class="inline-flex items-center gap-2 ml-4"><input id="audioBt" type="checkbox" class="border" checked><span>Bluetooth</span></label>
    <p class="text-xs text-gray-600">Wi-Fi and Bluetooth are built-in on matching SKUs (no extra lines). The model list only shows phones that match these radios. Uncheck both for no-radio / DECT models.</p>`;
  audioSection.appendChild(audioRadioWrap);
  audioSection.appendChild(select("audioPlatform", "Platform", ["Microsoft Teams", "Zoom", "OpenSIP"], true));
  audioSection.appendChild(select("audioFamily", "Family", ["Trio", "CCX", "Edge E", "Rove"], true));
  audioSection.appendChild(select("audioModel", "Model", [], true));
  const rovePicker = document.createElement("div");
  rovePicker.id = "rovePicker";
  rovePicker.className = "hidden space-y-3";
  rovePicker.innerHTML = `
    <p class="text-xs text-gray-600">Rove is DECT (no Wi-Fi/Bluetooth on the handset radios).</p>
    <div>
      <label class="block font-medium">Base <span class="text-red-600">*</span></label>
      <select id="roveBase" class="border p-2 w-full">
        <option value="">--</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="B4">B4</option>
      </select>
      <p class="text-xs text-gray-600 mt-1">You cannot pair B2 with B4 (or B1).</p>
    </div>
    <div id="roveBaseQtyWrap" class="hidden">
      <label class="block font-medium">Number of bases</label>
      <select id="roveBaseQty" class="border p-2 w-full"></select>
      <p id="roveBaseQtyHint" class="text-xs text-gray-600 mt-1"></p>
    </div>
    <div id="roveHandsetWrap" class="hidden space-y-2">
      <div class="font-medium">Handsets</div>
      <p class="text-xs text-gray-600">Mixed Rove 20/30/40 OK (shared registration pool). Total cannot exceed the registration cap.</p>
      <div>
        <label class="block font-medium">Rove 20</label>
        <select id="roveQty20" class="border p-2 w-full"></select>
      </div>
      <div>
        <label class="block font-medium">Rove 30</label>
        <select id="roveQty30" class="border p-2 w-full"></select>
      </div>
      <div>
        <label class="block font-medium">Rove 40</label>
        <select id="roveQty40" class="border p-2 w-full"></select>
      </div>
      <p id="roveHandsetHint" class="text-xs text-gray-600"></p>
    </div>
    <div id="roveR8Wrap" class="hidden">
      <label class="block font-medium">R8 repeater (optional)</label>
      <select id="roveQtyR8" class="border p-2 w-full"></select>
      <p id="roveR8Hint" class="text-xs text-gray-600 mt-1"></p>
    </div>`;
  audioSection.appendChild(rovePicker);
  const audioNote = document.createElement("p");
  audioNote.id = "audioPlatformNote";
  audioNote.className = "text-sm text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded hidden";
  audioSection.appendChild(audioNote);
  const audioAccWrap = document.createElement("div");
  audioAccWrap.id = "audioAccWrap";
  audioAccWrap.className = "space-y-2";
  audioAccWrap.innerHTML = `
    <label id="audioExpWrap" class="hidden inline-flex items-start gap-2">
      <input id="audioExpMics" type="checkbox" class="border mt-1">
      <span>
        <span id="audioExpLabel" class="font-medium">Include expansion mics</span>
        <span id="audioExpSku" class="block text-xs text-gray-600"></span>
      </span>
    </label>
    <label id="audioEmWrap" class="hidden inline-flex items-start gap-2">
      <input id="audioEm" type="checkbox" class="border mt-1">
      <span>
        <span id="audioEmLabel" class="font-medium">Include expansion module</span>
        <span id="audioEmSku" class="block text-xs text-gray-600"></span>
      </span>
    </label>
    <label id="audioEm2Wrap" class="hidden inline-flex items-start gap-2">
      <input id="audioEm2" type="checkbox" class="border mt-1">
      <span>
        <span id="audioEm2Label" class="font-medium">Include second expansion module</span>
        <span id="audioEm2Sku" class="block text-xs text-gray-600"></span>
      </span>
    </label>
    <label id="audioPsuWrap" class="hidden inline-flex items-start gap-2">
      <input id="audioPsu" type="checkbox" class="border mt-1">
      <span>
        <span id="audioPsuLabel" class="font-medium">Include power supply if no PoE</span>
        <span id="audioPsuSku" class="block text-xs text-gray-600"></span>
      </span>
    </label>
    <label id="audioCat52mWrap" class="hidden inline-flex items-start gap-2">
      <input id="audioCat52m" type="checkbox" class="border mt-1">
      <span>
        <span id="audioCat52mLabel" class="font-medium">Include RJ45 CAT-5 2M</span>
        <span id="audioCat52mSku" class="block text-xs text-gray-600"></span>
      </span>
    </label>
    <label id="audioCat57mWrap" class="hidden inline-flex items-start gap-2">
      <input id="audioCat57m" type="checkbox" class="border mt-1">
      <span>
        <span id="audioCat57mLabel" class="font-medium">Include RJ45 CAT-5 7.6M</span>
        <span id="audioCat57mSku" class="block text-xs text-gray-600"></span>
      </span>
    </label>
    <label id="audioUsbMicroWrap" class="hidden inline-flex items-start gap-2">
      <input id="audioUsbMicro" type="checkbox" class="border mt-1">
      <span>
        <span id="audioUsbMicroLabel" class="font-medium">Include USB-A to Micro USB 1.2M</span>
        <span id="audioUsbMicroSku" class="block text-xs text-gray-600"></span>
      </span>
    </label>`;
  audioSection.appendChild(audioAccWrap);
  audioSection.appendChild(select("audioSupportTerm", "Select Support term", SUPPORT_OPTS));
  const audioLensOnboardLabel = document.createElement("label");
  audioLensOnboardLabel.className = "inline-flex items-start gap-2";
  audioLensOnboardLabel.innerHTML = `
    <input id="audioLensOnboard" type="checkbox" class="border mt-1">
    <span>
      <span class="font-medium">Poly Lens onboarding — PRO8700101AB</span>
      <span class="block text-xs text-gray-600">Register and configure up to 3 Poly hardware devices on Poly Lens cloud management portal</span>
    </span>`;
  audioSection.appendChild(audioLensOnboardLabel);
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

  panelVideo.appendChild(promoWrap);
  panelVideo.appendChild(form);
  panelVideo.appendChild(resultDiv);

  app.appendChild(panelVideo);
  app.appendChild(panelAudio);

  // Single compact legalese at bottom of page only
  const legalFooter = document.createElement("p");
  legalFooter.id = "legalFooter";
  legalFooter.className = "mt-6 w-full text-[15px] text-gray-500 border-t border-gray-300 pt-2 leading-snug";
  legalFooter.innerHTML = `<span class="italic text-red-600">*</span><strong class="underline">Please Note:</strong> Estimate only, SKUs + pricing are subject to change. Created with AI tools that seem to have a track record of accuracy, but please be aware there could be mistakes. Double-check SKUs, pricing, and support with your HP Poly team.`;
  app.appendChild(legalFooter);

  function syncLegalFooterVisibility() {
    legalFooter.classList.toggle("hidden", !!document.getElementById("bomGenTable"));
  }

  function setActiveTab(name) {
    panelVideo.classList.toggle("hidden", name !== "video");
    panelAudio.classList.toggle("hidden", name !== "audio");
    [["tabVideo", "video"], ["tabAudio", "audio"]].forEach(([id, key]) => {
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
    const panel = btn.getAttribute("data-panel");
    setActiveTab(panel);
  });

  const AUDIO_CATALOG = {
    Trio: {
      C60:  { teams: "849B6AA#ABA", sip: "849B4AA#ABA", support: "trio_c60",  exp: "85X02AA", psu: "85X03AA#ABA",
        teams_taa: "849B1AA",
        sip_taa: "849B3AA",
        teams_nr: "830A1AA",
        sip_nr: "830A2AA",
        teams_nr_taa: "84C21AA",
        sip_nr_taa: "849B2AA",
        cat5_2m: "85X04AA",
        cat5_7m: "85X05AA",
        usb_micro: "85X06AA",
        wifi: true, bt: true },
      "8300": { teams: null, sip: "849A0AA#AC3", support: "trio_8300", exp: "85X00AA", psu: "85W92AA#ABA",
        sip_taa: "849A2AA",
        teamsNote: "Trio 8300 is OpenSIP only (not native Teams, not SIP Gateway). BOM uses the OpenSIP SKU.",
        wifi: true, bt: true }
    },
    CCX: {
      "350": { teams: "848Z7AA#AC3", sip: null, support: "ccx_350", psu: "86H66AA#ABA",
        teams_taa: "8F3G3AA",
        sipNote: "CCX 350 is Teams-native only — no OpenSIP/Zoom SKU on the Voice sheet.",
        wifi: false, bt: false },
      "400": { teams: "848Z8AA#AC3", sip: "849A1AA#AC3", support: "ccx_400",
        teams_taa: "848Z9AA", sip_psu: "84C14AA",
        wifi: false, bt: false },
      "505": { teams: "82Z79AA", sip: "82Z82AA", support: "ccx_505", em: "8F3R9AA", psu: "86P04AA#ABA",
        teams_taa: "849A5AA", sip_psu: "84C16AA",
        wifi: true, bt: true },
      "600": { teams: "82Z84AA", sip: "82Z85AA", support: "ccx_600", em: "8F3R9AA", psu: "86P04AA#ABA",
        teams_taa: "849A8AA", sip_psu: "84C17AA",
        wifi: true, bt: true }
    },
    "Edge E": {
      E100: { sip: "82M86AA", support: "edge_e100", psu: "86H66AA#ABA", sip_taa: "8F3G5AA", sip_psu: "89B49AA", wifi: false, bt: false },
      E220: { sip: "82M87AA", support: "edge_e220", psu: "86H66AA#ABA", sip_taa: "8F3G6AA", sip_psu: "89B50AA", wifi: false, bt: true },
      E300: { sip: "82M92AA", support: "edge_e300", psu: "86H66AA#ABA", sip_taa: "8F3H1AA", sip_psu: "89B51AA", wifi: false, bt: false },
      E320: { sip: "82M88AA", support: "edge_e320", psu: "86H66AA#ABA", sip_taa: "8F3G7AA", sip_psu: "89B52AA", wifi: false, bt: true },
      E350: { sip: "82M89AA", support: "edge_e350", psu: "86H66AA#ABA", sip_taa: "8F3G8AA", sip_psu: "89B53AA", wifi: true, bt: true },
      E400: { sip: "82M93AA", support: "edge_e400", psu: "86H66AA#ABA", em: "85W93AA", emMax: 1, sip_taa: "8F3H2AA", sip_psu: "89B54AA", wifi: false, bt: false },
      E450: { sip: "82M90AA", support: "edge_e450", psu: "86H66AA#ABA", em: "85W93AA", emMax: 1, sip_taa: "8F3G9AA", sip_psu: "89B55AA", wifi: true, bt: true },
      E550: { sip: "82M91AA", support: "edge_e550", psu: "86P04AA#ABA", em: "85W93AA", emMax: 2, sip_taa: "8F3H0AA", sip_psu: "89B57AA", wifi: true, bt: true }
    },
    // Rove models live in the Rove picker (not this generic list)
  };
  function audioCfg() {
    const family = document.getElementById("audioFamily")?.value || "";
    const model = document.getElementById("audioModel")?.value || "";
    return (AUDIO_CATALOG[family] || {})[model] || null;
  }
  // NA 1920–1930 catalog keys only. No EU 8J8W*, no 85W96AA, no 84H81AA (30+B2 kit).
  const ROVE_PARTS = {
    kit_b1: { sku: "8F3E1AA#ABA", support: "rove_20_b1" },
    b2:     { sku: "84H80AA#ABA", support: "rove_b2" },
    b4:     { sku: "84H78AA#ABA", support: "rove_b4" },
    h20:    { sku: "8F3E4AA#ABA", support: "rove_20" },
    h30:    { sku: "84H76AA#ABA", support: "rove_30" },
    h40:    { sku: "84H77AA#ABA", support: "rove_40" },
    r8:     { sku: "84H79AA#ABA", support: "rove_r8" }
  };
  function roveSelInt(id, fallback) {
    const n = parseInt(document.getElementById(id)?.value || String(fallback), 10);
    return Number.isFinite(n) ? n : fallback;
  }
  function roveBaseQtyMax(base) {
    if (base === "B1") return 1;
    if (base === "B2") return 2;
    if (base === "B4") return 10;
    return 0;
  }
  function roveHandsetMax(base, baseQty) {
    if (base === "B1") return 10;
    if (base === "B2") return 20; // even if 2 bases — dual-cell is coverage, not 40 registrations
    if (base === "B4") return Math.min(30 * Math.max(1, baseQty || 1), 1000);
    return 0;
  }
  function roveR8Max(base) {
    if (base === "B1") return 3;
    if (base === "B2") return 6;
    if (base === "B4") return 3; // simple BOM 0–3, not 3 * base_qty
    return 0;
  }
  function roveFillSelect(sel, min, max, value) {
    if (!sel) return min;
    const lo = Math.max(0, min | 0);
    const hi = Math.max(lo, max | 0);
    let v = Number.isFinite(value) ? value : lo;
    if (v < lo) v = lo;
    if (v > hi) v = hi;
    sel.innerHTML = "";
    for (let n = lo; n <= hi; n++) {
      const opt = document.createElement("option");
      opt.value = String(n);
      opt.textContent = String(n);
      sel.appendChild(opt);
    }
    sel.value = String(v);
    return v;
  }
  function clampRoveHandsets(base, maxH, q20, q30, q40, clampId) {
    const min20 = base === "B1" ? 1 : 0;
    if (base === "B1" && q20 < 1) q20 = 1;
    q20 = Math.max(min20, q20 | 0);
    q30 = Math.max(0, q30 | 0);
    q40 = Math.max(0, q40 | 0);
    let sum = q20 + q30 + q40;
    if (sum > maxH) {
      const overflow = sum - maxH;
      if (clampId === "roveQty20") q20 = Math.max(min20, q20 - overflow);
      else if (clampId === "roveQty30") q30 = Math.max(0, q30 - overflow);
      else if (clampId === "roveQty40") q40 = Math.max(0, q40 - overflow);
    }
    sum = q20 + q30 + q40;
    if (sum > maxH) {
      let left = sum - maxH;
      const take40 = Math.min(q40, left); q40 -= take40; left -= take40;
      const take30 = Math.min(q30, left); q30 -= take30; left -= take30;
      q20 = Math.max(min20, q20 - left);
    }
    return { q20, q30, q40 };
  }
  let roveUpdating = false;
  let roveLastHandset = "roveQty20";
  function syncRovePicker(changedId) {
    if (roveUpdating) return;
    const family = document.getElementById("audioFamily")?.value || "";
    const picker = document.getElementById("rovePicker");
    const modelWrap = document.getElementById("audioModelWrap");
    const isRove = family === "Rove";
    if (picker) picker.classList.toggle("hidden", !isRove);
    if (modelWrap) modelWrap.classList.toggle("hidden", isRove);
    if (!isRove) return;
    const base = document.getElementById("roveBase")?.value || "";
    const hasBase = !!base;
    const qtyWrap = document.getElementById("roveBaseQtyWrap");
    const hsWrap = document.getElementById("roveHandsetWrap");
    const r8Wrap = document.getElementById("roveR8Wrap");
    if (qtyWrap) qtyWrap.classList.toggle("hidden", !hasBase);
    if (hsWrap) hsWrap.classList.toggle("hidden", !hasBase);
    if (r8Wrap) r8Wrap.classList.toggle("hidden", !hasBase);
    if (!hasBase) return;
    roveUpdating = true;
    try {
      const bMax = roveBaseQtyMax(base);
      let bQty = roveSelInt("roveBaseQty", 1);
      bQty = roveFillSelect(document.getElementById("roveBaseQty"), 1, bMax, bQty);
      const hint = document.getElementById("roveBaseQtyHint");
      if (hint) {
        if (base === "B1") hint.textContent = "B1 is a single-cell base (qty locked at 1).";
        else if (base === "B2") hint.textContent = "B2 dual-cell max is 2. Dual-cell is coverage, NOT 40 registrations.";
        else if (base === "B4") hint.textContent = "B4: 254 is legal; this UI caps base qty at 10.";
        else hint.textContent = "";
      }
      const maxH = roveHandsetMax(base, bQty);
      const min20 = base === "B1" ? 1 : 0;
      let q20 = roveSelInt("roveQty20", min20);
      let q30 = roveSelInt("roveQty30", 0);
      let q40 = roveSelInt("roveQty40", 0);
      if (changedId === "roveBase" && (q20 + q30 + q40) === 0) q20 = 1;
      const clamped = clampRoveHandsets(base, maxH, q20, q30, q40, changedId || roveLastHandset);
      q20 = clamped.q20; q30 = clamped.q30; q40 = clamped.q40;
      q20 = roveFillSelect(document.getElementById("roveQty20"), min20, maxH, q20);
      q30 = roveFillSelect(document.getElementById("roveQty30"), 0, maxH, q30);
      q40 = roveFillSelect(document.getElementById("roveQty40"), 0, maxH, q40);
      const hsHint = document.getElementById("roveHandsetHint");
      if (hsHint) {
        const used = q20 + q30 + q40;
        let cap = "Registration cap: " + maxH;
        if (base === "B1") cap += " (includes the B1 kit handset)";
        if (base === "B2") cap += " (20 even with 2 bases)";
        hsHint.textContent = cap + ". Using " + used + ".";
      }
      const maxR = roveR8Max(base);
      let qR8 = roveSelInt("roveQtyR8", 0);
      roveFillSelect(document.getElementById("roveQtyR8"), 0, maxR, qR8);
      const r8Hint = document.getElementById("roveR8Hint");
      if (r8Hint) {
        if (base === "B4") r8Hint.textContent = "Simple BOM: 0–3 R8 (not 3 × base qty).";
        else r8Hint.textContent = "Optional. Max " + maxR + " for this base.";
      }
    } finally {
      roveUpdating = false;
    }
  }
  function addRovePart(results, part, qty, supportTerm, usedKeys) {
    if (!qty || !part) return;
    addLine(results, part.sku, undefined, qty);
    addSupport(results, part.support, supportTerm, qty);
    if (usedKeys && part.support && !usedKeys.includes(part.support)) usedKeys.push(part.support);
  }
  function audioWantRadios() {
    return {
      wifi: !!document.getElementById("audioWifi")?.checked,
      bt: !!document.getElementById("audioBt")?.checked
    };
  }
  function audioHasNrSkus(cfg) {
    return !!(cfg && (cfg.teams_nr || cfg.sip_nr || cfg.teams_nr_taa || cfg.sip_nr_taa));
  }
  function audioModelMatchesRadios(cfg, wantWifi, wantBt) {
    if (!cfg) return false;
    // C60: both radios off uses existing NR SKUs (do not invent 8300 NR)
    if (!wantWifi && !wantBt && audioHasNrSkus(cfg)) return true;
    return !!cfg.wifi === wantWifi && !!cfg.bt === wantBt;
  }
  function audioModelOnPlatform(cfg, platform) {
    if (platform === "Zoom" || platform === "OpenSIP") return !!cfg.sip;
    return true;
  }
  // Per family+model+platform field notes. Do not use one CCX-wide Zoom/Teams sentence. Not Zoom Rooms.
  const NOTE_TEAMS_NATIVE = "Native Teams (Android + Teams Admin Center).";
  const NOTE_TEAMS_SIP_GW = "Teams SIP Gateway is calling only (no calendar, hot desk, boss/admin). BOM uses the OpenSIP SKU.";
  const NOTE_ZPA = "Native Zoom on CCX is Zoom Phone Appliance (ZPA), not Zoom Phone SIP and not Zoom Rooms. Hardware line is the OpenSIP SKU (no Zoom-branded HP PN). ZPA on CCX 400 needs Rev K or later. Zoom does not support PVOS 9.x for ZPA (use 8.1.8.x).";
  const NOTE_ZOOM_SIP = "Zoom Phone SIP (not ZPA, not Zoom Rooms). Different stack from CCX Zoom Phone Appliance. BOM uses the OpenSIP SKU.";
  const NOTE_PVOS_SWITCH = "On PVOS 7+ this model can switch Generic / Teams / Zoom Phone from the web UI. Factory -019/-025 SKUs were historical profile locks only (not sellable lines and they do not hide the other stack). BOM still uses the OpenSIP SKU as the hardware line.";
  const NOTE_OPENSIP_FAMILY = "OpenSIP family (Zoom Phone SIP + Teams SIP Gateway). No native Teams Android.";
  const EM60_PSU = "86H66AA#ABA";
  function audioEmVisible(family, model, platform, cfg) {
    if (!cfg || !cfg.em) return false;
    if (family === "Edge E") return true;
    if (family !== "CCX") return false;
    if (model !== "505" && model !== "600") return false;
    if (platform === "Zoom") return false;
    return platform === "Microsoft Teams" || platform === "OpenSIP";
  }
  function audioFieldNote(family, model, platform) {
    const isTeams = platform === "Microsoft Teams";
    const isZoom = platform === "Zoom";
    const isOpenSip = platform === "OpenSIP";
    if (isTeams) {
      if (family === "CCX") {
        if (model === "350" || model === "400" || model === "505" || model === "600") return NOTE_TEAMS_NATIVE;
      }
      if (family === "Trio") {
        if (model === "C60") return NOTE_TEAMS_NATIVE + " TAA/NR C60 uses the same Teams stack.";
        if (model === "8300") return "Trio 8300 is OpenSIP only (not native Teams, not SIP Gateway). BOM uses the OpenSIP SKU.";
      }
      if (family === "Edge E") return "Edge E is not native Teams. " + NOTE_TEAMS_SIP_GW;
      if (family === "Rove") return "Rove is not native Teams. " + NOTE_TEAMS_SIP_GW;
    }
    if (isZoom) {
      if (family === "CCX") {
        if (model === "350") return "CCX 350 is Teams-native only — no OpenSIP/Zoom SKU on the Voice sheet. Do not offer a ZPA path.";
        if (model === "400" || model === "505" || model === "600") return NOTE_ZPA;
      }
      if (family === "Trio" && model === "C60") return NOTE_ZOOM_SIP;
      if (family === "Trio" && model === "8300") return "Trio 8300 is not Zoom Phone certified; OpenSIP SKU only.";
      if (family === "Edge E" || family === "Rove") return NOTE_ZOOM_SIP;
    }
    if (isOpenSip) {
      if (family === "CCX") {
        if (model === "350") return "CCX 350 is Teams-native only — no OpenSIP/Zoom SKU on the Voice sheet. Cannot switch; Teams-only (no Generic).";
        if (model === "400" || model === "505" || model === "600") return NOTE_PVOS_SWITCH;
      }
      if (family === "Trio" && model === "C60") return NOTE_PVOS_SWITCH;
      if (family === "Trio" && model === "8300") return "Trio 8300 is OpenSIP only (not native Teams, not SIP Gateway). BOM uses the OpenSIP SKU.";
      if (family === "Edge E" || family === "Rove") return NOTE_OPENSIP_FAMILY;
    }
    return "";
  }
  function updateAudioNotesAndAcc() {
    const platform = document.getElementById("audioPlatform")?.value || "";
    const family = document.getElementById("audioFamily")?.value || "";
    const cfg = audioCfg();
    const note = document.getElementById("audioPlatformNote");
    const isTeams = platform === "Microsoft Teams";
    const model = document.getElementById("audioModel")?.value || "";
    let msg = "";
    if (family === "Rove") {
      msg = audioFieldNote(family, "", platform);
      const taaOn = !!document.getElementById("audioTaa")?.checked || !!document.getElementById("audioJitc")?.checked;
      if (taaOn) {
        const taaMsg = "No TAA/GSA SKU for this model on this platform (not invented). Commercial SKU will be used.";
        msg = msg ? msg + " " + taaMsg : taaMsg;
      }
    } else if (cfg) {
      msg = audioFieldNote(family, model, platform);
      const taaOn = !!document.getElementById("audioTaa")?.checked || !!document.getElementById("audioJitc")?.checked;
      const hasTaa = isTeams ? !!(cfg.teams_taa || cfg.sip_taa) : !!cfg.sip_taa;
      if (taaOn && !hasTaa) {
        const taaMsg = "No TAA/GSA SKU for this model on this platform (not invented). Commercial SKU will be used.";
        msg = msg ? msg + " " + taaMsg : taaMsg;
      }
      const radios = audioWantRadios();
      const nrOn = !radios.wifi && !radios.bt;
      const hasNr = isTeams
        ? (taaOn ? !!cfg.teams_nr_taa : !!cfg.teams_nr)
        : (taaOn ? !!cfg.sip_nr_taa : !!cfg.sip_nr);
      if (nrOn && (cfg.wifi || cfg.bt) && !hasNr) {
        const nrMsg = "No No-Radio SKU for this model on this platform (not invented). Commercial SKU will be used.";
        msg = msg ? msg + " " + nrMsg : nrMsg;
      }
    }
    if (cfg && audioEmVisible(family, model, platform, cfg) && family === "CCX" && model === "600") {
      const rev = "CCX 600 EM60 needs hw rev P or later (rev A–O, pre-Nov 2022, no EM60). Phone does not power the EM; BOM adds PSU 86H66AA#ABA with the module.";
      msg = msg ? msg + " " + rev : rev;
    }
    if (!cfg && family !== "Rove") {
      const familySel = document.getElementById("audioFamily")?.value || "";
      if (familySel) {
        const radios = audioWantRadios();
        const fam = AUDIO_CATALOG[familySel] || {};
        const any = Object.keys(fam).some(m => audioModelMatchesRadios(fam[m], radios.wifi, radios.bt) && audioModelOnPlatform(fam[m], platform));
        if (!any) {
          const emptyMsg = "No models in this family match the Wi-Fi/Bluetooth selection.";
          msg = msg ? msg + " " + emptyMsg : emptyMsg;
        }
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
      if (expLabel && show) expLabel.textContent = "Include expansion mics";
      const expSku = document.getElementById("audioExpSku");
      if (expSku) expSku.textContent = show ? cfg.exp : "";
      if (!show) {
        const cb = document.getElementById("audioExpMics");
        if (cb) cb.checked = false;
      }
    }
    if (emWrap) {
      const show = audioEmVisible(family, model, platform, cfg);
      emWrap.classList.toggle("hidden", !show);
      if (emLabel && show) emLabel.textContent = "Include expansion module";
      const emSku = document.getElementById("audioEmSku");
      if (emSku) emSku.textContent = (show && cfg && cfg.em) ? cfg.em : "";
      if (!show) {
        const cb = document.getElementById("audioEm");
        if (cb) cb.checked = false;
      }
    }
    const em2Wrap = document.getElementById("audioEm2Wrap");
    if (em2Wrap) {
      const show2 = !!(family === "Edge E" && cfg && cfg.em && cfg.emMax === 2);
      em2Wrap.classList.toggle("hidden", !show2);
      const em2Sku = document.getElementById("audioEm2Sku");
      if (em2Sku) em2Sku.textContent = show2 ? cfg.em : "";
      if (!show2) {
        const cb2 = document.getElementById("audioEm2");
        if (cb2) cb2.checked = false;
      }
    }
    if (psuWrap) {
      const show = !!(cfg && (cfg.psu || (!isTeams && cfg.sip_psu)));
      psuWrap.classList.toggle("hidden", !show);
      if (psuLabel && show) psuLabel.textContent = "Include power supply if no PoE";
      const psuSku = document.getElementById("audioPsuSku");
      if (psuSku) {
        psuSku.textContent = show
          ? (cfg.psu ? cfg.psu : ("phone+PSU " + cfg.sip_psu))
          : "";
      }
      if (!show) {
        const cb = document.getElementById("audioPsu");
        if (cb) cb.checked = false;
      }
    }
    const cat52mWrap = document.getElementById("audioCat52mWrap");
    const cat52mLabel = document.getElementById("audioCat52mLabel");
    if (cat52mWrap) {
      const show = !!(cfg && cfg.cat5_2m);
      cat52mWrap.classList.toggle("hidden", !show);
      if (cat52mLabel && show) cat52mLabel.textContent = "Include RJ45 CAT-5 2M";
      const cat52mSku = document.getElementById("audioCat52mSku");
      if (cat52mSku) cat52mSku.textContent = show ? cfg.cat5_2m : "";
      if (!show) {
        const cb = document.getElementById("audioCat52m");
        if (cb) cb.checked = false;
      }
    }
    const cat57mWrap = document.getElementById("audioCat57mWrap");
    const cat57mLabel = document.getElementById("audioCat57mLabel");
    if (cat57mWrap) {
      const show = !!(cfg && cfg.cat5_7m);
      cat57mWrap.classList.toggle("hidden", !show);
      if (cat57mLabel && show) cat57mLabel.textContent = "Include RJ45 CAT-5 7.6M";
      const cat57mSku = document.getElementById("audioCat57mSku");
      if (cat57mSku) cat57mSku.textContent = show ? cfg.cat5_7m : "";
      if (!show) {
        const cb = document.getElementById("audioCat57m");
        if (cb) cb.checked = false;
      }
    }
    const usbMicroWrap = document.getElementById("audioUsbMicroWrap");
    const usbMicroLabel = document.getElementById("audioUsbMicroLabel");
    if (usbMicroWrap) {
      const show = !!(cfg && cfg.usb_micro);
      usbMicroWrap.classList.toggle("hidden", !show);
      if (usbMicroLabel && show) usbMicroLabel.textContent = "Include USB-A to Micro USB 1.2M";
      const usbMicroSku = document.getElementById("audioUsbMicroSku");
      if (usbMicroSku) usbMicroSku.textContent = show ? cfg.usb_micro : "";
      if (!show) {
        const cb = document.getElementById("audioUsbMicro");
        if (cb) cb.checked = false;
      }
    }
  }
  function rebuildAudioModel() {
    const family = document.getElementById("audioFamily")?.value || "";
    const isRove = family === "Rove";
    const modelWrap = document.getElementById("audioModelWrap");
    if (modelWrap) modelWrap.classList.toggle("hidden", isRove);
    const picker = document.getElementById("rovePicker");
    if (picker) picker.classList.toggle("hidden", !isRove);
    const sel = document.getElementById("audioModel");
    if (isRove) {
      if (sel) {
        sel.innerHTML = '<option value="">--</option>';
        sel.value = "";
      }
      syncRovePicker();
      updateAudioNotesAndAcc();
      return;
    }
    if (!sel) return;
    const prev = sel.value;
    const radios = audioWantRadios();
    const platform = document.getElementById("audioPlatform")?.value || "";
    const fam = AUDIO_CATALOG[family] || {};
    const models = Object.keys(fam).filter(m => audioModelMatchesRadios(fam[m], radios.wifi, radios.bt) && audioModelOnPlatform(fam[m], platform));
    sel.innerHTML = '<option value="">--</option>' + models.map(m => `<option value="${m}">${m}</option>`).join("");
    sel.value = models.includes(prev) ? prev : "";
    updateAudioNotesAndAcc();
  }
  document.getElementById("audioFamily")?.addEventListener("change", rebuildAudioModel);
  document.getElementById("audioModel")?.addEventListener("change", updateAudioNotesAndAcc);
  document.getElementById("audioPlatform")?.addEventListener("change", rebuildAudioModel);
  document.getElementById("audioJitc")?.addEventListener("change", () => {
    if (document.getElementById("audioJitc")?.checked) {
      const taa = document.getElementById("audioTaa");
      if (taa) taa.checked = true;
    }
    updateAudioNotesAndAcc();
  });
  document.getElementById("audioTaa")?.addEventListener("change", () => {
    if (!document.getElementById("audioTaa")?.checked) {
      const jitc = document.getElementById("audioJitc");
      if (jitc) jitc.checked = false;
    }
    updateAudioNotesAndAcc();
  });
  document.getElementById("audioWifi")?.addEventListener("change", rebuildAudioModel);
  document.getElementById("audioBt")?.addEventListener("change", rebuildAudioModel);
  document.getElementById("roveBase")?.addEventListener("change", () => { syncRovePicker("roveBase"); updateAudioNotesAndAcc(); });
  document.getElementById("roveBaseQty")?.addEventListener("change", () => { syncRovePicker("roveBaseQty"); });
  document.getElementById("roveQty20")?.addEventListener("change", () => { roveLastHandset = "roveQty20"; syncRovePicker("roveQty20"); });
  document.getElementById("roveQty30")?.addEventListener("change", () => { roveLastHandset = "roveQty30"; syncRovePicker("roveQty30"); });
  document.getElementById("roveQty40")?.addEventListener("change", () => { roveLastHandset = "roveQty40"; syncRovePicker("roveQty40"); });
  document.getElementById("roveQtyR8")?.addEventListener("change", () => { syncRovePicker("roveQtyR8"); });
  rebuildAudioModel();

  // ---------- dynamic UI helpers ----------
  // Max A2 table mics per host (HP Poly Studio A2 admin guide)
  // V12: 1 | X32: 2 | X52/V52: 4 | X72/V72: 4 | G62: 8
  function a2MaxForSelection() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    const r = document.getElementById("roomSize")?.value || "";
    const isUSB = (t === "BYOD USB Bar only" || t === "Windows PC based solution");
    if (r === "Huddle") return 0;
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
    if (r === "Huddle") return t === "BYOD USB Bar only" ? "r30" : null;
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
  function updateGoogleMeetOption() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    const sel = document.getElementById("platform");
    if (!sel) return;
    const meet = [...sel.options].find(o => o.value === "Google Meet");
    if (!meet) return;
    const disable = t === "Windows PC based solution";
    meet.disabled = disable;
    meet.style.color = disable ? "#9ca3af" : "";
    if (disable && sel.value === "Google Meet") sel.value = "";
  }
  function updateHuddleAvailability() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    const sel = document.getElementById("roomSize");
    if (!sel) return;
    const huddle = [...sel.options].find(o => o.value === "Huddle");
    if (!huddle) return;
    const byod = t === "BYOD USB Bar only";
    huddle.disabled = !byod;
    huddle.style.color = huddle.disabled ? "#9ca3af" : "";
    if (!byod && sel.value === "Huddle") sel.value = "";
  }
  function updateSupportTermOptions() {
    const sel = document.getElementById("supportTerm");
    if (!sel) return;
    const family = hostFamily();
    const disable5 = family === "r30";
    [...sel.options].forEach(opt => {
      if (opt.value === "poly5" || opt.value === "analyze5") {
        opt.disabled = disable5;
        opt.style.color = disable5 ? "#9ca3af" : "";
      }
    });
    if (disable5 && (sel.value === "poly5" || sel.value === "analyze5")) sel.value = "";
  }
  function updatePlatformVisibility() {
    updateGoogleMeetOption();
    const t = document.getElementById("typeOfSystem")?.value || "";
    const wrap = document.getElementById("platformWrap");
    if (wrap) wrap.classList.remove("hidden");
    const hint = document.getElementById("platformHint");
    const p = document.getElementById("platform")?.value || "";
    if (!hint) return;
    if (t === "Windows PC based solution") {
      if (p === "Google Meet") {
        hint.textContent = "Google Meet is not available for Windows PC rooms.";
      } else if (!p) {
        hint.textContent = "Required for Windows PC solutions. Zoom and Teams add a room compute plus in-room TC10. Google Meet is not available for Windows PC rooms.";
      } else {
        hint.textContent = "Windows room compute and in-room TC10 are added for Zoom and Teams. Google Meet is not available for Windows PC rooms.";
      }
    } else {
      hint.textContent = "Select Zoom, Microsoft Teams, or Google Meet like Bill's original page. Camera and mic SKUs do not change by platform.";
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
      if (choice === "Wall" || choice === "Inverted wall") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9575864_en-US-1.pdf", "X30/X32/V12 wall mount quick start (PDF)");
      else if (choice === "Table") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9575871_en-US-1.pdf", "X30/X32/V12 stand quick start (PDF)");
      else qsg = qsgLink("https://docs.poly.com/bundle/studio-x-ug/page/poly-studio-x-hardware-installation.html", "X32/V12 hardware install (included display clamp)");
    } else if (family === "v52" || family === "x52") {
      included = (usb ? "V52" : "X52") + " includes a display clamp in the box. Wall, VESA, and table stand are sold separately.";
      if (choice === "Wall") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9580259_en-US-1.pdf", "X52/V52 wall mount quick start (PDF)");
      else if (choice === "VESA style display mount") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9580398_en-US-1.pdf", "X52/V52 VESA mount quick start (PDF)");
      else if (choice === "Table") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9580389_en-US-1.pdf", "X52/V52 table stand quick start (PDF)");
      else qsg = qsgLink(usb ? "https://kaas.hpcloud.hp.com/pdf-public/pdf_10363625_en-US-1.pdf" : "https://kaas.hpcloud.hp.com/pdf-public/pdf_9580293_en-US-1.pdf", usb ? "V52 display clamp quick start (PDF)" : "X52 display clamp quick start (PDF)");
    } else if (family === "v72" || family === "x72") {
      included = (usb ? "V72" : "X72") + " includes a wall mount in the box. No extra wall SKU. VESA and table stand are sold separately.";
      if (choice === "VESA style display mount") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9580991_en-US-1.pdf", "X70/X72/V72 display mount quick start (PDF)");
      else if (choice === "Table") qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9580192_en-US-1.pdf", "X70/X72/V72 stand quick start (PDF)");
      else qsg = qsgLink("https://kaas.hpcloud.hp.com/pdf-public/pdf_9576018_en-US-1.pdf", "X70 wall mount quick start (PDF)");
    } else if (family === "g62") {
      included = "G62 default is the video bar without a mounting plate (99T09AA commercial / TAA variants). Choose Mounting plate kit to use the G62 plate kit SKU instead of adding a separate plate.";
    } else if (family === "r30") {
      included = "R30 includes in-box mounting. Wall and VESA are extra P15/R30 mounts.";
    }
    hint.innerHTML = included + (qsg ? "<br>Quick start: " + qsg : "");
  }
  function cameraMountHintHtml(cam, choice) {
    let included = "";
    let qsg = "";
    if (cam === "E70") {
      included = "E70 is the only camera that includes both a display clamp and a wall mount in the box. VESA kit is sold separately.";
      if (choice === "VESA") qsg = qsgLink("https://cdn.cs.1worldsync.com/f2/f6/f2f666a4-534d-4221-9882-367ac6606549.pdf", "E70 display clamp quick start (PDF)");
      else qsg = qsgLink("https://cdn.cs.1worldsync.com/f2/f6/f2f666a4-534d-4221-9882-367ac6606549.pdf", "E70 in-box display clamp / wall mount (PDF)");
    } else if (cam === "E60") {
      included = "E60 includes a wall mount in the box. Ceiling and HDCI brackets are sold separately.";
      qsg = qsgLink("https://h30434.www3.hp.com/t5/Poly-Video-Conferencing-Knowledge-Base/How-to-unbox-and-set-up-the-Poly-Studio-E60/ta-p/9223557", "E60 unbox and setup (included wall mount)");
    }
    return included + (qsg ? "<br>Quick start: " + qsg : "");
  }
  function refreshCameraMountHintFor(selId, hintId, cam) {
    const hint = document.getElementById(hintId);
    const sel = document.getElementById(selId);
    if (!hint) return;
    const choice = sel ? (sel.value || "None") : "None";
    hint.innerHTML = cameraMountHintHtml(cam, choice);
  }
  function refreshCameraMountHint() {
    refreshCameraMountHintFor("cameraMount", "cameraMountHint", document.getElementById("cameraChoice")?.value || "None");
  }
  function fillCameraMountSelect(mountSel, cam) {
    if (!mountSel) return;
    const prev = mountSel.value;
    if (cam === "E70") {
      mountSel.innerHTML = `<option value="None">None — in-box display clamp and wall mount</option>`;
      mountSel.innerHTML += `<option value="VESA">VESA mount (875K7AA)</option>`;
    } else if (cam === "E60") {
      mountSel.innerHTML = `<option value="None">None — in-box wall mount</option>`;
      mountSel.innerHTML += `<option value="Ceiling">Ceiling mount (9W1A8AA#AC3)</option>`;
      if (getItem("89L88AA")) {
        mountSel.innerHTML += `<option value="HDCI">HDCI camera bracket (89L88AA)</option>`;
      }
    } else {
      mountSel.innerHTML = `<option value="None">None</option>`;
    }
    if ([...mountSel.options].some(o => o.value === prev)) mountSel.value = prev;
    else mountSel.value = "None";
  }
  function updateMountingOptions() {
    const wrap = document.getElementById("mountingWrap");
    const sel = document.getElementById("mounting");
    if (!wrap || !sel) return;
    const family = hostFamily();
    const prev = sel.value || "None";
    if (!family) {
      wrap.classList.add("hidden");
      sel.innerHTML = `<option value="None">None</option>`;
      sel.value = "None";
      refreshMountHint();
      return;
    }
    wrap.classList.remove("hidden");
    const opts = [{ value: "None", label: "None — use in-box mount" }];
    if (family === "r30") {
      opts[0] = { value: "None", label: "None — in-box mounting" };
      opts.push({ value: "Wall", label: "Wall (783S4AA)" });
      opts.push({ value: "VESA style display mount", label: "VESA style display mount (875L1AA)" });
    } else if (family === "g62") {
      opts[0] = { value: "None", label: "None — bar only (no mounting plate)" };
      opts.push({ value: "Kit", label: "Mounting plate kit" });
    } else if (family === "v12" || family === "x32") {
      opts[0] = { value: "None", label: "None — in-box display clamp" };
      opts.push({ value: "Wall", label: "Wall / VESA kit (875L6AA)" });
      opts.push({ value: "Table", label: "Table stand (875L5AA)" });
      opts.push({ value: "Inverted wall", label: "Inverted wall (875L7AA)" });
    } else if (family === "v52" || family === "x52") {
      opts[0] = { value: "None", label: "None — in-box display clamp" };
      opts.push({ value: "Wall", label: "Wall (875L8AA)" });
      opts.push({ value: "VESA style display mount", label: "VESA (875L9AA)" });
      opts.push({ value: "Table", label: "Table stand (875M0AA)" });
    } else if (family === "v72" || family === "x72") {
      opts[0] = { value: "None", label: "None — in-box wall mount" };
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
    const family = hostFamily();
    const wrap = document.getElementById("expansionMicWrap");
    if (family === "r30") {
      if (wrap) wrap.classList.add("hidden");
      sel.innerHTML = `<option value="None">None</option>`;
      sel.value = "None";
      const info = document.getElementById("expansionInfo");
      if (info) info.classList.add("hidden");
      refreshExpansionHint();
      return;
    }
    if (wrap) wrap.classList.remove("hidden");
    let prev = sel.value || "None";
    if (prev.includes("Existing IP")) prev = PREEXISTING_AUDIO;
    if (prev.includes("Single Analog Exp")) prev = ANALOG_MIC_VALUE;
    const analog = analogMicApplies();
    const opts = [{ value: "None", label: "None" }];
    opts.push({ value: PREEXISTING_AUDIO, label: PREEXISTING_AUDIO });
    if (analog) opts.push({ value: ANALOG_MIC_VALUE, label: "Single Analog Extension mics (875M6AA + 875M4AA)" });
    opts.push({ value: "New Black A2 table mic pod(s)", label: "New Black A2 table mic pod(s)" });
    opts.push({ value: "New White A2 table mic pod(s)", label: "New White A2 table mic pod(s)" });
    sel.innerHTML = opts.map(o => `<option value="${o.value}">${o.label}</option>`).join("");
    sel.value = opts.some(o => o.value === prev) ? prev : "None";
    const info = document.getElementById("expansionInfo");
    if (info) {
      const show = sel.value === PREEXISTING_AUDIO;
      info.classList.toggle("hidden", !show);
      info.textContent = "Pre-existing / 3rd party audio is noted only. Nothing is added to the BOM.";
    }
    refreshExpansionHint();
  }
  function refreshExpansionHint() {
    const hint = document.getElementById("expansionHint");
    if (!hint) return;
    const family = hostFamily();
    const exp = document.getElementById("expansionMic")?.value || "";
    if (family === "r30" || !exp || exp === "None" || exp === PREEXISTING_AUDIO) {
      hint.innerHTML = "";
      return;
    }
    if (exp.includes("Analog Extension") || exp.includes("Single Analog Exp")) {
      hint.innerHTML = "Quick start: " + qsgLink(ANALOG_QSG.href, ANALOG_QSG.label);
      return;
    }
    if (exp.includes("New White A2") || exp.includes("New Black A2")) {
      hint.innerHTML = "Quick start: " + qsgLink(A2_QSG.href, A2_QSG.label);
      return;
    }
    hint.innerHTML = "";
  }
  function extraIpPeripheralSelected() {
    const exp = document.getElementById("expansionMic")?.value || "";
    const cam = document.getElementById("cameraChoice")?.value || "None";
    const cam2 = document.getElementById("cameraChoice2")?.value || "None";
    const cam3 = document.getElementById("cameraChoice3")?.value || "None";
    const ipMic = exp.includes("New White A2") || exp.includes("New Black A2")
      || exp === PREEXISTING_AUDIO || exp.includes("Existing IP");
    const extraCam = (canShowCameraAddOn() && (cam === "E60" || cam === "E70"))
      || (canShowSecondaryCamera() && (cam2 === "E60" || cam2 === "E70"))
      || (canShowTertiaryCamera() && (cam3 === "E60" || cam3 === "E70"));
    return ipMic || extraCam;
  }
  function sctKitApplies(kit) {
    const family = hostFamily();
    const cam = document.getElementById("cameraChoice")?.value || "None";
    const exp = document.getElementById("expansionMic")?.value || "";
    const analogOn = exp.includes("Analog Extension") || exp.includes("Single Analog Exp");
    if (kit.camera) return canShowCameraAddOn() && cam === kit.camera;
    if (kit.analog) return analogOn && analogMicApplies();
    if (kit.families) return kit.families.includes(family);
    return false;
  }
  function refreshIntegratorAccessories() {
    const ngList = document.getElementById("netgearKitList");
    if (ngList && !ngList.dataset.built) {
      ngList.innerHTML = NETGEAR_KITS.map(k => {
        const purpose = k.label.includes(" — ") ? k.label.split(" — ").slice(1).join(" — ") : k.label;
        return `<label class="flex items-start gap-2"><input type="checkbox" class="border mt-0.5 netgearKit" data-sku="${k.sku}"><span><span class="font-medium">${k.sku}</span><span class="block text-xs text-gray-600">${purpose}</span></span></label>`;
      }).join("");
      ngList.dataset.built = "1";
    }
    const sctList = document.getElementById("sctKitList");
    if (sctList) {
      const prev = {};
      sctList.querySelectorAll("input.sctKit").forEach(cb => { prev[cb.dataset.sku] = cb.checked; });
      const kits = SCT_KITS.filter(sctKitApplies);
      if (!kits.length) {
        sctList.innerHTML = `<p class="text-gray-500">No SCT kits mapped for this Poly host/camera.</p>`;
      } else {
        sctList.innerHTML = kits.map(k => {
          const d1 = qsgLink(k.drawing, k.drawingLabel || "Technical drawing (PDF)");
          const d2 = k.drawing2 ? " · " + qsgLink(k.drawing2, k.drawing2Label || "Application guide (PDF)") : "";
          const checked = prev[k.sku] ? " checked" : "";
          return `<label class="flex items-start gap-2"><input type="checkbox" class="border mt-0.5 sctKit" data-sku="${k.sku}"${checked}><span><span class="font-medium">${k.sku}</span><span class="block text-xs text-gray-600">${k.purpose}</span><span class="block text-xs">${d1}${d2}</span></span></label>`;
        }).join("");
      }
    }
  }
  function updateNetgearVisibility() {
    refreshIntegratorAccessories();
  }
  function updateG6DockVisibility() {
    const wrap = document.getElementById("g6DockWrap");
    if (!wrap) return;
    const t = document.getElementById("typeOfSystem")?.value || "";
    const family = hostFamily();
    const show = t === "BYOD USB Bar only" && family !== "r30";
    wrap.classList.toggle("hidden", !show);
    if (!show) {
      const cb = document.getElementById("g6DockOpt");
      if (cb) cb.checked = false;
    }
  }
  function setPolarWrapVisible(wrapId, optId, show) {
    const wrap = document.getElementById(wrapId);
    if (!wrap) return;
    wrap.classList.toggle("hidden", !show);
    if (!show) {
      const cb = document.getElementById(optId);
      if (cb) cb.checked = false;
    }
  }
  function updatePolarFilterVisibility() {
    const family = hostFamily();
    const cam = document.getElementById("cameraChoice")?.value || "None";
    const show = (family === "x72" || family === "v72")
      || (canShowCameraAddOn() && cam === "E70");
    setPolarWrapVisible("polarFilterWrap", "polarFilterOpt", show);
    const show2 = canShowSecondaryCamera() && document.getElementById("cameraChoice2")?.value === "E70";
    setPolarWrapVisible("polarFilterWrap2", "polarFilterOpt2", show2);
    const show3 = canShowTertiaryCamera() && document.getElementById("cameraChoice3")?.value === "E70";
    setPolarWrapVisible("polarFilterWrap3", "polarFilterOpt3", show3);
  }
  function refreshDependentControls() {
    updateHuddleAvailability();
    updatePlatformVisibility();
    updateSupportTermOptions();
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
    if (hostFamily() === "x32" || r === "Small" || r === "Huddle") return false;
    if (t === "BYOD USB Bar only") return false;
    const roomOk = r === "Medium" || r === "Large" || r === "Very large";
    return roomOk && (t === "Android appliance based solution" || t === "Windows PC based solution");
  }
  function canShowSecondaryCamera() {
    return canShowCameraAddOn();
  }
  function canShowTertiaryCamera() {
    const t = document.getElementById("typeOfSystem")?.value || "";
    if (!canShowCameraAddOn()) return false;
    return hostFamily() === "g62" || t === "Windows PC based solution";
  }
  function extraCameraPicks() {
    const picks = [];
    const cam = document.getElementById("cameraChoice")?.value || "None";
    const cam2 = document.getElementById("cameraChoice2")?.value || "None";
    const cam3 = document.getElementById("cameraChoice3")?.value || "None";
    if (canShowCameraAddOn() && (cam === "E60" || cam === "E70")) picks.push(cam);
    if (canShowSecondaryCamera() && (cam2 === "E60" || cam2 === "E70")) picks.push(cam2);
    if (canShowTertiaryCamera() && (cam3 === "E60" || cam3 === "E70")) picks.push(cam3);
    return picks;
  }
  function updateOneCameraMountPower(cam, mountWrapId, mountSelId, hintId, powerWrapId, powerOptId) {
    const extra = cam === "E60" || cam === "E70";
    const mountSel = document.getElementById(mountSelId);
    const mountWrap = document.getElementById(mountWrapId);
    const powerWrap = document.getElementById(powerWrapId);
    fillCameraMountSelect(mountSel, extra ? cam : "None");
    if (!extra) {
      const hint = document.getElementById(hintId);
      if (hint) hint.textContent = "";
    }
    if (mountWrap) mountWrap.classList.toggle("hidden", !extra);
    if (powerWrap) powerWrap.classList.toggle("hidden", !extra);
    if (!extra) {
      const cb = document.getElementById(powerOptId);
      if (cb) cb.checked = false;
    } else {
      refreshCameraMountHintFor(mountSelId, hintId, cam);
    }
  }
  function updateCameraAccessoryVisibility() {
    const cam1 = canShowCameraAddOn() ? (document.getElementById("cameraChoice")?.value || "None") : "None";
    const cam2 = canShowSecondaryCamera() ? (document.getElementById("cameraChoice2")?.value || "None") : "None";
    const cam3 = canShowTertiaryCamera() ? (document.getElementById("cameraChoice3")?.value || "None") : "None";
    updateOneCameraMountPower(cam1, "cameraMountWrap", "cameraMount", "cameraMountHint", "cameraPowerWrap", "camPowerPoePP");
    updateOneCameraMountPower(cam2, "cameraMountWrap2", "cameraMount2", "cameraMountHint2", "cameraPowerWrap2", "camPowerPoePP2");
    updateOneCameraMountPower(cam3, "cameraMountWrap3", "cameraMount3", "cameraMountHint3", "cameraPowerWrap3", "camPowerPoePP3");
  }
  function updateCameraVisibility() {
    const allowed = canShowCameraAddOn();
    camWrap.classList.remove("hidden");
    const camSel = document.getElementById("cameraChoice");
    const hint = document.getElementById("cameraChoiceHint");
    if (camSel) {
      [...camSel.options].forEach(opt => {
        if (opt.value === "E60" || opt.value === "E70") {
          opt.disabled = !allowed;
          opt.style.color = allowed ? "" : "#9ca3af";
        }
      });
      if (!allowed) camSel.value = "None";
    }
    if (hint) {
      if (allowed) {
        hint.textContent = "E70 recommended for AI switching on X52.";
        hint.className = "text-xs text-gray-600 mt-1";
        hint.style.color = "";
      } else {
        hint.textContent = "Extra cameras are for Android or Windows PC Medium/Large/Very large (not X32, Small, Huddle, or USB bar).";
        hint.className = "text-xs mt-1";
        hint.style.color = "#9ca3af";
      }
    }
    const allowed2 = canShowSecondaryCamera();
    const wrap2 = document.getElementById("cameraWrap2");
    if (wrap2) wrap2.classList.remove("hidden");
    const camSel2 = document.getElementById("cameraChoice2");
    const hint2 = document.getElementById("cameraChoice2Hint");
    if (camSel2) {
      [...camSel2.options].forEach(opt => {
        if (opt.value === "E60" || opt.value === "E70") {
          opt.disabled = !allowed2;
          opt.style.color = allowed2 ? "" : "#9ca3af";
        }
      });
      if (!allowed2) camSel2.value = "None";
    }
    if (hint2) {
      if (allowed2) {
        hint2.textContent = "Second extra camera (max 2 except G62/PC).";
        hint2.className = "text-xs text-gray-600 mt-1";
        hint2.style.color = "";
      } else {
        hint2.textContent = "Extra cameras are for Android or Windows PC Medium/Large/Very large (not X32, Small, Huddle, or USB bar).";
        hint2.className = "text-xs mt-1";
        hint2.style.color = "#9ca3af";
      }
    }
    const allowed3 = canShowTertiaryCamera();
    const wrap3 = document.getElementById("cameraWrap3");
    if (wrap3) wrap3.classList.toggle("hidden", !allowed3);
    const camSel3 = document.getElementById("cameraChoice3");
    const hint3 = document.getElementById("cameraChoice3Hint");
    if (camSel3) {
      [...camSel3.options].forEach(opt => {
        if (opt.value === "E60" || opt.value === "E70") {
          opt.disabled = !allowed3;
          opt.style.color = allowed3 ? "" : "#9ca3af";
        }
      });
      if (!allowed3) camSel3.value = "None";
    }
    if (hint3) {
      hint3.textContent = "Third extra camera for G62 or PC.";
      hint3.className = "text-xs text-gray-600 mt-1";
      hint3.style.color = "";
    }
    updateCameraAccessoryVisibility();
  }

  document.getElementById("optJitc")?.addEventListener("change", () => {
    if (document.getElementById("optJitc")?.checked) {
      const taa = document.getElementById("optTaa");
      if (taa) taa.checked = true;
    }
  });
  document.getElementById("optTaa")?.addEventListener("change", () => {
    if (!document.getElementById("optTaa")?.checked) {
      const jitc = document.getElementById("optJitc");
      if (jitc) jitc.checked = false;
    }
  });
  ["platform", "typeOfSystem", "roomSize"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", refreshDependentControls);
  });
  document.getElementById("cameraChoice")?.addEventListener("change", () => {
    updateCameraAccessoryVisibility();
    updateNetgearVisibility();
    updatePolarFilterVisibility();
  });
  document.getElementById("cameraChoice2")?.addEventListener("change", () => {
    updateCameraAccessoryVisibility();
    updateNetgearVisibility();
    updatePolarFilterVisibility();
  });
  document.getElementById("cameraChoice3")?.addEventListener("change", () => {
    updateCameraAccessoryVisibility();
    updateNetgearVisibility();
    updatePolarFilterVisibility();
  });
  document.getElementById("expansionMic")?.addEventListener("change", () => {
    updateA2QtyVisibility();
    updateNetgearVisibility();
    refreshExpansionHint();
  });
  document.getElementById("mounting")?.addEventListener("change", refreshMountHint);
  document.getElementById("cameraMount")?.addEventListener("change", refreshCameraMountHint);
  document.getElementById("cameraMount2")?.addEventListener("change", () => {
    refreshCameraMountHintFor("cameraMount2", "cameraMountHint2", document.getElementById("cameraChoice2")?.value || "None");
  });
  document.getElementById("cameraMount3")?.addEventListener("change", () => {
    refreshCameraMountHintFor("cameraMount3", "cameraMountHint3", document.getElementById("cameraChoice3")?.value || "None");
  });
  refreshDependentControls();

  // ---------- promo button ----------
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener("click", () => {
      ["optTaa", "optJitc", "optNoRadio"].forEach(id => {
        const cb = document.getElementById(id);
        if (cb) cb.checked = false;
      });
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


  const COMPLIANCE_CHOICE_ORDER = ["commercial", "taa", "taa_nr", "jitc", "jitc_nr"];
  const COMPLIANCE_CHOICE_NAMES = {
    commercial: "Commercial",
    taa: "TAA",
    taa_nr: "TAA + No Radio",
    jitc: "JITC",
    jitc_nr: "JITC + No Radio"
  };
  const TC10_BLACK_SKUS = new Set(["875K5AA", "977L6AA", "977L7AA", "973F9AA", "973G0AA"]);
  const TC10_WHITE_SKUS = new Set(["973G1AA", "93S70AA", "9A135AA", "9A134AA"]);
  const TC10_HARDWARE_SKUS = new Set([...TC10_BLACK_SKUS, ...TC10_WHITE_SKUS]);
  const A2_POD_WHITE_COMM = "B22X4AA#AC3";
  const A2_POD_BLACK_COMM = "B22X6AA#AC3";
  const A2_BRIDGE_COMM = "B22X2AA#AC3";
  const A2_POD_WHITE_TAA = "B22X5AA";
  const A2_POD_BLACK_TAA = "B22X7AA";
  const A2_BRIDGE_TAA = "B22X3AA";
  const R30_TAA_DOCK = "9X478AA";
  function flagsForComplianceChoice(choice) {
    if (choice === "jitc_nr") return { taa: true, jitc: true, nr: true };
    if (choice === "jitc") return { taa: true, jitc: true, nr: false };
    if (choice === "taa_nr") return { taa: true, jitc: false, nr: true };
    if (choice === "taa") return { taa: true, jitc: false, nr: false };
    return { taa: false, jitc: false, nr: false };
  }
  function complianceChoiceFromFlags(flags) {
    flags = flags || {};
    if (flags.jitc && flags.nr) return "jitc_nr";
    if (flags.jitc) return "jitc";
    if (flags.taa && flags.nr) return "taa_nr";
    if (flags.taa) return "taa";
    return "commercial";
  }
  function currentHostKey() {
    const family = hostFamily();
    const mounting = document.getElementById("mounting")?.value;
    return (family === "g62" && mounting && mounting !== "None") ? "g62_kit" : family;
  }
  function hostHasComplianceSku(family, choice) {
    const row = HOST_SKUS[family];
    if (!row) return false;
    // Dedicated key, plus existing pickHost TAA → JITC fallback (V72). Do not treat TAA as JITC (V12).
    if (choice === "commercial") return !!row.commercial;
    if (choice === "taa") return !!(row.taa || row.jitc);
    if (choice === "taa_nr") return !!(row.taa_nr || row.jitc_nr);
    if (choice === "jitc") return !!row.jitc;
    if (choice === "jitc_nr") return !!row.jitc_nr;
    return false;
  }
  function hostSkuSet(hostKey) {
    const keys = [hostKey];
    if (hostKey === "g62" || hostKey === "g62_kit") keys.push("g62", "g62_kit");
    const set = new Set();
    keys.forEach(k => {
      const row = HOST_SKUS[k];
      if (!row) return;
      Object.values(row).forEach(s => { if (s) set.add(s); });
    });
    return set;
  }
  function tc10ColorForSku(sku) {
    if (TC10_BLACK_SKUS.has(sku)) return "black";
    if (TC10_WHITE_SKUS.has(sku)) return "white";
    return null;
  }
  function tc10ColorsOnBom(bom) {
    const colors = [];
    (bom && bom.results || []).forEach(r => {
      const c = tc10ColorForSku(r.sku);
      if (c && !colors.includes(c)) colors.push(c);
    });
    return colors;
  }
  function bomHasTc10Hardware(bom) {
    return (bom && bom.results || []).some(r => TC10_HARDWARE_SKUS.has(r.sku));
  }
  function tc10HasComplianceSku(color, choice) {
    if (color === "white") return choice !== "commercial";
    if (color === "black") return true;
    return false;
  }
  function controllerChoiceAvailable(choice, bom) {
    const colors = tc10ColorsOnBom(bom);
    if (!colors.length) return false;
    return colors.some(c => tc10HasComplianceSku(c, choice));
  }
  function controllerLabelSku(choice, bom) {
    const colors = tc10ColorsOnBom(bom);
    if (!colors.length) return null;
    const color = colors.includes("black") ? "black" : colors[0];
    if (!tc10HasComplianceSku(color, choice)) return null;
    return pickTc10(color, flagsForComplianceChoice(choice));
  }
  function snapTc10ChoiceIfUnavailable(bom) {
    if (!bom || !bomHasTc10Hardware(bom)) return;
    if (controllerChoiceAvailable(bom.tc10Choice, bom)) return;
    for (const choice of COMPLIANCE_CHOICE_ORDER) {
      if (controllerChoiceAvailable(choice, bom)) {
        bom.tc10Choice = choice;
        bom.tc10Flags = flagsForComplianceChoice(choice);
        return;
      }
    }
  }
  function updateLineSku(line, newSku) {
    if (!line || !newSku || line.sku === newSku) return;
    const item = getItem(newSku);
    line.sku = newSku;
    if (item) {
      if (item.description) line.description = item.description;
      line.msrp = (item.msrp != null) ? item.msrp : "";
    }
  }
  function remapA2ForDeviceFlags(results, flags) {
    const toTaa = !!flags.taa;
    const pairs = toTaa
      ? [[A2_POD_WHITE_COMM, A2_POD_WHITE_TAA], [A2_POD_BLACK_COMM, A2_POD_BLACK_TAA], [A2_BRIDGE_COMM, A2_BRIDGE_TAA]]
      : [[A2_POD_WHITE_TAA, A2_POD_WHITE_COMM], [A2_POD_BLACK_TAA, A2_POD_BLACK_COMM], [A2_BRIDGE_TAA, A2_BRIDGE_COMM]];
    results.forEach(line => {
      for (const [from, to] of pairs) {
        if (line.sku === from) { updateLineSku(line, to); break; }
      }
    });
  }
  function remapR30Dock(results, flags) {
    if (hostFamily() !== "r30") return;
    const idx = results.findIndex(r => r.sku === R30_TAA_DOCK);
    if (flags.taa) {
      if (idx >= 0) return;
      const hostSet = hostSkuSet("r30");
      const hostIdx = results.findIndex(r => hostSet.has(r.sku));
      const item = getItem(R30_TAA_DOCK);
      const line = {
        sku: R30_TAA_DOCK,
        description: (item && item.description) ? item.description : "(Custom item)",
        msrp: (item && item.msrp != null) ? item.msrp : "",
        quantity: 1
      };
      if (hostIdx >= 0) results.splice(hostIdx + 1, 0, line);
      else results.push(line);
    } else if (idx >= 0) {
      results.splice(idx, 1);
    }
  }
  function skuPriceSuffix(sku, includePrices) {
    if (!sku || !includePrices) return "";
    const item = getItem(sku);
    return " — " + fmtCurrency(item && item.msrp != null ? item.msrp : "");
  }
  function renderChoiceRowHtml(cbClass, dataAttr, choice, title, sku, includePrices, checked, disabled, skuNote) {
    const grey = disabled ? "opacity-40 text-gray-400 cursor-not-allowed" : "cursor-pointer";
    let html = `<label class="inline-flex items-start gap-2 ${grey}">`;
    html += `<input type="checkbox" class="${cbClass} border mt-1" ${dataAttr}="${choice}"${checked ? " checked" : ""}${disabled ? " disabled" : ""}>`;
    html += `<span><span class="font-medium">${title}</span>`;
    if (!disabled && sku) {
      html += `<span class="block text-xs text-gray-600">${sku}${skuNote || ""}${skuPriceSuffix(sku, includePrices)}</span>`;
    }
    html += `</span></label>`;
    return html;
  }
  function applyDeviceChoice(choice) {
    if (!lastBom || !lastBom.results) return;
    const flags = flagsForComplianceChoice(choice);
    const hostKey = currentHostKey();
    const newSku = hostKey ? pickHost(hostKey, flags) : null;
    if (newSku) {
      const oldSet = hostSkuSet(hostKey);
      const line = lastBom.results.find(r => oldSet.has(r.sku));
      if (line) updateLineSku(line, newSku);
    }
    remapA2ForDeviceFlags(lastBom.results, flags);
    remapR30Dock(lastBom.results, flags);
    lastBom.hostChoice = choice;
    lastBom.hostFlags = flags;
    renderBom();
  }
  function applyControllerChoice(choice) {
    if (!lastBom || !lastBom.results) return;
    const flags = flagsForComplianceChoice(choice);
    lastBom.results.forEach(line => {
      const color = tc10ColorForSku(line.sku);
      if (!color) return;
      updateLineSku(line, pickTc10(color, flags));
    });
    lastBom.tc10Choice = choice;
    lastBom.tc10Flags = flags;
    renderBom();
  }
  function renderQuoteOptionsHtml(bom) {
    if (!bom) return "";
    const gate = bom.hostFlags || bom.pcFlags || {};
    const taaOrJitc = !!(gate.taa || gate.jitc);
    const showDevice = taaOrJitc && typeof bom.hostChoice === "string";
    const showController = taaOrJitc && bomHasTc10Hardware(bom);
    const showPc = bom.pcPlatform === "teams" || bom.pcPlatform === "zoom";
    if (!showDevice && !showController && !showPc) return "";
    if (showController) snapTc10ChoiceIfUnavailable(bom);
    const hostKey = currentHostKey();
    const includePrices = !!bom.includePrices;
    const currentHost = bom.hostChoice;
    const currentTc10 = bom.tc10Choice;
    let html = `<div class="p-3 border-2 border-amber-400 rounded bg-amber-50 mb-3" id="quoteOptionsBox">`;
    html += `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">`;
    if (showDevice) {
      html += `<div>`;
      html += `<div class="block font-medium mb-2">Device</div>`;
      COMPLIANCE_CHOICE_ORDER.forEach(choice => {
        const flags = flagsForComplianceChoice(choice);
        const sku = hostKey ? pickHost(hostKey, flags) : null;
        const disabled = !sku || !hostHasComplianceSku(hostKey, choice);
        const checked = currentHost === choice && !disabled;
        const title = COMPLIANCE_CHOICE_NAMES[choice] || choice;
        html += renderChoiceRowHtml("device-choice-cb", "data-device-choice", choice, title, sku, includePrices, checked, disabled);
      });
      html += `</div>`;
    }
    if (showController) {
      html += `<div>`;
      html += `<div class="block font-medium mb-2">Controller</div>`;
      COMPLIANCE_CHOICE_ORDER.forEach(choice => {
        const sku = controllerLabelSku(choice, bom);
        const disabled = !controllerChoiceAvailable(choice, bom);
        const checked = currentTc10 === choice && !disabled;
        const title = COMPLIANCE_CHOICE_NAMES[choice] || choice;
        html += renderChoiceRowHtml("controller-choice-cb", "data-controller-choice", choice, title, sku, includePrices, checked, disabled);
      });
      html += `</div>`;
    }
    if (showPc) {
      const opts = getPcOptionMatrix(bom.pcPlatform, bom.pcFlags);
      const allNull = !opts.studio5 && !opts.studio7 && !opts.g9plus;
      html += `<div>`;
      html += `<div class="block font-medium mb-2">Room compute</div>`;
      if (allNull) {
        html += `<p class="text-xs text-gray-600 mb-2">No TAA/No-Radio Zoom compute SKU in this catalog (do not invent).</p>`;
      }
      PC_CHOICE_ORDER.forEach(choice => {
        const sku = opts[choice];
        const disabled = !sku;
        const checked = bom.pcChoice === choice && !!sku;
        const title = PC_CHOICE_NAMES[choice] || choice;
        const skuNote = sku === "A2TP1AA" ? " (includes TC10)" : "";
        html += renderChoiceRowHtml("pc-choice-cb", "data-pc-choice", choice, title, sku, includePrices, checked, disabled, skuNote);
      });
      html += `</div>`;
    }
    html += `</div></div>`;
    return html;
  }

  function applyPcChoice(choice) {
    if (!lastBom || !lastBom.results) return;
    const opts = getPcOptionMatrix(lastBom.pcPlatform, lastBom.pcFlags);
    const sku = opts[choice];
    if (!sku) return;

    let pcIdx = -1;
    let qty = 1;
    for (let i = 0; i < lastBom.results.length; i++) {
      if (PC_SKU_SET.has(lastBom.results[i].sku)) {
        if (pcIdx < 0) {
          pcIdx = i;
          qty = lastBom.results[i].quantity;
        }
      }
    }
    for (let i = lastBom.results.length - 1; i >= 0; i--) {
      if (PC_SKU_SET.has(lastBom.results[i].sku)) lastBom.results.splice(i, 1);
    }

    const item = getItem(sku);
    const line = {
      sku,
      description: (item && item.description) ? item.description : "(Custom item)",
      msrp: (item && item.msrp != null) ? item.msrp : "",
      quantity: qty
    };
    if (pcIdx >= 0 && pcIdx <= lastBom.results.length) lastBom.results.splice(pcIdx, 0, line);
    else lastBom.results.push(line);

    lastBom.pcChoice = choice;
    const kitHasTc10 = sku === "A2TP1AA";
    const tc10Flags = lastBom.tc10Flags || lastBom.hostFlags || complianceFlags();
    const inRoomTc10 = pickTc10("black", tc10Flags);
    const decQty = (arr, lineSku) => {
      const line = arr.find(r => r.sku === lineSku);
      if (!line) return;
      if ((line.quantity || 1) > 1) line.quantity -= 1;
      else arr.splice(arr.indexOf(line), 1);
    };
    if (kitHasTc10 && lastBom.hasInRoomTc10) {
      const blackLine = lastBom.results.find(r => TC10_BLACK_SKUS.has(r.sku));
      decQty(lastBom.results, blackLine ? blackLine.sku : inRoomTc10);
      const term = lastBom.supportTerm;
      const sSku = term && SUPPORT_MAP.tc10 && SUPPORT_MAP.tc10[term];
      if (sSku) decQty(lastBom.results, sSku);
      lastBom.hasInRoomTc10 = false;
    } else if (!kitHasTc10 && !lastBom.hasInRoomTc10) {
      addLine(lastBom.results, inRoomTc10);
      addSupport(lastBom.results, "tc10", lastBom.supportTerm);
      lastBom.hasInRoomTc10 = true;
    }
    const supportTerm = lastBom.supportTerm;
    if (lastBom.pcPlatform === "teams") {
      if (supportTerm && !resultsHaveSupport(lastBom.results, "g9plus_mtr")) {
        addSupport(lastBom.results, "g9plus_mtr", supportTerm);
      }
      removeSupportKey(lastBom.results, "zoom_pc");
    } else if (lastBom.pcPlatform === "zoom") {
      removeSupportKey(lastBom.results, "g9plus_mtr");
      if (supportTerm && !resultsHaveSupport(lastBom.results, "zoom_pc")) {
        addSupport(lastBom.results, "zoom_pc", supportTerm);
      }
    }
    renderBom();
  }


  function renderBom(focusIdx, caretPos, dest, bom) {
    dest = dest || resultDiv;
    bom = bom || lastBom;
    if (!bom) return;
    const { results, includePrices, googleMeetNote } = bom;
    orderFinalBomTable(results);
    const EXCEL_URL = "https://hpdigitalroom.sales.ext.hp.com/ls/220d4a87-7110-4c75-83aa-53af74106f7b/Yv7NSgCbYloyQ79p";
    const SPACES_URL = "https://www.hp.com/us-en/poly/spaces.html";
    const DIM_URL = "https://h30434.www3.hp.com/t5/Meeting-Room-Solutions/Dimensional-Drawings-for-Poly-Products-and-accessories/td-p/8738366";
    let html = `<p class="text-xs text-gray-500 mb-1">Build ${VERSION} — generated ${new Date().toLocaleDateString()}</p>`;
    html += `<p class="text-sm italic text-gray-600 mb-2">Disclaimer: Created with AI tools that seem to have a track record of accuracy, but please be aware that I could make mistakes.</p>`;
    html += `<p class="text-sm mb-1"><a class="text-blue-600 underline" target="_blank" rel="noopener" href="${EXCEL_URL}">Quoting Guide</a>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a class="text-blue-600 underline" target="_blank" rel="noopener" href="${SPACES_URL}">Poly Spaces</a></p>`;
    html += `<p class="text-sm mb-3"><a class="text-blue-600 underline" target="_blank" rel="noopener" href="${EXCEL_URL}">Glen Bevcar's Collab Reference Excel cheat sheet</a>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a class="text-blue-600 underline" target="_blank" rel="noopener" href="${DIM_URL}">Dimensional Drawings for Poly Products</a></p>`;
    html += `<h2 class="font-semibold mb-2">Your BOM<span class="italic text-red-600">*</span>:</h2>`;
    if (googleMeetNote) {
      html += `<p class="text-sm text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded mb-2">No Google Meet compute SKU is in this catalog. This BOM includes the USB bar only (no room PC or TC10).</p>`;
    }
    if (bom.sctQuoteNote) {
      html += `<p class="text-sm text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded mb-2">SCT prices are dealer quote, not Poly MSRP.</p>`;
    }
    html += renderQuoteOptionsHtml(bom);
    html += `<div class="flex justify-start mb-1"><button type="button" id="copyBomTableBtn" class="text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50">Copy table</button></div>`;
    html += `<table id="bomGenTable" class="w-full border-collapse text-sm"><thead><tr>`;
    html += `<th class="border px-4 py-2 text-left">Qty</th>`;
    html += `<th class="border px-4 py-2 text-left">SKU</th>`;
    html += `<th class="border px-4 py-2 text-left">Description</th>`;
    if (includePrices) html += `<th class="border px-4 py-2 text-left">MSRP</th>`;
    html += `</tr></thead><tbody>`;

    let grandTotal = 0;

    results.forEach((r, i) => {
      const sku = r.sku || "—";
      const qty = Number(r.quantity) || 0;
      const unit = (typeof r.msrp === "number") ? r.msrp : null;

      if (unit != null) {
        grandTotal += unit * qty;
      }

      const isPcRow = PC_SKU_SET.has(r.sku);
      html += `<tr class="${isPcRow ? "font-semibold bg-amber-50" : ""}">
        <td class="border px-4 py-2"><input type="number" min="0" class="bom-qty w-16 border rounded px-2 py-1 text-center" data-idx="${i}" value="${qty}"></td>
        <td class="border px-4 py-2">${sku}</td>
        <td class="border px-4 py-2">${r.description}</td>`;
      if (includePrices) {
        html += `<td class="border px-4 py-2">${fmtCurrency(r.msrp)}</td>`;
      }
      html += `</tr>`;
    });

    if (includePrices) {
      html += `<tr class="bg-blue-50 font-semibold">
        <td class="border px-4 py-2" colspan="3">Estimated MSRP Total<span class="italic text-red-600">*</span></td>
        <td class="border px-4 py-2">${fmtCurrency(grandTotal)}</td>
      </tr>`;
    }

    html += `</tbody>`;
    const colCount = includePrices ? 4 : 3;
    html += `<tfoot><tr><td colspan="${colCount}" class="border-t px-4 py-2 text-[15px] text-gray-500 leading-snug">${legalFooter.innerHTML}</td></tr></tfoot></table>`;
    // Priced-line footnote moved to table tfoot (full-width Please Note).


    if (bom.footnote) {
      html += `<p class="text-xs text-amber-800 mt-2">${bom.footnote}</p>`;
    }
    if (bom.closestNote) {
      html += `<p class="text-xs text-gray-600 mt-2">${bom.closestNote}</p>`;
    }

    dest.innerHTML = html;
    syncLegalFooterVisibility();
    const copyBtn = dest.querySelector("#copyBomTableBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const textOut = copyBomTableText(bom);
        try {
          await navigator.clipboard.writeText(textOut);
          copyBtn.textContent = "Copied";
          setTimeout(() => { copyBtn.textContent = "Copy table"; }, 1200);
        } catch (err) {
          copyBtn.textContent = "Copy failed";
          setTimeout(() => { copyBtn.textContent = "Copy table"; }, 1500);
        }
      });
    }
    if (focusIdx != null) {
      const el = dest.querySelector(`.bom-qty[data-idx="${focusIdx}"]`);
      if (el) {
        el.focus();
        const pos = (caretPos != null && caretPos >= 0) ? Math.min(caretPos, String(el.value).length) : String(el.value).length;
        try { el.setSelectionRange(pos, pos); } catch (e) { /* number inputs may not support selectionRange */ }
      }
    }
  }

  function handleBomQty(e, dest, getBom) {
    if (!e.target.classList.contains("bom-qty")) return;
    const idx = Number(e.target.getAttribute("data-idx"));
    const n = parseInt(e.target.value, 10);
    if (Number.isNaN(n) || n < 0) return;
    const bom = getBom();
    if (!bom || !bom.results[idx]) return;
    bom.results[idx].quantity = n;
    applyLensProBand(bom.results[idx]);
    const caret = (typeof e.target.selectionStart === "number") ? e.target.selectionStart : String(e.target.value).length;
    renderBom(idx, caret, dest, bom);
  }
  resultDiv.addEventListener("input", (e) => handleBomQty(e, resultDiv, () => lastBom));
  audioResult.addEventListener("input", (e) => handleBomQty(e, audioResult, () => lastAudioBom));
  resultDiv.addEventListener("change", (e) => {
    if (e.target.classList.contains("device-choice-cb")) {
      const choice = e.target.getAttribute("data-device-choice");
      if (!e.target.checked) {
        e.target.checked = true;
        return;
      }
      applyDeviceChoice(choice);
      return;
    }
    if (e.target.classList.contains("controller-choice-cb")) {
      const choice = e.target.getAttribute("data-controller-choice");
      if (!e.target.checked) {
        e.target.checked = true;
        return;
      }
      applyControllerChoice(choice);
      return;
    }
    if (e.target.classList.contains("pc-choice-cb")) {
      const choice = e.target.getAttribute("data-pc-choice");
      if (!e.target.checked) {
        e.target.checked = true;
        return;
      }
      applyPcChoice(choice);
      return;
    }
    handleBomQty(e, resultDiv, () => lastBom);
  });
  audioResult.addEventListener("change", (e) => handleBomQty(e, audioResult, () => lastAudioBom));

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
    const flags        = complianceFlags();

    const needsPlatform = true;
    const missing = [];
    if (!typeOfSystem) missing.push("System type");
    if (needsPlatform && !platform) missing.push("Primary platform");
    if (!roomSize) missing.push("Room size");
    if (missing.length) {
      resultDiv.innerHTML = `<div class="text-red-700 bg-red-50 border border-red-200 p-3 rounded">Please select ${missing.join(", ")} to generate a BOM. Optional fields default to None and are not required.</div>`;
      syncLegalFooterVisibility();
      return;
    }

    const results = [];
    const isUSBorPC = (typeOfSystem === "BYOD USB Bar only" || typeOfSystem === "Windows PC based solution");
    const family = hostFamily();

    // Host (unified TAA / JITC / No Radio / commercial)
    const hostKey = (family === "g62" && mounting && mounting !== "None") ? "g62_kit" : family;
    const hostSku = pickHost(hostKey, flags);
    if (hostSku) addLine(results, hostSku);
    const supportKey = (family === "r30") ? "r30"
      : (family === "g62" || hostKey === "g62_kit") ? "g62"
      : family;
    if (supportKey) addSupport(results, supportKey, supportTerm);

    // Huddle TAA dock (commercial 9U3U1AA already includes G5 dock)
    if (family === "r30" && flags.taa) {
      addLine(results, "9X478AA");
    }

    // V12 is USB-powered; always include the USB-C 65W adapter kit
    if (family === "v12" && !hasSku(results, "B42BFAA")) {
      addLine(results, "B42BFAA", "Poly USB-C 65W Power Adapter and Power Cord Kit");
    }

    const addInRoomTc10 = () => {
      addLine(results, pickTc10("black", flags));
      addSupport(results, "tc10", supportTerm);
    };

    let pcChoice = null;
    let pcPlatform = null;
    let hasInRoomTc10 = false;

    if (typeOfSystem === "Windows PC based solution") {
      if (platform === "Microsoft Teams" || platform === "Zoom") {
        pcPlatform = normalizePcPlatform(platform);
        const pcOpts = getPcOptionMatrix(pcPlatform, flags);
        pcChoice = defaultPcChoice(pcPlatform, flags, roomSize);
        if (pcChoice && pcOpts[pcChoice]) {
          addLine(results, pcOpts[pcChoice]);
          if (pcPlatform === "teams") addSupport(results, "g9plus_mtr", supportTerm);
          else addSupport(results, "zoom_pc", supportTerm);
        }
        const g9TaaKit = pcChoice && pcOpts[pcChoice] === "A2TP1AA";
        if (!g9TaaKit) addInRoomTc10();
        hasInRoomTc10 = !g9TaaKit;
      }
      // Google Meet: USB bar only, no PC, no TC10
    } else if (typeOfSystem === "Android appliance based solution") {
      addInRoomTc10();
    }
    // BYOD (including huddle R30): no in-room TC10

    // Scheduling panel
    if (scheduling && scheduling !== "None" && SCHEDULING_MAP[scheduling]) {
      const sch = SCHEDULING_MAP[scheduling];
      addLine(results, pickTc10(sch.color, flags), sch.label);
      addSupport(results, "tc10", supportTerm);
      if (sch.glassMount) addLine(results, sch.glassMount);
    }

    // A2 mics
    {
      const wantsA2White = (expansionMic || "").includes("New White A2");
      const wantsA2Black = (expansionMic || "").includes("New Black A2");
      if (wantsA2White || wantsA2Black) {
        const a2Qty = Math.max(1, Math.min(a2MaxForSelection(), parseInt(document.getElementById("a2Qty")?.value || "1", 10) || 1));
        if (flags.taa) {
          const podSku = wantsA2White ? "B22X5AA" : "B22X7AA";
          addLine(results, podSku, "(A2 mic pod TAA)", a2Qty);
          addSupport(results, "a2_mic", supportTerm, a2Qty);
          addLine(results, "B22X3AA");
          addSupport(results, "a2_bridge", supportTerm);
        } else {
          const podSku = wantsA2White ? "B22X4AA#AC3" : "B22X6AA#AC3";
          addLine(results, podSku, wantsA2White ? "Poly Studio A2 Table Microphone — White" : "Poly Studio A2 Table Microphone — Black", a2Qty);
          addSupport(results, "a2_mic", supportTerm, a2Qty);
          if (!hasSku(results, "B22X2AA#AC3")) {
            addLine(results, "B22X2AA#AC3", "Poly Studio A2 Audio Bridge");
          }
          addSupport(results, "a2_bridge", supportTerm);
        }
        if (!hasSku(results, "A02F9AA")) addLine(results, "A02F9AA", "PoE power injector for G62 or A2 Audio bridge");
      }
    }

    // Camera add-ons — keyed off hostFamily, not hasSku of a few SKUs
    // canShowCameraAddOn() is the source of truth: never emit E60/E70 when the add-on is not allowed
    {
      const extraCams = extraCameraPicks();
      extraCams.forEach(c => {
        if (c === "E60") {
          addLine(results, flags.taa ? "9W1A7AA" : "9W1A6AA#AC3");
          addSupport(results, "e60", supportTerm);
        } else if (c === "E70") {
          const e70sku = flags.jitc ? "886C9AA" : flags.taa ? "886C8AA" : "842F8AA";
          addLine(results, e70sku);
          addSupport(results, "e70", supportTerm);
          // E70 in-box: display clamp + wall mount. Do not add 875K8AA.
        }
      });
      [
        ["cameraMountWrap", "cameraMount"],
        ["cameraMountWrap2", "cameraMount2"],
        ["cameraMountWrap3", "cameraMount3"]
      ].forEach(([wrapId, selId]) => {
        const wrap = document.getElementById(wrapId);
        if (!wrap || wrap.classList.contains("hidden")) return;
        const camMount = document.getElementById(selId)?.value || "None";
        if (camMount === "Ceiling") addLine(results, "9W1A8AA#AC3", "Poly Studio E60 Ceiling Mount");
        else if (camMount === "HDCI") addLine(results, "89L88AA", "Poly Studio E60 EagleEye IV HDCI Camera Mounting Bracket");
        else if (camMount === "VESA") addLine(results, "875K7AA", "Poly Studio E70 VESA Mounting Kit");
      });
      let poeQty = 0;
      [["cameraPowerWrap", "camPowerPoePP"], ["cameraPowerWrap2", "camPowerPoePP2"], ["cameraPowerWrap3", "camPowerPoePP3"]].forEach(([wrapId, optId]) => {
        const wrap = document.getElementById(wrapId);
        const cb = document.getElementById(optId);
        if (cb?.checked && wrap && !wrap.classList.contains("hidden")) poeQty++;
      });
      if (poeQty > 0) addLine(results, "B5NH6AA", undefined, poeQty);
    }

    // HP USB-Ethernet dongle: one 4Z7Z7AA, no checkbox. A2 on V12/X32/X52/V52; camera E60/E70 on X52 only.
    {
      const a2On = (expansionMic || "").includes("New White A2") || (expansionMic || "").includes("New Black A2");
      const needUsbEth = (a2On && ["v12", "x32", "x52", "v52"].includes(family))
        || (family === "x52" && extraCameraPicks().length > 0);
      if (needUsbEth && !hasSku(results, "4Z7Z7AA")) {
        addLine(results, "4Z7Z7AA", "HP USB to Ethernet dongle", 1);
      }
    }

    // Analog expansion mics: 875M6AA mic + 875M4AA CAT5/6 extender dongle
    if ((expansionMic || "").includes("Analog Extension") || (expansionMic || "").includes("Single Analog Exp")) {
      addLine(results, "875M6AA");
      addLine(results, "875M4AA");
    }

    // Mounting extras — detect by hostFamily(); G62 kit vs base is pickHost
    if (mounting && mounting !== "None") {
      if (family === "r30") {
        if (mounting === "Wall") addLine(results, "783S4AA");
        else if (mounting === "VESA style display mount") addLine(results, "875L1AA");
      } else if (family === "v12" || family === "x32") {
        if (mounting === "Table") addLine(results, "875L5AA");
        else if (mounting === "Wall" || mounting === "VESA style display mount") addLine(results, "875L6AA");
        else if (mounting === "Inverted wall") addLine(results, "875L7AA");
      } else if (family === "x52" || family === "v52") {
        if (mounting === "Wall") addLine(results, "875L8AA");
        else if (mounting === "VESA style display mount") addLine(results, "875L9AA");
        else if (mounting === "Table") addLine(results, "875M0AA");
      } else if (family === "x72" || family === "v72") {
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
    if (document.getElementById("lensOnboard")?.checked) {
      addLine(results, "PRO8700101AB");
    }

    document.querySelectorAll("input.netgearKit:checked").forEach(cb => {
      const sku = cb.dataset.sku || "";
      if (sku) addLine(results, sku);
    });
    let sctAdded = false;
    document.querySelectorAll("input.sctKit:checked").forEach(cb => {
      const sku = cb.dataset.sku || "";
      if (!sku) return;
      const kit = SCT_KITS.find(k => k.sku === sku);
      addLine(results, sku, kit ? kit.purpose : sku);
      sctAdded = true;
    });
    const sctQuoteNote = sctAdded;

    let polarQty = 0;
    [["polarFilterWrap", "polarFilterOpt"], ["polarFilterWrap2", "polarFilterOpt2"], ["polarFilterWrap3", "polarFilterOpt3"]].forEach(([wrapId, optId]) => {
      const wrap = document.getElementById(wrapId);
      const cb = document.getElementById(optId);
      if (cb?.checked && wrap && !wrap.classList.contains("hidden")) polarQty++;
    });
    if (polarQty > 0) {
      addLine(results, "875K9AA", "Poly Studio E70/X70/X72/V72 Polarized Filter", polarQty);
      placePolarizerInBom(results);
    }

    const g6Wrap = document.getElementById("g6DockWrap");
    const g6On = document.getElementById("g6DockOpt")?.checked;
    if (g6On && g6Wrap && !g6Wrap.classList.contains("hidden") && typeOfSystem === "BYOD USB Bar only") {
      addLine(results, "9X481UT#ABA", "HP Thunderbolt 4 Ultra 180W G6 Dock", 1);
      addSupport(results, "g6_dock", supportTerm);
    }

    const hostChoice = complianceChoiceFromFlags(flags);
    const hostFlags = { taa: !!flags.taa, jitc: !!flags.jitc, nr: !!flags.nr };
    const tc10Choice = hostChoice;
    const tc10Flags = { taa: !!flags.taa, jitc: !!flags.jitc, nr: !!flags.nr };
    lastBom = {
      results,
      family,
      includePrices,
      googleMeetNote: !!(typeOfSystem === "Windows PC based solution" && platform === "Google Meet"),
      sctQuoteNote,
      typeOfSystem,
      platform,
      pcPlatform,
      pcChoice,
      pcFlags: { taa: !!flags.taa, jitc: !!flags.jitc, nr: !!flags.nr },
      hostChoice,
      hostFlags,
      tc10Choice,
      tc10Flags,
      hasInRoomTc10: !!hasInRoomTc10,
      supportTerm
    };
    snapTc10ChoiceIfUnavailable(lastBom);
    renderBom();
  }

  function mockError(el, msg) {
    el.innerHTML = `<div class="text-red-700 bg-red-50 border border-red-200 p-3 rounded">${msg}</div>`;
    syncLegalFooterVisibility();
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
    const isRove = family === "Rove";
    if (isRove) {
      const basePick = document.getElementById("roveBase")?.value || "";
      if (!basePick) missing.push("Base");
    } else if (!model) {
      missing.push("Model");
    }
    if (missing.length) {
      lastAudioBom = null;
      mockError(audioResult, "Please select " + missing.join(", ") + " to generate a BOM.");
      return;
    }
    if (isRove) {
      const base = document.getElementById("roveBase")?.value || "";
      let bQty = roveSelInt("roveBaseQty", 1);
      const bMax = roveBaseQtyMax(base);
      bQty = Math.max(1, Math.min(bMax || 1, bQty));
      const maxH = roveHandsetMax(base, bQty);
      const maxR = roveR8Max(base);
      let q20 = roveSelInt("roveQty20", base === "B1" ? 1 : 0);
      let q30 = roveSelInt("roveQty30", 0);
      let q40 = roveSelInt("roveQty40", 0);
      let qR8 = Math.max(0, Math.min(maxR, roveSelInt("roveQtyR8", 0)));
      const hs = clampRoveHandsets(base, maxH, q20, q30, q40, roveLastHandset);
      q20 = hs.q20; q30 = hs.q30; q40 = hs.q40;
      if (q20 + q30 + q40 < 1) {
        lastAudioBom = null;
        mockError(audioResult, "Please add at least 1 handset.");
        return;
      }
      const results = [];
      const usedKeys = [];
      if (base === "B1") {
        addRovePart(results, ROVE_PARTS.kit_b1, 1, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h20, q20 - 1, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h30, q30, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h40, q40, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.r8, qR8, supportTerm, usedKeys);
      } else if (base === "B2") {
        addRovePart(results, ROVE_PARTS.b2, bQty, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h20, q20, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h30, q30, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h40, q40, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.r8, qR8, supportTerm, usedKeys);
      } else if (base === "B4") {
        addRovePart(results, ROVE_PARTS.b4, bQty, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h20, q20, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h30, q30, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.h40, q40, supportTerm, usedKeys);
        addRovePart(results, ROVE_PARTS.r8, qR8, supportTerm, usedKeys);
      } else {
        lastAudioBom = null;
        mockError(audioResult, "Please select Base to generate a BOM.");
        return;
      }
      if (document.getElementById("audioLensOnboard")?.checked) addLine(results, "PRO8700101AB");
      const notes = [];
      const fieldNote = audioFieldNote("Rove", "", platform);
      if (fieldNote) notes.push(fieldNote);
      const jitc = !!document.getElementById("audioJitc")?.checked;
      const taa = !!document.getElementById("audioTaa")?.checked || jitc;
      if (taa) notes.push("No TAA/GSA SKU for this model on this platform (not invented). Commercial SKU will be used.");
      if (jitc) notes.push("No JITC phone SKU (not invented). TAA SKU used when one exists.");
      const seenSupportNote = new Set();
      usedKeys.forEach(key => {
        const map = SUPPORT_MAP[key] || {};
        if (supportTerm && !map[supportTerm]) {
          const n = "No " + supportTerm + " SKU mapped for this model (not invented).";
          if (!seenSupportNote.has(n)) { seenSupportNote.add(n); notes.push(n); }
        }
      });
      lastAudioBom = {
        results,
        includePrices,
        footnote: notes.length ? notes.join(" ") : null
      };
      renderBom(undefined, undefined, audioResult, lastAudioBom);
      return;
    }
    const cfg = audioCfg();
    if (!cfg) {
      lastAudioBom = null;
      mockError(audioResult, "Unknown family/model combination.");
      return;
    }
    const isTeams = platform === "Microsoft Teams";
    const jitc = !!document.getElementById("audioJitc")?.checked;
    const taa = !!document.getElementById("audioTaa")?.checked || jitc;
    const wifi = !!document.getElementById("audioWifi")?.checked;
    const bt = !!document.getElementById("audioBt")?.checked;
    const nr = !wifi && !bt;
    const psuOn = !!document.getElementById("audioPsu")?.checked;
    let sku = null;
    let usedTaaSku = false;
    let usedSipPsu = false;
    let usedNrSku = false;
    if (isTeams) {
      if (nr && taa && cfg.teams_nr_taa) { sku = cfg.teams_nr_taa; usedTaaSku = true; usedNrSku = true; }
      else if (nr && cfg.teams_nr) { sku = cfg.teams_nr; usedNrSku = true; }
      else if (taa && cfg.teams_taa) { sku = cfg.teams_taa; usedTaaSku = true; }
      else if (cfg.teams) sku = cfg.teams;
      else if (nr && taa && cfg.sip_nr_taa) { sku = cfg.sip_nr_taa; usedTaaSku = true; usedNrSku = true; }
      else if (nr && cfg.sip_nr) { sku = cfg.sip_nr; usedNrSku = true; }
      else if (taa && cfg.sip_taa) { sku = cfg.sip_taa; usedTaaSku = true; }
      else sku = cfg.sip;
    } else {
      if (nr && taa && cfg.sip_nr_taa) { sku = cfg.sip_nr_taa; usedTaaSku = true; usedNrSku = true; }
      else if (nr && cfg.sip_nr) { sku = cfg.sip_nr; usedNrSku = true; }
      else if (taa && cfg.sip_taa) { sku = cfg.sip_taa; usedTaaSku = true; }
      else if (psuOn && cfg.sip_psu) { sku = cfg.sip_psu; usedSipPsu = true; }
      else sku = cfg.sip; // Zoom/OpenSIP: never fall back to a Teams SKU (CCX 350)
    }
    if (!sku) {
      lastAudioBom = null;
      mockError(audioResult, cfg.sipNote || cfg.teamsNote || "No SKU for this platform/model (not invented).");
      return;
    }
    const results = [];
    addLine(results, sku);
    addSupport(results, cfg.support, supportTerm);
    if (document.getElementById("audioExpMics")?.checked && cfg.exp) addLine(results, cfg.exp);
    let emQty = 0;
    if (document.getElementById("audioEm")?.checked && audioEmVisible(family, model, platform, cfg)) {
      emQty = (family === "Edge E" && cfg.emMax === 2 && document.getElementById("audioEm2")?.checked) ? 2 : 1;
      addLine(results, cfg.em, undefined, emQty);
      if (family === "CCX") {
        addSupport(results, "ccx_em60", supportTerm, emQty);
        addLine(results, EM60_PSU); // phone does not power EM60
      }
      if (family === "Edge E") addSupport(results, "edge_em", supportTerm, emQty);
    }
    if (psuOn && cfg.psu && !usedSipPsu) addLine(results, cfg.psu);
    if (document.getElementById("audioCat52m")?.checked && cfg.cat5_2m) addLine(results, cfg.cat5_2m);
    if (document.getElementById("audioCat57m")?.checked && cfg.cat5_7m) addLine(results, cfg.cat5_7m);
    if (document.getElementById("audioUsbMicro")?.checked && cfg.usb_micro) addLine(results, cfg.usb_micro);
    if (document.getElementById("audioLensOnboard")?.checked) addLine(results, "PRO8700101AB");
    const notes = [];
    const fieldNote = audioFieldNote(family, model, platform);
    if (fieldNote) notes.push(fieldNote);
    if (family === "CCX" && emQty && model === "600") {
      notes.push("CCX 600 EM60 needs hw rev P or later (rev A–O, pre-Nov 2022, no EM60).");
    }
    if (family === "Edge E" && emQty === 2) {
      notes.push("Second Edge E expansion module needs 802.3at PoE+ or a PSU on the host.");
    }
    if (taa && !usedTaaSku) {
      notes.push("No TAA/GSA SKU for this model on this platform (not invented). Commercial SKU will be used.");
    }
    if (jitc) {
      notes.push("No JITC phone SKU (not invented). TAA SKU used when one exists.");
    }
    if (nr && (cfg.wifi || cfg.bt) && !usedNrSku) {
      notes.push("No No-Radio SKU for this model on this platform (not invented). Commercial SKU will be used.");
    }
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
}

window.onload = init;
