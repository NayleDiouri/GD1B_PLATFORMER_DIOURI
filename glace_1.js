class glace_1 extends Phaser.Scene {
    constructor() {
        super("glace_1"); // mettre le meme nom que le nom de la classe
    }

    preload() {
        this.load.image("background", "assets/background.png");
        this.load.image("fond_1", "assets/fond_1.png")
        this.load.image("fond_2", "assets/fond_2.png")
        this.load.image("Phaser_assets", "assets/biome_glace.png");
        this.load.image("cristaux", "assets/cristaux_glace.png")
        this.load.image("SpriteHitBox", "assets/SpriteHitBox.png")
        this.load.tilemapTiledJSON("map_glace", "map_glace.json");
        this.load.spritesheet('perso', 'assets/perso.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('perso_feu', 'assets/perso_feu.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('perso_nature', 'assets/perso_nature.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('perso_eau', 'assets/perso_eau.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.image("SpriteFireBall", "assets/SpriteFireBall.png")
        this.load.image("plante", "assets/plante.png")
        this.load.image("plante_mine", "assets/plante_mine.png")
        this.load.image("cascade", "assets/cascade.png")
        this.load.image("enemyShoot", "assets/enemyShoot.png")
        this.load.image("Bdg", "assets/BDG.png")
        this.load.image("enemyRL", "assets/enemyRL.png")
        this.load.image("enemyFollow", "assets/enemyFollow.png")
        this.load.image("eau_surface","assets/eau_surface.png")
        this.load.image("eau_profondeur","assets/eau_profondeur.png")
        this.load.image("piques", "assets/piques.png")
        this.load.image("lumieres", "assets/lumieres.png")
    }

    create() {
        this.fond_1 = this.add.image(448, 224, "fond_1");
        this.fond_2 = this.add.image(1000,250, "fond_2");

        const carteDuNiveau = this.add.tilemap("map_glace");
        const tileset = carteDuNiveau.addTilesetImage(
            "assets_glace",
            "Phaser_assets"
        );
        this.eau_surface = this.physics.add.group();
        this.calque_eau_surface = carteDuNiveau.getObjectLayer('eau_surface');
        this.calque_eau_surface.objects.forEach(calque_eau_surface => {
            const POP = this.eau_surface.create(calque_eau_surface.x + 16, calque_eau_surface.y - 16, "eau_surface").body.setAllowGravity(false).setImmovable(true);
        });
        this.eau_profondeur = this.physics.add.group();
        this.calque_eau_profondeur = carteDuNiveau.getObjectLayer('eau_profondeur');
        this.calque_eau_profondeur.objects.forEach(calque_eau_profondeur => {
            const POP = this.eau_profondeur.create(calque_eau_profondeur.x + 16, calque_eau_profondeur.y - 16, "eau_profondeur").body.setAllowGravity(false).setImmovable(true);
        });
        this.piques = this.physics.add.group();
        this.calque_piques = carteDuNiveau.getObjectLayer('piques');
        this.calque_piques.objects.forEach(calque_piques => {
            const POP = this.piques.create(calque_piques.x +16 , calque_piques.y -3, "piques").body.setAllowGravity(false).setImmovable(true);
        });
        this.lumieres = this.physics.add.group();
        this.calque_lumieres = carteDuNiveau.getObjectLayer('lumieres');
        this.calque_lumieres.objects.forEach(calque_lumieres => {
            const POP = this.lumieres.create(calque_lumieres.x +16 , calque_lumieres.y -6, "lumieres").body.setAllowGravity(false).setImmovable(true);
        });
        const neige = carteDuNiveau.createLayer(
            "neige",
            tileset
        );
        const sols = carteDuNiveau.createLayer(
            "sols",
            tileset
        );
        this.player = this.physics.add.sprite(32, 16*32, 'perso');
        this.player.setCollideWorldBounds(true);
        this.player.setSize(32,48).setOffset(10,8)

        neige.setCollisionByExclusion(-1, true);
        sols.setCollisionByExclusion(-1, true);

        this.physics.add.collider(this.player, sols);
        this.physics.add.collider(this.player, neige);
        this.physics.add.collider(this.player, this.piques)
        this.physics.add.overlap(this.player, this.eau_surface, this.waterKill, null, this)





        this.physics.world.setBounds(0, 0, 70*32, 20*32);
        this.cameras.main.setBounds(0, 0, 70*32, 20*32);
        this.cameras.main.zoom = 1.2;
        this.cameras.main.startFollow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('A,D,SPACE,SHIFT,E,X,I,O,P');


        this.anims.create({
            key: 'perso',
            frames: [{ key: 'perso', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'perso_feu',
            frames: [{ key: 'perso_feu', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'perso_nature',
            frames: [{ key: 'perso_nature', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'perso_eau',
            frames: [{ key: 'perso_eau', frame: 0 }],
            frameRate: 20
        });

        this.fond_1.setScrollFactor(0).setDepth(-3)
        this.fond_2.setScrollFactor(0.25).setDepth(-2)

    }

    update() {



        if (this.cursors.left.isDown) {
            this.IsGoingRight = false;
            this.player.setVelocityX(-200);
        }

        else if (this.cursors.right.isDown) {
            this.IsGoingRight = true;
            this.player.setVelocityX(200);
        }

        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {

            this.player.setVelocityY(-380);

        }

    }
    waterKill(player, water){
        player.setDepth(-1);
        player.setVelocityY(20)
        setTimeout(() => {
            this.scene.restart(); 
        }, 1500);

    }
}