import * as Phaser from "phaser";
import {ImageAssets} from "../assets/assets";
import Globals from "../globals";
import PictureButton from "../assets/objects/PictureButton";
import {GameScene, GameStatus} from "../GameStatus";

export class Shop extends Phaser.Scene {

  private gameStatus: GameStatus = new GameStatus(this)

  init() {
    this.gameStatus = new GameStatus(this)
  }

  create() {

    let menuButton1 = new PictureButton(this, 10, Globals.gameHeight - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, () => this.gameStatus.switchScene(GameScene.HOME), 'Home');

    let menuButton2 = new PictureButton(this, Globals.gameWidth - 10 - 140, Globals.gameHeight - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, () => this.gameStatus.switchScene(GameScene.CITY), 'City');

  }


}
