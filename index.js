



var config = {
    type: Phaser.AUTO,
    width: 320, height: 320,
    pixelArt : true,
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 1000 },
    debug: false
    }},
    scene: [debut],
    };
    new Phaser.Game(config);  