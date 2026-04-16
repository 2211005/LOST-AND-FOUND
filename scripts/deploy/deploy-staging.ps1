Write-Host "Despliegue a staging iniciado..."

powershell -ExecutionPolicy Bypass -File .\scripts\tests\verify-env.ps1
if ($LASTEXITCODE -ne 0) { exit 1 }

powershell -ExecutionPolicy Bypass -File .\scripts\tests\integration-test.ps1
if ($LASTEXITCODE -ne 0) { exit 1 }

powershell -ExecutionPolicy Bypass -File .\scripts\tests\smoke-test.ps1
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Despliegue a staging validado correctamente."
exit 0