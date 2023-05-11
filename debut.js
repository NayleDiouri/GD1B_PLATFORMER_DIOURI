class debut extends Phaser.Scene {
    constructor() {
        super("debut"); // mettre le meme nom que le nom de la classe
    }

    preload() {
        this.load.image("background", "assets/background.png");
        this.load.image("Phaser_assets", "assets/biome_glace.png");
        this.load.image("cristaux", "assets/cristaux_glace.png")
        this.load.tilemapTiledJSON("carte", "map_test.json");
        this.load.spritesheet('perso', 'assets/perso.png',
            { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.add.image(800, 800, "background");

        this.dashCD1 = true;
        this.IsMoving = false;
        this.IsGoingLeft = false;
        this.IsGoingRight = false;

        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "assets_glace",
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
        this.physics.world.setBounds(0, 0, 800, 320);
        this.cameras.main.setBounds(0, 0, 800, 320);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('A,D,SPACE,SHIFT');

        this.cristaux = this.physics.add.group();
        this.physics.add.collider(this.player, this.cristaux, this.Casser, null, this)
        this.calque_cristaux = carteDuNiveau.getObjectLayer('cristaux');
        console.log(this.calque_cristaux)
        this.calque_cristaux.objects.forEach(calque_cristaux => {
            console.log("creation")
            const POP = this.cristaux.create(calque_cristaux.x + 0, calque_cristaux.y - 48, "cristaux").setScale(2).body.setAllowGravity(false).setImmovable(true);
        });



    }

    update() {
        console.log(this.IsGoingLeft);




        if (this.clavier.SHIFT.isDown && this.IsMoving == true && this.IsGoingRight == false && this.dashCD1 == true) {
            this.IsGoingRight = false;
            this.IsMoving = true;
            this.player.setVelocityX(-900);
            this.player.setVelocityY(0);
            this.player.body.setAllowGravity(false)
            setTimeout(() => {
                this.dashCD1 = false
                this.player.body.setAllowGravity(true)
            }, 200);

            this.time.addEvent({
                delay: 1500, callback: () => {
                    this.dashCD1 = true
                },
            })
        }

        else if (this.clavier.SHIFT.isDown && this.IsMoving == true && this.IsGoingRight == true && this.dashCD1 == true) {
            this.IsGoingLeft = false;
            this.IsMoving = true;
            this.player.setVelocityX(900);
            this.player.setVelocityY(0);
            this.player.body.setAllowGravity(false)
            setTimeout(() => {
                this.dashCD1 = false
                this.player.body.setAllowGravity(true)
            }, 200);

            this.time.addEvent({
                delay: 1500, callback: () => {
                    this.dashCD1 = true
                },
            })

        }


        else if (this.cursors.left.isDown) {
            this.IsGoingLeft = true;
            this.IsGoingRight = false;
            this.IsMoving = true;
            this.player.setVelocityX(-200);
        }

        else if (this.cursors.right.isDown) {
            this.IsGoingLeft = false;
            this.IsGoingRight = true;
            this.IsMoving = true;
            this.player.setVelocityX(200);
        }
        else {
            this.IsGoingLeft = false;
            this.IsGoingRight = false;
            this.IsMoving = false;
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.IsMoving = true

            this.player.setVelocityY(-380);

        }


    }
    Casser(player, cristal) {

        cristal.destroy()
    }
}

