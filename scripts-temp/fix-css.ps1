$files = @(
    'alimentacao.css',
    'central-de-ajuda.css',
    'cortes-geral.css',
    'editar-perfil.css',
    'favoritos.css',
    'gerenciamento-conta.css',
    'guia.css',
    'infantil.css',
    'meuperfil-after.css',
    'parcerias-empresas.css',
    'parcerias-usuarios.css',
    'perguntas.css',
    'quizzes.css',
    'respostas.css',
    'tela-de-cadastro.css',
    'tela-de-produto.css'
)

$basePath = 'C:\Users\stefano\Documents\GitHub\oasis-em-next\src\styles'

foreach ($file in $files) {
    $filePath = Join-Path $basePath $file
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        $newContent = $content -replace '(?m)^\* \{', 'main * {'
        Set-Content -Path $filePath -Value $newContent -NoNewline
        Write-Host "✓ Corrigido: $file"
    }
}

Write-Host "`n✅ Total de arquivos corrigidos: $($files.Count)"
