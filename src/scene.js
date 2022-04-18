class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        //Load des objets
        this.load.image('pnj','assets/images/Pnj.png');
        this.load.image('save','assets/images/Save.png');
        this.load.image('death','assets/images/Death.png')

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {
        /**
         * on initialise les valeurs de la sauvegarde
         * @type {number}
         */
        this.currentSaveX = 0;
        this.currentSaveY = 0;


        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        this.platforms = map.createStaticLayer('Sol', tileset);

        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this)

        this.cameras.main.startFollow(this.player.player,true);
        this.cameras.main.setDeadzone(400, 200)

        /**
         * on créer les multiple groupe des layers objets
         * @type {Phaser.Physics.Arcade.Group}
         */
        /** groupe des Saves **/
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Saves').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y + 5 - save.height, 'save').setOrigin(0);
        });
        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)

        /** groupe des trous,death **/
        this.trous = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
    // ceci permet au images que vous avez placé sur Tiled d'avoir une boite de colision mais aussi d'etre invisible
        map.getObjectLayer('Trous').objects.forEach((death) => {
            //remplacez le 'death' avec le nom de l'image remplacé (le nom déclaré dans preload)
            const trousSprite = this.trous.create(death.x, death.y + 5 - death.height, 'death').setOrigin(0).visible = true ;
        });
        this.physics.add.collider(this.player.player, this.trous, this.playerHit, null, this);


    }

    /**
     * fonction exécuter des lors que le joueur touche un objet "save" qui enregistre les variables du player au moment T + désactive la collision de l'objet pour ne pas réexécuter a chaque collision
     * @param player
     * @param saves
     */
    sauvegarde(player, saves) {
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.currentSaveX = player.x
        this.currentSaveY = player.y
        saves.body.enable = false;
        this.currentKey = player.key
    }
    /** fonction trous/death **/
    playerHit(player, trous) {
        player.setVelocity(0, 0);
        player.x = this.currentSaveX
        player.y = this.currentSaveY;
        player.key= this.currentKey
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


    update() {

        switch (true) {
            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                console.log("oui")
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





    }
}