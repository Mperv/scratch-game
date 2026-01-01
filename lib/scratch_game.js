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

        var image = this.createdGame.add.image(width / 2, height / 2, key);
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
        this.backgroundImage = this.createdGame.add.rectangle(0, 0, width, height, color).setOrigin(0);
    }

    createSprite(key, x, y) {
        this.createdGame.add.sprite(x, y, key);
    }


}
