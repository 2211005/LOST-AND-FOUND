Write-Host "Verificando entorno de Lost & Found..."

if (-not (Test-Path ".\LF_BACK\package.json")) {
    Write-Error "No se encontró LF_BACK/package.json"
    exit 1
}

if (-not (Test-Path ".\LF\package.json")) {
    Write-Error "No se encontró LF/package.json"
    exit 1
}

if (-not (Test-Path ".\.env.example")) {
    Write-Error "No se encontró .env.example"
    exit 1
}

Write-Host "Entorno base verificado correctamente."
exit 0