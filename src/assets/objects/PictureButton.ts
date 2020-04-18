import 'phaser';
import Scene = Phaser.Scene;
import Globals from "../../globals";

export default class PictureButton extends Phaser.GameObjects.Container {
  private button: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Scene, x: number, y: number, key1: string, key2: string, text: string, callback: any) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive().setOrigin(0, 0);
    this.text = this.scene.add.text(0, 0, text, {fontSize: '26px', fill: '#fff'});
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);


    this.button.on('pointerup', () => {
      callback()
    });

    // this.button.on('touchstart', () => {
    //   this.button.setTexture(key2);
    // });

    this.button.on('pointerdown', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      Globals.playClick(this.scene)
      this.scene.time.delayedCall(100, () => {
        this.button.setTexture(key1)
      })
    });

    this.scene.add.existing(this);
  }
}
