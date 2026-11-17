const canvas = document.querySelector("#snow-globe");
const context = canvas.getContext("2d");
const shakeButton = document.querySelector("#shake-button");
const motionButton = document.querySelector("#motion-button");
const motionLabel = document.querySelector("#motion-label");
const status = document.querySelector("#status");
const installButton = document.querySelector("#install-button");

const width = 500;
const height = 560;
const globe = { x: 250, y: 244, radius: 195 };
const flakes = [];
const flakeCount = 100;
let lastFrame = 0;
let motionEnabled = false;
let previousMotion = null;
let installPrompt = null;

function random(min, max) {
  return min + Math.random() * (max - min);
}

function addFlake() {
  const angle = random(0, Math.PI * 2);
  const distance = Math.sqrt(Math.random()) * (globe.radius - 12);
  flakes.push({
    x: globe.x + Math.cos(angle) * distance,
    y: globe.y + Math.sin(angle) * distance,
    radius: random(1.1, 3.1),
    speed: random(0.35, 1.15),
    drift: random(-0.2, 0.2),
    alpha: random(0.38, 0.95),
    vx: 0,
    vy: 0,
  });
}

for (let index = 0; index < flakeCount; index += 1) addFlake();

function drawBackground() {
  const sky = context.createRadialGradient(246, 190, 12, 250, 245, 204);
  sky.addColorStop(0, "#e5f1ee");
  sky.addColorStop(0.74, "#c8deda");
  sky.addColorStop(1, "#aecac6");

  context.save();
  context.beginPath();
  context.arc(globe.x, globe.y, globe.radius, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = sky;
  context.fillRect(45, 39, 410, 410);

  const glow = context.createRadialGradient(168, 130, 2, 168, 130, 190);
  glow.addColorStop(0, "rgba(255,255,255,.52)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = glow;
  context.fillRect(55, 50, 390, 385);

  drawHills();
  drawCabin();
  drawTree(151, 320, 0.84);
  drawTree(352, 319, 0.98);
  drawTree(385, 340, 0.69);
  context.restore();

  context.save();
  context.strokeStyle = "rgba(255,255,255,.65)";
  context.lineWidth = 2;
  context.beginPath();
  context.arc(globe.x, globe.y, globe.radius - 1, 0.8, 2.28);
  context.stroke();
  context.strokeStyle = "rgba(255,255,255,.22)";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(globe.x, globe.y, globe.radius - 1, 4.14, 5.85);
  context.stroke();
  context.restore();

  drawBase();
}

function drawHills() {
  context.fillStyle = "#f4f4ec";
  context.beginPath();
  context.moveTo(48, 340);
  context.quadraticCurveTo(130, 287, 209, 328);
  context.quadraticCurveTo(306, 373, 452, 303);
  context.lineTo(452, 445);
  context.lineTo(48, 445);
  context.closePath();
  context.fill();

  context.fillStyle = "#e7eee6";
  context.beginPath();
  context.moveTo(48, 366);
  context.quadraticCurveTo(136, 324, 218, 365);
  context.quadraticCurveTo(329, 412, 452, 342);
  context.lineTo(452, 445);
  context.lineTo(48, 445);
  context.closePath();
  context.fill();

  context.fillStyle = "rgba(255,255,255,.78)";
  context.beginPath();
  context.ellipse(250, 397, 168, 30, 0, Math.PI, Math.PI * 2);
  context.fill();
}

function drawCabin() {
  context.save();
  context.translate(250, 313);

  context.fillStyle = "rgba(93,117,105,.14)";
  context.beginPath();
  context.ellipse(0, 67, 63, 12, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#d9b795";
  context.fillRect(-39, 20, 78, 42);
  context.fillStyle = "#c79c77";
  context.beginPath();
  context.moveTo(-48, 23);
  context.lineTo(0, -13);
  context.lineTo(48, 23);
  context.closePath();
  context.fill();

  context.fillStyle = "#92765f";
  context.beginPath();
  context.moveTo(-42, 20);
  context.lineTo(0, -16);
  context.lineTo(42, 20);
  context.lineTo(36, 24);
  context.lineTo(0, -5);
  context.lineTo(-36, 24);
  context.closePath();
  context.fill();

  context.fillStyle = "#78887c";
  context.fillRect(22, -9, 10, 23);
  context.fillStyle = "rgba(255,255,255,.85)";
  context.fillRect(23, -10, 9, 3);

  context.fillStyle = "#f4ead2";
  context.fillRect(-28, 29, 13, 13);
  context.fillRect(16, 29, 13, 13);
  context.fillStyle = "#d0ae7d";
  context.fillRect(-26, 31, 9, 9);
  context.fillRect(18, 31, 9, 9);
  context.strokeStyle = "rgba(104,109,91,.38)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(-21.5, 31);
  context.lineTo(-21.5, 40);
  context.moveTo(-26, 35.5);
  context.lineTo(-17, 35.5);
  context.moveTo(22.5, 31);
  context.lineTo(22.5, 40);
  context.moveTo(18, 35.5);
  context.lineTo(27, 35.5);
  context.stroke();

  context.fillStyle = "#8b715a";
  context.fillRect(-6, 39, 14, 23);
  context.fillStyle = "#d6bb92";
  context.beginPath();
  context.arc(4, 51, 1.2, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#f7f5eb";
  context.beginPath();
  context.moveTo(-43, 21);
  context.lineTo(-34, 24);
  context.lineTo(-22, 16);
  context.lineTo(-12, 22);
  context.lineTo(0, 13);
  context.lineTo(14, 23);
  context.lineTo(24, 16);
  context.lineTo(42, 23);
  context.lineTo(37, 28);
  context.lineTo(0, 20);
  context.lineTo(-35, 29);
  context.closePath();
  context.fill();
  context.restore();
}

function drawTree(x, y, scale) {
  context.save();
  context.translate(x, y);
  context.scale(scale, scale);
  context.fillStyle = "#667e70";
  context.fillRect(-3, 26, 6, 13);
  context.fillStyle = "#537365";
  for (let tier = 0; tier < 3; tier += 1) {
    const top = tier * 15;
    context.beginPath();
    context.moveTo(0, top - 13);
    context.lineTo(-15 + tier * 3, top + 8);
    context.quadraticCurveTo(0, top + 14, 15 - tier * 3, top + 8);
    context.closePath();
    context.fill();
  }
  context.fillStyle = "rgba(250,250,242,.85)";
  context.beginPath();
  context.moveTo(0, -13);
  context.lineTo(-5, -4);
  context.quadraticCurveTo(0, -1, 5, -4);
  context.closePath();
  context.fill();
  context.restore();
}

function drawBase() {
  const base = context.createLinearGradient(0, 424, 0, 520);
  base.addColorStop(0, "#b89472");
  base.addColorStop(0.18, "#987658");
  base.addColorStop(0.52, "#795c45");
  base.addColorStop(1, "#66503e");

  context.fillStyle = "rgba(73,60,48,.12)";
  context.beginPath();
  context.ellipse(250, 498, 153, 20, 0, 0, Math.PI * 2);
  context.fill();

  context.beginPath();
  context.moveTo(93, 423);
  context.quadraticCurveTo(250, 438, 407, 423);
  context.lineTo(392, 472);
  context.quadraticCurveTo(250, 493, 108, 472);
  context.closePath();
  context.fillStyle = base;
  context.fill();

  context.beginPath();
  context.moveTo(108, 461);
  context.quadraticCurveTo(250, 480, 392, 461);
  context.lineTo(384, 490);
  context.quadraticCurveTo(250, 510, 116, 490);
  context.closePath();
  context.fillStyle = "#806247";
  context.fill();

  context.strokeStyle = "rgba(255,241,218,.36)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(107, 461);
  context.quadraticCurveTo(250, 480, 393, 461);
  context.stroke();

  context.fillStyle = "#e6d2b1";
  context.font = "500 9px Georgia, serif";
  context.textAlign = "center";
  context.letterSpacing = "2px";
  context.fillText("STILL WINTER", 250, 480);
}

function drawFlakes(delta) {
  const step = Math.min(delta, 32) / 16.67;
  context.save();
  context.beginPath();
  context.arc(globe.x, globe.y, globe.radius - 5, 0, Math.PI * 2);
  context.clip();

  for (const flake of flakes) {
    flake.vy += 0.012 * step;
    flake.vx *= 0.986;
    flake.vy *= 0.986;
    flake.x += (flake.vx + flake.drift) * step;
    flake.y += (flake.vy + flake.speed) * step;

    const dx = flake.x - globe.x;
    const dy = flake.y - globe.y;
    if (dx * dx + dy * dy > (globe.radius - 9) ** 2 || flake.y > 408) {
      flake.x = globe.x + random(-globe.radius * 0.82, globe.radius * 0.82);
      flake.y = random(globe.y - globe.radius * 0.88, globe.y - globe.radius * 0.38);
      flake.vx = 0;
      flake.vy = 0;
    }

    context.globalAlpha = flake.alpha;
    context.fillStyle = "#fffefa";
    context.beginPath();
    context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
}

function draw(timestamp = 0) {
  const delta = lastFrame ? timestamp - lastFrame : 16.67;
  lastFrame = timestamp;
  context.clearRect(0, 0, width, height);
  drawBackground();
  drawFlakes(delta);
  requestAnimationFrame(draw);
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function swirl(x = 0, y = 0, strength = 9) {
  for (const flake of flakes) {
    const dx = flake.x - globe.x;
    const dy = flake.y - globe.y;
    const distance = Math.max(50, Math.hypot(dx, dy));
    const direction = Math.sign(x || random(-1, 1));
    flake.vx += (-x * 0.42 + (-dy / distance) * random(1.5, 4.5)) * strength * 0.12;
    flake.vy += (Math.abs(y) * 0.2 + random(-1, 1)) * strength * 0.12;
    flake.vx += direction * random(-0.7, 0.7);
  }
  canvas.classList.remove("is-shaking");
  void canvas.offsetWidth;
  canvas.classList.add("is-shaking");
  window.setTimeout(() => canvas.classList.remove("is-shaking"), 500);
}

function manualShake() {
  swirl(random(-1, 1), -1, 11);
  status.textContent = "There it goes — a little flurry.";
}

async function lockPortrait() {
  if (!screen.orientation || typeof screen.orientation.lock !== "function") return;
  try {
    await screen.orientation.lock("portrait");
  } catch {
    // The PWA manifest also requests portrait; some browsers only allow locking in fullscreen.
  }
}

function onDeviceMotion(event) {
  const acceleration = event.acceleration;
  const gravity = event.accelerationIncludingGravity;
  let x;
  let y;

  if (acceleration && acceleration.x !== null && acceleration.y !== null) {
    x = acceleration.x;
    y = acceleration.y;
  } else if (gravity && gravity.x !== null && gravity.y !== null) {
    if (previousMotion) {
      x = gravity.x - previousMotion.x;
      y = gravity.y - previousMotion.y;
    }
    previousMotion = { x: gravity.x, y: gravity.y };
  }

  if (x === undefined || y === undefined) return;
  const force = Math.hypot(x, y);
  if (force > 8) {
    swirl(x / force, y / force, Math.min(force, 24));
    status.textContent = "A little flurry, just for you.";
  }
}

async function enableMotion() {
  if (typeof DeviceMotionEvent === "undefined") {
    status.textContent = "Shake sensing isn’t available here. Try a tap instead.";
    return;
  }

  if (typeof DeviceMotionEvent.requestPermission === "function") {
    try {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission !== "granted") {
        status.textContent = "Motion access wasn’t granted. You can still tap to shake.";
        return;
      }
    } catch (error) {
      status.textContent = "Motion access couldn’t be enabled. You can still tap to shake.";
      console.error("Could not request motion permission:", error);
      return;
    }
  }

  if (!motionEnabled) {
    window.addEventListener("devicemotion", onDeviceMotion);
    motionEnabled = true;
  }

  await lockPortrait();
  motionButton.classList.add("is-enabled");
  motionLabel.textContent = "Shake-to-snow is on";
  status.textContent = "Now give your phone a gentle shake.";
}

shakeButton.addEventListener("click", manualShake);
motionButton.addEventListener("click", enableMotion);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installButton.hidden = true;
  status.textContent = "Your little winter is ready whenever you are.";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("Could not register the offline experience:", error);
    });
  });
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
requestAnimationFrame(draw);