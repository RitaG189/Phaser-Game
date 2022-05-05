import { LoadScene } from "./scenes/LoadScene.js";
import { MenuScene } from "./scenes/MenuScene.js"; 
import { ForestScene } from "./scenes/ForestScene.js";

let game = new Phaser.Game({
    
    width: 1000,
    height: 600,
    type: Phaser.AUTO,
    scene: [
        LoadScene, MenuScene, ForestScene
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


