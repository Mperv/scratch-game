# ScratchGame v0.26.6b

Русская версия этого файла [readme.md](readme.md)

## Getting started / preparation

To develop a game using Phaser and ScratchGame, you need to:
- download phaser.min.js and scratch_game.js and place them in the `lib` folder
- place game files (images) in the `assets` folder
- create an html file where you include the libraries
```html
<head>
    <script src="lib/phaser.min.js"></script>
    <script src="lib/ScratchGame.js"></script>
</head>
```
- start a web server (a web server is necessary because otherwise the browser will not be able to load game files)

If python is installed, you can start a web server with the following command:
```bash
python -m http.server 8080
```

If node.js is installed, you can start a web server with the following command:
```bash
npx http-server . -p 8080
```

The current folder will become the root of the web server, which will be available at http://localhost:8080/

- now you can create a section in the html file

```html
<body>
    <script type="text/javascript">



    </script>
</body>
```

and start writing game code in it.

## Game Example

You can see an example of a game in the file [01.html](01.html).
Only two images are required:
- sea.jpg
- dude.png

The game sets the background, creates a player, and allows controlling the player using cursor keys.

In the file [02.html](02.html) there is another example - moving the player to a specified point by controlling with the mouse.

## Game Initialization

```javascript
let game = new ScratchGame(800, 600);
game.preload = preload;
game.create = create;
game.update = update;
```

The functions preload, create, and update must be defined in the same file.
800, 600 are the dimensions of the game window.

## Loading images in preload

The `preload` function (it can be named differently, but then you would need to change it in the initialization as well, e.g., `game.preload = image_load;`, then the function would need to be named `image_load`) is intended for loading resources needed by the game - images, music, etc.

It is called once per game, when the page loads.

```javascript
function preload() {
    // reads the image from assets/sky.png and registers it in the system under the name sky
    this.loadImage('sky', 'assets/sky.png');
    // reads the image from 'assets/dude.png' and registers it in the system under the name dude
    // the loaded image is divided into chunks 48 pixels high and 32 pixels wide
    // each chunk is a separate "costume" (you could probably use separate images, but
    // spawning a gazillion images is a so-so plan). Each "costume" is called a "frame".
    this.loadSpritesheet('dude', 'assets/dude.png', 32, 48);
}
```

## Creating the game

The `create` function is called once per game, after all resources in preload have been loaded.

```javascript
function create() {
    // setting the sky image (must be loaded in preload) as the background. 
    // the image must be at least the size of the game window
    // if the image is smaller, it will be in the center of the window
    this.changeBackground('sky');

    // setting the background color
    this.setBackgroundColor(0x00FFFF);

    // create (clone) a sprite. We can also save the sprite itself into a variable 
    // (here the variable player is used)
    // which can be used to control the sprite
    let player = this.createSprite(100, 100, 'dude');
    // get / set / change position, direction (if not set will be 0), size 
    // (if not set will be 1)
    player.x = 400;
    player.y = 300;
    player.direction = 90;
    player.size = 2;

    // move forward by the specified number of pixels
    player.moveForward(10);
    // turn by the specified number of degrees
    player.turn(15);
    // turn towards the point (x, y)
    player.turnTo(x, y);

    // change X and Y by the specified number of pixels
    player.x += 10;
    player.y += 10;

    // variable visible - visibility of the sprite
    // show sprite
    player.visible = true;
    // hide sprite
    player.visible = false;
    // toggles sprite visibility
    player.changeVisibility();

    // variable costume - number of the current costume (frame), numbering starts from 0
    // changing the costume number (frame)
    player.costume = 5;
    // current costume (frame)
    console.log(player.costume);
    // count of costumes (frames)
    console.log(player.costumesCount);
    // next costume
    player.nextCostume();
    // switches the costume by the specified number of positions (cyclically)
    player.changeCostumeBy(value);

    // destroys the sprite, the sprite is removed from the game and nothing more can be done with it
    player.destroy();

    // check for sprite collision (only rectangles are compared)
    player.onRectangularOverlap(anotherSprite, function (event) {
        console.log("my boundaries collided with the boundaries of another sprite", event);
    });

    // check for sprite collision (compared pixel-by-pixel, precision 2 pixels)
    player.onOverlap(anotherSprite, function (event) {
        console.log("my pixels collided with the pixels of another sprite", event);
    });

    // check for sprite collision (pixels are compared, precision 1 pixel, slower
    // than the previous option)
    player.onOverlap(anotherSprite, function (event) {
        console.log("my pixels collided with the pixels of another sprite", event);
    }, 1);

    // defining a function that will be called when the W key is pressed
    this.onKeyDown("W", function (event) {
        console.log("W down", event.duration);
    });
    // defining a function that will be called when the W key is released
    this.onKeyUp("W", function (event) {
        console.log("W up", event.duration);
    });

    // defining a function that will be called on mouse down
    this.onMouseDown(function (event) {
        console.log("Mouse down", event);
    });
    // defining a function that will be called on mouse up
    this.onMouseUp(function (event) {
        console.log("Mouse up", event);
    });
}
```

## Update Loop

The `update` function is called every "tick" of the game, that is, several times per second.
In fact, it replaces the infinite loop ("forever") in Scratch.
After each execution of update, the screen is redrawn.

```javascript
function update() {
    // checks if the A key is pressed
    console.log(game.isKeyDown('A'));
    // you can also use it to check for cursor keys and special keys
    console.log("up", game.isKeyDown('UP'));
    console.log("down", game.isKeyDown('DOWN'));
    console.log("left", game.isKeyDown('LEFT'));
    console.log("right", game.isKeyDown('RIGHT'));
    console.log("shift", game.isKeyDown('SHIFT'));
    console.log("ctrl", game.isKeyDown('CTRL'));
    console.log("alt", game.isKeyDown('ALT'));
    console.log("space", game.isKeyDown('SPACE'));
    console.log("enter", game.isKeyDown('ENTER'));
    console.log("esc", game.isKeyDown('ESC'));

    // checks if the mouse button is pressed
    console.log(game.isMouseDown());
    // gets mouse coordinates
    console.log(game.mouseX, game.mouseY);

    // get the current time from the start of the game in milliseconds
    console.log(game.getTime());
}
```

## Text

Usually text is created in the `create` function.

```javascript
function create() {
    // create (clone) text. We can also save the text itself into a variable 
    // (here the variable text is used)
    // which can be used to control the text
    text = this.createText(480, 20, "Demo Text");
    // get / set / change text font
    text.font = 'Arial';
    // get / set / change text size
    text.size = 24;
    // get / set / change text color
    text.color = '#00FFFF';

    // get / set / change text position
    text.x = 480;
    text.y = 20;

    // get / set / change text visibility
    text.visible = true;

    // get / set / change text content
    text.text = 'Hello World';

    // destroys the text, the text is removed from the game and nothing more can be done with it
    text.destroy();
}
```
