import { CST } from "../CST.js"

export class LoadScene extends Phaser.Scene 
{

    constructor() 
    {
        super({ key: CST.SCENES.LOAD })
    }

    preload() 
    {
        // load images and sprites

        // menu

        this.load.image("background_menu", "./assets/Backgrounds/background.jpg")

        this.load.image("start_button", "./assets/Buttons/start.png")
        this.load.image("start_button_pressed", "./assets/Buttons/start-pressed.png")
        
        // HUD

        this.load.image("heart", "./assets/HUD/heart.png")

        this.load.image("tutorial1", "./assets/HUD/tutorial1.png")
        
        this.load.image("okButton", "./assets/Buttons/ok_button.png")
        this.load.image("pressedOkButton", "./assets/Buttons/pressed_ok_button.png")

        this.load.image("tutorialButton", "./assets/Buttons/tutorial.png")
        this.load.image("tutorialButtonPressed", "./assets/Buttons/tutorial-pressed.png")


        // coin

        this.load.spritesheet("coin", "./assets/Objects/coin-sheet.png", 
        {
            frameHeight: 32,
            frameWidth: 32
        })

        this.load.spritesheet("premiumCoin", "./assets/Objects/premium-coin.png", 
        {
            frameHeight: 32,
            frameWidth: 32
        })


        // player
        
        this.load.spritesheet('main', './assets/Sprites/Main.png', 
        { 
            frameWidth: 32, 
            frameHeight: 32,
        })

        
        // monsters

        this.load.spritesheet("monster_sprite", "assets/Sprites/monster_sprite.png", 
        {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.spritesheet("monster-running", "assets/Sprites/monster-running.png",
        {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet("king-running", "assets/Sprites/king_running.png",
        {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet("monster-dead", "assets/Sprites/monster_dead.png",
        {
            frameWidth: 32,
            frameHeight: 32
        })

        // chest

        this.load.image("chest", "assets/Objects/chest.png")

        this.load.spritesheet("chestOpening", "assets/Sprites/open-chest.png",
        {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet("sparkle", "assets/Objects/sparkle.png", 
        {
            frameWidth: 32,
            frameHeight: 32
        })

        // key

        this.load.spritesheet("key", "assets/Sprites/key.png",
        {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet("noKey", "assets/Objects/no-key.png",
        {
            frameWidth: 32,
            frameHeight: 32
        })


        // portal

        this.load.spritesheet("portal", "assets/Sprites/portal.png", 
        {
            frameWidth: 32,
            frameHeight: 32
        })


        // shots

        this.load.image("right-shot", "assets/Sprites/shot-right.png")
        this.load.image("left-shot", "assets/Sprites/shot-left.png")
        

        // end

        this.load.image("level-completed", "assets/HUD/level-completed.png")

        this.load.image("finish-button", "./assets/Buttons/finish-button.png")
        this.load.image("finish-button-pressed", "./assets/Buttons/finish-button-pressed.png")

        this.load.image("3-stars", "./assets/HUD/3-stars.png")
        this.load.image("2-stars", "./assets/HUD/2-stars.png")
        this.load.image("1-stars", "./assets/HUD/1-stars.png")
        this.load.image("0-stars", "./assets/HUD/0-stars.png")


        // game over

        this.load.image("tryAgain", "./assets/Buttons/repetir.png")
        this.load.image("tryAgainPressed", "./assets/Buttons/repetir-pressed.png")

        this.load.image("menu", "./assets/Buttons/menu.png")
        this.load.image("menuPressed", "./assets/Buttons/menu-pressed.png")

    }

    create() 
    {
       // create animations

       // coin

        this.anims.create({
            key: "spinning",
            frameRate: 8,
            repeat: -1, //repeat forever
            frames: this.anims.generateFrameNumbers("coin", {
                frames: [0, 1, 2, 3, 4, 5]
            })
        })

        this.anims.create({
            key: "premium-spinning",
            frameRate: 6,
            repeat: -1, //repeat forever
            frames: this.anims.generateFrameNumbers("premiumCoin", {
                frames: [0, 1, 2, 3, 4, 5]
            })
        })

        // monsters

        this.anims.create({
            key: "idle_monster",
            frames: this.anims.generateFrameNumbers("monster_sprite",
            {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "monster_right",
            frames: this.anims.generateFrameNumbers("monster-running",
            {
                frames: [0, 1, 2, 3, 4, 5]
            }),
            frameRate: 8,
            repeat: -1,
        })

        this.anims.create({
            key: "monster_left",
            frames: this.anims.generateFrameNumbers("monster-running",
            {
                frames: [6, 7, 8, 9, 10, 11]
            }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "king_monster_right",
            frames: this.anims.generateFrameNumbers("king-running",
            {
                frames: [0, 1, 2, 3, 4, 5]
            }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "king_monster_left",
            frames: this.anims.generateFrameNumbers("king-running",
            {
                frames: [6, 7, 8, 9, 10, 11]
            }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "dead",
            frames: this.anims.generateFrameNumbers("monster-dead",
            {
                frames: [0, 1, 2, 3]
            }),
            frameRate: 12,
            repeat: 0,
        })


        // player

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers("main", 
            {
                frames: [0,1,2]
            }),
            frameRate: 15,
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

        // portal

        this.anims.create({
            key: "portal",
            frames: this.anims.generateFrameNumbers("portal", 
            {
                frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
            }),
            frameRate: 10,
            repeat: -1,
        })

        // chest

        this.anims.create({
            key: "opening",
            frames: this.anims.generateFrameNumbers("chestOpening", 
            {
                frames: [0,1,2,3,4,5,6,7]
            }),
            frameRate: 10,
            repeat: 0,
        })

        this.anims.create({
            key: "sparkle",
            frames: this.anims.generateFrameNumbers("sparkle", 
            {
                frames: [0,1,2,3,4,5,6]
            }),
            frameRate: 10,
            repeat: 0,
        })

        // key
    
        this.anims.create({
            key: "key-spinning",
            frames: this.anims.generateFrameNumbers("key", 
            {
                frames: [0,1,2,3,4,5,6,7]
            }),
            frameRate: 8,
            repeat: -1,
        })

        this.anims.create({
            key: "keyNeeded",
            frames: this.anims.generateFrameNumbers("noKey", 
            {
                frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
            }),
            frameRate: 8,
            repeat: 0,
        })


        // start menu

        this.scene.start(CST.SCENES.MENU)
    }
}

