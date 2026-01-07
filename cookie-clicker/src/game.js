import { ClickableArea } from "./scripts/clickable-area";
import { Shop } from "./scripts/shop";
import { RandomSpawn } from "./scripts/random-spawn";
import CursorIconIMG from "./assets/cursor.png"; 
import "./styles/game.css";

export class Game {
  cookies = 0;
  passiveGain = 0;
  nbCursors = 0;
  nbCharmanders = 0;
  nbWizardTowers = 0;

  gameElement = null;
  scoreElement = null;
  cursorDisplayElement = null;
  clickableArea = null;
  shop = null;
  randomSpawner = null;

  constructor(config) {
    const savedConfig = this.load();
    const finalConfig = savedConfig || config;

    this.cookies = finalConfig.cookies || 0;
    this.passiveGain = finalConfig.passiveGain || 0;
    this.nbCursors = finalConfig.nbCursors || 0;
    this.nbCharmanders = finalConfig.nbCharmanders || 0;
    this.nbWizardTowers = finalConfig.nbWizardTowers || 0;

    this.gameElement = document.querySelector("#game");

    this.clickableArea = new ClickableArea(this.gameElement, this.onClickableAreaClick);

    this.shop = new Shop(this.gameElement, {
      nbCursors: this.nbCursors,
      nbCharmanders: this.nbCharmanders,
      nbWizardTowers: this.nbWizardTowers
    }, (price, gain, type) => {
      return this.handlePurchase(price, gain, type);
    });

    this.randomSpawner = new RandomSpawn(this);
  }

  save() {
    const gameConfig = {
      cookies: this.cookies,
      passiveGain: this.passiveGain,
      nbCursors: this.nbCursors,
      nbCharmanders: this.nbCharmanders,
      nbWizardTowers: this.nbWizardTowers
    };
    localStorage.setItem("cookie_save", JSON.stringify(gameConfig));
  }

  load() {
    const savedData = localStorage.getItem("cookie_save");
    return savedData ? JSON.parse(savedData) : null;
  }

  handlePurchase(price, gainPerSecond, type) {
    if (this.cookies >= price) {
      this.cookies -= price;
      this.passiveGain += gainPerSecond;
      this[type] += 1;
      this.updateScore();
      if (type === "nbCursors") this.renderCursors();
      this.save();
      return true;
    }
    return false;
  }

  start() {
    this.render();
    setInterval(() => {
      if (this.passiveGain > 0) {
        this.cookies += this.passiveGain;
        this.updateScore();
      }
    }, 1000);
    setInterval(() => this.save(), 10000);
    setInterval(() => {
      if (Math.random() < 0.3) this.randomSpawner.spawn();
    }, 15000);
  }

  render() {
    this.renderScore();
    this.clickableArea.render();
    this.shop.render();
    this.cursorDisplayElement = document.createElement("div");
    this.cursorDisplayElement.id = "cursor-display";
    document.querySelector("#game-clickable-area").appendChild(this.cursorDisplayElement);
    this.renderCursors();
  }

  renderCursors() {
    if (!this.cursorDisplayElement) return;
    this.cursorDisplayElement.innerHTML = "";
    const maxVisible = 20;
    const toDisplay = Math.min(this.nbCursors, maxVisible);
    const radius = 160;
    for (let i = 0; i < toDisplay; i++) {
      const img = document.createElement("img");
      img.src = CursorIconIMG;
      img.classList.add("mini-cursor");
      const angle = (i / toDisplay) * (Math.PI * 2);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      img.style.transform = `translate(${x}px, ${y}px) rotate(${angle - Math.PI / 2}rad)`;
      this.cursorDisplayElement.appendChild(img);
    }
  }

  renderScore() {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  updateScore() {
    const roundedCookies = Math.floor(this.cookies * 10) / 10;
    const roundedGain = Math.floor(this.passiveGain * 10) / 10;
    this.scoreElement.innerHTML = `
        <div class="score-container">
            <span class="cookie-count">${roundedCookies} cookies</span>
            <span class="passive-gain">Gain passif: ${roundedGain}/s</span>
        </div>
    `;
  }

  onClickableAreaClick = () => {
    this.cookies += 1;
    window.requestAnimationFrame(() => this.updateScore());
  };
}