class ScratchGame {

    preload = null;
    create = null;
    update = null;

    constructor(width, height) {
        const self = this;
        const config = {
            type: Phaser.AUTO,
            width: width,
            height: height,
            physics: {
                default: 'arcade',
                arcade: {
                    //                    gravity: { y: 200 },
                    debug: false
                }
            },
            scene: {
                preload: function () {
                    self.preloader = this;
                    if (self.preload) {
                        self.preload.call(self);
                    }
                },
                create: function () {
                    self.createdGame = this;
                    if (self.create) {
                        self.create.call(self);
                    }
                },
                update: function () {
                    if (self.update) {
                        self.update.call(self);
                    }
                }
            }
        };
        this.game = new Phaser.Game(config);
    }

    loadImage(key, url) {
        this.preloader.load.image(key, url);
    }

    loadSpritesheet(key, url, frame_width, frame_height) {
        this.preloader.load.spritesheet(key, url, { frameWidth: frame_width, frameHeight: frame_height });
    }

    backgroundImage = null;
    changeBackground(key) {
        const width = this.createdGame.scale.width;
        const height = this.createdGame.scale.height;

        var image = this.createdGame.add.image(width / 2, height / 2, key).setDepth(-100);
        if (this.backgroundImage) {
            this.backgroundImage.destroy();
            this.backgroundImage = null;
        }
        this.backgroundImage = image;
    }

    setBackgroundColor(color) {
        if (this.backgroundImage) {
            this.backgroundImage.destroy();
            this.backgroundImage = null;
        }
        const width = this.createdGame.scale.width;
        const height = this.createdGame.scale.height;
        this.backgroundImage = this.createdGame.add.rectangle(0, 0, width, height, color).setOrigin(0).setDepth(-100);
    }

    createSprite(key, x, y) {
        return new ScratchSprite(this, key, x, y);
    }
}

class ScratchSprite {

    constructor(game, key, x, y) {
        this.scratchGame = game;
        this.createdGame = game.createdGame;
        this.sprite = game.createdGame.add.sprite(x, y, key);
    }

    get x() {
        return this.sprite.x;
    }

    set x(value) {
        this.sprite.x = value;
    }

    get y() {
        return this.sprite.y;
    }

    set y(value) {
        this.sprite.y = value;
    }

    get direction() {
        return this.sprite.angle;
    }

    set direction(value) {
        this.sprite.angle = value;
    }

    get size() {
        return this.sprite.scale;
    }

    set size(value) {
        this.sprite.scale = value;
    }

    moveForward(steps) {
        this.sprite.x += steps * Math.cos(this.sprite.angle * Math.PI / 180);
        this.sprite.y += steps * Math.sin(this.sprite.angle * Math.PI / 180);
    }

    turn(degrees) {
        this.sprite.angle += degrees;
    }

    get visible() {
        return this.sprite.visible;
    }

    set visible(value) {
        this.sprite.visible = value;
    }

    changeVisibility() {
        this.sprite.visible = !this.sprite.visible;
    }

    get costume() {
        return Number(this.sprite.frame.name);
    }

    set costume(value) {
        this.sprite.setFrame(value);
    }

    get costumesCount() {
        return this.sprite.texture.frameTotal - 1;
    }

    nextCostume() {
        let nextCostume = Number(this.sprite.frame.name) + 1;
        if (nextCostume >= this.costumesCount) {
            nextCostume = 0;
        }
        this.sprite.setFrame(nextCostume);
    }

    changeCostumeBy(value) {
        let nextCostume = Number(this.sprite.frame.name) + value;
        if (nextCostume >= this.costumesCount) {
            nextCostume = nextCostume % this.costumesCount;
        }
        if (nextCostume < 0) {
            nextCostume = this.costumesCount - (Math.abs(nextCostume) % this.costumesCount);
        }
        if (!Number.isInteger(nextCostume)) {
            nextCostume = Number(this.sprite.frame.name);
        }
        this.sprite.setFrame(nextCostume);
    }

    // point towards (mouse pointer)
    // goto to random position / mouse positions / x y
    // glide (seconds) to random position / mouse positions / x y


}
