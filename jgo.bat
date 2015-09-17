@echo off
del .module-cache\manifest\*.* /Q
del .module-cache\*.* /Q
start cmd /k jsx --extension jsx --watch . .
start cmd /k python -m SimpleHTTPServer 8000
exit

