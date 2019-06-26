@ECHO OFF

SET ROOT=%~dp0

IF NOT EXIST %~dp0deploy (
    git clone https://github.com/barbatchov/barbatchov.github.io.git %~dp0deploy
)

XCOPY /E /y %~dp0dist\barbatchov\* %~dp0deploy\

CD %~dp0deploy
git add --all
git commit -m "New Package Deployed"
git push -f origin master
CD %ROOT%
RD /S /Q %~dp0deploy
ECHO Deploy done