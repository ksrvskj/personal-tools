/* ========== ICON LIBRARY ========== */
/* All SVGs: viewBox 0 0 24 24 · stroke-based · stroke-width 1.5 · round caps/joins · no fill */
/* Usage: <script src="icons.js"></script> then ICONS.hub.workout, ICONS.cat.soup, etc. */

const ICONS = {

  // ===== HUB =====
  hub: {
    workout: `<svg viewBox="0 0 24 24"><circle cx="12" cy="3.5" r="2"/><path d="M7 8h10"/><path d="M12 8v6"/><path d="M8 21l4-7 4 7"/><path d="M7 8l-2-3"/><path d="M17 8l2-3"/></svg>`,
    recipes: `<svg viewBox="0 0 24 24"><path d="M4 11h16v7a3 3 0 01-3 3H7a3 3 0 01-3-3v-7z"/><path d="M2 11h20"/><path d="M8 4c0 2 2 3 0 5"/><path d="M12 3c0 2 2 3 0 5"/><path d="M16 4c0 2 2 3 0 5"/></svg>`,
    coffee: `<svg viewBox="0 0 24 24"><path d="M5 9h12v8a3 3 0 01-3 3H8a3 3 0 01-3-3V9z"/><path d="M17 11h1.5a2.5 2.5 0 010 5H17"/><path d="M8 5c0-1 .5-2 1.5-2"/><path d="M12 5c0-1 .5-2 1.5-2"/></svg>`
  },

  // ===== RECIPE CATEGORIES — TOP LEVEL =====
  cat: {
    // Batch subcategories
    soup: `<svg viewBox="0 0 24 24"><path d="M4 11h16v7a3 3 0 01-3 3H7a3 3 0 01-3-3v-7z"/><path d="M2 11h20"/><path d="M8 4c0 2 2 3 0 5"/><path d="M12 3c0 2 2 3 0 5"/><path d="M16 4c0 2 2 3 0 5"/></svg>`,
    curry: `<svg viewBox="0 0 24 24"><path d="M2 12h20"/><path d="M2 12c0 5 4.5 9 10 9s10-4 10-9"/><path d="M12 12v9"/><circle cx="8" cy="16" r=".7" stroke-width="1.8"/><circle cx="9" cy="18.5" r=".5" stroke-width="1.6"/><path d="M15 15.5c1.2 0 1.8.8 1.8 1.5"/></svg>`,
    pasta: `<svg viewBox="0 0 24 24"><path d="M10 5v5"/><path d="M12 5v5"/><path d="M14 5v5"/><path d="M10 10c0 1.5 1 2.5 2 2.5s2-1 2-2.5"/><path d="M12 12.5v8.5"/><path d="M7 11c2-1 4-1.5 5-1.5"/><path d="M17 11c-2-1-4-1.5-5-1.5"/><path d="M7 14c2.5-.8 4.5-1 5-1"/><path d="M17 14c-2.5-.8-4.5-1-5-1"/></svg>`,
    skillet: `<svg viewBox="0 0 24 24"><circle cx="10" cy="14" r="7"/><path d="M17 14h5"/><path d="M7 8c0 1.5 1 2.5 0 4"/><path d="M11 7c0 1.5 1 2.5 0 4"/></svg>`,

    // Top-level categories
    batch: `<svg viewBox="0 0 24 24"><path d="M4 11h16v7a3 3 0 01-3 3H7a3 3 0 01-3-3v-7z"/><path d="M2 11h20"/><path d="M8 4c0 2 2 3 0 5"/><path d="M12 3c0 2 2 3 0 5"/><path d="M16 4c0 2 2 3 0 5"/></svg>`,
    breakfast: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="18" rx="8" ry="3"/><ellipse cx="12" cy="14" rx="7" ry="2.5"/><ellipse cx="12" cy="10.5" rx="6" ry="2"/><path d="M18 14v4"/><path d="M6 14v4"/><path d="M17 10.5v3.5"/><path d="M7 10.5v3.5"/><path d="M14 6c1.5 0 3 .8 3 2s-1 1.5-2 1"/></svg>`,
    grains: `<svg viewBox="0 0 24 24"><path d="M3 12a9 5 0 0018 0"/><path d="M3 12c0 5 4 9 9 9s9-4 9-9"/><circle cx="9" cy="14" r=".8" stroke-width="1.5"/><circle cx="12" cy="13" r=".8" stroke-width="1.5"/><circle cx="15" cy="14" r=".8" stroke-width="1.5"/><circle cx="10.5" cy="16.5" r=".6" stroke-width="1.5"/><circle cx="13.5" cy="16.5" r=".6" stroke-width="1.5"/></svg>`,
    ferment: `<svg viewBox="0 0 24 24"><rect x="5" y="6" width="14" height="14" rx="2"/><path d="M8 6V4h8v2"/><path d="M5 9h14"/><circle cx="9" cy="13" r=".7" stroke-width="1.5"/><circle cx="12" cy="15" r=".5" stroke-width="1.5"/><circle cx="14" cy="12" r=".6" stroke-width="1.5"/></svg>`,
    baking: `<svg viewBox="0 0 24 24"><path d="M4 18h16"/><path d="M5 18l1-10h12l1 10"/><path d="M6 8c0-3 2.5-5 6-5s6 2 6 5"/><path d="M9 12l3-2 3 2"/></svg>`,
    slow: `<svg viewBox="0 0 24 24"><path d="M12 22c-4 0-7-2.5-7-6 0-4 3-6 4-9 .5 2 2 3 2 3s1.5-2.5 1-5c3 2 4 5 4 8 0 3.5-2 5.5-4.5 5.5"/><path d="M12 22c-1.5 0-3-1-3-3 0-2 1.5-3 2-4.5.3 1 1 1.5 1 1.5s.5-1 .5-2c1 1 1.5 2.5 1.5 4 0 2-1 3-2 3z"/><path d="M4 22h16"/></svg>`
  },

  // ===== COFFEE METHODS =====
  coffee: {
    chemex: `<svg viewBox="0 0 24 24"><path d="M6 3h12"/><path d="M6 3l4 8"/><path d="M18 3l-4 8"/><path d="M10 11h4"/><rect x="9" y="10" width="6" height="3" rx=".5"/><path d="M10 13c-3 1-5 4-5 7h14c0-3-2-6-5-7"/><path d="M5 20h14"/></svg>`,
    v60: `<svg viewBox="0 0 24 24"><path d="M5 4h14"/><path d="M7 4l5 15 5-15"/><path d="M9.5 6l2 7"/><path d="M12 5v9"/><path d="M14.5 6l-2 7"/><path d="M12 19v2"/><path d="M10 21h4"/></svg>`,
    aeropress: `<svg viewBox="0 0 24 24"><path d="M7 2h10"/><path d="M8 2v8"/><path d="M16 2v8"/><rect x="7" y="8" width="10" height="9" rx=".5"/><rect x="9" y="9" width="6" height="2.5" rx=".5"/><path d="M6 17h12"/><path d="M7 17v1h10v-1"/><path d="M12 20.5c0 0-.8 1.2-.8 1.8a.8.8 0 001.6 0c0-.6-.8-1.8-.8-1.8z"/></svg>`
  },

  // ===== WORKOUT TIERS =====
  tier: {
    moon: `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
    sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M4.93 4.93l2.12 2.12"/><path d="M16.95 16.95l2.12 2.12"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="M4.93 19.07l2.12-2.12"/><path d="M16.95 7.05l2.12-2.12"/></svg>`,
    lightning: `<svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>`
  },

  // ===== DIETARY TAGS (use at 16-20px) =====
  tag: {
    vegan: `<svg viewBox="0 0 24 24"><path d="M17 3c-6 0-12 5-12 12"/><path d="M5 15c4-1 8-4 12-12"/><path d="M5 21c0-4 2-7 5-9"/></svg>`,
    gf: `<svg viewBox="0 0 24 24"><path d="M12 21v-9"/><path d="M9 15l3-3 3 3"/><path d="M10 11l2-2 2 2"/><path d="M11 8l1-1 1 1"/><path d="M6 19L18 5" stroke-width="1.3"/></svg>`,
    fast: `<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M10 2h4"/><path d="M12 2v2"/></svg>`,
    protein: `<svg viewBox="0 0 24 24"><path d="M6.5 9v6"/><path d="M17.5 9v6"/><path d="M4 10v4"/><path d="M20 10v4"/><path d="M6.5 12h11"/></svg>`,
    comfort: `<svg viewBox="0 0 24 24"><path d="M12 20c0 0-8-5.5-8-10.5a4.5 4.5 0 019 0 4.5 4.5 0 019 0c0 5-8 10.5-8 10.5z"/></svg>`,
    hp: `<svg viewBox="0 0 24 24"><path d="M6.5 9v6"/><path d="M17.5 9v6"/><path d="M4 10v4"/><path d="M20 10v4"/><path d="M6.5 12h11"/></svg>`
  },

  // ===== UI =====
  ui: {
    share: `<svg viewBox="0 0 24 24"><path d="M18 8l-6-6-6 6"/><path d="M12 2v13"/><path d="M4 14v5a2 2 0 002 2h12a2 2 0 002-2v-5"/></svg>`,
    back: `<svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>`,
    info: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><circle cx="12" cy="8" r=".01" stroke-width="2.5"/></svg>`
  }
};

// Helper: extract inner SVG content for use inside existing <svg> wrapper
function iconInner(svg) {
  const m = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return m ? m[1] : '';
}