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

        this.load.image("SpriteFireBall", "assets/SpriteFireBall.png")
    }

    create() {
        this.SpriteHitBox = this.physics.add.sprite(1230, 50, "SpriteHitBox").setSize(36, 288);

        this.add.image(800, 800, "background");

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

        this.SpriteFireBall = this.physics.add.group();

        this.SpriteHitBox.setCollideWorldBounds(true);
        this.SpriteHitBox.setImmovable(true);
        this.physics.add.collider(this.player, test);

        this.physics.world.setBounds(0, 0, 1280, 320);
        this.cameras.main.setBounds(0, 0, 1280, 320);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('A,D,SPACE,SHIFT,E');

        this.cristaux = this.physics.add.group();
        this.physics.add.collider(this.player, this.cristaux, this.BreakDash, null, this)
        this.physics.add.collider(this.SpriteFireBall, this.cristaux, this.BreakBDF, null, this);
        this.calque_cristaux = carteDuNiveau.getObjectLayer('cristaux');
        this.calque_cristaux.objects.forEach(calque_cristaux => {
            const POP = this.cristaux.create(calque_cristaux.x + 0, calque_cristaux.y - 48, "cristaux").setScale(2).body.setAllowGravity(false).setImmovable(true);
        });



    }

    update() {


        if (this.clavier.E.isDown && this.CanBDF == true){
            this.SpriteFireBall.create(this.player.x + 50, this.player.y, "SpriteFireBall").body.setAllowGravity(false);
            this.SpriteFireBall.setVelocityX(600);
            this.CanBDF = false;
            setTimeout(() => {
                this.CanBDF = true;
            }, 500);
        }


    

        if (this.clavier.SHIFT.isDown && this.IsMoving == true && this.IsGoingRight == false && this.dashCD1 == true) {
            
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

        else if (this.clavier.SHIFT.isDown && this.IsMoving == true && this.IsGoingRight == true && this.dashCD1 == true) {
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
        
        if (this.physics.overlap(this.player, this.SpriteHitBox)){
            
                this.player.body.setAllowGravity(false);
                this.player.setVelocityY(-150)
            
        }
        else{
            this.player.body.setAllowGravity(true);
        }
    }


    BreakDash(player, cristal) {
        if (this.cristalBreak == true) {
            cristal.destroy()
        }
        

    }
    BreakBDF(SpriteFireBall, cristal){
        console.log('jerome')
        this.vieCristal -= 1;
        if(this.vieCristal == 0){
            cristal.destroy()
        }
        SpriteFireBall.destroy()
    }
    

}

