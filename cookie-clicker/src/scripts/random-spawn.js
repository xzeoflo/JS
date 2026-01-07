import GoldenCookieIMG from "../assets/golden-cookie.png";

export class RandomSpawn {
  constructor(gameInstance) {
    this.game = gameInstance;
  }

  spawn() {
    const goldenCookie = document.createElement("img");
    goldenCookie.src = GoldenCookieIMG;
    goldenCookie.classList.add("golden-cookie");

    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    goldenCookie.style.left = `${x}px`;
    goldenCookie.style.top = `${y}px`;

    goldenCookie.addEventListener("click", () => {
      const maxGain = Math.max(1, this.game.passiveGain * 1000);
      const gain = Math.floor(Math.random() * maxGain) + 1;
      
      this.game.cookies += gain;
      this.game.updateScore();
      
      goldenCookie.remove(); 
      console.log(`Bénéfice doré ! +${gain} cookies`);
    });

    document.body.appendChild(goldenCookie);

    setTimeout(() => {
      if (goldenCookie.parentElement) {
        goldenCookie.classList.add("fade-out");
        setTimeout(() => goldenCookie.remove(), 500); 
      }
    }, 5000);
  }
}