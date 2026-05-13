/* ============================================================
   BOYFRIEND SIMULATOR — script.js
   BB + Pinary + Death + Cooldowns + Diminishing Returns +
   Emotional Energy + Wants + Combos + Achievements +
   Death Counters + Progressive Zombification
   ============================================================ */

// ════════════════════════════════════════════════════════════
//  DEFAULT STATE
// ════════════════════════════════════════════════════════════

const BB_DEFAULT = {
  love: 50, mood: 50, energy: 70,
  hunger: 60, attention: 55, sass: 30,
  alive: true, deathWarning: 0,
  bbDeaths: 0, bbZombieLevel: 0,
};
const PIN_DEFAULT = {
  love: 30, mood: 45, hunger: 50,
  attention: 40, drama: 40,
  foodStandards: 60, emotionalStability: 45,
  alive: true,
  pinDeaths: 0, pinZombieLevel: 0,
};

// ════════════════════════════════════════════════════════════
//  RELATIONSHIP LEVELS
// ════════════════════════════════════════════════════════════

const BB_LEVELS = [
  { min: 0,  name: "Who is this man"              },
  { min: 20, name: "Talking stage"                },
  { min: 35, name: "Situationship"                },
  { min: 50, name: "Official but annoying"        },
  { min: 65, name: "Obsessed but denying it"      },
  { min: 85, name: "Soulmate mode, unfortunately" },
];
const PIN_LEVELS = [
  { min: 0,  name: "Suspicious"                 },
  { min: 15, name: "Mildly entertained"         },
  { min: 28, name: "Still judging you"          },
  { min: 42, name: "Maybe you're useful"        },
  { min: 58, name: "Obsessed but will deny it"  },
  { min: 72, name: "Wife mode unlocked"         },
  { min: 88, name: "Impossible princess status" },
];

// ════════════════════════════════════════════════════════════
//  MOODS
// ════════════════════════════════════════════════════════════

const BB_MOODS = [
  { id: "dramatic",   label: "Dramatic",              emoji: "😩", moodClass: "mood-dramatic",  mouthClass: "mouth-sad"     },
  { id: "grumpy",     label: "Grumpy",                emoji: "😒", moodClass: "mood-grumpy",    mouthClass: "mouth-flat"    },
  { id: "needy",      label: "Needy but denying it",  emoji: "🥺", moodClass: "mood-normal",    mouthClass: "mouth-neutral" },
  { id: "hungry",     label: "Hungry and rude",       emoji: "😤", moodClass: "mood-grumpy",    mouthClass: "mouth-flat"    },
  { id: "sleepy",     label: "Sleepy menace",         emoji: "😪", moodClass: "mood-sleepy",    mouthClass: "mouth-flat"    },
  { id: "petty",      label: "Petty",                 emoji: "💅", moodClass: "mood-dramatic",  mouthClass: "mouth-smirk"   },
  { id: "buffering",  label: "Emotionally buffering", emoji: "🤔", moodClass: "mood-normal",    mouthClass: "mouth-neutral" },
  { id: "unbothered", label: "Unbothered",            emoji: "😏", moodClass: "mood-normal",    mouthClass: "mouth-smirk"   },
  { id: "soft",       label: "Soft mode",             emoji: "🥰", moodClass: "mood-love",      mouthClass: "mouth-happy",  blush: true },
  { id: "happy",      label: "Secretly happy",        emoji: "😊", moodClass: "mood-happy",     mouthClass: "mouth-happy"   },
  { id: "ghost",      label: "Pixel ghost mode",      emoji: "👻", moodClass: "mood-normal",    mouthClass: "mouth-dead"    },
];
const PIN_MOODS = [
  { id: "judging",      label: "Judging you",           emoji: "🤨", moodClass: "pmood-normal",   mouthClass: "pm-smirk"  },
  { id: "hungry",       label: "Hungry and dangerous",  emoji: "😤", moodClass: "pmood-grumpy",   mouthClass: "pm-flat"   },
  { id: "crying",       label: "Crying cutely",         emoji: "😢", moodClass: "pmood-sad",      mouthClass: "pm-sad",    crying: true },
  { id: "dramatic",     label: "Dramatic silence",      emoji: "😔", moodClass: "pmood-dramatic", mouthClass: "pm-sad"    },
  { id: "overthinking", label: "Overthinking",          emoji: "💭", moodClass: "pmood-normal",   mouthClass: "pm-neutral"},
  { id: "soft",         label: "Soft but suspicious",   emoji: "🥰", moodClass: "pmood-soft",     mouthClass: "pm-happy",  blush: true },
  { id: "goofy",        label: "Goofy mode",            emoji: "😂", moodClass: "pmood-happy",    mouthClass: "pm-open"   },
  { id: "sass",         label: "Sass attack",           emoji: "💅", moodClass: "pmood-grumpy",   mouthClass: "pm-smirk"  },
  { id: "buffering",    label: "Emotionally buffering", emoji: "😵‍💫", moodClass: "pmood-normal",  mouthClass: "pm-neutral"},
  { id: "impossible",   label: "Impossible to please",  emoji: "😤", moodClass: "pmood-grumpy",   mouthClass: "pm-flat"   },
  { id: "princess",     label: "Princess mode",         emoji: "👑", moodClass: "pmood-soft",     mouthClass: "pm-smirk",  blush: true },
  { id: "redflag",      label: "Red flag sparkle mode", emoji: "🚩", moodClass: "pmood-happy",    mouthClass: "pm-happy"  },
  { id: "ghost",        label: "Ghost princess mode",   emoji: "👸", moodClass: "pmood-dramatic", mouthClass: "pm-dead"   },
];

// ════════════════════════════════════════════════════════════
//  ZOMBIE HELPERS
// ════════════════════════════════════════════════════════════

function getBBZombieClass(level) {
  if (level >= 10) return "zombie-10";
  if (level >= 5)  return "zombie-5";
  if (level >= 3)  return "zombie-3";
  if (level >= 1)  return "zombie-1";
  return "";
}
function getPinZombieClass(level) {
  if (level >= 50) return "zombie-50";
  if (level >= 25) return "zombie-25";
  if (level >= 10) return "zombie-10";
  if (level >= 5)  return "zombie-5";
  if (level >= 3)  return "zombie-3";
  if (level >= 1)  return "zombie-1";
  return "";
}
function getBBZombieLabel(level) {
  if (level >= 10) return "Zombie boyfriend mode";
  if (level >= 5)  return "Technically alive";
  if (level >= 3)  return "Nokia-with-cracks mode";
  if (level >= 1)  return "Slightly haunted";
  return "Alive and annoying";
}
function getPinZombieLabel(level) {
  if (level >= 50) return "Impossible undead princess";
  if (level >= 25) return "Final boss girlfriend";
  if (level >= 10) return "Recurring supernatural incident";
  if (level >= 5)  return "Zombie princess mode";
  if (level >= 3)  return "Ghost princess pending";
  if (level >= 1)  return "Emotionally haunted";
  return "Alive but dramatic";
}

// Milestone messages fired as speech on death milestones
const BB_DEATH_MILESTONES = {
  1:  "Brian has died once. Honestly, skill issue.",
  3:  "Brian is not as durable as advertised.",
  5:  "Brian has entered Nokia-with-cracks mode.",
  10: "Brian is now an undead boyfriend with sarcasm DLC.",
};
const PIN_DEATH_MILESTONES = {
  1:  "Pinary has died from her first inconvenience.",
  5:  "Pinary has entered professional victim mode.",
  10: "Pinary is now a ghost princess with commitment issues.",
  25: "Pinary has died so many times the afterlife blocked her number.",
  50: "Pinary has become the final boss of emotional instability.",
};

// Running commentary shown under death count
function getBBDeathsCommentary(deaths) {
  if (deaths >= 10) return "BB is now emotionally undead.";
  if (deaths >= 5)  return "Not as durable as advertised.";
  if (deaths >= 3)  return "Nokia-with-cracks mode.";
  if (deaths === 1) return "That took actual effort.";
  return "";
}
function getPinDeathsCommentary(deaths) {
  if (deaths >= 20) return "Death is part of her personality.";
  if (deaths >= 10) return "Legally a recurring incident.";
  if (deaths >= 5)  return "More deaths than therapy sessions.";
  if (deaths === 1) return "First of many.";
  return "";
}

// Revive messages scaling with zombie level
function getBBReviveMsg(zl) {
  if (zl >= 10) return pickRandom(["Brian has returned. He looks worse each time.", "Brian respawned. Nobody is surprised anymore.", "Brian came back. The zombification progresses."]);
  if (zl >= 5)  return pickRandom(["Brian is alive again. Terms and conditions apply.", "He is back. He looks different. We do not comment on it.", "Brian came back. He brought the sarcasm. Left the sanity."]);
  if (zl >= 3)  return pickRandom(["Brian has returned. Slightly more haunted.", "Brian respawned with 12% more sarcasm.", "Brian came back slightly less fresh."]);
  return pickRandom(["Brian has returned. Still sarcastic. Somehow.", "Brian is alive again. He has questions.", "Brian respawned. He was not ready."]);
}
function getPinReviveMsg(zl) {
  if (zl >= 50) return "The afterlife blocked her number. She came back anyway.";
  if (zl >= 25) return pickRandom(["Pinary returned. The afterlife couldn't handle her.", "She came back. The ghost realm filed a complaint.", "Pinary is back. Death has become her commute."]);
  if (zl >= 10) return pickRandom(["Pinary returned from the afterlife and asked for coffee.", "Ghost princess restored. Emotional stability not included.", "She came back wrong, but cute."]);
  if (zl >= 5)  return pickRandom(["Pinary has been revived. She is still judging you.", "She returned. The snacks were substandard. She noted this.", "Zombie princess mode engaged."]);
  return pickRandom(["Pinary has been revived with snacks. Still disappointed.", "Pinary returned from her dramatic death. She has notes.", "She came back. Still unimpressed."]);
}

// ════════════════════════════════════════════════════════════
//  COOLDOWN DEFINITIONS  (seconds)
// ════════════════════════════════════════════════════════════

