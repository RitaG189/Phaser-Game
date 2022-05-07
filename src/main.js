import { LoadScene } from "./scenes/LoadScene.js"
import { MenuScene } from "./scenes/MenuScene.js" 
import { ForestScene } from "./scenes/ForestScene.js"
import { GameOverScene } from "./scenes/Side Scenes/GameOverScene.js"
import { EndScene } from "./scenes/Side Scenes/EndScene.js"

let game = new Phaser.Game({
    
    width: 1000,
    height: 600,
    type: Phaser.AUTO,
    scene: [
        LoadScene, MenuScene, ForestScene, GameOverScene, EndScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: { y: 1100 }
        }
    },
    render: {
        pixelArt: true
    }


})


