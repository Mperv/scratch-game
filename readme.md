# Scratch Game v0.26.2c

## Подключение библиотек

Прежде всего надо подключить Phaser и Scratch Game

```html
<head>
    <script src="lib/phaser.min.js"></script>
    <script src="lib/scratch_game.js"></script>
</head>
```

## Инициализация игры

```javascript
let game = new ScratchGame(800, 600);
game.preload = preload;
game.create = create;
game.update = update;
```

Функции preload, create и update должны быть определены в том же файле.
800, 600 - размеры окна игры.

## Загрузка изображений в preload

Функция `preload` (можно назвать как-то по другому, но тогда надо будет изменить и в иницилизации, например `game.preload = image_load;`, тогда функция должна будет называться `image_load`) предназначена для загрузки ресурсов нужных игре - картинок, музыки и т.п.

Вызывается один раз за игру, при загрузке страницы.

```javascript
function preload() {
    // читается картинка из assets/sky.png и регистрируется в системе под именем sky
    this.loadImage('sky', 'assets/sky.png');
    // читается картинка из 'assets/dude.png' и регистрируется в системе под именем dude
    // загруженная картинка делится на куски высотой 48 пикселей и шириной 32 пикселей
    // каждый кусок - это отдельный "костюм" (можно, наверное и отдельными картинками, но
    // плодить миллион картинок - так себе план). Каждый "костюм" называется "frame".
    this.loadSpritesheet('dude', 'assets/dude.png', 32, 48);
}
```

## Создание игры

Функция `create` вызывается один раз за игру, после загрузки всех ресурсов в preload.

```javascript
function create() {
    // установка картинки sky (должна быть загружена в preload) в качестве фона. 
    // картинка должна быть размера не меньше размеров окна игры
    // если картинка меньше, то она будет в центре окна
    this.changeBackground('sky');

    // установка цвета фона
    this.setBackgroundColor(0x00FFFF);

    // создаём (клонируем) спрайт. Сам спрайт мы тоже можем записать в переменную 
    // (здесь используется переменная player)
    // которую можно использовать для управления спрайтом
    let player = this.createSprite('dude', 100, 100);
    // узнаём / задаём /изменяем позицию, направление (если не задать будет 0), размер 
    // (если не задать будет 1)
    player.x = 400;
    player.y = 300;
    player.direction = 90;
    player.size = 2;

    // перемещаемся вперёд на нужное количество пикселей
    player.moveForward(10);
    // поворачиваемся на нужное количество градусов
    player.turn(15);

    // изменяем X и Y на нужное количество пикселей
    player.x += 10;
    player.y += 10;

    // переменная visible - видимость спрайта
    // показать спрайт
    player.visible = true;
    // скрыть спрайт
    player.visible = false;
    // меняет видимость спрайта
    player.changeVisibility();

    // переменная costume - номер текущего костюма (фрейма), нумерация начинается с 0
    // изменение номера костюма (фрейма)
    player.costume = 5;
    // текущий костюм (фрейм)
    console.log(player.costume);
    // количество костюмов (фреймов)
    console.log(player.costumesCount);
    // следующий костюм
    player.nextCostume();
    // переключает костюм на заданное количество позиций (по кругу)
    player.changeCostumeBy(value);

    // уничтожает спрайт, спрайт удаляется из игры и больше с ним ничего нельзя делать
    player.destroy();

    // задание функции, которая будет вызываться при нажатии клавиши W
    this.onKeyDown("W", function (event) {
        console.log("W down", event.duration);
    });
    // задание функции, которая будет вызываться при отпускании клавиши W
    this.onKeyUp("W", function (event) {
        console.log("W up", event.duration);
    });

    // задание функции, которая будет вызываться при нажатии мыши
    this.onMouseDown(function (event) {
        console.log("Mouse down", event);
    });
    // задание функции, которая будет вызываться при отпускании мыши
    this.onMouseUp(function (event) {
        console.log("Mouse up", event);
    });
}
```

## Обновление игры

Функция `update` вызывается каждый "тик" игры, то есть несколько раз в секунду.
Фактически, она замещает бесконечный цикл ("повторять всегда") в Scratch.
После каждого выполнения update экран перерисовывается.

```javascript
function update() {
    // проверяет, нажата ли клавиша A
    console.log(game.isKeyDown('A'));
    // можно так-же использовать, для проверки нажатия клавиш курсора и специальных клавиш
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

    // проверяет, нажата ли кнопка мыши
    console.log(game.isMouseDown());
    // получает координаты мыши
    console.log(game.mouseX, game.mouseY);
}
```

