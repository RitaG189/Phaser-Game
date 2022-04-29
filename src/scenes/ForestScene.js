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
        this.hudCoin = this.add.sprite(220, 160, "coin").setDepth(1).setScrollFactor(0);


        // add scenario
        
        this.add.image(0, 0, 'forest').setOrigin(0).setDepth(0);
    
        const platforms = this.physics.add.staticGroup();
        platforms.create(0, 384, "forest_borders1").setOrigin(0).refreshBody();
        platforms.create(192, 352, "forest_borders2").setOrigin(0).refreshBody();
        platforms.create(416, 352, "forest_borders3").setOrigin(0).refreshBody();
        platforms.create(448, 320, "forest_borders4").setOrigin(0).refreshBody();
        platforms.create(664, 300, "platform").refreshBody();


        // add player character 
                                            
        this.player = this.physics.add.sprite(30, 369, "main");
        this.player.setSize(20, 30, true);


        // add monster

        this.monster = this.physics.add.sprite(520, 312, "monster_sprite");
        this.monster.setSize(15, 15, true);
        this.monsterAlive = true;
    
        // add coin

        this.coin = this.physics.add.sprite(665, 220, "coin");
        this.coin.setSize(15, 17, true);
        this.gotCoin = false;
        this.coinTotal = 0;
        
        

        // collisions

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        this.monster.setCollideWorldBounds(true);
        this.physics.add.collider(this.monster, platforms);

        this.coin.setCollideWorldBounds(true);
        this.physics.add.collider(this.coin, platforms);

        this.physics.add.collider(this.player, this.monster, this.handlePlayerEnemyCollision, null, this);
        
        this.physics.add.collider(this.player, this.coin, this.handlePlayerCoinCollision, null, this);

        


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
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers("main", 
            {
                frames: [3,4,5]
            }),
            frameRate: 15,
            repeat: -1,
        });

            // hearts

        this.anims.create({
            key: 'lose_heart',
            frames: this.anims.generateFrameNumbers("heart_sprite",
            {
                frames: [0,1,2,3]
            }),
            frameRate: 8,
            repeat: -1,
        });

            // monster

        this.anims.create({
            key: "idle_monster",
            frames: this.anims.generateFrameNumbers("monster_sprite",
            {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }),
            frameRate: 12,
            repeat: -1,
        })
        
        

        // fix camera to player

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 800, 480);
        this.cameras.main.setZoom(2, 2);
       

        
        // hearts

        this.health = 3;
        this.damage = 1;
        
    }
        
    

    update() 
    {

        const speed = 100;
        const jump = -330;
        

        // movement

            // player

        const cursors = this.input.keyboard.createCursorKeys();

        this.player.body.velocity.x = 0;
        

        if (cursors.left.isDown) {

            this.player.setVelocityX(-speed);
            
            if(this.player.body.touching.down){
                this.player.anims.play("left", true);
            }
            else {
                this.player.anims.stop();
            }
        }
        else if (cursors.right.isDown) 
        {
            this.player.setVelocityX(speed);

            if(this.player.body.touching.down){
                this.player.anims.play("right", true);
            }
            else {
                this.player.anims.stop();
            }
        }  


        if (this.player.body.velocity.x == 0) {
            this.player.anims.stop();
        }
        
            // monster

        if (this.monsterAlive) {
            this.monster.anims.play("idle_monster", true);  
        }    
        else if(!this.monsterAlive) {
            this.monster.destroy();
        }
         

        // jump

        if ((cursors.space.isDown || cursors.up.isDown) && this.player.body.touching.down){
            this.player.setVelocityY(jump);
            //this.delayJump();

        }

        // lose health

        if (this.health === 3) {
            this.heart3.visible = true;
            this.heart2.visible = true;
            this.heart1.visible = true;
        }
        else if (this.health === 2) {
            this.heart3.visible = false;
            this.heart2.visible = true;
            this.heart1.visible = true;
        }
        else if (this.health === 1) {
            this.heart3.visible = false;
            this.heart2.visible = false;
            this.heart1.visible = true;
        }
        else if (this.health === 0) {
            this.heart3.visible = false;
            this.heart2.visible = false;
            this.heart1.visible = false; 
        }

        // sum coins

        this.coinScore = this.add.text(238, 153, "0", 18).setScrollFactor(0);

        if (!this.gotCoin) {
            this.coin.anims.play("spinning", true);
        } 
        else if (this.coin){
           
            this.coin.destroy();
            this.coinTotal += 1;
        } 

    }

    
    handlePlayerEnemyCollision() {

        this.player.setTint(0xff0000);

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.player.clearTint();
                
            },
            callbackScope: this,
            loop: false
        })

        this.monsterAlive = false;

        this.health -= 1;

        console.log(this.health);
    
    
    }

    /*              -- Delay no salto 
    delayJump() {

        this.time.addEvent({
            delay: 500,
            callback: () => {
                console.log("waiting")
                
            },
            callbackScope: this,
            loop: false
        })


    }
    */

    handlePlayerCoinCollision() {


        this.gotCoin = true;
        this.coin += 1;
    }

}


