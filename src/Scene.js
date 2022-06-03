class scene extends Phaser.Scene {

    constructor (){
        super("playGame")
    }

    preload() {
        // Background
        this.load.image('background', 'assets/images/background.png');

        // Images load avec JSON animation/tilesheet
        this.load.atlas('player', 'assets/images/player.png', 'assets/images/player.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tilesHerbe', 'assets/tilesets/HERBES.png');
        this.load.image('tilesLD', 'assets/tilesets/platformPack_tilesheet_LD.png');
        this.load.image('test', 'assets/tilesets/test1.png');
        this.load.image('test2', 'assets/tilesets/test2.png');

        //Load assets objets
        this.load.image('moved', 'assets/objects/move.png');
        this.load.image('cloud','assets/objects/clood.png');
        this.load.image('pnjSprite','assets/objects/Pnj.png');
        this.load.image('pnjSprite2','assets/objects/Pnj2.png');
        this.load.image('pnjSprite3','assets/objects/Pnj3.png');
        this.load.image('pnjSprite4','assets/objects/Pnj4.png');
        this.load.image('pnjSprite5','assets/objects/Pnj5.png');

        this.load.image('textboxSprite','assets/objects/textBox.png');
        this.load.image('textboxSprite2','assets/objects/textBox2.png');
        this.load.image('textboxSprite3','assets/objects/textBox3.png');
        this.load.image('textboxSprite4','assets/objects/textBox4.png');
        this.load.image('textboxSprite5','assets/objects/textBox5.png');

        //parallaxe background
        this.load.image('BG1',"assets/images/BG1.png");
        this.load.image('BG2',"assets/im(ages/BG2.png");
        this.load.image('BG3',"assets/im)ages/BG3.png");
        this.load.image('BG4',"assets/images/BG4.png");
        this.load.image('BG5',"assets/images/BG5.png");
        this.load.image('BGG',"assets/images/BGG.png");

        //Load Particules/Fx
        // this.load.image('flame1', 'assets/particules/flame1.png');
        this.load.image('TEST', 'assets/particules/TEST.png');

        this.load.image('flameblack', 'assets/particules/black.png');
        this.load.image('flame1', 'assets/particules/fire_395.png');
        this.load.image('saveSpark','assets/particules/pngegg.png');
        this.load.image('leaf', 'assets/particules/leaf.png');
        this.load.image('leaf2', 'assets/particules/leaf2.png');

        // Load Tiled MAP en JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');

        // Load sounds
        this.load.audio('Theme2', 'assets/sound/audio_hero_Undiscovered-Land_SIPML_T-0314.mp3');
        this.load.audio('Step',"assets/sound/TEST_SOUND.mp3",{
            instances: 1
        });
        this.load.audio('Theme', 'assets/sound/ambience-forest-birds-wind-trees.mp3');
        this.load.audio('piu', 'assets/sound/piou.mp3');


    }//PRELOAD END



    create() {
        // this.lights.enable().setAmbientColor(0xa7a7a7);
        // this.stepSound.volume = 0.8;
        this.sound.add('Step');

        this.theme = this.sound.add('Theme');
        this.theme.setVolume(0.13);
        this.theme.play();
        this.theme.loop=true;

        this.theme2 = this.sound.add('Theme2');
        this.theme2.setVolume(0.18);
        this.theme2.loop=true;
        this.theme2.play();

        this.piu = this.sound.add('piu');
        this.piu.setVolume(0.08);

        // BACKGROUND/changement de taille etc
        const BGG = this.add.image(900, 1500, 'BGG').setOrigin(0,0);
        BGG.setScale(6*9, 6*9); console.log('BGG')


        // MAP TILED+LES DIFFERENTS TILESET
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Alpha_test1', 'tiles',);
        const tilesetLD = map.addTilesetImage('platformPack_tilesheet_LD', 'tilesLD',);
        const test = map.addTilesetImage('test1', 'test',);
        const test2 = map.addTilesetImage('test2', 'test2',);


        //ON AJOUTE CHAQUE LAYER DANS TILED
        this.platformsH = map.createLayer('Herbe', test2)
        this.plattest2 = map.createLayer('test2',test2)
        this.plattest = map.createLayer('test',test)
        this.platformSol = map.createLayer('Sol', tileset)
        this.platLD = map.createLayer('PNJ',tilesetLD)
        this.platformsA = map.createLayer('arbre', tileset)
        this.platformsR = map.createLayer('rock', test2)
        this.platformsR2 = map.createLayer('rock2', tileset)
        this.platbacktest = map.createLayer('testback',test)

        // CURSOR (clavier)
        this.cursors = this.input.keyboard.createCursorKeys();



        //PARALLAXE
        this.platformsH.setDepth(12)
        this.plattest2.setDepth(11)
        this.plattest.setDepth(10)
        this.platformSol.setDepth(9)
        this.platLD.setDepth(7)
        this.platformsA.setDepth(5)
        this.platformsR.setDepth(0.6)
        this.platformsR2.setDepth(0.5)
        this.platbacktest.setDepth(0.4)

        // this.breachT = this.add.image(4000,2000,'breach').setVisible(true);
        // this.breachT2 = this.add.image(3776,2112,'breach').setVisible(true);
        // this.breachT3 = this.add.image(3776,2112,'breach').setVisible(true);
        // this.breachT4 = this.add.image(3776,2112,'breach').setVisible(true);
        // this.breachT5 = this.add.image(3776,2112,'breach').setVisible(true);


        //COLLISIONS
        // this.platformSol.setCollisionByExclusion(-1, true);
        this.colliders = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        const colliderLayer = map.getObjectLayer('colliders')
        colliderLayer.objects.forEach(objData=> {
            const {x = 0, y = 0, width = 0, height = 0} = objData
            let colliders = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
            colliders = this.physics.add.existing(colliders)
            this.colliders.add(colliders)
        })

        //creation de la particules save
        this.savePart=Fx.particlesSave(this);

        //creation de la particules LEAF
        this.leafPart=Fx.particlesLeafPlat(this);
        Fx.particlesFireWhite(this);

        this.leafPartFal=Fx.particlesLeafFal(this);
        Fx.particlesLeafFal(this);
        this.leafPartFal2=Fx.particlesLeafFal(this);
        Fx.particlesLeafFal(this);
        this.leafPartFal3=Fx.particlesLeafFal(this);
        Fx.particlesLeafFal(this);
        this.leafPartFal4=Fx.particlesLeafFal(this);
        Fx.particlesLeafFal(this);
        this.leafPartFal5=Fx.particlesLeafFal(this);
        Fx.particlesLeafFal(this);
        this.leafPartFal6=Fx.particlesLeafFal(this);
        Fx.particlesLeafFal(this);

        this.partCloud=Fx.particlesCloud(this);
        Fx.particlesCloud(this);



        // On ajoute tous les OBJECTS de Tiled
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 8,

        });
        this.cloud = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 12,
        });
        this.trous = this.physics.add.group({
            allowGravity: false,
            immovable: true

        });
        this.moved = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 8,
        });

        this.pnjtalk = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 8,


        });
        this.pnjtalk2 = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 8,


        });
        this.pnjtalk3 = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 8,
        });
        this.pnjtalk4 = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 8,
        });

        this.pnjtalk5 = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 8,
        });

        this.eljumpor = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });

        this.targetF = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });
        this.targetF2 = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });
        this.targetF3 = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });
        this.targetF4 = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });
        this.targetF5 = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });
        this.targetF6 = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });


        //OBJECTS
        const objectsLayer = map.getObjectLayer('objects')
        objectsLayer.objects.forEach(objData=> {
            const {x = 0, y = 0, name, width = 0, height = 0} = objData

            switch (name) {
                case 'TargetZone1': {
                    let targetF = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
                    targetF = this.physics.add.existing(targetF)
                    this.targetF.add(targetF)

                    break;
                }//FIN-Target
                case 'TargetZone2': {
                    let targetF2 = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
                    targetF2 = this.physics.add.existing(targetF2)
                    this.targetF2.add(targetF2)

                    break;
                }//FIN-Target
                case 'TargetZone3': {
                    let targetF3 = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
                    targetF3 = this.physics.add.existing(targetF3)
                    this.targetF3.add(targetF3)

                    break;
                }//FIN-Target
                case 'TargetZone4': {
                    let targetF4 = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
                    targetF4 = this.physics.add.existing(targetF4)
                    this.targetF4.add(targetF4)

                    break;
                }//FIN-Target
                case 'TargetZone5': {
                    let targetF5 = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
                    targetF5 = this.physics.add.existing(targetF5)
                    this.targetF5.add(targetF5)

                    break;
                }//FIN-Target
                case 'TargetZone6': {
                    let targetF6 = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
                    targetF6 = this.physics.add.existing(targetF6)
                    this.targetF6.add(targetF6)

                    break;
                }//FIN-Target


                case 'Save': {
                    let save = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
                    save = this.physics.add.existing(save)
                    this.saves.add(save)

                    break;
                }//FIN-SAVE

                case 'CloudP':
                {

                    let cloud = this.add.sprite(x,y,"cloud").setOrigin(0,0).setDepth(999)
                    this.cloud.add(cloud)
                    break;

                }//FIN-CLOUDP

                case 'Trous':
                {
                    let trous = this.add.rectangle(x,y,width,height).setOrigin(0,0)
                    trous = this.physics.add.existing(trous)
                    this.trous.add(trous)
                    break;
                }//FIN-TROUS

                case 'MoveP':
                {
                    let moved = this.physics.add.sprite(x,y,"moved").setOrigin(0,0).setDepth(999)
                    const finalgoal =objData.properties[0].value+moved.y
                    this.moved.add(moved)
                    let velocity = 120
                    let active = false
                    this.testt = false
                    this.tw = this.tweens.addCounter({
                        from: 0,
                        to: 100,
                        duration: 100,
                        repeat: -1,

                        yoyo: false,
                        onUpdate: tween=>{
                            if(this.testt === true){

                                if(active) {
                                    moved.setVelocityY(velocity)
                                    if(moved.y>=finalgoal)
                                    {
                                        active=false

                                    }
                                }
                                else if(!active)
                                    moved.setVelocityY(-velocity)
                                if(moved.y<y)
                                {
                                    active=true
                                }
                            }


                        },
                    });
                    break;
                }//FIN-MOVEP


                case 'PnjT':
                {

                    let pnjtalk = this.add.sprite(x,y,"pnjSprite").setOrigin(0,0).setDepth(8)
                    pnjtalk = this.physics.add.existing(pnjtalk)
                    this.pnjtalk.add(pnjtalk)
                    break;

                }//FIN-PNJ
                case 'PnjT2':
                {

                    let pnjtalk2 = this.add.sprite(x,y,"pnjSprite2").setOrigin(0,0).setDepth(8)
                    pnjtalk2 = this.physics.add.existing(pnjtalk2)
                    this.pnjtalk2.add(pnjtalk2)
                    break;

                }//FIN-PNJ
                case 'PnjT3':
                {

                    let pnjtalk3 = this.add.sprite(x,y,"pnjSprite3").setOrigin(0,0).setDepth(8)
                    pnjtalk3 = this.physics.add.existing(pnjtalk3)
                    this.pnjtalk3.add(pnjtalk3)
                    break;

                }//FIN-PNJ
                case 'PnjT4':
                {

                    let pnjtalk4 = this.add.sprite(x,y,"pnjSprite4").setOrigin(0,0).setDepth(8)
                    pnjtalk4 = this.physics.add.existing(pnjtalk4)
                    this.pnjtalk4.add(pnjtalk4)
                    break;

                }//FIN-PNJ

                case 'PnjT5':
                {

                    let pnjtalk5 = this.add.sprite(x,y,"pnjSprite5").setOrigin(0,0).setDepth(8)
                    pnjtalk5 = this.physics.add.existing(pnjtalk5)
                    this.pnjtalk5.add(pnjtalk5)
                    console.log("hey wht")

                    break;


                }//FIN-PNJ

                case 'JumpWall':
                {
                    let eljumpor = this.add.rectangle(x,y,width,height).setOrigin(0,0)
                    this.eljumpor.add(eljumpor)


                    // this.stepsound.play
                    // this.spotlight.x = this.player.player.x+3.5;
                    // this.spotlight.y = this.player.player.y-65;
                    break;
                }//FIN-jumpwall


            }//FIN-SWITCH
        })//FIN-OBJECT




        // Player (création de celui si et on reset ça position de saves)
        this.player = new Player(this)
        this.currentSaveX = this.player.player.x;
        this.currentSaveY = this.player.player.y;



        //ON APPELLE LES PARTICULES STATIC DE FX ET ON LEURS SET UNE POSITION
       // Fx.particlesSmoke(this,1100, 2700);
        this.player.particules=Fx.particlesFire(this);
        this.player.particules.startFollow(this.player.player)


        // Interaction du joueur avec les objects
        this.physics.add.overlap(this.player.player, this.saves,this.sauvegarde,null ,this);
        this.physics.add.overlap(this.player.player, this.trous,this.playerHit,null ,this);
        this.physics.add.collider(this.player.player, this.cloud,this.cloudLife,null, this);
        this.physics.add.collider(this.player.player, this.eljumpor,this.eljumporedelpapa,null ,this);
        this.physics.add.collider(this.player.player,this.moved,this.siletrucbouge,null,this);

        this.physics.add.overlap(this.player.player, this.pnjtalk,this.pnjtalking,null ,this);
        this.physics.add.overlap(this.player.player, this.pnjtalk2,this.pnjtalking2,null ,this);
        this.physics.add.overlap(this.player.player, this.pnjtalk3,this.pnjtalking3,null ,this);
        this.physics.add.overlap(this.player.player, this.pnjtalk4,this.pnjtalking4,null ,this);
        this.physics.add.overlap(this.player.player, this.pnjtalk5,this.pnjtalking5,null ,this);

        this.physics.add.overlap(this.player.player, this.targetF,this.targetFal,null ,this);
        this.physics.add.overlap(this.player.player, this.targetF2,this.targetFal2,null ,this);
        this.physics.add.overlap(this.player.player, this.targetF3,this.targetFal3,null ,this);
        this.physics.add.overlap(this.player.player, this.targetF4,this.targetFal4,null ,this);
        this.physics.add.overlap(this.player.player, this.targetF5,this.targetFal5,null ,this);
        this.physics.add.overlap(this.player.player, this.targetF6,this.targetFal6,null ,this);

        // Caméra
        this.cameras.main.startFollow(this.player.player,true); // la caméra suis le joueur et on dit true pour eviter un bug de texture
        this.cameras.main.setDeadzone(80, 80) // on crée une deadzone à la façon mario sur la caméra

        // //SOUNDS
        // this.theme = this.sound.add('Theme',{volume: 0.3}).play();
        // this.theme2 = this.sound.add('Theme2',{volume: 0.1}).play();
        // // this.stepsound = this.sound.add('step');

        // this.spotlight = this.lights.addLight().setRadius(30).setColor(0xF0AF2F)
        // this.spotlightSave = this.lights.addLight().setRadius(999).setColor(0xF0AF2F)



        // this.BG1 = this.add.image(1100, 2000, 'BG1').setOrigin(0,0).setDepth(0.6);
        // this.BG2 = this.add.image(1100, 2000, 'BG2').setOrigin(0,0).setDepth(0.5);
        // this.BG3 = this.add.image(1100, 1500, 'BG3').setOrigin(0,0).setDepth(0.4);
        // this.BG4 = this.add.image(1100, 1500, 'BG4').setOrigin(0,0).setDepth(0.3);
        // this.BG5 = this.add.image(1100, 1500, 'BG5').setOrigin(0,0).setDepth(0.2);
        //
        // //PARALLAXE BACKGROUND
        // this.BG1.scrollFactorX= (0.2)
        // this.BG2.scrollFactorX= (0.4)
        // this.BG3.scrollFactorX= (0.6)
        // this.BG4.scrollFactorX= (0.8)
        // this.BG5.scrollFactorX= (1)
    }//CREATE END


    /**
     * fonction exécuter des lors que le joueur touche un objet "save" qui enregistre les variables du player au moment touche
     * @param player
     * @param saves
     */
        sauvegarde(player, saves) {
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.currentSaveX = player.x
        this.currentSaveY = player.y - 50
        saves.body.enable = false;
        console.log("SAVED")
        //on appelle la particule si elle existe elle est créer
        if(this.savePart){
            this.savePart.startFollow(saves,32,32)
            // this.spotlightSave.x = this.saves.x+32;
            // this.spotlightSave.y = this.saves.y+32;
            console.log("light/save")
        }

    }

    siletrucbouge(player,moved){
        if(this.partCloud) {
            this.partCloud.startFollow(moved,96,32)
        }
            this.testt = true
            // this.velocity = 180

    }

    eljumporedelpapa(player,eljumpor) {
        if (this.cursors.space.isDown || this.cursors.up.isDown && this.player.player.body.velocity.y > -380) {
            this.player.jump()

            console.log("DOUBLEjump")

        }

    }

    targetFal(player,targetF){
        this.leafPartFal.startFollow(targetF,96,32)
        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Shift"){
                this.piu.play();
                this.leafPartFal.explode()
                // this.targetFal.destroy()
                console.log("BYeBYe")
            }

        }, this)
    }

    targetFal2(player,targetF2){
        this.leafPartFal2.startFollow(targetF2,96,32)

        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Shift"){
                this.piu.play();

                this.leafPartFal2.explode()
                // this.targetFal2.destroy()
                console.log("BYeBYe")

            }

        }, this)
    }
    targetFal3(player,targetF3){
        this.leafPartFal3.startFollow(targetF3,96,32)

        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Shift"){
                this.piu.play();

                this.leafPartFal3.explode()
                // this.targetFal3.destroy()
                console.log("BYeBYe")

            }

        }, this)
    }
    targetFal4(player,targetF4){
        this.leafPartFal4.startFollow(targetF4,96,32)

        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Shift"){
                this.piu.play();

                this.leafPartFal4.explode()
                // this.targetFal4.destroy()
                console.log("BYeBYe")

            }

        }, this)
    }
    targetFal5(player,targetF5){
        this.leafPartFal5.startFollow(targetF5,96,32)

        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Shift"){
                this.piu.play();

                this.leafPartFal5.explode()
                // this.targetFal5.destroy()
                console.log("BYeBYe")

            }

        }, this)
    }

    targetFal6(player,targetF6){
        this.leafPartFal6.startFollow(targetF6,192,192)
        this.leafPartFal6.startFollow(targetF6,64,192)

        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Shift"){
                this.piu.play();

                this.leafPartFal6.explode()
                // this.targetFal5.destroy()
                console.log("BYeBYe")
                this.scene.start("wonGame")

            }

        }, this)
    }

    pnjtalking(player, pnjtalk){
        this.currentPnjX = pnjtalk.x
        this.currentPnjY = pnjtalk.y
        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Control"){
                let test = this.add.image(this.currentPnjX, this.currentPnjY-100,"textboxSprite").setDepth(8)
                console.log("Pnj/Joueur overlap+ touche")
                this.time.delayedCall(5000, () => {
                    test.visible = false
                    console.log("BYeBYe")
                })
            }

        }, this);

    }
    pnjtalking2(player, pnjtalk2){
        this.currentPnjX2 = pnjtalk2.x
        this.currentPnjY2 = pnjtalk2.y
        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Control"){
                let test2 = this.add.image(this.currentPnjX2, this.currentPnjY2-100,"textboxSprite2").setDepth(8)
                console.log("Pnj2/Joueur overlap+ touche")
                this.time.delayedCall(5000, () => {
                    test2.visible = false
                    console.log("BYeBYe")
                })
            }

        }, this);

    }
    pnjtalking3(player, pnjtalk3){
        this.currentPnjX3 = pnjtalk3.x
        this.currentPnjY3 = pnjtalk3.y
        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Control"){
                let test3 = this.add.image(this.currentPnjX3, this.currentPnjY3-100,"textboxSprite3").setDepth(8)
                console.log("Pnj3/Joueur overlap+ touche")
                this.time.delayedCall(6000, () => {
                    test3.visible = false
                    console.log("BYeBYe")
                })
            }

        }, this);

    }
    pnjtalking4(player, pnjtalk4){
        this.currentPnjX4 = pnjtalk4.x
        this.currentPnjY4 = pnjtalk4.y
        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Control"){
                let test4 = this.add.image(this.currentPnjX4, this.currentPnjY4-100,"textboxSprite4").setDepth(8)
                console.log("Pnj4/Joueur overlap+ touche")
                this.time.delayedCall(6000, () => {
                    test4.visible = false
                    console.log("BYeBYe")
                })
            }

        }, this);

    }
    pnjtalking5(player, pnjtalk5){
        this.currentPnjX5 = pnjtalk5.x
        this.currentPnjY5 = pnjtalk5.y
        this.input.keyboard.on('keyup', (key)=>{
            // console.log(key)
            if(key.key==="Control"){
                let test5 = this.add.image(this.currentPnjX5, this.currentPnjY5-100,"textboxSprite5").setDepth(8)
                console.log("Pnj4/Joueur overlap+ touche")
                this.time.delayedCall(6000, () => {
                    test5.visible = false
                })
            }

        }, this);

    }
    /**
     * fonction exécuter des lors que le joueur touche un objet "trous"
     * @param player
     * @param trous
     */
    playerHit(player, trous) {
        console.log('true')
        console.log("DEAD_CHARACTER : falling")
        player.setVelocity(0, 0);
        player.x = this.currentSaveX
        player.y = this.currentSaveY;
        player.play('idle', true); //changer a 'dead' quand asset dead finit
        player.setAlpha(0);
        let tw = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }
    // waitMove(player, moved) {
    //     let active =true;
    // }


    /**
     * fonction exécuter des lors que le joueur touche un objet "cloud",
     * celui si à un delay de temps avant d'être invisible et  de ne plus avoir de collision/body
     * il a aussi un delay de temps pour re apparaitre lorsqu'il detecte qu'il est invisible
     * @param player
     * @param cloud
     */
    cloudLife(player,cloud) {
        this.time.delayedCall(800, () => {
            cloud.visible = false
            cloud.body.enable = false

            this.time.delayedCall(3000, () => {
                cloud.visible = true
                cloud.body.enable = true
            })
        })
        //on appelle la particule si elle existe elle est créer
        if(this.leafPart){
            this.leafPart.startFollow(cloud,98,64)
            this.leafPart.explode()
        }
    }



    update() {


        // déplacement du joueur on les check
        switch (true) {
            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                console.log("jump")
                // this.spotlight.x = this.player.player.x+3.5;
                // this.spotlight.y = this.player.player.y-65;
                break;

            case this.cursors.left.isDown:
                this.player.moveLeft()
                // this.spotlight.x = this.player.player.x-33;
                // this.spotlight.y = this.player.player.y-65;

                break;

            case this.cursors.right.isDown:
                this.player.moveRight();
                // this.spotlight.x = this.player.player.x+33;
                // this.spotlight.y = this.player.player.y-65;
                break;


            default:
                this.player.stop();
                // this.spotlight.x = this.player.player.x-3.5;
                // this.spotlight.y = this.player.player.y-69;

                // if (this.pnjtalking&&this.cursors.shiftKey.isDown){
                //     console.log("a")
                // }


        }

        if(this.player.player.body.velocity.y>-10){
            this.player.player.setVelocityY(this.player.player.body.velocity.y+10)
        }


    }//UPDATE END



}//END SCENE.JS