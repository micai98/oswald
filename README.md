# Oswald
## Infinite scrolling 2d platformer written in JS

Made with Tululoo: http://www.tululoo.com/  
You can play the game here (runs in the browser): https://oswaldgame.netlify.app/  
The tilde key opens settings

![screenshot1](https://cdn.discordapp.com/attachments/667901505420132375/978039108712693760/scr1.png)
![screenshot2](https://cdn.discordapp.com/attachments/667901505420132375/978039109048221736/scr2.png)
![screenshot3](https://cdn.discordapp.com/attachments/667901505420132375/978039109438279761/scr3.png)


Current version **0.9.2**:  
0.9.2:  
  - added a new player costume by Aethus  
  
0.9.1:  
  - changes to scoring system (thanks to NI240SX for the idea)
    - player receives score based on distance travelled instead of camera speed
  - changes to the prefab bank rotation
    - removed the beginner bank from initial rotation and added GRASS1 and WOOD1 in its place
	- other prefab banks unlock way faster and appear more often now
  - adjusted some values related to collisions with moving platforms
  - debug camera and debug teleport only work while debug mode is enabled
  - added a new hotkey for the settings menu (9)  

0.9.0:  
  - added 3 new player costumes (made by Soup)
  - reduced player's acceleration speed from 1 to 0.5
  - player can now fall up to 1 block behind the screen's left border without dying
  - repurposed the o_kot_dead object to serve as a death animation for more objects, such as vehicles (it's called o_corpse now)
  - added an additional check for enemies under the player before world collision detection to prevent the player from clipping through enemies while falling at high speeds
  - huge changes to player character's code
    - the character now supports "modes"
      - they can be used to adjust the character's properties and modify its movement options
      - they also allow to change how the character behaves at any time and how it reacts to collisions with walls and entities
    - added "external velocity": works similarly to normal velocity but is separate and not affected by friction, gravity nor speed limits
  - added a vehicle using the new "mode" mechanic
    - it's a helicopter that lets the player jump mid-air, bounces off the walls, and moves slightly faster than the player does on foot
    - player enters it by finding a special collectible, and gets rid of it by passing a "no helicopters" sign
 
  - added moving platforms
    - they're a last minute addition I came up with randomly while making prefabs and I'm honestly surprised they work. they're a bit messy right now, I'll make things cleaner in further updates because I want to release this one already
    - player has separate collision checks just for them, because the standard collision detection is hilariously unprepared for moving solids
    - player moves along with the platform they stand on thanks to the newly added "external velocity" feature (platforms are in fact the reason that feature was added)
    - player only collides with them while falling (and that means one way collisions are now supported)
	
  - fixed trampoline collisions
  - trampolines can be attached to ceilings
  - enemy rats can use trampolines
  - enemy rat received an alternative death animation for death by hazards
  
  - added new enemies and hazards:
    - helicopter rats
    - missiles
    - crushers
    - cacti
  
  - added new terrain types:
    - wood
    - tree
    - sand
    - panel (unused for now)
    - bigbrick
  
  - raised initial scrolling speed from 1.0 to 1.2
  - scrolling speedup routine has two stages now:
    - in stage one the interval between each speed up increases by 3 frames every time a speed up happens
    - in stage two the interval increases by a much higher amount of frames, so the scrolling doesn't reach full speed too quickly
  - the score reward for progressing through the level is much higher and depends on the current scrolling speed
  - added expert mode (toggle with the pause key before the game starts)
    - scrolling starts at a higher speed and speeds up 2 times faster
    - some prefabs only spawn when expert mode is enabled
 
  - huge changes to the world generator
    - shorter spawnpoint prefab
    - added prefab banks
      - instead of picking random prefabs, the world generator picks a random prefab bank from the current rotation and deploys prefabs according to its settings
      - each prefab bank has 5 lists of prefabs (optional lists will be skipped if empty):
      - start: optional, one of start prefabs will be deployed right after the bank is loaded
      - middle: the main part of the bank, the amount of middle prefabs deployed is random (minimum and maximum can be set in the bank's properties)
      - end: optional, one of end prefabs will be deployed right after the last middle prefab
      - hard: optional, same as middle but will only appear while playing on expert mode
      - rare: optional, same as middle but way less likely to appear
    - some banks get added to or removed from the rotation after a certain score is reached
    - the rotation is split into four groups: very common, common, rare, very rare. each has a different chance of being used
 
  - added new and improved old debug features
    - brought back debug camera controls with new hotkeys (Z,X,C)
    - improved the debug teleport (Left CTRL)
    - a line is drawn to show the point beyond which collisions and entities despawn
    - a marker is placed at the start of each prefab describing which part of the bank it belongs to
    - prefab testing mode: when a prefab is set to the prefab_testing variable, it will always spawn right after the starter prefab, which is shorter when prefab testing is enabled
    - prefab bank testing mode: same as prefab testing mode but for prefab banks
    - pressing 1 toggles debug mode (F11 apparently didn't work on some browsers)
    - pressing 2 toggles grid background
    - holding 3 makes the player character leave trails on the screen, useful for tracking movement and testing prefabs
    - pressing 4 toggles world collision display
    - pressing 0 restarts the game
 
  - updated the HTML
    - ~ key brings up the settings menu
    - the filter editor and the changelog can be accessed from there
    - added a new setting to the filter editor
    - added an option to change the scale of the game canvas
    - added an option to save and load settings
    - improved the filters' code (it's still bad)
    - fixed filters not working after a game restart

  - added HUGE THINGS
  - added more sound effects
  - fixed pausing (no more abrupt speedups after unpausing)
  - fixed a rare score display crash that happened when the score was above 999999999
  - deleted some unused files
  - countless changes and additions to the prefab collection
