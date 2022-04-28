import { CST  } from "../CST.js";



export class ForestScene extends Phaser.Scene {

    constructor() 
    {
        super({ 
            key: CST.SCENES.PLAY});
    }


    preload ()
    {
        this.load.image('forest', 'assets/Maps/forest_up.png');
        
        this.load.image('forest_borders1', 'assets/Ground/level1_ground1.png');
        this.load.image('forest_borders2', 'assets/Ground/level1_ground2.png');
        this.load.image('forest_borders3', 'assets/Ground/level1_ground3.png');
        this.load.image('forest_borders4', 'assets/Ground/level1_ground4.png');
        this.load.image('platform', 'assets/Platforms/platform3.png');

    }

    
    create ()
    {


        // HUD

        this.heart1 = this.add.sprite(220, 138, "heart_sprite").setDepth(1).setScrollFactor(0);
        this.heart2 = this.add.sprite(236, 138, "heart_sprite").setDepth(1).setScrollFactor(0);
        this.heart3 = this.add.sprite(252, 138, "heart_sprite").setDepth(1).setScrollFactor(0);
        
        // add scenario
        
        this.add.image(0, 0, 'forest').setOrigin(0).setDepth(0);
    
        const platforms = this.physics.add.staticGroup();
        platforms.create(0, 384, "forest_borders1").setOrigin(0).refreshBody();
        platforms.create(192, 352, "forest_borders2").setOrigin(0).refreshBody();
        platforms.create(416, 352, "forest_borders3").setOrigin(0).refreshBody();
        platforms.create(448, 320, "forest_borders4").setOrigin(0).refreshBody();
        platforms.create(664, 300, "platform").refreshBody();


        // add player character 

        this.player = this.physics.add.sprite(30, 368, "main");
        this.player.setSize(20, 30, true);


        // add monster

        this.monster = this.physics.add.image(700, 368, "monster");
    
        

        // collisions

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        this.monster.setCollideWorldBounds(true);
        this.physics.add.collider(this.monster, platforms);


        // animations

            // player sprites

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers("main", 
            {
                frames: [0,1,2]
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers("main", 
            {
                frames: [3,4,5]
            }),
            frameRate: 15,
            repeat: -1,
        })

            // hearts

         
        /*    
        this.anims.create({
            key: 'lose',
            frames: this.anims.generateFrameNumbers("heart",
            {
                frames: [0,1,2,3]
            }),
            frameRate: 10,
            repeat: -1,
        })
        */
        

        // fix camera to player

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 800, 480);
        this.cameras.main.setZoom(2, 2);
       
    }
        
    

    update() 
    {

        // movement

            // player

        const cursors = this.input.keyboard.createCursorKeys();
        this.player.setVelocityX(0);

        if (cursors.left.isDown) {
            this.player.setVelocityX(-100);
            this.player.anims.play("left", true);
        }
        else if (cursors.right.isDown) 
        {
            this.player.setVelocityX(100);
            this.player.anims.play("right", true);
        }  


        if (this.player.body.velocity.x == 0) {
            this.player.anims.stop();
        }
        
            // monster

        this.monster.setVelocityX(80);

        

        // jump

        if ((cursors.space.isDown || cursors.up.isDown) && this.player.body.touching.down) 
        {
            this.player.setVelocityY(-330);
            //this.delayJump();
 
        }

        // Lose heart

        //this.player.anims.play("lose", true);

    }

    

    /*              -- Delay no salto 
    delayJump() {


        if(jump > game.time.now)
        {
            return;
        }

        jump = game.time.now + 1000; // wait at least 1 second (1000ms) to next shot
        
    }
    */

}


