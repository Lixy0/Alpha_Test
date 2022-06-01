class menustart extends Phaser.Scene {

    constructor() {
        super("menuGame");
    }
    preload(){

    this.load.image("Fond","assets/images/BGBG.png");
    this.load.image('menu','assets/UI/atsmo.png');
    this.load.image('titre','assets/UI/titre.png');
    this.load.image('start','assets/UI/button.png');
    this.load.image('start2','assets/UI/button2.png');
    this.load.image('startIC','assets/UI/buttoncine.png');

    this.load.image("ButtonOption","assets/particules/yellow.png");
    this.load.image("OptionClose","assets/UI/close.JPG");
    this.load.image("volumeOn","assets/UI/volume_On.png");
    this.load.image("volumeOff","assets/UI/volume_Off.png");

    this.load.image('leaf','assets/particules/leaf.png');
    this.load.image('smoke','assets/particules/smoke-particle-.png');

    this.load.audio('click', 'assets/sound/sound_ex_machina_Button_Click.mp3');
    this.load.audio('Theme', 'assets/sound/ambience-forest-birds-wind-trees.mp3');

    };
    create(){

        // this.theme = this.sound.add('Theme');
        // this.theme.setVolume(0.9);
        // this.theme.volume = 1;
        // this.testson=1;

        // this.theme.play();

        // this.audio = this.sound.add('click');

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

        //on creer le sprite des bouttons
        const buttonStartSprite = this.add.image(380, 300, 'start')
            .setOrigin(0, 0)
            .setDepth(999)
            .setAlpha(0.8)

        const buttonStartCineSprite = this.add.image(380, 420, 'startIC')
            .setOrigin(0, 0)
            .setDepth(9999)
            .setAlpha(0.8)


        const buttonOptionSprite = this.add.image(600, 600, 'ButtonOption')
            .setOrigin(0, 0)
            .setDepth(999)
            .setAlpha(0.8)

        const buttonOptionCloseSprite = this.add.image(900, 500, 'OptionClose').setVisible(false)
            .setOrigin(0, 0)
            .setDepth(9999)
            .setAlpha(0.8)

        const buttonOptionOnSprite = this.add.image(600, 300, 'volumeOn').setVisible(false)
            .setOrigin(0, 0)
            .setDepth(9999)
            .setAlpha(0.8)

        const buttonOptionOffSprite = this.add.image(600, 400, 'volumeOff').setVisible(false)
            .setOrigin(0, 0)
            .setDepth(9999)
            .setAlpha(0.8)

        // this.buttonCreditsSprite = this.add.image(890, 700, 'Credits')
        //     .setOrigin(0, 0)
        //     .setScale(1)
        //     .setAlpha(0.7);



        const optionCadre = this.add.image(350,150, 'Fond').setOrigin(0, 0).setVisible(false).setScale(0.2, 0.4).setDepth(999);

        // const line1 =this.add.image(900, 450, 'Line')
        //     .setOrigin(0, 0)
        //     .setScale(1)
        //     .setVisible(false)



        //ON APPELLE LES PARTICULES STATIC DE FX ET ON LEURS SET UNE POSITION
        // Fx.particlesSmoke(this,1100, 2700);
        this.particulesMenu=Fx.particlesLeafWind(this);
        this.particulesMenu.setPosition(0,100)

        //on creer le button START
        this.buttonStart = this.add.rectangle(buttonStartSprite.x, buttonStartSprite.y,576,62,0xfffff,0)
            .setOrigin(0,0)
            .setScale(1)
            .setDepth(4)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                console.log("up")
                this.scene.start("playGame")
                this.sound.play('click',{volume:0.2});

            })
            .on('pointerover',function(){
                console.log("over")
                buttonStartSprite.setAlpha(1);

            })
            .on('pointerout',function(){
                console.log("out")
                buttonStartSprite.setAlpha(0.8);

            })


        //on creer le button START avec CINEMATIQUE
        this.buttonStartCine = this.add.rectangle(buttonStartCineSprite.x, buttonStartCineSprite.y,576,62,0xffffff,0)
            .setOrigin(0,0)
            .setScale(1)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                console.log("up")
                this.scene.start("cineintroGame")
                this.sound.play('click',{volume:0.2});

            })
            .on('pointerover',function(){
                console.log("over")
                buttonStartCineSprite.setAlpha(1)
            })
            .on('pointerout',function(){
                console.log("out")
                buttonStartCineSprite.setAlpha(0.8)
            })

        //on creer le button START avec CINEMATIQUE
        this.buttonOptionClose = this.add.rectangle(buttonOptionCloseSprite.x, buttonOptionCloseSprite.y,350,100,0xffffff,0)
            .setOrigin(0,0)
            .setScale(1)
            .setDepth(4)
            .disableInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                console.log("up")
                this.scene.start("menuGame")
                this.sound.play('click',{volume:0.2});

            })
            .on('pointerover',function(){
                console.log("over")
                buttonOptionCloseSprite.setAlpha(1)
            })
            .on('pointerout',function(){
                console.log("out")
                buttonOptionCloseSprite.setAlpha(0.8)
            })

        //on creer le button START avec CINEMATIQUE
        this.buttonOptionOn = this.add.rectangle(buttonOptionOnSprite.x, buttonOptionOnSprite.y,350,100,0xffffff,0)
            .setOrigin(0,0)
            .setScale(1)
            .disableInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                console.log("VOLUME ON")
                // this.theme.volume=++0.1;

            })
            .on('pointerover',function(){
                console.log("over")
                buttonOptionOnSprite.setAlpha(1)
            })
            .on('pointerout',function(){
                console.log("out")
                buttonOptionOnSprite.setAlpha(0.8)
            })

        this.buttonOptionOff = this.add.rectangle(buttonOptionOffSprite.x, buttonOptionOffSprite.y,350,100,0xffffff,0)
            .setOrigin(0,0)
            .setScale(1)
            .disableInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                console.log("VOLUME OFF")
                this.theme.volume=0;
                // this.game.sound.stopAll();


            })
            .on('pointerover',function(){
                console.log("over")
                buttonOptionOffSprite.setAlpha(1)
            })
            .on('pointerout',function(){
                console.log("out")
                buttonOptionOffSprite.setAlpha(0.8)
            })


        //on creer le button OPTION
        this.buttonOption = this.add.rectangle(buttonOptionSprite.x, buttonOptionSprite.y,80,80,0xffffff,0)
            .setOrigin(0,0)
            .setScale(1)
            .setDepth(4)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                console.log("up")

                optionCadre.setVisible(true)
                buttonOptionCloseSprite.setVisible(true)
                buttonOptionOnSprite.setVisible(true)
                buttonOptionOffSprite.setVisible(true)

                //on disable le fait de pouvoir appuyer sur les autres boutons du menu
                this.buttonStartCine.disableInteractive();
                this.buttonStart.disableInteractive();
                this.buttonOption.disableInteractive();
                //on active ce qu'il y a comme bouttons sur option
                this.buttonOptionClose.setInteractive();
                this.buttonOptionOn.setInteractive();
                this.buttonOptionOff.setInteractive();

                this.sound.play('click',{volume:0.2});

            })
            .on('pointerover',function(){
                console.log("over")
                buttonOptionSprite.setAlpha(1)
            })
            .on('pointerout',function(){
                console.log("out")
                buttonOptionSprite.setAlpha(0.8)
            })



    }//END CREATE

    // update(){
    //     this.theme.volume
    // }

}