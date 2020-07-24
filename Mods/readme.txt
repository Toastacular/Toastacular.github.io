To create a mod for the game

a) add a subfolder to the Mods folder named for your mod

b) add a subfolder
Javascripts
and a further subfolder
Source

c) in the Javascripts folder add a file details.js containing a single line
addDetails("nameofmod", "brief description", "version");

d)(OPTIONAL) in the Source folder add any javascript needed for your mod. You can copy a file from the base game and alter as needed. Your version will effectively replace the core game version

e)(OPTIONAL) Add a .js file containing code like

//"use strict";
function initialiseMod()
{
}

This function can be used to change existing game objects like person objects, say the folder for images, peoples names or add new people, items etc.
Additonally you can add a person object like personGlenvale() for your mod to intercept standard events. You should use
addPersonTop() to ensure it is checked first and thus intercept the standard game versions.

f) (OPTIONAL) Add a folder
Mods/yourmod/Images
with replacement images. If you use the exact same folder/naming as the base Images folder the game will use your image to replace the base game image

g) compile the game by running
Development\compile.bat

h) Distribute the mod with only the folders you have in Mods (Source is optional but recommended) and the updated 'details.js' in the base Mods folder

Note:
a Mod that only changes images can just add the details.js and also the Images folder, with an empty Javascript/Source folder