// export namespace Images {
//
//   export class ImagesBackgroundTemplate {
//
//     static getName(): string {
//       return 'background_template';
//     }
//
//     static getPNG(): string {
//       return require('src/assets/images/DucksScreen.png');
//     }
//   }
// }

import Scene = Phaser.Scene;
import LoaderPlugin = Phaser.Loader.LoaderPlugin;

export const pngAssets: { [key: string]: string; } = {
  [PngImages.DUCKS_LOGO]: require('./images/DucksScreen.png').default,
  [PngImages.TITLE_IMAGE]: require('./images/TitleScreen.png').default,
  [PngImages.BLUE_BUTTON_02]: require('./images/ui/blue_button02.png').default,
  [PngImages.BLUE_BUTTON_03]: require('./images/ui/blue_button03.png').default
}

export const enum PngImages {
  DUCKS_LOGO = "ducks_logo",
  TITLE_IMAGE = "title_image",
  BLUE_BUTTON_02 = "blue_button_02",
  BLUE_BUTTON_03 = "BLUE_BUTTON_03",
}

// AUDIO

export const audioOggAssets: { [key: string]: string; } = {
  [AudioAssets.DUCKS_QUAK_SOUND]: require('./audio/duck.ogg').default,
  [AudioAssets.TITLE_SONG]: require('./audio/title_song.mp3').default
}

export const enum AudioAssets {
  DUCKS_QUAK_SOUND = "ducks_quak_sound",
  TITLE_SONG = "title_song.mp3",
}

export function loadAssets(scene: Scene) {
  loadAudio(scene)
  loadImages(scene)
}

export const sounds: { [key: string]: LoaderPlugin; } = {}

function loadAudio(scene: Scene) {
  Object.keys(audioOggAssets).forEach(key => {
    sounds[key] = scene.load.audio(key, [audioOggAssets[key]]);
  })
}


function loadImages(scene: Scene) {
  Object.keys(pngAssets).forEach(key => {
    scene.load.image(key, pngAssets[key]);
  })

}
