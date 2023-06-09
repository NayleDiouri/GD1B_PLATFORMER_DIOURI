class titleScreen extends Phaser.Scene {
    constructor() {
        super("titleScreen"); // mettre le meme nom que le nom de la classe
    }

    preload(){
        this.load.image("titleScreen", "assets/titleScreen.png")
    }
    create(){
        this.add.image(448, 224, "titleScreen")
        this.clavier = this.input.keyboard.addKeys('SPACE');
    }
    update(){
        if(this.clavier.SPACE.isDown){
            this.scene.start("glace_1")
        }
    }


}