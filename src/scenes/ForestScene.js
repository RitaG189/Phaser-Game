import { CST  } from "../CST.js";



export class ForestScene extends Phaser.Scene {

    constructor(game) 
    {
        super({ key: CST.SCENES.LEVEL1 })
    }


    preload ()
    {
        this.load.image("forest", "assets/forest.png")
        this.load.image("forest_borders1", 'assets/Ground/level1_ground1.png')
        this.load.image("forest_borders2", 'assets/Ground/level1_ground2.png')
        this.load.image("forest_borders3", 'assets/Ground/level1_ground3.png')
        this.load.image("forest_borders4", 'assets/Ground/level1_ground4.png')
        this.load.image("platform", 'assets/Platforms/platform3.png')

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
    
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(0, 384, "forest_borders1").setOrigin(0).refreshBody()
        this.platforms.create(192, 352, "forest_borders2").setOrigin(0).refreshBody()
        this.platforms.create(416, 352, "forest_borders3").setOrigin(0).refreshBody()
        this.platforms.create(448, 320, "forest_borders4").setOrigin(0).refreshBody()
        this.platforms.create(664, 300, "platform").refreshBody()
        this.platforms.create(816, 340, "wall").refreshBody()

        this.portal = this.physics.add.sprite(760, 358, "portal").setScale(1.8)

        
        // HUD

        this.heart1 = this.add.sprite(270, 176, "heart_sprite").setDepth(1).setScrollFactor(0)
        this.heart2 = this.add.sprite(286, 176, "heart_sprite").setDepth(1).setScrollFactor(0)
        this.heart3 = this.add.sprite(302, 176, "heart_sprite").setDepth(1).setScrollFactor(0)
        this.scoreCoin = this.add.image(270, 200, "coin").setDepth(1).setScrollFactor(0)
        this.displayScore = this.add.text(286, 193, "0").setDepth(1).setScrollFactor(0)

        // tutorial 

        this.tutorial = this.add.image(256, 326, "tutorial1").setDepth(1).setScale(1.6)
        let okButton = this.add.image(256, 392, "okButton").setDepth(1).setScale(1.6)
        
        okButton.setInteractive();

        okButton.on("pointerover", () => {
            this.pressedButton = this.add.image(256, 392, "pressedOkButton").setDepth(1).setScale(1.6)
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

        const playerX = 20
        const playerY = 30
                                            
        this.player = this.physics.add.sprite(30, 369, "main")
        this.player.setSize(playerX, playerY, true)


        // add monster

        const sizeMonsterX = 15
        const sizeMonsterY = 15

        this.monster = this.physics.add.sprite(520, 312, "monster_sprite")
        this.monster.setSize(sizeMonsterX, sizeMonsterY, true)
        this.monsterAlive = true

        this.monster2 = this.physics.add.sprite(660, 280, "monster_sprite")
        this.monster2.setSize(sizeMonsterX, sizeMonsterY, true)
        this.monster2Alive = true


        
        // add coin        

        const coinX = 15
        const coinY = 17

        this.coin = this.physics.add.sprite(240, 342, "coin")
        this.coin.setSize(coinX, coinY, true)
        this.collectedCoin1 = false

        this.coin2 = this.physics.add.sprite(662, 376, "coin")
        this.coin2.setSize(coinX, coinY, true)
        this.collectedCoin2 = false


        // collisions

        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platforms)

        this.monster.setCollideWorldBounds(true)
        this.physics.add.collider(this.monster, this.platforms)

        this.monster2.setCollideWorldBounds(true)
        this.physics.add.collider(this.monster2, this.platforms)

        this.coin.setCollideWorldBounds(true)
        this.physics.add.collider(this.coin, this.platforms)

        this.coin2.setCollideWorldBounds(true)
        this.physics.add.collider(this.coin2, this.platforms)


        this.physics.add.collider(this.player, this.monster, this.handlePlayerEnemyCollision, null, this)

        this.physics.add.collider(this.player, this.monster2, this.handlePlayerEnemyCollision2, null, this)

        this.physics.add.collider(this.player, this.coin, this.collectCoin, null, this)
        this.physics.add.collider(this.player, this.coin2, this.collectCoin2, null, this)


        // fix camera to player

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, 800, 480)
        this.cameras.main.setZoom(2, 2)

        // portal

        this.portal.setCollideWorldBounds(true)
        this.physics.add.collider(this.portal, this.platforms)
        this.physics.add.overlap(this.player, this.portal, this.handlePlayerPortalCollision, null, this)



        
    }

    
    update() 
    {

        const speed = 100
        const jump = -330

        this.displayScore.setText(this.score)
        this.displayScore.setFontSize(16)


        // movement

            // player

        const cursors = this.input.keyboard.createCursorKeys()

        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)


        

