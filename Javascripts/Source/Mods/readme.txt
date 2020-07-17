Add a .js file containing code like

//"use strict";
function initialiseModMyMod()
{
}

The function name must start with 'initialiseMod'
This function can be used to change existing game objects like person objects, say the folder for images, peoples names or add new people, items etc.
Additonally you can add a person object like personGlenvale() for your mod to intercept standard events. You should use
addPersonTop() to ensure it is checked first and thus intercept the standard game versions.

Any additional javascript can use arbitrary names but commonly you will override/replace an existing function like
function ShowPlace045()
or
function initialiseTracy()

These will replace the standard ones in the game, so can be used to customise places/people, you should copy the existing versions and then modify as desired

Once this is done re-compile the game using
Development/compile.bat mods