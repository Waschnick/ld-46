import Scene = Phaser.Scene;
import 'phaser';
import {Sprites} from "../assets";
import SpriteCharacter from "./SpriteCharacter";

export const enum SpriteCharacters {
  IngaChild = "FACING_DOWN"
}

function createSpriteCharacter(spriteCharacters: SpriteCharacters, scene: Scene): SpriteCharacter {
  if (spriteCharacters === SpriteCharacters.IngaChild) {
    let char = new SpriteCharacter(scene, Sprites.INGA_CHILD, 0, 0)

    return char;
  }
  throw new Error("Unknonw CHARACTER " + spriteCharacters)
}

const CreateSpriteCharacters = {
  createSpriteCharacter
}
export default CreateSpriteCharacters

