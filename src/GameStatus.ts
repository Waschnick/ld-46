import Phaser from "phaser";
import EventEmitter = Phaser.Events.EventEmitter;

export const enum GameScene {
  BOOT = "boot",
  PRELOAD = "preload",
  TITLE = "title",
  HOME = "home",
  CITY = "city",
  SHOP = "shop",
  DEMO_GAME = "demo-game",
}


export class GameStatus {

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  scene: Phaser.Scene;


  switchScene(to: GameScene) {
    this.scene.cameras.main.fadeOut(300);
    this.scene.time.delayedCall(500, () => {
      this.scene.scene.switch(to)
      this.scene.time.delayedCall(300, () => {
        this.scene.cameras.main.fadeIn(300);
      })
    })

  }

  startScene(to: GameScene) {
    this.scene.cameras.main.fadeOut(300);
    this.scene.time.delayedCall(500, () => this.scene.scene.start(to))
  }

  goToStartSceneAfterPreload() {
    if (IS_PROD) {
      this.scene.scene.start(GameScene.TITLE);
    } else if (NODE_ENV === "demo-game") {
      this.scene.scene.start(GameScene.DEMO_GAME);
    } else {
      this.scene.scene.start(GameScene.CITY);
    }
  }

  showMessage(text: string) {
    var style = {font: 'bold 60pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 240};

    var textObject = this.scene.add.text(100, 100, "text", style);

  }

//   private switchToCity() {
//   this.cameras.main.fadeOut(300);
//   this.time.delayedCall(500, () => this.scene.switch('city'))
// }

}

