/* ══════════════════════════════════════════════════════════════
   Khay ấp — mô phỏng bảng điều khiển.
   Mỗi ô là một account. Ô đổi trạng thái chậm để giống một đàn
   đang chạy thật, không phải đèn nhấp nháy trang trí.
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var tray = document.getElementById('tray');
  if (!tray) return;

  var STATES = ['run', 'warm', 'idle', 'dead'];
  var WEIGHT = [0.40, 0.13, 0.43, 0.04];
  var ROWS = 6;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cells = [];
  var states = [];
  var tickTimer = null;

  var out = {
    run: document.getElementById('cRun'),
    warm: document.getElementById('cWarm'),
    idle: document.getElementById('cIdle'),
    dead: document.getElementById('cDead')
  };

  function pickState() {
    var r = Math.random(), acc = 0;
    for (var i = 0; i < WEIGHT.length; i++) {
      acc += WEIGHT[i];
      if (r < acc) return STATES[i];
    }
    return 'idle';
  }

  function colsForWidth() {
    var w = tray.clientWidth || window.innerWidth;
    if (w >= 900) return 30;
    if (w >= 640) return 20;
    if (w >= 420) return 14;
    return 10;
  }

  function render() {
    var cols = colsForWidth();
    var total = cols * ROWS;

    tray.style.setProperty('--cols', cols);
    tray.textContent = '';
    cells = [];
    states = [];

    var frag = document.createDocumentFragment();
    for (var i = 0; i < total; i++) {
      var s = pickState();
      var el = document.createElement('span');
      el.className = 'egg';
      el.setAttribute('data-s', s);
      // Lệch pha nhịp thở để cả khay không phập phồng cùng lúc
      el.style.animationDelay = (Math.random() * -5).toFixed(2) + 's';
      frag.appendChild(el);
      cells.push(el);
      states.push(s);
    }
    tray.appendChild(frag);
    count();
  }

  function count() {
    var n = { run: 0, warm: 0, idle: 0, dead: 0 };
    for (var i = 0; i < states.length; i++) n[states[i]]++;
    for (var k in n) if (out[k]) out[k].textContent = n[k];
  }

  /* Mỗi nhịp đổi 1–3 ô. Đủ để thấy đàn còn sống, không đủ để chói mắt. */
  function tick() {
    var moves = 1 + Math.floor(Math.random() * 3);
    for (var m = 0; m < moves; m++) {
      var i = Math.floor(Math.random() * cells.length);
      var next = pickState();
      if (next === states[i]) continue;
      states[i] = next;
      cells[i].setAttribute('data-s', next);
    }
    count();
  }

  /* ── Đồng hồ chạy ── */
  var clock = document.getElementById('trayClock');
  var base = 4 * 3600 + 12 * 60 + 37; // khởi điểm cho ra vẻ đã chạy từ sáng

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function paintClock(sec) {
    if (!clock) return;
    clock.textContent = 'Uptime ' + pad(Math.floor(sec / 3600)) + ':' +
      pad(Math.floor(sec / 60) % 60) + ':' + pad(sec % 60);
  }

  var started = null;
  function loopClock(ts) {
    if (started === null) started = ts;
    paintClock(base + Math.floor((ts - started) / 1000));
    requestAnimationFrame(loopClock);
  }

  /* ── Khởi động ── */
  render();
  paintClock(base);

  if (!reduced) {
    tickTimer = setInterval(tick, 900);
    requestAnimationFrame(loopClock);
  }

  /* Dựng lại khi đổi kích thước — chỉ khi số cột thật sự thay đổi */
  var lastCols = colsForWidth();
  var rz = null;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      var c = colsForWidth();
      if (c !== lastCols) { lastCols = c; render(); }
    }, 180);
  });

  /* Tab ẩn thì ngừng đổi trạng thái, đỡ tốn pin */
  document.addEventListener('visibilitychange', function () {
    if (reduced) return;
    if (document.hidden) { clearInterval(tickTimer); tickTimer = null; }
    else if (!tickTimer) { tickTimer = setInterval(tick, 900); }
  });
})();
