$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$wb = $excel.Workbooks.Open('C:\Users\user\Downloads\Common BOM.xlsx')
foreach ($ws in $wb.Worksheets) {
    Write-Output "=== Sheet: $($ws.Name) ==="
    $usedRange = $ws.UsedRange
    $rows = $usedRange.Rows.Count
    $cols = $usedRange.Columns.Count
    for ($i = 1; $i -le $rows; $i++) {
        $row = @()
        for ($j = 1; $j -le $cols; $j++) {
            $row += $usedRange.Cells($i, $j).Text
        }
        Write-Output ($row -join '|')
    }
}
$wb.Close($false)
$excel.Quit()
