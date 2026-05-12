/* ============================================================
   BOYFRIEND SIMULATOR — script.js
   ============================================================ */

// ── Default State ──────────────────────────────────────────
const DEFAULT_STATE = {
  love:      50,
  mood:      50,
  energy:    70,
  hunger:    60,
  attention: 55,
  sass:      30,
  lastSaved: Date.now(),
};

// ── Relationship levels ────────────────────────────────────
const LEVELS = [
  { min: 0,  name: "Who is this man"         },
  { min: 20, name: "Talking stage"           },
  { min: 35, name: "Situationship"           },
  { min: 50, name: "Official but annoying"   },
  { min: 65, name: "Obsessed but denying it" },
  { min: 85, name: "Soulmate mode, unfortunately" },
];

// ── Mood definitions ────────────────────────────────────────
const MOODS = [
  { id: "dramatic",   label: "Dramatic",          emoji: "😩", moodClass: "mood-dramatic",  mouthClass: "mouth-sad"     },
  { id: "grumpy",     label: "Grumpy",             emoji: "😒", moodClass: "mood-grumpy",   mouthClass: "mouth-flat"    },
  { id: "needy",      label: "Needy but denying it", emoji: "🥺", moodClass: "mood-normal",  mouthClass: "mouth-neutral" },
  { id: "hungry",     label: "Hungry and rude",    emoji: "😤", moodClass: "mood-grumpy",   mouthClass: "mouth-flat"    },
  { id: "sleepy",     label: "Sleepy menace",      emoji: "😪", moodClass: "mood-sleepy",   mouthClass: "mouth-flat"    },
  { id: "petty",      label: "Petty",              emoji: "💅", moodClass: "mood-dramatic", mouthClass: "mouth-smirk"   },
  { id: "buffering",  label: "Emotionally buffering", emoji: "🤔", moodClass: "mood-normal", mouthClass: "mouth-neutral" },
  { id: "unbothered", label: "Unbothered",         emoji: "😏", moodClass: "mood-normal",   mouthClass: "mouth-smirk"   },
  { id: "soft",       label: "Soft mode",          emoji: "🥰", moodClass: "mood-love",     mouthClass: "mouth-happy",  blush: true },
  { id: "happy",      label: "Secretly happy",     emoji: "😊", moodClass: "mood-happy",    mouthClass: "mouth-happy"   },
];

// ── Responses per action ────────────────────────────────────
const RESPONSES = {
  text: [
    "Took you long enough.",
    "BB read your text immediately but waited 3 seconds to look mysterious.",
    "He is pretending this did not make his whole day.",
    "One word reply. He means ten paragraphs.",
    "bb is fine. obviously. totally not waiting for your text. except he was.",
    "He said 'haha' which is basically a sonnet from him.",
    "'k' — two letters, one thousand feelings.",
  ],
  feed: [
    "Food received. Attitude reduced by 12%.",
    "BB is less evil now.",
    "You fed him. He may allow affection.",
    "You fed him. Bare minimum, but okay.",
    "BB is emotionally unavailable until snack is provided. Status: now available.",
    "Hunger: solved. Attitude: still present.",
    "He ate. You are safe. For now.",
  ],
  compliment: [
    "He said 'stoppp' but clearly wants you to continue.",
    "BB is now unbearable.",
    "Compliment accepted. Ego inflated.",
    "He liked the compliment but will now act humble for 0.2 seconds.",
    "BB is pretending not to smile.",
    "He said 'thanks' but screamed internally.",
    "Warning: confidence levels critical. Proceed with caution.",
  ],
  meme: [
    "BB laughed and immediately pretended it was not that funny.",
    "He sent back 'LMAO' so you know it hit.",
    "Mood restored by brainrot.",
    "BB lost his composure for three seconds. He has recovered.",
    "He sent it to the group chat. You are his favourite.",
    "Meme approved. Bonus points.",
  ],
  date: [
    "Date successful. BB is acting casual but internally giggling.",
    "He said it was 'nice' which means he loved it.",
    "BB is now emotionally attached. Again.",
    "Date successful. He is acting normal but kicking his feet internally.",
    "He said next time you are paying. There will absolutely be a next time.",
    "BB is pretending to check his phone but he is thinking about you.",
  ],
  nap: [
    "BB is asleep but somehow still dramatic.",
    "He said five more minutes. It has been an hour.",
    "Nap complete. Sass rebooted.",
    "Sleeping: unlocked. Accountability: suspended.",
    "He is snoring. It is somehow cute. You hate it.",
    "He looked peaceful for three seconds then frowned in his sleep.",
  ],
  gift: [
    "He said you did not have to. He is lying.",
    "Gift received. BB is now soft but trying to hide it.",
    "He is emotionally compromised.",
    "BB accepted the gift and then immediately complained about nothing to reset the vibe.",
    "'You really did not have to' — he has already decided what he wants next.",
    "He put it down very carefully. Very casually. Very conspicuously.",
  ],
  ignore: [
    "BB is fine. Just dramatically looking out the window.",
    "He has entered petty mode.",
    "You ignored him. He will now say 'nothing' when asked what is wrong.",
    "Attention not found. Boyfriend malfunctioning.",
    "BB is staring at the wall like a Victorian widow.",
    "He typed a paragraph and deleted it. He is fine.",
    "BB has entered dramatic silence mode.",
  ],
  apologise: [
    "Apology accepted. Barely.",
    "He forgives you but will remember this for comedic purposes.",
    "BB has stopped being dramatic. For now.",
    "He said it is fine. Monitor the situation.",
    "Forgiven. He will bring it up one more time and then never again. Probably.",
    "Apology received. Processing… processed. Still a little bit annoyed.",
  ],
  annoy: [
    "You annoyed him. He is pretending to hate it.",
    "BB rolled his eyes but stayed.",
    "He is mad, but like… romantically.",
    "You annoyed him. He is 60% annoyed and 40% amused.",
    "He said 'whatever' which means he is fine.",
    "BB is mildly inconvenienced and loving every second of it.",
  ],
};

