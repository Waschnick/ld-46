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

export class City extends Phaser.Scene {
  init() {
    console.log("Initializing City");
    // Phaser.CANVAS.setSmoothingEnabled(this.game.context, false);
  }

  create() {
    let menuButton1 = new PictureButton(this, 10, Globals.gameHeight - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, 'Home', () => this.switchToHome());

    let menuButton2 = new PictureButton(this, Globals.gameWidth - 10 - 140, Globals.gameHeight - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, 'Shop', () => this.switchToShop());

  }

  private switchToHome() {
    this.cameras.main.fadeOut(300);
    this.time.delayedCall(500, () => this.scene.switch('game'))
  }

  private switchToShop() {
    this.cameras.main.fadeOut(300);
    this.time.delayedCall(500, () => this.scene.switch('shop'))
  }

}
