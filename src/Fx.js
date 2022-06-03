class Fx {

    // LE CONTAINER NOUS PERMET DE LE PLACER DANS NIMPORTE QUEL CLASSE/set x/y
    /**
     *
     * @param container
     * @returns {*|void|Phaser.GameObjects.Particles.ParticleEmitterManager}
     */
    static particlesLeafPlat(container){
        console.log("particlesLeafPlat");
        // PARTICULES LEAF

        let particlesLeafPlat = container.add.particles('leaf2');
        let particlesEmitLeaf= particlesLeafPlat.createEmitter({
            angle: { min: 180, max: 0 },
            lifespan: {min: 100*4, max: 300*4},
            scale: {start: 0.30, end: 0.20},
            rotate: { min: 90, max: -90 },
            speed: 80,
        });
        particlesLeafPlat.setDepth(500)
        return particlesEmitLeaf;

    }

    static particlesLeafFal(container){
        console.log("particlesLeafPlat");
        // PARTICULES LEAF
        let particlesLeafFal = container.add.particles('flame1');
        let particlesEmitLeafFal= particlesLeafFal.createEmitter({
            tint: 0x00FF00,
            alpha: {start: 0.1, end: 0.01},
            scale: {start: 2, end: 1},
            rotate: {min: 360, max: -360},
            lifespan: {min: 100*4, max: 300*4},
            blendMode: Phaser.BlendModes.ADD,
            frequency: 30,
            speed : 90,
        });
        particlesLeafFal.setDepth(9999)
        return particlesEmitLeafFal;

    }
    /**
     *
     * @param container
     * @returns {*}
     */
    static particlesFire(container) {
        console.log("particlesFire");
        // PARTICULE FEUX PERSONNAGE

        let particlesFire = container.add.particles('flame1');
        let particlesEmitFire = particlesFire.createEmitter({
            alpha: {start: 0.75, end: 0.01},
            scale: {start: 0.40, end: 0.1},
            tint: {start: 0xff945e, end: 0xff945e},
            accelerationY: -90,
            rotate: {min: 180, max: -180},
            lifespan: {min: 600, max: 400 * 2},
            blendMode: Phaser.BlendModes.ADD,
            angle: {min: 0, max: 360},
            frequency: 11,
            speedY: {min: -30, max: -80},
            speedX: {min: -3, max: 8},
            radial: false,

        });
        particlesFire.setDepth(1)
        return particlesEmitFire;
    }
    // /**
    //  *
    //  * @param container
    //  * @returns {*}
    //  */
    // static particlesFireMenu(container) {
    //     console.log("particlesFire");
    //     // PARTICULE FEUX PERSONNAGE
    //
    //     let particlesFireMenu = container.add.particles('flameblack');
    //     let particlesEmitFireMenu = particlesFireMenu.createEmitter({
    //         x:780,
    //         y:230,
    //         tint:0x000000,
    //         alpha: {start: 0.75, end: 0.01},
    //         scale: {start: 0.40, end: 0.1},
    //         accelerationX: 50,
    //         accelerationY: 10,
    //         rotate: {min: 180, max: -180},
    //         lifespan: {min: 600, max: 400 * 2},
    //         blendMode: Phaser.BlendModes.ADD,
    //         angle: {min: 0, max: 90},
    //         frequency: 10,
    //         speedY: {min: -10, max: -60},
    //         speedX: {min: 30, max: 80},
    //         radial: false,
    //
    //     });
    //     particlesFireMenu.setDepth(1)
    //     return particlesEmitFireMenu;
    // }

    /**
     *
     * @param container
     * @returns {Phaser.GameObjects.Particles.ParticleEmitter}
     */
    static particlesFireWhite(container) {
        console.log("particlesFireWhite");
        // PARTICULE FEUX PERSONNAGE

        let particlesFireWhite = container.add.particles('flame1');
        let particlesEmitFireWhite = particlesFireWhite.createEmitter({
            tint: 0xffffff,
            blendMode: Phaser.BlendModes.ADD,
            angle: {min: 0, max: 90},
            frequency:200,
            scale: 6,
            rotate: { min: -360, max: 360},
            speedY: {min: 50, max: 100},
            speedX: {min: -50, max: 1000},
            accelerationY: {min: -60, max: 80},
            lifespan: 10000,
            accelerationX: {min: 500, max: -100},
            alpha:0.02,

        });
        particlesFireWhite.setX(908)
        particlesFireWhite.setY(2700)

        particlesFireWhite.setDepth(1)
        return particlesEmitFireWhite;
    }

    static particlesCloud(container) {
        console.log("particlesCloud");
        // PARTICULE FEUX PERSONNAGE

        let particlesCloud = container.add.particles('TEST');
        let particlesEmitCloud = particlesCloud.createEmitter({
            tint: 0xffffff,
            alpha: {start: 0.1, end: 0.01},
            scale: {start: 0.2, end: 0.08},
            // accelerationY: -90,
            rotate: {min: 180, max: -180},
            lifespan: {min: 600, max: 400 * 2},
            blendMode: Phaser.BlendModes.ADD,
            angle: {min: 0, max: 360},
            frequency: 11,
            speedY: {min: -30, max: -80},
            speedX: {min: -3, max: 8},
            radial: false,

        });


        particlesCloud.setDepth(7)
        return particlesEmitCloud;
    }

    /**
     *
     * @param container
     * @returns {Phaser.GameObjects.Particles.ParticleEmitter}
     */
    static particlesSmokeMenu(container) {
        console.log("smoke menu");

        let particlesSmokeMenu = container.add.particles('TEST');
        const rectzone2 = new Phaser.Geom.Rectangle(0,0,1280,310)
        let particlesEmitSmokeMenu = particlesSmokeMenu.createEmitter({
            emitZone : {type:"random", source : rectzone2},
            blendMode: Phaser.BlendModes.ADD,
            angle: {min: 0, max: 90},
            frequency:5,
            scale: {min:10,max:13},
            rotate: { min: -180, max: 360},
            speedX: {min: -500, max: 1000},
            // accelerationY: {min: -1, max: -2},
            lifespan: 9000,
            accelerationX: {min: 500, max: -100},
            alpha:0.45,

        });
        particlesSmokeMenu.setX(908)
        particlesSmokeMenu.setY(2700)

        particlesSmokeMenu.setDepth(3)
        return particlesEmitSmokeMenu;
    }
    /**
     *
     * @param container
     * @returns {*}
     */
    static particlesSave(container){
        console.log("particlesSave");
        // PARTICULE SAUVEGARDE

        let particlesSave = container.add.particles('saveSpark');
        let particlesEmitSave= particlesSave.createEmitter({
            scale: { start: 1, end: 0.4},
            rotate: { min: 360, max: -180 },
            frequency:50,
            // lifespan: { min: 0.1, max: 10  },
            blendMode: Phaser.BlendModes.ADD,
            // radial:true,
            speed:25,


        });
        particlesSave.setDepth(500)
        return particlesEmitSave;
    }

    /**
     *
     * @param container
     * @returns {*|void|Phaser.GameObjects.Particles.ParticleEmitterManager}
     */

    static particlesLeafWind(container){
        console.log("particlesLeafWind");
        // PARTICULES LEAF

        let particlesLeafWind = container.add.particles('leaf');
        const rectzone = new Phaser.Geom.Rectangle(0,0,1280,720)
        let particlesEmitLeafWind= particlesLeafWind.createEmitter({
            emitZone : {type:"random", source : rectzone},
            angle: { min: 0, max: 0 },
            frequency:200,
            scale: 0.30,
            depth : 10,
            rotate: { min: -10, max: 360},
            speedY: {min: 250, max: 300},
            speedX: {min: -50, max: 1000},
            accelerationY: {min: -60, max: 80},
            lifespan: 10000,
            accelerationX: {min: 500, max: -100},
            alpha:0.9,



        });
        particlesLeafWind.setDepth(2)
        return particlesEmitLeafWind;

    }



}//END-CLASS-PARTICULES