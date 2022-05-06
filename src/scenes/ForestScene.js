import { CST  } from "../CST.js";



export class ForestScene extends Phaser.Scene {

    constructor() 
    {
        super({ key: CST.SCENES.LEVEL1 })
    }


    preload ()
    {
        this.load.image("forest", "assets/Backgrounds/forest.png")
        this.load.image("forest_borders1", 'assets/Ground/level1_ground1.png')
        this.load.image("forest_borders1_2", "assets/Ground/ground1_2.png")
        this.load.image("forest_borders2", 'assets/Ground/level1_ground2.png')
        this.load.image("forest_borders3", 'assets/Ground/level1_ground3.png')
        this.load.image("forest_borders4", 'assets/Ground/level1_ground4.png')
        this.load.image("platform", 'assets/Platforms/platform1.png')
        this.load.image("platform-mini", "assets/Platforms/platform2.png")

        this.score = 0
        this.health = 3
        this.lastKeyPressed = "right"
        this.shotVisible = true
    }

    
    create ()
    {

    // close tutorial


        // scenario
        
        this.add.image(0, 0, "forest").setOrigin(0).setDepth(0)
        this.add.image(400, 0, "forest").setOrigin(0).setDepth(0)
    
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(-60, 384, "forest_borders1").setOrigin(0).refreshBody()
        this.platforms.create(540, 384, "forest_borders1_2").setOrigin(0).refreshBody()
        this.platforms.create(132, 352, "forest_borders2").setOrigin(0).refreshBody()
        this.platforms.create(356, 352, "forest_borders3").setOrigin(0).refreshBody()
        this.platforms.create(388, 320, "forest_borders4").setOrigin(0).refreshBody()

        this.platforms.create(666, 260, "platform").refreshBody()
        this.platforms.create(578, 300, "platform-mini").refreshBody().setSize(33, 22, true)
        this.platforms.create(962, 360, "platform-mini").refreshBody().setSize(33, 22, true)
        this.platforms.create(902, 310, "platform-mini").refreshBody().setSize(33, 22, true)
        this.platforms.create(970, 264, "platform-mini").refreshBody().setSize(33, 22, true)
        this.platforms.create(860, 216, "platform").refreshBody()


        this.portal = this.physics.add.sprite(780, 348, "portal").setScale(2)

        
        // HUD

        this.heart1 = this.add.image(270, 176, "heart").setDepth(1).setScrollFactor(0)
        this.heart2 = this.add.image(286, 176, "heart").setDepth(1).setScrollFactor(0)
        this.heart3 = this.add.image(302, 176, "heart").setDepth(1).setScrollFactor(0)
        this.scoreCoin = this.add.image(270, 200, "coin").setDepth(1).setScrollFactor(0)
        this.displayScore = this.add.text(286, 193, "0").setDepth(1).setScrollFactor(0)

        // tutorial 

        this.tutorial = this.add.image(506, 296, "tutorial1").setDepth(1).setScale(1.6).setScrollFactor(0)
        let okButton = this.add.image(506, 363, "okButton").setDepth(1).setScale(1.6).setScrollFactor(0)
        
        okButton.setInteractive();

        okButton.on("pointerover", () => {
            this.pressedButton = this.add.image(506, 363, "pressedOkButton").setDepth(1).setScale(1.6).setScrollFactor(0)
            this.pressedButton.setVisible(true);
        })

        okButton.on("pointerup", () => {
            okButton.destroy()
            this.pressedButton.destroy()
            this.tutorial.destroy()
        })

        okButton.on("pointerout", () => {
            this.pressedButton.setVisible(false);
        })


        // add player  

        const PLAYER_X = 20
        const PLAYER_Y = 30
                                            
        this.player = this.physics.add.sprite(30, 369, "main")
        this.player.setSize(PLAYER_X, PLAYER_Y, true)


        // add monster

        const SIZE_MONSTER_X = 15
        const SIZE_MONSTER_Y = 15
        const MONSTER_SPEED = 30

        this.monster = this.physics.add.sprite(460, 312, "monster_sprite")
        this.monster.setSize(SIZE_MONSTER_X, SIZE_MONSTER_Y, true)
        this.monsterAlive = true

        this.monster2 = this.physics.add.sprite(672, 200, "monster_sprite")
        this.monster2.setSize(SIZE_MONSTER_X, SIZE_MONSTER_Y, true)
        this.monster2Alive = true

        this.monster3 = this.physics.add.sprite(672, 373, "monster_sprite")
        this.monster3.body.setAllowGravity(false)
        this.monster3.setVelocityX(-MONSTER_SPEED)
        this.monster3.setSize(SIZE_MONSTER_X, SIZE_MONSTER_Y, true)
        this.monster3Alive = true
        this.monster3.anims.play("king_monster_left", true) 

        this.monster4 = this.physics.add.sprite(860, 190, "monster_throwing")
        this.monster4.setSize(SIZE_MONSTER_X, SIZE_MONSTER_Y, true)
        this.monster4Alive = true


        
        // add coin        

        const COIN_X = 15
        const COIN_Y = 17

        this.coin = this.physics.add.sprite(180, 342, "coin")
        this.coin.setSize(COIN_X, COIN_Y, true)
        this.collectedCoin1 = false

        this.coin2 = this.physics.add.sprite(290, 376, "coin")
        this.coin2.setSize(COIN_X, COIN_Y, true)
        this.collectedCoin2 = false

        this.coin3 = this.physics.add.sprite(578, 270, "coin")
        this.coin3.setSize(COIN_X, COIN_Y, true)
        this.collectedCoin3 = false


        // collisions

        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platforms)

