import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface Position {
  x: number;
  y: number;
}

interface Wall {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Coin {
  x: number;
  y: number;
  collected: boolean;
}

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  // État du jeu
  playerPosition: Position = { x: 10, y: 10 };
  score: number = 0;
  lives: number = 3;
  coinsCollected: boolean[] = [false, false, false];
  gameMessage: string = '';
  currentLevel: number = 1;
  wallsChanged: boolean = false;

  private isBrowser: boolean;

  // Configurations des murs - MÊMES DIMENSIONS, positions différentes seulement
  private wallConfigurations = [
    // Niveau 1 - Configuration originale
    [
      { x: 30, y: 50, width: 80, height: 10 },
      { x: 100, y: 100, width: 10, height: 60 },
      { x: 50, y: 150, width: 60, height: 10 },
      { x: 150, y: 80, width: 10, height: 40 }
    ],
    // Niveau 2 - Mêmes dimensions, positions décalées
    [
      { x: 20, y: 40, width: 80, height: 10 },
      { x: 110, y: 90, width: 10, height: 60 },
      { x: 40, y: 140, width: 60, height: 10 },
      { x: 140, y: 70, width: 10, height: 40 }
    ],
    // Niveau 3 - Mêmes dimensions, nouvelles positions
    [
      { x: 10, y: 60, width: 80, height: 10 },
      { x: 120, y: 110, width: 10, height: 60 },
      { x: 30, y: 130, width: 60, height: 10 },
      { x: 130, y: 90, width: 10, height: 40 }
    ],
    // Niveau 4 - Mêmes dimensions
    [
      { x: 40, y: 30, width: 80, height: 10 },
      { x: 90, y: 120, width: 10, height: 60 },
      { x: 60, y: 160, width: 60, height: 10 },
      { x: 160, y: 100, width: 10, height: 40 }
    ],
    // Niveau 5 - Mêmes dimensions
    [
      { x: 20, y: 70, width: 80, height: 10 },
      { x: 130, y: 80, width: 10, height: 60 },
      { x: 70, y: 140, width: 60, height: 10 },
      { x: 150, y: 60, width: 10, height: 40 }
    ]
  ];

  // Murs actuels
  walls: Wall[] = [];

  private readonly coins: Coin[] = [
    { x: 160, y: 30, collected: false },
    { x: 40, y: 120, collected: false },
    { x: 120, y: 180, collected: false }
  ];

  private readonly exit: Position = { x: 140, y: 140 };

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initializeGame();
    }
  }

  private initializeGame() {
    this.playerPosition = { x: 10, y: 10 };
    this.score = 0;
    this.lives = 3;
    this.currentLevel = 1;
    this.wallsChanged = false;
    this.coinsCollected = [false, false, false];
    this.walls = [...this.wallConfigurations[0]];
    this.gameMessage = 'Utilisez B pour changer les murs !';

    // Reset coins
    this.coins.forEach(coin => coin.collected = false);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isBrowser) return;

    switch(event.key) {
      case 'ArrowUp':
        this.movePlayer(0, -10);
        break;
      case 'ArrowDown':
        this.movePlayer(0, 10);
        break;
      case 'ArrowLeft':
        this.movePlayer(-10, 0);
        break;
      case 'ArrowRight':
        this.movePlayer(10, 0);
        break;
      case 'b':
      case 'B':
        this.changeWalls();
        break;
      case 'r':
      case 'R':
        this.restartGame();
        break;
    }
  }

  move(direction: string) {
    if (!this.isBrowser) return;

    switch(direction) {
      case 'up': this.movePlayer(0, -10); break;
      case 'down': this.movePlayer(0, 10); break;
      case 'left': this.movePlayer(-10, 0); break;
      case 'right': this.movePlayer(10, 0); break;
    }
  }

  changeWalls() {
    if (!this.isBrowser) return;

    if (this.currentLevel < this.wallConfigurations.length) {
      this.currentLevel++;
    } else {
      this.currentLevel = 1; // Retour au niveau 1
    }

    this.walls = [...this.wallConfigurations[this.currentLevel - 1]];
    this.wallsChanged = true;

    this.gameMessage = `Niveau ${this.currentLevel} - Nouvelle configuration !`;

    setTimeout(() => {
      this.wallsChanged = false;
      this.clearMessage();
    }, 2000);
  }

  private movePlayer(deltaX: number, deltaY: number) {
    if (!this.isBrowser) return;

    const newX = this.playerPosition.x + deltaX;
    const newY = this.playerPosition.y + deltaY;

    // Vérifier les collisions avec les murs
    if (this.checkCollision(newX, newY)) {
      this.gameMessage = 'Oups ! Mur !';
      setTimeout(() => this.clearMessage(), 1000);
      return;
    }

    // Vérifier les limites
    if (newX >= 0 && newX <= 170 && newY >= 0 && newY <= 170) {
      this.playerPosition.x = newX;
      this.playerPosition.y = newY;

      this.checkCoinCollection();
      this.checkExitReached();
    } else {
      this.gameMessage = 'Restez dans la zone !';
      setTimeout(() => this.clearMessage(), 1000);
    }
  }

  private checkCollision(x: number, y: number): boolean {
    return this.walls.some(wall =>
      x < wall.x + wall.width &&
      x + 20 > wall.x &&
      y < wall.y + wall.height &&
      y + 20 > wall.y
    );
  }

  private checkCoinCollection() {
    if (!this.isBrowser) return;

    this.coins.forEach((coin, index) => {
      if (!coin.collected &&
        this.playerPosition.x < coin.x + 12 &&
        this.playerPosition.x + 20 > coin.x &&
        this.playerPosition.y < coin.y + 12 &&
        this.playerPosition.y + 20 > coin.y) {

        coin.collected = true;
        this.coinsCollected[index] = true;
        this.score += 100;

        this.gameMessage = `+100 points ! Pièce ${index + 1} collectée !`;
        setTimeout(() => this.clearMessage(), 1500);
      }
    });
  }

  private checkExitReached() {
    if (!this.isBrowser) return;

    if (this.playerPosition.x >= this.exit.x &&
      this.playerPosition.x <= this.exit.x + 30 &&
      this.playerPosition.y >= this.exit.y &&
      this.playerPosition.y <= this.exit.y + 30) {

      const allCoinsCollected = this.coinsCollected.every(collected => collected);

      if (allCoinsCollected) {
        this.victory();
      } else {
        const remainingCoins = this.coinsCollected.filter(c => !c).length;
        this.gameMessage = `Encore ${remainingCoins} pièce(s) à collecter !`;
        setTimeout(() => this.clearMessage(), 2000);
      }
    }
  }

  private victory() {
    if (!this.isBrowser) return;

    this.score += 500;
    this.gameMessage = '🎉 Félicitations ! Victoire ! 🎉';

    setTimeout(() => {
      this.gameMessage = 'Retour à l\'accueil...';
      setTimeout(() => this.goHome(), 2000);
    }, 2000);
  }

  private clearMessage() {
    if (!this.isBrowser) return;

    if (!this.gameMessage.includes('Victoire') && !this.gameMessage.includes('accueil')) {
      this.gameMessage = '';
    }
  }

  getHearts(): string {
    return '❤️'.repeat(this.lives);
  }

  // Méthodes publiques
  restartGame() {
    if (!this.isBrowser) return;
    this.initializeGame();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
