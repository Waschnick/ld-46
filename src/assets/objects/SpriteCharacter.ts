import Scene = Phaser.Scene;
import 'phaser';
import {Sprites} from "../assets";

export const enum CharacterFacing {
  FACING_DOWN = "FACING_DOWN",
  FACING_LEFT = "FACING_LEFT",
  FACING_UP = "FACING_UP",
  FACING_RIGHT = "FACING_RIGHT",
}

export default class SpriteCharacter {

  scene: any;
  animations: any;
  sprite: any;

  constructor(scene: Scene, sprite: Sprites, x: number, y: number) {
    this.scene = scene;


    this.sprite = this.scene.add.sprite(x, y, sprite, 0)
      .setScale(3)
      .setOrigin(0, 0)

    this.animations = {
      [CharacterFacing.FACING_DOWN]: this.createAnim(sprite, CharacterFacing.FACING_DOWN, [0, 4, 8]),
      [CharacterFacing.FACING_LEFT]: this.createAnim(sprite, CharacterFacing.FACING_LEFT, [1, 5, 9]),
      [CharacterFacing.FACING_UP]: this.createAnim(sprite, CharacterFacing.FACING_RIGHT, [2, 6, 10]),
      [CharacterFacing.FACING_RIGHT]: this.createAnim(sprite, CharacterFacing.FACING_UP, [3, 7, 11]),
    }
  }


  face(facing: CharacterFacing): this {
    if (facing === CharacterFacing.FACING_DOWN) {
      this.sprite.setFrame(0)
    } else if (facing === CharacterFacing.FACING_LEFT) {
      this.sprite.setFrame(1)
    } else if (facing === CharacterFacing.FACING_UP) {
      this.sprite.setFrame(2)
    } else if (facing === CharacterFacing.FACING_RIGHT) {
      this.sprite.setFrame(3)
    }
    return this;
  }


  walk(facing: CharacterFacing): this {
    console.info("Walk", facing)
    this.sprite.anims.play(facing);
    return this;
  }

  setPosition(x: number, y: number): this {
    this.sprite.setPosition(x, y)
    return this;
  }

  private createAnim(sprite: Sprites, keyName: CharacterFacing, frames: number[]): Animation {
    console.info("createAnim", keyName, frames)
    return this.scene.anims.create({
      key: keyName,
      frames: this.scene.anims.generateFrameNumbers(sprite, {frames}),
      // The frame rate of playback in frames per second
      frameRate: 4,
      // How long the animation should play for in milliseconds. If not given its derived from frameRate.
      // duration: null
      // Should the animation yoyo? (reverse back down to the start) before repeating?
      yoyo: false,
      repeat: -1
    });
  }

}

