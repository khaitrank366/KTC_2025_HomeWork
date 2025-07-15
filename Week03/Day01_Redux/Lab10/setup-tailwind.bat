@echo off
setlocal EnableDelayedExpansion

echo ========= TAILWIND SETUP START =========

REM Di chuyển đến thư mục chứa script
cd /d %~dp0

REM Bước 1: Cài TailwindCSS và plugin
echo Installing TailwindCSS and @tailwindcss/vite...
call npm install tailwindcss@^4.1.11 --save-dev
call npm install @tailwindcss/vite@^4.1.11 --save

REM ======= GHI FILE VITE.CONFIG.TS =======
set FILE=vite.config.ts
if exist %FILE% (
    echo File %FILE% exist!
    choice /M "overite vite config?"
    if errorlevel 2 (
        echo Bỏ qua ghi đè %FILE%.
        goto SKIP_VITE
    )
)
echo Ghi %FILE%...
> %FILE% echo import ^{ defineConfig ^} from 'vite'
>> %FILE% echo import react from '@vitejs/plugin-react'
>> %FILE% echo import tailwindcss from "@tailwindcss/vite";
>> %FILE% echo.
>> %FILE% echo // https://vite.dev/config/
>> %FILE% echo export default defineConfig(^{
>> %FILE% echo     plugins: [tailwindcss^(^), react^(^)],
>> %FILE% echo ^});

:SKIP_VITE

REM ======= GHI FILE TAILWIND.CONFIG.JS =======
set FILE=tailwind.config.js
if exist %FILE% (
    echo File %FILE% exist!
    choice /M "create tailwind.config?"
    if errorlevel 2 (
        echo Bỏ qua ghi đè %FILE%.
        goto SKIP_TAILWIND
    )
)
echo Ghi %FILE%...
> %FILE% echo /** @type {import('tailwindcss').Config} */
>> %FILE% echo export default {
>> %FILE% echo   content: [
>> %FILE% echo     "./index.html",
>> %FILE% echo     "./src/**/*.{js,ts,jsx,tsx}",
>> %FILE% echo   ],
>> %FILE% echo   theme: {
>> %FILE% echo     extend: {},
>> %FILE% echo   },
>> %FILE% echo   plugins: [],
>> %FILE% echo };

:SKIP_TAILWIND

REM ======= GHI FILE INDEX.CSS =======
if not exist src (
    echo create src...
    mkdir src
)

set FILE=src\index.css
if exist %FILE% (
    echo File %FILE% exist!
    choice /M "Overite index.css??"
    if errorlevel 2 (
        echo Bỏ qua ghi đè %FILE%.
        goto END
    )
)
echo Ghi %FILE%...
echo @import "tailwindcss"; > %FILE%

:END
echo ========= TAILWIND SETUP DONE =========
pause
