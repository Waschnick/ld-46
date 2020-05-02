import Scene = Phaser.Scene;
import 'phaser';
import {Sprites} from "../assets";

export const enum CharacterFacing {
  FACING_DOWN = "FACING_DOWN",
  FACING_LEFT = "FACING_LEFT",
  FACING_UP = "FACING_UP",
  FACING_RIGHT = "FACING_RIGHT",
}

export const enum SpriteCharacters {
  IngaChild = "FACING_DOWN"
}

export function createSpriteCharacter(spriteCharacters: SpriteCharacters, scene: Scene): SpriteCharacter {
  if (spriteCharacters === SpriteCharacters.IngaChild) {
    let char = new SpriteCharacter(scene, Sprites.INGA_CHILD, 0, 0)

    return char;
  }
  throw new Error("Unknonw CHARACTER " + spriteCharacters)
}

// export default class SpriteCharacter extends Phaser.GameObjects.Sprite {
export default class SpriteCharacter extends Phaser.Physics.Matter.Sprite {

  animations: any;
  facing: CharacterFacing = CharacterFacing.FACING_DOWN
  isMoving: Boolean = false
  scene: Scene

  constructor(scene: Scene, sprite: Sprites, x: number, y: number) {
    super(scene.matter.world, x, y, sprite, 0)

    this.setOnCollide(() => console.info("COllide"))
    // this.setFrictionAir(0.0005)
    // this.setBounce(.1)
    // this.setMass(64)
    this.setRectangle(10, 20, {
      onCollideCallback: () => console.info("coll"),
      position: {x: 20, y: 20}
    })

    // this.setInteractive()
    this.scene = scene
    this.setScale(3)
    // this.body.scale = 3
    // this.setOrigin(0, 0)

    this.setOriginFromFrame()

    this.animations = {
      [CharacterFacing.FACING_DOWN]: this.createAnim(sprite, CharacterFacing.FACING_DOWN, [0, 4, 8]),
      [CharacterFacing.FACING_LEFT]: this.createAnim(sprite, CharacterFacing.FACING_LEFT, [1, 5, 9]),
      [CharacterFacing.FACING_UP]: this.createAnim(sprite, CharacterFacing.FACING_UP, [2, 6, 10]),
      [CharacterFacing.FACING_RIGHT]: this.createAnim(sprite, CharacterFacing.FACING_RIGHT, [3, 7, 11]),
    }

    // this.scene.matter.world.add.existing(this);
    scene.add.existing(this)
    // scene
  }


  face(facing: CharacterFacing): this {
    let nextFrame = this.getFacingFrame(facing)
    this.setFrame(nextFrame)

    // if (nextFrame !==  this.frame.name) {
    //   console.info("SET FRAME", this.frame.name, facing, nextFrame)
    // }
    return this;
  }

  private getFacingFrame(facing: CharacterFacing): number {
    if (facing === CharacterFacing.FACING_DOWN) {
      return 0;
    } else if (facing === CharacterFacing.FACING_LEFT) {
      return 1;
    } else if (facing === CharacterFacing.FACING_UP) {
      return 2;
    } else if (facing === CharacterFacing.FACING_RIGHT) {
      return 3;
    }
    throw new Error("Unknown facing direction " + facing)
  }

  walk(facing: CharacterFacing): this {
    // console.info("Walk", facing)
    this.anims.play(facing);
    this.anims.setYoyo(true)
    this.anims.setRepeat(-1)
    this.facing = facing;
    return this;
  }

  alignToFacing() {
    this.isMoving = false
    this.scene.time.delayedCall(100, () => {
      this.anims.stop()
      this.face(this.facing)
    })

  }

  moveX(value: number) {
    if (value > 0) {
      this.facing = CharacterFacing.FACING_RIGHT;
    } else {
      this.facing = CharacterFacing.FACING_LEFT;
    }
    this.x += value
    // this.setVelocityX(value)

    this.moveInFacing()
  }

  private moveInFacing() {
    // console.info("Ismoving", this.isMoving, this.anims.getCurrentKey(), this.facing)
    // this.setVelocity(1, 1)
    this.setAwake()

    let isNotCurrentAnimation = this.anims.getCurrentKey() !== this.facing

    if (isNotCurrentAnimation || !this.isMoving || !this.anims.isPlaying) {
      this.anims.play(this.facing, true);
      this.isMoving = true
    }
  }


  moveY(value: number) {
    if (value > 0) {
      this.facing = CharacterFacing.FACING_DOWN;
    } else {
      this.facing = CharacterFacing.FACING_UP;
    }
    this.y += value
    // this.setVelocityY(value)

    this.moveInFacing()
  }

  // setPosition(x: number, y: number): this {
  //   this.setPosition(x, y)
  //   return this;
  // }

  private createAnim(sprite: Sprites, keyName: CharacterFacing, frames: number[]): Phaser.Animations.Animation | false {
    console.info("createAnim", keyName, frames)
    return this.scene.anims.create({
      key: keyName,
      frames: this.scene.anims.generateFrameNumbers(sprite, {frames}),
      // The frame rate of playback in frames per second
      frameRate: 6,
      // How long the animation should play for in milliseconds. If not given its derived from frameRate.
      // duration: null
      // Should the animation yoyo? (reverse back down to the write) before repeating?
      yoyo: true,
      repeat: -1
    });
  }

}

