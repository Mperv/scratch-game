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

    num = 0;
    changeBackground(key) {
        var image = this.createdGame.add.image(400, 300, key);
        if (this.backgroundImage) {
            this.backgroundImage.destroy();
        }
        this.num += 10;
        this.backgroundImage = image;
    }

    /*    createSprite(key, x, y) {
            this.preloader.add.sprite(x, y, key);
        }*/


}
