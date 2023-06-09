



var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 896, height: 448,
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: true,
        }
    },
    scene: [glace_1],
};
new Phaser.Game(config);  