const COOLDOWN_SECS = {
  text: 10, feed: 20, compliment: 15, meme: 15, date: 60,
  nap: 30, gift: 45, ignore: 10, apologise: 30, annoy: 20,
  pfeed: 30, pcompliment: 15, pattention: 20, pmeme: 15, pcoffee: 45,
  paskwhat: 20, papologise: 30, pannoy: 20, preassure: 25, pdate: 60,
  reviveBB: 30, revivePinary: 30,
};
const COOLDOWN_MSGS = [
  "Relax. They have not processed the last emotion yet.",
  "You cannot speedrun emotional maintenance.",
  "Pinary is overstimulated. Try again later.",
  "BB is buffering emotionally.",
  "Too fast. Feelings need loading time.",
  "The emotional queue is full. Please wait.",
  "This is not a vending machine. Back up.",
];
let cooldownEnds = {};

// ════════════════════════════════════════════════════════════
//  DIMINISHING RETURNS
// ════════════════════════════════════════════════════════════

const DIM_WINDOW_MS = 120000;
let actionUsage = {};
const DIM_MSGS = [
  ["She heard you the first time.", "He noticed. Twice. That's getting weird.", "This is starting to feel rehearsed."],
  ["Compliment inflation is real.", "BB is suspicious now.", "She nodded but stopped believing you.", "The sincerity has left the building."],
  ["The emotional economy is crashing.", "You have peaked. It's downhill from here.", "Nobody believes you anymore. Impressive.", "Maximum diminishing returns achieved."],
];
function getDimReturn(key) {
  const now = Date.now();
  const usage = (actionUsage[key] || []).filter(t => now - t < DIM_WINDOW_MS);
  actionUsage[key] = usage;
  return usage.length;
}
function recordUsage(key) {
  if (!actionUsage[key]) actionUsage[key] = [];
  actionUsage[key].push(Date.now());
}
function dimMultiplier(count) {
  if (count === 0) return 1.0;
  if (count === 1) return 0.5;
  if (count === 2) return 0.25;
  return 0.05;
}
function getDimMsg(count) {
  if (count <= 0) return null;
  return pickRandom(DIM_MSGS[Math.min(count - 1, 2)]);
}

// ════════════════════════════════════════════════════════════
//  EMOTIONAL ENERGY
// ════════════════════════════════════════════════════════════

const ENERGY_COSTS = {
  text: 5, feed: 10, compliment: 8, meme: 5, date: 30,
  nap: 5, gift: 20, ignore: 5, apologise: 15, annoy: 5,
  pfeed: 10, pcompliment: 8, pattention: 10, pmeme: 5, pcoffee: 15,
  paskwhat: 8, papologise: 15, pannoy: 5, preassure: 15, pdate: 30,
  reviveBB: 35, revivePinary: 35,
};
const ENERGY_LOW_MSGS = [
  "You are emotionally bankrupt.",
  "No energy left. Go touch grass.",
  "You cannot fix everyone while running on 3%.",
  "Emotional energy depleted. Sit down.",
  "You gave too much. There is nothing left.",
];
let playerEnergy = 100;

function spendEnergy(key) {
  const cost = ENERGY_COSTS[key] || 5;
  if (playerEnergy < cost) return false;
  playerEnergy = Math.max(0, playerEnergy - cost);
  if (playerEnergy === 0) { unlockAchievementById("bankrupt"); showEnergyCrisis(); }
  renderEnergy();
  return true;
}
function showEnergyCrisis() {
  const msg = document.getElementById("energy-status-msg");
  if (!msg) return;
  msg.textContent = pickRandom(ENERGY_LOW_MSGS);
  msg.classList.remove("hidden");
  setTimeout(() => msg.classList.add("hidden"), 3500);
}
function renderEnergy() {
  const fill = document.getElementById("energy-fill");
  const val  = document.getElementById("energy-val");
  if (!fill || !val) return;
  fill.style.width = playerEnergy + "%";
  val.textContent  = Math.round(playerEnergy);
  fill.className   = "energy-bar-fill";
  if (playerEnergy <= 15)      fill.classList.add("energy-crit");
  else if (playerEnergy <= 35) fill.classList.add("energy-low");
  else if (playerEnergy <= 60) fill.classList.add("energy-mid");
  document.querySelectorAll("[data-cooldown-key]").forEach(btn => {
    btn.classList.remove("btn-energy-locked");
    const key  = btn.getAttribute("data-cooldown-key");
    const cost = ENERGY_COSTS[key] || 5;
    if (playerEnergy < cost && !isCoolingDown(key)) btn.classList.add("btn-energy-locked");
  });
}

// ════════════════════════════════════════════════════════════
//  CHARACTER WANTS
// ════════════════════════════════════════════════════════════

const BB_WANTS = [
  { action: "text",       hint: "💭 BB keeps checking his phone." },
  { action: "meme",       hint: "💭 BB is scrolling and sighing loudly." },
  { action: "nap",        hint: "💭 BB is acting sleepy but denying it." },
  { action: "compliment", hint: "💭 BB did something good. He is waiting for acknowledgement." },
  { action: "date",       hint: "💭 BB has been hinting about going out since Tuesday." },
];
const PIN_WANTS = [
  { action: "pcoffee",    hint: "💭 Pinary mentioned coffee twice. This is not subtle." },
  { action: "pfeed",      hint: "💭 Pinary is staring at food content dramatically." },
  { action: "pattention", hint: "💭 Pinary is staring into the distance. Waiting." },
  { action: "preassure",  hint: "💭 Pinary keeps sighing and looking at you." },
  { action: "papologise", hint: "💭 Pinary has gone quiet. Something happened and you missed it." },
  { action: "pdate",      hint: "💭 Pinary casually mentioned couples who go on dates." },
];
const WANT_BONUS_BB  = ["That is exactly what he needed. He will never admit it.", "You read his mind. He is flustered.", "Correct. He is now emotionally compromised.", "He wanted this. He will still act unbothered."];
const WANT_BONUS_PIN = ["She clapped once. That's a standing ovation from her.", "She tried not to smile. She failed.", "Perfect. You did something right for once.", "She is pleased. Enjoy this. It is temporary."];
const WANT_WRONG_PIN = ["Not what she wanted. Drama noted.", "She filed that under 'disappointments'.", "Wrong. She is adding it to the list."];
let bbWant = null, pinWant = null, bbWantExp = 0, pinWantExp = 0;

function assignWants() {
  const now = Date.now();
  if (bbState.alive && !bbWant && Math.random() < 0.55) { bbWant = pickRandom(BB_WANTS); bbWantExp = now + 60000; renderWantHint("bb", bbWant.hint); }
  if (pinState.alive && !pinWant && Math.random() < 0.65) { pinWant = pickRandom(PIN_WANTS); pinWantExp = now + 60000; renderWantHint("pin", pinWant.hint); }
}
function expireWants() {
  const now = Date.now();
  if (bbWant  && now > bbWantExp)  { bbWant  = null; hideWantHint("bb");  }
  if (pinWant && now > pinWantExp) { pinWant = null; hideWantHint("pin"); }
}
function renderWantHint(who, text) {
  const el = document.getElementById(who + "-want");
  const tx = document.getElementById(who + "-want-text");
  if (!el || !tx) return;
  tx.textContent = text; el.classList.remove("hidden");
}
function hideWantHint(who) { const el = document.getElementById(who + "-want"); if (el) el.classList.add("hidden"); }
function checkBBWant(key) {
  if (!bbWant) return 0;
  if (bbWant.action === key) { const msg = pickRandom(WANT_BONUS_BB); bbSpeak("⭐ " + msg); showNotif("⭐ Want fulfilled! " + msg); bbWant = null; hideWantHint("bb"); return 1; }
  return -1;
}
function checkPinWant(key) {
  if (!pinWant) return 0;
  if (pinWant.action === key) { const msg = pickRandom(WANT_BONUS_PIN); pinarySpeak("⭐ " + msg); showNotif("⭐ " + msg); pinWant = null; hideWantHint("pin"); return 1; }
  adjustPin("drama", +5); pinarySpeak(pickRandom(WANT_WRONG_PIN)); return -1;
}

// ════════════════════════════════════════════════════════════
//  COMBO SYSTEM
// ════════════════════════════════════════════════════════════

