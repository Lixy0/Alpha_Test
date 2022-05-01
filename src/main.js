const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1600,
    height: 900,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1600,
            height: 900,
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true,
        },
    },
    scene: new scene(),
};

const game = new Phaser.Game(config);