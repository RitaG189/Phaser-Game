import { CST  } from "../CST.js";

export class FirstCastleScene extends Phaser.Scene {

    constructor() {
        super({ key: CST.SCENES.CASTLE});
    }


    preload ()
    {
        this.load.image('castle_inside', 'assets/Maps/castle_inside.png');
        this.load.image('castle_borders', 'assets/Maps/castle_borders.png');
        this.load.image('platform1', 'assets/Platforms/platform1.png');
        this.load.image('platform2', 'assets/Platforms/platform2.png');

        this.load.spritesheet('dude', 'assets/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    
    create ()
    {


        let inside = this.add.image(-100, 0, 'castle_inside').setOrigin(0).setDepth(0);
        let borders = this.add.image(-100, 0, 'castle_borders').setOrigin(0).setDepth(0);
        inside.setScale(1.2);
        borders.setScale(1.2);

        
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 250, "platform2").setScale(1).refreshBody();
        platforms.create(300,290, "platform1");

    }
    
}