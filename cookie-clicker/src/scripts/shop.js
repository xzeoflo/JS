import { Cursor } from "./cursor.js";
import { Charmander } from "./charmander.js";
import { WizardTower } from "./wizard-tower.js";

export class Shop {
  gameElement = null;
  cursor = null;
  charmander = null;
  wizardTower = null;
  onPurchase = null;
  shopElement = null;

  constructor(gameElement, config, onPurchase) {
    this.gameElement = gameElement;
    this.cursor = new Cursor(config.nbCursors);
    this.charmander = new Charmander(config.nbCharmanders);
    this.wizardTower = new WizardTower(config.nbWizardTowers);
    this.onPurchase = onPurchase;
  }

  render() {
    this.shopElement = document.createElement("section");
    this.shopElement.id = "game-shop";
    this.updateShopHTML();

    this.shopElement.addEventListener("click", (event) => {
      if (event.target.id === "buy-cursor") {
        if (this.onPurchase(this.cursor.price(), 0.1, "nbCursors")) {
          this.cursor.nbcursor += 1;
        }
      } else if (event.target.id === "buy-charmander") {
        if (this.onPurchase(this.charmander.price(), 1, "nbCharmanders")) {
          this.charmander.nb += 1;
        }
      } else if (event.target.id === "buy-wizard-tower") {
        if (this.onPurchase(this.wizardTower.price(), 10, "nbWizardTowers")) {
          this.wizardTower.nb += 1;
        }
      }
      this.updateShopHTML();
    });

    this.gameElement.append(this.shopElement);
  }

  updateShopHTML() {
    this.shopElement.innerHTML = `
        <h2>Boutique</h2>
        ${this.cursor.render()}
        ${this.charmander.render()}
        ${this.wizardTower.render()}
    `;
  }
}