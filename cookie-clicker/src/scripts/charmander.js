export class Charmander {
  nb = 0;

  constructor(nb) {
    this.nb = nb;
  }

  price() {
    return 100 + (this.nb * 30);
  }

  render() {
    return `
      <div class="shop-item">
        <span>Salamèche</span>
        <button id="buy-charmander">Acheter : ${this.price()} 🍪</button>
      </div>
    `;
  }
}