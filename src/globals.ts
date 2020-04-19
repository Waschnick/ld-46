import {AudioAssets} from "./assets/assets";
import Scene = Phaser.Scene;
import BaseSound = Phaser.Sound.BaseSound;
import EventEmitter = Phaser.Events.EventEmitter;

export const enum CharacterValues {
  HEALTH = "HEALTH",
  SOCIAL = "SOCIAL",
  SELF_CARE = "SELF_CARE",
  FUN = "FUN",
}

const Globals = {
  soundOn: true,
  musicOn: true,
  bgMusicPlaying: true,
  gameWidth: Math.min(window.innerWidth, 420),
  gameHeight: Math.min(window.innerHeight, 800),
  currentMusic: {} as BaseSound,
  timeIncreaseEventEmitter: {} as EventEmitter,

  characterValues: {
    money: 20,
    year: 6,
    week: 1,
    day: 1,
    [CharacterValues.HEALTH]: 100,
    [CharacterValues.SOCIAL]: 100,
    [CharacterValues.SELF_CARE]: 100,
    [CharacterValues.FUN]: 100,
  },

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


  increaseDay() {
    console.info("Increase day")
    let charVals = Globals.characterValues;

    charVals.day++;
    if (charVals.day >= 8) {
      charVals.day = 1;
      charVals.week++;
    }
    if (charVals.week >= 53) {
      charVals.week = 1;
      charVals.year++;
    }
    charVals.money += Phaser.Math.Between(-5, 16)
    charVals[CharacterValues.HEALTH] -= Phaser.Math.FloatBetween(0.0, 1.0);
    charVals[CharacterValues.SOCIAL] -= Phaser.Math.FloatBetween(0.0, 1.0);
    charVals[CharacterValues.SELF_CARE] -= Phaser.Math.FloatBetween(0.0, 1.0);
    charVals[CharacterValues.FUN] -= Phaser.Math.FloatBetween(0.0, 1.0);

    Globals.timeIncreaseEventEmitter.emit('increaseDay');
  },

  onIncreaseDay(callback: any) {
    Globals.timeIncreaseEventEmitter.on('increaseDay', callback);
  },

  playClick: (scene: Scene) => {
    scene.sound.play(AudioAssets.BLIP_01)
  }
}

export default Globals
