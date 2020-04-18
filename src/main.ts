import * as Phaser from "phaser";
import {Preload} from "./scenes/preload";
import {Title} from "./scenes/title";
import {Boot} from "./scenes/boot";
import {Game} from "./scenes/game";
import GameConfig = Phaser.Types.Core.GameConfig;
import Globals from "./globals";
import {DemoGame} from "./scenes/demo-game";
import {City} from "./scenes/city";
import {Shop} from "./scenes/shop";

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
        pixelArt: true
      }
    };
    super(config);

    this.scene.add("boot", Boot, false);
    this.scene.add("preload", Preload, false);
    this.scene.add("title", Title, false);
    this.scene.add("game", Game, false);
    this.scene.add("city", City, false);
    this.scene.add("shop", Shop, false);
    this.scene.add("demo-game", DemoGame, false);
    this.scene.start("preload");
  }
}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};
