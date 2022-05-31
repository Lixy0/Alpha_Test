class cinematicintro extends Phaser.Scene {
    constructor() {
        super("cineintroGame");
    }
    preload(){

        this.load.video('Intro', 'assets/video/test.mp4','loadeddata', false, true);
        this.load.image('Skip', 'assets/images/testbutton.png');
        // this.load.audio('MainTheme', 'assets/sounds/LevelMusic.mp3');

    }

    create() {
        console.log("bonjour")

        this.video = this.add.video(0, 0, 'Intro'); //ajout video/cinematique
        this.video.setScale(2, 2);
        this.video.play();
        this.video.setDepth(2)


        // this.mainTheme = this.sound.add('MainTheme',{volume: 0.3});
        // this.mainTheme.loop = true;
        // this.mainTheme.play();

        //on creer le button
        let skipbutton = this.add.image(660,440,'Skip');
        skipbutton.setScale(1);
        skipbutton.setInteractive();
        skipbutton.setDepth(4)

        skipbutton.on("pointerover",()=>{
            console.log("over")
            skipbutton.setTexture('Skip')
        })

        skipbutton.on("pointerout",()=>{
            console.log("out")
            skipbutton.setTexture('Skip')
        })

        skipbutton.on("pointerup",()=>{
            console.log("up")
            skipbutton.setTexture('Skip')

            this.scene.start("playGame")
        })

        console.log("aurevoir")
    }
}
