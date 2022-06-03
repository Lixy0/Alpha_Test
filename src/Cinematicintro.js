class cinematicintro extends Phaser.Scene {
    constructor() {
        super("cineintroGame");
    }
    preload(){

        this.load.video('Intro', 'assets/video/cinematique.mp4','loadeddata', false, true);
        this.load.image('Skip','assets/UI/start1.png');
        // this.load.audio('MainTheme', 'assets/sounds/LevelMusic.mp3');

    }

    create() {
        console.log("bonjour")

        this.video = this.add.video(640, 360, 'Intro'); //ajout video/cinematique
        this.video.setScale(1.5,1.5);
        this.video.play();
        this.video.setDepth(1);


        // this.mainTheme = this.sound.add('MainTheme',{volume: 0.3});
        // this.mainTheme.loop = true;
        // this.mainTheme.play();

        //on creer le button
        let skipbutton = this.add.image(660,600,'Skip');
        skipbutton.setScale(0.8);
        skipbutton.setInteractive();
        skipbutton.setDepth(9999)
        skipbutton.setAlpha(0.15)

        skipbutton.on("pointerover",()=>{
            console.log("over")
            skipbutton.setAlpha(0.8)

            skipbutton.setTexture('Skip')
        })

        skipbutton.on("pointerout",()=>{
            console.log("out")
            skipbutton.setTexture('Skip')
            skipbutton.setAlpha(0.2)

        })

        skipbutton.on("pointerup",()=>{
            console.log("un animateur mort")
            skipbutton.setAlpha(0.8)

            skipbutton.setTexture('Skip')

            this.scene.start("playGame")
        })

        console.log("aurevoir")
    }
}
