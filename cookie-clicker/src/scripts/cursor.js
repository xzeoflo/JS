export class Cursor {
  nbcursor = 0;

  constructor(nbcursor) {
    this.nbcursor = nbcursor;
  }

  price() {
    return 10 + (this.nbcursor * 3);
  }

  render() {
    return `
      <div class="cursor-item">
        <span>Curseur</span>
        <button id="buy-cursor">Acheter : ${this.price()} 🍪</button>
      </div>
    `;
  }
}