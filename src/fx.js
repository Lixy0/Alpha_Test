class fx {

    particles() {
        // PARTICULE FEUX PERSONNAGE
        let particlesFire = add.particles('flame1');
        this.particlesEmitFire= particlesFire.createEmitter({
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

        // PARTICULES FUMEE
        let particlesSmoke = add.particles('smoke');
        this.particlesEmitSmoke= particlesSmoke.createEmitter({
            alpha: { start: 1, end: 5 },
            scale: { start: 0.2, end: 0.05},
            rotate: { min: 180, max: -180 },
            tint: { start: 0xaaaaaa, end: 0xaaaaaa},
            frequency:50,
            lifespan: { min: 1, max: 1000  },
            // radial:false,
            speedY: { min: -30, max: -80 },
            speedX: { min: -3, max: 8 },
            gravityY:0,
            accelerationY: -90,
        });

        // PARTICULE SAUVEGARDE
        let particlesSave = add.particles('saveSpark');
        this.particlesEmitSave= particlesSave.createEmitter({
            scale: { start: 1, end: 0.4},
            rotate: { min: 360, max: -180 },
            frequency:50,
            // lifespan: { min: 0.1, max: 10  },
            blendMode: Phaser.BlendModes.ADD,
            // radial:true,
            speed:25,

        });


    }//END-PARTICULES





}//END-CLASS