import * as Phaser from "phaser";
import {Preload} from "./scenes/preload";
import {Title} from "./scenes/title";
import {Boot} from "./scenes/boot";
import GameConfig = Phaser.Types.Core.GameConfig;
import Globals from "./globals";
import {DemoGame} from "./scenes/demo-game";
import {City} from "./scenes/city";
import {Shop} from "./scenes/shop";
import {GameScene} from "./GameStatus";
import {Home} from "./scenes/home";
import EventEmitter = Phaser.Events.EventEmitter;

declare global {
  const BUNDLE_VERSION: string;
  const __webpack_public_path__: string;
  const IS_PROD: boolean;
  const NODE_ENV: string;
}

class Main extends Phaser.Game {
  constructor() {
    const config: GameConfig = {
      type: Phaser.AUTO,
      width: Globals.gameWidth,
      height: Globals.gameHeight,
      parent: "root",
      render: {
        pixelArt: true,
        // roundPixels: true
      },

      // fps: {
      //   target: 15,
      //   smoothStep: true
      // },
      physics: {
        default: 'matter',
        matter: {
          debug: IS_PROD ? false : {
            showSleeping: true,
            sleepFillColor: 0x464646,
            sleepLineColor: 0x999a99,
          },
          // enableSleeping: false,
          enableSleeping: true,
          gravity: false
        }
      },
    };
    super(config);

    Globals.timeIncreaseEventEmitter = new EventEmitter();


    // Phaser.ScaleModes.DEFAULT = 1

    if (IS_PROD) {
      // this.phy


    }

    this.scene.add(GameScene.BOOT, Boot, false);
    this.scene.add(GameScene.PRELOAD, Preload, false);
    this.scene.add(GameScene.TITLE, Title, false);
    this.scene.add(GameScene.HOME, Home, false);
    this.scene.add(GameScene.CITY, City, false);
    this.scene.add(GameScene.SHOP, Shop, false);
    this.scene.add(GameScene.DEMO_GAME, DemoGame, false);
    this.scene.start(GameScene.PRELOAD);
  }
}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};
