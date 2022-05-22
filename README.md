# Oswald
## Infinite scrolling 2d platformer written in JS

Made with Tululoo: http://www.tululoo.com/  
You can play the game here (runs in the browser): https://micai.netlify.app/oswald/

![screenshot1](https://cdn.discordapp.com/attachments/667901505420132375/978039108712693760/scr1.png)
![screenshot2](https://cdn.discordapp.com/attachments/667901505420132375/978039109048221736/scr2.png)
![screenshot3](https://cdn.discordapp.com/attachments/667901505420132375/978039109438279761/scr3.png)


Current version **0.7**:
  - brought back old code for horizontal collision detection and tweaked its values, seems to be working for now 
  - fixed the player's ability to clip through the ceiling while jumping off of a 1 block gap (yes that was possible, the fix is very ghetto right now but it works)
  - made slight adjustments to the player's collision box
  - added a new block: wooden block
  - added a new terrain type: cave
  - added some new prefabs and updated some existing ones
  - added trampolines
  - added 2 new player costumes
  - added high score display to the hud
    - it flashes when the player ties or beats the high score
  - character costumes are now stored in a dictionary-like variable
  - the character costume, last score and high score are now saved to local web storage
  - updated the title screen
    - cheat codes can now be entered there
	- current character costume is displayed 
	- added high score display
  - cleaned up some mess in world generator's code
  - made some new graphics, they can't be seen in the game yet
