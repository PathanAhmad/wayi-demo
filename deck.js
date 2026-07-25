/* Wayi AI demo deck, behaviour: fit engine, slide nav,
   theme/lang toggles, and the logo injector. Extracted from the
   five inline blocks that used to live at the bottom of index.html,
   kept in original order so timing is unchanged. */

/* ===== ADAPTIVE lesson (00): one lesson pitched to each child, with runnable code ===== */
(function () {
  var deck = document.getElementById('deck');
  var root = document.getElementById('s-adaptive');
  if (!deck || !root) return;
  function id(x) { return document.getElementById(x); }

  // Each block is one narrated unit: `html` is the rendered markdown shown, `read` is what the voice
  // says (and the karaoke highlights), `d` its spoken length in seconds. Built per language so a
  // mid-demo language switch re-renders in place.
  function buildLesson(zh) {
    return {
      // Lena: brand new, the text explains what a loop even is; she runs the simplest loop to see it.
      lena: {
        pos: '4 / 9', meterPct: 44,
        blocks: [
          { html: '<h2 class="md-h">' + (zh ? '循环到底是什么？' : 'What even is a loop?') + '</h2>',
            read: zh ? '循环到底是什么？' : 'What even is a loop?', d: 2.6 },
          { html: '<p class="md-p">' + (zh ? '<strong>循环</strong>就是让电脑把同一步<strong>再做一次</strong>，这样你就不用每次都重新写一遍。' : 'A <strong>loop</strong> is the computer doing the same step <strong>again</strong>, so you do not have to write it out every time.') + '</p>',
            read: zh ? '循环，就是让电脑把同一步再做一次，这样你就不用每次都重新写一遍。' : 'A loop is the computer doing the same step again, so you do not have to write it out every time.', d: 5.2 },
          { html: '<p class="md-p">' + (zh ? '想想一首歌。<em>副歌</em>会一模一样地一遍遍回来。这就是循环：一个部分，不断重复。' : 'Think of a song. The <em>chorus</em> comes back the same way, again and again. That is a loop: one part, repeated.') + '</p>',
            read: zh ? '想想一首歌。副歌会一模一样地一遍遍回来。这就是循环：一个部分，不断重复。' : 'Think of a song. The chorus comes back the same way, again and again. That is a loop: one part, repeated.', d: 5.6 },
          { html: '<p class="md-p">' + (zh ? '所以你只把这一步写<strong>一次</strong>，再说要做几次。<code class="md-code">repeat(3)</code> 的意思是：<em>把里面的部分做三遍。</em>' : 'So you write the step <strong>once</strong>, then say how many times. <code class="md-code">repeat(3)</code> means: <em>do the part inside, three times.</em>') + '</p>',
            read: zh ? '所以你只把这一步写一次，再说要做几次。repeat 3 的意思是：把里面的部分做三遍。' : 'So you write the step once, then say how many times. Repeat three means: do the part inside, three times.', d: 5.6 },
          { html: '<div class="callout"><span class="callout-tag">' + (zh ? '试一试' : 'Try it') + '</span><span>' + (zh ? '按下<strong>运行</strong>，看它说三次“你好”。' : 'Press <strong>Run</strong> to watch it say hello three times.') + '</span></div>',
            read: zh ? '按下运行，看它说三次你好。' : 'Press Run to watch it say hello three times.', d: 3.4 }
        ],
        panel: {
          tab: 'loops.code', runLabel: zh ? '运行' : 'Run',
          placeholder: zh ? '点击运行，查看结果' : 'Run to see the output',
          canvasHtml: '<pre class="code">' +
            '<span class="cm">' + (zh ? '// 说三次“你好”' : '// say hello 3 times') + '</span>\n' +
            '<span class="kw">repeat</span>(<span class="nm">3</span>) {\n' +
            '  say(<span class="st">"' + (zh ? '你好！' : 'Hello!') + '"</span>)\n' +
            '}' + '</pre>',
          output: zh ? ['你好！', '你好！', '你好！'] : ['Hello!', 'Hello!', 'Hello!'],
          ok: zh ? '说了 3 次“你好”' : 'said hello 3 times'
        }
      },
      // Marco: already codes, so he skips "what a loop is" and *uses* a loop to build a shape.
      marco: {
        pos: '2 / 5', meterPct: 40,
        blocks: [
          { html: '<h2 class="md-h">' + (zh ? '写一个会画图的循环' : 'Build a loop that draws') + '</h2>',
            read: zh ? '写一个会画图的循环。' : 'Build a loop that draws.', d: 2.6 },
          { html: '<p class="md-p">' + (zh ? '轮到你了。留一行星号，每过一遍<strong>加一个</strong>，然后打印这一行。' : 'Your turn. Keep a line of stars, <strong>grow it by one</strong> each pass, then print the row.') + '</p>',
            read: zh ? '轮到你了。留一行星号，每过一遍加一个，然后打印这一行。' : 'Your turn. Keep a line of stars, grow it by one each pass, then print the row.', d: 5.0 },
          { html: '<p class="md-p">' + (zh ? '循环每跑一次，这行就多一个星号，于是一行行叠成一个<strong>三角形</strong>。' : 'Each time the loop runs, the line gets one star longer, so the rows stack into a <strong>triangle</strong>.') + '</p>',
            read: zh ? '循环每跑一次，这行就多一个星号，于是一行行叠成一个三角形。' : 'Each time the loop runs, the line gets one star longer, so the rows stack into a triangle.', d: 5.0 },
          { html: '<div class="callout"><span class="callout-tag">' + (zh ? '你的任务' : 'Your task') + '</span><span>' + (zh ? '把 <code class="md-code">repeat(4)</code> 改成 <code class="md-code">repeat(6)</code> 再运行。三角形会变多高？' : 'Change <code class="md-code">repeat(4)</code> to <code class="md-code">repeat(6)</code> and run it. How tall does the triangle get?') + '</span></div>',
            read: zh ? '把 repeat 4 改成 repeat 6 再运行。三角形会变多高？' : 'Change repeat four to repeat six, and run it. How tall does the triangle get?', d: 4.8 }
        ],
        panel: {
          tab: 'loops.code', runLabel: zh ? '运行' : 'Run',
          placeholder: zh ? '点击运行，查看结果' : 'Run to see the output',
          canvasHtml: '<pre class="code">' +
            '<span class="cm">' + (zh ? '// 一行会长大的星号' : '// a growing row of stars') + '</span>\n' +
            'line = <span class="st">""</span>\n' +
            '<span class="kw">repeat</span>(<span class="nm">4</span>) {\n' +
            '  line = line + <span class="st">"*"</span>\n' +
            '  say(line)\n' +
            '}' + '</pre>',
          output: ['*', '**', '***', '****'],
          ok: zh ? '画了 4 行' : 'drew 4 rows'
        }
      }
    };
  }

  var WAVE_BARS = 30;
  var LESSON = buildLesson(deck.dataset.lang === 'zh');
  var mode = 'lena', playing = false, voiceOn = true, running = false;
  var elapsed = 0, total = 0, rafId = null, lastTs = 0, runTimer = null;

  var els = {
    lesson: id('ad-lesson'), panelTab: id('ad-panelTab'), panelCanvas: id('ad-panelCanvas'),
    output: id('ad-output'), run: id('ad-run'), runText: id('ad-runText'), wave: id('ad-wave'),
    time: id('ad-time'), pos: id('ad-pos'), meter: id('ad-meterFill'), play: id('ad-play'),
    playIcon: id('ad-playIcon'), mute: id('ad-mute'), switch: id('ad-switch')
  };

  var ICON_PLAY = '<path d="M8 5v14l11-7z"/>';
  var ICON_PAUSE = '<path d="M7 5h3v14H7zM14 5h3v14h-3z"/>';

  // build waveform bars once (varied heights, deterministic, no Math.random)
  for (var bi = 0; bi < WAVE_BARS; bi++) {
    var h = 30 + Math.round(60 * Math.abs(Math.sin(bi * 0.7) * Math.cos(bi * 0.31)));
    var bar = document.createElement('span');
    bar.className = 'bar';
    bar.style.height = Math.max(22, Math.min(96, h)) + '%';
    els.wave.appendChild(bar);
  }
  var bars = els.wave.querySelectorAll('.bar');

  function fmt(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }
  function totalOf(data) { var sum = 0; for (var i = 0; i < data.blocks.length; i++) sum += data.blocks[i].d; return sum; }
  function activeIndex(data) {
    if (!playing) return -1;
    var acc = 0;
    for (var i = 0; i < data.blocks.length; i++) { acc += data.blocks[i].d; if (elapsed < acc) return i; }
    return data.blocks.length - 1;
  }

  function loadMode() {
    var data = LESSON[mode];
    total = totalOf(data);
    els.lesson.innerHTML = '';
    data.blocks.forEach(function (blk, i) {
      var wrap = document.createElement('div');
      wrap.className = 'blk'; wrap.setAttribute('data-i', i); wrap.innerHTML = blk.html;
      els.lesson.appendChild(wrap);
    });
    els.panelTab.textContent = data.panel.tab;
    els.panelCanvas.innerHTML = data.panel.canvasHtml;
    resetOutput();
    els.pos.textContent = data.pos;
    els.meter.style.width = data.meterPct + '%';
    stop();
    render();
  }

  function resetOutput() {
    if (runTimer) { clearTimeout(runTimer); runTimer = null; }
    running = false;
    els.run.disabled = false;
    var panel = LESSON[mode].panel;
    els.runText.textContent = panel.runLabel;
    els.output.innerHTML = '<span class="ph">' + panel.placeholder + '</span>';
  }

  // Output lines appear one per pass, so it builds up the way a real run would.
  function runCode() {
    if (running) return;
    var panel = LESSON[mode].panel;
    running = true;
    els.run.disabled = true;
    els.runText.textContent = deck.dataset.lang === 'zh' ? '运行中…' : 'Running…';
    els.output.innerHTML = '';
    var i = 0;
    (function tick() {
      if (i < panel.output.length) {
        var line = document.createElement('div');
        line.textContent = panel.output[i];
        els.output.appendChild(line);
        i++;
        runTimer = setTimeout(tick, 340);
      } else {
        var done = document.createElement('div');
        done.className = 'ok';
        done.innerHTML = '&#10003; ' + panel.ok;
        els.output.appendChild(done);
        running = false;
        els.run.disabled = false;
        els.runText.textContent = panel.runLabel;
        runTimer = null;
      }
    })();
  }

  function render() {
    var data = LESSON[mode];
    var act = activeIndex(data);
    var blks = els.lesson.querySelectorAll('.blk');
    for (var j = 0; j < blks.length; j++) {
      blks[j].classList.toggle('active', act !== -1 && j === act);
      blks[j].classList.toggle('future', act !== -1 && j > act);
    }
    var pct = total ? Math.min(100, (elapsed / total) * 100) : 0;
    var lit = Math.round((pct / 100) * bars.length);
    for (var k = 0; k < bars.length; k++) bars[k].classList.toggle('on', k < lit);
    els.time.textContent = fmt(elapsed);
    els.wave.setAttribute('aria-valuenow', Math.round(pct));
  }

  function frame(ts) {
    if (!playing) return;
    if (!lastTs) lastTs = ts;
    elapsed += (ts - lastTs) / 1000;
    lastTs = ts;
    if (elapsed >= total) { elapsed = total; render(); stop(); return; }
    render();
    rafId = requestAnimationFrame(frame);
  }

  function speak() {
    if (!voiceOn || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var data = LESSON[mode];
      var u = new SpeechSynthesisUtterance(data.blocks.map(function (b) { return b.read; }).join(' '));
      u.lang = deck.dataset.lang === 'zh' ? 'zh-CN' : 'en-US';
      u.rate = 0.95; u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) { /* best-effort; the timed highlight is the real demo */ }
  }

  function play() {
    if (playing) return;
    if (elapsed >= total) elapsed = 0;
    playing = true; lastTs = 0;
    els.playIcon.innerHTML = ICON_PAUSE;
    els.play.setAttribute('aria-label', 'Pause narration');
    speak();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    playing = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null; lastTs = 0;
    els.playIcon.innerHTML = ICON_PLAY;
    els.play.setAttribute('aria-label', 'Play narration');
    if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    render();
  }

  function togglePlay() { playing ? stop() : play(); }
  function seekTo(pct) { elapsed = Math.max(0, Math.min(1, pct)) * total; if (playing) { speak(); lastTs = 0; } render(); }

  els.play.addEventListener('click', togglePlay);
  els.run.addEventListener('click', runCode);
  els.wave.addEventListener('click', function (e) {
    var r = els.wave.getBoundingClientRect();
    seekTo((e.clientX - r.left) / r.width);
  });
  els.wave.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { seekTo(elapsed / total + 0.06); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { seekTo(elapsed / total - 0.06); e.preventDefault(); }
    else if (e.key === ' ' || e.key === 'Enter') { togglePlay(); e.preventDefault(); }
  });
  els.mute.addEventListener('click', function () {
    voiceOn = !voiceOn;
    els.mute.classList.toggle('off', !voiceOn);
    els.mute.title = voiceOn ? 'Voice on' : 'Voice off (highlight only)';
    els.mute.setAttribute('aria-label', voiceOn ? 'Mute voice' : 'Unmute voice');
    if (!voiceOn && 'speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    else if (voiceOn && playing) speak();
  });

  els.switch.addEventListener('click', function (e) {
    var btn = e.target.closest('.learner');
    if (!btn) return;
    var next = btn.getAttribute('data-mode');
    if (next === mode) return;
    mode = next;
    var all = this.querySelectorAll('.learner');
    for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', all[i] === btn ? 'true' : 'false');
    elapsed = 0;
    loadMode();
  });

  // Re-localise in place when the deck's language toggle fires.
  deck.addEventListener('deck:langchange', function () {
    LESSON = buildLesson(deck.dataset.lang === 'zh');
    elapsed = 0;
    loadMode();
  });

  loadMode();
})();


/* ===== TEACHING lesson (circuit): a narrated science lesson with a live schematic.
   The narration engine mirrors the adaptive screen's; the right pane is a switch you
   close to run current round the loop and light the bulb (Ohm's law made visible). ===== */
