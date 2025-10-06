# 🎥 YouTube → Cloudflare Worker → Wiki 自動更新システム

YouTube チャンネルの新動画を自動検知し、WikiWiki.jp のページを自動更新する仕組みです。

---

## 🚀 システム概要

YouTube → PubSubHubbub → Cloudflare Worker → WikiWiki API  
                       ↑  
                 GitHub Actions (週2再購読)

---

## ⚙️ セットアップ手順

### 1️⃣ Cloudflare Worker のデプロイ
- Cloudflare Dashboardで新しいWorkerを作成
- コードを `worker/index.js` に貼り付け
- 環境変数を設定：

| 変数名 | 内容 |
|---------|------|
| `WIKI_NAME` | wikiwiki.jp の wiki 名 |
| `WIKI_API_TOKEN` | REST API トークン |

---

### 2️⃣ GitHub Actions で自動再購読設定

1. `.github/workflows/youtube-resubscribe.yml` をリポジトリに配置  
2. Actionsを有効化  
3. 自動で毎週 **月曜と木曜 午前9時（JST）** に購読再登録  
4. 手動実行も「Actions → Run workflow」から可能

---

### 3️⃣ Wiki更新の確認

- YouTube に新動画が投稿されると自動でWorkerに通知  
- Worker が wikiwiki.jp API 経由で `LatestVideos` ページを更新  
- 更新内容例：

```
* 最終更新: 2025/10/06 14:32
* 新しい動画: https://youtu.be/xxxxxxxxxxx
```

---

### 💡 チャンネルリスト

| チャンネル名 | ID |
|---------------|--------------------------------|
| C_More | UCgbQLx3kC5_i-0J_empIsxA |
| Y_Apollo | UCSxorXiovSSaafcDp_JJAjg |
| M_Maho | UCyBaf1pv1dO_GnkFBg1twLA |
| A_Bibi | UCsy_jJ1qOyhr7wA4iKiq4Iw |
| Fifth Channel | UCPFrZbMFbZ47YO7OBnte_-Q |

---

週2回自動更新で購読切れを防止し、YouTube→Wikiの連携を維持します。
