/* VICS OS taskbar — retro y2k OS menu bar (desktop only)
   <vics-taskbar audio-src="assets/images/....mp3"></vics-taskbar>
   - Live clock (user's local time)
   - Weather via open-meteo (IP-based geolocation, no permission prompt), lucide icon mapped to conditions
   - Background music with mute toggle; preference + playback position persisted in localStorage
   - Hidden at <=1024px; music defaults OFF on mobile */
(function () {
  if (customElements.get('vics-taskbar')) return;

  var LUCIDE_SRC = 'https://unpkg.com/lucide@0.525.0/dist/umd/lucide.min.js';
  function loadLucide() {
    if (window.__vicsLucideP) return window.__vicsLucideP;
    window.__vicsLucideP = new Promise(function (res) {
      if (window.lucide) return res(window.lucide);
      var s = document.createElement('script');
      s.src = LUCIDE_SRC;
      s.onload = function () { res(window.lucide); };
      s.onerror = function () { res(null); };
      document.head.appendChild(s);
    });
    return window.__vicsLucideP;
  }

  var CSS =
    'vics-taskbar .vt-bar{position:fixed;top:0;left:0;right:0;' +
    'height:clamp(44px, calc(44px + (1600px - 100vw) * 0.047), 60px);z-index:400;' +
    'background:rgba(30,19,66,0.7);display:flex;flex-direction:row;justify-content:space-between;align-items:center;' +
    'padding:8px clamp(20px, 2.5vw, 40px);box-sizing:border-box;font-family:"Pixelify Sans",ui-monospace,"Courier New",monospace;' +
    'font-size:14px;font-weight:400;line-height:1;color:#fff;user-select:none;}' +
    'vics-taskbar .vt-bar svg{width:16px;height:16px;flex-shrink:0;display:block;}' +
    'vics-taskbar .vt-left{display:flex;flex-direction:row;gap:4px;align-items:center;}' +
    'vics-taskbar .vt-right{display:flex;flex-direction:row;gap:16px;align-items:center;}' +
    'vics-taskbar .vt-music{display:flex;flex-direction:row;gap:4px;align-items:center;' +
    'background:none;border:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer;}' +
    'vics-taskbar .vt-music a{color:#fff;text-decoration:underline;text-underline-offset:2px;}' +
    'vics-taskbar .vt-music a:hover{color:#fbd0ca;}' +
    'vics-taskbar .vt-weather{display:flex;flex-direction:row;gap:4px;align-items:center;}' +
    'vics-taskbar .vt-clock{white-space:nowrap;}' +
    '@media (max-width:1024px){vics-taskbar{display:none;}}';

  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function fmtTime(d) {
    var h = d.getHours();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    var hh = (h < 10 ? '0' : '') + h;
    var mm = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    return DAYS[d.getDay()] + ' ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ' ' + hh + ':' + mm + ' ' + ampm;
  }

  function weatherIcon(code, isDay) {
    if (code === 0) return isDay ? 'sun' : 'moon';
    if (code === 1 || code === 2) return isDay ? 'cloud-sun' : 'cloud-moon';
    if (code === 3) return 'cloudy';
    if (code === 45 || code === 48) return 'cloud-fog';
    if (code >= 51 && code <= 57) return 'cloud-drizzle';
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'cloud-rain';
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'cloud-snow';
    if (code >= 95) return 'cloud-lightning';
    return 'cloud-sun';
  }

  // Fahrenheit countries; everyone else gets Celsius. Falls back to F for bare "en".
  function useFahrenheit() {
    var lang = (navigator.language || 'en-US');
    var m = lang.match(/-([A-Za-z]{2})\b/);
    if (m) return ['US', 'LR', 'MM', 'BS', 'BZ', 'KY', 'PW', 'FM', 'MH'].indexOf(m[1].toUpperCase()) !== -1;
    return lang.slice(0, 2).toLowerCase() === 'en';
  }

  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var CREDIT_URL = 'https://pixabay.com/users/mondamusic-54713575/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=491693';

  class VicsTaskbar extends HTMLElement {
    connectedCallback() {
      if (this.__init) return;
      this.__init = true;

      if (!document.getElementById('vics-taskbar-style')) {
        var st = document.createElement('style');
        st.id = 'vics-taskbar-style';
        st.textContent = CSS;
        document.head.appendChild(st);
      }

      this.innerHTML =
        '<div class="vt-bar">' +
          '<div class="vt-left"><span class="vt-ic-banana"></span><span>VICS OS</span></div>' +
          '<div class="vt-right">' +
            '<button class="vt-music" type="button" aria-label="Toggle music"></button>' +
            '<div class="vt-weather" style="display:none;"><span class="vt-ic-weather"></span><span class="vt-temp"></span></div>' +
            '<span class="vt-clock"></span>' +
          '</div>' +
        '</div>';

      this._musicBtn = this.querySelector('.vt-music');
      this._clockEl = this.querySelector('.vt-clock');

      this._setIcon('.vt-ic-banana', 'banana');
      this._startClock();
      this._initMusic();
      this._loadWeather();
    }

    disconnectedCallback() {
      if (this._clockTimer) clearInterval(this._clockTimer);
      if (this._audio) { try { this._audio.pause(); } catch (e) {} }
    }

    _setIcon(sel, name) {
      var el = this.querySelector(sel);
      if (!el) return;
      el.innerHTML = '<i data-lucide="' + name + '"></i>';
      loadLucide().then(function (lucide) {
        if (lucide) lucide.createIcons();
      });
    }

    // ---------- clock ----------
    _startClock() {
      var el = this._clockEl;
      var tick = function () { el.textContent = fmtTime(new Date()); };
      tick();
      this._clockTimer = setInterval(tick, 1000);
    }

    // ---------- music ----------
    _initMusic() {
      var self = this;
      
      // FIX: Accounts for converted runtime attributes (React converts hyphenated attributes to camelCase)
      // and corrects the internal fallback string to match your layout directory directory layout.
      var src = this.getAttribute('audio-src') || 
                this.getAttribute('audioSrc') || 
                'assets/images/mondamusic-synthwave-retro-pop-80s-491693.mp3';
                
      var isMobile = window.matchMedia('(max-width: 1024px)').matches;

      var pref = lsGet('vics-music-pref');
      if (pref !== 'on' && pref !== 'off') pref = isMobile ? 'off' : 'on';
      if (isMobile) pref = 'off'; // taskbar hidden on mobile; keep music muted there
      this._pref = pref;

      var audio = new Audio(src);
      audio.loop = true;
      audio.preload = 'auto';
      this._audio = audio;

      // Bulletproof looping: some browsers occasionally miss the loop flag —
      // restart from the top if the track ever fires 'ended'.
      audio.addEventListener('ended', function () {
        audio.currentTime = 0;
        if (self._pref === 'on') audio.play().catch(function () {});
      });

      var pos = lsGet('vics-music-pos');
      if (typeof pos === 'number' && pos > 0) {
        audio.addEventListener('loadedmetadata', function () {
          if (pos < audio.duration - 1) audio.currentTime = pos;
        }, { once: true });
      }
      var lastSave = 0;
      audio.addEventListener('timeupdate', function () {
        var now = Date.now();
        if (now - lastSave > 3000) { lastSave = now; lsSet('vics-music-pos', audio.currentTime); }
      });

      this._musicBtn.addEventListener('click', function (e) {
        if (e.target.closest('a')) return; // credit link, don't toggle
        self._toggleMusic();
      });

      this._renderMusic();
      if (pref === 'on') this._tryPlay();
    }

    _tryPlay() {
      var self = this;
      var p = this._audio.play();
      if (p && p.catch) {
        p.then(function () { self._renderMusic(); }).catch(function () {
          // autoplay blocked: start on first interaction (unless user turns it off)
          self._renderMusic();
          var kick = function () {
            document.removeEventListener('pointerdown', kick);
            document.removeEventListener('keydown', kick);
            if (self._pref === 'on' && self._audio.paused) {
              self._audio.play().then(function () { self._renderMusic(); }).catch(function () {});
            }
          };
          document.addEventListener('pointerdown', kick);
          document.addEventListener('keydown', kick);
        });
      }
    }

    _toggleMusic() {
      if (this._pref === 'on') {
        this._pref = 'off';
        this._audio.pause();
      } else {
        this._pref = 'on';
        this._tryPlay();
      }
      lsSet('vics-music-pref', this._pref);
      this._renderMusic();
    }

    _renderMusic() {
      var on = this._pref === 'on';
      
      // The text and link remain static regardless of the 'on' state
      this._musicBtn.innerHTML = '<span class="vt-ic-vol"></span><span>Music: <a href="' + CREDIT_URL + '" target="_blank" rel="noopener noreferrer">MondaMusic</a></span>';
      
      // Only the Lucide icon toggles between volume-2 (on) and volume-x (off)
      this._setIcon('.vt-ic-vol', on ? 'volume-2' : 'volume-x');
    }

    // ---------- weather ----------
    _loadWeather() {
      var self = this;
      var cached = lsGet('vics-weather');
      if (cached && Date.now() - cached.t < 30 * 60 * 1000) return this._renderWeather(cached);

      this._getGeo().then(function (geo) {
        if (!geo) return;
        var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + geo.lat + '&longitude=' + geo.lon +
          '&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit';
        return fetch(url).then(function (r) { return r.json(); }).then(function (j) {
          if (!j || !j.current) return;
          var w = { t: Date.now(), f: Math.round(j.current.temperature_2m), code: j.current.weather_code, isDay: j.current.is_day === 1 };
          lsSet('vics-weather', w);
          self._renderWeather(w);
        });
      }).catch(function () {}); // weather stays hidden on failure
    }

    _getGeo() {
      var cached = lsGet('vics-geo');
      if (cached && Date.now() - cached.t < 24 * 60 * 60 * 1000) return Promise.resolve(cached);
      return fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var geo = { t: Date.now(), lat: parseFloat(j.latitude), lon: parseFloat(j.longitude) };
          if (isNaN(geo.lat) || isNaN(geo.lon)) return null;
          lsSet('vics-geo', geo);
          return geo;
        })
        .catch(function () { return null; });
    }

    _renderWeather(w) {
      var wrap = this.querySelector('.vt-weather');
      var temp = this.querySelector('.vt-temp');
      if (!wrap || !temp) return;
      var f = useFahrenheit();
      temp.textContent = f ? w.f + '\u00B0F' : Math.round((w.f - 32) * 5 / 9) + '\u00B0C';
      this._setIcon('.vt-ic-weather', weatherIcon(w.code, w.isDay));
      wrap.style.display = 'flex';
    }
  }

  customElements.define('vics-taskbar', VicsTaskbar);
})();
