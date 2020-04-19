import * as Phaser from "phaser";
import {AudioAssets, ImageAssets} from "../assets/assets";
import Globals from "../globals";
import GameObject = Phaser.GameObjects.GameObject;
import PictureButton from "../assets/objects/PictureButton";
import {GameScene, GameStatus} from "../GameStatus";

export class Title extends Phaser.Scene {

  private gameObjects: Array<GameObject> = []
  private gameStatus : GameStatus  = new GameStatus(this)

  //   this.gameStatus = new GameStatus(this)
  // }

  create() {
    Globals.playTitleMusic(this)
    this.showDucksLogo()
  }

  private showDucksLogo(): void {

    this.time.delayedCall(2000, () => this.sound.play(AudioAssets.DUCKS_QUAK_SOUND))

    let ducksLogoImage = this.add.image((Globals.gameWidth / 2), 200, ImageAssets.DUCKS_LOGO)

    this.cameras.main.once('camerafadeincomplete', (camera: any) => {
      this.time.delayedCall(1000, () => {
        this.cameras.main.once('camerafadeoutcomplete', (camera: any) => {
          ducksLogoImage.destroy()
          this.showGameTitle()
        }, []);
        camera.fadeOut(1500)
      }, [], this);
    });

    this.cameras.main.fadeIn(2000);
  }

  private showGameTitle(): void {
    console.info("Show game title")

    // Set fullscreen
    let image = this.add.image(0, 0, ImageAssets.TITLE_IMAGE)
      .setOrigin(0, 0)
      .setDisplaySize(Globals.gameWidth, Globals.gameHeight)
    this.cameras.main.fadeIn(800);

    this.addGameButton()
    this.writeGameText()
  }

  private addGameButton(): void {
    let gameButton = new PictureButton(this, 100, Globals.gameHeight - 70, ImageAssets.BLUE_BUTTON_1, ImageAssets.BLUE_BUTTON_2, "Play", () => this.playButtonClick())
    this.gameObjects.push(gameButton);
  }

  private playButtonClick() {
    this.time.delayedCall(300, () => {
      this.gameObjects.forEach(it => it.destroy())
      this.gameStatus.startScene(GameScene.HOME)
    })
  }


  private writeGameText(): void {
    var text1 = this.make.text({
      x: Globals.gameWidth / 2,
      y: Globals.gameHeight - 220,
      text: '0%',
      style: {
        font: '42px monospace',
        "font-weight": '28pxbold',
        fill: '#ffffff'
      }
    })
      .setOrigin(0.5, 0.5)
      .setText("Inga Ducks")

    var text2 = this.make.text({
      x: Globals.gameWidth / 2,
      y: Globals.gameHeight - 160,
      text: '0%',
      style: {
        font: '24px monospace',
        fill: '#ffffff'
      }
    })
      .setOrigin(0.5, 0.5)
      .setText("Keep her alive")

    var text3 = this.make.text({
      x: Globals.gameWidth / 2,
      y: Globals.gameHeight - 135,
      text: '0%',
      style: {
        font: '16px monospace',
        fill: '#ffffff'
      }
    })
      .setOrigin(0.5, 0.5)
      .setText("(at least until she turns 40)")


    this.gameObjects.push(text1, text2, text3);
  }

  private centerButton(gameObject: any, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(Globals.gameWidth, Globals.gameHeight / 2 + (offset), window.innerWidth, window.innerHeight)
    );
  }

  private centerButtonText(gameText: any, gameButton: any) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
}
