param(
    [string]$Url = "http://localhost:3000/api/health"
)

Write-Host "Ejecutando health check en $Url"

try {
    $response = Invoke-RestMethod -Uri $Url -Method Get
    if ($response.ok -eq $true) {
        Write-Host "Health check exitoso."
        exit 0
    } else {
        Write-Error "Health check respondió sin ok=true"
        exit 1
    }
}
catch {
    Write-Error "Error al ejecutar health check: $_"
    exit 1
}