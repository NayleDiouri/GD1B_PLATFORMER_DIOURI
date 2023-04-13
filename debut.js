class debut extends Phaser.Scene {
    constructor() {
        super("debut"); // mettre le meme nom que le nom de la classe
    }

    preload() {
        this.load.image("background", "assets/background.png");
        this.load.image("Phaser_assets", "assets/assets_img.png");
        this.load.tilemapTiledJSON("carte", "map_test.json");
        this.load.spritesheet('perso', 'assets/perso.png',
            { frameWidth: 48, frameHeight: 32 });
    }

    create() {
        this.add.image(800, 800, "background");

        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "assets",
            "Phaser_assets"
        );
        const test = carteDuNiveau.createLayer(
            "test",
            tileset
        );
        test.setCollisionByProperty({ estSolide: true });
        this.player = this.physics.add.sprite(50, 50, 'perso');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, test);
        this.physics.world.setBounds(0, 0, 320, 320);
        this.cameras.main.setBounds(0, 0, 320, 320);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 12 }),
            frameRate: 20,
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'perso', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', { start: 13, end: 25 }),
            frameRate: 20,
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('A,D,SPACE');

    }

    update() {
        if (this.cursors.left.isDown) {


            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);



        }



        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {

            this.player.setVelocityY(-380);

        }
    }
}
