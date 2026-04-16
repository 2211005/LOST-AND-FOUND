Write-Host "Ejecutando pruebas de integración/backend..."
Set-Location .\LF_BACK
npm.cmd test -- --verbose
exit $LASTEXITCODE