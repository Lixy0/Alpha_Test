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
    this.load.image('smoke','assets/images/smoke-particle-.png');

    this.load.audio('click', 'assets/sound/sound_ex_machina_Button_Click.mp3');
    this.load.audio('Theme', 'assets/sound/ambience-forest-birds-wind-trees.mp3');

    };
    create(){
        //SOUNDS
        this.theme = this.sound.add('Theme',{volume: 0.3}).play();
        this.audio = this.sound.add('click');


        //on creer le BG
        const menuImage = this.add.image(0, 0, 'menu').setOrigin(0, 0);
        menuImage.setScale(0.7, 0.7);
        menuImage.setDepth(1)

        const smoke = this.add.image(1280,720, 'smoke').setAlpha(0.3);
        smoke.setScale(50,8);
        smoke.setDepth(3)

        const titre = this.add.image(50, 50, 'titre').setOrigin(0,0);
        titre.setScale(0.7,0.7); console.log('TITRE')
        titre.setDepth(4)

        //ON APPELLE LES PARTICULES STATIC DE FX ET ON LEURS SET UNE POSITION
        // Fx.particlesSmoke(this,1100, 2700);
        this.particulesMenu=Fx.particlesLeafWind(this);
        this.particulesMenu.setPosition(0,100)

        //on creer le button
        let playbutton = this.add.image(660,440,'start');
        playbutton.setScale(1);
        playbutton.setInteractive();
        playbutton.setDepth(4)

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