//Scratch Game v0.26.6a
//Credits: mMeneske

class ScratchClone {
    clone;

    constructor(key, x, y){
        clone = [game.createSprite(key, x, y)]; 
    }

    createClone(amount){
        for(let i = 0; i < amount; ++i){
            clone[clone.length] = game.createSprite(clone[0].key, clone[0].x, clone[0].y);
        }
    }
    
}

function initClones(key, x, y) {
    return new ScratchClone(key, x, y); 
}