        this.monster.setCollideWorldBounds(true)
        this.physics.add.collider(this.monster, this.platforms)

        this.monster2.setCollideWorldBounds(true)
        this.physics.add.collider(this.monster2, this.platforms)

        this.monster3.setCollideWorldBounds(true)
        this.physics.add.collider(this.monster3, this.platforms)

        this.monster4.setCollideWorldBounds(true)
        this.physics.add.collider(this.monster4, this.platforms)


        this.coin.setCollideWorldBounds(true)
        this.physics.add.collider(this.coin, this.platforms)

        this.coin2.setCollideWorldBounds(true)
        this.physics.add.collider(this.coin2, this.platforms)

        this.coin3.setCollideWorldBounds(true)
        this.physics.add.collider(this.coin3, this.platforms)


        this.physics.add.collider(this.player, this.monster, this.handlePlayerEnemyCollision, null, this)

        this.physics.add.collider(this.player, this.monster2, this.handlePlayerEnemyCollision2, null, this)

        this.physics.add.collider(this.player, this.monster3, this.handlePlayerEnemyCollision3, null, this)


        this.physics.add.collider(this.player, this.coin, this.collectCoin, null, this)
        this.physics.add.collider(this.player, this.coin2, this.collectCoin2, null, this)
        this.physics.add.collider(this.player, this.coin3, this.collectCoin3, null, this)


