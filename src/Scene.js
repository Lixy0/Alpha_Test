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


        //Load assets objets
        this.load.image('moved', 'assets/images/move.png');
        this.load.image('cloud','assets/images/clood.png');
        this.load.image('pnjSprite','assets/images/Pnj.png');
        this.load.image('textboxSprite','assets/images/textBox.png');


        // Load PARTICULES/FX
        this.load.image('firelight','assets/images/yellow.png');
        // this.load.image('flame1', 'assets/images/flame1.png');
        this.load.image('flame1', 'assets/images/fire_395.png');
        this.load.image('saveSpark', 'assets/images/pngegg.png');
        this.load.image('leaf', 'assets/images/leaf.png');

        //parallaxe background
        this.load.image('BG1',"assets/images/BG1.png");
        this.load.image('BG2',"assets/images/BG2.png");
        this.load.image('BG3',"assets/images/BG3.png");
        this.load.image('BG4',"assets/images/BG4.png");
        this.load.image('BG5',"assets/images/BG5.png");
        this.load.image('BGG',"assets/images/BGG.png");



        // Load Tiled MAP en JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');


        // Load sounds
        this.load.audio('Theme2', 'assets/sound/audio_hero_Undiscovered-Land_SIPML_T-0314.mp3');


    }//PRELOAD END


    create() {
        this.lights.enable().setAmbientColor(0xa7a7a7);



        // BACKGROUND/changement de taille etc
        const BGG = this.add.image(900, 1500, 'BGG').setOrigin(0,0);
        BGG.setScale(6, 6); console.log('BGG')


        // MAP TILED+LES DIFFERENTS TILESET
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Alpha_test1', 'tiles',);
        const tileset2 = map.addTilesetImage('HERBES', 'tilesHerbe',);
        const tilesetLD = map.addTilesetImage('platformPack_tilesheet_LD', 'tilesLD',);


        //ON AJOUTE CHAQUE LAYER DANS TILED
        this.platformsS = map.createLayer('Saves',tileset).setPipeline('Light2D');
        this.platforms = map.createLayer('Sol', tileset).setPipeline('Light2D');
        this.platformsA = map.createLayer('arbre', tileset).setPipeline('Light2D');
        this.platformsH = map.createLayer('Herbe', tileset2).setPipeline('Light2D');
        this.platformsR = map.createLayer('rock', tileset).setPipeline('Light2D');
        this.platLD = map.createLayer('PNJ',tilesetLD).setPipeline('Light2D');
        this.platBACK = map.createLayer('BACK',tilesetLD).setPipeline('Light2D');

        // CURSEURS
        this.cursors = this.input.keyboard.createCursorKeys();



        //PARALLAXE
        this.platforms.setDepth(2).setPipeline('Light2D');
        this.platformsA.setDepth(6).setPipeline('Light2D');
        this.platformsH.setDepth(4).setPipeline('Light2D');
        this.platformsR.setDepth(0).setPipeline('Light2D');
        this.platformsS.setDepth(9).setPipeline('Light2D');
        this.platLD.setDepth(9).setPipeline('Light2D');




        //COLLISIONS
        this.platforms.setCollisionByExclusion(-1, true);
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



        // On ajoute tous les OBJECTS de Tiled
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.cloud = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            setDepth : 2,
        });
        this.trous = this.physics.add.group({
            allowGravity: false,
            immovable: true

        });
        this.moved = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });

        this.pnjtalk = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });

        //OBJECTS
        const objectsLayer = map.getObjectLayer('objects')
        objectsLayer.objects.forEach(objData=> {
            const {x = 0, y = 0, name, width = 0, height = 0} = objData

            switch (name) {
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
                    let velocity = 100
                    let active = false
                    let tw = this.tweens.addCounter({
                        from: 0,
                        to: 100,
                        duration: 100,
                        repeat: -1,
                        yoyo: true,
                        onUpdate: tween=>{
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

                        },
                    });

                    break;
                }//FIN-MOVEP

                case 'PnjT':
                {
                    let pnjtalk = this.add.sprite(x,y,"pnjSprite").setOrigin(0,0).setDepth(999)
                    pnjtalk = this.physics.add.existing(pnjtalk)
                    this.pnjtalk.add(pnjtalk)
                    break;

                }//FIN-TROUS

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

        //creation de la particules save
        this.savePart=Fx.particlesSave(this);

        //creation de la particules LEAF
        this.leafPart=Fx.particlesLeafPlat(this);


        // Interaction du joueur avec les objects
        this.physics.add.overlap(this.player.player, this.saves,this.sauvegarde,null ,this);
        this.physics.add.overlap(this.player.player, this.trous,this.playerHit,null ,this);
        this.physics.add.collider(this.player.player, this.cloud,this.cloudLife,null, this);
        this.physics.add.collider(this.player.player, this.moved);
        this.physics.add.overlap(this.player.player, this.pnjtalk,this.pnjtalking,null ,this);



        // Caméra
        this.cameras.main.startFollow(this.player.player,true); // la caméra suis le joueur et on dit true pour eviter un bug de texture
        this.cameras.main.setDeadzone(80, 80) // on crée une deadzone à la façon mario sur la caméra

        //SOUNDS
        this.theme = this.sound.add('Theme',{volume: 0.3}).play();
        this.theme2 = this.sound.add('Theme2',{volume: 0.1}).play();
        // this.stepsound = this.sound.add('step');

        this.spotlight = this.lights.addLight().setRadius(30).setColor(0xF0AF2F)
        this.spotlightSave = this.lights.addLight().setRadius(999).setColor(0xF0AF2F)

        this.input.keyboard.on('keyup', (key)=>{
            console.log(key)
            if(key.key==="a"){
            }

        }, this);

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
            this.spotlightSave.x = this.saves.x+32;
            this.spotlightSave.y = this.saves.y+32;
            console.log("light/save")
        }

    }


    pnjtalking(player, pnjtalk){
        this.currentPnjX = pnjtalk.x
        this.currentPnjY = pnjtalk.y
        console.log("Pnj/Joueur overlap")
            this.add.image(this.currentPnjX, this.currentPnjY-100,"textboxSprite").setDepth(999)
            // this.player.player.setVelocityX(0);

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
                // this.stepsound.play
                this.spotlight.x = this.player.player.x+3.5;
                this.spotlight.y = this.player.player.y-65;
                break;

            case this.cursors.left.isDown:
                this.player.moveLeft()
                this.spotlight.x = this.player.player.x-33;
                this.spotlight.y = this.player.player.y-65;
                break;

            case this.cursors.right.isDown:
                this.player.moveRight();
                this.spotlight.x = this.player.player.x+33;
                this.spotlight.y = this.player.player.y-65;
                break;


            default:
                this.player.stop();
                this.spotlight.x = this.player.player.x-3.5;
                this.spotlight.y = this.player.player.y-69;

                // if (this.pnjtalking&&this.cursors.shiftKey.isDown){
                //     console.log("a")
                // }

            // case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.velocity.y>-380:
            //     this.player.jump()
            //     console.log("DOUBLEjump")
            //     // this.stepsound.play
            //     this.spotlight.x = this.player.player.x+3.5;
            //     this.spotlight.y = this.player.player.y-65;
            //     break;
        }

        if(this.player.player.body.velocity.y>-10){
            this.player.player.setVelocityY(this.player.player.body.velocity.y+10)
        }

    }//UPDATE END



}//END SCENE.JS