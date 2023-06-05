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
        this.load.image("feu", "assets/feu.png")
        this.load.image("enemyRL", "assets/enemyRL.png")
        this.load.image("enemyFollow", "assets/enemyFollow.png")
        this.load.image("eau_surface", "assets/eau_surface.png")
        this.load.image("eau_profondeur", "assets/eau_profondeur.png")
        this.load.image("piques", "assets/piques.png")
        this.load.image("lumieres", "assets/lumieres.png")
        this.load.image("stalactite", "assets/stalactite.png")
        this.load.image("bloc_cassable", "assets/bloc_cassable.png")
        this.load.image("bigLumiere", "assets/bigLumiere.png")
        this.load.image("piques2", "assets/piques2.png")
        this.load.image("ronces", "assets/ronces.png")
        this.load.image("tronc", "assets/tronc.png")
        this.load.image("tronc_base", "assets/tronc_base.png")
        this.load.image("pilier_bois", "assets/pilier_bois.png")
        this.load.image("eau", "assets/eau.png")
        this.load.image("pilier_plante", "assets/pilier_plante.png")
        this.load.image("medaille_plante", "assets/medaille_plante.png")
        this.load.spritesheet('anims_feu', 'assets/anims_feu.png',
            { frameWidth: 68, frameHeight: 96 });
        this.load.spritesheet('anims_eau', 'assets/anims_eau.png',
            { frameWidth: 68, frameHeight: 96 });
        this.load.spritesheet('anims_plante', 'assets/anims_plante.png',
            { frameWidth: 68, frameHeight: 96 });
        this.load.spritesheet('anims_base', 'assets/anims_base.png',
            { frameWidth: 68, frameHeight: 96 });
    }
    
    

    create() {
        this.fond_1 = this.add.image(448, 224, "fond_1");
        this.fond_2 = this.add.image(1000, 250, "fond_2");

        this.cameraY1 = 0
        this.cameraY2 = 20 * 32
        this.cameraX1 = 0
        this.cameraX2 = 70 * 32
        this.changeCam = false
        this.changeCam2 = false


        this.mageBase = true;

        //mageFeu
        this.canMageFeu = true;
        this.mageFeu = false;
        this.IsGoingRight = false;
        this.dashCD1 = true;
        this.cristalBreak = false;
        this.CanBDF = true;
        this.vieCristal = 3;
        this.vieRonces = 2;
        this.vieTroncBase = 3;
        //mageFeu

        //mageEau
        this.canMageEau = true;
        this.estPetit = false;
        this.canClimb = false;
        this.mageEau = false;
        //mageEau

        //magePlante
        this.canMagePlante = false;
        this.magePlante = false;
        this.canPlant = true;
        this.plantSpawn = -1;
        this.onPlant = false;
        this.canPlant_mine = true;
        this.plant_mineSpawn = -3
        //magePlante

        //enemyRL
        this.enemyRLHp = 2;
        this.goL1 = true;
        this.enemyDead1 = false;
        this.goL2 = true;
        this.enemyDead2 = false;
        this.goL3 = true;
        this.enemyDead3 = false;
        //enemyRL

        //enemyShoot
        this.enemyShootHp = 3;
        this.CanBdg = 1;
        this.nombreEnemy = 0;
        //enemyShoot

        //playerSpawn
        //this.playerX = 4 * 32
        //this.playerY = 16 * 32
        //this.playerX = 1 * 32
        //this.playerY = 25 * 32
        this.playerX = 140 * 32
        this.playerY = 40 * 32

        //playerSpawn

        const carteDuNiveau = this.add.tilemap("map_glace");
        const tileset = carteDuNiveau.addTilesetImage(
            "assets_glace",
            "Phaser_assets"
        );
        const fond = carteDuNiveau.createLayer(
            "fond",
            tileset
        );
        this.eau_surface = this.physics.add.group();
        this.calque_eau_surface = carteDuNiveau.getObjectLayer('eau_surface');
        this.calque_eau_surface.objects.forEach(calque_eau_surface => {
            const POP = this.eau_surface.create(calque_eau_surface.x, calque_eau_surface.y - 16, "eau_surface").body.setAllowGravity(false).setImmovable(true);
        });
        this.eau_profondeur = this.physics.add.group();
        this.calque_eau_profondeur = carteDuNiveau.getObjectLayer('eau_profondeur');
        this.calque_eau_profondeur.objects.forEach(calque_eau_profondeur => {
            const POP = this.eau_profondeur.create(calque_eau_profondeur.x + 16, calque_eau_profondeur.y - 16, "eau_profondeur").body.setAllowGravity(false).setImmovable(true);
        });
        this.piques = this.physics.add.group();
        this.calque_piques = carteDuNiveau.getObjectLayer('piques');
        this.calque_piques.objects.forEach(calque_piques => {
            const POP = this.piques.create(calque_piques.x + 16, calque_piques.y - 3, "piques").body.setAllowGravity(false).setImmovable(true);
        });
        this.piques2 = this.physics.add.group();
        this.calque_piques2 = carteDuNiveau.getObjectLayer('piques2');
        this.calque_piques2.objects.forEach(calque_piques2 => {
            const POP = this.piques2.create(calque_piques2.x + 16, calque_piques2.y - 3, "piques2").body.setAllowGravity(false).setImmovable(true);
        });
        this.lumieres = this.physics.add.group();
        this.calque_lumieres = carteDuNiveau.getObjectLayer('lumieres');
        this.calque_lumieres.objects.forEach(calque_lumieres => {
            const POP = this.lumieres.create(calque_lumieres.x + 16, calque_lumieres.y - 6, "lumieres").body.setAllowGravity(false).setImmovable(true);
        });
        this.stalactite = this.physics.add.group();
        this.calque_stalactite = carteDuNiveau.getObjectLayer('stalactite');
        this.calque_stalactite.objects.forEach(calque_stalactite => {
            const POP = this.stalactite.create(calque_stalactite.x + 16, calque_stalactite.y - 16, "stalactite").body.setAllowGravity(false);
        });
        this.stalactite2 = this.physics.add.group();
        this.calque_stalactite2 = carteDuNiveau.getObjectLayer('stalactite2');
        this.calque_stalactite2.objects.forEach(calque_stalactite2 => {
            const POP = this.stalactite2.create(calque_stalactite2.x + 16, calque_stalactite2.y - 16, "stalactite").body.setAllowGravity(false);
        });

        this.pilier_glace = this.physics.add.group();
        this.calque_pilier_glace = carteDuNiveau.getObjectLayer('pilier');
        this.calque_pilier_glace.objects.forEach(calque_pilier_glace => {
            const POP = this.pilier_glace.create(calque_pilier_glace.x + 16, calque_pilier_glace.y - 24, "pilier_glace").body.setAllowGravity(false).setImmovable(true);
        });
        this.pilier_bois = this.physics.add.group();
        this.calque_pilier_bois = carteDuNiveau.getObjectLayer('pilier2');
        this.calque_pilier_bois.objects.forEach(calque_pilier_bois => {
            const POP = this.pilier_bois.create(calque_pilier_bois.x + 16, calque_pilier_bois.y - 40, "pilier_bois").body.setAllowGravity(false).setImmovable(true);
        });
        this.pilier_plante = this.physics.add.group();
        this.calque_pilier_plante = carteDuNiveau.getObjectLayer('pilier_plante');
        this.calque_pilier_plante.objects.forEach(calque_pilier_plante => {
            const POP = this.pilier_plante.create(calque_pilier_plante.x + 16, calque_pilier_plante.y - 40, "pilier_plante").body.setAllowGravity(false).setImmovable(true);
        });
        this.feu = this.physics.add.group();
        this.calque_feu = carteDuNiveau.getObjectLayer('feu');
        this.calque_feu.objects.forEach(calque_feu => {
            const POP = this.feu.create(calque_feu.x + 16, calque_feu.y - 22, "feu").body.setAllowGravity(false);
        });
        this.eau = this.physics.add.group();
        this.calque_eau = carteDuNiveau.getObjectLayer('eau');
        this.calque_eau.objects.forEach(calque_eau => {
            const POP = this.eau.create(calque_eau.x + 16, calque_eau.y - 12, "eau").body.setAllowGravity(false);
        });
        this.medaille_plante = this.physics.add.group();
        this.calque_plante = carteDuNiveau.getObjectLayer('medaille_plante');
        this.calque_plante.objects.forEach(calque_plante => {
            const POP = this.medaille_plante.create(calque_plante.x + 16, calque_plante.y - 12, "medaille_plante").body.setAllowGravity(false);
        });
        this.bloc_cassable = this.physics.add.group();
        this.calque_bloc_cassable = carteDuNiveau.getObjectLayer('solCassable');
        this.calque_bloc_cassable.objects.forEach(calque_bloc_cassable => {
            const POP = this.bloc_cassable.create(calque_bloc_cassable.x + 16, calque_bloc_cassable.y - 16, "bloc_cassable").body.setAllowGravity(false).setImmovable(true);
        });

        this.cristaux = this.physics.add.group();
        this.calque_cristaux = carteDuNiveau.getObjectLayer('cristaux');
        this.calque_cristaux.objects.forEach(calque_cristaux => {
            const POP = this.cristaux.create(calque_cristaux.x + 0, calque_cristaux.y - 48, "cristaux").setScale(2).body.setAllowGravity(false).setImmovable(true);
        });

        this.enemyRL = this.physics.add.group();
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

        this.enemyShoot = this.physics.add.group();

        this.calque_enemyShoot = carteDuNiveau.getObjectLayer('enemyShoot');
        this.calque_enemyShoot.objects.forEach(calque_enemyShoot => {
            this.nombreEnemy += 1
            const POP = this.enemyShoot.create(calque_enemyShoot.x + 16, calque_enemyShoot.y - 16, "enemyShoot").body.setAllowGravity(false).setImmovable(true);
        });

        this.checkPoint = this.physics.add.group();
        this.calque_checkPoint = carteDuNiveau.getObjectLayer('checkPoint');
        this.calque_checkPoint.objects.forEach(calque_checkPoint => {
            const POP = this.checkPoint.create(calque_checkPoint.x + 16, calque_checkPoint.y - 16, "SpriteHitBox").setSize(32, 256).body.setAllowGravity(false).setImmovable(true);
        });
        this.ronces = this.physics.add.group();
        this.calque_ronces = carteDuNiveau.getObjectLayer('ronces');
        this.calque_ronces.objects.forEach(calque_ronces => {
            const POP = this.ronces.create(calque_ronces.x + 16, calque_ronces.y - 84, "ronces").setScale(1.6).body.setAllowGravity(false).setImmovable(true);
        });
        this.tronc = this.physics.add.group();
        this.calque_tronc = carteDuNiveau.getObjectLayer('tronc');
        this.calque_tronc.objects.forEach(calque_tronc => {
            const POP = this.tronc.create(calque_tronc.x + 16, calque_tronc.y - 244, "tronc").body.setAllowGravity(false).setImmovable(true)
        });
        this.tronc_base = this.physics.add.group();
        this.calque_tronc_base = carteDuNiveau.getObjectLayer('tronc_base');
        this.calque_tronc_base.objects.forEach(calque_tronc_base => {
            const POP = this.tronc_base.create(calque_tronc_base.x + 16, calque_tronc_base.y - 26, "tronc_base").body.setAllowGravity(false).setImmovable(true)
        });
        this.cascade = this.physics.add.group();
        this.calque_cascade = carteDuNiveau.getObjectLayer('cascade');
        this.calque_cascade.objects.forEach(calque_cascade => {
            const POP = this.cascade.create(calque_cascade.x + 0, calque_cascade.y - 160, "cascade").body.setAllowGravity(false).setImmovable(true);
        });
        this.ShrinkHitBox = this.physics.add.group();
        this.calque_ShrinkHitBox = carteDuNiveau.getObjectLayer('ShrinkHitBox');
        this.calque_ShrinkHitBox.objects.forEach(calque_ShrinkHitBox => {
            const POP = this.ShrinkHitBox.create(calque_ShrinkHitBox.x + 16, calque_ShrinkHitBox.y - 16, "SpriteHitBox").body.setAllowGravity(false).setImmovable(true);
        });

        const mousse = carteDuNiveau.createLayer(
            "mousse",
            tileset
        );
        const neige = carteDuNiveau.createLayer(
            "neige",
            tileset
        );
        const sols = carteDuNiveau.createLayer(
            "sols",
            tileset
        );
        this.player = this.physics.add.sprite(this.playerX, this.playerY, 'perso');
        this.player.setCollideWorldBounds(true);
        this.player.setSize(32, 52).setOffset(14, 8)

        neige.setCollisionByExclusion(-1, true);
        sols.setCollisionByExclusion(-1, true);

        this.CameraHitBox1 = this.physics.add.sprite(69.5 * 32, 96, "SpriteHitBox").setSize(32, 128)//.body.setAllowGravity(false)//.setImmovable(true)
        this.CameraHitBox2 = this.physics.add.sprite(133.5 * 32, 19 * 32, "SpriteHitBox").setSize(250, 32)//.body.setAllowGravity(false)//.setImmovable(true)
        this.feuHitBox = this.physics.add.sprite(135 * 32, 16 * 32, "SpriteHitBox").setSize(64, 64)
        this.eauHitBox = this.physics.add.sprite(134 * 32, 48 * 32, "SpriteHitBox").setSize(64, 64)
        this.planteHitBox = this.physics.add.sprite(277 * 32, 35 * 32, "SpriteHitBox").setSize(64, 64)
        this.lumiereHitbox = this.physics.add.sprite(0.75 * 32, 25 * 32, "bigLumiere").setScale(1.15)
        this.CameraHitBox3 = this.physics.add.sprite(140 * 32, 40 * 32, "SpriteHitBox").setSize(32, 128)
        this.SpriteFireBall = this.physics.add.group();
        this.Bdg = this.physics.add.group();
        this.plante = this.physics.add.group();
        this.plante_mine = this.physics.add.group();
        this.physics.add.collider(this.CameraHitBox1, sols);
        this.physics.add.collider(this.CameraHitBox2, sols);
        this.physics.add.collider(this.lumiereHitbox, sols);
        this.physics.add.collider(this.CameraHitBox3, sols);
        this.physics.add.collider(this.player, this.plante, this.touchPlant, null, this)
        this.physics.add.collider(this.plante_mine, sols)
        this.physics.add.collider(this.feuHitBox, this.bloc_cassable);
        this.physics.add.collider(this.eauHitBox, sols);
        this.physics.add.collider(this.planteHitBox, sols);
        this.physics.add.collider(this.player, sols, this.touchGround, null, this);
        this.physics.add.collider(this.player, neige);
        this.physics.add.collider(this.player, this.tronc);
        this.physics.add.collider(this.player, this.tronc_base);
        this.physics.add.collider(this.player, this.ronces, this.piquesKill, null, this);
        this.physics.add.collider(this.player, this.bloc_cassable);
        this.physics.add.collider(this.player, this.piques, this.piquesKill, null, this)
        this.physics.add.collider(this.player, this.piques2, this.piquesKill, null, this)
        this.physics.add.overlap(this.player, this.eau_surface, this.waterKill, null, this)
        this.physics.add.overlap(this.player, this.CameraHitBox1, this.cameraChange1, null, this)
        this.physics.add.overlap(this.player, this.CameraHitBox2, this.cameraChange2, null, this)
        this.physics.add.overlap(this.player, this.lumiereHitbox, this.cameraChange3, null, this)
        this.physics.add.overlap(this.player, this.CameraHitBox3, this.cameraChange4, null, this)
        this.physics.add.collider(this.stalactite, sols, this.casseStala, null, this)
        this.physics.add.collider(this.stalactite2, sols, this.casseStala, null, this)
        this.physics.add.collider(this.player, this.stalactite, this.stalaKill, null, this)
        this.physics.add.collider(this.player, this.stalactite2, this.stalaKill, null, this)
        this.physics.add.collider(this.player, this.cristaux, this.BreakDash, null, this)
        this.physics.add.collider(this.SpriteFireBall, this.cristaux, this.BreakBDF, null, this);
        this.physics.add.collider(this.SpriteFireBall, this.ronces, this.BreakRonces, null, this);
        this.physics.add.collider(this.player, this.enemyRL)
        this.physics.add.collider(this.SpriteFireBall, this.enemyRL, this.enemyRLKill, null, this)
        this.physics.add.collider(this.player, this.pilier_glace)
        this.physics.add.collider(this.player, this.pilier_bois)
        this.physics.add.collider(this.player, this.pilier_plante)
        this.physics.add.collider(this.player, this.enemyShoot)
        this.physics.add.collider(this.SpriteFireBall, this.enemyShoot, this.enemyShootKill, null, this);
        this.physics.add.collider(this.player, this.Bdg, this.breakBDG, null, this);
        this.physics.add.collider(sols, this.Bdg, this.breakBDGSols, null, this);
        this.physics.add.collider(this.cristaux, this.Bdg, this.breakBDG, null, this);
        this.physics.add.collider(this.SpriteFireBall, this.tronc_base, this.breakTroncBase1, null, this)
        this.physics.add.collider(this.tronc, this.tronc_base)
        this.physics.add.collider(this.tronc_base, sols)
        this.physics.add.collider(this.tronc, sols)





        this.physics.world.setBounds(0, 0, 280 * 32, 52 * 32);
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
        this.anims.create({
            key: 'move_feu',
            frames: this.anims.generateFrameNumbers('anims_feu', { start: 12, end: 19 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'jump_feu',
            frames: this.anims.generateFrameNumbers('anims_feu', { start: 0, end: 11 }),
            frameRate: 12,
        });
        this.anims.create({
            key: 'move_eau',
            frames: this.anims.generateFrameNumbers('anims_eau', { start: 12, end: 19 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'jump_eau',
            frames: this.anims.generateFrameNumbers('anims_eau', { start: 0, end: 11 }),
            frameRate: 12,
        });
        this.anims.create({
            key: 'move_base',
            frames: this.anims.generateFrameNumbers('anims_base', { start: 12, end: 19 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'jump_base',
            frames: this.anims.generateFrameNumbers('anims_base', { start: 0, end: 11 }),
            frameRate: 12,
        });
        this.anims.create({
            key: 'move_plante',
            frames: this.anims.generateFrameNumbers('anims_plante', { start: 12, end: 19 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'jump_plante',
            frames: this.anims.generateFrameNumbers('anims_plante', { start: 0, end: 11 }),
            frameRate: 12,
        });
        this.fond_1.setScrollFactor(0).setDepth(-3)
        this.fond_2.setScrollFactor(0.25).setDepth(-2)

    }

    update() {
        //camera
        this.cameras.main.setBounds(this.cameraX1, this.cameraY1, this.cameraX2, this.cameraY2);
        //camera




        if (this.clavier.I.isDown && this.estPetit == false && this.mageFeu == false && this.canMageFeu == true && this.appuyer == false) {
            this.mageFeu = true;
            this.mageEau = false;
            this.magePlante = false;
            this.mageBase = false;

            this.player.anims.play("move_feu", true)

        }
        if (this.clavier.O.isDown && this.mageEau == false && this.canMageEau == true && this.appuyer2 == false) {
            this.mageFeu = false;
            this.mageEau = true;
            this.magePlante = false;
            this.mageBase = false;

            this.player.anims.play("move_eau", true)

        }

        if (this.clavier.P.isDown && this.magePlante == false && this.canMagePlante == true && this.estPetit == false && this.appuyer4 == false) {
            this.mageFeu = false;
            this.mageEau = false;
            this.magePlante = true;
            this.mageBase = false;

            this.player.anims.play("move_plante", true)
        }

        if (this.clavier.A.isDown && this.canPlant == true && this.magePlante == true && this.player.body.blocked.down && this.onPlant == false) {
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

        if (this.clavier.E.isDown && this.canPlant_mine == true && this.magePlante == true && this.player.body.blocked.down && this.onPlant == false && !this.physics.overlap(this.player, this.plante_mine)) {
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

        if (this.clavier.E.isDown && this.CanBDF == true && this.mageFeu == true && this.IsGoingRight == false) {
            this.SpriteFireBall.create(this.player.x - 20, this.player.y, "SpriteFireBall").setVelocityX(-600).body.setAllowGravity(false);

            this.CanBDF = false;
            setTimeout(() => {
                this.CanBDF = true;
            }, 500);
            this.time.addEvent({
                delay: 500, callback: () => {
                    this.SpriteFireBall.getChildren()[0].destroy()
                },
            })
        }

        else if (this.clavier.E.isDown && this.CanBDF == true && this.mageFeu == true && this.IsGoingRight == true) {
            this.SpriteFireBall.create(this.player.x + 20, this.player.y, "SpriteFireBall").setVelocityX(600).body.setAllowGravity(false);
            this.CanBDF = false;
            setTimeout(() => {
                this.CanBDF = true;
            }, 500);
            this.time.addEvent({
                delay: 500, callback: () => {
                    this.SpriteFireBall.getChildren()[0].destroy()
                },
            })
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
            if (this.IsGoingRight == true) {
                this.player.x -= 8
            }
            this.IsGoingRight = false;
            this.player.setFlip(true, false)
            this.player.setOffset(25, 26)
            if(this.player.body.onFloor() && this.mageBase == true){
                this.player.anims.play("move_base", true)
            }
            if(this.player.body.onFloor() && this.mageFeu == true){
                this.player.anims.play("move_feu", true)
            }
            if(this.player.body.onFloor() && this.mageEau == true){
                this.player.anims.play("move_eau", true)
            }
            if(this.player.body.onFloor() && this.magePlante == true){
                this.player.anims.play("move_plante", true)
            }
            this.player.setVelocityX(-200);
        }

        else if (this.cursors.right.isDown) {
            if (this.IsGoingRight == false) {
                this.player.x += 8
            }
            this.IsGoingRight = true;
            this.player.setFlip(false, false)
            this.player.setOffset(10, 26)
            if(this.player.body.onFloor() && this.mageBase == true){
                this.player.anims.play("move_base", true)
            }
            if(this.player.body.onFloor() && this.mageFeu == true){
                this.player.anims.play("move_feu", true)
            }
            if(this.player.body.onFloor() && this.mageEau == true){
                this.player.anims.play("move_eau", true)
            }
            if(this.player.body.onFloor() && this.magePlante == true){
                this.player.anims.play("move_plante", true)
            }
            this.player.setVelocityX(200);
            
        }

        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            if(this.IsGoingRight == true){this.player.setOffset(10, 30)}
            if(this.IsGoingRight == true){this.player.setOffset(10, 30)}
            this.player.setVelocityY(-380);
            if(this.mageBase == true){
                this.player.anims.play("jump_base", true)
            }
            if(this.mageFeu == true){
                this.player.anims.play("jump_feu", true)
            }
            if(this.mageEau == true){
                this.player.anims.play("jump_eau", true)
            }
            if(this.magePlante == true){
                this.player.anims.play("jump_plante", true)
            }

        }

        if (this.clavier.A.isDown && this.physics.overlap(this.player, this.cascade) && this.mageEau == true) {

            this.player.body.setAllowGravity(false);
            this.player.setVelocityY(-150)
            this.player.setAlpha(0.5)

        }
        else {
            this.player.body.setAllowGravity(true);
            this.player.setAlpha(1)
        }

        if (this.clavier.E.isDown && this.estPetit == false && this.mageEau == true && this.appuyer3 == false) {
            this.player.y += 1;
            this.player.setScale(0.5);
            this.player.setSize(64, 64).setOffset(-10, 8)

            this.estPetit = true;
        }
        else if (this.clavier.E.isDown && this.estPetit == true && this.mageEau == true && !this.physics.overlap(this.player, this.ShrinkHitBox) && this.appuyer3 == false) {
            this.player.y -= 6;
            this.player.setScale(1);
            this.player.setSize(32, 48).setOffset(10, 30)

            this.estPetit = false;
        }


        if (this.clavier.I.isDown && this.physics.overlap(this.player, this.feuHitBox) && this.appuyer == false) {
            this.canMageFeu = true
            this.feu.getChildren()[0].setVisible(false)
            this.time.addEvent({
                delay: 200, callback: () => {
                    this.bloc_cassable.getChildren()[0].body.setAllowGravity(true)
                },
            })
        }

        if (this.clavier.O.isDown && this.physics.overlap(this.player, this.eauHitBox) && this.appuyer2 == false) {
            this.canMageEau = true
            this.eau.getChildren()[0].setVisible(false)
            this.time.addEvent({
                delay: 200, callback: () => {
                    this.pilier_bois.getChildren()[0].setVisible(false).body.setAllowGravity(true)
                },
            })
        }

        if (this.clavier.P.isDown && this.physics.overlap(this.player, this.planteHitBox) && this.appuyer4 == false) {
            this.canMagePlante = true
            this.medaille_plante.getChildren()[0].setVisible(false)
        }

        this.stalactite.getChildren().forEach(stala => {
            if (this.player.x >= stala.x && this.player.y >= stala.y) {
                stala.body.setAllowGravity(true)
            }
        });

        this.stalactite2.getChildren().forEach(stala2 => {
            if (this.player.x <= stala2.x && this.player.y >= stala2.y) {
                stala2.body.setAllowGravity(true)
            }
        });


        if (this.clavier.I.isDown) {
            this.appuyer = true
        }
        else {
            this.appuyer = false
        }

        if (this.clavier.O.isDown) {
            this.appuyer2 = true
        }
        else {
            this.appuyer2 = false
        }

        if (this.clavier.E.isDown) {
            this.appuyer3 = true
        }
        else {
            this.appuyer3 = false
        }

        if (this.clavier.P.isDown) {
            this.appuyer4 = true
        }
        else {
            this.appuyer4 = false
        }

        //enemyRL

        if (this.enemyDead1 == false) {
            if (this.enemyRL.getChildren()[0] == undefined) {
                this.enemyDead1 = true;
            }
            if (this.goL1 == true && this.enemyRL.getChildren()[0]) {
                this.enemyRL.getChildren()[0].setVelocityX(-50)
            }
            else if (this.goL1 == false && this.enemyRL.getChildren()[0]) {
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

        if (this.enemyDead3 == false) {
            if (this.enemyRL.getChildren()[2] == undefined) {
                this.enemyDead2 = true;
            }
            if (this.goL3 == true && this.enemyRL.getChildren()[2]) {
                this.enemyRL.getChildren()[2].setVelocityX(-50)
            }
            else if (this.goL3 == false && this.enemyRL.getChildren()[2]) {
                this.enemyRL.getChildren()[2].setVelocityX(50)
            }
            if (this.enemyRL.getChildren()[2] && this.physics.overlap(this.enemyRL.getChildren()[2], this.hitBoxL)) {
                this.goL3 = false
            }
            if (this.enemyRL.getChildren()[2] && this.physics.overlap(this.enemyRL.getChildren()[2], this.hitBoxR)) {
                this.goL3 = true
            }
        }

        //enemyRL

        //enemyShoot
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
        //enemyShoot
        //checkPoint
        this.checkPoint.getChildren().forEach(check => {
            this.physics.overlap(this.player, check, this.playerRespawn, null, this)
        });
        //checkPoint



    }
    waterKill(player, water) {
        if (this.mageEau == false) {
            player.setDepth(-1);
            this.time.addEvent({
                delay: 200, callback: () => {
                    player.x = this.playerX
                    player.y = this.playerY
                    player.setDepth(1)
                },
            })
        }

    }

    piquesKill(player, spikes) {
        this.cameras.main.shake(200, 0.02)
        this.cameras.main.flash()
        this.time.addEvent({
            delay: 200, callback: () => {
                player.x = this.playerX
                player.y = this.playerY
            },
        })

    }

    stalaKill(player, stala) {
        this.cameras.main.shake(200, 0.02)
        this.cameras.main.flash()
        this.time.addEvent({
            delay: 200, callback: () => {
                player.x = this.playerX
                player.y = this.playerY
            },
        })

    }

    cameraChange1(player, camerahitbox) {
        if (this.changeCam == false) {
            console.log(this.cameraX1)
            this.cameraX1 = 69 * 32
            this.cameraX2 = 71 * 32
            this.cameraY1 = 0
            this.cameraY2 = 20 * 32

            player.x = 71 * 32
            this.changeCam = true
        }

        else if (this.changeCam == true) {
            console.log(this.cameraX1)
            this.cameraX1 = 0
            this.cameraX2 = 70 * 32
            this.cameraY1 = 0
            this.cameraY2 = 20 * 32
            player.x = 68 * 32
            this.changeCam = false
        }
    }
    cameraChange2(player, camerahitbox) {
        console.log(this.cameraX1)
        this.cameraX1 = 0
        this.cameraX2 = 140 * 32
        this.cameraY1 = 20 * 32
        this.cameraY2 = 10 * 32
    }

    cameraChange3(player, camerahitbox) {
        this.cameras.main.flash()
        this.time.addEvent({
            delay: 200, callback: () => {
                this.cameraX1 = 0
                this.cameraX2 = 140 * 32
                this.cameraY1 = 32 * 32
                this.cameraY2 = 20 * 32
                player.x = 3 * 32
                player.y = 47 * 32
                this.fond_2.destroy()
            },
        })
    }
    cameraChange4(player, camerahitbox) {
        if (this.changeCam2 == false) {
            console.log(this.cameraX1)
            this.cameraX1 = 140 * 32
            this.cameraX2 = 140 * 32
            this.cameraY1 = 32 * 32
            this.cameraY2 = 20 * 32

            player.x = 142 * 32
            this.changeCam2 = true
        }

        else if (this.changeCam2 == true) {
            console.log(this.cameraX1)
            this.cameraX1 = 0
            this.cameraX2 = 140 * 32
            this.cameraY1 = 32 * 32
            this.cameraY2 = 20 * 32
            player.x = 138 * 32
            this.changeCam2 = false
        }
    }


    casseStala(stala, sols) {
        stala.destroy()
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
        SpriteFireBall.setVisible(false)
    }

    BreakRonces(SpriteFireBall, ronces) {
        this.vieRonces -= 1;
        if (this.vieRonces == 0) {
            ronces.destroy()
            this.vieRonces = 2
        }
        SpriteFireBall.setVisible(false)
    }

    enemyRLKill(SpriteFireBall, enemy) {
        this.enemyRLHp -= 1;
        if (this.enemyRLHp == 0) {
            enemy.destroy()
            this.enemyRLHp = 2
        }
        SpriteFireBall.setVisible(false)
    }
    enemyShootKill(SpriteFireBall, enemy) {
        this.enemyShootHp -= 1;
        if (this.enemyShootHp == 0) {
            enemy.destroy()
            this.enemyShootHp = 3
            this.nombreEnemy -= 1
        }
        SpriteFireBall.setVisible(false)
    }
    breakBDG(collider, bdg) {
        bdg.destroy()
    }
    breakBDGSols(bdg, sols) {
        bdg.destroy()
    }

    playerRespawn(player, checkPoint) {
        this.playerX = checkPoint.x
        this.playerY = checkPoint.y
    }
    breakTroncBase1(SpriteFireBall, troncBase) {
        this.vieTroncBase -= 1;
        if (this.vieTroncBase == 0) {
            troncBase.destroy()
            this.tronc.getChildren()[0].body.setAllowGravity(true)
            this.time.addEvent({
                delay: 500, callback: () => {
                    this.tronc.getChildren()[0].setAngle(90).setSize(516, 32).y += 150
                    this.tronc.getChildren()[0].x += 268

                },
            })
        }



    }
    touchPlant(player, plante) {
        console.log(this.onPlant)
        this.onPlant = true;
    }
    touchGround(player, sols) {
        this.onPlant = false;
    }


}