(function () {
  var deck = document.getElementById('deck');
  var root = document.getElementById('s-circuit');
  if (!deck || !root) return;
  function id(x) { return document.getElementById(x); }

  function buildLesson(zh) {
    return {
      pos: '3 / 7', meterPct: 42,
      blocks: [
        { html: '<h2 class="md-h">' + (zh ? '灯泡为什么会亮？' : 'What makes a bulb light?') + '</h2>',
          read: zh ? '灯泡为什么会亮？' : 'What makes a bulb light?', d: 2.6 },
        { html: '<p class="md-p">' + (zh ? '一个电路，就是一圈完整的<strong>导线</strong>。<strong>电池</strong>把电流沿着这圈线推着走，电流经过<strong>灯泡</strong>时，灯泡就亮了。' : 'A circuit is one <strong>complete loop</strong> of wire. The <strong>battery</strong> pushes a current around the loop, and the <strong>bulb</strong> glows as that current passes through it.') + '</p>',
          read: zh ? '一个电路，就是一圈完整的导线。电池把电流沿着这圈线推着走，电流经过灯泡时，灯泡就亮了。' : 'A circuit is one complete loop of wire. The battery pushes a current around the loop, and the bulb glows as that current passes through it.', d: 6.2 },
        { html: '<p class="md-p">' + (zh ? '只要这圈线在任何一处<strong>断开</strong>，电流马上就停。<strong>开关</strong>，就是一个你可以随时断开或接通的缺口。' : 'Break the loop <strong>anywhere</strong> and the current stops at once. A <strong>switch</strong> is just a gap you can open and close on purpose.') + '</p>',
          read: zh ? '只要这圈线在任何一处断开，电流马上就停。开关，就是一个你可以随时断开或接通的缺口。' : 'Break the loop anywhere and the current stops at once. A switch is just a gap you can open and close on purpose.', d: 5.8 },
        { html: '<p class="md-p">' + (zh ? '有多亮，看三样东西：电池的推力是<strong>电压</strong>（V），灯泡对电流的阻碍是<strong>电阻</strong>（R），真正流动的是<strong>电流</strong>（I）。它们的关系是 <code class="md-code">V = I × R</code>。' : 'How bright depends on three things: the push is <strong>voltage</strong> (V), the bulb resists the flow with its <strong>resistance</strong> (R), and what actually flows is the <strong>current</strong> (I). They connect as <code class="md-code">V = I × R</code>.') + '</p>',
          read: zh ? '有多亮，看三样东西：电池的推力是电压 V，灯泡对电流的阻碍是电阻 R，真正流动的是电流 I。它们的关系是，V 等于 I 乘以 R。' : 'How bright depends on three things: the push is voltage V, the bulb resists the flow with its resistance R, and what actually flows is the current I. They connect as V equals I times R.', d: 7.0 },
        { html: '<div class="callout"><span class="callout-tag">' + (zh ? '试一试' : 'Try it') + '</span><span>' + (zh ? '合上开关，看电流沿着回路流起来；再断开，灯泡就灭了。' : 'Close the switch and watch the current run round the loop. Open it again and the bulb goes dark.') + '</span></div>',
          read: zh ? '合上开关，看电流沿着回路流起来；再断开，灯泡就灭了。' : 'Close the switch and watch the current run round the loop. Open it again and the bulb goes dark.', d: 4.4 }
      ]
    };
  }

  var WAVE_BARS = 30;
  var LESSON = buildLesson(deck.dataset.lang === 'zh');
  var playing = false, voiceOn = true, elapsed = 0, total = 0, rafId = null, lastTs = 0;
  var els = {
    lesson: id('ci-lesson'), wave: id('ci-wave'), time: id('ci-time'), pos: id('ci-pos'),
    meter: id('ci-meterFill'), play: id('ci-play'), playIcon: id('ci-playIcon'), mute: id('ci-mute')
  };
  var ICON_PLAY = '<path d="M8 5v14l11-7z"/>';
  var ICON_PAUSE = '<path d="M7 5h3v14H7zM14 5h3v14h-3z"/>';

  for (var bi = 0; bi < WAVE_BARS; bi++) {
    var h = 30 + Math.round(60 * Math.abs(Math.sin(bi * 0.7) * Math.cos(bi * 0.31)));
    var bar = document.createElement('span');
    bar.className = 'bar';
    bar.style.height = Math.max(22, Math.min(96, h)) + '%';
    els.wave.appendChild(bar);
  }
  var bars = els.wave.querySelectorAll('.bar');

  function fmt(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }
  function totalOf(data) { var sum = 0; for (var i = 0; i < data.blocks.length; i++) sum += data.blocks[i].d; return sum; }
  function activeIndex() {
    if (!playing) return -1;
    var acc = 0;
    for (var i = 0; i < LESSON.blocks.length; i++) { acc += LESSON.blocks[i].d; if (elapsed < acc) return i; }
    return LESSON.blocks.length - 1;
  }

  function load() {
    total = totalOf(LESSON);
    els.lesson.innerHTML = '';
    LESSON.blocks.forEach(function (blk, i) {
      var wrap = document.createElement('div');
      wrap.className = 'blk'; wrap.setAttribute('data-i', i); wrap.innerHTML = blk.html;
      els.lesson.appendChild(wrap);
    });
    els.pos.textContent = LESSON.pos;
    els.meter.style.width = LESSON.meterPct + '%';
    stop();
    render();
  }

  function render() {
    var act = activeIndex();
    var blks = els.lesson.querySelectorAll('.blk');
    for (var j = 0; j < blks.length; j++) {
      blks[j].classList.toggle('active', act !== -1 && j === act);
      blks[j].classList.toggle('future', act !== -1 && j > act);
    }
    var pct = total ? Math.min(100, (elapsed / total) * 100) : 0;
    var lit = Math.round((pct / 100) * bars.length);
    for (var k = 0; k < bars.length; k++) bars[k].classList.toggle('on', k < lit);
    els.time.textContent = fmt(elapsed);
    els.wave.setAttribute('aria-valuenow', Math.round(pct));
  }

  function frame(ts) {
    if (!playing) return;
    if (!lastTs) lastTs = ts;
    elapsed += (ts - lastTs) / 1000;
    lastTs = ts;
    if (elapsed >= total) { elapsed = total; render(); stop(); return; }
    render();
    rafId = requestAnimationFrame(frame);
  }

  function speak() {
    if (!voiceOn || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(LESSON.blocks.map(function (b) { return b.read; }).join(' '));
      u.lang = deck.dataset.lang === 'zh' ? 'zh-CN' : 'en-US';
      u.rate = 0.95; u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) { /* best-effort; the timed highlight is the real demo */ }
  }

  function play() {
    if (playing) return;
    if (elapsed >= total) elapsed = 0;
    playing = true; lastTs = 0;
    els.playIcon.innerHTML = ICON_PAUSE;
    els.play.setAttribute('aria-label', 'Pause narration');
    speak();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    playing = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null; lastTs = 0;
    els.playIcon.innerHTML = ICON_PLAY;
    els.play.setAttribute('aria-label', 'Play narration');
    if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    render();
  }

  function togglePlay() { playing ? stop() : play(); }
  function seekTo(pct) { elapsed = Math.max(0, Math.min(1, pct)) * total; if (playing) { speak(); lastTs = 0; } render(); }

  els.play.addEventListener('click', togglePlay);
  els.wave.addEventListener('click', function (e) {
    var r = els.wave.getBoundingClientRect();
    seekTo((e.clientX - r.left) / r.width);
  });
  els.wave.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { seekTo(elapsed / total + 0.06); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { seekTo(elapsed / total - 0.06); e.preventDefault(); }
    else if (e.key === ' ' || e.key === 'Enter') { togglePlay(); e.preventDefault(); }
  });
  els.mute.addEventListener('click', function () {
    voiceOn = !voiceOn;
    els.mute.classList.toggle('off', !voiceOn);
    els.mute.title = voiceOn ? 'Voice on' : 'Voice off (highlight only)';
    els.mute.setAttribute('aria-label', voiceOn ? 'Mute voice' : 'Unmute voice');
    if (!voiceOn && 'speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    else if (voiceOn && playing) speak();
  });

  // The live schematic: close the switch -> current runs the loop and the bulb lights.
  var stage = id('ci-stage'), toggle = id('ci-toggle'), toggleText = id('ci-toggleText'),
      readout = id('ci-readout'), swLabel = id('ci-swLabel');
  var closed = false;
  function paintCircuit() {
    var zh = deck.dataset.lang === 'zh';
    stage.classList.toggle('lit', closed);
    toggle.setAttribute('aria-pressed', closed ? 'true' : 'false');
    toggleText.textContent = closed ? (zh ? '断开开关' : 'Open the switch') : (zh ? '合上开关' : 'Close the switch');
    swLabel.textContent = zh ? '开关' : 'switch';
    if (closed) {
      readout.innerHTML = '<div class="calc"><b>I = V &divide; R = 6 V &divide; 3 &#8486; = 2 A</b></div>' +
        '<div class="ok">&#10003; ' + (zh ? '电流通了，灯泡亮了。' : 'Current flows, and the bulb lights.') + '</div>';
    } else {
      readout.innerHTML = '<span class="ph">' + (zh ? '回路断开了，没有电流，灯泡不亮。' : 'The loop is broken, so no current flows and the bulb stays dark.') + '</span>';
    }
  }
  toggle.addEventListener('click', function () { closed = !closed; paintCircuit(); });

  deck.addEventListener('deck:langchange', function () {
    LESSON = buildLesson(deck.dataset.lang === 'zh');
    elapsed = 0;
    load();
    paintCircuit();
  });

  load();
  paintCircuit();
})();


/* ===== NOTEBOOK screen (01): two photos of one page, the coach guides the fix ===== */
(function () {
  var deck = document.getElementById('deck');
  var root = document.getElementById('s-notebook');
  if (!deck || !root) return;

  // A stacked fraction for the typed read-back and prose: numerator over a bar over denominator.
  function fr(n, d) {
    return '<span class="frac"><span class="fn">' + n + '</span><span class="fd">' + d + '</span></span>';
  }

  // Two photos of the same page: her first try (a real, common slip) and her fix minutes later.
  // Built per language so a mid-demo language switch re-renders in place. The coaching is Socratic:
  // it names WHERE the slip is and asks the questions that lead her to the answer, never states it.
  function buildStates(zh) {
    return {
      a: {
        pos: '3 / 8', meterPct: 30,
        when: zh ? '刚刚拍下' : 'snapped just now',
        chip: zh ? '摄像头 · 自动裁切' : 'webcam · auto-cropped',
        ink: [
          { x: 62, yMid: 80, rot: -2.4, tokens: [ { f: [3, 4] }, { op: '+' }, { f: [1, 8] } ] },
          { x: 42, yMid: 152, rot: -1.4, tokens: [ { op: '=' }, { f: [6, 8] }, { op: '+' }, { f: [1, 8] } ] },
          { x: 54, yMid: 224, rot: -2.8, tokens: [ { op: '=' }, { f: [7, 16] } ] }
        ],
        readout: [
          { kind: 'good', work: fr(3, 4) + ' &rarr; ' + fr(6, 8), tag: zh ? '这一步很棒' : 'spot on',
            sub: zh ? '你把 ' + fr(3, 4) + ' 变成了 ' + fr(6, 8) + '，让两个分母一样，正是要走的这一步。'
                    : 'You turned ' + fr(3, 4) + ' into ' + fr(6, 8) + ' so the bottoms match. Exactly right.' },
          { kind: 'slip', work: fr(6, 8) + ' + ' + fr(1, 8) + ' = ' + fr(7, 16), tag: zh ? '再看看这一行' : 'take another look',
            sub: zh ? '这里两个分母已经都是 8 了。相加的时候，答案的分母应该是几呢？'
                    : 'Both bottoms here are already 8. When you add them, what should the bottom of the answer be?' }
        ],
        win: false, who: zh ? '哇一老师' : 'WAYI COACH', cav: '哇',
        html: zh ? '两个分数都化成了八分之几，这一步最难，你做到了。现在看看你的最后一行：两个分母已经一样了。那相加的时候，分母保持不变，是几？定下分母以后，两个分子加起来又是几呢？把这一行再试一次，拍给我看看。'
                 : "Nice work getting both to eighths, that's the tricky part. Now look at your last line: the two bottoms are already the same. So when you add them, what does the bottom stay as? And once that's settled, what do the two tops make together? Give that line another go and show me.",
        say: zh ? '两个分数都化成了八分之几，这一步最难，你做到了。看看最后一行：两个分母已经一样了。相加时，分母保持不变是几？两个分子加起来又是几呢？把这一行再试一次。'
                : "Nice work getting both to eighths, that's the tricky part. Look at your last line: the two bottoms are already the same. So when you add them, what does the bottom stay as? And what do the two tops make together? Give that line another go.",
        primary: zh ? '订正最后一行，再拍一次' : 'Fix the last line, show again', secondaryHidden: false
      },
      b: {
        pos: '4 / 8', meterPct: 42,
        when: zh ? '一分钟后拍下' : 'snapped a minute later',
        chip: zh ? '摄像头 · 她的订正' : 'webcam · her fix',
        ink: [
          { x: 62, yMid: 80, rot: -2.4, tokens: [ { f: [3, 4] }, { op: '+' }, { f: [1, 8] } ] },
          { x: 42, yMid: 152, rot: -1.4, tokens: [ { op: '=' }, { f: [6, 8] }, { op: '+' }, { f: [1, 8] } ] },
          { x: 54, yMid: 224, rot: -1.6, tokens: [ { op: '=' }, { strike: [7, 16] }, { f: [7, 8] } ] }
        ],
        readout: [
          { kind: 'good', work: fr(6, 8) + ' + ' + fr(1, 8) + ' = ' + fr(7, 8), tag: zh ? '就是这样' : 'that is it',
            sub: zh ? '分母保持不变，只把分子相加，关键就在这儿。' : 'You kept the bottom and added the tops. The whole move, right there.' }
        ],
        win: true, who: zh ? '答对啦' : 'GOT IT', cav: '✓',
        html: zh ? '对了，就是 ' + fr(7, 8) + '。分母保持不变，只把两个分子相加，同分母相加的窍门就在这里。这一题你拿下了，下一题走起。'
                 : 'That is it, ' + fr(7, 8) + '. You kept the bottom the same and just added the tops, which is the whole trick with the same bottom. You have got this one. On to the next.',
        say: zh ? '对了，就是七分之八。分母保持不变，只把两个分子相加，同分母相加的窍门就在这里。这一题你拿下了，下一题走起。'
                : 'That is it, seven eighths. You kept the bottom the same and just added the tops, which is the whole trick with the same bottom. You have got this one. On to the next.',
        primary: zh ? '下一题' : 'Next question', secondaryHidden: true
      }
    };
  }

  var current = 'a';
  var STATE = buildStates(deck.dataset.lang === 'zh');

  var els = {
    switch: document.getElementById('nb-switch'),
    pos: document.getElementById('nb-pos'),
    meter: document.getElementById('nb-meterFill'),
    when: document.getElementById('nb-when'),
    chip: document.getElementById('nb-pchip'),
    ink: document.getElementById('nb-photoInk'),
    readout: document.getElementById('nb-readout'),
    coachmsg: document.getElementById('nb-coachmsg'),
    cav: document.getElementById('nb-cav'),
    who: document.getElementById('nb-who'),
    text: document.getElementById('nb-coachtext'),
    primary: document.getElementById('nb-primary'),
    secondary: document.getElementById('nb-secondary'),
    hear: document.getElementById('nb-hear')
  };

  // Lay one handwritten stacked fraction and return the width it took, so the caller can advance the pen.
  // Every fraction is drawn at ONE size (fix: the struck-out answer no longer shrinks between photos);
  // `faded` only greys it, to read as the earlier answer she crossed out.
  function inkFrac(parts, n, d, x, yMid, faded) {
    var chw = 15;
    var w = Math.max(String(n).length, String(d).length) * chw + 6;
    var cx = x + w / 2, barY = yMid + 2;
    var nc = faded ? 'num old' : 'num', dc = faded ? 'den old' : 'den', bc = faded ? 'fbar old-bar' : 'fbar';
    parts.push('<text class="' + nc + '" x="' + cx + '" y="' + (barY - 7) + '" text-anchor="middle">' + n + '</text>');
    parts.push('<line class="' + bc + '" x1="' + x + '" y1="' + barY + '" x2="' + (x + w) + '" y2="' + barY + '"/>');
    parts.push('<text class="' + dc + '" x="' + cx + '" y="' + (barY + 22) + '" text-anchor="middle">' + d + '</text>');
    return w;
  }

  // Build the handwriting as SVG, roughened by a turbulence displacement filter so it reads as inky and
  // hand-drawn on any machine. Each line is a stream of fraction and operator tokens, laid left to right.
  function inkSvg(lines) {
    var GAP = 12;
    var body = lines.map(function (ln) {
      var parts = [], x = ln.x;
      ln.tokens.forEach(function (tk) {
        if (tk.op) {
          parts.push('<text class="op" x="' + x + '" y="' + (ln.yMid + 10) + '">' + tk.op + '</text>');
          x += (tk.op === '=' ? 30 : 26) + GAP;
        } else if (tk.f) {
          x += inkFrac(parts, tk.f[0], tk.f[1], x, ln.yMid, false) + GAP;
        } else if (tk.strike) {
          x += 8;
          var w = inkFrac(parts, tk.strike[0], tk.strike[1], x, ln.yMid, true);
          parts.push('<line class="strike" x1="' + (x - 5) + '" y1="' + (ln.yMid + 15) + '" x2="' + (x + w + 5) + '" y2="' + (ln.yMid - 15) + '"/>');
          x += w + GAP;
        }
      });
      return '<g transform="rotate(' + ln.rot + ' ' + ln.x + ' ' + ln.yMid + ')">' + parts.join('') + '</g>';
    }).join('');
    return '<svg class="ink" viewBox="0 0 320 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
      '<defs><filter id="nb-rough" x="-6%" y="-6%" width="112%" height="112%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></defs>' +
      '<g filter="url(#nb-rough)">' + body + '</g></svg>';
  }

  function render() {
    var s = STATE[current];
    els.pos.textContent = s.pos;
    els.meter.style.width = s.meterPct + '%';
    els.when.textContent = s.when;
    els.chip.textContent = s.chip;
    els.ink.innerHTML = inkSvg(s.ink);

    els.readout.innerHTML = s.readout.map(function (r) {
      var mark = r.kind === 'good' ? '&#10003;' : '!';
      return '<div class="rline ' + r.kind + '">' +
        '<span class="ic">' + mark + '</span>' +
        '<span class="txt"><span class="work">' + r.work + '</span> &nbsp;<span class="tag">' + r.tag + '</span>' +
        '<span class="sub">' + r.sub + '</span></span></div>';
    }).join('');

    els.coachmsg.classList.toggle('win', s.win);
    els.cav.innerHTML = s.cav;
    els.who.textContent = s.who;
    els.text.innerHTML = s.html;
    els.primary.textContent = s.primary;
    els.secondary.classList.toggle('btn-hide', s.secondaryHidden);

    var all = els.switch.querySelectorAll('.step');
    for (var i = 0; i < all.length; i++) {
      all[i].setAttribute('aria-pressed', all[i].getAttribute('data-state') === current ? 'true' : 'false');
    }
  }

  function go(next) {
    if (next === current || !STATE[next]) return;
    current = next;
    stopSpeech();
    render();
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }
  function speak() {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(STATE[current].say);
      u.lang = deck.dataset.lang === 'zh' ? 'zh-CN' : 'en-US';
      u.rate = 0.96; u.pitch = 1.06;
      window.speechSynthesis.speak(u);
    } catch (e) { /* best-effort; the visual is the real demo */ }
  }

  els.switch.addEventListener('click', function (e) {
    var btn = e.target.closest('.step');
    if (btn) go(btn.getAttribute('data-state'));
  });
  // The primary action IS the loop: on her first try it advances to her fix; on the fix it resets.
  els.primary.addEventListener('click', function () { go(current === 'a' ? 'b' : 'a'); });
  els.hear.addEventListener('click', speak);

  // Re-localise in place when the deck's language toggle fires.
  deck.addEventListener('deck:langchange', function () {
    STATE = buildStates(deck.dataset.lang === 'zh');
    stopSpeech();
    render();
  });

  render();
})();


