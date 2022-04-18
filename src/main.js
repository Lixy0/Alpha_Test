const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1600,
    heigth: 900,
    scale: {
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