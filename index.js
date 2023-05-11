



var config = {
    type: Phaser.AUTO,
    width: 800, height: 320,
    pixelArt : true,
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 1000 },
    debug: true,
    }},
    scene: [debut],
    };
    new Phaser.Game(config);  