import { CST } from "../CST.js";

export class MenuScene extends Phaser.Scene {

    constructor() 
    {
        super({ key: CST.SCENES.MENU })
    }

    init(data) {
        console.log(data);

    }

    create(){

        // create images & buttons

        this.add.image(0, 0, "background_menu").setOrigin(0);

        
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 4, "start_button").setDepth(1);


        // sprites

        let hoverSprite = this.add.sprite("coin");
        hoverSprite.setScale(2);
        

        // make buttons interactive

        playButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("spinning");
            hoverSprite.x = 380;
            hoverSprite.y = 146;
        })

        playButton.on("pointerup", () => {
            this.scene.launch(CST.SCENES.LEVEL1);
        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })
    }
} 