// ── Idle messages ──────────────────────────────────────────
const IDLE_MESSAGES = [
  "bb is fine. obviously. totally not waiting for your text.",
  "He says he is not needy. The attention bar says otherwise.",
  "BB is pretending to be busy. He is not busy.",
  "He checked his phone. Twice.",
  "BB misses you but would rather perish than say it first.",
  "He is fine. He is definitely fine.",
  "Careful. He is one minor inconvenience away from being dramatic.",
  "BB is emotionally stable. For now.",
  "He just sighed loudly with nobody around.",
  "BB is manifesting snacks.",
  "He is writing and deleting the same text message.",
  "BB is about to rearrange the furniture for no reason.",
  "He claimed he did not want attention. He lied.",
];

// ── State ──────────────────────────────────────────────────
let state = {};

function loadState() {
  const saved = localStorage.getItem("bfSimState");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...DEFAULT_STATE, ...parsed };

      // Apply time-based decay since last save
      const elapsed = (Date.now() - (state.lastSaved || Date.now())) / 1000;
      const ticks = Math.floor(elapsed / 25);
      if (ticks > 0) {
        state.hunger    = Math.max(0, state.hunger    - ticks * 2);
        state.energy    = Math.max(0, state.energy    - ticks * 1.5);
        state.attention = Math.max(0, state.attention - ticks * 2.5);
        if (state.attention < 30) {
          state.mood = Math.max(0, state.mood - ticks * 1);
          state.sass = Math.min(100, state.sass + ticks * 1);
        }
        state.love = Math.max(0, state.love - ticks * 0.3);
      }
      state.love      = clamp(state.love);
      state.mood      = clamp(state.mood);
      state.energy    = clamp(state.energy);
      state.hunger    = clamp(state.hunger);
      state.attention = clamp(state.attention);
      state.sass      = clamp(state.sass);
    } catch(e) {
      state = { ...DEFAULT_STATE };
    }
  } else {
    state = { ...DEFAULT_STATE };
  }
}

function saveState() {
  state.lastSaved = Date.now();
  localStorage.setItem("bfSimState", JSON.stringify(state));
}

function clamp(v, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, Math.round(v)));
}

// ── Stat modification ──────────────────────────────────────
function adjust(key, delta) {
  state[key] = clamp(state[key] + delta);
}

