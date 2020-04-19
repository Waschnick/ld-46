import {Sprites} from "../assets";
import {CharacterFacing} from "./SpriteCharacter";
import Scene = Phaser.Scene;
import TimerEvent = Phaser.Time.TimerEvent;
import BitmapText = Phaser.GameObjects.BitmapText;

export interface TypewriterOptions {
  writerObj: any;
  fontSize: number;
  fontFamily: string;
  maxWidth: number;
  y: number;
  x: number;
  text: string;
  times: number;
  endFn: any;
  writerFn: any;
  sound: any;
  soundMarker: any;
  time: number;
}

/**
 * From: https://github.com/netgfx/Phaser-typewriter
 */
export class Typewriter {


  private typedText!: BitmapText;
  private currentLetter!: number;
  private timer!: TimerEvent;
  private options: TypewriterOptions = {} as TypewriterOptions;

  private scene: Scene

  constructor(scene: Scene, options: TypewriterOptions) {
    this.scene = scene

    // return {
    //   init: function(gameInstance, options) {
    //     init(gameInstance, options);
    //   },
    //   write: function() {
    //     stop();
    //     write();
    //   },
    //   destroy: function() {
    //     this.typedText.destroy();
    //   },
    //   hideText: function() {
    //     this.typedText.visible = false;
    //   },
    //   showText: function() {
    //     this.typedText.visible = true;
    //   },
    //   moveToTop: function() {
    //     game.bringToTop(this.typedText);
    //   }
    // }

    this.options.time = options.time || 100;
    this.options.sound = options.sound || null;
    this.options.soundMarker = options.soundMarker || null;
    this.options.writerFn = options.writerFn || null;
    this.options.endFn = options.endFn || null;
    this.options.times = options.times || 10;
    this.options.text = options.text || "";
    this.options.x = options.x || 100;
    this.options.y = options.y || 100;
    this.options.maxWidth = options.maxWidth || 200;
    this.options.fontFamily = options.fontFamily || "arial";
    this.options.fontSize = options.fontSize || 28;
    this.options.writerObj = options.writerObj || null;
  }


  write(text?: string) {
    this.options.text = text || this.options.text

    if (this.options.writerObj === null) {
      this.typedText = this.scene.add.bitmapText(this.options.x, this.options.y, this.options.fontFamily, "", this.options.fontSize);
    } else {
      this.typedText = this.options.writerObj;
    }
    this.typedText.maxWidth = this.options.maxWidth;
    this.currentLetter = 0;

    let length = this.options.text.length
    // let length = this.typedText.children.length;
    //
    // for (let i = 0; i < length; i++) {
    //   let letter = this.typedText.getChildAt(i);
    //   letter.alpha = 0;
    // }

    if (this.options.sound !== null) { // Made some alterations for sound markers here. ~Tilde
      if (this.options.soundMarker !== null) {
        this.options.sound.play(this.options.soundMarker, null, 1, true, true);
      } else {
        this.options.sound.play('', null, 1, true, true);
      }
    }

    this.typedText.x = this.options.x;
    this.typedText.y = this.options.y;
    this.countdown(length, this.options.endFn);
  }

  stop() {
    if (this.timer !== undefined) {
      this.timer.destroy();
    }
    if (this.options.sound !== null) {
      this.options.sound.stop();
    }
    if (this.typedText !== undefined) { // This can cause problems if you repeatedly type to a text object. ~Tilde
      this.typedText.destroy();
    }
  }


  countdown(times: number, endFn: any) {
    let endCallback = endFn || (() => {
      this.timer.destroy();
      if (this.options.sound !== null) {
        this.options.sound.stop();
      }
    });
    this.timer = this.scene.time.addEvent({
      delay: this.options.time,
      repeat: times,
      callback: () => {
        this.typeWriter()
        if (this.timer.repeatCount <= 0) {
          endCallback()
        }
      }
    });
  }

  destroy() {
    this.timer.destroy()
    this.typedText.destroy();
  }

  clear(endFn?: any) {
    this.timer = this.scene.time.addEvent({
      delay: 30,
      repeat: this.options.text.length + 1,
      callback: () => {
        this.typedText.setText(this.options.text.substr(0, this.currentLetter))
        this.currentLetter--;
        if (this.timer.repeatCount <= 0) {
          this.timer.destroy()
          if (endFn) {
            endFn();
          }
        }
      }
    });
  }

  typeWriter() {
    if (this.options.sound !== null) {
      if (this.options.sound.isPlaying === false) {
        this.options.sound.play();
      }
    }

    this.typedText.setText(this.options.text.substr(0, this.currentLetter))
    // let letter = this.typedText.getChildAt(this.currentLetter);
    // letter.alpha = 1;
    this.currentLetter++;
  }

}
