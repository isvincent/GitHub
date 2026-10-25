# GitHub 網址百寶箱（RWD + PWA）

保留原頁漸層背景、彩色卡片、泡泡動畫、搜尋、分類、收藏、清單與隨機探索，補強手機版與 PWA 離線功能。無須 npm 或編譯。

## 完整目錄

```text
.
├── index.html                 # 首頁（原頁內容與主要樣式、程式）
├── GitHub網址與內容.csv        # 原始資料，請保留原檔名
├── responsive.css             # 手機、觸控、放大字體及安全區域補強
├── manifest.webmanifest       # PWA 名稱、圖示、啟動路徑
├── pwa.js                     # Service Worker 註冊
├── sw.js                      # 靜態資源與 CSV 離線快取
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── .nojekyll
└── README.md
```

## 上傳 GitHub Pages

1. 建立 GitHub 儲存庫，將本資料夾內的所有檔案及 icons 資料夾上傳至儲存庫根目錄。首頁必須為 index.html，不要只上傳 HTML 或 ZIP。
2. 在儲存庫 Settings → Pages，將 Source 設為 Deploy from a branch，選擇 main 與 / (root)，按 Save。
3. 等待部署完成，開啟 Pages 顯示的 HTTPS 網址。專案子目錄也可使用，無須改寫基底網址。

## 本機預覽

在本資料夾開啟終端機：

```sh
python -m http.server 8000
```

開啟 http://localhost:8000 。直接雙擊 index.html 時，瀏覽器可能阻擋 CSV 讀取，且無法啟用 PWA；原頁仍保留手動選擇 CSV 的功能。

## 安裝及離線使用

- PWA 需要 HTTPS 或 localhost。Chrome／Edge 可使用網址列或選單中的安裝功能；是否顯示依瀏覽器和裝置而定。
- iPhone／iPad 可用 Safari 的「分享 → 加入主畫面」。
- 第一次請保持連線，等待 Service Worker 安裝並快取所有資源完成，再離線重開。離線可瀏覽與搜尋快取的網址清單，並使用本機收藏；清單連到的外部教學網站不在本網站離線範圍內。
- 靜態檔與 CSV 採網路優先、網路失敗才讀快取。CSV 的時間戳記不會產生無限快取副本。HTTP 錯誤會如實回傳，避免掩蓋刪檔問題。
- 收藏與原頁設定儲存在目前瀏覽器；不同裝置不會自動同步，清除網站資料可能移除記錄。

## 更新內容與版本

修改 CSV 後以相同檔名上傳；連線時按「重新讀取」取得新資料。修改網頁、樣式、圖示或離線檔案時，同時遞增 sw.js 的 VERSION（例如 v1 改為 v2）。新版本完成安裝後，關閉此網站的所有分頁與已安裝視窗，再重新開啟，以完成切換。只清除屬於本網站 scope 的舊快取，不影響同網域的其他專案。

## RWD 調整

保留原頁桌面風格，新增 640px／360px 窄螢幕規則、可縮排的卡片網格、長文字斷行、工具列換行、44px 觸控目標、對話框捲動、鍵盤焦點及手機安全區域。沿用原頁的減少動畫偏好設定。

## 驗證範圍

交付前已檢查 JavaScript 語法、manifest JSON、圖示尺寸、快取資源存在，以及 CSV 與原始檔一致。尚未完成真實瀏覽器的手機排版、安裝與離線重啟實測，也尚未部署至 GitHub。上線後建議以 320、375、768、1280px 寬度與放大字體檢查，並在開發者工具 Application 確認 Service Worker 為 activated，再切換離線測試重新載入和搜尋。
