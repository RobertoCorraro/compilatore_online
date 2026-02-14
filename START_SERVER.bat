@echo off
echo ========================================
echo   BOB Compilatore Policy - Server Locale
echo ========================================
echo.
echo Avvio del server locale sulla porta 8080...
echo.
echo Apri il browser e vai a:
echo   http://localhost:8080/index.html
echo.
echo Premi CTRL+C per fermare il server
echo ========================================
echo.

python -m http.server 8080
