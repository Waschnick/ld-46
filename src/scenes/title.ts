import * as Phaser from "phaser";
import {AudioAssets, pngAssets, PngImages, sounds} from "../assets/assets";

export class Title extends Phaser.Scene {

  init() {
    console.log("Title");
  }

  preload() {
    // SIZE = 336x240
    console.log("Title preload");


  }

  create() {
    console.log("Title create");


    if (IS_PROD) {
      this.sound.volume = 0.0
      this.sound.play(AudioAssets.TITLE_SONG)
      this.tweens.add({targets: this.sound, volume: 1.0, duration: 4000, delay: 200});

      this.showDucksLogo()
    } else {
      this.showGameTitle()
    }
  }

  private showDucksLogo(): void {

    this.time.delayedCall(2000, () => this.sound.play(AudioAssets.DUCKS_QUAK_SOUND))

    let ducksLogoImage = this.add.image((window.innerWidth / 2), 200, PngImages.DUCKS_LOGO)

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
    let image = this.add.image(0, 0, PngImages.TITLE_IMAGE)
      .setOrigin(0, 0)
      .setDisplaySize(window.innerWidth, window.innerHeight)
    this.cameras.main.fadeIn(800);

    this.addGameButton()
  }

  private addGameButton(): void {
    let gameButton = this.add.sprite(100, 200, PngImages.BLUE_BUTTON_02).setInteractive();
    this.centerButton(gameButton, 1);

    let gameText = this.add.text(0, 0, 'Play', {fontSize: '32px', fill: '#fff'});
    this.centerButtonText(gameText, gameButton);

    gameButton.on('pointerup', (pointer: any) => {
      this.time.delayedCall(300, () => {
        this.cameras.main.fadeOut(500);
        this.time.delayedCall(700, () => this.scene.start('game'))
      })


    })

    this.input.on('pointerover', (event: any, gameObjects: any) => {
      gameObjects[0].setTexture(PngImages.BLUE_BUTTON_03);
    });
    this.input.on('touchstart', (event: any, gameObjects: any) => {
      gameObjects[0].setTexture(PngImages.BLUE_BUTTON_03);
    });
    this.input.on('pointerout', function (event: any, gameObjects: any) {
      gameObjects[0].setTexture(PngImages.BLUE_BUTTON_02);
    });
  }

  private centerButton(gameObject: any, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(window.innerWidth / 2, window.innerHeight / 2 - offset * 100, window.innerWidth, window.innerHeight)
    );
  }

  private centerButtonText(gameText: any, gameButton: any) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
}
