import { Cursor } from "./cursor.js";

export class Shop {
  gameElement = null;
  cursor = null;
    

  constructor(gameElement, cursor) {
    this.gameElement = gameElement;
    this.cursor = new Cursor(cursor);
  }

  render() {
    // On crée un nouvel élément du DOM.
    this.shopElement = document.createElement("section");
    this.shopElement.id = "game-shop";
    // On modifie son HTML.
    this.shopElement.innerHTML = `
        <h2>Shop</h2>
        <div class="shop-item">
        ${this.cursor.render()}
        </div>
    `;

    this.shopElement.addEventListener("click", (event) => {
      if (event.target.id === "buy-cursor") {
        console.log(this.gameElement.cookies, this.cursor.price());
        if (this.gameElement.cookies < this.cursor.price()) {
            alert("Not enough cookies!");  
        } else {
            alert("Cursor bought!");
            this.cursor.nbcursor += 1;
        }
      }
    // Il faut ajouter l'élément au DOM pour pouvoir le voir
  });

    this.gameElement.append(this.shopElement);
  }
}