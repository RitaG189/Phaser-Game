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


        // load image, spritesheet, sound

        this.load.image("background_menu", "./assets/background.png");
        this.load.image("start_button", "./assets/start.png");
        this.load.image("options_button", "./assets/options.png");
        
        this.load.image("heart", "./assets/HUD/heart.png");

        this.load.spritesheet("heart_sprite", "./assets/HUD/heart_sprite.png", {
            frameHeight: 32,
            frameWidth: 32
        });

        this.load.spritesheet("coin_menu", "./assets/coin-sheet.png", {
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
        this.scene.start(CST.SCENES.MENU);
    }
}

