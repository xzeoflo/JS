export class Cursor {
  nbcursor = null;

  constructor(nbcursor) {
    this.nbcursor = nbcursor;
  }

  price() {
    return 10+(this.nbcursor * 3);
  }

  render() {
    return `
          <span>Cursor</span>
          <button id="buy-cursor">Buy for ${this.price()} cookies</button>
      `;
  }

  
}