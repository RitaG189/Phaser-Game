import { CST } from "../CST.js";

export class EndScene extends Phaser.Scene 
{

    constructor() 
    {
        super({ key: CST.SCENES.END})
    }

    init(data)
    {
        this.score = data.score
    }


    create()
    {
        this.add.image(500, 300, "level-completed").setScale(3.2)


        const STARS_X = 500, STARS_Y = 274
        const TEXT_X = 530, TEXT_Y = 346

        if(this.score >= 4)
        {
            this.add.image(STARS_X, STARS_Y, "3-stars").setScale(2)
        }
        else if(this.score >= 3 && this.score < 4)
        {
            this.add.image(STARS_X, STARS_Y, "2-stars").setScale(2)
        }
        else if(this.score >= 2 && this.score < 3)
        {
            this.add.image(STARS_X, STARS_Y, "1-stars").setScale(2)
        }
        else
        {
            this.add.image(STARS_X, STARS_Y, "0-stars").setScale(2)
        }

        this.add.text(TEXT_X, TEXT_Y, this.score).setScale(2)



        let completeButton = this.add.image(500, 428, "finish-button").setScale(3)

        completeButton.setInteractive()

        completeButton.on("pointerover", () => {
            this.completeButtonPressed = this.add.image(500, 428, "finish-button-pressed").setScale(3)
            this.completeButtonPressed.setVisible(true);
        })

        completeButton.on("pointerup", () => {
            this.scene.restart(CST.SCENES.LEVEL1)  
            this.scene.stop(CST.SCENES.LEVEL1)    
            this.scene.stop()
            

            
        })

        completeButton.on("pointerout", () => {
            this.completeButtonPressed.setVisible(false);
        })
    }
}