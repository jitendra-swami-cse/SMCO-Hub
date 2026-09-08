@echo off
setlocal enabledelayedexpansion

title SMCO-Hub Launcher

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
echo [1/3] Database Reminder:
echo       Please ensure MongoDB is running locally on port 27017.
echo.

:: 5. Start Backend Server in a separate persistent terminal window
echo [2/3] Starting Backend Server on port 5000...
start "SMCO-Hub Backend Server" cmd /k "title SMCO-Hub Backend Server && cd /d "%ROOT_DIR%backend" && npm run dev"

:: 6. Start Frontend Server in a separate persistent terminal window
echo [3/3] Starting Frontend Server on port 5173...
start "SMCO-Hub Frontend Server" cmd /k "title SMCO-Hub Frontend Server && cd /d "%ROOT_DIR%frontend" && npm run dev"

:: 7. Wait briefly for servers to spin up
echo.
echo Waiting for servers to initialize...
powershell -nop -c "Start-Sleep -Seconds 3"

:: 8. Open Frontend in Google Chrome
echo Opening SMCO-Hub in Google Chrome...
set "APP_URL=http://localhost:5173"

set "CHROME_BIN="
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" set "CHROME_BIN=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not defined CHROME_BIN if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" set "CHROME_BIN=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if not defined CHROME_BIN if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "CHROME_BIN=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

if defined CHROME_BIN (
    start "" "!CHROME_BIN!" %APP_URL%
) else (
    start chrome %APP_URL% 2>nul || start "" %APP_URL%
)

echo.
echo ===================================================
echo  SMCO-Hub successfully launched!
echo.
echo  Two separate terminal windows are now active:
echo    [1] SMCO-Hub Backend Server  (logs on port 5000)
echo    [2] SMCO-Hub Frontend Server (logs on port 5173)
echo.
echo  Both terminal windows will remain open to display
echo  live logs and keep the servers running.
echo ===================================================
echo.
echo You can keep this window open or close it anytime.
echo (Closing this launcher will NOT close your servers)
echo.
pause
