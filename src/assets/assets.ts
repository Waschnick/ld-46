import Scene = Phaser.Scene;

const pngAssets: { [key: string]: string; } = {
  [ImageAssets.DUCKS_LOGO]: require('./images/DucksScreen.png').default,
  [ImageAssets.TITLE_IMAGE]: require('./images/TitleScreen.png').default,
  [ImageAssets.BLUE_BUTTON_02]: require('./images/ui/blue_button02.png').default,
  [ImageAssets.BLUE_BUTTON_03]: require('./images/ui/blue_button03.png').default
}

export const enum ImageAssets {
  DUCKS_LOGO = "ducks_logo",
  TITLE_IMAGE = "title_image",
  BLUE_BUTTON_02 = "blue_button_02",
  BLUE_BUTTON_03 = "BLUE_BUTTON_03",
}

// AUDIO

const audioOggAssets: { [key: string]: string; } = {
  [AudioAssets.DUCKS_QUAK_SOUND]: require('./audio/duck.ogg').default,
  [AudioAssets.TITLE_SONG]: require('./audio/title_song.mp3').default
}

export const enum AudioAssets {
  DUCKS_QUAK_SOUND = "ducks_quak_sound",
  TITLE_SONG = "title_song.mp3",
}

// SPRITES

// key, sourcefile, framesize x, framesize y
// game.load.spritesheet('mario', 'assets/misc/mariospritesheet-small.png',50,50); // key, sourcefile, framesize x, framesize y

// Tiles

// HINT: This is part of the JSON file and needs to be the same key!!!
export const enum TileImageSetKeys {
  DESERT = "Desert"
}

const tileImageSetAssets: { [key: string]: string; } = {
  [TileImageSetKeys.DESERT]: require('./tilemaps/tmw_desert_spacing.png').default,
}

export const enum TileJsonMaps {
  MAP1 = "DesertMap1"
}

const tileJsonMapAssets: { [key: string]: string; } = {
  [TileJsonMaps.MAP1]: require('./tilemaps/desert.json').default,
}

function loadTiles(scene: Scene) {
  console.info("Loading tiles.")

  Object.keys(tileJsonMapAssets).forEach(key => {
    scene.load.tilemapTiledJSON(key, tileJsonMapAssets[key]);
  })
  Object.keys(tileImageSetAssets).forEach(key => {
    scene.load.image(key, tileImageSetAssets[key]);
  })

  console.info("Finished loading tiles.")
}

function loadAssets(scene: Scene) {
  loadAudio(scene)
  loadImages(scene)
  loadTiles(scene)
}

function loadAudio(scene: Scene) {
  Object.keys(audioOggAssets).forEach(key => {
    scene.load.audio(key, [audioOggAssets[key]]);
  })
}


function loadImages(scene: Scene) {
  Object.keys(pngAssets).forEach(key => {
    scene.load.image(key, pngAssets[key]);
  })

}

const Assets = {
  pngAssets,
  audioOggAssets,
  loadAssets,
  loadTiles
}

export default Assets;
