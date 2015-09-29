@echo off

start cmd /k babel . --watch --out-dir . --extensions ".jsx"
rem start cmd /k jsx --extension jsx --watch . .
start cmd /k python -m SimpleHTTPServer 8000
exit