const COMBO_WINDOW_MS = 45000;
let recentActions = [];
let triggeredCombos = new Set();
const COMBOS = [
  { id: "princess_stabilised", name: "Princess Stabilised",       keys: ["pcoffee","pcompliment","pattention"], ordered: false, effect: () => { adjustPin("mood",+20); adjustPin("drama",-15); adjustPin("emotionalStability",+10); }, msg: "✨ COMBO: Princess Stabilised — Mood +20, Drama -15", who: "pin" },
  { id: "bb_kicking_feet",     name: "BB Kicking His Feet",       keys: ["meme","text","compliment"],           ordered: false, effect: () => { adjustBB("love",+20); adjustBB("mood",+15); adjustBB("sass",-10); },                  msg: "💕 COMBO: BB Kicking His Feet — Love +20, Mood +15",  who: "bb"  },
  { id: "damage_control",      name: "Emotional Damage Control",  keys: ["pfeed","preassure"],                  ordered: false, effect: () => { adjustPin("emotionalStability",+20); adjustPin("drama",-10); adjustPin("mood",+8); }, msg: "💙 COMBO: Emotional Damage Control — Stability +20",  who: "pin" },
  { id: "you_chose_violence",  name: "You Chose Violence",        keys: ["pannoy","paskwhat"],                  ordered: true,  effect: () => { adjustPin("drama",+25); adjustPin("emotionalStability",-15); },                      msg: "🚩 COMBO: You Chose Violence — Drama +25. You did this.", who: "pin", bad: true },
  { id: "nokia_protocol",      name: "Nokia Boyfriend Protocol",  keys: ["feed","nap","text"],                  ordered: false, effect: () => { adjustBB("energy",+20); adjustBB("hunger",+15); adjustBB("mood",+10); },              msg: "📱 COMBO: Nokia Boyfriend Protocol — BB fully maintained", who: "bb" },
  { id: "chaos_agent",         name: "Chaos Agent",               keys: ["ignore","annoy","pannoy"],            ordered: false, effect: () => { adjustBB("sass",+20); adjustPin("drama",+20); },                                       msg: "😈 COMBO: Chaos Agent — Violence on both of them.",   who: "both", bad: true },
  { id: "full_reset",          name: "Pinary Full Reset",         keys: ["pcoffee","pfeed","papologise","preassure"], ordered: false, effect: () => { adjustPin("mood",+25); adjustPin("drama",-20); adjustPin("emotionalStability",+15); adjustPin("love",+10); }, msg: "👑 COMBO: Pinary Full Reset — She is almost okay", who: "pin" },
];
function pushRecentAction(key) { const now = Date.now(); recentActions.push({ key, time: now }); recentActions = recentActions.filter(a => now - a.time < COMBO_WINDOW_MS); }
function checkCombos() {
  const now = Date.now();
  const window = recentActions.filter(a => now - a.time < COMBO_WINDOW_MS);
  for (const combo of COMBOS) {
    if (triggeredCombos.has(combo.id)) continue;
    let matched = false;
    if (combo.ordered) { let ki = 0; for (const a of window) { if (a.key === combo.keys[ki]) ki++; if (ki === combo.keys.length) { matched = true; break; } } }
    else matched = combo.keys.every(k => window.some(a => a.key === k));
    if (matched) {
      triggeredCombos.add(combo.id);
      combo.effect();
      showComboPop(combo.msg, !!combo.bad);
      if (combo.who === "bb"   || combo.who === "both") spawnHeart("bb-hearts");
      if (combo.who === "pin"  || combo.who === "both") spawnHeart("pin-hearts");
      combosTriggered++;
      checkAchievements(); saveAchievements();
      setTimeout(() => triggeredCombos.delete(combo.id), 60000);
      render();
      if (combo.bad) checkPinaryDeath();
      break;
    }
  }
}
function showComboPop(text, isBad = false) {
  const existing = document.querySelector(".combo-pop"); if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = isBad ? "combo-pop bad-combo" : "combo-pop"; el.textContent = text;
  document.body.appendChild(el); setTimeout(() => el.remove(), 3000);
}

// ════════════════════════════════════════════════════════════
//  ACHIEVEMENTS
// ════════════════════════════════════════════════════════════

const ACHIEVEMENT_DEFS = [
  { id: "bare_minimum",    icon: "🏅", name: "Bare Minimum Hero",            desc: "Keep both alive for 5 minutes",        target: 300 },
  { id: "snack_tech",      icon: "🍕", name: "Snack Technician",             desc: "Revive Pinary 5 times",                target: 5   },
  { id: "nokia_certified", icon: "📱", name: "Nokia Boyfriend Certified",    desc: "Brian survives for 10 minutes",        target: 600 },
  { id: "princess_handler",icon: "👑", name: "Princess Handler",             desc: "Keep Pinary alive for 3 minutes",      target: 180 },
  { id: "therapy_dlc",     icon: "💀", name: "Couples Therapy DLC Required", desc: "Total deaths reach 20",                target: 20  },
  { id: "intern",          icon: "💼", name: "Emotional Support Intern",     desc: "Reach relationship level 3 with both", target: 1   },
  { id: "combo_king",      icon: "⚡", name: "Combo Connoisseur",            desc: "Trigger 5 combos",                     target: 5   },
  { id: "bankrupt",        icon: "💸", name: "Emotionally Bankrupt",         desc: "Hit 0 Emotional Energy",               target: 1   },
];
let achievementState  = {};
let combosTriggered   = 0;
let continuousAlive   = { bb: 0, pin: 0, both: 0 };

function loadAchievements() {
  try {
    const raw = localStorage.getItem("bfSimAchievements");
    if (raw) { const saved = JSON.parse(raw); achievementState = saved.state || {}; combosTriggered = saved.combosTriggered || 0; }
  } catch (e) {}
  ACHIEVEMENT_DEFS.forEach(a => { if (!achievementState[a.id]) achievementState[a.id] = { unlocked: false, progress: 0 }; });
}
function saveAchievements() {
  localStorage.setItem("bfSimAchievements", JSON.stringify({ state: achievementState, combosTriggered }));
}
function checkAchievements() {
  const totalDeaths = (bbState.bbDeaths || 0) + (pinState.pinDeaths || 0);
  if (!achievementState.bare_minimum.unlocked) { achievementState.bare_minimum.progress = continuousAlive.both; if (continuousAlive.both >= 300) unlockAchievementById("bare_minimum"); }
  if (!achievementState.nokia_certified.unlocked) { achievementState.nokia_certified.progress = continuousAlive.bb; if (continuousAlive.bb >= 600) unlockAchievementById("nokia_certified"); }
  if (!achievementState.princess_handler.unlocked) { achievementState.princess_handler.progress = continuousAlive.pin; if (continuousAlive.pin >= 180) unlockAchievementById("princess_handler"); }
  if (!achievementState.therapy_dlc.unlocked) { achievementState.therapy_dlc.progress = totalDeaths; if (totalDeaths >= 20) unlockAchievementById("therapy_dlc"); }
  if (!achievementState.intern.unlocked) { const bbIdx = BB_LEVELS.filter(l => bbState.love >= l.min).length - 1; const pinIdx = PIN_LEVELS.filter(l => pinState.love >= l.min).length - 1; if (bbIdx >= 2 && pinIdx >= 2) unlockAchievementById("intern"); }
  if (!achievementState.combo_king.unlocked) { achievementState.combo_king.progress = combosTriggered; if (combosTriggered >= 5) unlockAchievementById("combo_king"); }
  renderAchievements();
}
function unlockAchievementById(id) {
  if (!achievementState[id] || achievementState[id].unlocked) return;
  achievementState[id].unlocked = true;
  achievementState[id].progress = ACHIEVEMENT_DEFS.find(a => a.id === id)?.target || 1;
  const def = ACHIEVEMENT_DEFS.find(a => a.id === id);
  if (def) showAchievementPop(def);
  saveAchievements(); renderAchievements();
}
function showAchievementPop(def) {
  const existing = document.querySelector(".achievement-pop"); if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "achievement-pop"; el.textContent = `🏆 UNLOCKED: ${def.icon} ${def.name} — ${def.desc}`;
  document.body.appendChild(el); setTimeout(() => el.remove(), 4500);
}
function renderAchievements() {
  const grid  = document.getElementById("achievements-grid");
  const count = document.getElementById("ach-unlocked");
  const total = document.getElementById("ach-total");
  if (!grid) return;
  const unlockedCount = ACHIEVEMENT_DEFS.filter(a => achievementState[a.id]?.unlocked).length;
  if (count) count.textContent = unlockedCount;
  if (total) total.textContent = ACHIEVEMENT_DEFS.length;
  grid.innerHTML = "";
  for (const def of ACHIEVEMENT_DEFS) {
    const st = achievementState[def.id] || {};
    const card = document.createElement("div");
    card.className = "ach-card " + (st.unlocked ? "unlocked" : "locked");
    const prog = st.unlocked ? "✅ Complete" : `${Math.min(st.progress || 0, def.target)} / ${def.target}`;
    card.innerHTML = `<div class="ach-card-name">${def.icon} ${def.name}</div><div class="ach-card-desc">${def.desc}</div><div class="ach-card-progress">${prog}</div>`;
    grid.appendChild(card);
  }
}
function toggleAchievements() { const panel = document.getElementById("achievements-panel"); if (panel) panel.classList.toggle("hidden"); }

// ════════════════════════════════════════════════════════════
//  DEATH MESSAGES
// ════════════════════════════════════════════════════════════

const BB_DEATH_MSGS = [
  "Brian died? Honestly impressive. He was built like a Nokia.",
  "Brian has collapsed from emotional starvation.",
  "Brian survived everything except being left on read.",
  "Brian is now a pixel ghost. Still sarcastic.",
  "You killed Brian. That took real effort.",
  "Brian has dramatically passed away from sustained neglect.",
  "He said he was fine. He lied. He has perished.",
  "Brian is a ghost now. He is somehow still judging you.",
];
const BB_DEATH_WARNING_MSGS = [
  "Brian is being dramatic. Also slightly dying.",
  "Brian is severely neglected but still pretending he's fine.",
  "Brian is one inconvenience away from collapsing.",
];
const PIN_DEATH_BY_CAUSE = {
  hunger:    ["Pinary saw bad food and immediately passed away.", "No snacks detected. Pinary could not continue.", "She was hungry. Nobody helped. She perished.", "Bad snack environment. Pinary has fallen."],
  mood:      ["She said she was fine. She was not fine. She died.", "A vibe shift occurred. Pinary did not survive.", "Cause of death: emotional inconvenience.", "The vibe was wrong. She could not go on."],
  attention: ["Attention was 1% too low. Pinary has perished.", "She has been quiet for too long. She perished.", "You looked away for 4 seconds. She is gone.", "Pinary experienced an attention deficit. Fatally."],
  drama:     ["Drama levels reached critical mass. Pinary has collapsed.", "She overthought the text and entered ghost princess mode.", "Too much drama. Even for her.", "The drama was unsustainable. Pinary has fallen."],
  stability: ["Emotional stability not found. Pinary has perished.", "She overthought a one-word reply and did not recover.", "Overthinking was fatal this time.", "Emotional inconvenience was terminal."],
  standards: ["Food standards exceeded human limits. Pinary has collapsed.", "No food could meet her requirements. She perished.", "She required restaurant-quality everything. She received nothing."],
  random:    ["Pinary has died from a minor inconvenience.", "Pinary remembered something from 3 weeks ago and perished.", "She died dramatically but looked cute doing it.", "Pinary has entered ghost princess mode.", "You failed to maintain the princess.", "No coffee detected. Fatal error.", "She got sad randomly and did not survive it.", "A completely normal Tuesday killed her.", "Cause of death: being her."],
};

