



var config = {
    type: Phaser.AUTO,
    width: 896, height: 448,
    //width: 1280, height: 320,
    pixelArt : true,
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 1000 },
    debug: false,
    }},
    scene: [glace_1,debut],
    };
    new Phaser.Game(config);  