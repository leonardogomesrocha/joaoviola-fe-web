@echo off
rem Rebuilds the front end image and (re)starts it on http://localhost:8080
cd /d "%~dp0"
docker compose up --build -d
if errorlevel 1 (
  echo.
  echo Docker failed. Is Docker Desktop running?
  pause
  exit /b 1
)
echo.
echo Running on http://localhost:8080
start "" http://localhost:8080
pause
