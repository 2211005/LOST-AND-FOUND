Write-Host "Iniciando smoke test..."

powershell -ExecutionPolicy Bypass -File .\scripts\tests\verify-env.ps1
if ($LASTEXITCODE -ne 0) { exit 1 }

powershell -ExecutionPolicy Bypass -File .\scripts\tests\health-check.ps1
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Smoke test completado correctamente."
exit 0