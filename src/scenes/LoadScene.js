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

        this.load.image("start_button", "./assets/HUD/start.png")
        
        // HUD

        this.load.image("heart", "./assets/HUD/heart.png")

        this.load.image("tutorial1", "./assets/HUD/tutorial1.png")
        
        this.load.image("okButton", "./assets/HUD/ok_button.png")
        this.load.image("pressedOkButton", "./assets/HUD/pressed_ok_button.png")


        // coin

        this.load.spritesheet("coin", "./assets/HUD/coin-sheet.png", 
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

        this.load.spritesheet("king-monster", "assets/Sprites/monster-running.png",
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

        // key

        this.load.spritesheet("key", "assets/Sprites/key.png",
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

        this.load.image("finish-button", "./assets/HUD/finish-button.png")
        this.load.image("finish-button-pressed", "./assets/HUD/finish-button-pressed.png")

        this.load.image("3-stars", "./assets/HUD/3-stars.png")
        this.load.image("2-stars", "./assets/HUD/2-stars.png")
        this.load.image("1-stars", "./assets/HUD/1-stars.png")
        this.load.image("0-stars", "./assets/HUD/0-stars.png")


        // create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff // white
            }
        })


        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on("complete", () => {
            console.log("done")
        })

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
            key: "king_monster_right",
            frames: this.anims.generateFrameNumbers("king-monster",
            {
                frames: [0, 1, 2, 3, 4, 5]
            }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "king_monster_left",
            frames: this.anims.generateFrameNumbers("king-monster",
            {
                frames: [6, 7, 8, 9, 10, 11]
            }),
            frameRate: 12,
            repeat: -1,
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
            frameRate: 5,
            repeat: -1,
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

        // start menu

        this.scene.start(CST.SCENES.MENU)
    }
}

