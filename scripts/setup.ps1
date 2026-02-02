<#
PowerShell setup script to automate common setup steps for Cloudflare Workers + D1 + KV.

Usage (PowerShell):
  powershell -ExecutionPolicy Bypass -File ./scripts/setup.ps1 -D1Name "mortipins" -KVNamespaceId "3da377bde72646f283be382f1a461227" -CreateKV:$false

This script will:
 - Optionally create the KV namespace (if CreateKV = $true)
 - Run the SQL migrations in ./migrations (requires wrangler authenticated)
 - Add a JWT_SECRET or other secrets if requested
 - Deploy each worker (dashboard, leaderboard, cron)

Note: The script echoes commands and stops on errors. Review before running.
#>

param(
  [Parameter(Mandatory=$true)]
  [string]$D1Name,

  [Parameter(Mandatory=$false)]
  [string]$KVNamespaceId = "",

  [Parameter(Mandatory=$false)]
  [AllowNull()]
  [object]$CreateKV = $false,

  [Parameter(Mandatory=$false)]
  [AllowNull()]
  [object]$Deploy = $true
)

# Coerce CreateKV/Deploy to boolean; allow strings like 'true', 'false', '1', '0', '$true', '$false'
function To-Bool($v) {
  if ($null -eq $v) { return $false }
  if ($v -is [bool]) { return $v }
  $s = [string]$v
  $s = $s.Trim()
  if ($s -in @('true','True','1','$true','$True')) { return $true }
  return $false
}

$CreateKV = To-Bool $CreateKV
$Deploy = To-Bool $Deploy

function Run-Command($cmd) {
  Write-Host "Running: $cmd" -ForegroundColor Cyan
  # Use Windows PowerShell for compatibility on Windows systems
  $res = & powershell -NoProfile -Command $cmd
  if ($LASTEXITCODE -ne 0) { throw "Command failed: $cmd" }
  return $res
}

try {
  # Ensure wrangler available
  Write-Host "Checking wrangler..." -ForegroundColor Green
  & wrangler --version | Out-Null

  # Optionally create KV namespace
  if ($CreateKV) {
    if (-not $KVNamespaceId) {
      Write-Host "Creating KV namespace 'LEADERBOARD_KV'..." -ForegroundColor Green
      $out = wrangler kv namespace create "LEADERBOARD_KV"
      Write-Host $out
      Write-Host "Copy the namespace id above and re-run setup with -KVNamespaceId <id> if needed." -ForegroundColor Yellow
    } else {
      Write-Host "KV namespace id provided: $KVNamespaceId" -ForegroundColor Green
    }
  }

  # Run SQL migrations in order
  $migrationFiles = Get-ChildItem -Path ./migrations -Filter "*.sql" | Sort-Object Name
  foreach ($file in $migrationFiles) {
    Write-Host "Applying migration: $($file.Name)" -ForegroundColor Green
    # Use `wrangler d1 execute` if available
    Write-Host "Running: wrangler d1 execute $D1Name --file $($file.FullName)"
    # Call `wrangler` with the DB name as the required positional argument
    & wrangler d1 execute $D1Name --file $($file.FullName)
    if ($LASTEXITCODE -ne 0) { throw "Migration failed: $($file.Name)" }
  }

  # Optional: set JWT secret prompt (if needed)
  $setJwt = Read-Host "Do you want to add a JWT_SECRET secret for workers? (y/n)"
  if ($setJwt -eq 'y') {
    $jwt = Read-Host "Enter secret value (or leave blank to auto-generate)"
    if (-not $jwt) {
      $jwt = [guid]::NewGuid().ToString() + [guid]::NewGuid().ToString()
      Write-Host "Generated secret: $jwt" -ForegroundColor Yellow
    }
    Write-Host "Storing JWT_SECRET via wrangler secret put..." -ForegroundColor Green
    # Use PowerShell piping to pass the secret into wrangler
    Run-Command "Write-Output '$jwt' | wrangler secret put JWT_SECRET"
  }

  # Optional: set SETUP_SECRET for admin worker backfill/publish endpoints
  $setSetup = Read-Host "Do you want to add a SETUP_SECRET for admin endpoints? (y/n)"
  if ($setSetup -eq 'y') {
    $secret = Read-Host "Enter secret value (or leave blank to auto-generate)"
    if (-not $secret) {
      $secret = [guid]::NewGuid().ToString()
      Write-Host "Generated secret: $secret" -ForegroundColor Yellow
    }
    Write-Host "Storing SETUP_SECRET via wrangler secret put..." -ForegroundColor Green
    Run-Command "Write-Output '$secret' | wrangler secret put SETUP_SECRET"
  }

  if ($Deploy) {
    Write-Host "Deploying workers..." -ForegroundColor Green
    Run-Command "npm run deploy:dashboard"
    Run-Command "npm run deploy:leaderboard"
    Run-Command "npm run deploy:cron"
  }

  Write-Host "Setup complete. Verify workers and Cron triggers in the Cloudflare Dashboard." -ForegroundColor Green
} catch {
  Write-Host "Error during setup: $_" -ForegroundColor Red
  exit 1
}
