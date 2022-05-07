import { CST } from "../CST.js";

export class TutorialScene extends Phaser.Scene 
{

    constructor() 
    {
        super({ key: CST.SCENES.TUTORIAL})
    }


    create() 
    {
        this.add.image(506, 296, "tutorial1").setScale(2)


        let okButton = this.add.image(506, 363, "okButton").setScale(2)
        
        okButton.setInteractive();

        okButton.on("pointerover", () => {
            this.pressedButton = this.add.image(506, 363, "pressedOkButton").setScale(1.6)
            this.pressedButton.setVisible(true);
        })

        okButton.on("pointerup", () => {
            this.scene.stop()
            this.scene.resume(CST.SCENES.LEVEL1)
        })

        okButton.on("pointerout", () => {
            this.pressedButton.setVisible(false);
        })
    }

}