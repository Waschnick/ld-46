import * as Phaser from "phaser";
import Assets, {TileImageSetKeys, TileJsonMaps} from "../assets/assets";
import Tilemap = Phaser.Tilemaps.Tilemap;
import Tileset = Phaser.Tilemaps.Tileset;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import Globals from "../globals";
import Scene = Phaser.Scene;

export class Game extends Phaser.Scene {
  init() {
    console.log("Initializing game");
  }

  height: number = Globals.gameHeight;
  width: number = Globals.gameWidth;
  statusBarHeight: number = 240;
  statusBarYOffset: number = this.height - this.statusBarHeight;

  create() {
    let map: Tilemap = this.make.tilemap({key: TileJsonMaps.MAP1});
    let tileset: Tileset = map.addTilesetImage(TileImageSetKeys.DESERT);
    let layer: StaticTilemapLayer = map.createStaticLayer(0, tileset, 0, 0);


    let statusBox = this.add.graphics();
    statusBox.fillStyle(0x222222, 1);
    statusBox.fillRect(0, this.statusBarYOffset, this.width, this.statusBarHeight);

    let loadingText = this.make.text({
      x: 10,
      y: (this.statusBarYOffset) + 10,
      text: 'Inga Ducks, Level 1 (Child)',
      style: {
        font: '14px monospace',
        fill: '#ffffff'
      }
    });

    let health = this.createStatusBar("Health:", 50)
    let healthStatus = new StatusElement(this, 50)
    healthStatus.setFill(23)

    let social = this.createStatusBar("Social:", 75)
    let socialStatus = new StatusElement(this, 75)
    socialStatus.setFill(0)

    let fun = this.createStatusBar("Fun:", 100)
    let funStatus = new StatusElement(this, 100)
    funStatus.setFill(100)

  }


  private createStatusBar(text: string, offset: number) {
    return this.make.text({
      x: 10,
      y: (this.statusBarYOffset) + offset,
      text: text,
      style: {
        font: '14px monospace',
        fill: '#ffffff'
      }
    });
  }
}

class StatusElement {

  progressBox: any;
  progressBar: any;
  yOffset: number;
  scene: Game;

  constructor(scene: Game, yOffset: number) {
    this.progressBox = scene.add.graphics();
    this.progressBar = scene.add.graphics();
    this.yOffset = yOffset;
    this.scene = scene;

    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(70, this.scene.statusBarYOffset + this.yOffset, (window.innerWidth - 80), 20);
  }

  setFill(percent: number) {
    this.progressBar.clear();
    // progressBar.fillRect(250, 280, 300 * value, 30);
    if (percent > 60) {
      this.progressBar.fillStyle(0x0B6623, 0.9);
    } else if (percent > 25) {
      this.progressBar.fillStyle(0xffD300, 0.9);
    } else {
      this.progressBar.fillStyle(0xff0000, 0.9);
    }

    this.progressBar.fillRect(70, this.scene.statusBarYOffset + this.yOffset + 2, (window.innerWidth - 80) * (percent / 100) + 1, 16);

  }
}
