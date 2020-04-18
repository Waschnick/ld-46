import * as Phaser from "phaser";
import Assets, {ImageAssets, Sprites, TileImageSetKeys, TileJsonMaps} from "../assets/assets";
import Tilemap = Phaser.Tilemaps.Tilemap;
import Tileset = Phaser.Tilemaps.Tileset;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import Globals from "../globals";
import Scene = Phaser.Scene;
import PictureButton from "../assets/objects/PictureButton";
import SpriteCharacter, {CharacterFacing} from "../assets/objects/SpriteCharacter";
import CreateSpriteCharacters, {SpriteCharacters} from "../assets/objects/SpriteCharacterGenerator";

export class Game extends Phaser.Scene {
  init() {
    console.log("Initializing game");
    // Phaser.CANVAS.setSmoothingEnabled(this.game.context, false);
  }

  height: number = Globals.gameHeight;
  width: number = Globals.gameWidth;
  statusBarHeight: number = 240;
  statusBarYOffset: number = this.height - this.statusBarHeight;

  create() {
    // this.cameras.main.setZoom(2)
    Globals.fadeOutTitleMusic(this)

    let map: Tilemap = this.make.tilemap({key: TileJsonMaps.MAP1});
    let tileset: Tileset = map.addTilesetImage(TileImageSetKeys.DESERT);
    let layer: StaticTilemapLayer = map.createStaticLayer(0, tileset, 0, 0);
    layer.setScale(2)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

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

    let menuButton1 = new PictureButton(this, 10, this.height - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, 'Shop', () => this.switchToShop());

    let menuButton2 = new PictureButton(this, this.width - 10 - 140, this.height - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, 'City', () => this.switchToCity());


    let frameView = this.add.graphics({fillStyle: {color: 0xff00ff}, x: 0, y: 0}).setScale(3).setAlpha(0.7);
    let girl1: SpriteCharacter = CreateSpriteCharacters.createSpriteCharacter(SpriteCharacters.IngaChild, this)
    // girl1.setPosition(0, 90)

    frameView.fillRect(girl1.sprite.frame.cutX, girl1.sprite.frame.cutY, 32, 32);
  }

  private switchToShop() {
    this.cameras.main.fadeOut(300);
    this.time.delayedCall(500, () => this.scene.switch('shop'))
  }

  private switchToCity() {
    this.cameras.main.fadeOut(300);
    this.time.delayedCall(500, () => this.scene.switch('city'))
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
    this.progressBox.fillRect(70, this.scene.statusBarYOffset + this.yOffset, (Globals.gameWidth - 80), 20);
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

    this.progressBar.fillRect(70, this.scene.statusBarYOffset + this.yOffset + 2, (Globals.gameWidth- 80) * (percent / 100) + 1, 16);

  }
}