/* ===== GUARDIAN portal (02): the evening note a parent reads: laptop + phones + day modal ===== */
(function () {
  var deck = document.getElementById('deck');
  var root = document.getElementById('s-guardian');
  if (!deck || !root) return;
  function id(x) { return document.getElementById(x); }

  // avatar colours are IDENTITY ONLY (like contact avatars); the app itself uses one accent
  var MEI = '#e0736e', HAO = '#7b74d9';
  var WEEKDAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var MONTHFULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var WD_CHAR = ['日','一','二','三','四','五','六'];
  var WD_FULL_ZH = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  var MONTH_ZH = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  var WEEKS = 18;

  var anchor = new Date(2026, 6, 24); // fixed Fri Jul 24 2026, renders identically every time
  var anchorKey = key(anchor);
  var zh = deck.dataset.lang === 'zh';

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function key(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseKey(k) { var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { var x = new Date(d); x.setDate(d.getDate() + n); return x; }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; }

  // "Friday, July 24" / "7月24日 星期五"
  function fmtFull(d) {
    return zh ? ((d.getMonth() + 1) + '月' + d.getDate() + '日 ' + WD_FULL_ZH[d.getDay()])
              : (WEEKDAY[d.getDay()] + ', ' + MONTHFULL[d.getMonth()] + ' ' + d.getDate());
  }
  // "Fri · Jul 24" / "周五 · 7月24日"
  function fmtRecent(d) {
    return zh ? ('周' + WD_CHAR[d.getDay()] + ' · ' + MONTH_ZH[d.getMonth()] + d.getDate() + '日')
              : (WEEKDAY[d.getDay()].slice(0, 3) + ' · ' + MONTH[d.getMonth()] + ' ' + d.getDate());
  }

  function buildKids(zh) {
    return {
      mei: {
        name: zh ? '美' : 'Mei', grade: zh ? '四年级 · 数学' : 'Grade 4 · Maths', initials: zh ? '美' : 'M', color: MEI,
        calTitle: zh ? '美 用心的每一天' : 'Days Mei showed up and tried',
        stats: [
          { v: '84', u: zh ? '分钟' : 'min', l: zh ? '本周' : 'This week' },
          { v: '5', u: zh ? '天' : 'days', l: zh ? '连续上学日' : 'School-day streak' },
          { v: '4', u: '', l: zh ? '自己改正的错误' : 'Own slips she fixed' }
        ],
        todayLine: zh ? '美 今晚做完了一整组分数题，还自己发现并改正了一处错误，全部做对了。这是实打实的进步。'
                      : 'Mei solved a full set of fractions tonight and cleared her own mistake to get them all right. A real, solid win.',
        stories: {
          '2026-07-24': { min: 21, lessons: 3, retries: 1, lvl: 3, focus: 88,
            para: zh ? '美 做完了一整组同分母的分数题，每一道都做出来了。有一道答案错了，她自己发现并改了过来，做完时整组题全部正确。'
                     : 'Mei worked through a full set of same-bottom fraction problems and solved every one. When a single answer came out wrong, she caught it and cleared it herself, so the whole set was correct by the time she was done.',
            good: zh ? '她做完了一整组分数题，还自己改正了一处错误，最后每道都对。'
                     : 'She solved a full set of fractions and cleared her own mistake, finishing with every answer correct.',
            next: zh ? '接下来她会遇到分母不同的分数，先从一两道慢慢开始。'
                     : 'Next she meets fractions with different bottom numbers, one or two at a time to start.',
            got: zh ? ['算出了同分母分数加法', '自己发现并改正了错误', '整组题全部做对']
                    : ['Solved same-bottom fraction addition', 'Found and cleared her own error', 'Finished the set all correct'] },
          '2026-07-22': { min: 24, lessons: 3, retries: 1, lvl: 4, focus: 100,
            para: zh ? '美 学会了同分母分数相加的方法：分母不变，把分子相加。前一天还全新的东西，如今成了她能用的本领，这类题她都能独立做对。'
                     : 'Mei learned the rule for adding fractions with the same bottom number: keep the bottom, add the tops. Something that was brand new the day before became a skill she could use, and she solved every problem of that kind on her own.',
            good: zh ? '她学会了同分母分数相加，然后每一道都自己做了出来。'
                     : 'She learned to add same-bottom fractions, then solved every one of them herself.',
            next: zh ? '她已经可以了解这样做的道理，之后再学分母不同的分数。'
                     : 'She is ready for the reason it works, and after that, fractions with different bottoms.',
            got: zh ? ['学会了同分母的方法', '这类题全部做对', '把新知识变成了本领']
                    : ['Learned the same-bottom rule', 'Solved every problem of that kind', 'Turned a new idea into a skill'] },
          '2026-07-20': { min: 16, lessons: 2, retries: 0, lvl: 3, focus: 74,
            para: zh ? '美 在一个全新的主题上开了个好头，也就是分数相加，第一批题目没有一道出错。在从未接触过的内容上，这是稳稳的第一步。'
                     : 'Mei made a clean start on a brand-new topic, adding fractions, and worked through her first problems with no wrong answers. A solid first step onto ground she had not seen before.',
            good: zh ? '她开始了一个全新的主题，分数相加，第一批题目全部做对。'
                     : 'She started a brand-new topic, adding fractions, and got her first problems all correct.',
            next: zh ? '慢慢往前推进，每天多做几道就好。'
                     : 'Build on it gently, a few more problems each day.',
            got: zh ? ['开始学分数相加', '第一批题目全部做对', '在新内容上很稳']
                    : ['Started adding fractions', 'First problems, all correct', 'Steady on new ground'] },
          '2026-07-15': { min: 6, lessons: 1, retries: 0, lvl: 1, focus: 40,
            para: zh ? '轻松的一晚。美 复习了已经学会的分数，让它保持熟练。守住一项本领本身就是一种进步，有些晚上，这样的分量刚刚好。'
                     : 'A lighter evening. Mei reviewed fractions she already knew and kept them fresh. Holding onto a skill is its own kind of progress, and some evenings that is exactly the right amount.',
            good: zh ? '她复习了分数，保持了熟练。' : 'She reviewed her fractions and kept the skill sharp.',
            next: zh ? '明天再回到新的内容。' : 'Back to new ground tomorrow.',
            got: zh ? ['复习了之前的分数', '保持了熟练'] : ['Reviewed earlier fractions', 'Kept the skill sharp'] },
          '2026-07-10': { min: 18, lessons: 3, retries: 2, lvl: 3, focus: 80,
            para: zh ? '美 今晚熟练掌握了 6 和 9 的乘法口诀，又快又准，还攻克了她总记错的 7 乘 8。整套口诀里，只剩 7 和 8 还没变成脱口而出。'
                     : 'Mei mastered her 6 and 9 times-tables tonight, answering them quickly and correctly, and cleared 7 times 8, the fact she kept missing. Only the 7s and 8s are left before the whole table is automatic.',
            good: zh ? '她熟练掌握了 6 和 9 的乘法口诀，还攻克了总记错的那道。'
                     : 'She mastered her 6 and 9 times-tables and cleared the fact she kept missing.',
            next: zh ? '只剩 7 和 8 还需要练到脱口而出。' : 'Only the 7s and 8s left to make instant.',
            got: zh ? ['掌握了 6 的乘法口诀', '掌握了 9 的乘法口诀', '攻克了 7 乘 8']
                    : ['6 times-table mastered', '9 times-table mastered', 'Cleared 7 times 8'] }
        }
      },
      hao: {
        name: zh ? '浩' : 'Hao', grade: zh ? '二年级 · 语文' : 'Grade 2 · Reading', initials: zh ? '浩' : 'H', color: HAO,
        calTitle: zh ? '浩 用心的每一天' : 'Days Hao showed up and tried',
        stats: [
          { v: '58', u: zh ? '分钟' : 'min', l: zh ? '本周' : 'This week' },
          { v: '4', u: zh ? '天' : 'days', l: zh ? '连续上学日' : 'School-day streak' },
          { v: '11', u: '', l: zh ? '新学的汉字' : 'New characters met' }
        ],
        todayLine: zh ? '浩 今晚学会了四个新汉字，还把整个故事大声读了出来。今早还不认识的四个字，现在都会了。'
                      : 'Hao learned four new characters tonight and read the whole story aloud. Four words he did not know this morning, he knows now.',
        stories: {
          '2026-07-24': { min: 12, lessons: 2, retries: 1, lvl: 3, focus: 82,
            para: zh ? '浩 今晚大声读了故事，还学会了四个新字：花、草、树、木。到最后，这四个字他都能自己认读了。今早还不认识的四个字，现在都会了。'
                     : 'Hao read tonight\'s story aloud and learned four new characters: 花 (flower), 草 (grass), 树 (tree) and 木 (wood). By the end he could read all four on his own. Four words he did not know this morning, he knows now.',
            good: zh ? '他学会了四个新字，还把整个故事大声读了出来。'
                     : 'He learned four new characters and read the whole story aloud.',
            next: zh ? '接下来他会看到 木 就藏在 树 里，把他刚认识的两个字联系起来。'
                     : 'Next he will see how 木 (wood) sits inside 树 (tree), linking two characters he now knows.',
            got: zh ? ['学会了 花、草、树、木', '大声读完了整个故事', '掌握了四个新字']
                    : ['Learned 花, 草, 树 and 木', 'Read the whole story aloud', 'Four new words mastered'] },
          '2026-07-21': { min: 10, lessons: 2, retries: 0, lvl: 3, focus: 70,
            para: zh ? '浩 在阅读上迈过了一个重要的坎：现在他能用已经认识的部件推出一个新字，而不必每个字都等人教。这一项本领，会让他往后读的每样东西都更快。'
                     : 'Hao reached a real milestone in reading: he can now work out a new character from parts he already knows, instead of needing each one taught. That one skill will speed up everything he reads from here.',
            good: zh ? '他学会了借助已经认识的字，自己推出新字。'
                     : 'He learned to work out new characters on his own from ones he already knows.',
            next: zh ? '把故事保持在他的水平上，让他能用上这项新本领。'
                     : 'Keep the stories right at his level so he can use the new skill.',
            got: zh ? ['自己推出了新字', '一口气读完了一段']
                    : ['Worked out new characters on his own', 'Read a passage without stopping'] },
          '2026-07-17': { min: 16, lessons: 3, retries: 1, lvl: 4, focus: 100,
            para: zh ? '浩 把一篇短故事从头读到了尾，读到最后一页时几乎不需要帮忙。对他这个年纪的孩子来说，能自己读完一整篇故事是一个重要的里程碑。'
                     : 'Hao read a whole short story from beginning to end, needing almost no help by the last page. Finishing a complete story on his own is a real milestone for a reader his age.',
            good: zh ? '他把一整篇故事从头读到尾，几乎全靠自己。'
                     : 'He read a whole story from start to finish, almost entirely on his own.',
            next: zh ? '让他自己挑下一篇故事，保持这股劲头。'
                     : 'Let him choose the next story to keep the momentum.',
            got: zh ? ['读完了一整篇故事', '几乎全靠自己读', '可以尝试更长的了']
                    : ['Finished a whole story', 'Read it almost on his own', 'Ready for a longer one'] },
          '2026-07-14': { min: 8, lessons: 1, retries: 0, lvl: 2, focus: 52,
            para: zh ? '浩 练习了声调，第一声和第四声掌握得很稳。第二声和第三声是经典的易混对，他已经很接近了，放慢速度时能清楚地听出区别。'
                     : 'Hao worked on his tones and got the first and fourth solidly right. The second and third are the classic tricky pair, and he is close, hearing the difference clearly when it is slowed down.',
            good: zh ? '他把第一声和第四声练稳了。' : 'He got the first and fourth tones solid.',
            next: zh ? '再多练一点第二声和第三声，这对容易混的音。'
                     : 'A little more on the second and third tones, the tricky pair.',
            got: zh ? ['第一声和第四声很稳', '开始听出易混的那一对']
                    : ['First and fourth tones, solid', 'Started hearing the tricky pair'] }
        }
      }
    };
  }

  var KIDS = buildKids(zh);
  var active = 'mei';

  function levelFor(kid, d) {
    var k = key(d);
    var story = KIDS[kid].stories[k];
    if (story) return story.lvl;
    var daysAgo = Math.round((anchor - d) / 86400000);
    var wd = d.getDay();
    var r = hash(kid + k);
    var showProb = daysAgo < 21 ? 0.74 : daysAgo < 42 ? 0.52 : 0.30;
    if (wd === 0 || wd === 6) showProb *= 0.42;
    if (r > showProb) return 0;
    var ceiling = daysAgo < 21 ? 4 : daysAgo < 49 ? 3 : 2;
    var lvl = 1 + Math.floor((r / showProb) * ceiling);
    return Math.max(1, Math.min(ceiling, lvl));
  }

  function genInfo(kid, d) {
    var k = key(d);
    var story = KIDS[kid].stories[k];
    if (story) return story;
    var lvl = levelFor(kid, d);
    if (lvl === 0) return null;
    var r = hash(kid + 'i' + k);
    var minsBy = [0, 6, 12, 18, 25];
    var min = minsBy[lvl] + Math.floor(r * 5);
    var lessons = [0, 1, 2, 3, 4][lvl];
    var isMei = kid === 'mei';
    var leadByLvl = zh ? ['', '短短的一次。', '稳稳的一次。', '扎实的一次。', '很棒的一次。']
                       : ['', 'A short session.', 'A steady session.', 'A solid session.', 'A strong session.'];
    var subject = isMei
      ? (zh ? '美 做了数学练习，做出了一组不错的题目，让技能保持熟练。' : 'Mei worked through her maths practice and solved a good set of problems, keeping her skills sharp.')
      : (zh ? '浩 大声朗读，又在已经认识的字上添了几个新字。' : 'Hao read aloud and added a few new characters to the ones he already knows.');
    return {
      min: min, lessons: lessons, retries: lvl >= 3 ? 1 : 0, lvl: lvl, focus: [0, 34, 55, 76, 94][lvl],
      para: leadByLvl[lvl] + (zh ? '' : ' ') + subject,
      good: isMei ? (zh ? '她做出了一组不错的练习题。' : 'She solved a good set of practice problems.')
                  : (zh ? '他大声朗读，学到了几个新字。' : 'He read aloud and picked up a few new words.'),
      next: isMei ? (zh ? '明天再练一小会儿，保持下去。' : 'A short session tomorrow keeps it going.')
                  : (zh ? '明天再读一小会儿，保持下去。' : 'A short read tomorrow keeps it going.'),
      got: isMei ? (zh ? ['做了练习题', '保持了熟练'] : ['Solved practice problems', 'Kept her skills sharp'])
                 : (zh ? ['大声朗读', '认识了几个新字'] : ['Read aloud', 'Met a few new characters'])
    };
  }

  var ALPHA = [0, 22, 44, 68, 100];
  function cellBg(lvl) {
    if (lvl === 0) return 'var(--cell-empty)';
    return 'color-mix(in srgb, var(--accent) ' + ALPHA[lvl] + '%, transparent)';
  }

  function renderKids() {
    var host = id('gp-kids');
    host.innerHTML = '';
    Object.keys(KIDS).forEach(function (kidId) {
      var k = KIDS[kidId];
      var b = document.createElement('button');
      b.className = 'kid-chip';
      b.dataset.kid = kidId;
      b.setAttribute('aria-pressed', kidId === active ? 'true' : 'false');
      b.style.setProperty('--k', k.color);
      b.innerHTML = '<span class="kid-av">' + k.initials + '</span>' +
        '<span class="kid-meta"><span class="kid-nm">' + k.name + '</span><span class="kid-gr">' + k.grade + '</span></span>';
      b.addEventListener('click', function () { active = kidId; renderAll(); });
      host.appendChild(b);
    });
  }

  function renderHeat() {
    var kid = KIDS[active];
    var host = id('gp-heat');
    id('gp-calTitle').textContent = kid.calTitle;
    host.innerHTML = '';

    var endSunday = addDays(anchor, -anchor.getDay());
    var start = addDays(endSunday, -(WEEKS - 1) * 7);

    var months = document.createElement('div');
    months.className = 'heat-months';
    var lastMonth = -1;
    for (var c = 0; c < WEEKS; c++) {
      var colTop = addDays(start, c * 7);
      var span = document.createElement('span');
      if (colTop.getMonth() !== lastMonth && colTop <= anchor) { span.textContent = zh ? MONTH_ZH[colTop.getMonth()] : MONTH[colTop.getMonth()]; lastMonth = colTop.getMonth(); }
      months.appendChild(span);
    }
    host.appendChild(months);

    var days = document.createElement('div');
    days.className = 'heat-days';
    (zh ? ['', '一', '', '三', '', '五', ''] : ['', 'Mon', '', 'Wed', '', 'Fri', '']).forEach(function (t) {
      var s = document.createElement('span'); s.textContent = t; days.appendChild(s);
    });
    host.appendChild(days);

    var cells = document.createElement('div');
    cells.className = 'heat-cells';
    for (var col = 0; col < WEEKS; col++) {
      for (var row = 0; row < 7; row++) {
        var d = addDays(start, col * 7 + row);
        var btn = document.createElement('button');
        var future = d > anchor;
        if (future) {
          btn.className = 'cell future lv0';
          btn.tabIndex = -1;
        } else {
          var lvl = levelFor(active, d);
          btn.className = 'cell lv' + lvl;
          btn.style.background = cellBg(lvl);
          if (key(d) === anchorKey) btn.classList.add('is-today');
          var info = genInfo(active, d);
          var label = fmtFull(d);
          if (lvl === 0) {
            btn.classList.add('lv0');
            btn.setAttribute('aria-label', zh ? (label + '，休息日') : (label + ', a rest day'));
            btn.tabIndex = -1;
          } else {
            btn.setAttribute('aria-label', zh ? (label + '，' + info.min + ' 分钟，' + info.lessons + ' 节课。点击查看记录。') : (label + ', ' + info.min + ' minutes, ' + info.lessons + ' lessons. Open the note.'));
            (function (dd) { btn.addEventListener('click', function () { openDay(active, dd); }); })(new Date(d));
          }
        }
        cells.appendChild(btn);
      }
    }
    host.appendChild(cells);

    var legend = id('gp-legend');
    legend.innerHTML = '';
    [0, 1, 2, 3, 4].forEach(function (lvl) {
      var s = document.createElement('span');
      s.className = 'sw';
      s.style.background = cellBg(lvl);
      legend.appendChild(s);
    });
  }

  function renderRight() {
    var kid = KIDS[active];
    var stats = id('gp-stats');
    stats.innerHTML = '';
    kid.stats.forEach(function (s) {
      var el = document.createElement('div');
      el.className = 'stat';
      el.innerHTML = '<div class="v">' + s.v + (s.u ? '<span class="u">' + s.u + '</span>' : '') + '</div><div class="l">' + s.l + '</div>';
      stats.appendChild(el);
    });

    var today = id('gp-today');
    today.style.setProperty('--k', kid.color);
    today.innerHTML =
      '<div class="th"><span class="tav">' + kid.initials + '</span><span class="tt">' + (zh ? '今晚，一句话' : 'Tonight, in one breath') + '</span></div>' +
      '<p>' + kid.todayLine + '</p>' +
      '<button class="open" id="gp-openToday"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' + (zh ? '阅读完整记录' : 'Read the full note') + '</button>';
    id('gp-openToday').addEventListener('click', function () { openDay(active, anchor); });
  }

  function renderRecent() {
    var kid = KIDS[active];
    var host = id('gp-recent');
    var chev = '<span class="rchev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>';
    var keys = Object.keys(kid.stories).filter(function (k) { return k !== anchorKey; }).sort().reverse().slice(0, 3);
    var rows = keys.map(function (k) {
      var st = kid.stories[k], d = parseKey(k);
      var dl = fmtRecent(d);
      return '<button class="rnote" data-k="' + k + '"><span class="rdate">' + dl + '</span>' +
        '<span class="rsum">' + st.good + '</span>' +
        '<span class="rmin">' + st.min + (zh ? ' 分钟' : ' min') + '</span>' + chev + '</button>';
    }).join('');
    host.innerHTML = '<div class="panel-title"><h2>' + (zh ? '最近的记录' : 'Recent notes') + '</h2><span class="hint">' + (zh ? '最近几个晚上，点一下再看' : 'the last few evenings, tap to reopen') + '</span></div>' +
      '<div class="recent-list">' + rows + '</div>';
    host.querySelectorAll('.rnote').forEach(function (b) {
      b.addEventListener('click', function () { openDay(active, parseKey(b.dataset.k)); });
    });
  }

  var scrim = id('gp-scrim');
  var lastFocus = null;
  var openState = null;

  function fillModal(kidId, d) {
    var kid = KIDS[kidId];
    var info = genInfo(kidId, d);
    if (!info) return;

    var av = id('gp-mAv');
    av.textContent = kid.initials;
    av.style.background = kid.color;

    id('gp-mWho').textContent = kid.name + ' · ' + kid.grade;
    id('gp-mDate').textContent = fmtFull(d);
    id('gp-mLead').textContent = key(d) === anchorKey ? (zh ? '今晚' : 'Tonight') : (zh ? '那个晚上' : 'That evening');
    id('gp-mPara').textContent = info.para;
    id('gp-mGoodTitle').textContent = kidId === 'mei' ? (zh ? '她的收获' : 'What she achieved') : (zh ? '他的收获' : 'What he achieved');
    id('gp-mGood').textContent = info.good;
    id('gp-mNext').textContent = info.next;

    var ms = id('gp-mStats');
    ms.innerHTML =
      '<div class="m-stat"><div class="v">' + info.min + '<span class="u">' + (zh ? '分钟' : 'min') + '</span></div><div class="l">' + (zh ? '专注时长' : 'On task') + '</div></div>' +
      '<div class="m-stat"><div class="v">' + info.lessons + '</div><div class="l">' + (zh ? '涉及课程' : 'Lessons touched') + '</div></div>' +
      '<div class="m-stat"><div class="v">' + info.retries + '</div><div class="l">' + (zh ? '纠正的次数' : 'Tries turned around') + '</div></div>' +
      '<div class="m-stat"><div class="v">' + info.focus + '<span class="u">%</span></div><div class="l">' + (zh ? '全程投入' : 'Stayed with it') + '</div></div>';

    renderWeek(kidId, d);

    id('gp-mGotTitle').textContent = kidId === 'mei' ? (zh ? '她完成了这些' : 'What she got done') : (zh ? '他完成了这些' : 'What he got done');
    var list = id('gp-mList');
    list.innerHTML = '';
    (info.got || []).forEach(function (t) { list.appendChild(achievement(t)); });
  }

  function openDay(kidId, d) {
    if (!genInfo(kidId, d)) return;
    fillModal(kidId, d);
    openState = { kid: kidId, date: new Date(d) };
    lastFocus = document.activeElement;
    scrim.classList.add('open');
    id('gp-mClose').focus();
  }

  // hand-drawn "this week" bar chart: minutes per day, the opened day picked out in the accent
  function renderWeek(kidId, d) {
    var monday = addDays(d, -((d.getDay() + 6) % 7));
    var mins = [], keys = [], future = [], max = 25;
    for (var i = 0; i < 7; i++) {
      var dd = addDays(monday, i);
      keys.push(key(dd));
      if (dd > anchor) { mins.push(0); future.push(true); continue; }
      future.push(false);
      var info = genInfo(kidId, dd);
      var m = info ? info.min : 0;
      mins.push(m);
      if (m > max) max = m;
    }
    var selKey = key(d), labels = zh ? ['一', '二', '三', '四', '五', '六', '日'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    var W = 280, H = 100, slot = W / 7, bw = 15, base = 74, maxH = 56;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + (zh ? '本周每天的专注分钟数' : 'Minutes on task each day this week') + '">';
    s += '<line x1="0" y1="' + base + '" x2="' + W + '" y2="' + base + '" style="stroke:var(--chart-line)" stroke-width="1"/>';
    for (var j = 0; j < 7; j++) {
      var cx = slot * j + slot / 2;
      var sel = keys[j] === selKey;
      var h = mins[j] > 0 ? Math.max(3, Math.round(mins[j] / max * maxH)) : 0;
      var y = base - h;
      var fill = future[j] ? 'var(--chart-future)' : sel ? 'var(--accent)' : 'var(--chart-idle)';
      if (h > 0) s += '<rect x="' + (cx - bw / 2) + '" y="' + y + '" width="' + bw + '" height="' + h + '" rx="4" style="fill:' + fill + '"/>';
      else s += '<circle cx="' + cx + '" cy="' + base + '" r="1.5" style="fill:var(--chart-dot)"/>';
      if (sel && mins[j] > 0) s += '<text x="' + cx + '" y="' + (y - 5) + '" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--accent)">' + mins[j] + '</text>';
      s += '<text x="' + cx + '" y="' + (H - 4) + '" text-anchor="middle" font-size="10" font-weight="' + (sel ? '700' : '400') + '" style="fill:' + (sel ? 'var(--content)' : 'var(--faint)') + '">' + labels[j] + '</text>';
    }
    s += '</svg>';
    id('gp-mWeek').innerHTML = s;
  }

  function achievement(text) {
    var row = document.createElement('div');
    row.className = 'm-li flew';
    row.innerHTML = '<span class="tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span><span>' + text + '</span>';
    return row;
  }

  function closeModal() {
    scrim.classList.remove('open');
    openState = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  id('gp-mClose').addEventListener('click', closeModal);
  scrim.addEventListener('click', function (e) { if (e.target === scrim) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && scrim.classList.contains('open')) closeModal(); });

  // phone portal (static shot, Mei)
  function renderPhone() {
    var kid = KIDS.mei;
    var host = id('gp-pPortalBody');

    var endSunday = addDays(anchor, -anchor.getDay());
    var pWeeks = 9;
    var start = addDays(endSunday, -(pWeeks - 1) * 7);
    var cells = '';
    for (var col = 0; col < pWeeks; col++) {
      for (var row = 0; row < 7; row++) {
        var d = addDays(start, col * 7 + row);
        if (d > anchor) { cells += '<span class="cell future lv0"></span>'; continue; }
        var lvl = levelFor('mei', d);
        var ring = key(d) === anchorKey ? ' is-today' : '';
        cells += '<span class="cell lv' + lvl + ring + '" style="background:' + cellBg(lvl) + '"></span>';
      }
    }

    var s0 = kid.stats[0], s1 = kid.stats[1];
    host.innerHTML =
      '<div class="pp-scroll">' +
        '<div class="pp-hi">' + (zh ? '林家长，晚上好。' : 'Good evening, Lin.') + '<span>' + (zh ? '两个孩子今晚都学完了。' : 'Both of them are done for the night.') + '</span></div>' +
        '<div class="pp-kids">' +
          '<div class="pp-kid" data-active="true" style="--k:' + MEI + '"><span class="a">' + KIDS.mei.initials + '</span><span class="n">' + KIDS.mei.name + '</span></div>' +
          '<div class="pp-kid" data-active="false" style="--k:' + HAO + '"><span class="a">' + KIDS.hao.initials + '</span><span class="n">' + KIDS.hao.name + '</span></div>' +
        '</div>' +
        '<div class="pp-today"><div class="t">' + kid.name + (zh ? ' · 今晚' : ' · tonight') + '</div><p>' + kid.todayLine + '</p></div>' +
        '<div class="pp-cal"><div class="t">' + (zh ? '坚持练习' : 'Showed up') + ' <span>' + (zh ? '近 9 周' : 'last 9 weeks') + '</span></div>' +
          '<div class="heat-cells" style="grid-template-rows:repeat(7,12px);grid-auto-columns:12px;gap:3px;justify-content:center">' + cells + '</div>' +
        '</div>' +
        '<div class="pp-stats">' +
          '<div class="pp-stat"><div class="v">' + s0.v + '<span>' + s0.u + '</span></div><div class="l">' + s0.l + '</div></div>' +
          '<div class="pp-stat"><div class="v">' + s1.v + '<span>' + s1.u + '</span></div><div class="l">' + s1.l + '</div></div>' +
        '</div>' +
      '</div>';
  }

  function renderAll() { renderKids(); renderHeat(); renderRight(); renderRecent(); }

  // Re-render in the new language when the deck's language toggle fires (modal too, if open).
  deck.addEventListener('deck:langchange', function () {
    zh = deck.dataset.lang === 'zh';
    KIDS = buildKids(zh);
    renderAll();
    renderPhone();
    if (openState) fillModal(openState.kid, openState.date);
  });

  renderAll();
  renderPhone();
})();


/* wayi-logo-inject */(function(){var L="<svg viewBox=\"0 0 1095 1092\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\"><path d=\"M1052.26 488.27C1050.93 467.48 1048.41 447.02 1044.78 426.95C1039.47 397.57 1031.78 369.02 1021.91 341.53L1014.51 343.33C1024.67 371.12 1032.55 400.01 1037.91 429.77C1041.35 448.82 1043.75 468.23 1045.06 487.93C1045.83 499.56 1046.22 511.29 1046.22 523.11C1046.22 541.49 1045.27 559.64 1043.42 577.53C1041.4 597.11 1038.29 616.38 1034.17 635.26C1027.72 664.79 1018.77 693.4 1007.57 720.83C1000.16 738.97 991.76 756.6 982.43 773.65C968.04 799.99 951.44 824.96 932.89 848.3C920.73 863.62 907.719 878.23 893.939 892.08C872.899 913.24 850.05 932.61 825.65 949.93C809.66 961.29 793.01 971.77 775.76 981.29C749.82 995.64 722.54 1007.83 694.15 1017.66C675.56 1024.08 656.5 1029.49 637.03 1033.81C608.37 1040.18 578.83 1044.2 548.62 1045.65C540.17 1046.05 531.659 1046.26 523.109 1046.26C511.589 1046.26 500.159 1045.89 488.829 1045.15C458.719 1043.21 429.31 1038.71 400.81 1031.89C381.09 1027.16 361.81 1021.32 343.03 1014.43C330.53 1009.85 318.26 1004.8 306.24 999.31C306.22 999.31 306.189 999.29 306.169 999.28C305.759 999.1 305.369 998.91 304.969 998.73C290.459 992.07 276.299 984.76 262.539 976.83L258.77 988.03C283.79 1002.5 310.09 1014.97 337.45 1025.24C357.84 1032.88 378.83 1039.3 400.32 1044.4C428.24 1051.04 457.02 1055.45 486.46 1057.43C498.37 1058.24 510.4 1058.65 522.52 1058.65C532.31 1058.65 542.029 1058.38 551.689 1057.85C581.229 1056.24 610.129 1052.2 638.189 1045.91C659.359 1041.17 680.059 1035.15 700.199 1027.95C727.899 1018.03 754.55 1005.86 779.91 991.65C798.48 981.26 816.369 969.77 833.479 957.27C857.209 939.97 879.46 920.73 900 899.78C914.65 884.86 928.42 869.08 941.24 852.51C959.21 829.32 975.309 804.59 989.339 778.57C999.119 760.42 1007.88 741.64 1015.56 722.3C1026.36 695.13 1035 666.87 1041.28 637.72C1045.58 617.79 1048.78 597.45 1050.8 576.76C1052.52 559.24 1053.4 541.48 1053.4 523.51C1053.4 511.67 1053.02 499.92 1052.26 488.27Z\" fill=\"#939598\"/>\n      <path d=\"M779.909 991.65L775.759 981.29L774.419 977.93C774.049 978.15 773.669 978.35 773.299 978.57C747.549 993.3 720.679 1005.68 693.019 1015.63C693.009 1015.64 692.989 1015.65 692.969 1015.66L694.149 1017.66L700.199 1027.95L715.529 1053.98C717.169 1052.93 718.819 1051.9 720.479 1050.89C747.079 1034.67 776.119 1022.68 786.329 1018.66C788.779 1017.69 790.139 1017.19 790.139 1017.19L779.909 991.65Z\" fill=\"#818285\"/>\n      <path d=\"M720.479 1050.89L724.039 1057.55C751.439 1040.04 788.948 1025.8 788.948 1025.8L786.328 1018.66C776.118 1022.68 747.079 1034.68 720.479 1050.89Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M638.19 1045.91L637.03 1033.81L636.59 1029.21C636.17 1029.32 635.76 1029.41 635.34 1029.51C606.48 1036.39 577.21 1040.7 547.87 1042.46H547.82L548.62 1045.65L551.69 1057.85L558.67 1085.59C560.53 1085.05 562.4 1084.52 564.28 1084.02C594.37 1075.95 625.62 1072.63 636.55 1071.64C639.17 1071.41 640.62 1071.31 640.62 1071.31L638.19 1045.91Z\" fill=\"#818285\"/>\n      <path d=\"M564.281 1084.02L565.821 1091.41C597.041 1082.33 637.041 1079.23 637.041 1079.23L636.541 1071.65C625.611 1072.63 594.361 1075.96 564.281 1084.03V1084.02Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M488.61 1039.52C458.99 1038 429.69 1033.88 401.04 1027.3C401.02 1027.3 401.01 1027.3 400.99 1027.29L400.81 1031.89L400.32 1044.4L399.25 1071.73C401.19 1071.73 403.13 1071.76 405.08 1071.81C436.22 1072.54 467.14 1078.16 477.9 1080.29C480.48 1080.8 481.9 1081.12 481.9 1081.12L486.46 1057.43L488.83 1045.15L489.9 1039.59C489.46 1039.57 489.04 1039.54 488.61 1039.52Z\" fill=\"#818285\"/>\n      <path d=\"M405.081 1071.81L404.48 1079.33C436.99 1079.41 476.25 1087.71 476.25 1087.71L477.91 1080.29C467.15 1078.16 436.231 1072.54 405.091 1071.81H405.081Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M345.009 1007.79C317.009 997.98 290.059 985.78 264.429 971.39C264.409 971.39 264.399 971.38 264.379 971.37L262.539 976.83L258.769 988.03L250.189 1013.51C252.049 1014.07 253.909 1014.64 255.759 1015.23C285.439 1024.71 313.519 1038.81 323.249 1043.89C325.579 1045.1 326.849 1045.81 326.849 1045.81L337.449 1025.24L343.029 1014.43L346.229 1008.22C345.809 1008.08 345.419 1007.93 345.009 1007.79Z\" fill=\"#818285\"/>\n      <path d=\"M255.759 1015.23L253.059 1022.28C284.229 1031.52 319.559 1050.54 319.559 1050.54L323.239 1043.89C313.509 1038.81 285.429 1024.71 255.759 1015.23Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M1075.94 407.86C1063.67 379.23 1055.93 348.77 1053.4 338.1C1052.79 335.54 1052.49 334.11 1052.49 334.11L1021.91 341.53L1014.51 343.33L1011.39 344.09C1011.56 344.49 1011.71 344.89 1011.87 345.29C1022.79 372.87 1031.22 401.23 1037.13 430.02C1037.14 430.04 1037.14 430.06 1037.15 430.08L1037.91 429.77L1044.78 426.95L1078.29 413.2C1077.49 411.43 1076.7 409.65 1075.94 407.86Z\" fill=\"#818285\"/>\n      <path d=\"M1075.94 407.86L1083.03 405.28C1069.6 375.67 1060.84 336.52 1060.84 336.52L1053.41 338.09C1055.94 348.77 1063.68 379.22 1075.94 407.86Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M1086.5 567.18C1082.8 536.26 1083.96 504.85 1084.54 493.9C1084.67 491.27 1084.79 489.82 1084.79 489.82L1052.26 488.27L1045.06 487.93L1042.54 487.81C1042.59 488.24 1042.62 488.67 1042.66 489.09C1045.36 518.64 1045.46 548.22 1043.03 577.51C1043.03 577.54 1043.02 577.55 1043.03 577.57L1043.42 577.53L1050.8 576.76L1087.25 572.97C1086.99 571.05 1086.73 569.12 1086.5 567.18Z\" fill=\"#818285\"/>\n      <path d=\"M1086.5 567.19L1094.03 566.72C1089.49 534.53 1092.11 494.49 1092.11 494.49L1084.53 493.91C1083.95 504.87 1082.79 536.27 1086.5 567.2V567.19Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M1041.28 637.72L1034.17 635.26L1031.94 634.49C1031.86 634.92 1031.77 635.33 1031.69 635.75C1025.96 664.86 1017.72 693.27 1007.13 720.69C1007.12 720.71 1007.12 720.73 1007.11 720.75L1007.57 720.83L1015.56 722.3L1050.85 728.79C1051.13 726.87 1051.43 724.95 1051.75 723.03C1056.91 692.31 1066.87 662.51 1070.52 652.16C1071.39 649.67 1071.9 648.31 1071.9 648.31L1041.28 637.72Z\" fill=\"#818285\"/>\n      <path d=\"M1051.75 723.03L1059.11 724.7C1063.82 692.53 1077.62 654.85 1077.62 654.85L1070.51 652.15C1066.87 662.5 1056.91 692.3 1051.75 723.02V723.03Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M989.34 778.57L982.43 773.65L980.44 772.23C980.24 772.62 980.04 773 979.84 773.38C966.14 799.69 950.23 824.63 932.35 847.96C932.35 847.98 932.33 847.99 932.32 848.01L932.89 848.3L941.24 852.51L972.01 868.04C972.82 866.28 973.65 864.52 974.51 862.77C988.11 834.75 1006.06 808.96 1012.47 800.06C1014.01 797.92 1014.89 796.76 1014.89 796.76L989.34 778.57Z\" fill=\"#818285\"/>\n      <path d=\"M974.51 862.78L981.1 866.45C994.68 836.91 1018.53 804.65 1018.53 804.65L1012.47 800.06C1006.06 808.96 988.11 834.75 974.5 862.78H974.51Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M899.999 899.78L893.939 892.08L892.219 889.89C891.919 890.21 891.619 890.51 891.319 890.82C870.769 912.21 848.469 931.66 824.739 949C824.719 949.02 824.709 949.02 824.699 949.04L825.649 949.93L833.479 957.27L857.139 979.45C858.409 977.99 859.709 976.53 861.019 975.09C881.969 952.04 906.449 932.35 915.119 925.61C917.189 924 918.359 923.13 918.359 923.13L899.999 899.78Z\" fill=\"#818285\"/>\n      <path d=\"M861.02 975.09L866.31 980.47C887.67 955.95 919.64 931.72 919.64 931.72L915.12 925.61C906.46 932.35 881.97 952.04 861.02 975.09Z\" fill=\"#3A3A3C\"/>\n      <path d=\"M980.699 722.12H819.939V753.36H980.699V722.12Z\" fill=\"#898989\"/>\n      <path d=\"M980.699 709.17H819.939V740.41H980.699V709.17Z\" fill=\"#393636\"/>\n      <path d=\"M771.311 816.67L816.6 911.53L867.431 887.53L872.181 862.69L843.431 783.02\" fill=\"white\"/>\n      <path d=\"M771.311 816.67L816.6 911.53L867.431 887.53L872.181 862.69L843.431 783.02\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M656.89 720.99H299.74V746.2H656.89V720.99Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M208.51 725.12H76.3203V756.36H208.51V725.12Z\" fill=\"#898989\"/>\n      <path d=\"M208.51 712.17H76.3203V743.41H208.51V712.17Z\" fill=\"#393636\"/>\n      <path d=\"M678.23 764.83H524.75V889.81H678.23V764.83Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M669.59 769.18H534.48V889.81H669.59V769.18Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M757.461 952.42V905.5\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M523.11 0C234.2 0 0 234.21 0 523.11C0 701.29 89.08 858.67 225.13 953.13C225.53 953.41 225.94 953.69 226.34 953.96C226.36 953.97 226.37 953.98 226.39 953.99C251.12 971.08 277.4 986.07 304.97 998.73C305.37 998.91 305.76 999.1 306.17 999.28C306.19 999.29 306.22 999.3 306.24 999.31C372.31 1029.47 445.75 1046.26 523.11 1046.26C812.01 1046.26 1046.22 812.02 1046.22 523.11C1046.22 234.2 812.01 0 523.11 0ZM872.18 862.7C854.93 880.33 836.35 896.67 816.61 911.53H816.6C797.89 925.61 778.13 938.37 757.46 949.66C688.36 987.45 609.06 1008.93 524.75 1008.93C491.08 1008.93 458.2 1005.5 426.46 998.98C417.7 997.18 409.03 995.15 400.46 992.87C364.15 983.3 329.51 969.63 297.06 952.37C289.44 948.33 281.95 944.09 274.58 939.65C269.61 936.66 264.7 933.59 259.85 930.41C248.8 923.22 238.06 915.59 227.66 907.52C205.38 890.29 184.64 871.15 165.67 850.36C158.16 842.12 150.93 833.62 143.99 824.87C126.97 803.43 111.73 780.52 98.49 756.36C96.14 752.08 93.85 747.76 91.64 743.4C88.56 737.38 85.61 731.28 82.8 725.12C80.83 720.83 78.93 716.51 77.09 712.16C52.52 654.05 38.93 590.17 38.93 523.11C38.93 254.81 256.44 37.29 524.75 37.29C793.06 37.29 1010.57 254.81 1010.57 523.11C1010.57 589.01 997.45 651.86 973.66 709.16C971.86 713.51 970 717.84 968.06 722.12C965.3 728.29 962.4 734.38 959.37 740.4C957.2 744.76 954.96 749.08 952.64 753.36C930.98 793.54 903.82 830.32 872.18 862.7Z\" fill=\"#4D4D4E\"/>\n      <path d=\"M487.75 756.36V924.93H757.46V893.31V802.26\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M510.781 895.55L423.94 1002.07L272.701 942.83L257.271 934.83L142.23 828.74L214.23 670.64L215.8 670.13C233.62 677.92 330.21 729.45 322.75 822.05L338.18 831.19C338.18 831.19 443.531 781.39 510.781 895.55Z\" fill=\"#F1C922\" stroke=\"#575555\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M323.75 821.05L339.18 830.19L272.7 942.83L257.27 934.83L323.75 821.05Z\" fill=\"white\" stroke=\"#575555\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M479.119 935.13H757.459\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M653.651 781.69H594.48V848.86H653.651V781.69Z\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M650.481 787.28H596.961V794.52H650.481V787.28Z\" fill=\"#3B2952\"/>\n      <path d=\"M215.799 670.13C215.799 670.13 332.779 728.8 322.899 819.97L339.179 830.19C339.179 830.19 444.579 782.84 510.779 895.55L517.459 889.82C517.459 889.82 466.409 777.31 339.169 815.28C339.169 815.28 323.679 701.12 223.609 666.07L215.789 670.13H215.799Z\" fill=\"white\" stroke=\"#575555\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M843.38 781.44C841.69 790.7 830.53 801.61 807.34 811.78C784.16 821.97 762.4 823.9 757.88 813.61C757.34 812.38 757.08 811.05 757.08 809.66C763.51 817.07 783.19 814.66 804.09 805.48C824.55 796.49 835.85 787.69 839.09 778.7C839.55 777.39 839.66 775.97 839.44 774.61C842.36 776.37 843.88 778.69 843.38 781.42V781.44Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M817.741 702.22L839.181 773.43C839.301 773.82 839.391 774.22 839.451 774.63C839.671 775.99 839.571 777.41 839.101 778.72C835.871 787.71 824.571 796.51 804.101 805.5C783.201 814.67 763.531 817.09 757.091 809.68C756.531 809.03 756.061 808.3 755.711 807.5C755.701 807.46 755.681 807.44 755.671 807.4L721.391 735.65L817.731 702.23L817.741 702.22Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M795.42 652.23L822.04 631.91L838.54 636.47L811.59 658.52L795.42 652.23Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M804.561 505.18L822.041 631.91L838.541 636.47L818.19 508.04L804.561 505.18Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M864.391 508.15L885.951 661.55L824.631 699.82L810.441 658.91L838.922 637.55L818.191 508.04L864.391 508.15Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M574.721 624.83L655.661 746.57L724.481 744.45L702.701 702.01L673.191 702.36L604.831 593.62L574.721 624.83Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M795.42 652.23L822.04 631.91\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M685.621 685.17L673.221 702.57C673.221 702.57 673.711 703.4 673.731 703.44L716.371 702.02L718.081 681.67L685.621 685.17Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M615.821 580.56L685.671 685.16L673.201 702.66L604.781 593.56L615.821 580.56Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M804.561 505.18L822.041 631.91L838.541 636.47L818.19 508.04L804.561 505.18Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M826.662 701.99C829.922 710.16 807.062 726.96 775.602 739.53C744.152 752.09 716.002 755.65 712.752 747.49C712.642 747.21 712.552 746.92 712.512 746.62L696.082 705.48L809.882 660.04L826.482 701.62C826.482 701.62 826.502 701.64 826.502 701.65C826.552 701.77 826.602 701.88 826.652 701.99H826.662Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M760.4 701.362C791.826 688.812 813.983 670.33 809.89 660.083C805.798 649.835 777.005 651.702 745.58 664.252C714.155 676.802 691.997 695.283 696.09 705.531C700.182 715.778 728.975 713.912 760.4 701.362Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M797.202 784.25L769.122 793.99L716.592 668.49L744.662 658.75L797.202 784.25Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M744.581 658.78L716.591 668.48L702.701 620.68L730.681 610.98L744.581 658.78Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M864.781 508.01L859.321 502.71L810.861 504.64L823.161 507.44L864.781 508.01Z\" fill=\"#F1C922\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M677.65 746.2H528.51V762.55H677.65V746.2Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M528.519 746.2H331.689V756.36H528.519V746.2Z\" fill=\"#5C8E30\" stroke=\"#575555\" stroke-width=\"1.81\" stroke-miterlimit=\"10\"/>\n      <path d=\"M320.23 756.36H529.271\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M455.08 720.99L458.99 673.21H589.85L595.27 720.99H455.08Z\" fill=\"#0E75BC\" stroke=\"black\" stroke-width=\"1.55\" stroke-miterlimit=\"10\"/>\n      <path d=\"M599.27 720.99V688.83H578.03C578.03 688.83 584.22 713.05 562.32 720.99H599.27Z\" stroke=\"black\" stroke-width=\"1.55\" stroke-miterlimit=\"10\"/>\n      <path d=\"M450.279 720.99V691.78H464.399C464.399 691.78 465.079 715.11 488.699 720.99H450.279Z\" stroke=\"black\" stroke-width=\"1.55\" stroke-miterlimit=\"10\"/>\n      <path d=\"M587.311 673.21H464.641L467.691 550.39H468.301C472.261 559.01 495.261 565.63 523.051 565.63C552.841 565.63 577.141 558.02 578.371 548.48H578.421L587.311 673.21Z\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M578.419 547.72C578.419 547.98 578.399 548.23 578.369 548.48C577.139 558.02 552.84 565.63 523.049 565.63C495.259 565.63 472.259 559.01 468.299 550.38C467.899 549.51 467.689 548.62 467.689 547.72C467.689 537.83 492.469 529.82 523.049 529.82C553.629 529.82 578.419 537.83 578.419 547.72Z\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M480.641 548.02C480.641 548.17 480.651 548.33 480.671 548.48H480.641V548.02Z\" stroke=\"black\" stroke-width=\"1.95\" stroke-miterlimit=\"10\"/>\n      <path d=\"M568.889 548.02V548.48H568.859C568.879 548.33 568.889 548.18 568.889 548.02Z\" stroke=\"black\" stroke-width=\"1.95\" stroke-miterlimit=\"10\"/>\n      <path d=\"M568.891 431.15V545.85C568.891 546.03 568.881 546.21 568.861 546.39C568.861 546.41 568.851 546.44 568.851 546.47C567.871 554.29 548.511 560.52 524.761 560.52C502.611 560.52 484.281 555.1 481.131 548.03C480.891 547.49 480.731 546.94 480.671 546.39C480.651 546.21 480.641 546.02 480.641 545.85V431.15H568.891Z\" stroke=\"black\" stroke-width=\"2.12\" stroke-miterlimit=\"10\"/>\n      <path d=\"M813.65 351.21C812.08 328.79 803.49 307.49 790.82 289.07C781.07 274.89 769.32 261.24 755.01 251.19C738.88 239.87 721.77 236.88 702.89 233.14C687.9 230.18 672.85 227.51 657.88 224.45C613.3 215.31 568.3 203.09 522.84 199.82C513.29 199.13 503.65 198.81 494.16 200.07C484.29 201.38 474.72 204.39 465.47 208.07C442.33 217.28 421.1 230.63 400.02 243.91C362.43 267.57 324.85 291.24 287.26 314.9C278.11 320.67 268.88 326.53 260.99 333.99C252.18 342.32 247.59 351.98 243.07 363.06C235.09 382.61 230.7 403.68 230.63 424.55C230.52 455.96 240.18 486.93 262.1 511.65C277.88 529.46 299.53 540.51 323.36 541.98C333.84 542.63 344.42 541.65 354.62 539.17C380.06 533 402.22 518.36 421.9 501.56C431.41 493.45 439.97 483.18 450.11 476.04C460.65 468.61 472.22 462.36 484.22 457.54C484.79 457.3 485.37 457.07 485.95 456.85C488.19 455.98 490.45 455.15 492.73 454.37C500.94 451.56 509.35 449.34 517.86 447.68C533.62 444.62 549.23 444.17 564.97 443.65C566.75 443.59 568.52 443.53 570.3 443.47C573.88 443.34 577.46 443.2 581.06 443C619.34 440.9 654.46 461.45 691.6 467.54C711.94 470.87 733.18 470.88 752.77 464.48C801.26 448.64 816.94 397.89 813.65 351.21ZM743.74 453.07C724.86 458.91 703.97 456.11 684.37 453.06C648.59 447.51 614.76 428.76 577.88 430.68C570.3 431.07 562.77 431.25 555.26 431.5C553.43 431.56 551.6 431.63 549.77 431.71C538.86 432.15 527.97 432.93 517 434.95C511.1 436.04 505.25 437.39 499.48 439.02C495.01 440.28 490.6 441.71 486.26 443.31C485.93 443.43 485.59 443.56 485.26 443.69C473.46 448.12 462.09 453.91 451.73 460.82C441.97 467.33 433.72 476.71 424.56 484.11C405.59 499.44 389.75 516.58 365.24 522.21C355.41 524.47 343.85 527 333.75 526.41C310.79 525.07 289.03 522.43 273.82 506.19C252.71 483.63 242.73 448.83 242.84 420.17C242.91 401.13 250.36 380.99 258.04 363.15C262.4 353.05 266.82 344.23 275.31 336.63C282.91 329.82 291.8 324.47 300.62 319.22C336.83 297.62 373.03 276.03 409.24 254.44C429.55 242.33 450 230.15 472.3 221.75C481.2 218.39 490.86 213.44 500.36 212.24C509.51 211.09 513.15 212.08 522.35 212.7C566.14 215.69 609.49 226.84 652.45 235.17C666.87 237.97 681.36 240.41 695.81 243.11C713.99 246.51 730.94 251.07 746.48 261.4C760.27 270.56 771.59 283.02 780.98 295.96C793.18 312.76 801.46 332.2 802.98 352.66C806.15 395.25 790.45 438.62 743.74 453.07Z\" stroke=\"black\" stroke-width=\"4\" stroke-miterlimit=\"10\"/>\n      <path d=\"M743.741 453.07C724.861 458.91 703.971 456.11 684.371 453.06C648.591 447.51 614.761 428.76 577.881 430.68C570.301 431.07 562.771 431.25 555.261 431.5C553.431 431.56 551.601 431.63 549.771 431.71C538.861 432.15 527.971 432.93 517.001 434.95C511.101 436.04 505.251 437.39 499.481 439.02C495.011 440.28 490.601 441.71 486.261 443.31C485.931 443.43 485.591 443.56 485.261 443.69C473.461 448.12 462.091 453.91 451.731 460.82C441.971 467.33 433.721 476.71 424.561 484.11C405.591 499.44 389.751 516.58 365.241 522.21C355.411 524.47 343.851 527 333.751 526.41C310.791 525.07 289.031 522.43 273.821 506.19C252.711 483.63 242.731 448.83 242.841 420.17C242.911 401.13 250.361 380.99 258.041 363.15C262.401 353.05 266.821 344.23 275.311 336.63C282.911 329.82 291.801 324.47 300.621 319.22C336.831 297.62 373.031 276.03 409.241 254.44C429.551 242.33 450.001 230.15 472.301 221.75C481.201 218.39 490.861 213.44 500.361 212.24C509.511 211.09 513.151 212.08 522.351 212.7C566.141 215.69 609.491 226.84 652.451 235.17C666.871 237.97 681.361 240.41 695.811 243.11C713.991 246.51 730.941 251.07 746.481 261.4C760.271 270.56 771.591 283.02 780.981 295.96C793.181 312.76 801.461 332.2 802.981 352.66C806.151 395.25 790.451 438.62 743.741 453.07Z\" fill=\"white\" stroke=\"black\" stroke-width=\"4\" stroke-miterlimit=\"10\"/>\n      <path d=\"M345.289 463.58C371.473 463.58 392.699 442.354 392.699 416.17C392.699 389.986 371.473 368.76 345.289 368.76C319.105 368.76 297.879 389.986 297.879 416.17C297.879 442.354 319.105 463.58 345.289 463.58Z\" fill=\"#020000\"/>\n      <path d=\"M743.741 453.07C724.861 458.91 703.971 456.11 684.371 453.06C648.591 447.51 614.761 428.76 577.881 430.68C570.301 431.07 562.771 431.25 555.261 431.5C553.431 431.56 551.601 431.63 549.771 431.71C538.861 432.15 527.971 432.93 517.001 434.95C511.101 436.04 505.251 437.39 499.481 439.02C495.011 440.28 490.601 441.71 486.261 443.31C485.931 443.43 485.591 443.56 485.261 443.69C473.461 448.12 462.091 453.91 451.731 460.82C441.971 467.33 433.721 476.71 424.561 484.11C405.591 499.44 389.751 516.58 365.241 522.21C355.411 524.47 343.851 527 333.751 526.41C310.791 525.07 289.031 522.43 273.821 506.19C252.711 483.63 242.731 448.83 242.841 420.17C242.911 401.13 250.361 380.99 258.041 363.15C262.401 353.05 266.821 344.23 275.311 336.63C282.911 329.82 291.801 324.47 300.621 319.22C336.831 297.62 373.031 276.03 409.241 254.44C429.551 242.33 450.001 230.15 472.301 221.75C481.201 218.39 490.861 213.44 500.361 212.24C509.511 211.09 513.151 212.08 522.351 212.7C566.141 215.69 609.491 226.84 652.451 235.17C666.871 237.97 681.361 240.41 695.811 243.11C713.991 246.51 730.941 251.07 746.481 261.4C760.271 270.56 771.591 283.02 780.981 295.96C793.181 312.76 801.461 332.2 802.981 352.66C806.151 395.25 790.451 438.62 743.741 453.07Z\" fill=\"white\" stroke=\"black\" stroke-width=\"1.95\" stroke-miterlimit=\"10\"/>\n      <path d=\"M345.289 330.08C297.739 330.08 259.209 368.62 259.209 416.16C259.209 463.7 297.739 502.25 345.289 502.25C392.839 502.25 431.369 463.71 431.369 416.16C431.369 368.61 392.829 330.08 345.289 330.08ZM345.289 482.94C308.419 482.94 278.519 453.05 278.519 416.16C278.519 379.27 308.409 349.39 345.289 349.39C382.169 349.39 412.059 379.28 412.059 416.16C412.059 453.04 382.169 482.94 345.289 482.94Z\" fill=\"black\"/>\n      <path d=\"M345.29 373.47C321.71 373.47 302.6 392.59 302.6 416.17C302.6 439.75 321.72 458.86 345.29 458.86C368.86 458.86 387.98 439.74 387.98 416.17C387.98 392.6 368.86 373.47 345.29 373.47ZM345.29 437.85C333.32 437.85 323.61 428.14 323.61 416.17C323.61 404.2 333.32 394.48 345.29 394.48C357.26 394.48 366.97 404.19 366.97 416.17C366.97 428.15 357.26 437.85 345.29 437.85Z\" fill=\"black\"/>\n      <path d=\"M397.079 413.43C397.019 412.23 395.869 411.36 394.699 411.66L394.309 411.75C393.279 412 392.229 411.37 391.979 410.33C391.739 409.3 392.359 408.26 393.399 408L394.629 407.7C395.629 407.46 396.279 406.47 396.069 405.46C395.529 402.91 394.799 400.42 393.899 398.01L391.559 399.29C390.629 399.8 389.459 399.46 388.949 398.52C388.439 397.58 388.779 396.42 389.719 395.9L390.799 395.31C391.709 394.81 392.079 393.7 391.619 392.77C390.789 391.15 389.889 389.58 388.919 388.06C388.259 387.04 386.839 386.86 385.949 387.7L385.689 387.94C384.919 388.68 383.699 388.65 382.969 387.88C382.239 387.11 382.269 385.89 383.039 385.15L383.919 384.31C384.679 383.59 384.719 382.39 384.009 381.62C382.819 380.28 381.549 379 380.219 377.79C379.319 376.97 377.899 377.18 377.269 378.22L377.079 378.53C376.529 379.44 375.329 379.72 374.419 379.18C373.509 378.62 373.219 377.43 373.769 376.52L374.419 375.45C374.959 374.58 374.719 373.42 373.869 372.86C372.359 371.86 370.789 370.94 369.179 370.11C368.099 369.55 366.769 370.11 366.429 371.28L366.319 371.66C366.019 372.68 364.949 373.27 363.929 372.97C363.079 372.73 362.539 371.96 362.539 371.12C362.539 370.94 362.559 370.75 362.619 370.58L363.489 367.59C361.229 366.74 358.899 366.05 356.499 365.52C355.309 365.26 354.179 366.15 354.149 367.36V367.81C354.109 368.87 353.229 369.72 352.159 369.69C351.109 369.67 350.269 368.81 350.269 367.76V367.72L350.309 366.39C350.329 365.35 349.519 364.48 348.469 364.42C347.439 364.35 346.389 364.33 345.339 364.33C344.569 364.33 343.799 364.35 343.039 364.38C341.829 364.44 340.959 365.59 341.259 366.77L341.369 367.25C341.619 368.29 340.989 369.33 339.949 369.59C339.799 369.63 339.639 369.65 339.489 369.65C338.629 369.65 337.839 369.06 337.619 368.18L337.279 366.8C337.039 365.79 336.029 365.17 335.009 365.37C333.209 365.73 331.439 366.19 329.719 366.72C328.559 367.09 328.019 368.43 328.609 369.5L328.889 370.02C329.399 370.95 329.059 372.12 328.119 372.64C327.829 372.8 327.509 372.87 327.189 372.87C326.509 372.87 325.859 372.51 325.499 371.87L324.789 370.56C324.279 369.65 323.149 369.3 322.219 369.77C320.579 370.59 318.989 371.49 317.449 372.46C316.429 373.12 316.259 374.54 317.089 375.43L317.559 375.91C318.289 376.68 318.259 377.9 317.489 378.64C317.109 379 316.639 379.18 316.159 379.18C315.649 379.18 315.149 378.98 314.759 378.58L313.679 377.44C312.959 376.68 311.759 376.64 310.989 377.34C309.619 378.56 308.309 379.84 307.069 381.19C306.249 382.09 306.449 383.52 307.489 384.15L308.129 384.54C309.029 385.08 309.319 386.27 308.779 387.17L308.599 387.48C308.139 388.23 307.159 388.47 306.409 388.02L304.699 386.98C303.809 386.44 302.649 386.71 302.079 387.58C301.069 389.11 300.129 390.7 299.269 392.33C298.719 393.41 299.269 394.73 300.439 395.08L301.569 395.41C302.419 395.65 302.899 396.54 302.659 397.38L302.459 398.03C302.219 398.87 301.329 399.36 300.489 399.11L298.499 398.53C297.499 398.23 296.439 398.79 296.119 399.79C295.539 401.53 295.039 403.31 294.649 405.13C294.399 406.31 295.279 407.45 296.499 407.48L297.749 407.51C298.619 407.53 299.329 408.25 299.299 409.13V409.46C299.279 410.53 298.389 411.38 297.319 411.36L295.539 411.32C294.489 411.29 293.619 412.11 293.559 413.15C293.499 414.16 293.479 415.19 293.479 416.21C293.479 417.05 293.499 417.87 293.539 418.7C293.609 419.91 294.749 420.77 295.929 420.47L296.849 420.24C297.879 420 298.929 420.62 299.179 421.67C299.419 422.71 298.799 423.75 297.759 424.01L295.969 424.44C294.959 424.68 294.329 425.7 294.539 426.72C294.919 428.55 295.389 430.34 295.959 432.1C296.329 433.25 297.659 433.78 298.719 433.2L299.889 432.56C300.669 432.14 301.639 432.42 302.059 433.19L302.229 433.52C302.729 434.45 302.379 435.6 301.449 436.11L299.819 437C298.899 437.51 298.559 438.65 299.029 439.58C299.869 441.25 300.799 442.86 301.809 444.41C302.469 445.42 303.889 445.59 304.769 444.76L305.489 444.06C306.259 443.33 307.479 443.36 308.219 444.13C308.579 444.5 308.759 444.98 308.759 445.46C308.759 445.97 308.559 446.47 308.169 446.85L306.819 448.15C306.059 448.87 306.029 450.07 306.729 450.84C307.969 452.22 309.279 453.53 310.649 454.77C311.549 455.59 312.969 455.37 313.599 454.34L314.289 453.2C314.749 452.45 315.729 452.2 316.479 452.66L317.059 453.02C317.809 453.47 318.049 454.45 317.599 455.2L316.459 457.06C315.919 457.96 316.189 459.13 317.069 459.7C318.619 460.7 320.219 461.63 321.889 462.48C322.959 463.02 324.269 462.46 324.619 461.3L324.889 460.36C325.189 459.34 326.259 458.75 327.279 459.05C328.129 459.29 328.659 460.06 328.659 460.9C328.659 461.08 328.639 461.27 328.579 461.44L328.069 463.18C327.779 464.18 328.349 465.24 329.349 465.56C331.099 466.12 332.879 466.6 334.709 466.98C335.889 467.22 337.009 466.33 337.039 465.13L337.059 464.2C337.079 463.14 337.959 462.29 339.029 462.32C340.079 462.34 340.919 463.19 340.919 464.24V464.3L340.879 466.04C340.849 467.08 341.669 467.96 342.719 468.01C343.579 468.06 344.459 468.08 345.329 468.08C346.309 468.08 347.279 468.05 348.239 468C349.449 467.92 350.309 466.78 350.019 465.61L349.809 464.78C349.559 463.74 350.189 462.7 351.229 462.44C351.379 462.4 351.539 462.38 351.689 462.38C352.559 462.38 353.349 462.97 353.569 463.85L353.959 465.48C354.199 466.5 355.229 467.13 356.259 466.91C358.069 466.53 359.839 466.04 361.569 465.46C362.719 465.08 363.239 463.76 362.659 462.7L362.279 462.01C361.759 461.08 362.109 459.91 363.039 459.39C363.329 459.23 363.649 459.16 363.969 459.16C364.659 459.16 365.309 459.52 365.659 460.16L366.429 461.56C366.939 462.48 368.079 462.82 369.019 462.34C370.649 461.5 372.229 460.58 373.749 459.58C374.759 458.91 374.919 457.5 374.089 456.63L373.609 456.12C372.869 455.35 372.899 454.13 373.669 453.4C374.439 452.66 375.659 452.69 376.389 453.46L377.429 454.54C378.149 455.31 379.349 455.34 380.129 454.63C381.469 453.41 382.759 452.11 383.969 450.75C384.779 449.86 384.569 448.44 383.539 447.81L383.019 447.5C382.109 446.95 381.819 445.75 382.369 444.84C382.739 444.24 383.369 443.91 384.019 443.91C384.359 443.91 384.709 444 385.019 444.19L386.239 444.93C387.139 445.47 388.309 445.2 388.879 444.32C389.869 442.8 390.769 441.22 391.579 439.6C392.129 438.53 391.559 437.22 390.399 436.88L389.889 436.73C388.869 436.43 388.279 435.36 388.579 434.34C388.879 433.32 389.949 432.73 390.969 433.03L392.279 433.41C393.279 433.7 394.339 433.14 394.659 432.13C395.209 430.42 395.669 428.67 396.039 426.88C396.289 425.71 395.399 424.58 394.189 424.56L393.719 424.54C392.659 424.52 391.809 423.64 391.839 422.57C391.859 421.52 392.719 420.68 393.769 420.68H393.809L395.099 420.71C396.149 420.74 397.019 419.92 397.079 418.87C397.129 417.99 397.149 417.1 397.149 416.19C397.149 415.28 397.119 414.37 397.069 413.46L397.079 413.43ZM345.289 460.68C320.699 460.68 300.779 440.75 300.779 416.16C300.779 391.57 320.699 371.65 345.289 371.65C369.879 371.65 389.799 391.58 389.799 416.16C389.799 440.74 369.879 460.68 345.289 460.68Z\" fill=\"#020000\"/>\n      <path d=\"M691.641 263.02C643.681 263.02 604.801 302.31 604.801 350.78C604.801 399.25 643.681 438.55 691.641 438.55C739.601 438.55 778.481 399.26 778.481 350.78C778.481 302.3 739.601 263.02 691.641 263.02ZM691.641 419.72C653.971 419.72 623.431 388.86 623.431 350.78C623.431 312.7 653.961 281.85 691.641 281.85C729.321 281.85 759.851 312.71 759.851 350.78C759.851 388.85 729.321 419.72 691.641 419.72Z\" fill=\"#F0C23A\" stroke=\"black\" stroke-width=\"2.42\" stroke-miterlimit=\"10\"/>\n      <path d=\"M691.261 302.21C664.821 302.21 643.371 324.02 643.371 350.94C643.371 377.86 664.811 399.66 691.261 399.66C717.711 399.66 739.161 377.85 739.161 350.94C739.161 324.03 717.721 302.21 691.261 302.21ZM736.271 343.66L722.481 346.12C722.091 346.19 721.711 345.93 721.651 345.54C721.581 345.14 721.841 344.76 722.231 344.69L736.021 342.23C736.411 342.16 736.791 342.42 736.851 342.81C736.921 343.21 736.661 343.59 736.271 343.66ZM731.361 327.56C731.561 327.91 731.441 328.35 731.101 328.55L718.971 335.62C718.621 335.82 718.181 335.7 717.981 335.36C717.781 335.01 717.901 334.57 718.241 334.37L730.371 327.3C730.721 327.1 731.161 327.22 731.361 327.56ZM718.831 350.94C718.831 366.77 706.351 379.6 690.961 379.6C675.571 379.6 663.091 366.77 663.091 350.94C663.091 335.11 675.561 322.27 690.961 322.27C706.361 322.27 718.831 335.11 718.831 350.94ZM721.021 315.12C721.321 315.38 721.361 315.83 721.111 316.13L712.101 326.97C711.841 327.28 711.391 327.32 711.081 327.06C710.781 326.8 710.741 326.35 710.991 326.05L720.001 315.21C720.261 314.9 720.711 314.86 721.021 315.12ZM707.101 307C707.471 307.14 707.661 307.55 707.531 307.92L702.741 321.22C702.601 321.6 702.191 321.79 701.821 321.65C701.451 321.51 701.261 321.1 701.391 320.73L706.181 307.43C706.321 307.05 706.731 306.86 707.101 307ZM691.271 304.18C691.671 304.18 691.991 304.5 691.991 304.9V319.06C691.991 319.46 691.671 319.78 691.271 319.78C690.871 319.78 690.551 319.46 690.551 319.06V304.9C690.551 304.5 690.871 304.18 691.271 304.18ZM676.361 307.43L681.151 320.73C681.281 321.1 681.091 321.51 680.721 321.65C680.351 321.79 679.931 321.59 679.801 321.22L675.011 307.92C674.881 307.55 675.071 307.14 675.441 307C675.811 306.86 676.231 307.06 676.361 307.43ZM662.531 315.21L671.541 326.05C671.791 326.35 671.751 326.8 671.451 327.06C671.141 327.32 670.691 327.28 670.431 326.97L661.421 316.13C661.171 315.83 661.211 315.38 661.511 315.12C661.821 314.86 662.271 314.9 662.531 315.21ZM652.171 327.3L664.301 334.37C664.641 334.57 664.761 335.01 664.561 335.35C664.361 335.71 663.921 335.83 663.571 335.62L651.441 328.55C651.101 328.35 650.981 327.91 651.181 327.57C651.381 327.21 651.821 327.09 652.171 327.3ZM646.521 342.23L660.311 344.69C660.701 344.76 660.961 345.13 660.891 345.52C660.821 345.93 660.451 346.19 660.061 346.12L646.271 343.66C645.881 343.59 645.621 343.22 645.691 342.83C645.761 342.42 646.131 342.16 646.521 342.23ZM646.261 358.22L660.051 355.76C660.441 355.69 660.821 355.95 660.881 356.34C660.951 356.74 660.691 357.12 660.301 357.19L646.511 359.65C646.121 359.72 645.741 359.46 645.681 359.07C645.611 358.67 645.871 358.29 646.261 358.22ZM651.181 374.32C650.981 373.97 651.101 373.53 651.441 373.33L663.571 366.26C663.921 366.06 664.361 366.18 664.561 366.52C664.761 366.87 664.641 367.31 664.301 367.51L652.171 374.58C651.821 374.78 651.381 374.66 651.181 374.32ZM661.511 386.75C661.211 386.49 661.171 386.04 661.421 385.74L670.431 374.9C670.691 374.59 671.141 374.55 671.451 374.81C671.751 375.07 671.791 375.52 671.541 375.82L662.531 386.66C662.271 386.97 661.821 387.01 661.511 386.75ZM675.431 394.87C675.061 394.73 674.871 394.32 675.001 393.95L679.791 380.65C679.931 380.27 680.341 380.08 680.711 380.22C681.081 380.36 681.271 380.77 681.141 381.14L676.351 394.44C676.211 394.82 675.801 395.01 675.431 394.87ZM691.271 397.7C690.871 397.7 690.551 397.38 690.551 396.98V382.82C690.551 382.42 690.871 382.1 691.271 382.1C691.671 382.1 691.991 382.42 691.991 382.82V396.98C691.991 397.38 691.671 397.7 691.271 397.7ZM706.181 394.44L701.391 381.14C701.261 380.77 701.451 380.36 701.821 380.22C702.191 380.08 702.611 380.28 702.741 380.65L707.531 393.95C707.661 394.32 707.471 394.73 707.101 394.87C706.731 395.01 706.311 394.81 706.181 394.44ZM720.011 386.67L711.011 375.83C710.761 375.53 710.801 375.08 711.101 374.82C711.411 374.56 711.861 374.6 712.121 374.91L721.121 385.75C721.371 386.05 721.331 386.5 721.031 386.76C720.721 387.02 720.271 386.98 720.011 386.67ZM730.371 374.58L718.241 367.51C717.901 367.31 717.781 366.87 717.981 366.53C718.181 366.17 718.621 366.05 718.971 366.26L731.101 373.33C731.441 373.53 731.561 373.97 731.361 374.31C731.161 374.67 730.721 374.79 730.371 374.58ZM736.021 359.65L722.231 357.19C721.841 357.12 721.581 356.75 721.651 356.36C721.721 355.95 722.091 355.69 722.481 355.76L736.271 358.22C736.661 358.29 736.921 358.66 736.851 359.05C736.781 359.46 736.411 359.72 736.021 359.65Z\" fill=\"black\"/>\n      <path d=\"M691.451 380.18C706.948 380.18 719.511 367.089 719.511 350.94C719.511 334.791 706.948 321.7 691.451 321.7C675.953 321.7 663.391 334.791 663.391 350.94C663.391 367.089 675.953 380.18 691.451 380.18Z\" fill=\"white\"/>\n      <path d=\"M690.79 377.18C705.227 377.18 716.93 365.28 716.93 350.6C716.93 335.92 705.227 324.02 690.79 324.02C676.354 324.02 664.65 335.92 664.65 350.6C664.65 365.28 676.354 377.18 690.79 377.18Z\" fill=\"#6E6F72\"/>\n      <path d=\"M689.88 373.58C702.572 373.58 712.86 363.197 712.86 350.39C712.86 337.582 702.572 327.2 689.88 327.2C677.189 327.2 666.9 337.582 666.9 350.39C666.9 363.197 677.189 373.58 689.88 373.58Z\" fill=\"white\"/>\n      <path d=\"M691.541 370.87C702.499 370.87 711.381 361.808 711.381 350.63C711.381 339.452 702.499 330.39 691.541 330.39C680.584 330.39 671.701 339.452 671.701 350.63C671.701 361.808 680.584 370.87 691.541 370.87Z\" fill=\"black\"/>\n      <path d=\"M691.501 368.78C701.006 368.78 708.711 360.784 708.711 350.92C708.711 341.056 701.006 333.06 691.501 333.06C681.996 333.06 674.291 341.056 674.291 350.92C674.291 360.784 681.996 368.78 691.501 368.78Z\" fill=\"#3A3A3A\"/>\n      <path d=\"M717.61 350.6C717.61 365.28 705.41 377.18 690.36 377.18C690.3 377.18 690.24 377.18 690.17 377.18C704.93 377.09 716.86 365.23 716.86 350.61C716.86 335.99 704.93 324.14 690.17 324.05C690.23 324.05 690.29 324.05 690.36 324.05C705.41 324.05 717.61 335.95 717.61 350.62V350.6Z\" fill=\"black\"/>\n      <path d=\"M666.93 351.35C667.76 364.21 677.89 374.95 692.79 373.39C692.85 373.39 693.05 373.36 693.1 373.35C679.89 374.12 668.42 364.12 667.6 351.3C666.78 338.5 676.98 328.12 690.18 327.19C690.12 327.19 690.18 327.19 690.12 327.19C676.76 326.96 666.1 338.49 666.93 351.35Z\" fill=\"black\"/>\n      <path d=\"M281.05 349.75C283.783 349.75 286 347.534 286 344.8C286 342.066 283.783 339.85 281.05 339.85C278.316 339.85 276.1 342.066 276.1 344.8C276.1 347.534 278.316 349.75 281.05 349.75Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M438.809 257.2C441.543 257.2 443.759 254.984 443.759 252.25C443.759 249.516 441.543 247.3 438.809 247.3C436.076 247.3 433.859 249.516 433.859 252.25C433.859 254.984 436.076 257.2 438.809 257.2Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M554.53 233.77C557.264 233.77 559.48 231.554 559.48 228.82C559.48 226.086 557.264 223.87 554.53 223.87C551.796 223.87 549.58 226.086 549.58 228.82C549.58 231.554 551.796 233.77 554.53 233.77Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M733.719 269.05C736.453 269.05 738.67 266.834 738.67 264.1C738.67 261.366 736.453 259.15 733.719 259.15C730.986 259.15 728.77 261.366 728.77 264.1C728.77 266.834 730.986 269.05 733.719 269.05Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M788.419 393.04C791.153 393.04 793.369 390.824 793.369 388.09C793.369 385.356 791.153 383.14 788.419 383.14C785.685 383.14 783.469 385.356 783.469 388.09C783.469 390.824 785.685 393.04 788.419 393.04Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M581.809 421.67C584.543 421.67 586.759 419.454 586.759 416.72C586.759 413.986 584.543 411.77 581.809 411.77C579.076 411.77 576.859 413.986 576.859 416.72C576.859 419.454 579.076 421.67 581.809 421.67Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M471.719 437.8C474.453 437.8 476.669 435.584 476.669 432.85C476.669 430.116 474.453 427.9 471.719 427.9C468.986 427.9 466.77 430.116 466.77 432.85C466.77 435.584 468.986 437.8 471.719 437.8Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M331.78 519.5C334.514 519.5 336.73 517.284 336.73 514.55C336.73 511.816 334.514 509.6 331.78 509.6C329.046 509.6 326.83 511.816 326.83 514.55C326.83 517.284 329.046 519.5 331.78 519.5Z\" fill=\"#F0C23A\" stroke=\"#020202\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M256.639 452.59C259.373 452.59 261.589 450.374 261.589 447.64C261.589 444.906 259.373 442.69 256.639 442.69C253.906 442.69 251.689 444.906 251.689 447.64C251.689 450.374 253.906 452.59 256.639 452.59Z\" fill=\"#F0C23A\" stroke=\"#020202\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M707.909 452.24C710.643 452.24 712.859 450.024 712.859 447.29C712.859 444.556 710.643 442.34 707.909 442.34C705.175 442.34 702.959 444.556 702.959 447.29C702.959 450.024 705.175 452.24 707.909 452.24Z\" fill=\"white\" stroke=\"black\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n      <path d=\"M568.891 443.52V452.93C563.501 461.57 547.421 468.63 528.011 469.99C507.601 471.41 489.961 466.07 484.221 457.54C484.791 457.3 485.371 457.07 485.951 456.85C496.281 452.83 506.991 449.8 517.861 447.68C534.931 444.36 551.821 444.11 568.891 443.52Z\" stroke=\"black\" stroke-width=\"2.22\" stroke-miterlimit=\"10\"/>\n      <path d=\"M530.2 464.05C512.1 465.63 496.46 461.03 492.73 453.52C500.94 450.94 509.35 448.89 517.86 447.37C533.62 444.56 549.23 444.14 564.97 443.66C565.02 443.91 565.05 444.16 565.08 444.41C566.02 453.5 550.4 462.29 530.2 464.06V464.05Z\" stroke=\"black\" stroke-width=\"1.44\" stroke-miterlimit=\"10\"/>\n      <path d=\"M632.531 439.77L632.411 440.96C630.971 454.75 628.431 466.29 625.191 475.95L625.121 475.99C625.121 475.99 625.141 476.02 625.161 476.04C622.271 484.62 618.821 491.71 615.071 497.57L614.341 497.8C614.341 497.8 614.421 498.03 614.561 498.37C612.471 501.55 610.291 504.35 608.071 506.82L607.101 507.13C607.101 507.13 607.171 507.35 607.301 507.67C593.851 522.13 578.981 524.81 572.401 525.23C570.271 525.37 569.001 525.27 568.991 525.27L567.911 525.18L567.881 538.99L568.821 539.05C570.241 539.14 571.661 539.18 573.071 539.18C574.761 539.18 576.441 539.12 578.071 538.99C602.881 537.06 622.691 520.13 635.371 490.02C644.891 467.41 647.101 445.06 647.121 444.84L647.201 444.02L632.561 439.77H632.531ZM645.011 445.48C644.891 446.49 644.651 448.41 644.231 451.01C638.161 452 634.371 446.9 633.821 446.1C633.981 444.87 634.131 443.63 634.271 442.37L645.021 445.49L645.011 445.48ZM633.531 448.21C635.101 449.95 638.291 452.71 642.721 452.71C643.121 452.71 643.541 452.68 643.961 452.63C643.291 456.53 642.281 461.61 640.801 467.35C635.631 468.19 632.121 464.62 630.851 463.04C631.891 458.43 632.801 453.5 633.531 448.21ZM636.971 480.16C632.091 480.98 628.681 477.89 627.231 476.19C628.401 472.67 629.471 468.91 630.441 464.89C632.101 466.62 635.161 469.06 639.321 469.06C639.671 469.06 640.021 469.03 640.391 468.99C639.441 472.53 638.321 476.3 636.981 480.16H636.971ZM625.321 505.2C620.321 504.72 617.721 501.05 616.611 498.88C618.411 496.09 620.141 493.03 621.771 489.67C623.101 491.99 625.781 495.34 630.411 495.99C628.901 499.06 627.211 502.16 625.311 505.21L625.321 505.2ZM624.331 506.77C622.601 509.44 620.721 512.05 618.661 514.57C613.361 514.33 610.601 510.58 609.421 508.32C611.521 505.99 613.591 503.38 615.581 500.45C616.991 502.81 619.711 506.01 624.321 506.78L624.331 506.77ZM573.441 527.16C575.161 527.01 577.301 526.72 579.751 526.17C580.171 528.33 581.631 533.23 586.361 535.69C583.781 536.29 581.081 536.73 578.261 536.96C573.531 534.07 573.281 529.29 573.441 527.16ZM581.381 525.78C584.251 525.04 587.461 523.94 590.851 522.33C591.411 524.76 593.101 529.37 597.851 531.58C595.111 532.93 592.211 534.07 589.141 534.96C583.271 533.29 581.751 527.85 581.381 525.78ZM592.391 521.56C594.951 520.25 597.601 518.64 600.261 516.66C601.361 518.91 604.081 523.05 609.271 524.09C606.371 526.51 603.231 528.68 599.831 530.54C594.311 528.81 592.781 523.69 592.381 521.56H592.391ZM569.861 537.11L569.881 527.31C570.371 527.31 571.021 527.31 571.801 527.27C571.691 529.56 572.051 533.93 575.681 537.12C573.771 537.2 571.821 537.2 569.851 537.1L569.861 537.11ZM610.991 522.62C605.221 522.24 602.531 517.64 601.631 515.63C603.841 513.89 606.061 511.89 608.241 509.6C609.641 512.02 612.451 515.44 617.331 516.15C615.371 518.42 613.251 520.59 610.991 522.62ZM633.481 489.29C632.761 490.99 631.981 492.73 631.151 494.48C626.011 494.03 623.501 489.89 622.601 487.92C624.041 484.81 625.401 481.46 626.651 477.84C628.341 479.56 631.351 481.87 635.391 481.87C635.711 481.87 636.041 481.84 636.381 481.81C635.501 484.28 634.531 486.78 633.481 489.29Z\" fill=\"black\"/>\n    </svg>";(document.getElementById('s-guardian')||document).querySelectorAll(".brandmark,.notif .ni").forEach(function(e){e.innerHTML=L;});})();


(function () {
  var deck = document.getElementById('deck');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var prev = document.getElementById('prev'), next = document.getElementById('next');
  var count = document.getElementById('count');
  var dotsWrap = document.getElementById('dots');
  var idx = 0;

  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  var EXPAND = '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>';
  var COMPRESS = '<path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/>';

  // Scale-to-fit: the active screen is shrunk (never enlarged) so the whole slide always fits
  // the viewport, clear of the top dock and bottom nav. offsetWidth/Height ignore the transform,
  // so measurement stays stable across refits. A ResizeObserver refits when a screen's own state
  // changes its height (running code, switching learner, opening a note).
  var fitEl = null;
  var ro = window.ResizeObserver ? new ResizeObserver(function () { if (fitEl) fitOne(fitEl); }) : null;
  function fitOne(el) {
    var w = el.offsetWidth, h = el.offsetHeight;
    if (!w || !h) return;
    // Centre within the band left clear of the top dock and the bottom nav, so no slide ever
    // sits under the controls, and shrink (never enlarge) to fit that band.
    var topRes = 60, botRes = 84;
    var bandH = window.innerHeight - topRes - botRes;
    var s = Math.min(1, (window.innerWidth - 56) / w, bandH / h);
    el.style.top = (topRes + bandH / 2) + 'px';
    el.style.transform = 'translate(-50%, -50%) scale(' + (Math.round(s * 1000) / 1000) + ')';
  }
  function fitActive() {
    var el = slides[idx] && slides[idx].firstElementChild;
    if (!el) return;
    if (ro && fitEl && fitEl !== el) ro.unobserve(fitEl);
    fitEl = el;
    fitOne(el);
    if (ro) ro.observe(el);
    watchScrim(el);
  }

  // A full-screen overlay (the guardian day-note modal) is a position:fixed child of a scaled
  // screen, so the scale would shrink and mis-place it. While such an overlay is open, drop the
  // scale (it sits behind the blurred scrim, unseen) so the modal covers the true viewport.
  function watchScrim(el) {
    var scrim = el.querySelector('.scrim');
    if (!scrim || scrim.__deckWatched) return;
    scrim.__deckWatched = true;
    new MutationObserver(function () {
      if (scrim.classList.contains('open')) { el.style.transform = 'none'; }
      else { fitOne(el); }
    }).observe(scrim, { attributes: true, attributeFilter: ['class'] });
  }

  // one navigation dot per slide
  var dots = slides.map(function (s, n) {
    var d = document.createElement('button');
    d.className = 'pv-dot';
    d.setAttribute('aria-label', 'Go to slide ' + (n + 1));
    d.addEventListener('click', function () { show(n); });
    dotsWrap.appendChild(d);
    return d;
  });

  function show(i) {
    idx = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function (s, n) { s.classList.toggle('active', n === idx); });
    dots.forEach(function (d, n) { d.setAttribute('aria-current', n === idx ? 'true' : 'false'); });
    count.textContent = (idx + 1) + ' / ' + slides.length;
    prev.disabled = idx === 0; next.disabled = idx === slides.length - 1;
    window.scrollTo(0, 0);
    fitActive();
  }
  prev.addEventListener('click', function () { show(idx - 1); });
  next.addEventListener('click', function () { show(idx + 1); });
  document.addEventListener('keydown', function (e) {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { show(idx + 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { show(idx - 1); e.preventDefault(); }
  });

  function setTheme(mode) {
    deck.dataset.theme = mode;
    document.getElementById('themeIcon').innerHTML = mode === 'dark' ? SUN : MOON;
  }
  document.getElementById('theme').addEventListener('click', function () {
    setTheme(deck.dataset.theme === 'dark' ? 'light' : 'dark');
    setTimeout(fitActive, 90);
  });

  function setLang(l) {
    deck.dataset.lang = l;
    document.getElementById('langEn').setAttribute('aria-pressed', l === 'en' ? 'true' : 'false');
    document.getElementById('langZh').setAttribute('aria-pressed', l === 'zh' ? 'true' : 'false');
    deck.dispatchEvent(new CustomEvent('deck:langchange', { detail: { lang: l } }));
  }
  document.getElementById('langEn').addEventListener('click', function () { setLang('en'); });
  document.getElementById('langZh').addEventListener('click', function () { setLang('zh'); });
  deck.addEventListener('deck:langchange', function () { setTimeout(fitActive, 90); });
  window.addEventListener('resize', fitActive);

  // fullscreen for presenting
  var fsBtn = document.getElementById('fs'), fsIcon = document.getElementById('fsIcon');
  function inFs() { return document.fullscreenElement || document.webkitFullscreenElement; }
  fsBtn.addEventListener('click', function () {
    if (inFs()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
    else { var el = document.documentElement; (el.requestFullscreen || el.webkitRequestFullscreen).call(el); }
  });
  function syncFs() {
    var on = !!inFs();
    fsIcon.innerHTML = on ? COMPRESS : EXPAND;
    fsBtn.setAttribute('aria-label', on ? 'Exit fullscreen' : 'Enter fullscreen');
  }
  document.addEventListener('fullscreenchange', syncFs);
  document.addEventListener('webkitfullscreenchange', syncFs);

  // controls fade away while presenting, and return on any input
  var idleTimer = null;
  function poke() {
    deck.classList.remove('idle');
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { deck.classList.add('idle'); }, 3200);
  }
  ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'].forEach(function (ev) {
    document.addEventListener(ev, poke, { passive: true });
  });

  setTheme('dark');
  setLang('en');
  show(0);
  poke();
})();

(function () {
  // AI-coach slide: each "read them" pill toggles its metrics panel open/closed.
  // The deck shell's ResizeObserver refits the slide when the panel changes height,
  // so there is nothing to recompute here.
  var pills = document.querySelectorAll('.reveal[aria-controls]');
  Array.prototype.forEach.call(pills, function (pill) {
    pill.addEventListener('click', function () {
      var panel = document.getElementById(pill.getAttribute('aria-controls'));
      if (!panel) return;
      var open = panel.classList.toggle('open');
      pill.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();
