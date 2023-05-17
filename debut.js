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
        this.load.image("enemyShoot", "assets/enemyShoot")
    }

    create() {
        
        this.ShrinkHitBox = this.physics.add.sprite(24*32,9.5*32,'SpriteHitBox').setSize(576, 32);
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
        this.physics.add.collider(this.SpriteFireBall, this.enemyShoot);
        this.calque_enemyShoot = carteDuNiveau.getObjectLayer('enemyShoot');
        this.calque_enemyShoot.objects.forEach(calque_enemyShoot => {
            const POP = this.enemyShoot.create(calque_enemyShoot.x + 0, calque_enemyShoot.y - 0, "enemyShoot").body.setAllowGravity(false).setImmovable(true);
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

        if(this.clavier.D.isDown){
        console.log(this. onPlant)
        }
        if (this.clavier.I.isDown && this.mageFeu == false && this.estPetit == false){
            this.mageFeu = true;
            this.mageEau = false;
            this.mageBase = false;
            this.mageNature = false;
            this.player.anims.play("perso_feu", true)
        }
        if (this.clavier.O.isDown && this.mageEau == false){
            this.mageFeu = false;
            this.mageEau = true;
            this.mageBase = false;
            this.mageNature = false;
            this.player.anims.play("perso_eau", true)
        }
        if (this.clavier.P.isDown && this.mageNature == false && this.estPetit == false){           
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
            if(this.plantSpawn >= 0){
                this.plante.getChildren()[this.plantSpawn].destroy()
                this.plantSpawn -= 1
            }
            this.plante.create(this.player.x, this.player.y + 38, "plante").setVelocityY(-100).body.setAllowGravity(false).setImmovable(true);
            this.plantSpawn += 1
            this.canPlant = false;
            setTimeout(() => {
                this.plante.setVelocityY(0);
                this.canPlant = true;
            }, 2000);
        }

        if (this.clavier.E.isDown && this.canPlant_mine == true && this.mageNature == true && this.player.body.blocked.down && this.onPlant == false && !this.physics.overlap(this.player, this.plante_mine)){
            if(this.plant_mineSpawn >= 0){
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




        if (this.clavier.A.isDown && this.IsMoving == true && this.IsGoingRight == false && this.dashCD1 == true && this.mageFeu == true) {

            this.IsGoingRight = false;
            this.IsMoving = true;
            this.player.setVelocityX(-900);
            this.player.setVelocityY(0);
            this.player.body.setAllowGravity(false)
            this.cristalBreak = true;
            setTimeout(() => {
                this.dashCD1 = false
                this.isDashing = true;
                this.player.body.setAllowGravity(true)
                this.cristalBreak = false
            }, 200);

            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.dashCD1 = true
                    this.isDashing = false
                },
            })
        }

        else if (this.clavier.A.isDown && this.IsMoving == true && this.IsGoingRight == true && this.dashCD1 == true && this.mageFeu == true) {
            this.IsGoingLeft = false;
            this.IsMoving = true;
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
        else if (this.clavier.E.isDown && this.estPetit == true && this.mageEau == true && !this.physics.overlap(this.player, this.ShrinkHitBox) && this.appuyer ==  false ) {
            this.player.y -= 1;
            this.player.setScale(1);
            this.player.setSize(64, 64)

                this.estPetit = false;
        }

        if(this.clavier.E.isDown){
            this.appuyer = true
        }
        else{
            this.appuyer = false
        }

        this.onPlant = false;
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
        }
        SpriteFireBall.destroy()
    }
    touchPlant(player, plante){
        this.onPlant = true;
    }



}

