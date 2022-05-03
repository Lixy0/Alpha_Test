class Player {


    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(1100, 2700, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.player.setDisplaySize(130,130)
        this.scene.physics.add.collider(this.player, this.scene.colliders);
        this.particles()


        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'Test_AnimRUN (1)',
                suffix:'.png',
                start: 0,
                end: 10,
                zeroPad:2,
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('idle', {
                prefix: 'Idle_Anim_0000s_0011_',
                suffix:'.png',
                start: 0,
                end: 10,
                zeroPad:1,
            }),
            frameRate: 10,
            repeat: -1

        });

        /**this.scene.anims.create({
            key: 'dead',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,
        });*/
    }
    particles(){
        let particles = this.scene.add.particles('fire');

        this.particlesEmit= particles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.1, end: 0.5},
            //tint: { start: 0xff945e, end: 0xff945e },
            speed: 20,
            accelerationY: -300,
            angle: { min: -85, max: -95 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 400, max: 600 },
            blendMode: 'ADD',
            frequency: 10,


        });
        this.particlesEmit.startFollow(this.player,20,-50)
    }

    jump(){
        this.player.setVelocityY(-300);
        this.player.play('jump', true);
    }
    moveRight(){
        this.player.setVelocityX(390);
        this.player.setFlipX(false);
        this.particlesEmit.startFollow(this.player,20,-50)
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
    }
    moveLeft(){
        this.player.setVelocityX(-300);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(true);
        this.particlesEmit.startFollow(this.player,-20,-50)
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }
    /**dead(){
    this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('dead',true)
        }
    }*/
}



