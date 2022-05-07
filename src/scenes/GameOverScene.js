import { CST } from "../CST.js";

export class GameOverScene extends Phaser.Scene 
{

    constructor() 
    {
        super({ key: CST.SCENES.GAMEOVER })
    }


    create()
    {

        var gameOver = this.add.text(340, 220, "GAME OVER").setDepth(1).setScrollFactor(0)
        gameOver.setFontSize(60)


        let tryAgainButton = this.add.image(410, 360, "tryAgain").setDepth(2).setScale(3.2)

        tryAgainButton.setInteractive()

        tryAgainButton.on("pointerover", () => {
            this.tryAgainButtonPressed = this.add.image(410, 360, "tryAgainPressed").setDepth(3).setScale(3.2)
            this.tryAgainButtonPressed.setVisible(true);
        })

        tryAgainButton.on("pointerup", () => {
            this.scene.stop(CST.SCENES.LEVEL1)
            this.scene.stop()
            this.scene.launch(CST.SCENES.LEVEL1)
            
        })

        tryAgainButton.on("pointerout", () => {
            this.tryAgainButtonPressed.setVisible(false);
        })


        let goToMenuButton = this.add.image(600, 360, "menu").setDepth(2).setScale(3.2)

        goToMenuButton.setInteractive()

        goToMenuButton.on("pointerover", () => {
            this.goToMenuButtonPressed = this.add.image(600, 360, "menuPressed").setDepth(3).setScale(3.2)
            this.goToMenuButtonPressed.setVisible(true);
        })

        goToMenuButton.on("pointerup", () => {
            this.scene.stop(CST.SCENES.LEVEL1)
            this.scene.stop()
            
        })

        goToMenuButton.on("pointerout", () => {
            this.goToMenuButtonPressed.setVisible(false);
        })
    }
}