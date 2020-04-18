import * as Phaser from "phaser";
import Assets from "../assets/assets";
import Globals from "../globals";

export class Preload extends Phaser.Scene {
  init() {
    console.log("Preloading");
  }

  preload() {
    console.log("Load things necessary for Game scene, cam:", this.cameras.main.width, this.cameras.main.height);

    // FIXME for release
    // this.load.setPath('assets/');
    // this.load.setBaseURL('http://labs.phaser.io');


    // for (var i = 0; i < 500; i++) {
    //   this.load.image('logo' + i, Assets.ducksLogo().png);
    // }

    // this.add.image(100, 100, Assets.ducksLogo().name);

    // Load all images

    // Load all sounds
    // this.game.sound.

    //width: window.innerWidth,
    //   height: window.innerHeight

    // cf. https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
    var progressBox = this.add.graphics();
    var progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(10, 270, Globals.gameWidth - 20, 50);
    // progressBox.fillRect(240, 270, 320, 50);

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
      assetText.setStyle({font: "24px", "font-weight": "bold"}).setText("Click to start.")

      if (IS_PROD) {
        this.time.delayedCall(500, () => {


        }, [], this);
      } else {
        ready();
      }
    });

    let ready = () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.scene.start('title');
    }

    Assets.loadAssets(this)
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