// ════════════════════════════════════════════════════════════
//  ACTION RESPONSES
// ════════════════════════════════════════════════════════════

const BB_RESPONSES = {
  text:       ["Took you long enough.", "BB read your text immediately but waited 3 seconds to look mysterious.", "He is pretending this did not make his whole day.", "One word reply. He means ten paragraphs.", "bb is fine. obviously. totally not waiting for your text. except he was.", "He said 'haha' which is basically a sonnet from him.", "'k' — two letters, one thousand feelings."],
  feed:       ["Food received. Attitude reduced by 12%.", "BB is less evil now.", "You fed him. He may allow affection.", "You fed him. Bare minimum, but okay.", "Hunger: solved. Attitude: still present.", "He ate. You are safe. For now."],
  compliment: ["He said 'stoppp' but clearly wants you to continue.", "BB is now unbearable.", "Compliment accepted. Ego inflated.", "He liked the compliment but will now act humble for 0.2 seconds.", "BB is pretending not to smile.", "He said 'thanks' but screamed internally."],
  meme:       ["BB laughed and immediately pretended it was not that funny.", "He sent back 'LMAO' so you know it hit.", "Mood restored by brainrot.", "He sent it to the group chat. You are his favourite.", "Meme approved. Bonus points."],
  date:       ["Date successful. BB is acting casual but internally giggling.", "He said it was 'nice' which means he loved it.", "BB is now emotionally attached. Again.", "He is acting normal but kicking his feet internally.", "He said next time you are paying. There will absolutely be a next time."],
  nap:        ["BB is asleep but somehow still dramatic.", "He said five more minutes. It has been an hour.", "Nap complete. Sass rebooted.", "He looked peaceful for three seconds then frowned in his sleep."],
  gift:       ["He said you did not have to. He is lying.", "Gift received. BB is now soft but trying to hide it.", "He is emotionally compromised.", "'You really did not have to' — he has already decided what he wants next."],
  ignore:     ["BB is fine. Just dramatically looking out the window.", "He has entered petty mode.", "You ignored him. He will now say 'nothing' when asked what is wrong.", "Attention not found. Boyfriend malfunctioning.", "BB is staring at the wall like a Victorian widow."],
  apologise:  ["Apology accepted. Barely.", "He forgives you but will remember this for comedic purposes.", "BB has stopped being dramatic. For now.", "Forgiven. He will bring it up one more time. Probably.", "Apology received. Processing… processed. Still a little bit annoyed."],
  annoy:      ["You annoyed him. He is pretending to hate it.", "BB rolled his eyes but stayed.", "He is mad, but like… romantically.", "He said 'whatever' which means he is fine.", "BB is mildly inconvenienced and loving every second of it."],
};
const PIN_RESPONSES = {
  feed:       ["Pinary accepted the food. You are safe for the next 8 minutes.", "She said 'it's okay' which means it was actually good.", "Food fixed 12% of the emotional damage.", "She is no longer starving. Still judging you though.", "Fed. Temporarily appeased. Standards have risen accordingly."],
  compliment: ["She said 'stoppp' but if you stop, there will be consequences.", "Compliment received. She is now pretending not to care.", "You called her pretty. Correct answer, but say more.", "She smiled for 0.3 seconds. Historic moment.", "She said 'whatever' but took a screenshot."],
  attention:  ["Finally. She was about to start a fake argument.", "Attention received. Crisis postponed.", "She says she doesn't need attention. She does.", "Pinary has been watered like a dramatic houseplant.", "Attention delivered. Mood stabilised by 11%."],
  meme:       ["She laughed and then immediately got sad again. Progress?", "Brainrot accepted.", "She sent 'HAHAHAHA' so you did something right.", "She saved it. That means she loves you.", "Meme received. Emotional regulation temporarily restored."],
  coffee:     ["Coffee acquired. She is now 40% less likely to cry.", "You bought coffee. Relationship saved.", "She is caffeinated and powerful. Be careful.", "Princess has received bean juice.", "Mood upgraded by caffeine. You are a genius."],
  askwhat:    ["She said 'nothing'. Run.", "She started explaining from the beginning of time.", "Wrong question. Drama increased.", "She said 'no it's fine' in a voice that means it is absolutely not fine.", "You asked. She paused. Something enormous is loading."],
  apologise:  ["Apology accepted, but archived for future reference.", "She forgives you but the screenshot remains.", "Good apology. She is still side-eyeing you.", "Emotional damage slightly repaired.", "Forgiven. Provisionally. Conditionally. With receipts."],
  annoy:      ["You annoyed her. She laughed, unfortunately.", "She is mad but also entertained.", "Pinary has entered goblin mode.", "She said 'you're so annoying' in her favourite tone of voice."],
  reassure:   ["Reassurance received. Overthinking paused.", "She believes you. For now.", "You said the right thing and she is suspicious of it.", "She is calm. Do not ruin this.", "She went quiet in a peaceful way. Rare."],
  date:       ["Date planned. She is pretending not to be excited.", "She said 'cute' which means you passed.", "Relationship points increased. Wallet may suffer.", "She is already thinking about what to wear and what to complain about.", "Date accepted. Standards have risen accordingly."],
};
const BB_IDLE = [
  "bb is fine. obviously. totally not waiting for your text.",
  "He says he is not needy. The attention bar says otherwise.",
  "BB is pretending to be busy. He is not busy.",
  "He checked his phone. Twice.",
  "BB misses you but would rather perish than say it first.",
  "Careful. He is one minor inconvenience away from being dramatic.",
  "He is writing and deleting the same text message.",
  "He claimed he did not want attention. He lied.",
];
const PIN_IDLE = [
  "I'm fine. Obviously I'm not, but continue.",
  "I require food, attention, and emotional compensation.",
  "You're lucky I'm cute.",
  "I don't want much. Just everything, perfectly, always.",
  "Feed me or face consequences.",
  "I'm not dramatic. I'm emotionally cinematic.",
  "I cried but in a hot way.",
  "I said I was fine. I am not fine. Please ask again.",
  "Currently operating at 12% emotional stability.",
  "I'm just going to need you to be better.",
];
const PIN_EVENTS = [
  { notif: "⚠️ Pinary randomly got sad.",           speech: "I have decided to be sad. Please respect my process.",                              effect: s => { s.mood -= 12; s.drama += 10; } },
  { notif: "📅 She remembered something.",           speech: "Wait. I just remembered something from three weeks ago. This is now a whole thing.", effect: s => { s.drama += 15; s.emotionalStability -= 8; } },
  { notif: "🍝 She saw food content.",               speech: "I just saw the most beautiful pasta and now I need it or I will simply expire.",     effect: s => { s.hunger -= 12; s.foodStandards += 6; } },
  { notif: "✨ She felt cute. Mood improved.",        speech: "I looked in the mirror and decided I'm iconic today. That's it.",                   effect: s => { s.mood += 14; s.love += 4; } },
  { notif: "💭 She is overthinking a text.",         speech: "Okay but what did that message actually mean. I'm fine. I'm not fine.",             effect: s => { s.emotionalStability -= 12; s.attention -= 8; s.drama += 6; } },
  { notif: "😂 Goofy mode activated.",              speech: "HAHAHA okay I'm in a good mood for no reason. Do not question it.",                 effect: s => { s.mood += 18; s.drama -= 10; } },
  { notif: "😢 She cried. She looked cute though.", speech: "I cried for 4 minutes and I looked gorgeous doing it. You're welcome.",            effect: s => { s.mood -= 8; s.love += 5; s.drama += 5; } },
  { notif: "☕ She needs coffee immediately.",      speech: "I will not be okay until I have coffee. This is not a request.",                    effect: s => { s.mood -= 10; s.hunger -= 6; } },
];

// ════════════════════════════════════════════════════════════
//  GAME STATE
// ════════════════════════════════════════════════════════════

let bbState  = {};
let pinState = {};
function clamp(v, lo = 0, hi = 100) { return Math.max(lo, Math.min(hi, Math.round(v))); }
function adjustBB(key, delta)  { bbState[key]  = clamp(bbState[key]  + delta); }
function adjustPin(key, delta) { pinState[key] = clamp(pinState[key] + delta); }

// ════════════════════════════════════════════════════════════
//  LOAD / SAVE
// ════════════════════════════════════════════════════════════

function loadState() {
  try {
    const raw = localStorage.getItem("bfSimState");
    if (!raw) { bbState = { ...BB_DEFAULT }; pinState = { ...PIN_DEFAULT }; return; }
    const saved = JSON.parse(raw);
    if (saved.love !== undefined && !saved.bb) {
      bbState  = { ...BB_DEFAULT, ...saved }; delete bbState.lastSaved;
      pinState = { ...PIN_DEFAULT };
    } else {
      bbState  = { ...BB_DEFAULT,  ...(saved.bb  || {}) };
      pinState = { ...PIN_DEFAULT, ...(saved.pin || {}) };
    }
    if (bbState.alive  === undefined)      bbState.alive        = true;
    if (bbState.deathWarning === undefined) bbState.deathWarning = 0;
    if (bbState.bbDeaths === undefined)    bbState.bbDeaths     = 0;
    if (bbState.bbZombieLevel === undefined) bbState.bbZombieLevel = 0;
    if (pinState.alive === undefined)      pinState.alive       = true;
    if (pinState.pinDeaths === undefined)  pinState.pinDeaths   = 0;
    if (pinState.pinZombieLevel === undefined) pinState.pinZombieLevel = 0;
    playerEnergy = saved.playerEnergy !== undefined ? saved.playerEnergy : 100;
    const elapsed = (Date.now() - (saved.lastSaved || Date.now())) / 1000;
    const ticks   = Math.floor(elapsed / 22);
    if (ticks > 0) {
      if (bbState.alive) {
        bbState.hunger    = clamp(bbState.hunger    - ticks * 2);
        bbState.energy    = clamp(bbState.energy    - ticks * 1.5);
        bbState.attention = clamp(bbState.attention - ticks * 2.5);
        bbState.love      = clamp(bbState.love      - ticks * 0.3);
        if (bbState.attention < 30) { bbState.mood = clamp(bbState.mood - ticks); bbState.sass = clamp(bbState.sass + ticks); }
      }
      if (pinState.alive) {
        pinState.hunger             = clamp(pinState.hunger             - ticks * 3.5);
        pinState.mood               = clamp(pinState.mood               - ticks * 2);
        pinState.attention          = clamp(pinState.attention          - ticks * 3);
        pinState.love               = clamp(pinState.love               - ticks * 0.5);
        pinState.drama              = clamp(pinState.drama              + ticks * 1.5);
        pinState.emotionalStability = clamp(pinState.emotionalStability - ticks * 1);
      }
      playerEnergy = Math.min(100, playerEnergy + ticks * 3);
    }
  } catch (e) { bbState = { ...BB_DEFAULT }; pinState = { ...PIN_DEFAULT }; }
}
function saveState() {
  localStorage.setItem("bfSimState", JSON.stringify({ bb: bbState, pin: pinState, lastSaved: Date.now(), playerEnergy }));
}

