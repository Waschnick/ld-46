import * as Phaser from "phaser";
import {BitmapFonts, ImageAssets, TileImageSetKeys, TileJsonMaps} from "../assets/assets";
import PictureButton from "../assets/objects/PictureButton";
import SpriteCharacter, {createSpriteCharacter, SpriteCharacters} from "../assets/objects/SpriteCharacter";
import {GameScene, GameStatus} from "../GameStatus";
import Globals, {CharacterValues} from "../globals";
import Tilemap = Phaser.Tilemaps.Tilemap;
import Tileset = Phaser.Tilemaps.Tileset;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import Graphics = Phaser.GameObjects.Graphics;
import Text = Phaser.GameObjects.Text;
import {Typewriter, TypewriterOptions} from "../assets/objects/Typewriter";

export class Home extends Phaser.Scene {

  private gameStatus: GameStatus = new GameStatus(this)

  height: number = Globals.gameHeight;
  width: number = Globals.gameWidth;
  statusBarHeight: number = 240;
  statusBarYOffset: number = this.height - this.statusBarHeight;

  typewriter!: Typewriter

  statusText!: Text
  moneyCount!: Text
  healthStatus!: StatusElement
  socialStatus!: StatusElement
  selfcareStatus!: StatusElement
  funStatus!: StatusElement


  create() {

    if (IS_PROD) {
      this.time.addEvent({delay: 10_000, loop: true, callback: () => Globals.increaseDay()});
    } else {
      this.time.addEvent({delay: 1_000, loop: true, callback: () => Globals.increaseDay()});
    }
    Globals.fadeOutTitleMusic(this)
    Globals.onIncreaseDay(this.updateDay.bind(this));

    let map: Tilemap = this.make.tilemap({key: TileJsonMaps.MAP1});
    let tileset: Tileset = map.addTilesetImage(TileImageSetKeys.DESERT);
    let layer: StaticTilemapLayer = map.createStaticLayer(0, tileset, 0, 0).setScale(2);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


    // let frameView = this.add.graphics({fillStyle: {color: 0xff00ff}, x: 0, y: 0}).setScale(3).setAlpha(0.7);
    // let girl1: SpriteCharacter = createSpriteCharacter(SpriteCharacters.IngaChild, this)
    // girl1.setPosition(0, 90)
    // frameView.fillRect(girl1.frame.cutX, girl1.frame.cutY, 32, 32);

    this.createStatusBar()
    this.writeIntroText()
  }

  writeIntroText() {
    let typewriter = new Typewriter(this, {
      x: 10,
      y: 100,
      time: 70,
      fontFamily: BitmapFonts.DESYREL,
      fontSize: 36,
      maxWidth: Globals.gameWidth - 20,
    } as TypewriterOptions)
    typewriter.writeAndClear("Inga is 6 years old, lifes in the basement and her pocket money is 20$ per week.", () => {
      typewriter.writeAndClear("Try to keep her alive.         ")
    })
  }

  createStatusBar() {
    let statusBox = this.add.graphics();
    statusBox.fillStyle(0x222222, 1);
    statusBox.fillRect(0, this.statusBarYOffset, this.width, this.statusBarHeight);

    this.statusText = this.make.text({
      x: 10,
      y: (this.statusBarYOffset) + 10,
      text: 'Inga Ducks',
      style: {
        font: '14px monospace',
        fill: '#ffffff'
      }
    });

    this.moneyCount = this.make.text({
      x: Globals.gameWidth - 50,
      y: (this.statusBarYOffset) + 10,
      text: Globals.characterValues.money + "$",
      style: {
        textAlign: "right",
        font: '14px monospace',
        fill: '#ffffff'
      }
    });
    this.healthStatus = new StatusElement(this, "Health:", 50)
    this.socialStatus = new StatusElement(this, "Social:", 75)
    this.selfcareStatus = new StatusElement(this, "Selfcare:", 100)
    this.funStatus = new StatusElement(this, "Fun:", 125)


    let menuButton1 = new PictureButton(this, 10, this.height - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, () => this.gameStatus.switchScene(GameScene.SHOP), 'Shop');
    let menuButton2 = new PictureButton(this, this.width - 10 - 140, this.height - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, () => this.gameStatus.switchScene(GameScene.CITY), 'City');

  }


  updateDay() {
    let charVals = Globals.characterValues;

    this.statusText.setText(`Inga Dix: ${charVals.year} years, ${charVals.week} weeks, ${charVals.day} day`)
    this.moneyCount.setText(charVals.money + "$")
    this.healthStatus.setFill(charVals[CharacterValues.HEALTH])
    this.socialStatus.setFill(charVals[CharacterValues.HEALTH])
    this.selfcareStatus.setFill(charVals[CharacterValues.HEALTH])
    this.funStatus.setFill(charVals[CharacterValues.HEALTH])

  }

}

class StatusElement {

  progressBox!: Graphics;
  progressBar!: Graphics;
  statusText!: Phaser.GameObjects.Text;
  labelText: string;
  yOffset: number;
  scene: Home;

  constructor(scene: Home, labelText: string, yOffset: number) {
    this.progressBox = scene.add.graphics();
    this.progressBar = scene.add.graphics();
    this.labelText = labelText;
    this.yOffset = yOffset;
    this.scene = scene;

    this.statusText = this.createStatusBar(this.labelText, yOffset)

    this.progressBox.fillStyle(0x222222, 0.8);
    // this.progressBox.fillRect(90, this.scene.statusBarYOffset + this.yOffset, (Globals.gameWidth - 80), 20);
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

    this.progressBar.fillRect(90, this.scene.statusBarYOffset + this.yOffset, (Globals.gameWidth - 100) * (percent / 100) + 1, 16);
  }

  private createStatusBar(text: string, offset: number): Phaser.GameObjects.Text {
    return this.scene.make.text({
      x: 10,
      y: (Globals.gameHeight - 240) + offset,
      text: text,
      style: {
        font: '14px monospace',
        fill: '#ffffff'
      }
    });
  }
}
