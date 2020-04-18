import * as Phaser from "phaser";
import Assets from "../assets/assets";

export class Preload extends Phaser.Scene {
  init() {
    console.log("Preloading");

  }

  preload() {
    console.log("Load things necessary for Game scene");

    // FIXME for release
    // this.load.setPath('assets/');
    // this.load.setBaseURL('http://labs.phaser.io');

    // SIZE = 336x240
    console.info("Image:", Assets.ducksLogo().png)
    this.load.image(Assets.ducksLogo().name, Assets.ducksLogo().png);
    // this.add.image(100, 100, Assets.ducksLogo().name);

    // Load all images

    // Load all sounds
    // this.game.sound.

    //width: window.innerWidth,
    //   height: window.innerHeight

    this.load.on("complete", () => {
      // this.scene.start("Scene_Menu");
      console.info("LOAD COMPLETE, START GAME!");
      this.add.image((window.innerWidth / 2), 200, Assets.ducksLogo().name);

      // this.scene.start("game");
    });


  }

  private waitForSoundDecoding(): void {
    // AssetUtils.Loader.waitForSoundDecoding(this.startGame, this);
  }

  // public waitForSoundDecoding(onComplete: Function, onCompleteContext?: any) {
  //   if (this.soundKeys.length > 0) {
  //     this.game.sound.setDecodedCallback(this.soundKeys, onComplete, onCompleteContext);
  //   } else {
  //     onComplete.call(onCompleteContext);
  //   }
  // }

  private startGame(): void {
    // this.game.camera.onFadeComplete.addOnce(this.loadTitle, this);
    // this.game.camera.fade(0x000000, 1000);
  }
}
