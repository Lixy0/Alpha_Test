class Player {


    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(1100, 2700, 'player'); // on créer le joueur et il apparait à cet endroit particulier en x et y
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.player.setDisplaySize(130,160) // crop la taille du joueur
        this.scene.physics.add.collider(this.player, this.scene.colliders); // collisions entre le joueur et dans la scene les colliders créer dans TILED
        this.particles() // on appel les particules
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
            frameRate: 16,
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
            frameRate: 6,
            repeat: 0

        });
        /**this.scene.anims.create({
            key: 'dead',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,
        });*/
    }

    // PARTICULES de feux qui suis le joueur à un endroit fixe
    particles(){
        let particles = this.scene.add.particles('flame1');
        let particles1 = this.scene.add.particles('saveSpark');

        this.particlesEmit= particles.createEmitter({
            alpha: { start: 0.75, end: 0.01 },
            scale: { start: 0.40, end: 0.1},
            tint: { start: 0xff945e, end: 0xff945e },
            accelerationY: -90,
            rotate: { min: 180, max: -180 },
            lifespan: { min: 600, max: 400*2 },
            blendMode: Phaser.BlendModes.ADD,
            angle:{min:0,max:360},
            frequency: 11,
            speedY: { min: -30, max: -80 },
            speedX: { min: -3, max: 8 },
            gravityY:0,
            radial:false,

        })


        this.particlesEmit1= particles1.createEmitter({
            scale: { start: 1, end: 0.4},
            rotate: { min: 360, max: -180 },
            frequency:50,
            // lifespan: { min: 0.1, max: 10  },
            blendMode: Phaser.BlendModes.ADD,
            // radial:true,
            speed:25,

        });

       this.particlesEmit.startFollow(this.player,5,-65)
        particles1.setDepth(8);
        particles.setDepth(1);
    }

    // DEPLACEMENTS DU JOUEUR
    jump(){
        this.player.setVelocityY(-350);
        this.player.play('jump', true);
        this.particlesEmit.startFollow(this.player,3.5,-65)


    }
    moveRight(){
        this.player.setVelocityX(295);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.particlesEmit.startFollow(this.player,33,-65)
    }
    moveLeft(){
        this.player.setVelocityX(-295);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(true);
        this.particlesEmit.startFollow(this.player,-33,-65)

    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
            this.particlesEmit.startFollow(this.player,3.5,-69)
        }
        if(this.player.flipX===true){
            this.particlesEmit.startFollow(this.player,-3.5,-69)

        }

    }
    /**dead(){
    this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('dead',true)
        }
    }*/
}



