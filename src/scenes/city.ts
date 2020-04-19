import * as Phaser from "phaser";
import {ImageAssets, TileImageSetKeys, TileJsonMaps} from "../assets/assets";
import Globals from "../globals";
import PictureButton from "../assets/objects/PictureButton";
import SpriteCharacter, {createSpriteCharacter, SpriteCharacters} from "../assets/objects/SpriteCharacter";
import {GameScene, GameStatus} from "../GameStatus";
import Tilemap = Phaser.Tilemaps.Tilemap;
import Tileset = Phaser.Tilemaps.Tileset;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import Graphics = Phaser.GameObjects.Graphics;

export class City extends Phaser.Scene {

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | any;
  private player!: SpriteCharacter;
  private map: Tilemap = {} as Tilemap;
  private mapLayer1: StaticTilemapLayer = {} as StaticTilemapLayer;
  private mapLayer2: StaticTilemapLayer = {} as StaticTilemapLayer;
  private gameStatus: GameStatus = new GameStatus(this)

  /**
   * Collision: https://phaser.io/examples/v3/view/game-objects/tilemap/static/set-colliding-by-collision-data
   */

  create() {
    let menuButton1 = new PictureButton(this, 10, Globals.gameHeight - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, 'Home', () => this.gameStatus.switchScene(GameScene.HOME));

    let menuButton2 = new PictureButton(this, Globals.gameWidth - 10 - 140, Globals.gameHeight - 40, ImageAssets.STATS_BUTTON_1, ImageAssets.STATS_BUTTON_2, 'Shop', () => this.gameStatus.switchScene(GameScene.SHOP));

    this.map = this.make.tilemap({key: TileJsonMaps.CITY});
    let tileset: Tileset = this.map.addTilesetImage(TileImageSetKeys.CITY);
    this.mapLayer2 = this.map.createStaticLayer(1, tileset, 0, 0).setScale(2);
    this.mapLayer1 = this.map.createStaticLayer(0, tileset, 0, 0).setScale(2);

    this.mapLayer1.setCollisionFromCollisionGroup(true)
    // this.mapLayer1.setCollisionByProperty(true)
    // HINT: The difference between map.createLayer and map.createStaticLayer
// this.map.call
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.player = createSpriteCharacter(SpriteCharacters.IngaChild, this).setPosition(250, 660)
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, false);
    //
    // this.physics.add.existing(this.player)
    // this.physics.add.collider(this.player, this.mapLayer1)


    if (!IS_PROD) {
      let shapeGraphics = this.add.graphics();
      this.drawCollisionShapes(shapeGraphics);
    }

    // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
    // haven't mapped our collision shapes in Tiled so each colliding tile will get a default
    // rectangle body (similar to AP).
    this.matter.world.convertTilemapLayer(this.mapLayer1);
    this.matter.world.setBounds(this.map.widthInPixels, this.map.heightInPixels);

    this.matter.world.on('collisionstart', (event: any, bodyA: any, bodyB: any) => {
      console.log('collision', event, bodyA, bodyB);
    });

    // this.player.setOnCollideWith(this.mapLayer1)

    // this.matter.add.gameObject(this.player, {})
    // this.physics.add.collider(this.player, this.mapLayer1);

    // Drop bouncy, Matter balls on pointer down
    // this.input.on('pointerdown', () => {
    //   var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
    //   for (var i = 0; i < 4; i++) {
    //     var x = worldPoint.x + Phaser.Math.RND.integerInRange(-5, 5);
    //     var y = worldPoint.y + Phaser.Math.RND.integerInRange(-5, 5);
    //     var frame = Phaser.Math.RND.integerInRange(0, 5);
    //     this.matter.add.image(x, y, 'balls', frame, {restitution: 1});
    //   }
    // });


    // this.matter.enableCollisionEventsPlugin()


    if (!IS_PROD) {
      var debugGraphics = this.add.graphics();
      debugGraphics.setScale(2);
      this.mapLayer1.renderDebug(debugGraphics, {
        tileColor: null, //new Phaser.Display.Color(105, 210, 231, 200), // Non colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Interesting faces, i.e. colliding edges
      });
    }

  }

  // FIXME: diagnoal movement needs to be slower
  update(time: number, delta: number) {
    // if (this.physics.collide(this.player, this.mapLayer1)) {
    //   console.info(this.physics.collide(this.player, this.mapLayer1));
    // }
    // this.player.update(arguments)

    // this.player.angle += 1;
    let factor = 1;
    let xMovement = this.cursors.left.isDown || this.cursors.right.isDown
    let yMovement = this.cursors.down.isDown || this.cursors.up.isDown

    if (xMovement && yMovement) {
      factor = 0.7
    }


    if (!xMovement && !yMovement && this.player.isMoving) {
      this.player.alignToFacing();
    } else {
      if (this.player.isMoving) {
        // console.info("can player collide?", this.matter.detector.canCollide(this.player, this.map), this.matter.detector.canCollide(this.player, this.mapLayer1), this.matter.detector.canCollide(this.player, this.mapLayer2))
      }

      if (this.cursors.left.isDown) {
        this.player.moveX(-2 * factor);
      } else if (this.cursors.right.isDown) {
        this.player.moveX(2 * factor);
      }

      if (this.cursors.down.isDown) {
        this.player.moveY(2 * factor);

      } else if (this.cursors.up.isDown) {
        this.player.moveY(-2 * factor);
      }
    }
  }

  // HINT: Does not use our scale
  drawCollisionShapes(graphics: Graphics) {


    let scale = 1
    graphics.clear();
    graphics.setScale(2)
    graphics.lineStyle(0.5, 0xFFFF00FC);

    // Loop over each tile and visualize its collision shape (if it has one)
    this.mapLayer1.forEachTile((tile: any) => {
      var tileWorldX = tile.getLeft();
      var tileWorldY = tile.getTop();
      var collisionGroup = tile.getCollisionGroup();

      // console.log(collisionGroup);

      if (!collisionGroup || collisionGroup.objects.length === 0) {
        return;
      }

      // The group will have an array of objects - these are the individual collision shapes
      var objects = collisionGroup.objects;

      for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        var objectX = tileWorldX + object.x;
        var objectY = tileWorldY + object.y;

        // When objects are parsed by Phaser, they will be guaranteed to have one of the
        // following properties if they are a rectangle/ellipse/polygon/polyline.
        if (object.rectangle) {
          graphics.strokeRect(objectX, objectY, object.width * scale, object.height * scale);
        } else if (object.ellipse) {
          // Ellipses in Tiled have a top-left origin, while ellipses in Phaser have a center
          // origin
          graphics.strokeEllipse(
            objectX + object.width / 2, objectY + object.height / 2,
            object.width, object.height
          );
        } else if (object.polygon || object.polyline) {
          var originalPoints = object.polygon ? object.polygon : object.polyline;
          var points = [];
          for (var j = 0; j < originalPoints.length; j++) {
            var point = originalPoints[j];
            points.push({
              x: (objectX + point.x) * scale,
              y: (objectY + point.y) * scale
            });
          }
          graphics.strokePoints(points);
        }
      }
    });
  }
}
