@echo off
del .module-cache\manifest\*.* /Q
del .module-cache\*.* /Q
start cmd /k jsx --extension jsx --watch . .
exit

