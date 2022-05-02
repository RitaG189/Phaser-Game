import { CST } from "../CST.js";

export class LevelsScene extends Phaser.Scene 
{

    constructor() 
    {
        super({ key: CST.SCENES.LEVELS })
    }


    create() 
    {
        this.add.image(500, 380, "background-levels")

        let lvl1 = this.add.image(400, 330, "level1").setScale(3)


        lvl1.setInteractive()

        lvl1.on("pointerover", () => {
            this.lvl1Pressed = this.add.image(400, 330, "level1-pressed").setScale(3)
            this.lvl1Pressed.setVisible(true);
        })

        lvl1.on("pointerup", () => {
            this.scene.start(CST.SCENES.LEVEL1);
            
        })

        lvl1.on("pointerout", () => {
            this.lvl1Pressed.setVisible(false);
        })


        var lvlLocked = true

        var lvl2 = this.add.image(480, 330, "level2").setScale(3)
        lvl2.setInteractive()

        if(lvlLocked)
        {
            this.add.image(480, 330, "level2-locked").setScale(3)
        }
        else if(!lvlLocked) 
        {
            lvl2.on("pointerover", () => {
                this.lvl2Pressed = this.add.image(480, 330, "level2-pressed").setScale(3)
                this.lvl2Pressed.setVisible(true);
            })

            lvl2.on("pointerup", () => {
                this.scene.start(CST.SCENES.LEVEL2);
                
            })

            lvl2.on("pointerout", () => {
                this.lvl2Pressed.setVisible(false);
            })
        }
        

        
        





    }


}