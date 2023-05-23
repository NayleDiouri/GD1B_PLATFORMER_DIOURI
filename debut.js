class debut extends Phaser.Scene {
    constructor() {
        super("debut"); // mettre le meme nom que le nom de la classe
    }

    preload() {
        this.load.image("background", "assets/background.png");
        this.load.image("Phaser_assets", "assets/biome_glace.png");
        this.load.image("cristaux", "assets/cristaux_glace.png")
        this.load.image("SpriteHitBox", "assets/SpriteHitBox.png")
        this.load.tilemapTiledJSON("carte", "map_test.json");
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
    }

    create() {

        this.ShrinkHitBox = this.physics.add.sprite(24 * 32, 9.5 * 32, 'SpriteHitBox').setSize(576, 32);
        this.add.image(800, 800, "background");
        this.appuyer = false;
        //dash
        this.dashCD1 = true;
        this.IsMoving = false;
        this.IsGoingLeft = false;
        this.IsGoingRight = false;
        this.cristalBreak = false;
        this.isDashing = false;
        this.CanBDF = true;
        //dash

        //climb
        this.canClimb = false;
        //climb

        //BDF
        this.vieCristal = 3;
        //BDF
        //changement de taille
        this.estPetit = false;
        //changement de taille
        //plante
        this.canPlant = true;
        this.plantSpawn = -1;
        this.onPlant = false;
        //plante

        //plante_mine
        this.canPlant_mine = true;
        this.plant_mineSpawn = -3
        //plante_mine 

        //mages
        this.mageFeu = false;
        this.mageNature = false;
        this.mageEau = false;
        this.mageBase = true;
        //mages

        //enemyShoot
        this.enemyShootHp = 3;
        this.CanBdg = 3;
        this.nombreEnemy = 0;
        //enemyShoot

        //enemyRL
        this.enemyRLHp = 2;
        this.goL1 = true;
        this.goL2 = true;
        this.enemyDead1 = false;
        this.enemyDead2 = false;
        //enemyRL


        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "assets_glace",
            "Phaser_assets"
        );
        const test = carteDuNiveau.createLayer(
            "test",
            tileset
        );
        const mousse = carteDuNiveau.createLayer(
            "mousse",
            tileset
        );
        test.setCollisionByProperty({ estSolide: true });
        this.player = this.physics.add.sprite(50, 50, 'perso');
        this.player.setCollideWorldBounds(true);

        this.SpriteFireBall = this.physics.add.group();
        this.Bdg = this.physics.add.group();
        this.plante = this.physics.add.group();
        this.plante_mine = this.physics.add.group();

        this.ShrinkHitBox.body.setAllowGravity(false);

        this.physics.add.collider(this.player, test);
        this.physics.add.collider(this.player, this.plante, this.touchPlant, null, this)
        this.physics.add.collider(this.plante_mine, test)


        this.physics.world.setBounds(0, 0, 1280, 320);
        this.cameras.main.setBounds(0, 0, 1280, 320);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('A,D,SPACE,SHIFT,E,X,I,O,P');

        this.cristaux = this.physics.add.group();
        this.physics.add.collider(this.player, this.cristaux, this.BreakDash, null, this)
        this.physics.add.collider(this.SpriteFireBall, this.cristaux, this.BreakBDF, null, this);
        this.calque_cristaux = carteDuNiveau.getObjectLayer('cristaux');
        this.calque_cristaux.objects.forEach(calque_cristaux => {
            const POP = this.cristaux.create(calque_cristaux.x + 0, calque_cristaux.y - 48, "cristaux").setScale(2).body.setAllowGravity(false).setImmovable(true);
        });
        this.cascade = this.physics.add.group();
        this.calque_cascade = carteDuNiveau.getObjectLayer('cascade');
        this.calque_cascade.objects.forEach(calque_cascade => {
            const POP = this.cascade.create(calque_cascade.x + 0, calque_cascade.y - 160, "cascade").body.setAllowGravity(false).setImmovable(true);
        });
        this.enemyShoot = this.physics.add.group();
        this.physics.add.collider(this.player, this.enemyShoot)
        this.physics.add.collider(this.SpriteFireBall, this.enemyShoot, this.enemyShootKill, null, this);
        this.calque_enemyShoot = carteDuNiveau.getObjectLayer('enemyShoot');
        this.calque_enemyShoot.objects.forEach(calque_enemyShoot => {
            this.nombreEnemy += 1
            const POP = this.enemyShoot.create(calque_enemyShoot.x + 16, calque_enemyShoot.y - 16, "enemyShoot").body.setAllowGravity(false).setImmovable(true);
        });

        this.enemyRL = this.physics.add.group();
        this.physics.add.collider(this.player, this.enemyRL)
        this.physics.add.collider(this.SpriteFireBall, this.enemyRL, this.enemyRLKill, null, this)
        this.calque_enemyRL = carteDuNiveau.getObjectLayer('enemyRL');
        this.calque_enemyRL.objects.forEach(calque_enemyRL => {
            const POP = this.enemyRL.create(calque_enemyRL.x + 16, calque_enemyRL.y - 16, "enemyRL").body.setAllowGravity(false).setImmovable(true);
        });
        this.hitBoxL = this.physics.add.group();
        this.physics.add.collider(this.enemyRL, this.hitBoxL)
        this.calque_hitBoxL = carteDuNiveau.getObjectLayer('hitBoxL');
        this.calque_hitBoxL.objects.forEach(calque_hitBoxL => {
            const POP = this.hitBoxL.create(calque_hitBoxL.x + 16, calque_hitBoxL.y - 16, "SpriteHitBox").setSize(32, 64).body.setAllowGravity(false).setImmovable(true);
        });
        this.hitBoxR = this.physics.add.group();
        this.calque_hitBoxR = carteDuNiveau.getObjectLayer('hitBoxR');
        this.calque_hitBoxR.objects.forEach(calque_hitBoxR => {
            const POP = this.hitBoxR.create(calque_hitBoxR.x + 16, calque_hitBoxR.y - 16, "SpriteHitBox").setSize(32, 64).body.setAllowGravity(false).setImmovable(true);
        });
        this.enemyFollow = this.physics.add.group();
        this.physics.add.collider(this.enemyFollow, test)
        this.physics.add.collider(this.player, this.enemyFollow)
        this.physics.add.collider(this.cristaux, this.enemyFollow)
        this.calque_enemyFollow = carteDuNiveau.getObjectLayer('enemyFollow');
        this.calque_enemyFollow.objects.forEach(calque_enemyFollow => {
            const POP = this.enemyFollow.create(calque_enemyFollow.x + 16, calque_enemyFollow.y - 16, "enemyFollow").setCollideWorldBounds(true).body.setAllowGravity(true).setImmovable(false);
        });
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

    }

    update() {

        if (this.clavier.D.isDown) {
            console.log(this.onPlant)
        }
        if (this.clavier.I.isDown && this.mageFeu == false && this.estPetit == false) {
            this.mageFeu = true;
            this.mageEau = false;
            this.mageBase = false;
            this.mageNature = false;
            this.player.anims.play("perso_feu", true)
        }
        if (this.clavier.O.isDown && this.mageEau == false) {
            this.mageFeu = false;
            this.mageEau = true;
            this.mageBase = false;
            this.mageNature = false;
            this.player.anims.play("perso_eau", true)
        }
        if (this.clavier.P.isDown && this.mageNature == false && this.estPetit == false) {
            this.mageFeu = false;
            this.mageEau = false;
            this.mageBase = false;
            this.mageNature = true;
            this.player.anims.play("perso_nature", true)
        }

        if (this.clavier.E.isDown && this.CanBDF == true && this.mageFeu == true) {
            this.SpriteFireBall.create(this.player.x + 50, this.player.y, "SpriteFireBall").body.setAllowGravity(false);
            this.SpriteFireBall.setVelocityX(600);
            this.CanBDF = false;
            setTimeout(() => {
                this.CanBDF = true;
            }, 500);
        }

        if (this.clavier.A.isDown && this.canPlant == true && this.mageNature == true && this.player.body.blocked.down && this.onPlant == false) {
            if (this.plantSpawn >= 0) {
                this.plante.getChildren()[this.plantSpawn].destroy()
                this.plantSpawn -= 1
            }
            this.plante.create(this.player.x, this.player.y + 38, "plante").setVelocityY(-100).body.setAllowGravity(false).setImmovable(true);
            this.plantSpawn += 1
            this.canPlant = false;
            setTimeout(() => {
                this.plante.setVelocityY(0);
                this.canPlant = true;
            }, 1200);
        }

        if (this.clavier.E.isDown && this.canPlant_mine == true && this.mageNature == true && this.player.body.blocked.down && this.onPlant == false && !this.physics.overlap(this.player, this.plante_mine)) {
            if (this.plant_mineSpawn >= 0) {
                this.plante_mine.getChildren()[this.plant_mineSpawn].destroy()
                this.plant_mineSpawn -= 1
            }
            this.plante_mine.create(this.player.x, this.player.y, "plante_mine").body.setImmovable(true);
            this.plant_mineSpawn += 1
            this.canPlant_mine = false;
            setTimeout(() => {
                this.canPlant_mine = true;
            }, 1500);
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

            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.dashCD1 = true
                },
            })

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

        if (this.clavier.A.isDown && this.physics.overlap(this.player, this.cascade) && this.mageEau == true) {

            this.player.body.setAllowGravity(false);
            this.player.setVelocityY(-150)

        }
        else {
            this.player.body.setAllowGravity(true);
        }
        if (this.clavier.E.isDown && this.estPetit == false && this.mageEau == true && this.appuyer == false) {
            this.player.y += 1;
            this.player.setScale(0.5);
            this.player.setSize(128, 64);

            this.estPetit = true;
        }
        else if (this.clavier.E.isDown && this.estPetit == true && this.mageEau == true && !this.physics.overlap(this.player, this.ShrinkHitBox) && this.appuyer == false) {
            this.player.y -= 1;
            this.player.setScale(1);
            this.player.setSize(64, 64)

            this.estPetit = false;
        }

        if (this.clavier.E.isDown) {
            this.appuyer = true
        }
        else {
            this.appuyer = false
        }

        this.onPlant = false;
        this.enemyShoot.getChildren().forEach(enemy => {
            if (this.CanBdg > 0) {

                if (this.player.x > enemy.x) {
                    this.Bdg.create(enemy.x, enemy.y, "Bdg").setVelocityX(400).body.setAllowGravity(false)
                    this.CanBdg -= 1;
                }
                else if (this.player.x < enemy.x) {
                    this.Bdg.create(enemy.x, enemy.y, "Bdg").setVelocityX(-400).body.setAllowGravity(false)
                    this.CanBdg -= 1;
                }
                if (this.CanBdg == 0) {
                    setTimeout(() => {
                        this.CanBdg = this.nombreEnemy

                    }, 2000);
                }
            }
        });
        //enemyRL----------------------------------------------------------------------------------------------------------

        if(this.enemyDead1 == false){
            if(this.enemyRL.getChildren()[0] == undefined){
                this.enemyDead1 = true;
            }
            if (this.goL1 == true && this.enemyRL.getChildren()[0]) {
                this.enemyRL.getChildren()[0].setVelocityX(-50)
            }
            else if(this.goL1 == false && this.enemyRL.getChildren()[0]) {
                this.enemyRL.getChildren()[0].setVelocityX(50)
            }
            if (this.enemyRL.getChildren()[0] && this.physics.overlap(this.enemyRL.getChildren()[0], this.hitBoxL)) {
                this.goL1 = false
            }
            if (this.enemyRL.getChildren()[0] && this.physics.overlap(this.enemyRL.getChildren()[0], this.hitBoxR)) {
                this.goL1 = true
            }
        }
        if (this.enemyDead2 == false) {
            if (this.enemyRL.getChildren()[1] == undefined) {
                this.enemyDead2 = true;
            }
            if (this.goL2 == true && this.enemyRL.getChildren()[1]) {
                this.enemyRL.getChildren()[1].setVelocityX(-50)
            }
            else if (this.goL2 == false && this.enemyRL.getChildren()[1]) {
                this.enemyRL.getChildren()[1].setVelocityX(50)
            }
            if (this.enemyRL.getChildren()[1] && this.physics.overlap(this.enemyRL.getChildren()[1], this.hitBoxL)) {
                this.goL2 = false
            }
            if (this.enemyRL.getChildren()[1] && this.physics.overlap(this.enemyRL.getChildren()[1], this.hitBoxR)) {
                this.goL2 = true
            }
        }
        //enemyRL----------------------------------------------------------------------------------------------------------
        this.enemyFollow.getChildren().forEach(enemy => {
        if (enemy.x < this.player.x) {
            enemy.setVelocityX(50);
        }

        if (enemy.x > this.player.x) {
            enemy.setVelocityX(-50);
        }
    });
    }


    BreakDash(player, cristal) {
        if (this.cristalBreak == true) {
            cristal.destroy()
        }


    }
    BreakBDF(SpriteFireBall, cristal) {
        this.vieCristal -= 1;
        if (this.vieCristal == 0) {
            cristal.destroy()
            this.vieCristal = 3
        }
        SpriteFireBall.destroy()
    }
    touchPlant(player, plante) {
        this.onPlant = true;
    }

    enemyShootKill(SpriteFireBall, enemy) {
        this.enemyShootHp -= 1;
        if (this.enemyShootHp == 0) {
            enemy.destroy()
            this.enemyShootHp = 3
            this.nombreEnemy -= 1
        }
        SpriteFireBall.destroy()
    }

    enemyRLKill(SpriteFireBall, enemy) {
        this.enemyRLHp -= 1;
        if (this.enemyRLHp == 0) {
            enemy.destroy()
            this.enemyRLHp = 2
        }
        SpriteFireBall.destroy()
    }





}

