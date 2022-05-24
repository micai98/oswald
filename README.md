# Oswald
## Infinite scrolling 2d platformer written in JS

Made with Tululoo: http://www.tululoo.com/  
You can play the game here (runs in the browser): https://micai.netlify.app/oswald/

![screenshot1](https://cdn.discordapp.com/attachments/667901505420132375/978039108712693760/scr1.png)
![screenshot2](https://cdn.discordapp.com/attachments/667901505420132375/978039109048221736/scr2.png)
![screenshot3](https://cdn.discordapp.com/attachments/667901505420132375/978039109438279761/scr3.png)


0.8:
  - started to make the game look more like a finished product
    - debug display is off by default (can be brought back up with the "dbg" code or F11 key)
	- removed the title screen, the game now starts at the beginning of the level and waits for player's input to start scrolling and counting score
  - removed debug camera controls
  - player can now move with WASD and jump with spacebar
  - player can no longer kill enemies while dead
  - added a death animation for the player
  - added sound effects (can be muted with F2)
  - fixed a bug that caused scrolling speed to go above max
  - reduced max scrolling speed from 2.4 to 2.3
  - increased the main scene's width from 100000 to 500000
  - the scene should now automatically extend when the player's close to reaching its end (i have no idea if this works)
  - added 2 new prefabs
