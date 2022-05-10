const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 600,
    height: 600,
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
            fps:140,
        },
    },
    scene: new scene(),
};

const game = new Phaser.Game(config);