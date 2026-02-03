//Scratch Game v0.26.6a
//Credits: mMeneske

class ScratchClone {
    #scratchGame;
    #createdGame;
    #sprite;

    newClone(cloneMass){
        cloneMass[cloneMass.length] = createsprite(this.#sprite.x,this.#sprite.y,this.#sprite.key);
    }

}