// ════════════════════════════════════════════════════════════
//  COOLDOWN SYSTEM
// ════════════════════════════════════════════════════════════

function isCoolingDown(key) { return cooldownEnds[key] && Date.now() < cooldownEnds[key]; }
function startCooldown(key) { const s = COOLDOWN_SECS[key]; if (!s) return; cooldownEnds[key] = Date.now() + s * 1000; }
function updateCooldownUI() {
  const now = Date.now();
  document.querySelectorAll("[data-cooldown-key]").forEach(btn => {
    const key   = btn.getAttribute("data-cooldown-key");
    const label = btn.getAttribute("data-label") || btn.textContent;
    const endMs = cooldownEnds[key];
    if (endMs && now < endMs) {
      btn.textContent = label + " (" + Math.ceil((endMs - now) / 1000) + "s)";
      btn.classList.add("btn-cooling"); btn.classList.remove("btn-energy-locked");
    } else {
      btn.textContent = label; btn.classList.remove("btn-cooling");
      const cost = ENERGY_COSTS[key] || 5;
      if (playerEnergy < cost) btn.classList.add("btn-energy-locked"); else btn.classList.remove("btn-energy-locked");
    }
  });
}

// ════════════════════════════════════════════════════════════
//  LOGIC HELPERS
// ════════════════════════════════════════════════════════════

function getBBLevel() { let r = BB_LEVELS[0]; for (const l of BB_LEVELS) { if (bbState.love >= l.min) r = l; } return r; }
function getPinaryLevel() { let r = PIN_LEVELS[0]; for (const l of PIN_LEVELS) { if (pinState.love >= l.min) r = l; } return r; }
function getBBMood() {
  if (!bbState.alive)          return BB_MOODS.find(m => m.id === "ghost");
  if (bbState.energy    < 20)  return BB_MOODS.find(m => m.id === "sleepy");
  if (bbState.hunger    < 20)  return BB_MOODS.find(m => m.id === "hungry");
  if (bbState.mood      < 20)  return BB_MOODS.find(m => m.id === "dramatic");
  if (bbState.sass      > 80)  return BB_MOODS.find(m => m.id === "petty");
  if (bbState.attention < 25)  return BB_MOODS.find(m => m.id === "needy");
  if (bbState.mood      < 35)  return BB_MOODS.find(m => m.id === "grumpy");
  if (bbState.love > 80 && bbState.mood > 70) return BB_MOODS.find(m => m.id === "soft");
  if (bbState.mood      > 70)  return BB_MOODS.find(m => m.id === "happy");
  if (bbState.mood      > 55)  return BB_MOODS.find(m => m.id === "unbothered");
  return BB_MOODS.find(m => m.id === "buffering");
}
function getPinaryMood() {
  if (!pinState.alive)                           return PIN_MOODS.find(m => m.id === "ghost");
  if (pinState.hunger              < 20)         return PIN_MOODS.find(m => m.id === "hungry");
  if (pinState.emotionalStability  < 15)         return PIN_MOODS.find(m => m.id === "crying");
  if (pinState.drama               > 80)         return PIN_MOODS.find(m => m.id === "dramatic");
  if (pinState.mood                < 20)         return PIN_MOODS.find(m => m.id === "dramatic");
  if (pinState.drama               > 65)         return PIN_MOODS.find(m => m.id === "sass");
  if (pinState.attention           < 25)         return PIN_MOODS.find(m => m.id === "overthinking");
  if (pinState.foodStandards       > 88)         return PIN_MOODS.find(m => m.id === "impossible");
  if (pinState.mood                < 35)         return PIN_MOODS.find(m => m.id === "judging");
  if (pinState.love > 75 && pinState.mood > 70) return PIN_MOODS.find(m => m.id === "princess");
  if (pinState.mood                > 80)         return PIN_MOODS.find(m => m.id === "goofy");
  if (pinState.mood                > 60)         return PIN_MOODS.find(m => m.id === "soft");
  if (pinState.love                > 85)         return PIN_MOODS.find(m => m.id === "redflag");
  return PIN_MOODS.find(m => m.id === "judging");
}
function getChaosLevel() {
  if (!bbState.alive && !pinState.alive) return { label: "Couples therapy DLC required", emoji: "💀" };
  if (!bbState.alive)                    return { label: "Relationship emergency",        emoji: "🚨" };
  if (!pinState.alive)                   return { label: "Ghost princess incident",       emoji: "👸" };
  const avg = (bbState.love + bbState.mood + pinState.love + pinState.mood + pinState.emotionalStability) / 5;
  if (avg >= 75) return { label: "Somehow alive",              emoji: "🌸" };
  if (avg >= 60) return { label: "Mild emotional damage",      emoji: "😅" };
  if (avg >= 45) return { label: "Someone is crying",          emoji: "😢" };
  if (avg >= 32) return { label: "Emotional damage pending",   emoji: "😬" };
  if (avg >= 18) return { label: "Full situationship weather", emoji: "⛈️"  };
  return           { label: "Couples therapy DLC required",   emoji: "💀" };
}

// ════════════════════════════════════════════════════════════
//  DEATH CHECK — BB
// ════════════════════════════════════════════════════════════

function checkBBDeath() {
  if (!bbState.alive) return;
  const atRockBottom = bbState.hunger <= 0 && bbState.energy <= 0 && bbState.mood <= 5 && bbState.attention <= 5;
  if (atRockBottom) {
    bbState.deathWarning = Math.min(3, (bbState.deathWarning || 0) + 1);
    if (bbState.deathWarning >= 3) { killBB(); return; }
  } else {
    bbState.deathWarning = Math.max(0, (bbState.deathWarning || 0) - 1);
  }
}

// ════════════════════════════════════════════════════════════
//  DEATH CHECK — PINARY
// ════════════════════════════════════════════════════════════

function checkPinaryDeath() {
  if (!pinState.alive) return;
  const zl = pinState.pinZombieLevel || 0;
  const instantChecks = [
    { cond: pinState.hunger            < 6,  cause: "hunger"    },
    { cond: pinState.mood              < 6,  cause: "mood"      },
    { cond: pinState.attention         < 6,  cause: "attention" },
    { cond: pinState.drama             > 95, cause: "drama"     },
    { cond: pinState.emotionalStability < 4, cause: "stability" },
    { cond: pinState.foodStandards     > 97, cause: "standards" },
  ];
  for (const c of instantChecks) { if (c.cond) { killPinary(pickRandom(PIN_DEATH_BY_CAUSE[c.cause]), c.cause); return; } }
  // Random chance scales with zombie level (each level adds 0.5%)
  const extraChance = Math.min(zl * 0.005, 0.15);
  const randomChecks = [
    { cond: pinState.hunger            < 20 && Math.random() < 0.18 + extraChance, cause: "hunger"    },
    { cond: pinState.mood              < 22 && Math.random() < 0.14 + extraChance, cause: "mood"      },
    { cond: pinState.drama             > 78 && Math.random() < 0.14 + extraChance, cause: "drama"     },
    { cond: pinState.attention         < 18 && Math.random() < 0.13 + extraChance, cause: "attention" },
    { cond: pinState.emotionalStability< 18 && Math.random() < 0.12 + extraChance, cause: "stability" },
    { cond: Math.random()              < 0.03 + extraChance,                        cause: "random"    },
  ];
  for (const c of randomChecks) { if (c.cond) { killPinary(pickRandom(PIN_DEATH_BY_CAUSE[c.cause] || PIN_DEATH_BY_CAUSE.random), c.cause); return; } }
}

// ════════════════════════════════════════════════════════════
//  KILL FUNCTIONS
// ════════════════════════════════════════════════════════════

function killBB(msg) {
  if (!bbState.alive) return; // guard: only count once per death
  bbState.alive        = false;
  bbState.deathWarning = 0;
  bbState.bbDeaths     = (bbState.bbDeaths || 0) + 1;
  bbState.bbZombieLevel = (bbState.bbZombieLevel || 0) + 1;
  continuousAlive.bb   = 0;
  continuousAlive.both = 0;

  const deathMsg = msg || pickRandom(BB_DEATH_MSGS);
  bbSpeak(deathMsg);
  showNotif("💀 " + deathMsg, true);

  // Milestone message
  const milestone = BB_DEATH_MILESTONES[bbState.bbDeaths];
  if (milestone) setTimeout(() => showNotif("💀 " + milestone, true), 1500);

  hideWantHint("bb"); bbWant = null;
  renderBBDeathState();
  renderDeathCounters();
  renderBBZombie();
  checkAchievements(); saveAchievements();
  render();
}