        // fix camera to player

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, 1000, 480)
        //this.cameras.main.setZoom(2, 2)

        // portal

        this.portal.setCollideWorldBounds(true)
        this.physics.add.collider(this.portal, this.platforms)
        this.physics.add.overlap(this.player, this.portal, this.handlePlayerPortalCollision, null, this)

        //this.throwBomb()

        this.graphics = this.add.graphics();

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    
        //  Path starts at 100x100
        this.path = new Phaser.Curves.Path(860, 190);
    
        this.path.lineTo(860, 190);
    
        // cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
        this.path.cubicBezierTo(970, 250, 860, 100, 980, 140);
    
        this.tweens.add({
            targets: this.follower,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            yoyo: false,
            repeat: -1
        });
    }

    
    update() 
    {
        // subsituir por imagem
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xffffff, 1);
    
        this.path.draw(this.graphics);
    
        this.path.getPoint(this.follower.t, this.follower.vec);
    
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillCircle(this.follower.vec.x, this.follower.vec.y, 12);

        const SPEED_PLAYER = 100
        const JUMP = -355

        this.displayScore.setText(this.score)
        this.displayScore.setFontSize(16)


        // movement

            // player

        const cursors = this.input.keyboard.createCursorKeys()

        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        this.player.body.velocity.x = 0
        

        if (cursors.left.isDown) {

            this.player.setVelocityX(-SPEED_PLAYER)
            
            if(this.player.body.touching.down){
                this.player.anims.play("left", true)
                this.lastKeyPressed = "left"
            }
            else {
                this.player.anims.stop()
            }
        }
        else if (cursors.right.isDown) 
        {
            this.player.setVelocityX(SPEED_PLAYER)

            if(this.player.body.touching.down){
                this.player.anims.play("right", true)
                this.lastKeyPressed = "right"
            }
            else {
                this.player.anims.stop()
            }
        }  


        // attack

        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.shoot();
        }


        if (this.player.body.velocity.x == 0) {
            this.player.anims.stop()
        }
        
            // monster

        if (this.monsterAlive) {
            this.monster.anims.play("idle_monster", true) 
        }    
        else if(!this.monsterAlive) {
            this.monster.destroy()
        }

        if (this.monster2Alive) {
            this.monster2.anims.play("idle_monster", true)
        }    
        else if(!this.monster2Alive) {
            this.monster2.destroy()
        }



        if (this.monster3Alive) 
        {
            const LEFT_LIMIT = 554
            const RIGHT_LIMIT = 874
            const SPEED_MONSTER = 30


            if (this.monster3.x === LEFT_LIMIT) 
            {
                this.monster3.setVelocityX(SPEED_MONSTER)
                this.monster3.anims.play("king_monster_right", true)     
            } 
            else if (this.monster3.x === RIGHT_LIMIT) 
            {
                this.monster3.setVelocityX(-SPEED_MONSTER)
                this.monster3.anims.play("king_monster_left", true)
            }
        }    
        else if(!this.monster3Alive) 
        {
            this.monster3.destroy()
        }


        if (this.monster4Alive) 
        {
            this.monster4.anims.play("throw", true)

            
        }    
        else if (!this.monster4Alive) 
        {
            this.monster4.destroy()
        }


            // coin

        if (!this.collectedCoin1) 
        {
            this.coin.anims.play("spinning", true)
        }
        else if (this.collectedCoin1) 
        {
            this.coin.destroy()
        }
         
        if (!this.collectedCoin2) 
        {
            this.coin2.anims.play("spinning", true)
        }
        else if (this.collectedCoin2) 
        {
            this.coin2.destroy()
        }

        if (!this.collectedCoin3) 
        {
            this.coin3.anims.play("spinning", true)
        }
        else if (this.collectedCoin3) 
        {
            this.coin3.destroy()
        }

        if (this.collectedcoinDrop1) 
        {
            this.coinDrop1.destroy()
        }

        if (this.collectedcoinDrop2) 
        {
            this.coinDrop2.destroy()
        }

        if (this.collectedcoinDrop3) 
        {
            this.coinDrop3.destroy()
        }
         
         

        // jump

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.player.body.touching.down){
            this.player.setVelocityY(JUMP)
        }

        

        // lose health

        if (this.health === 3) {
            this.heart3.visible = true
            this.heart2.visible = true
            this.heart1.visible = true
        }
        else if (this.health === 2) {
            this.heart3.visible = false
            this.heart2.visible = true
            this.heart1.visible = true
        }
        else if (this.health === 1) {
            this.heart3.visible = false
            this.heart2.visible = false
            this.heart1.visible = true
        }
        else if (this.health === 0) {
            this.heart3.visible = false
            this.heart2.visible = false
            this.heart1.visible = false
        }


        // portal

        this.portal.anims.play("portal", true)

        // shot

        if(!this.shotVisible) 
        {
            this.shot.destroy()
            this.shotVisible = true
        }

        // finish

        if(this.levelCompleted)
        {

            this.levelCompleted = this.add.image(740, 330, "level-completed").setDepth(2).setScale(1.8)


            const STARS_X = 740, STARS_Y = 312
            const TEXT_X = 755, TEXT_Y = 358

            if(this.score >= 4)
            {
                this.add.image(STARS_X, STARS_Y, "3-stars").setDepth(2)
            }
            else if(this.score >= 3 && this.score < 4)
            {
                this.add.image(STARS_X, STARS_Y, "2-stars").setDepth(2)
            }
            else if(this.score >= 2 && this.score < 3)
            {
                this.add.image(STARS_X, STARS_Y, "1-stars").setDepth(2)
            }
            else
            {
                this.add.image(STARS_X, STARS_Y, "0-stars").setDepth(2)
            }

            this.add.text(TEXT_X, TEXT_Y, this.score).setDepth(2)
    
            let completeButton = this.add.image(740, 402, "finish-button").setDepth(2).setScale(1.6)
    
            completeButton.setInteractive()
    
            completeButton.on("pointerover", () => {
                this.completeButtonPressed = this.add.image(740, 402, "finish-button-pressed").setDepth(3).setScale(1.6)
                this.completeButtonPressed.setVisible(true);
            })
    
            completeButton.on("pointerup", () => {
                this.levelCompleted.destroy()
                //this.scene.start(CST.SCENES.MENU);
                
            })
    
            completeButton.on("pointerout", () => {
                this.completeButtonPressed.setVisible(false);
            })
    
        }

        
    }

    shoot() 
    {

        const DIRECTION = this.lastKeyPressed
        const SHOT_SPEED = 250

        switch (DIRECTION) 
        {
            case "left":
                this.shot = this.physics.add.image(this.player.x - 22, this.player.y - 5, "left-shot").setOrigin(0).setDepth(1)
                this.shot.body.setAllowGravity(false)
                this.shot.setVelocityX(-SHOT_SPEED)
                this.physics.add.collider(this.shot, this.platforms, this.handleShotPlatformsCollision, null, this)
                break

            case "right":
                this.shot = this.physics.add.image(this.player.x + 5, this.player.y - 5, "right-shot").setOrigin(0).setDepth(1)
                this.shot.body.setAllowGravity(false)
                this.shot.setVelocityX(SHOT_SPEED)
                this.physics.add.collider(this.shot, this.platforms, this.handleShotPlatformsCollision, null, this)
                break
        }

        

        this.physics.add.collider(this.shot, this.monster, this.handleCollisionShotMonster, null, this)
        this.physics.add.collider(this.shot, this.monster2, this.handleCollisionShotMonster2, null, this)
        this.physics.add.collider(this.shot, this.monster3, this.handleCollisionShotMonster3, null, this)

    }

    
    handlePlayerEnemyCollision() 
    {
        this.player.setTint(0xff0000)

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.player.clearTint()
                
            },
            callbackScope: this,
            loop: false
        })

        this.monsterAlive = false

        this.health -= 1;
    
    }

    handlePlayerEnemyCollision2() 
    {
        this.player.setTint(0xff0000)

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.player.clearTint()
                
            },
            callbackScope: this,
            loop: false
        })

        this.monster2Alive = false

        this.health -= 1
    }

    handlePlayerEnemyCollision3() 
    {
        this.player.setTint(0xff0000)

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.player.clearTint()
                
            },
            callbackScope: this,
            loop: false
        })

        this.monster3Alive = false

        this.health -= 1
    }
    
    collectCoin() 
    {
        this.collectedCoin1 = true
        this.score += 1
    }

    collectCoin2() 
    {
        this.collectedCoin2 = true
        this.score += 1
    }

    collectCoin3() 
    {
        this.collectedCoin3 = true
        this.score += 1
    }

    collectcoinDrop1() 
    {
        this.collectedcoinDrop1 = true
        this.score += 1
    }

    collectcoinDrop2()
    {
        this.collectedcoinDrop2 = true
        this.score += 1
    }

    collectcoinDrop3()
    {
        this.collectedcoinDrop3 = true
        this.score += 1
    }

    handleShotPlatformsCollision() 
    {
        this.shotVisible = false
    }

    handleCollisionShotMonster() 
    {
        this.monsterAlive = false
        this.shot.visible = false   

        this.coinDrop1 = this.physics.add.sprite(this.monster.x, this.monster.y - 30, "coin")
        this.coinDrop1.setSize(15, 17, true)
        this.collectedcoinDrop1 = false

        this.physics.add.collider(this.player, this.coinDrop1, this.collectcoinDrop1, null, this)
        this.physics.add.collider(this.platforms, this.coinDrop1)
        this.coinDrop1.body.bounce.set(0.8)
        this.coinDrop1.body.gravity.set(0, 40)
        this.coinDrop1.anims.play("spinning", true)
    }

    handleCollisionShotMonster2() 
    {
        this.monster2Alive = false
        this.shot.visible = false
        
        this.coinDrop2 = this.physics.add.sprite(this.monster2.x, this.monster2.y - 30, "coin")
        this.coinDrop2.setSize(15, 17, true)
        this.collectedcoinDrop2 = false

        this.physics.add.collider(this.player, this.coinDrop2, this.collectcoinDrop2, null, this)
        this.physics.add.collider(this.platforms, this.coinDrop2)
        this.coinDrop2.body.bounce.set(0.8)
        this.coinDrop2.body.gravity.set(0, 40)
        this.coinDrop2.anims.play("spinning", true)
    }

    handleCollisionShotMonster3() 
    {
        this.monster3Alive = false
        this.shot.visible = false
        
        this.coinDrop3 = this.physics.add.sprite(this.monster3.x, this.monster3.y - 30, "coin")
        this.coinDrop3.setSize(15, 17, true)
        this.collectedcoinDrop3 = false

        this.physics.add.collider(this.player, this.coinDrop3, this.collectcoinDrop3, null, this)
        this.physics.add.collider(this.platforms, this.coinDrop3)
        this.coinDrop3.body.bounce.set(0.8)
        this.coinDrop3.body.gravity.set(0, 40)
        this.coinDrop3.anims.play("spinning", true)
    }

    handlePlayerPortalCollision() 
    {
        
        var enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        if (Phaser.Input.Keyboard.JustDown(enter))
        {
            this.levelCompleted = true
        }
    }

    throwBomb()
    {
        this.bomb = this.physics.add.sprite(866, 185, "bomb")

        this.bomb.setCollideWorldBounds(true)
        this.physics.add.collider(this.bomb, this.platforms)
        this.bomb.setVelocityX(200)
    }


}

