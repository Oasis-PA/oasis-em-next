# PowerShell script para rodar prisma migrate dev
$env:DATABASE_URL="postgresql://postgres:capenga@db.yyvjzgxyxgalnnwcjfqh.supabase.co:5432/postgres"

Write-Host "🚀 Executando: npx prisma migrate dev --skip-generate"
Write-Host "DATABASE_URL: $($env:DATABASE_URL.Substring(0, 30))..." -ForegroundColor Green

npx prisma migrate dev --skip-generate
