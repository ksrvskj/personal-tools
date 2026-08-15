/*
 * Compact, dependency-free exercise diagrams for workout.html.
 *
 * Usage:
 *   element.innerHTML = WorkoutDiagrams.render(
 *     'split-squat',
 *     'Сплит-присед',
 *     'Исходное положение и нижняя точка упражнения.'
 *   );
 */
(function (root) {
  'use strict';

  let renderCount = 0;

  const colour = Object.freeze({
    ink: '#d8d3cb',
    muted: '#77747a',
    floor: '#57545a',
    burgundy: '#b75a72',
    blue: '#5b8fbd',
    gold: '#caa35b'
  });

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function slug(value) {
    const clean = String(value || 'exercise')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return clean || 'exercise';
  }

  function stroke(tone, width, opacity, dash) {
    const parts = [
      `stroke="${colour[tone] || tone || colour.ink}"`,
      'fill="none"',
      `stroke-width="${width || 3}"`,
      'stroke-linecap="round"',
      'stroke-linejoin="round"',
      'vector-effect="non-scaling-stroke"'
    ];
    if (opacity != null) parts.push(`opacity="${opacity}"`);
    if (dash) parts.push(`stroke-dasharray="${dash}"`);
    return parts.join(' ');
  }

  function line(x1, y1, x2, y2, tone, width, opacity, dash) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${stroke(tone, width, opacity, dash)}/>`;
  }

  function path(d, tone, width, opacity, dash) {
    return `<path d="${d}" ${stroke(tone, width, opacity, dash)}/>`;
  }

  function poly(points, tone, width, opacity, dash) {
    return `<polyline points="${points}" ${stroke(tone, width, opacity, dash)}/>`;
  }

  function circle(cx, cy, r, tone, width, opacity) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" ${stroke(tone, width, opacity)}/>`;
  }

  function filledCircle(cx, cy, r, tone, opacity) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${colour[tone] || tone}"${opacity == null ? '' : ` opacity="${opacity}"`}/>`;
  }

  function rect(x, y, width, height, radius, tone, lineWidth, opacity, dash) {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius || 0}" ${stroke(tone, lineWidth, opacity, dash)}/>`;
  }

  function text(x, y, value, tone, size, weight, anchor) {
    return `<text x="${x}" y="${y}" fill="${colour[tone] || tone || colour.muted}" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="${size || 10}" font-weight="${weight || 650}" text-anchor="${anchor || 'middle'}">${escapeHtml(value)}</text>`;
  }

  function ground(x1, x2, y) {
    return line(x1 == null ? 10 : x1, y == null ? 132 : y, x2 == null ? 310 : x2, y == null ? 132 : y, 'floor', 1.5, 0.55);
  }

  function mat(x1, x2, y) {
    const yy = y == null ? 130 : y;
    return line(x1, yy, x2, yy, 'blue', 3, 0.34);
  }

  function head(x, y, scale, opacity) {
    return circle(x, y, 6 * (scale || 1), 'ink', 2.6, opacity);
  }

  function phase(x, number) {
    return [
      filledCircle(x, 14, 9.5, 'muted', 0.24),
      text(x, 18, number, 'ink', 11, 750)
    ].join('');
  }

  function arrow(d, context, tone, width, opacity, dash) {
    const marker = tone === 'blue' ? context.blueArrow : context.burgundyArrow;
    return `<path d="${d}" ${stroke(tone || 'burgundy', width || 2.4, opacity == null ? 1 : opacity, dash)} marker-end="url(#${marker})"/>`;
  }

  function guideLine(x1, y1, x2, y2, opacity) {
    return line(x1, y1, x2, y2, 'gold', 1.6, opacity == null ? 0.9 : opacity, '4 4');
  }

  function cross(x, y, size) {
    const s = size || 10;
    return [
      line(x - s, y - s, x + s, y + s, 'burgundy', 2.6, 0.95),
      line(x + s, y - s, x - s, y + s, 'burgundy', 2.6, 0.95)
    ].join('');
  }

  function check(x, y) {
    return poly(`${x - 8},${y} ${x - 2},${y + 6} ${x + 10},${y - 8}`, 'gold', 2.7, 1);
  }

  function bar(x1, x2, y) {
    return [
      line(x1, y, x2, y, 'ink', 4, 0.9),
      filledCircle(x1, y, 2.2, 'ink', 0.9),
      filledCircle(x2, y, 2.2, 'ink', 0.9)
    ].join('');
  }

  function hands(x1, y1, x2, y2) {
    return [filledCircle(x1, y1, 2.3, 'ink'), filledCircle(x2, y2, 2.3, 'ink')].join('');
  }

  function feet(x1, y1, x2, y2) {
    return [
      line(x1 - 3, y1, x1 + 5, y1, 'ink', 2.7),
      line(x2 - 3, y2, x2 + 5, y2, 'ink', 2.7)
    ].join('');
  }

  function warmFlow(context) {
    return [
      ground(), phase(52, 1), phase(160, 2), phase(268, 3),
      // Knee drive.
      head(47, 42), line(47, 49, 48, 84, 'ink'),
      line(48, 61, 36, 75, 'ink'), line(48, 61, 61, 74, 'ink'),
      poly('48,84 44,108 43,129', 'ink'), poly('48,84 65,100 57,111', 'ink'),
      feet(43, 129, 57, 111), arrow('M 70 112 Q 79 95 68 80', context, 'burgundy'),
      // Hinge and reach.
      head(137, 58), line(143, 62, 174, 78, 'ink'),
      line(151, 67, 127, 74, 'ink'), line(153, 69, 130, 84, 'ink'),
      poly('174,78 166,105 158,129', 'ink'), poly('174,78 184,105 193,129', 'ink'),
      feet(158, 129, 193, 129), guideLine(139, 56, 177, 80, 0.72),
      arrow('M 153 39 Q 174 45 184 60', context, 'blue'),
      // Reverse lunge with rotation.
      head(257, 38), line(259, 45, 262, 82, 'ink'),
      line(260, 57, 243, 45, 'ink'), line(260, 57, 277, 37, 'ink'),
      poly('262,82 246,104 237,129', 'ink'), poly('262,82 284,105 298,128', 'ink'),
      feet(237, 129, 298, 128), arrow('M 281 64 Q 293 48 282 35', context, 'burgundy')
    ].join('');
  }

  function splitSquat(context) {
    return [
      ground(), phase(79, 1), phase(235, 2),
      head(75, 39), line(76, 46, 77, 82, 'ink'),
      line(77, 58, 62, 72, 'ink'), line(77, 58, 93, 72, 'ink'),
      poly('77,82 60,105 53,129', 'ink'), poly('77,82 101,103 116,129', 'ink'),
      feet(53, 129, 116, 129),
      head(230, 48), line(231, 55, 232, 87, 'ink'),
      line(231, 65, 216, 78, 'ink'), line(231, 65, 247, 77, 'ink'),
      poly('232,87 207,105 198,129', 'ink'), poly('232,87 255,108 256,129', 'ink'),
      feet(198, 129, 256, 129), guideLine(198, 92, 198, 132),
      arrow('M 151 61 L 151 99', context, 'burgundy'),
      arrow('M 164 101 L 164 63', context, 'blue'),
      check(285, 46)
    ].join('');
  }

  function archerPushup(context) {
    return [
      phase(82, 1), phase(238, 2),
      rect(20, 25, 124, 112, 10, 'blue', 1.4, 0.18),
      rect(176, 25, 124, 112, 10, 'blue', 1.4, 0.18),
      // Top-down wide plank.
      head(82, 42), line(82, 49, 82, 100, 'ink'),
      line(82, 61, 45, 79, 'ink'), line(82, 61, 119, 79, 'ink'),
      hands(45, 79, 119, 79), line(82, 100, 65, 129, 'ink'), line(82, 100, 99, 129, 'ink'),
      // Shift toward the bent arm; the other arm stays long.
      head(222, 45), path('M 222 52 Q 226 78 235 101', 'ink'),
      poly('225,63 198,70 190,92', 'ink'), poly('225,63 269,81 285,88', 'ink'),
      hands(190, 92, 285, 88), line(235, 101, 220, 130, 'ink'), line(235, 101, 252, 130, 'ink'),
      guideLine(196, 60, 196, 106, 0.7),
      arrow('M 249 39 Q 225 29 205 41', context, 'burgundy'),
      arrow('M 206 108 Q 225 119 246 108', context, 'blue')
    ].join('');
  }

  function hamstringWalkout(context) {
    return [
      mat(10, 310), phase(50, 1), phase(160, 2), phase(270, 3),
      // Short bridge.
      head(22, 109, 0.82), line(29, 108, 58, 83, 'ink'), line(58, 83, 77, 89, 'ink'),
      poly('77,89 88,108 91,129', 'ink'), line(35, 102, 31, 128, 'ink'),
      // Mid walkout.
      head(126, 111, 0.82), line(133, 109, 159, 86, 'ink'), line(159, 86, 181, 94, 'ink'),
      poly('181,94 195,108 201,129', 'ink'), line(139, 104, 136, 129, 'ink'),
      // Long lever.
      head(226, 113, 0.82), line(233, 111, 258, 93, 'ink'), line(258, 93, 281, 105, 'ink'),
      line(281, 105, 300, 129, 'ink'), line(239, 107, 237, 129, 'ink'),
      guideLine(232, 109, 260, 90, 0.72),
      arrow('M 91 119 Q 112 107 128 120', context, 'burgundy'),
      arrow('M 201 119 Q 220 108 235 120', context, 'burgundy'),
      arrow('M 289 109 Q 274 99 263 103', context, 'blue')
    ].join('');
  }

  function calfRaise(context) {
    return [
      ground(), phase(84, 1), phase(236, 2),
      line(38, 26, 38, 132, 'muted', 2, 0.55),
      line(190, 26, 190, 132, 'muted', 2, 0.55),
      head(78, 39), line(78, 46, 78, 85, 'ink'), line(78, 58, 41, 60, 'ink'),
      line(78, 85, 76, 127, 'ink'), line(78, 85, 91, 127, 'ink'), feet(76, 127, 91, 127),
      head(230, 29), line(230, 36, 230, 75, 'ink'), line(230, 48, 193, 50, 'ink'),
      line(230, 75, 227, 118, 'ink'), line(230, 75, 243, 118, 'ink'),
      poly('224,124 230,118 235,124', 'ink'), poly('240,124 243,118 249,124', 'ink'),
      guideLine(230, 22, 230, 123, 0.78),
      arrow('M 273 119 L 273 83', context, 'burgundy'),
      arrow('M 286 84 L 286 118', context, 'blue')
    ].join('');
  }

  function rkcPlank() {
    return [
      mat(10, 310), phase(82, 1), phase(238, 2),
      // Correct: one rigid line.
      head(35, 86), line(42, 88, 117, 103, 'ink'),
      poly('47,90 43,110 31,129', 'ink'), poly('117,103 130,128 140,129', 'ink'),
      guideLine(39, 85, 121, 102), check(137, 42),
      // Common error: lumbar sag.
      head(185, 84), path('M 192 88 Q 226 120 270 102', 'ink'),
      poly('198,93 194,111 183,129', 'ink'), poly('270,102 284,128 296,129', 'ink'),
      guideLine(189, 84, 275, 100, 0.46), cross(277, 50, 9)
    ].join('');
  }

  function sidePlankLeg(context) {
    return [
      mat(10, 310), phase(80, 1), phase(240, 2),
      head(39, 74), line(46, 78, 92, 100, 'ink'),
      poly('48,80 42,108 30,129', 'ink'), line(92, 100, 137, 127, 'ink'),
      line(92, 100, 133, 105, 'ink'), line(56, 84, 54, 58, 'ink'),
      head(198, 73), line(205, 77, 245, 98, 'ink'),
      poly('207,79 201,108 190,129', 'ink'), line(245, 98, 293, 126, 'ink'),
      line(245, 98, 286, 72, 'ink'), line(216, 83, 216, 56, 'ink'),
      guideLine(203, 75, 295, 126, 0.72),
      arrow('M 271 102 Q 281 90 287 78', context, 'burgundy'),
      arrow('M 297 81 Q 291 94 282 105', context, 'blue')
    ].join('');
  }

  function reverseCrunch(context) {
    return [
      mat(10, 310), phase(75, 1), phase(235, 2),
      head(26, 112), line(33, 111, 87, 111, 'ink'), line(43, 111, 31, 126, 'ink'),
      poly('87,111 101,84 116,85', 'ink'), poly('87,111 105,104 124,113', 'ink'),
      head(180, 113), path('M 187 111 Q 215 105 235 88', 'ink'),
      poly('235,88 250,62 264,64', 'ink'), poly('235,88 257,83 270,94', 'ink'),
      line(199, 108, 188, 128, 'ink'),
      guideLine(187, 116, 224, 108, 0.65),
      arrow('M 110 102 Q 152 84 183 101', context, 'burgundy'),
      arrow('M 269 108 Q 229 132 194 119', context, 'blue')
    ].join('');
  }

  function skaterSquat(context) {
    return [
      ground(), phase(82, 1), phase(238, 2),
      head(80, 36), line(80, 43, 80, 82, 'ink'),
      line(80, 58, 64, 72, 'ink'), line(80, 58, 97, 72, 'ink'),
      line(80, 82, 77, 128, 'ink'), poly('80,82 100,99 113,114', 'ink'), feet(77, 128, 113, 114),
      head(221, 52), line(225, 58, 239, 89, 'ink'),
      line(231, 70, 211, 76, 'ink'), line(231, 70, 250, 77, 'ink'),
      poly('239,89 219,105 211,129', 'ink'), poly('239,89 260,108 277,119', 'ink'),
      feet(211, 129, 277, 119), guideLine(211, 85, 211, 132),
      arrow('M 156 55 Q 167 78 153 101', context, 'burgundy'),
      arrow('M 168 101 Q 180 76 168 54', context, 'blue')
    ].join('');
  }

  function pikePushup(context) {
    return [
      mat(10, 310), phase(80, 1), phase(240, 2),
      head(51, 86), poly('58,85 87,55 121,128', 'ink'),
      line(63, 81, 47, 128, 'ink'), line(68, 76, 61, 128, 'ink'), feet(121, 128, 131, 128),
      head(203, 109), poly('210,104 239,58 285,128', 'ink'),
      poly('218,96 206,111 193,128', 'ink'), poly('221,96 221,116 214,128', 'ink'), feet(285, 128, 295, 128),
      guideLine(203, 120, 203, 70, 0.78),
      arrow('M 159 67 L 159 106', context, 'burgundy'),
      arrow('M 173 106 L 173 67', context, 'blue')
    ].join('');
  }

  function singleLegRdl(context) {
    return [
      ground(), phase(77, 1), phase(238, 2),
      head(76, 36), line(76, 43, 76, 83, 'ink'),
      line(76, 57, 62, 72, 'ink'), line(76, 57, 90, 72, 'ink'),
      line(76, 83, 72, 129, 'ink'), poly('76,83 94,102 105,116', 'ink'), feet(72, 129, 105, 116),
      head(197, 71), line(204, 73, 245, 87, 'ink'),
      line(215, 77, 193, 99, 'ink'), line(218, 79, 205, 106, 'ink'),
      line(245, 87, 240, 129, 'ink'), line(245, 87, 292, 66, 'ink'), feet(240, 129, 297, 64),
      guideLine(197, 69, 295, 65),
      arrow('M 141 48 Q 158 74 145 99', context, 'burgundy'),
      arrow('M 158 101 Q 175 74 159 47', context, 'blue')
    ].join('');
  }

  function soleusRaise(context) {
    return [
      ground(), phase(83, 1), phase(237, 2),
      line(35, 28, 35, 132, 'muted', 2, 0.55), line(189, 28, 189, 132, 'muted', 2, 0.55),
      head(77, 43), line(77, 50, 77, 82, 'ink'), line(77, 61, 38, 63, 'ink'),
      poly('77,82 66,104 73,128', 'ink'), poly('77,82 92,104 98,128', 'ink'), feet(73, 128, 98, 128),
      head(231, 35), line(231, 42, 231, 74, 'ink'), line(231, 53, 192, 55, 'ink'),
      poly('231,74 219,97 227,119', 'ink'), poly('231,74 246,97 252,119', 'ink'),
      poly('222,125 227,119 233,125', 'ink'), poly('247,125 252,119 258,125', 'ink'),
      guideLine(210, 96, 266, 96, 0.62),
      arrow('M 280 120 L 280 87', context, 'burgundy'),
      arrow('M 293 88 L 293 119', context, 'blue')
    ].join('');
  }

  function bearTap(context) {
    return [
      mat(10, 310), phase(80, 1), phase(240, 2),
      head(44, 72), line(51, 75, 102, 82, 'ink'),
      poly('55,76 47,103 42,127', 'ink'), poly('70,78 66,104 64,127', 'ink'),
      poly('102,82 108,104 112,126', 'ink'), poly('102,82 126,104 129,126', 'ink'),
      head(201, 72), line(208, 75, 258, 82, 'ink'),
      poly('217,76 209,103 205,127', 'ink'), poly('258,82 264,104 268,126', 'ink'),
      poly('258,82 283,104 287,126', 'ink'),
      poly('229,78 216,66 205,72', 'ink'), filledCircle(205, 72, 2.5, 'ink'),
      guideLine(208, 76, 262, 83, 0.8),
      arrow('M 239 105 Q 221 94 211 75', context, 'burgundy'),
      arrow('M 204 58 Q 221 48 234 61', context, 'blue')
    ].join('');
  }

  function sidePlankDip(context) {
    return [
      mat(10, 310), phase(82, 1), phase(238, 2),
      head(40, 73), line(47, 77, 91, 98, 'ink'),
      poly('49,79 43,107 32,129', 'ink'), line(91, 98, 139, 127, 'ink'), line(59, 84, 58, 57, 'ink'),
      head(196, 86), path('M 203 90 Q 226 112 248 108', 'ink'),
      poly('205,92 200,112 189,129', 'ink'), line(248, 108, 295, 128, 'ink'), line(214, 97, 214, 70, 'ink'),
      guideLine(45, 74, 140, 127, 0.75),
      arrow('M 159 73 L 159 107', context, 'burgundy'),
      arrow('M 173 108 L 173 73', context, 'blue')
    ].join('');
  }

  function deadBug(context) {
    return [
      mat(10, 310), phase(80, 1), phase(240, 2),
      head(27, 111), line(34, 110, 91, 110, 'ink'),
      poly('53,109 53,73 66,58', 'ink'), poly('66,109 66,76 79,61', 'ink'),
      poly('91,110 105,83 120,83', 'ink'), poly('91,110 106,102 123,109', 'ink'),
      head(180, 112), line(187, 111, 241, 111, 'ink'),
      line(205, 110, 181, 75, 'ink'), poly('218,110 218,76 231,61', 'ink'),
      line(241, 111, 294, 119, 'ink'), poly('241,111 256,84 272,84', 'ink'),
      guideLine(188, 116, 239, 116, 0.85),
      arrow('M 265 64 Q 283 79 291 103', context, 'burgundy'),
      arrow('M 202 72 Q 191 88 187 102', context, 'burgundy')
    ].join('');
  }

  function hollowHold() {
    return [
      mat(10, 310), phase(82, 1), phase(238, 2),
      head(30, 104), path('M 37 106 Q 78 126 119 105', 'ink'),
      line(31, 99, 17, 84, 'ink'), line(119, 105, 140, 95, 'ink'),
      guideLine(45, 119, 95, 121, 0.86), check(138, 42),
      head(183, 104), path('M 190 106 Q 228 91 270 107', 'ink'),
      line(184, 99, 169, 84, 'ink'), line(270, 107, 296, 96, 'ink'),
      path('M 207 117 Q 229 103 250 117', 'gold', 1.6, 0.75, '4 4'), cross(280, 48, 9)
    ].join('');
  }

  function sidePlankReach(context) {
    return [
      mat(10, 310), phase(82, 1), phase(238, 2),
      head(41, 75), line(48, 78, 92, 99, 'ink'),
      poly('50,80 44,107 33,129', 'ink'), line(92, 99, 139, 128, 'ink'), line(60, 85, 60, 54, 'ink'),
      head(198, 74), line(205, 78, 249, 99, 'ink'),
      poly('207,80 201,107 190,129', 'ink'), line(249, 99, 297, 128, 'ink'),
      poly('217,85 238,96 219,106', 'ink'),
      guideLine(203, 76, 298, 128, 0.72),
      arrow('M 179 53 Q 230 36 251 81', context, 'burgundy'),
      arrow('M 254 88 Q 226 55 188 68', context, 'blue')
    ].join('');
  }

  function reversePlank() {
    return [
      mat(10, 310), phase(82, 1), phase(238, 2),
      head(35, 84), line(42, 88, 112, 103, 'ink'),
      poly('49,90 42,109 34,129', 'ink'), line(112, 103, 143, 129, 'ink'),
      guideLine(39, 85, 116, 102), check(140, 42),
      head(185, 84), path('M 192 88 Q 226 119 269 103', 'ink'),
      poly('199,92 193,110 184,129', 'ink'), line(269, 103, 299, 129, 'ink'),
      guideLine(189, 84, 274, 101, 0.43), cross(279, 49, 9)
    ].join('');
  }

  function reverseLunge(context) {
    return [
      ground(), phase(48, 1), phase(160, 2), phase(272, 3),
      head(48, 40, 0.9), line(48, 46, 48, 82, 'ink'),
      line(48, 58, 35, 70, 'ink'), line(48, 58, 61, 70, 'ink'),
      line(48, 82, 42, 129, 'ink'), line(48, 82, 58, 129, 'ink'), feet(42, 129, 58, 129),
      head(159, 51, 0.9), line(159, 57, 160, 87, 'ink'),
      line(160, 68, 146, 79, 'ink'), line(160, 68, 174, 79, 'ink'),
      poly('160,87 139,105 132,129', 'ink'), poly('160,87 184,108 198,129', 'ink'), feet(132, 129, 198, 129),
      head(270, 39, 0.9), line(270, 45, 270, 82, 'ink'),
      line(270, 58, 255, 70, 'ink'), line(270, 58, 285, 70, 'ink'),
      line(270, 82, 264, 129, 'ink'), poly('270,82 291,98 284,110', 'ink'), feet(264, 129, 284, 110),
      guideLine(132, 91, 132, 132, 0.72),
      arrow('M 85 92 Q 112 108 132 97', context, 'burgundy'),
      arrow('M 212 105 Q 241 94 264 104', context, 'blue')
    ].join('');
  }

  function pushup(context) {
    return [
      mat(10, 310), phase(82, 1), phase(238, 2),
      head(34, 79), line(41, 82, 117, 103, 'ink'),
      poly('47,84 43,108 32,129', 'ink'), poly('117,103 132,127 143,129', 'ink'),
      guideLine(38, 78, 120, 101, 0.78),
      head(185, 104), line(192, 106, 271, 112, 'ink'),
      poly('201,107 190,115 181,129', 'ink'), poly('271,112 286,128 299,129', 'ink'),
      guideLine(189, 103, 275, 111, 0.78),
      arrow('M 158 65 L 158 103', context, 'burgundy'),
      arrow('M 172 104 L 172 66', context, 'blue')
    ].join('');
  }

  function activeHang(context) {
    return [
      phase(82, 1), phase(238, 2), bar(29, 135, 31), bar(185, 291, 31),
      // Passive position.
      head(82, 62), line(82, 68, 82, 105, 'ink'),
      line(82, 74, 57, 31, 'ink'), line(82, 74, 107, 31, 'ink'), hands(57, 31, 107, 31),
      line(82, 105, 70, 133, 'ink'), line(82, 105, 94, 133, 'ink'),
      // Active position: shoulders down, ribs quiet.
      head(238, 53), line(238, 60, 238, 100, 'ink'),
      line(238, 70, 213, 31, 'ink'), line(238, 70, 263, 31, 'ink'), hands(213, 31, 263, 31),
      line(238, 100, 226, 132, 'ink'), line(238, 100, 250, 132, 'ink'),
      line(224, 66, 252, 66, 'gold', 1.6, 0.85),
      arrow('M 210 49 L 210 66', context, 'burgundy'),
      arrow('M 266 49 L 266 66', context, 'burgundy'),
      check(289, 64)
    ].join('');
  }

  function scapPull(context) {
    return [
      phase(82, 1), phase(238, 2), bar(29, 135, 31), bar(185, 291, 31),
      head(82, 64), line(82, 70, 82, 106, 'ink'),
      line(82, 76, 57, 31, 'ink'), line(82, 76, 107, 31, 'ink'), hands(57, 31, 107, 31),
      line(82, 106, 70, 134, 'ink'), line(82, 106, 94, 134, 'ink'),
      head(238, 50), line(238, 56, 238, 96, 'ink'),
      line(238, 66, 213, 31, 'ink'), line(238, 66, 263, 31, 'ink'), hands(213, 31, 263, 31),
      line(238, 96, 226, 128, 'ink'), line(238, 96, 250, 128, 'ink'),
      arrow('M 159 83 L 159 51', context, 'burgundy'),
      arrow('M 173 52 L 173 83', context, 'blue'),
      guideLine(221, 66, 255, 66, 0.76)
    ].join('');
  }

  function assistedPullup(context) {
    return [
      ground(), phase(40, 1), phase(196, 2), bar(29, 135, 31), bar(185, 291, 31),
      head(82, 63), line(82, 69, 82, 98, 'ink'),
      line(82, 75, 57, 31, 'ink'), line(82, 75, 107, 31, 'ink'), hands(57, 31, 107, 31),
      poly('82,98 68,111 65,129', 'ink'), poly('82,98 98,111 102,129', 'ink'), feet(65, 129, 102, 129),
      head(238, 24), line(238, 30, 238, 78, 'ink'),
      poly('238,54 219,45 213,31', 'ink'), poly('238,54 257,45 263,31', 'ink'), hands(213, 31, 263, 31),
      poly('238,78 226,101 223,129', 'ink'), poly('238,78 251,101 255,129', 'ink'), feet(223, 129, 255, 129),
      arrow('M 159 87 L 159 50', context, 'burgundy'),
      arrow('M 173 51 L 173 87', context, 'blue'),
      arrow('M 275 119 L 275 101', context, 'burgundy', 2, 0.8)
    ].join('');
  }

  function negativePullup(context) {
    return [
      phase(20, 1), phase(130, 2), phase(240, 3),
      bar(13, 87, 31), bar(123, 197, 31), bar(233, 307, 31),
      head(50, 24, 0.82), line(50, 29, 50, 76, 'ink'),
      poly('50,51 35,44 31,31', 'ink'), poly('50,51 65,44 69,31', 'ink'), hands(31, 31, 69, 31),
      line(50, 76, 40, 105, 'ink'), line(50, 76, 60, 105, 'ink'),
      head(160, 61, 0.82), line(160, 66, 160, 96, 'ink'),
      poly('160,73 145,54 141,31', 'ink'), poly('160,73 175,54 179,31', 'ink'), hands(141, 31, 179, 31),
      line(160, 96, 150, 124, 'ink'), line(160, 96, 170, 124, 'ink'),
      head(270, 76, 0.82), line(270, 81, 270, 111, 'ink'),
      line(270, 87, 251, 31, 'ink'), line(270, 87, 289, 31, 'ink'), hands(251, 31, 289, 31),
      line(270, 111, 260, 137, 'ink'), line(270, 111, 280, 137, 'ink'),
      arrow('M 96 47 Q 111 58 109 76', context, 'burgundy'),
      arrow('M 206 61 Q 221 75 218 96', context, 'burgundy'),
      text(160, 143, '5–7 s', 'gold', 12, 750)
    ].join('');
  }

  function strictPullup(context) {
    return [
      phase(40, 1), phase(196, 2), bar(29, 135, 31), bar(185, 291, 31),
      head(82, 70), line(82, 76, 82, 109, 'ink'),
      line(82, 82, 57, 31, 'ink'), line(82, 82, 107, 31, 'ink'), hands(57, 31, 107, 31),
      line(82, 109, 70, 136, 'ink'), line(82, 109, 94, 136, 'ink'),
      head(238, 24), line(238, 30, 238, 76, 'ink'),
      poly('238,52 219,47 213,31', 'ink'), poly('238,52 257,47 263,31', 'ink'), hands(213, 31, 263, 31),
      line(238, 76, 226, 105, 'ink'), line(238, 76, 250, 105, 'ink'),
      guideLine(202, 31, 274, 31, 0.82),
      arrow('M 159 91 L 159 47', context, 'burgundy'),
      arrow('M 173 48 L 173 91', context, 'blue')
    ].join('');
  }

  function pogo(context) {
    return [
      ground(), phase(48, 1), phase(160, 2), phase(272, 3),
      head(48, 43, 0.88), line(48, 49, 48, 86, 'ink'), line(48, 60, 36, 72, 'ink'), line(48, 60, 60, 72, 'ink'),
      line(48, 86, 42, 126, 'ink'), line(48, 86, 56, 126, 'ink'), feet(42, 126, 56, 126),
      head(160, 27, 0.88), line(160, 33, 160, 70, 'ink'), line(160, 44, 148, 56, 'ink'), line(160, 44, 172, 56, 'ink'),
      line(160, 70, 154, 109, 'ink'), line(160, 70, 168, 109, 'ink'), feet(154, 109, 168, 109),
      head(272, 46, 0.88), line(272, 52, 272, 87, 'ink'), line(272, 63, 260, 75, 'ink'), line(272, 63, 284, 75, 'ink'),
      poly('272,87 263,108 267,126', 'ink'), poly('272,87 282,108 286,126', 'ink'), feet(267, 126, 286, 126),
      guideLine(160, 18, 160, 113, 0.6),
      arrow('M 96 114 Q 111 79 129 58', context, 'burgundy'),
      arrow('M 194 57 Q 214 82 225 115', context, 'blue')
    ].join('');
  }

  const diagrams = Object.freeze({
    'warm-flow': warmFlow,
    'split-squat': splitSquat,
    'archer-pushup': archerPushup,
    'hamstring-walkout': hamstringWalkout,
    'calf-raise': calfRaise,
    'rkc-plank': rkcPlank,
    'side-plank-leg': sidePlankLeg,
    'reverse-crunch': reverseCrunch,
    'skater-squat': skaterSquat,
    'pike-pushup': pikePushup,
    'single-leg-rdl': singleLegRdl,
    'soleus-raise': soleusRaise,
    'bear-tap': bearTap,
    'side-plank-dip': sidePlankDip,
    'dead-bug': deadBug,
    'hollow-hold': hollowHold,
    'side-plank-reach': sidePlankReach,
    'reverse-plank': reversePlank,
    'reverse-lunge': reverseLunge,
    pushup,
    'active-hang': activeHang,
    'scap-pull': scapPull,
    'assisted-pullup': assistedPullup,
    'negative-pullup': negativePullup,
    'strict-pullup': strictPullup,
    pogo
  });

  function render(id, titleValue, descriptionValue) {
    const key = String(id || 'warm-flow');
    const renderer = diagrams[key] || diagrams['warm-flow'];
    const prefix = `wd-${slug(key)}-${++renderCount}`;
    const context = {
      burgundyArrow: `${prefix}-arrow-burgundy`,
      blueArrow: `${prefix}-arrow-blue`
    };
    const titleId = `${prefix}-title`;
    const descriptionId = `${prefix}-description`;
    const safeTitle = titleValue || key.replace(/-/g, ' ');
    const safeDescription = descriptionValue || 'Exercise movement diagram with numbered phases and alignment guides.';

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 150" role="img" aria-labelledby="${titleId} ${descriptionId}" focusable="false" preserveAspectRatio="xMidYMid meet">
      <title id="${titleId}">${escapeHtml(safeTitle)}</title>
      <desc id="${descriptionId}">${escapeHtml(safeDescription)}</desc>
      <defs>
        <marker id="${context.burgundyArrow}" viewBox="0 0 7 7" refX="6" refY="3.5" markerWidth="7" markerHeight="7" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 7 3.5 L 0 7 z" fill="${colour.burgundy}"/>
        </marker>
        <marker id="${context.blueArrow}" viewBox="0 0 7 7" refX="6" refY="3.5" markerWidth="7" markerHeight="7" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 7 3.5 L 0 7 z" fill="${colour.blue}"/>
        </marker>
      </defs>
      ${renderer(context)}
    </svg>`;
  }

  root.WorkoutDiagrams = Object.freeze({ render });
})(typeof globalThis !== 'undefined' ? globalThis : window);
