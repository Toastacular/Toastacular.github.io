@echo off
cd ../Javascripts/Source
@del /Q ..\check.js >nul 2>&1
@del /Q ..\compiled.js >nul 2>&1
@del /Q ..\merged.js >nul 2>&1

IF [%1] NEQ [] (
	@echo Compile with mods
	>..\merged.js (for /r ".\Mods" %%F in (*.js) do type "%%F")
	>>..\merged.js (for /r "." %%F in (*.js) do ((Echo "%%F" | FIND /I "Mods" 1>NUL) || (Type "%%F")))
) ELSE (
	@echo Compile without mods
	>..\merged.js (for /r "." %%F in (*.js) do type "%%F")
)

@echo on
java -jar ..\..\Development\compiler.jar --compilation_level WHITESPACE_ONLY --js ..\merged.js --js_output_file ..\compiled.js
@echo[
@IF %ERRORLEVEL% NEQ 0 goto Failed
@echo Compiled
@goto End
:Failed
@echo Compile Failed!
:End
@echo off
@del /Q ..\merged.js >nul 2>&1
@cd ..\..\Development
@echo[
pause
