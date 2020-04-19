import 'phaser';
import Scene = Phaser.Scene;
import Globals from "../../globals";

export default class PictureButton extends Phaser.GameObjects.Container {
  // private button: Phaser.GameObjects.Image;
  private button: Phaser.GameObjects.Sprite;
  // private button: Phaser.Physics.Matter.Sprite;
  private text?: Phaser.GameObjects.Text;

  private key1: string;
  private key2: string;
  private callback?: Function;

  isPressed = false;

  constructor(scene: Scene, x: number, y: number, key1: string, key2: string, callback?: any, text?: string,) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.key1 = key1;
    this.key2 = key2;
    this.callback = callback;

    this.button = this.scene.add.sprite(0, 0, key1)
      .setInteractive()
      .setOrigin(0, 0)
      .setDepth(5000)


    this.add(this.button);

    if (text) {
      this.text = this.scene.add.text(0, 0, text, {fontSize: '26px', fill: '#fff'});
      Phaser.Display.Align.In.Center(this.text, this.button);
      this.add(this.text);
    }

    // CF. https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/
    this.button.on('pointerup', () => {
      this.buttonClick()
    });

    // this.button.on('touchstart', () => {
    //   this.button.setTexture(key2);
    // });

    this.button.on('pointerdown', () => {
      this.button.setTexture(key2);
      this.isPressed = true;
    });

    this.button.on('pointerout', () => {
      console.info("Pointer out")
    });


    //  A sprite, doesn't scroll with the camera (is fixed to camera)
    this.setScrollFactor(0)
    this.button.setScrollFactor(0)

    this.scene.add.existing(this);
  }

  buttonClick() {
    console.info("Button click")
    // FIXME Globals.playClick(this.scene)
    this.scene.time.delayedCall(100, () => {
      this.button.setTexture(this.key1)
      this.isPressed = false;
      if (this.callback) {
        this.callback();
      }
    })
  }
}
