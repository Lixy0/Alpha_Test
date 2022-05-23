class Player {


    constructor(scene) {



        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(1100, 2700, 'player'); // on créer le joueur et il apparait à cet endroit particulier en x et y
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.player.setDisplaySize(130,160) // crop la taille du joueur
        this.scene.physics.add.collider(this.player, this.scene.colliders); // collisions entre le joueur et dans la scene les colliders créer dans TILED
        this.player.setDepth(2)
        // pour regler la box de colision du joueur (taille etc..)
        this.player.body.setSize(100,320);
        this.player.setOffset(90,10)

        // ON LOAD LES ANIMATIONS (walk; idle; jump; mort; bouclier; tire)
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'Run_',
                suffix:'.png',
                start: 1,
                end: 10,
                zeroPad:2,
            }),
            frameRate: 18,
            repeat: -1

        });
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'Idle_',
                suffix:'.png',
                start: 1,
                end: 12,
                zeroPad:2,
            }),
            frameRate: 6,
            repeat: -1

        });

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'Jump_',
                suffix:'.png',
                start: 1,
                end: 3,
                zeroPad:2,
            }),
            frameRate: 8,
            repeat: 0

        });
        /**this.scene.anims.create({
            key: 'dead',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,
        });*/


    }//END-CONSTRUCTOR


    // DEPLACEMENTS DU JOUEUR
    jump(){
        this.player.setVelocityY(-350);
        this.player.play('jump', true);
        if(this.particules){
            this.particules.startFollow(this.player,3.5,-65)
        }

    }

    moveRight(){
        this.player.setVelocityX(295);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        if(this.particules){
            this.particules.startFollow(this.player,33,-65)
        }

    }

    moveLeft(){
        this.player.setVelocityX(-295);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(true);

        if(this.particules){
            this.particules.startFollow(this.player,-33,-65)
        }

    }

    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
        if(this.particules){
            this.particules.startFollow(this.player) //probleme ici
        }

        if(this.player.flipX===true || this.particules){
            this.particules.startFollow(this.player,-3.5,-69)

        }

    }

    /**dead(){
    this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('dead',true)
        }
    }*/


}//END-CLASS



