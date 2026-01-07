export class WizardTower {
  nb = 0;

  constructor(nb) {
    this.nb = nb;
  }

  price() {
    return 1000 + (this.nb * 300);
  }

  render() {
    return `
      <div class="shop-item">
        <span>Tour Sorcier</span>
        <button id="buy-wizard-tower">Acheter : ${this.price()} 🍪</button>
      </div>
    `;
  }
}