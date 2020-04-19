import Scene = Phaser.Scene;

export enum BitmapFonts {
  DESYREL = "DESYREL"
}

const BitmapFontsImage: { [key: string]: string; } = {
  [BitmapFonts.DESYREL]: require('./images/fonts/desyrel.png').default,
}

const BitmapFontsDesc: { [key: string]: string; } = {
  [BitmapFonts.DESYREL]: require('./images/fonts/desyrel.xml').default,
}

const pngAssets: { [key: string]: string; } = {
  [ImageAssets.DUCKS_LOGO]: require('./images/DucksScreen.png').default,
  [ImageAssets.TITLE_IMAGE]: require('./images/TitleScreen.png').default,
  [ImageAssets.BLUE_BUTTON_1]: require('./images/ui/blue_button_1.png').default,
  [ImageAssets.BLUE_BUTTON_2]: require('./images/ui/blue_button_2.png').default,
  [ImageAssets.STATS_BUTTON_1]: require('./images/ui/stats_button_1.png').default,
  [ImageAssets.STATS_BUTTON_2]: require('./images/ui/stats_button_2.png').default,
  [ImageAssets.GREY_BUTTON_1]: require('./images/ui/button_greyed_1.png').default,
  [ImageAssets.GREY_BUTTON_2]: require('./images/ui/button_greyed_2.png').default,
}

export const enum ImageAssets {
  DUCKS_LOGO = "ducks_logo",
  TITLE_IMAGE = "title_image",
  BLUE_BUTTON_1 = "BLUE_BUTTON_1",
  BLUE_BUTTON_2 = "BLUE_BUTTON_2",
  STATS_BUTTON_1 = "STATS_BUTTON_1",
  STATS_BUTTON_2 = "STATS_BUTTON_2",
  GREY_BUTTON_1 = "GREY_BUTTON_1",
  GREY_BUTTON_2 = "GREY_BUTTON_2",
}

// AUDIO

const audioOggAssets: { [key: string]: string; } = {
  [AudioAssets.DUCKS_QUAK_SOUND]: require('./audio/duck.mp3').default,
  [AudioAssets.TITLE_SONG]: require('./audio/title_song.mp3').default,
  [AudioAssets.BLIP_01]: require('./audio/blip.mp3').default,

}

export const enum AudioAssets {
  DUCKS_QUAK_SOUND = "ducks_quak_sound",
  TITLE_SONG = "title_song",
  BLIP_01 = "blip-01",
}

// SPRITES
export const enum Sprites {
  DWARF = "Dwarf",
  INGA = "Inga1",
  INGA_CHILD = "inga_child"
}

const spritSheetsAssets: { [key: string]: string; } = {
  [Sprites.DWARF]: require('./sprites/Dwarf_Sprite_Sheet.png').default,
  [Sprites.INGA_CHILD]: require('./sprites/inga-sprite-sheet-child.png').default,
  [Sprites.INGA]: require('./sprites/inga-sprite-sheet.png').default,
}

// TILES
// HINT: This is part of the JSON file and needs to be the same key!!!
export const enum TileImageSetKeys {
  DESERT = "Desert",
  CITY = "City",
  CITY_EXTRUDED = "CITY_EXTRUDED",
}

const tileImageSetAssets: { [key: string]: string; } = {
  [TileImageSetKeys.DESERT]: require('./tilemaps/tmw_desert_spacing.png').default,
  [TileImageSetKeys.CITY]: require('./tilemaps/city.png').default,
  [TileImageSetKeys.CITY_EXTRUDED]: require('./tilemaps/city-extruded.png').default,
}

export const enum TileJsonMaps {
  MAP1 = "DesertMap1",
  CITY = "CityMap1",
}

const tileJsonMapAssets: { [key: string]: string; } = {
  [TileJsonMaps.MAP1]: require('./tilemaps/desert.json').default,
  [TileJsonMaps.CITY]: require('./tilemaps/city.json').default,
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

  Object.keys(audioOggAssets).forEach(key => {
    scene.load.audio(key, [audioOggAssets[key]]);
  })

  for (let bitmapFont in BitmapFonts) {
    scene.load.bitmapFont(bitmapFont, BitmapFontsImage[bitmapFont], BitmapFontsDesc[bitmapFont]);
  }


  //  37x45 is the size of each frame
  //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
  //  blank frames at the end, so we tell the loader how many to load
  //                     key, sourcefile,             framesize x, framesize y
  scene.load.spritesheet(Sprites.DWARF, spritSheetsAssets[Sprites.DWARF], {frameWidth: 38, frameHeight: 32});
  scene.load.spritesheet(Sprites.INGA, spritSheetsAssets[Sprites.INGA], {frameWidth: 32, frameHeight: 32});
  scene.load.spritesheet(Sprites.INGA_CHILD, spritSheetsAssets[Sprites.INGA_CHILD], {frameWidth: 32, frameHeight: 32});
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
  loadAssets,
}

export default Assets;
