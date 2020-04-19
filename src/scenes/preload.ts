import * as Phaser from "phaser";
import Assets from "../assets/assets";
import Globals from "../globals";
import GameObject = Phaser.GameObjects.GameObject;
import {GameStatus} from "../GameStatus";

export class Preload extends Phaser.Scene {

  private gameObjects: Array<GameObject> = []
  private gameStatus: GameStatus = new GameStatus(this)

  preload() {
    console.log("Load things necessary for Game scene, cam:", this.cameras.main.width, this.cameras.main.height);

    // FIXME for release
    // this.load.setPath('assets/');
    // this.load.setBaseURL('http://labs.phaser.io');

    // cf. https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
    var progressBox = this.add.graphics();
    this.gameObjects.push(progressBox);

    var progressBar = this.add.graphics();
    this.gameObjects.push(progressBar);

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(10, 270, Globals.gameWidth - 20, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0);
    this.gameObjects.push(loadingText);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 20,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
    this.gameObjects.push(percentText);


    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
    this.gameObjects.push(assetText);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      // progressBar.fillRect(250, 280, 300 * value, 30);
      progressBar.fillStyle(0xffffff, 0.5);
      progressBar.fillRect(10, 280, (window.innerWidth - 25) * value, 30);
      percentText.setText((value * 100) + '%')
    });

    this.load.on('fileprogress', function (file: any) {
      console.log(file.src);
      // OR src
      assetText.setText('Loading asset: ' + file.key);
    });


    this.load.on("complete", () => {
      console.info("LOAD COMPLETE, START GAME!");
      this.input.once('pointerup', () => {
        ready()
      })

      loadingText.setText("100%")
      percentText.setText("Loading finished.")
      assetText.setStyle({font: "24px", "font-weight": "bold"}).setText("Click to write.")

      if (IS_PROD) {
        this.time.delayedCall(500, () => {
        }, [], this);
      } else {
        ready();
      }
    });

    this.writeVersion()

    let ready = () => {
      this.gameObjects.forEach(it => it.destroy())
      this.gameObjects = [];

      this.gameStatus.goToStartSceneAfterPreload()
    }

    Assets.loadAssets(this)
  }

  private writeVersion(): void {
    var compileTypeText = this.make.text({
      x: 10,
      y: Globals.gameHeight - 28,
      text: '0%',
      style: {
        font: '14px monospace',
        fill: '#ffffff'
      }
    });
    compileTypeText.setOrigin(0, 0.5);
    compileTypeText.setText(IS_PROD ? "Release Build" : "Development Build")
    this.gameObjects.push(compileTypeText);

    var versionText = this.make.text({
      x: 10,
      y: Globals.gameHeight - 14,
      text: '0%',
      style: {
        font: '14px monospace',
        fill: '#ffffff'
      }
    });
    versionText.setOrigin(0, 0.5);
    versionText.setText(BUNDLE_VERSION)
    this.gameObjects.push(versionText);
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

}
