@echo off
setlocal enabledelayedexpansion

title SMCO-Hub Unified Console

echo ===================================================
echo               SMCO-Hub Project Launcher
echo ===================================================
echo.

:: Ensure current working directory is the script directory
set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

:: 1. Check for Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: 2. Check Backend dependencies
if not exist "%ROOT_DIR%backend\node_modules\" (
    echo [NOTICE] Backend dependencies not found. Installing...
    cd /d "%ROOT_DIR%backend"
    call npm install
    cd /d "%ROOT_DIR%"
)

:: 3. Check Frontend dependencies
if not exist "%ROOT_DIR%frontend\node_modules\" (
    echo [NOTICE] Frontend dependencies not found. Installing...
    cd /d "%ROOT_DIR%frontend"
    call npm install
    cd /d "%ROOT_DIR%"
)

:: 4. Database Reminder
echo Database Reminder:
echo Please ensure MongoDB is running locally on port 27017.
echo.

:: 5. Launch Chrome in the background after servers spin up
echo Launching browser in background (http://localhost:5173)...
start /b "" powershell -nop -c "Start-Sleep -Seconds 4; try { Start-Process 'chrome' 'http://localhost:5173' } catch { Start-Process 'http://localhost:5173' }"

:: 6. Display Unified Banner
echo ===================================================
echo  SMCO-Hub Unified Server Console
echo.
echo  - Backend:  http://localhost:5000  [CYAN]
echo  - Frontend: http://localhost:5173  [MAGENTA]
echo.
echo  Logs from both servers will stream below.
echo  Press Ctrl+C to stop both servers.
echo ===================================================
echo.

:: 7. Stream both servers into this single terminal
call npx -y concurrently -k -n "BACKEND,FRONTEND" -c "cyan,magenta" "npm --prefix backend run dev" "npm --prefix frontend run dev"

echo.
echo Both servers have stopped.
pause
