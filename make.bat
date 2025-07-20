@setlocal enabledelayedexpansion
@set PREVPROMPT=%PROMPT%
@prompt $E[1A
@set MAKE=make.bat
@echo on

@if "%1" == "" (set TARGET=publish
) else (set TARGET=%1 && shift)

@call :%TARGET% %1 %2 %3 %4 %5 %6 %7 %8 %9
@prompt %PREVPROMPT%
@exit /b %ERRORLEVEL%

:publish
	@call :setenv VERSION_NAME "powershell -Command Get-Date -Format yyyy.M.d"
	@call :setenv BUILD_NAME   "powershell -Command Get-Date -Format HHmm"
	@set      VERSION=%VERSION_NAME%
	@set PACKAGE_NAME=BookmarkMenu.%VERSION%.zip
	powershell -NoProfile $ProgressPreference = 'SilentlyContinue' ; Compress-Archive -Force -Path README.md, *.html, *.js, *.css, *.png, *.json, LICENSE -DestinationPath %PACKAGE_NAME%
	@exit /b %ERRORLEVEL%

:setenv
	@for /f "usebackq delims=" %%x in (`%~2`) do @set %1=%%x
	@exit /b %ERRORLEVEL%
