@echo off
REM CitiTrack - Start All Servers (Fast Version)
REM This version assumes dependencies are already installed

echo.
echo ====================================
echo  CitiTrack - Starting All Servers
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Start Backend Server
echo Starting Backend Server on port 5003...
start "CitiTrack Backend Server" cmd /k "cd /d %~dp0server && set PORT=5003 && node server.js"

REM Wait a few seconds for backend to start
timeout /t 3 /nobreak

REM Start Frontend Server
echo Starting Frontend Development Server on port 3000...
start "CitiTrack Frontend Server" cmd /k "cd /d %~dp0client && npm start"

REM Wait and display info
timeout /t 2 /nobreak

echo.
echo ====================================
echo  Servers Starting...
echo ====================================
echo.
echo Backend Server:  http://localhost:5003
echo Frontend Server: http://localhost:3000
echo.
echo Close either window to stop that server.
echo Press any key to close this window...
echo.
pause >nul
