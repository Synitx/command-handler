@echo off
start cmd /k npm i -D typescript ts-node @types/node nodemon child_process
start cmd /k npm i discord.js fs path dotenv chalk
setlocal enabledelayedexpansion

set "ESC="
set "BLUE=%ESC%[34m"
set "YELLOW=%ESC%[33m"
set "WHITE=%ESC%[97m"

title Syn's Command Handler v1.0
echo(
echo %BLUE%--- %WHITE%Syn's Command Handler v1.0 %BLUE% ---%WHITE%
echo(
echo %BLUE%*%WHITE% Go to src folder, and open the configuration then edit the values.
echo %BLUE%*%WHITE% Type the command %YELLOW%npm run dev%WHITE% to start bot in development mode.
echo %BLUE%*%WHITE% Type the command %YELLOW%npm run build%WHITE% to build your bot.
echo %BLUE%*%WHITE% Type the command %YELLOW%npm run start%WHITE% to start your bot.
echo %BLUE%*%WHITE% Type the command %YELLOW%npm run init%WHITE% to build and start your bot.
echo(
echo %WHITE%Thank you for using my command handler
echo %WHITE%Our support server %BLUE%https://discord.gg/CJwvP3vKjh%BLUE%

endlocal
pause > nul