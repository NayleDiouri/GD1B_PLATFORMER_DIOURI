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
        this.load.image("pilier_glace", "assets/pilier_glace.png")
        this.load.image("feu","assets/feu.png")
        this.load.image("enemyRL", "assets/enemyRL.png")
        this.load.image("enemyFollow", "assets/enemyFollow.png")
        this.load.image("eau_surface","assets/eau_surface.png")
        this.load.image("eau_profondeur","assets/eau_profondeur.png")
        this.load.image("piques", "assets/piques.png")
        this.load.image("lumieres", "assets/lumieres.png")
        this.load.image("stalactite","assets/stalactite.png")
        this.load.image("bloc_cassable","assets/bloc_cassable.png")
    }

    create() {
        this.fond_1 = this.add.image(448, 224, "fond_1");
        this.fond_2 = this.add.image(1000,250, "fond_2");

        this.cameraY1 = 0
        this.cameraY2 = 20*32
        this.cameraX1 = 0
        this.cameraX2 = 70*32
        this.changeCam = false
        
        //mageFeu
        this.canMageFeu = false;
        this.mageFeu = false;
        this.IsGoingRight = false;
        this.dashCD1 = true;
        this.cristalBreak = false;
        this.CanBDF = true;
        //mageFeu

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
        this.stalactite = this.physics.add.group();
        this.calque_stalactite = carteDuNiveau.getObjectLayer('stalactite');
        this.calque_stalactite.objects.forEach(calque_stalactite => {
            const POP = this.stalactite.create(calque_stalactite.x +16 , calque_stalactite.y -16, "stalactite").body.setAllowGravity(false);
        });

        this.pilier_glace = this.physics.add.group();
        this.calque_pilier_glace = carteDuNiveau.getObjectLayer('pilier');
        this.calque_pilier_glace.objects.forEach(calque_pilier_glace => {
            const POP = this.pilier_glace.create(calque_pilier_glace.x +16 , calque_pilier_glace.y -24, "pilier_glace").body.setAllowGravity(false);
        });
        this.feu = this.physics.add.group();
        this.calque_feu = carteDuNiveau.getObjectLayer('feu');
        this.calque_feu.objects.forEach(calque_feu => {
            const POP = this.feu.create(calque_feu.x +16 , calque_feu.y -22, "feu").body.setAllowGravity(false);
        });
        this.bloc_cassable = this.physics.add.group();
        this.calque_bloc_cassable = carteDuNiveau.getObjectLayer('solCassable');
        this.calque_bloc_cassable.objects.forEach(calque_bloc_cassable => {
            const POP = this.bloc_cassable.create(calque_bloc_cassable.x +16 , calque_bloc_cassable.y -16, "bloc_cassable").body.setAllowGravity(false).setImmovable(true);
        });
        const neige = carteDuNiveau.createLayer(
            "neige",
            tileset
        );
        const sols = carteDuNiveau.createLayer(
            "sols",
            tileset
        );
        this.player = this.physics.add.sprite(2*32, 16*32, 'perso');
        this.player.setCollideWorldBounds(true);
        this.player.setSize(32,48).setOffset(10,8)

        neige.setCollisionByExclusion(-1, true);
        sols.setCollisionByExclusion(-1, true);

        this.CameraHitBox = this.physics.add.sprite(69.5*32, 96, "SpriteHitBox").setSize(32, 128)//.body.setAllowGravity(false)//.setImmovable(true)
        this.feuHitBox = this.physics.add.sprite(135*32,16*32, "SpriteHitBox").setSize(64,64)
        this.SpriteFireBall = this.physics.add.group();
        this.physics.add.collider(this.CameraHitBox, sols);
        this.physics.add.collider(this.feuHitBox, this.bloc_cassable);
        this.physics.add.collider(this.player, sols);
        this.physics.add.collider(this.player, neige);
        this.physics.add.collider(this.player, this.bloc_cassable);
        this.physics.add.collider(this.player, this.piques, this.piquesKill, null, this)
        this.physics.add.overlap(this.player, this.eau_surface, this.waterKill, null, this)
        this.physics.add.overlap(this.player, this.CameraHitBox, this.cameraChange, null, this)
        this.physics.add.collider(this.stalactite, sols, this.casseStala, null, this)
        this.physics.add.collider(this.player, this.stalactite, this.stalaKill, null, this)





        this.physics.world.setBounds(0, 0, 140*32, 30*32);
        this.cameras.main.setBounds(this.cameraX1, this.cameraY1, this.cameraX2, this.cameraY2);
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
        this.player.setDepth(1);
        //camera
        this.cameras.main.setBounds(this.cameraX1, this.cameraY1, this.cameraX2, this.cameraY2);
        //camera


        
        if (this.clavier.I.isDown && this.mageFeu == false && this.canMageFeu ==true && this.appuyer == false) {
            this.mageFeu = true;
            this.player.anims.play("perso_feu", true)
        }

        if (this.clavier.E.isDown && this.CanBDF == true && this.mageFeu == true) {
            this.SpriteFireBall.create(this.player.x + 50, this.player.y, "SpriteFireBall").body.setAllowGravity(false);
            this.SpriteFireBall.setVelocityX(600);
            this.CanBDF = false;
            setTimeout(() => {
                this.CanBDF = true;
            }, 500);
        }

        if (this.clavier.A.isDown && this.IsGoingRight == false && this.dashCD1 == true && this.mageFeu == true) {
            this.IsGoingRight = false;
            this.player.setVelocityX(-900);
            this.player.setVelocityY(0);
            this.player.body.setAllowGravity(false)
            this.cristalBreak = true;
            setTimeout(() => {
                this.dashCD1 = false
                this.player.body.setAllowGravity(true)
                this.cristalBreak = false
            }, 200);

            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.dashCD1 = true
                },
            })
        }

        else if (this.clavier.A.isDown && this.IsGoingRight == true && this.dashCD1 == true && this.mageFeu == true) {
            this.IsGoingRight = true;
            this.player.setVelocityX(900);
            this.player.setVelocityY(0);
            this.player.body.setAllowGravity(false)
            this.cristalBreak = true;
            setTimeout(() => {
                this.dashCD1 = false
                this.player.body.setAllowGravity(true)
                this.cristalBreak = false
            }, 200);
        }



        else if (this.cursors.left.isDown) {
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


        if(this.clavier.I.isDown && this.physics.overlap(this.player, this.feuHitBox) && this.appuyer == false) {
            this.canMageFeu = true
            this.feu.getChildren()[0].setVisible(false)
            setTimeout(() => {
                this.bloc_cassable.getChildren()[0].destroy()
            }, 200);
        }

                this.stalactite.getChildren().forEach(stala => {
            if(this.player.x >= stala.x){
                stala.body.setAllowGravity(true)
            }});

        
            if (this.clavier.I.isDown) {
                this.appuyer = true
            }
            else {
                this.appuyer = false
            }



    }
    waterKill(player, water){
        player.setDepth(-1);
        this.player.setVelocityY(20)
        setTimeout(() => {
            player.setVelocityY(1000)
            this.scene.restart();
        }, 1500);

    }

    piquesKill(player, spikes){
        this.cameras.main.shake(200, 0.02)
        this.cameras.main.flash()
        setTimeout(() => {
            this.scene.restart();
        }, 200);

    }

    stalaKill(player, stala){
        this.cameras.main.shake(200, 0.02)
        this.cameras.main.flash()
        setTimeout(() => {
            this.scene.restart();
        }, 200);

    }

    cameraChange(player,camerahitbox){
        if(this.changeCam == false){
            console.log(this.cameraX1)
            this.cameraX1 = 69*32
            this.cameraX2 = 71  *32
            this.cameraY1 = 0
            this.cameraY2 = 20*32

            player.x = 71*32
            this.changeCam = true
        }

        else if(this.changeCam == true){
            console.log(this.cameraX1)
            this.cameraX1 = 0
            this.cameraX2 = 70*32
            this.cameraY1 = 0
            this.cameraY2 = 20*32
            player.x = 68*32
            this.changeCam = false
        }
    }

    casseStala(stala, sols){
        stala.destroy()
    }

}