function killPinary(msg, _cause) {
  if (!pinState.alive) return; // guard: only count once per death
  pinState.alive        = false;
  pinState.pinDeaths    = (pinState.pinDeaths || 0) + 1;
  pinState.pinZombieLevel = (pinState.pinZombieLevel || 0) + 1;
  continuousAlive.pin  = 0;
  continuousAlive.both = 0;

  const deathMsg = msg || pickRandom(PIN_DEATH_BY_CAUSE.random);
  pinarySpeak(deathMsg);
  showEventPop("👸 " + deathMsg);

  // Milestone message
  const milestone = PIN_DEATH_MILESTONES[pinState.pinDeaths];
  if (milestone) setTimeout(() => showNotif("👑 " + milestone, true), 1500);

  hideWantHint("pin"); pinWant = null;
  renderPinaryDeathState();
  renderDeathCounters();
  renderPinZombie();
  checkAchievements(); saveAchievements();
  render();
}

// ════════════════════════════════════════════════════════════
//  REVIVE FUNCTIONS
// ════════════════════════════════════════════════════════════

function reviveBB() {
  if (isCoolingDown("reviveBB")) { bbSpeak(pickRandom(COOLDOWN_MSGS)); return; }
  if (!spendEnergy("reviveBB"))  { showEnergyCrisis(); return; }
  startCooldown("reviveBB");
  const zl = bbState.bbZombieLevel || 0;
  bbState.alive        = true;
  bbState.deathWarning = 0;
  // Harder to fully restore at higher zombie level
  const restoreScale = Math.max(0.5, 1 - zl * 0.04);
  bbState.hunger    = Math.round(35 * restoreScale);
  bbState.energy    = Math.round(30 * restoreScale);
  bbState.mood      = Math.round(28 * restoreScale);
  bbState.attention = Math.round(30 * restoreScale);
  bbState.sass      = Math.min(100, 55 + zl * 3); // more sassy with each death
  continuousAlive.bb = 0;
  bbSpeak(getBBReviveMsg(zl));
  showNotif("👻 Brian revived. Zombie level: " + zl);
  renderBBDeathState(); renderBBZombie(); renderDeathCounters(); render();
}

function revivePinary() {
  if (isCoolingDown("revivePinary")) { pinarySpeak(pickRandom(COOLDOWN_MSGS)); return; }
  if (!spendEnergy("revivePinary"))  { showEnergyCrisis(); return; }
  startCooldown("revivePinary");
  const zl = pinState.pinZombieLevel || 0;
  pinState.alive = true;
  // Harder to restore at higher zombie level
  const restoreScale = Math.max(0.4, 1 - zl * 0.03);
  pinState.hunger             = Math.round(40 * restoreScale);
  pinState.mood               = Math.round(28 * restoreScale);
  pinState.drama              = Math.max(pinState.drama - 20, 40 + zl);
  pinState.emotionalStability = Math.round(22 * restoreScale);
  continuousAlive.pin = 0;

  const snackCount = (achievementState.snack_tech?.progress || 0) + 1;
  if (achievementState.snack_tech) achievementState.snack_tech.progress = snackCount;
  if (snackCount >= 5) unlockAchievementById("snack_tech");

  pinarySpeak(getPinReviveMsg(zl));
  showNotif("🍕 Pinary revived. Ghost level: " + zl);
  renderPinaryDeathState(); renderPinZombie(); renderDeathCounters(); render(); saveAchievements();
}

// ════════════════════════════════════════════════════════════
//  ZOMBIE RENDER
// ════════════════════════════════════════════════════════════

const BB_ZOMBIE_CLASSES  = ["zombie-1","zombie-3","zombie-5","zombie-10"];
const PIN_ZOMBIE_CLASSES = ["zombie-1","zombie-3","zombie-5","zombie-10","zombie-25","zombie-50"];

function renderBBZombie() {
  const el = document.getElementById("bb-character");
  const label = document.getElementById("bb-zombie-label");
  if (!el) return;
  BB_ZOMBIE_CLASSES.forEach(c => el.classList.remove(c));
  const zl = bbState.bbZombieLevel || 0;
  const cls = getBBZombieClass(zl);
  if (cls) el.classList.add(cls);
  if (label) label.textContent = getBBZombieLabel(zl);
}

function renderPinZombie() {
  const el = document.getElementById("pinary-character");
  const label = document.getElementById("pin-zombie-label");
  if (!el) return;
  PIN_ZOMBIE_CLASSES.forEach(c => el.classList.remove(c));
  const zl = pinState.pinZombieLevel || 0;
  const cls = getPinZombieClass(zl);
  if (cls) el.classList.add(cls);
  if (label) label.textContent = getPinZombieLabel(zl);
}

// ════════════════════════════════════════════════════════════
//  DEATH COUNTER RENDER
// ════════════════════════════════════════════════════════════

function renderDeathCounters() {
  const bbD   = bbState.bbDeaths  || 0;
  const pinD  = pinState.pinDeaths || 0;
  const total = bbD + pinD;

  const bbVal = document.getElementById("bb-deaths-val");
  if (bbVal) {
    const tag = getBBDeathsCommentary(bbD);
    bbVal.textContent = bbD + (tag ? " — " + tag : "");
  }
  const pinVal = document.getElementById("pin-deaths-val");
  if (pinVal) {
    const tag = getPinDeathsCommentary(pinD);
    pinVal.textContent = pinD + (tag ? " — " + tag : "");
  }
  const totalEl = document.getElementById("total-casualties");
  if (totalEl) totalEl.textContent = total;
}

// ════════════════════════════════════════════════════════════
//  BB ACTION HANDLER
// ════════════════════════════════════════════════════════════

function doAction(action) {
  if (!bbState.alive) { bbSpeak(pickRandom(["He is a ghost. He cannot hear you.", "Brian is currently deceased.", "Ghost BB stares at you. Dramatically.", "He is unavailable. Until revived."])); return; }
  if (isCoolingDown(action)) { bbSpeak(pickRandom(COOLDOWN_MSGS)); return; }
  if (!spendEnergy(action))  { bbSpeak(pickRandom(ENERGY_LOW_MSGS)); showEnergyCrisis(); return; }

  const dimCount = getDimReturn(action);
  const multi    = dimMultiplier(dimCount);
  recordUsage(action); startCooldown(action); pushRecentAction(action);

  const wantResult = checkBBWant(action);
  const wantBonus  = wantResult === 1 ? 1.5 : 1.0;

  // Zombie gameplay: higher zombie level = sass builds faster
  const zl = bbState.bbZombieLevel || 0;
  const applyBB = (key, val) => {
    let v = Math.round(val * multi * wantBonus);
    if (key === "sass" && val > 0) v = Math.round(v * (1 + zl * 0.05));
    adjustBB(key, v);
  };

  const response = dimCount >= 3 ? (getDimMsg(dimCount) || pickRandom(BB_RESPONSES[action])) : pickRandom(BB_RESPONSES[action]);

  switch (action) {
    case "text":      applyBB("attention",+15); applyBB("love",+8); applyBB("sass",-5); animateBB("happy"); spawnHeart("bb-hearts"); showNotif("BB got your text."); break;
    case "feed":      applyBB("hunger",+25); applyBB("mood",+12); applyBB("sass",-8); animateBB("happy"); break;
    case "compliment":applyBB("love",+12); applyBB("mood",+15); applyBB("sass",+8); animateBB("happy"); spawnHeart("bb-hearts"); break;
    case "meme":      applyBB("mood",+15); applyBB("attention",+8); applyBB("energy",+5); animateBB("happy"); showNotif("bb sent back '💀'"); break;
    case "date":      applyBB("love",+20); applyBB("mood",+15); applyBB("energy",-20); applyBB("sass",-10); animateBB("happy"); spawnHeart("bb-hearts"); spawnHeart("bb-hearts"); setTimeout(() => spawnHeart("bb-hearts"), 300); break;
    case "nap":       applyBB("energy",+30); applyBB("attention",-12); applyBB("mood",+5); animateBB("dramatic"); break;
    case "gift":      applyBB("love",+15); applyBB("mood",+18); applyBB("sass",-10); animateBB("happy"); spawnHeart("bb-hearts"); spawnHeart("bb-hearts"); break;
    case "ignore":    adjustBB("mood",-18); adjustBB("love",-10); adjustBB("attention",-20); adjustBB("sass",+18); animateBB("dramatic"); break;
    case "apologise":
      if (bbState.mood < 50 || bbState.sass > 60) { applyBB("mood",+20); applyBB("sass",-15); applyBB("love",+5); animateBB("happy"); }
      else { bbSpeak("He raised one eyebrow. 'What are you apologising for?' He knows exactly what."); checkAchievements(); render(); return; }
      break;
    case "annoy": applyBB("sass",+15); applyBB("mood", Math.random() > 0.5 ? +8 : -8); applyBB("love", Math.random() > 0.5 ? +3 : -3); animateBB(Math.random() > 0.5 ? "dramatic" : "happy"); break;
  }

  if (dimCount >= 1 && wantResult !== 1) { const d = getDimMsg(dimCount); if (d) bbSpeak(d); else bbSpeak(response); }
  else if (wantResult !== 1) bbSpeak(response);

  checkCombos(); checkAchievements(); saveAchievements(); render();
}

// ════════════════════════════════════════════════════════════
//  PINARY ACTION HANDLER
// ════════════════════════════════════════════════════════════

