class scene extends Phaser.Scene {

    preload() {
        // Background
        this.load.image('background', 'assets/images/background.png');

        // Images load avec JSON animation/sheet
        this.load.atlas('player', 'assets/images/player.png', 'assets/images/player.json');
        this.load.atlas('idle', 'assets/images/idle.png', 'assets/images/idle.json');
        this.load.image('tiles', ['assets/tilesets/platformPack_tilesheet.png', 'assets/tilesets/platformPack_tilesheet_n.png']);

        //Load des objets
        this.load.image('pnj','assets/images/Pnj.png');
        this.load.image('save','assets/images/Save.png');
        this.load.image('death','assets/images/Death.png');
        this.load.image('cloud','assets/images/clood.png');
        this.load.image('fire', 'assets/images/muzzleflash3.png');
        this.load.image('moved', 'assets/images/move.png');

        // Load Tiled MAP en JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }//PRELOAD END


    create() {
        // Rajoute la map sur phaser + gére taille
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0)
        backgroundImage.setScale(2, 0.8);
        backgroundImage.setPipeline('light2D');
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        this.platforms = map.createLayer('Sol', tileset).setPipeline('light2D')

        // curseur
        this.cursors = this.input.keyboard.createCursorKeys();

        // Rajoute la physique (collisions)
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
            immovable: true
        });
        this.trous = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.moved = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        const objectsLayer = map.getObjectLayer('objects')
        objectsLayer.objects.forEach(objData=> {
            const {x = 0, y = 0, name, width = 0, height = 0} = objData

            switch (name) {
                case 'Save': {
                    let save = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
                    save = this.physics.add.existing(save)
                    this.saves.add(save)
                    break;
                }
                case 'CloudP':
                {

                    let cloud = this.add.sprite(x,y,"cloud").setOrigin(0,0)
                    this.cloud.add(cloud)
                    break;

                }
                case 'Trous':
                {
                    let trous = this.add.rectangle(x,y,width,height).setOrigin(0,0)
                    trous = this.physics.add.existing(trous)
                    this.trous.add(trous)
                    break;
                }
                case 'MoveP':
                {
                    let moved = this.physics.add.sprite(x,y,"moved").setOrigin(0,0)
                    const finalgoal =objData.properties[0].value+moved.y
                    this.moved.add(moved)
                    let velocity = 100
                    let active = true
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

                }
            }
        })

        // Player
        this.player = new Player(this)
        this.currentSaveX = this.player.player.x;
        this.currentSaveY = this.player.player.y;

        // Interaction du joueur avec les objects
        this.physics.add.overlap(this.player.player, this.trous,this.playerHit,null ,this)
        this.physics.add.collider(this.player.player, this.cloud,this.cloudLife,null, this);
        this.physics.add.collider(this.player.player, this.moved);

        // Caméra
        this.cameras.main.startFollow(this.player.player,true);
        this.cameras.main.setDeadzone(400, 200)

        // Test LIGHTS
        this.lights.enable();
        this.lights.setAmbientColor(0x808080);
        let spotlight = this.lights.addLight(400, 300, 280).setIntensity(7)
        this.input.on('pointermove', function (pointer) {

            spotlight.x = pointer.x;
            spotlight.y = pointer.y;

        });


    }//CREATE END

    /**
     * fonction exécuter des lors que le joueur touche un objet "save" qui enregistre les variables du player au moment touche
     * @param player
     * @param saves
     */
    sauvegarde(player, saves) {
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.currentSaveX = player.x
        this.currentSaveY = player.y
        saves.body.enable = false;
        console.log("SAVED")

    }
    /** fonction trous/death **/
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
    cloudLife(player,cloud){
        this.time.delayedCall(3000, ()=> {
            cloud.visible=false
            cloud.body.enable=false
        })
    }

    update() {


        switch (true) {
            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                console.log("jump")
                break;
            case this.cursors.left.isDown:
                this.player.moveLeft()
                break;
            case this.cursors.right.isDown:
                this.player.moveRight();
                break;
            default:
                this.player.stop();

        }
    }//UPDATE END



}//END END