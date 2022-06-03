class wonScene extends Phaser.Scene {

    constructor() {
        super("wonGame");
    }
    preload(){
        this.load.image('wonSprite',"assets/images/won.png");

        this.load.audio('tululu',"assets/sound/tulul.mp3");
        this.load.audio('clap',"assets/sound/clap.mp3");

    }
    create () {
        this.tululu = this.sound.add('tululu');
        this.tululu.setVolume(0.4);
        this.tululu.play();
        this.clap = this.sound.add('clap');
        this.clap.setVolume(0.15);
        this.clap.play();

        const wonImage = this.add.image(0, 0, 'wonSprite').setOrigin(0, 0);
        wonImage.setDepth(1)

        this.theme.setVolume(0)
        this.theme2.setVolume(0)





    }
}