function doPinaryAction(action) {
  if (!pinState.alive) { pinarySpeak(pickRandom(["She is a ghost. She cannot hear you. She is judging you though.", "Ghost Pinary stares. Unimpressed.", "She has perished. The snack came too late.", "Ghost princess mode. Try snacks."])); return; }
  const cdKey = "p" + action;
  if (isCoolingDown(cdKey)) { pinarySpeak(pickRandom(COOLDOWN_MSGS)); return; }
  if (!spendEnergy(cdKey))  { pinarySpeak(pickRandom(ENERGY_LOW_MSGS)); showEnergyCrisis(); return; }

  const dimCount = getDimReturn(cdKey);
  const multi    = dimMultiplier(dimCount);
  recordUsage(cdKey); startCooldown(cdKey); pushRecentAction(cdKey);

  const wantResult = checkPinWant(cdKey);
  const wantBonus  = wantResult === 1 ? 1.6 : (wantResult === -1 ? 0.75 : 1.0);

  const zl = pinState.pinZombieLevel || 0;
  const applyPin = (key, val) => {
    let v = Math.round(val * multi * wantBonus);
    // Zombie: mood harder to restore, drama rises more
    if (key === "mood" && val > 0)  v = Math.round(v * Math.max(0.4, 1 - zl * 0.03));
    if (key === "drama" && val > 0) v = Math.round(v * (1 + zl * 0.04));
    if (key === "emotionalStability" && val > 0) v = Math.round(v * Math.max(0.4, 1 - zl * 0.03));
    adjustPin(key, v);
  };

  const response = dimCount >= 3 ? (getDimMsg(dimCount) || pickRandom(PIN_RESPONSES[action])) : pickRandom(PIN_RESPONSES[action]);

  switch (action) {
    case "feed":      applyPin("hunger",+20); applyPin("mood",+8); applyPin("foodStandards",+4); applyPin("drama",-8); animatePin("happy"); break;
    case "compliment":applyPin("love",+8); applyPin("mood",+10); applyPin("drama", Math.random() > 0.55 ? +5 : -3); animatePin("happy"); spawnHeart("pin-hearts"); break;
    case "attention": applyPin("attention",+18); applyPin("mood",+8); applyPin("drama",-10); animatePin("happy"); break;
    case "meme":      applyPin("mood",+12); applyPin("emotionalStability",+6); animatePin("happy"); break;
    case "coffee":    applyPin("mood",+20); applyPin("drama",-14); applyPin("love",+6); animatePin("happy"); spawnHeart("pin-hearts"); showNotif("☕ Coffee delivered. Crisis averted."); break;
    case "askwhat":
      if (pinState.drama > 55 || Math.random() > 0.5) { adjustPin("drama",+12); adjustPin("emotionalStability",-8); animatePin("dramatic"); }
      else { applyPin("mood",+8); applyPin("emotionalStability",+5); animatePin("happy"); }
      break;
    case "apologise":
      if (pinState.drama > 40 || pinState.mood < 50) { applyPin("drama",-15); applyPin("love",+6); applyPin("emotionalStability",+8); animatePin("happy"); }
      else { pinarySpeak("She looked at you. 'Apologise for what, exactly?' She has a list. You do not have the list."); checkCombos(); checkAchievements(); render(); return; }
      break;
    case "annoy":     adjustPin("drama",+12); if (Math.random() > 0.45) { applyPin("mood",+8); animatePin("happy"); } else { adjustPin("mood",-8); animatePin("dramatic"); } break;
    case "reassure":  applyPin("emotionalStability",+15); applyPin("love",+8); applyPin("mood",+6); applyPin("drama",-8); applyPin("attention",+5); animatePin("happy"); spawnHeart("pin-hearts"); break;
    case "date":      applyPin("love",+12); applyPin("mood",+14); applyPin("foodStandards",+5); applyPin("drama",-5); animatePin("happy"); spawnHeart("pin-hearts"); spawnHeart("pin-hearts"); setTimeout(() => spawnHeart("pin-hearts"), 350); break;
  }

  if (dimCount >= 1 && wantResult !== 1) { const d = getDimMsg(dimCount); if (d) pinarySpeak(d); else pinarySpeak(response); }
  else if (wantResult !== 1) pinarySpeak(response);

  checkCombos(); checkAchievements(); saveAchievements(); render(); checkPinaryDeath();
}

// ════════════════════════════════════════════════════════════
//  PINARY RANDOM EVENTS
// ════════════════════════════════════════════════════════════

function triggerPinaryRandomEvent() {
  if (!pinState.alive) return;
  if (Math.random() > 0.30) return;
  const ev = pickRandom(PIN_EVENTS);
  ev.effect(pinState);
  ["love","mood","hunger","attention","drama","foodStandards","emotionalStability"].forEach(k => { pinState[k] = clamp(pinState[k]); });
  pinarySpeak(ev.speech);
  showEventPop("✨ " + ev.notif);
}

// ════════════════════════════════════════════════════════════
//  GAME TICK  — every 22 seconds
// ════════════════════════════════════════════════════════════

function gameTick() {
  if (bbState.alive) {
    const zl = bbState.bbZombieLevel || 0;
    adjustBB("hunger",    -2);
    adjustBB("energy",    -(1.5 + zl * 0.1));  // tires faster when zombified
    adjustBB("attention", -2.5);
    adjustBB("love",      -0.3);
    adjustBB("sass",      +(zl * 0.3));          // zombie sass creep
    if (bbState.attention < 30) { adjustBB("mood",-1.5); adjustBB("sass",+1.5); }
    if (bbState.hunger    < 20) { adjustBB("mood",-1); }
    checkBBDeath();
  }
  if (pinState.alive) {
    const zl = pinState.pinZombieLevel || 0;
    adjustPin("hunger",             -(3.5 + zl * 0.15));     // hungrier faster
    adjustPin("mood",               -(2.5 + zl * 0.2));      // moodier faster
    adjustPin("attention",          -3);
    adjustPin("love",               -0.5);
    adjustPin("drama",              +(1.5 + zl * 0.15));     // more drama
    adjustPin("emotionalStability", -(1 + zl * 0.1));        // harder to stay stable
    if (pinState.attention < 30) { adjustPin("emotionalStability",-2); }
    if (pinState.hunger    < 25) { adjustPin("mood",-2); adjustPin("drama",+2); }
    // Food standards creep — faster at higher zombie level
    if (Math.random() < 0.18 + zl * 0.01) { adjustPin("foodStandards", +3); }
    triggerPinaryRandomEvent();
    checkPinaryDeath();
  }
  // Regen player energy
  playerEnergy = Math.min(100, playerEnergy + 5);
  renderEnergy();
  if (bbState.alive  && Math.random() < 0.35) bbSpeak(pickRandom(BB_IDLE));
  if (pinState.alive && Math.random() < 0.30) pinarySpeak(pickRandom(PIN_IDLE));
  expireWants(); assignWants();
  checkAchievements();
  render();
}

// ════════════════════════════════════════════════════════════
//  RENDER — BB
// ════════════════════════════════════════════════════════════

function renderBB() {
  ["love","mood","energy","hunger","attention","sass"].forEach(k => {
    const fill = document.getElementById("bb-fill-" + k);
    const val  = document.getElementById("bb-val-"  + k);
    if (!fill || !val) return;
    fill.style.width = bbState[k] + "%"; val.textContent = bbState[k];
    fill.classList.toggle("danger", k === "sass" ? bbState[k] > 75 : bbState[k] < 25);
  });
  document.getElementById("bb-level-name").textContent = getBBLevel().name;
  const mood = getBBMood();
  document.getElementById("bb-mood-emoji").textContent = mood.emoji;
  document.getElementById("bb-mood-text").textContent  = mood.label;
  const bb = document.getElementById("bb-character");
  BB_MOODS.forEach(m => bb.classList.remove(m.moodClass)); bb.classList.add(mood.moodClass);
  bb.classList.toggle("blush-active", !!mood.blush);
  const mouth = document.getElementById("bb-mouth"); if (mouth) mouth.className = mood.mouthClass;
  // Death warning banner
  const warnBanner = document.getElementById("bb-death-warning");
  const warnText   = document.getElementById("bb-death-warning-text");
  if (warnBanner && warnText) {
    const level = bbState.deathWarning || 0;
    if (!bbState.alive || level === 0) { warnBanner.classList.add("hidden"); }
    else { warnBanner.classList.remove("hidden"); warnBanner.className = "death-warning-banner warn-" + level; warnText.textContent = "⚠️ " + BB_DEATH_WARNING_MSGS[level - 1]; }
  }
  renderBBAliveChip(); renderBBDeathState(); renderBBWarnings(); renderBBZombie(); renderDeathCounters();
}

function renderBBDeathState() {
  const panel = document.getElementById("bb-panel"), char = document.getElementById("bb-character");
  const ghost = document.getElementById("bb-ghost"), reviveBtn = document.getElementById("bb-revive-btn");
  const speech = document.getElementById("bb-speech");
  const dead = !bbState.alive;
  if (panel) panel.classList.toggle("panel-dead", dead);
  if (char)  char.classList.toggle("is-dead", dead);
  if (ghost) ghost.classList.toggle("hidden", !dead);
  if (reviveBtn) reviveBtn.classList.toggle("hidden", !dead);
  if (speech) speech.classList.toggle("death-bubble", dead);
  document.querySelectorAll(".bb-action-btn").forEach(btn => { btn.disabled = dead; });
}
function renderBBAliveChip() {
  const chip = document.getElementById("bb-alive-chip"); if (!chip) return;
  chip.className = "alive-chip";
  if (!bbState.alive) { chip.classList.add("chip-dead"); chip.textContent = "💀 Brian: Pixel Ghost"; }
  else {
    const w = bbState.deathWarning || 0;
    if (w === 0) { chip.classList.add("chip-alive");  chip.textContent = "💚 Brian: Alive"; }
    if (w === 1) { chip.classList.add("chip-warn-1"); chip.textContent = "💛 Brian: Struggling"; }
    if (w === 2) { chip.classList.add("chip-warn-2"); chip.textContent = "🟠 Brian: Critical"; }
    if (w === 3) { chip.classList.add("chip-warn-3"); chip.textContent = "🔴 Brian: Send help"; }
  }
}
function renderBBWarnings() {
  if (!bbState.alive) { const box = document.getElementById("bb-warning"); if (box) box.classList.add("hidden"); return; }
  const w = [];
  if (bbState.hunger    < 25) w.push("BB is hungry and about to become everyone's problem.");
  if (bbState.attention < 25) w.push("BB says he does not need attention. This is false.");
  if (bbState.energy    < 25) w.push("BB is tired and one blink away from becoming useless.");
  if (bbState.mood      < 25) w.push("BB is in dramatic silence mode.");
  if (bbState.love      < 25) w.push("BB is acting cold. Someone fix this man.");
  if (bbState.sass      > 75) w.push("Sass levels are dangerous. Proceed carefully.");
  const box = document.getElementById("bb-warning"), txt = document.getElementById("bb-warning-text");
  if (!box || !txt) return;
  if (w.length) { box.classList.remove("hidden"); txt.textContent = w[0]; } else { box.classList.add("hidden"); }
}

