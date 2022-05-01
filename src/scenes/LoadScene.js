import { CST } from "../CST.js";

export class LoadScene extends Phaser.Scene {

    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }

    init() {

    }

    preload() {


        // load images and spritesheets

        this.load.image("background_menu", "./assets/background.jpg");


        this.load.image("start_button", "./assets/start.png");
        this.load.image("options_button", "./assets/options.png");
        
        this.load.image("heart", "./assets/HUD/heart.png");

        this.load.image("tutorial1", "./assets/HUD/tutorial1.png")
        
        this.load.image("okButton", "./assets/HUD/ok_button.png")
        this.load.image("pressedOkButton", "./assets/HUD/pressed_ok_button.png")

        this.load.spritesheet("heart_sprite", "./assets/HUD/heart_sprite.png", {
            frameHeight: 32,
            frameWidth: 32
        });

        this.load.spritesheet("coin", "./assets/HUD/coin-sheet.png", {
            frameHeight: 32,
            frameWidth: 32
        });

        
        this.load.spritesheet('main', './assets/Sprites/Main.png', { 
            frameWidth: 32, 
            frameHeight: 32,
        });

        
        this.load.spritesheet("monster_sprite", "assets/Sprites/monster_sprite.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.image("right-shot", "assets/Sprites/shot-right.png")
        this.load.image("left-shot", "assets/Sprites/shot-left.png")
        

        this.load.image("monster", "./assets/Sprites/monster.png");
        

        // create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff // white
            }
        })


        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
            console.log("done");
        })
    }

    create() {

        

       // animations

        this.anims.create({
            key: "spinning",
            frameRate: 8,
            repeat: -1, //repeat forever
            frames: this.anims.generateFrameNumbers("coin", {
                frames: [0, 1, 2, 3, 4, 5]
            })
        })

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
            key: 'right',
            frames: this.anims.generateFrameNumbers("main", 
            {
                frames: [0,1,2]
            }),
            frameRate: 15,
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

    

        this.scene.start(CST.SCENES.MENU);
    }
}