// ── Render all UI ──────────────────────────────────────────
function render() {
  // Bars & values
  ["love","mood","energy","hunger","attention","sass"].forEach(k => {
    const fill = document.getElementById("fill-" + k);
    const val  = document.getElementById("val-"  + k);
    fill.style.width = state[k] + "%";
    val.textContent  = state[k];

    const isDanger = (k === "sass") ? state[k] > 75 : state[k] < 25;
    fill.classList.toggle("danger", isDanger);
  });

  // Relationship level
  const level = getCurrentLevel();
  document.getElementById("level-name").textContent = level.name;

  // Mood
  const mood = getCurrentMood();
  document.getElementById("mood-emoji").textContent = mood.emoji;
  document.getElementById("mood-text").textContent  = mood.label;

  // BB character class
  const bb = document.getElementById("bb-character");
  MOODS.forEach(m => bb.classList.remove(m.moodClass));
  bb.classList.add(mood.moodClass);

  // Blush
  bb.classList.toggle("blush-active", !!mood.blush);

  // Mouth
  const mouth = document.getElementById("bb-mouth");
  mouth.className = mood.mouthClass;

  // Warnings
  renderWarnings();

  saveState();
}

function getCurrentLevel() {
  let result = LEVELS[0];
  for (const l of LEVELS) {
    if (state.love >= l.min) result = l;
  }
  return result;
}

function getCurrentMood() {
  // Priority-based mood selection
  if (state.energy < 20)    return MOODS.find(m => m.id === "sleepy");
  if (state.hunger < 20)    return MOODS.find(m => m.id === "hungry");
  if (state.mood < 20)      return MOODS.find(m => m.id === "dramatic");
  if (state.sass > 80)      return MOODS.find(m => m.id === "petty");
  if (state.attention < 25) return MOODS.find(m => m.id === "needy");
  if (state.mood < 35)      return MOODS.find(m => m.id === "grumpy");
  if (state.love > 80 && state.mood > 70) return MOODS.find(m => m.id === "soft");
  if (state.mood > 70)      return MOODS.find(m => m.id === "happy");
  if (state.mood > 55)      return MOODS.find(m => m.id === "unbothered");
  return MOODS.find(m => m.id === "buffering");
}

function renderWarnings() {
  const warnings = [];
  if (state.hunger    < 25) warnings.push("BB is hungry and about to become everyone's problem.");
  if (state.attention < 25) warnings.push("BB says he does not need attention. This is false.");
  if (state.energy    < 25) warnings.push("BB is tired and one blink away from becoming useless.");
  if (state.mood      < 25) warnings.push("BB is in dramatic silence mode.");
  if (state.love      < 25) warnings.push("BB is acting cold. Someone fix this man.");
  if (state.sass      > 75) warnings.push("Sass levels are dangerous. Proceed carefully.");

  const box = document.getElementById("warning-box");
  const txt = document.getElementById("warning-text");
  if (warnings.length > 0) {
    box.classList.remove("hidden");
    txt.textContent = warnings[0]; // Show most important one
  } else {
    box.classList.add("hidden");
  }
}

// ── Speech bubble ──────────────────────────────────────────
function speak(text) {
  const bubble = document.getElementById("speech-bubble");
  const el = document.getElementById("speech-text");
  el.textContent = text;
  // Retrigger animation
  bubble.classList.remove("new-message");
  void bubble.offsetWidth;
  bubble.classList.add("new-message");
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Heart animation ────────────────────────────────────────
function spawnHeart() {
  const container = document.getElementById("hearts-container");
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = pickRandom(["💕","💖","💗","💓","💞","❤️"]);
  heart.style.left = (20 + Math.random() * 80) + "px";
  heart.style.bottom = "10px";
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 1500);
}

// ── BB animation trigger ───────────────────────────────────
function animateBB(type) {
  const bb = document.getElementById("bb-character");
  bb.classList.remove("is-dramatic","is-happy");
  void bb.offsetWidth;
  if (type === "dramatic") bb.classList.add("is-dramatic");
  if (type === "happy")    bb.classList.add("is-happy");
  setTimeout(() => bb.classList.remove("is-dramatic","is-happy"), 600);
}

// ── Notification popup ─────────────────────────────────────
let notifTimer = null;
function showNotif(text) {
  const existing = document.querySelector(".notif-pop");
  if (existing) existing.remove();
  if (notifTimer) clearTimeout(notifTimer);

  const el = document.createElement("div");
  el.className = "notif-pop";
  el.textContent = "📱 " + text;
  document.body.appendChild(el);
  notifTimer = setTimeout(() => el.remove(), 2700);
}

