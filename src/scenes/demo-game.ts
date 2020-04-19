import * as Phaser from "phaser";
import {ImageAssets, Sprites, TileImageSetKeys, TileJsonMaps} from "../assets/assets";
import Globals from "../globals";
import PictureButton from "../assets/objects/PictureButton";
import SpriteCharacter, {CharacterFacing} from "../assets/objects/SpriteCharacter";
import Tilemap = Phaser.Tilemaps.Tilemap;
import Tileset = Phaser.Tilemaps.Tileset;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;

export class DemoGame extends Phaser.Scene {
  init() {
    console.log("Initializing game");
    // Phaser.CANVAS.setSmoothingEnabled(this.game.context, false);
  }

  height: number = Globals.gameHeight;
  width: number = Globals.gameWidth;
  statusBarHeight: number = 240;
  statusBarYOffset: number = this.height - this.statusBarHeight;

  frameView: any;
  anim: any;
  sprite: any;

  create() {
    // this.cameras.main.setZoom(2)


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


    //  Frame debug view
    this.frameView = this.add.graphics({fillStyle: {color: 0xff00ff}, x: 32, y: 32});

    // Show the whole sprite sheet
    this.add.image(32, 32, Sprites.INGA_CHILD, '__BASE').setOrigin(0);


    let girl1: SpriteCharacter = new SpriteCharacter(this, Sprites.INGA_CHILD, 40, 190)
      .walk(CharacterFacing.FACING_DOWN)

    let girl2: SpriteCharacter = new SpriteCharacter(this, Sprites.INGA_CHILD, 120, 190)
      .walk(CharacterFacing.FACING_LEFT)

    let girl3: SpriteCharacter = new SpriteCharacter(this, Sprites.INGA_CHILD, 200, 190)
      .walk(CharacterFacing.FACING_UP)

    let girl4: SpriteCharacter = new SpriteCharacter(this, Sprites.INGA_CHILD, 280, 190)
      .walk(CharacterFacing.FACING_RIGHT)

  }


  update(time: number, delta: number): void {
    super.update(time, delta);

    this.updateFrameView();
  }

  updateFrameView() {
    // if (this.sprite.anims.isPlaying) {
    //   this.frameView.clear();
    //   // console.info("this.sprite.frame", this.sprite.frame)
    //   this.frameView.fillRect(this.sprite.frame.cutX, this.sprite.frame.cutY, 32, 32);
    // }
  }
}
