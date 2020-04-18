import {AudioAssets} from "./assets/assets";
import Scene = Phaser.Scene;
import BaseSound = Phaser.Sound.BaseSound;


const Globals: any = {
  soundOn: true,
  musicOn: true,
  bgMusicPlaying: true,
  gameWidth: Math.min(window.innerWidth, 375),
  gameHeight: Math.min(window.innerHeight, 800),
  currentMusic: undefined,

  playTitleMusic: (scene: Scene) => {
    console.info("Play title music")
    scene.sound.volume = 0.0
    let music: BaseSound = scene.sound.add(AudioAssets.TITLE_SONG)
    music.play({volume: 0.8, loop: true})
    // scene.sound.play(AudioAssets.TITLE_SONG)
    // scene.sound.play()
    Globals.currentMusic = music;

    scene.tweens.add({targets: scene.sound, volume: 1.0, duration: 4000, delay: 200});
  },

  fadeOutTitleMusic: (scene: Scene) => {
    scene.tweens.add({targets: scene.sound, volume: 0.0, duration: 2000, delay: 200})
      .once("onComplete", () => {
        console.info("fadeOutTitleMusic finished & destroying")
        Globals.currentMusic.stop()
        Globals.currentMusic.destroy()
      });

  },

  playClick: (scene: Scene) => {
    scene.sound.play(AudioAssets.BLIP_01)
  }
}

export default Globals
