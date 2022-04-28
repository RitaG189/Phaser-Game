import { LoadScene } from "./scenes/LoadScene.js";
import { MenuScene } from "./scenes/MenuScene.js"; 
import { FirstCastleScene } from "./scenes/FirstCastleScene.js";
import { ForestScene } from "./scenes/ForestScene.js";

let game = new Phaser.Game({
    width: 800,
    height: 480,
    type: Phaser.AUTO,
    scene: [
        LoadScene, MenuScene, FirstCastleScene, ForestScene 
    ],
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: { y: 1100 }
        }
    },
    render: {
        pixelArt: true
    }

});