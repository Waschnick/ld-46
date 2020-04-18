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

interface PngImage {
  name: string;
  png: string;
}

export class Assets {

  ducksLogo(): PngImage {
    return {
      name: "ducks_logo",
      png: require('./images/DucksScreen.png').default
    }
  }


}

export default new Assets();
