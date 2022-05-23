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

        let particlesLeaf = container.add.particles('leaf');
        let particlesEmitLeaf= particlesLeaf.createEmitter({
            angle: { min: 180, max: 0 },
            lifespan: {min: 100*4, max: 300*4},
            scale: {start: 0.30, end: 0.20},
            rotate: { min: 90, max: -90 },
            speed: 80,
        });
        particlesLeaf.setDepth(500)
        return particlesEmitLeaf;

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
            gravityY: 0,
            radial: false,
        });
        particlesFire.setDepth(1)
        return particlesEmitFire;
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





}//END-CLASS-PARTICULES