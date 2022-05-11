class sceneMenu extends Phaser.Scene {

    constructor() {
        super("menuGame");
    }
    preload(){
    this.load.image('menu','assets/images/atsmo.png');
    this.load.image('titre','assets/images/titre.png');
    this.load.image('start','assets/images/button.png');
    this.load.image('start2','assets/images/button2.png');

    this.load.image('leaf','assets/images/leaf.png');

    this.load.audio('click', 'assets/sound/sound_ex_machina_Button_Click.mp3');
    this.load.audio('Theme', 'assets/sound/ambience-forest-birds-wind-trees.mp3');

    };
    create(){
        //SOUNDS
        this.theme = this.sound.add('Theme',{volume: 0.3}).play();
        this.audio = this.sound.add('click');

        //PARTICLES
        var particlesLeaf = this.add.particles('leaf');

        particlesLeaf.createEmitter({
            x: 0,
            y: { min: 300, max: 620 },
            lifespan: 5000,
            speedX: { min: 150, max: 200},
            scale: { start: 0.4, end: 0.1 },
            quantity: 1,
            rotate: { start: -180, end: 180 },
            frequency: 1500,
        });

        particlesLeaf.createEmitter({
            x: 300,
            y: { min: 400, max: 550 },
            lifespan: 5000,
            speedX: { min: 150, max: 200},
            scale: { start: 0.2, end: 0.1 },
            quantity: 1,
            rotate: { start: -180, end: 180 },
            frequency: 700,
        });


        //on creer le BG
        const menuImage = this.add.image(0, 0, 'menu').setOrigin(0, 0);
        menuImage.setScale(0.7, 0.7);

        //on creer le button
        let playbutton = this.add.image(660,440,'start');
        playbutton.setScale(1);
        playbutton.setInteractive();

        playbutton.on("pointerover",()=>{
            console.log("over")
           playbutton.setTexture('start2')
        })

        playbutton.on("pointerout",()=>{
            console.log("out")
            playbutton.setTexture('start')
        })

        playbutton.on("pointerup",()=>{
            console.log("up")
            playbutton.setTexture('start2')

            this.scene.start("playGame")
        })

    };

}