// ════════════════════════════════════════════════════════════
//  RENDER — PINARY
// ════════════════════════════════════════════════════════════

function renderPinary() {
  const map = { love:"love", mood:"mood", hunger:"hunger", attention:"attention", drama:"drama", foodStandards:"standards", emotionalStability:"stability" };
  Object.entries(map).forEach(([key, id]) => {
    const fill = document.getElementById("pin-fill-" + id), val = document.getElementById("pin-val-" + id);
    if (!fill || !val) return;
    fill.style.width = pinState[key] + "%"; val.textContent = pinState[key];
    fill.classList.toggle("danger", (key === "drama" || key === "foodStandards") ? pinState[key] > 75 : pinState[key] < 25);
  });
  document.getElementById("pin-level-name").textContent = getPinaryLevel().name;
  const mood = getPinaryMood();
  document.getElementById("pin-mood-emoji").textContent = mood.emoji;
  document.getElementById("pin-mood-text").textContent  = mood.label;
  const pin = document.getElementById("pinary-character");
  PIN_MOODS.forEach(m => pin.classList.remove(m.moodClass)); pin.classList.add(mood.moodClass);
  pin.classList.toggle("blush-active", !!mood.blush); pin.classList.toggle("p-crying", !!mood.crying);
  const mouth = document.getElementById("p-mouth"); if (mouth) mouth.className = mood.mouthClass;
  renderPinaryAliveChip(); renderPinaryDeathState(); renderPinaryWarnings(); renderPinZombie(); renderDeathCounters();
}
function renderPinaryDeathState() {
  const panel = document.getElementById("pin-panel"), char = document.getElementById("pinary-character");
  const ghost = document.getElementById("pin-ghost"), reviveBtn = document.getElementById("pin-revive-btn");
  const speech = document.getElementById("pin-speech");
  const dead = !pinState.alive;
  if (panel) panel.classList.toggle("panel-dead", dead);
  if (char)  char.classList.toggle("is-dead", dead);
  if (ghost) ghost.classList.toggle("hidden", !dead);
  if (reviveBtn) reviveBtn.classList.toggle("hidden", !dead);
  if (speech) speech.classList.toggle("death-bubble", dead);
  document.querySelectorAll(".pin-action-btn").forEach(btn => { btn.disabled = dead; });
}
function renderPinaryAliveChip() {
  const chip = document.getElementById("pin-alive-chip"); if (!chip) return;
  chip.className = "alive-chip";
  if (!pinState.alive) { chip.classList.add("chip-dead"); chip.textContent = "👸 Pinary: Ghost Princess"; }
  else { chip.classList.add("chip-alive"); chip.textContent = "💚 Pinary: Alive"; }
}
function renderPinaryWarnings() {
  if (!pinState.alive) { const box = document.getElementById("pin-warning"); if (box) box.classList.add("hidden"); return; }
  const w = [];
  if (pinState.hunger             < 25) w.push("Pinary is hungry. This is now a public safety issue.");
  if (pinState.mood               < 25) w.push("She is one inconvenience away from crying.");
  if (pinState.attention          < 25) w.push("She says she's fine. She has been quiet for 12 minutes.");
  if (pinState.drama              > 75) w.push("Drama levels critical. Approach with snacks.");
  if (pinState.emotionalStability < 25) w.push("Overthinking has entered the chat.");
  if (pinState.foodStandards      > 88) w.push("She now requires restaurant-quality emotional support.");
  const box = document.getElementById("pin-warning"), txt = document.getElementById("pin-warning-text");
  if (!box || !txt) return;
  if (w.length) { box.classList.remove("hidden"); txt.textContent = w[0]; } else { box.classList.add("hidden"); }
}

// ════════════════════════════════════════════════════════════
//  RENDER — CHAOS + MASTER
// ════════════════════════════════════════════════════════════

function renderChaos() {
  const chaos = getChaosLevel();
  const emo = document.getElementById("chaos-emoji"), txt = document.getElementById("chaos-text");
  if (emo) emo.textContent = chaos.emoji; if (txt) txt.textContent = chaos.label;
}
function render() { renderBB(); renderPinary(); renderChaos(); saveState(); }

// ════════════════════════════════════════════════════════════
//  UI HELPERS
// ════════════════════════════════════════════════════════════

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function bbSpeak(text) {
  const el = document.getElementById("bb-speech-text"), bubble = document.getElementById("bb-speech");
  if (!el || !bubble) return;
  el.textContent = text; bubble.classList.remove("new-message"); void bubble.offsetWidth; bubble.classList.add("new-message");
}
function pinarySpeak(text) {
  const el = document.getElementById("pin-speech-text"), bubble = document.getElementById("pin-speech");
  if (!el || !bubble) return;
  el.textContent = text; bubble.classList.remove("new-message"); void bubble.offsetWidth; bubble.classList.add("new-message");
}
function spawnHeart(containerId) {
  const c = document.getElementById(containerId); if (!c) return;
  const h = document.createElement("div");
  h.className = "floating-heart"; h.textContent = pickRandom(["💕","💖","💗","💓","💞","❤️"]);
  h.style.left = (10 + Math.random() * 80) + "px"; h.style.bottom = "10px";
  c.appendChild(h); setTimeout(() => h.remove(), 1500);
}
function animateBB(type) {
  const bb = document.getElementById("bb-character"); if (!bb || !bbState.alive) return;
  bb.classList.remove("is-dramatic","is-happy"); void bb.offsetWidth;
  if (type === "dramatic") bb.classList.add("is-dramatic");
  if (type === "happy")    bb.classList.add("is-happy");
  setTimeout(() => bb.classList.remove("is-dramatic","is-happy"), 600);
}
function animatePin(type) {
  const pin = document.getElementById("pinary-character"); if (!pin || !pinState.alive) return;
  pin.classList.remove("p-is-dramatic","p-is-happy"); void pin.offsetWidth;
  if (type === "dramatic") pin.classList.add("p-is-dramatic");
  if (type === "happy")    pin.classList.add("p-is-happy");
  setTimeout(() => pin.classList.remove("p-is-dramatic","p-is-happy"), 600);
}
let _notifTimer = null;
function showNotif(text, isDeath = false) {
  const existing = document.querySelector(".notif-pop"); if (existing) existing.remove();
  if (_notifTimer) clearTimeout(_notifTimer);
  const el = document.createElement("div");
  el.className = isDeath ? "notif-pop death-notif" : "notif-pop"; el.textContent = isDeath ? text : "📱 " + text;
  document.body.appendChild(el); _notifTimer = setTimeout(() => el.remove(), 2800);
}
let _eventTimer = null;
function showEventPop(text) {
  const existing = document.querySelector(".event-pop"); if (existing) existing.remove();
  if (_eventTimer) clearTimeout(_eventTimer);
  const el = document.createElement("div"); el.className = "event-pop"; el.textContent = text;
  document.body.appendChild(el); _eventTimer = setTimeout(() => el.remove(), 3400);
}

// ════════════════════════════════════════════════════════════
//  RESET
// ════════════════════════════════════════════════════════════

function resetGame() {
  const confirmed = confirm("Are you sure? This will erase all emotional damage, snacks, ghost incidents, death counts, and zombie evolution.");
  if (!confirmed) return;
  bbState      = { ...BB_DEFAULT };
  pinState     = { ...PIN_DEFAULT };
  cooldownEnds = {}; actionUsage = {};
  playerEnergy = 100;
  bbWant = null; pinWant = null; bbWantExp = 0; pinWantExp = 0;
  recentActions = []; triggeredCombos.clear();
  continuousAlive = { bb: 0, pin: 0, both: 0 };
  hideWantHint("bb"); hideWantHint("pin");
  bbSpeak("Fresh start. BB is acting unbothered. He is, in fact, very bothered.");
  pinarySpeak("Reset? Fine. I'm starting fresh. I have already found three things to be annoyed about.");
  renderBBDeathState(); renderPinaryDeathState();
  renderBBZombie(); renderPinZombie(); renderDeathCounters();
  renderEnergy(); renderAchievements();
  render(); showNotif("Relationship universe reset. Zombie evolution cleared.");
}

// ════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════

function init() {
  loadState(); loadAchievements();
  renderBBDeathState(); renderPinaryDeathState();
  renderBBZombie(); renderPinZombie(); renderDeathCounters();
  renderEnergy(); renderAchievements(); render();

  bbSpeak(pickRandom(["bb is fine. obviously. totally not waiting for your text.", "oh. you came back. cool. whatever.", "He was not waiting. He was just… near the phone.", "BB has entered the chat. Act normal."]));
  pinarySpeak(pickRandom(["I'm fine. Obviously I'm not, but continue.", "You're here. I have several thoughts and zero of them are small.", "Oh good, you showed up. I have been fine without you. Mostly.", "I require your full attention and a snack. In that order."]));

  setInterval(gameTick, 22000);
  setInterval(updateCooldownUI, 1000);
  setInterval(() => {
    if (bbState.alive)  { continuousAlive.bb++;   } else { continuousAlive.bb  = 0; }
    if (pinState.alive) { continuousAlive.pin++;  } else { continuousAlive.pin = 0; }
    continuousAlive.both = (bbState.alive && pinState.alive) ? continuousAlive.both + 1 : 0;
    checkAchievements();
  }, 1000);
  setTimeout(() => { if (bbState.alive || pinState.alive) assignWants(); }, 30000);
  setInterval(() => { expireWants(); assignWants(); }, 60000);
  setInterval(() => { if (bbState.alive  && Math.random() < 0.55) bbSpeak(pickRandom(BB_IDLE)); }, 42000);
  setInterval(() => { if (pinState.alive && Math.random() < 0.55) pinarySpeak(pickRandom(PIN_IDLE)); }, 36000);
}

document.addEventListener("DOMContentLoaded", init);
