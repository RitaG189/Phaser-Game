import { CST  } from "../CST.js";



export class ForestScene extends Phaser.Scene {

    constructor(game) 
    {
        super({ 
            key: CST.SCENES.LEVEL1})
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
        
    }

    
    create ()
    {

    // close tutorial


        // add scenario
        
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

        this.tutorial = this.add.image(256, 326, "tutorial1").setDepth(1).setScale(2)
        let okButton = this.add.image(256, 411, "okButton").setDepth(1).setScale(2)
        
        
        
        okButton.setInteractive();

        okButton.on("pointerover", () => {
            this.pressedButton = this.add.image(256, 411, "pressedOkButton").setDepth(1).setScale(2)
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



        // add player character 
                                            
        this.player = this.physics.add.sprite(30, 369, "main")
        this.player.setSize(20, 30, true)


        // add monster

        this.monster = this.physics.add.sprite(520, 312, "monster_sprite")
        this.monster.setSize(15, 15, true)
        this.monsterAlive = true

        this.monster2 = this.physics.add.sprite(660, 280, "monster_sprite")
        this.monster2.setSize(15, 15, true)
        this.monster2Alive = true


        
        // add coin

        this.coin = this.physics.add.sprite(240, 342, "coin")
        this.coin.setSize(15, 17, true)
        this.collectedCoin1 = false

        this.coin2 = this.physics.add.sprite(662, 376, "coin")
        this.coin2.setSize(15, 17, true)
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
         
         

        // jump

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.player.body.touching.down){
            this.player.setVelocityY(jump)
            //this.delayJump()

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

        console.log(this.health)
    
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

        console.log(this.health)
    
    
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


    shoot() 
    {

        console.log("attack")

        const direction = this.lastKeyPressed

        const playerX = this.player.x
        const playerY = this.player.y



        switch (direction) 
        {
            case "left":
                this.shot = this.leftShot = this.physics.add.image(playerX, playerY, "left-shot").setOrigin(0).setDepth(1)
                this.leftShot.setVelocityX(-150)
                this.leftShot.setCollideWorldBounds(true)
                this.physics.add.collider(this.leftShot, this.platforms)
                break

            case "right":
                this.shot = this.rightShot = this.physics.add.image(playerX, playerY, "right-shot").setOrigin(0).setDepth(1)
                this.rightShot.setVelocityX(150)
                this.rightShot.setCollideWorldBounds(true)
                this.physics.add.collider(this.rightShot, this.platforms)
                break
        }

        this.physics.add.collider(this.shot, this.monster, this.handleCollisionShotMonster, null, this)
        this.physics.add.collider(this.shot, this.monster2, this.handleCollisionShotMonster2, null, this)

    }

    handleShotCollisionLeft() 
    {
        this.leftShot.destroy()
    }

    handleShotCollisionRight() 
    {
        this.rightShot.destroy()
    }

    handleCollisionShotMonster() 
    {      // tentar meter monstro em group
        
        this.monsterAlive = false
        this.shot.visible = false   
        this.score += 1     // colocar moeda a saltar
    }

    handleCollisionShotMonster2() 
    {
        this.monster2Alive = false
        this.shot.visible = false
        this.score += 1     // colocar moeda a saltar
    }

    handlePlayerPortalCollision() 
    {

        console.log("clicar seta cima para entrar");

        var up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        if (Phaser.Input.Keyboard.JustDown(up))
        {
            this.lvlCompleted = this.add.image(40, 40, "level-completed")
        }
    }

}


// ter barra de power em que sempre que gasta x power tem de ir buscar o foguinho 
// recuperar

