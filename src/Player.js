class Player {


    constructor(scene) {



        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(1100, 2700, 'player'); // on créer le joueur et il apparait à cet endroit particulier en x et y
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
            frameRate: 15,
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
            frameRate: 4,
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
            repeat: 0,


        });
        /**this.scene.anims.create({
            key: 'dead',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: '...',
                suffix:'.png',
                start: 1,
                end: 3,
                zeroPad:2,
            }),
            frameRate: 8,
            repeat: 0

        });

        /**this.scene.anims.create({
            key: 'falling',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: '...',
                suffix:'.png',
                start: 1,
                end: 3,
                zeroPad:2,
            }),
            frameRate: 8,
            repeat: 0

        }); **/

        this.player.on('animationrepeat', function () {
            if( this.scene.anims.frameRate === 18) {
                this.sound.play('Step');
                this.volume(1);
                console.log("It's playing")
            }
        });

    }//END-CONSTRUCTOR


    // DEPLACEMENTS DU JOUEUR
    jump(){
        this.player.setVelocityY(-390)
        this.player.play('jump', true);
        if(this.particules){
            this.particules.startFollow(this.player,3.5,-65) //probleme ici du a right/left
        }

    }

    trampoline(){
        this.player.setVelocityY(-60)
        this.player.setBounceY(0.7)
        this.player.play('jump', true);
        if(this.particules){
            this.particules.startFollow(this.player,3.5,-65) //probleme ici du a right/left
        }

    }

    moveRight(){
        this.player.setVelocityX(298);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        if(this.particules){
            this.particules.startFollow(this.player,33,-65)
        }
        // if (this.player.play('walk'===true)){
        //     this.sound.play('Step');
        //     console.log("It's playing")
        // }


    }

    moveLeft(){
        this.player.setVelocityX(-298);
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
    fall(){
        if (this.player.velocityY>10){
            this.player.play('idle',true)
        }
    }

    /**dead(){
    this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('dead',true)
        }
    }*/


}//END-CLASS



