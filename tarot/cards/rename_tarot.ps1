# cards/ 폴더로 이동
cd "$PSScriptRoot\\cards"

# 메이저 아르카나
$major = @(
  "fool", "magician", "high_priestess", "empress", "emperor", "hierophant", "lovers", "chariot",
  "strength", "hermit", "wheel_of_fortune", "justice", "hanged_man", "death", "temperance",
  "devil", "tower", "star", "moon", "sun", "judgement", "world"
)

# 마이너 아르카나
$suits = @("wand", "cup", "sword", "pentacle")
$courts = @("page", "knight", "queen", "king")

# 숫자 카드 (1~10), 1 → ace
foreach ($suit in $suits) {
  for ($i = 1; $i -le 10; $i++) {
    if ($i -eq 1) {
      $filename = "$suit`_ace.jpg"
    } else {
      $filename = "$suit$i.jpg"
    }

    if (-not (Test-Path $filename)) {
      Write-Output "❌ 누락: $filename"
    } else {
      Write-Output "✅ 있음: $filename"
    }
  }

  # 궁정 카드
  foreach ($court in $courts) {
    $filename = "$suit`_$court.jpg"
    if (-not (Test-Path $filename)) {
      Write-Output "❌ 누락: $filename"
    } else {
      Write-Output "✅ 있음: $filename"
    }
  }
}

# 메이저 아르카나 카드 확인
foreach ($m in $major) {
  $filename = "$m.jpg"
  if (-not (Test-Path $filename)) {
    Write-Output "❌ 누락: $filename"
  } else {
    Write-Output "✅ 있음: $filename"
  }
}