        this.player.body.velocity.x = 0
        

        if (cursors.left.isDown) {

            this.player.setVelocityX(-speed)
            
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
            this.player.setVelocityX(speed)

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
            this.monster.anims.play("idle_monster", true); 
        }    
        else if(!this.monsterAlive) {
            this.monster.destroy()
        }

        if (this.monster2Alive) {
            this.monster2.anims.play("idle_monster", true); 
        }    
        else if(!this.monster2Alive) {
            this.monster2.destroy()
        }

            // coin

        if (!this.collectedCoin1) {
            this.coin.anims.play("spinning", true)
        }
        else if (this.collectedCoin1) {
            this.coin.destroy()
        }
         
        if (!this.collectedCoin2) {
            this.coin2.anims.play("spinning", true)
        }
        else if (this.collectedCoin2) {
            this.coin2.destroy()
        }

        if (this.collectedCoin3) {
            this.coin3.destroy()
        }

        if (this.collectedCoin4) {
            this.coin4.destroy()
        }
         
         

        // jump

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.player.body.touching.down){
            this.player.setVelocityY(jump)
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

        if(this.lvlCompleted) 
        {
            this.scene.pause()
        }

        // shot

        if(!this.shotVisible) 
        {
            this.shot.destroy()
            this.shotVisible = true
        }
        
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

    collectCoin4()
    {
        this.collectedCoin4 = true
        this.score += 1
    }


    shoot() 
    {

        const direction = this.lastKeyPressed
        const velocity = 150

        switch (direction) 
        {
            case "left":
                this.shot = this.physics.add.image(this.player.x - 22, this.player.y - 5, "left-shot").setOrigin(0).setDepth(1)
                this.shot.body.setAllowGravity(false)
                this.shot.setVelocityX(-velocity)
                this.physics.add.collider(this.shot, this.platforms, this.handleShotPlatformsCollision, null, this)
                break

            case "right":
                this.shot = this.physics.add.image(this.player.x + 5, this.player.y - 5, "right-shot").setOrigin(0).setDepth(1)
                this.shot.body.setAllowGravity(false)
                this.shot.setVelocityX(velocity)
                this.physics.add.collider(this.shot, this.platforms, this.handleShotPlatformsCollision, null, this)
                break
        }

        

        this.physics.add.collider(this.shot, this.monster, this.handleCollisionShotMonster, null, this)
        this.physics.add.collider(this.shot, this.monster2, this.handleCollisionShotMonster2, null, this)

    }

    handleShotPlatformsCollision() 
    {
        this.shotVisible = false
    }

    handleCollisionShotMonster() 
    {
        this.monsterAlive = false
        this.shot.visible = false   

        this.coin3 = this.physics.add.sprite(this.monster.x, this.monster.y - 40, "coin")
        this.coin3.setSize(15, 17, true)
        this.collectedCoin3 = false

        this.physics.add.collider(this.player, this.coin3, this.collectCoin3, null, this)
        this.physics.add.collider(this.platforms, this.coin3)
        this.coin3.body.bounce.set(0.8)
        this.coin3.body.gravity.set(0, 40)
        this.coin3.anims.play("spinning", true)
    }

    handleCollisionShotMonster2() 
    {
        this.monster2Alive = false
        this.shot.visible = false
        
        this.coin4 = this.physics.add.sprite(this.monster2.x, this.monster2.y - 40, "coin")
        this.coin4.setSize(15, 17, true)
        this.collectedCoin4 = false

        this.physics.add.collider(this.player, this.coin4, this.collectCoin4, null, this)
        this.physics.add.collider(this.platforms, this.coin4)
        this.coin4.body.bounce.set(0.8)
        this.coin4.body.gravity.set(0, 40)
        this.coin4.anims.play("spinning", true)
    }

    handlePlayerPortalCollision() 
    {

        console.log("clicar seta cima para entrar");

        var up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        if (Phaser.Input.Keyboard.JustDown(up))
        {
            this.lvlCompletedPanel = this.add.image(550, 330, "level-completed").setDepth(2)
            this.lvlCompleted = true
        }
    }

}

