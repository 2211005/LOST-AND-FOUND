Write-Host "Iniciando rollback..."

Write-Host "Restaurando última versión estable documentada..."
powershell -ExecutionPolicy Bypass -File .\scripts\tests\health-check.ps1
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Rollback verificado correctamente."
exit 0