// ── Action handler ─────────────────────────────────────────
function doAction(action) {
  const response = pickRandom(RESPONSES[action]);

  switch(action) {
    case "text":
      adjust("attention", +15);
      adjust("love",      +8);
      adjust("sass",      -5);
      animateBB("happy");
      spawnHeart();
      showNotif("BB got your text.");
      break;

    case "feed":
      adjust("hunger", +25);
      adjust("mood",   +12);
      adjust("sass",   -8);
      animateBB("happy");
      break;

    case "compliment":
      adjust("love", +12);
      adjust("mood", +15);
      adjust("sass", +8);
      animateBB("happy");
      spawnHeart();
      break;

    case "meme":
      adjust("mood",      +15);
      adjust("attention", +8);
      adjust("energy",    +5);
      animateBB("happy");
      showNotif("bb sent back '💀'");
      break;

    case "date":
      adjust("love",   +20);
      adjust("mood",   +15);
      adjust("energy", -20);
      adjust("sass",   -10);
      animateBB("happy");
      spawnHeart(); spawnHeart();
      setTimeout(spawnHeart, 300);
      break;

    case "nap":
      adjust("energy",    +30);
      adjust("attention", -12);
      adjust("mood",      +5);
      animateBB("dramatic");
      break;

    case "gift":
      adjust("love",  +15);
      adjust("mood",  +18);
      adjust("sass",  -10);
      animateBB("happy");
      spawnHeart(); spawnHeart();
      break;

    case "ignore":
      adjust("mood",      -18);
      adjust("love",      -10);
      adjust("attention", -20);
      adjust("sass",      +18);
      animateBB("dramatic");
      break;

    case "apologise":
      if (state.mood < 50 || state.sass > 60) {
        adjust("mood",  +20);
        adjust("sass",  -15);
        adjust("love",  +5);
        animateBB("happy");
      } else {
        speak("He raised one eyebrow. 'What are you apologising for?' He knows exactly what you are apologising for.");
        render();
        return;
      }
      break;

    case "annoy":
      adjust("sass",  +15);
      adjust("mood",  Math.random() > 0.5 ? +8 : -8);
      adjust("love",  Math.random() > 0.5 ? +3 : -3);
      animateBB(Math.random() > 0.5 ? "dramatic" : "happy");
      break;
  }

  speak(response);
  render();
}

// ── Game loop (decay) ──────────────────────────────────────
function gameTick() {
  adjust("hunger",    -2);
  adjust("energy",    -1.5);
  adjust("attention", -2.5);

  if (state.attention < 30) {
    adjust("mood", -1.5);
    adjust("sass", +1.5);
  }
  if (state.hunger < 20) {
    adjust("mood", -1);
  }

  // Slow love decay
  adjust("love", -0.3);

  render();

  // Idle speech occasionally
  if (Math.random() < 0.3) {
    speak(pickRandom(IDLE_MESSAGES));
  }
}

// ── Reset ──────────────────────────────────────────────────
function resetGame() {
  const confirmed = confirm("Reset the relationship? BB will pretend he is fine about it. He will not be fine.");
  if (!confirmed) return;
  state = { ...DEFAULT_STATE, lastSaved: Date.now() };
  speak("Fresh start. BB is acting unbothered. He is, in fact, very bothered.");
  render();
  showNotif("Relationship reset. He is pretending he does not care.");
}

// ── Init ───────────────────────────────────────────────────
function init() {
  loadState();
  render();

  // First message
  const openingLines = [
    "bb is fine. obviously. totally not waiting for your text.",
    "oh. you came back. cool. whatever.",
    "He was not waiting. He was just… near the phone.",
    "BB has entered the chat. Act normal.",
  ];
  speak(pickRandom(openingLines));

  // Game tick every 25s
  setInterval(gameTick, 25000);

  // Idle message every 45s
  setInterval(() => {
    if (Math.random() < 0.6) {
      speak(pickRandom(IDLE_MESSAGES));
    }
  }, 45000);
}

document.addEventListener("DOMContentLoaded", init);
