export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ✅ 購読確認リクエスト（hub.challenge）
    const challenge = url.searchParams.get('hub.challenge');
    if (challenge) {
      return new Response(challenge);
    }

    // ✅ YouTube 新着動画通知（POST）
    if (request.method === 'POST') {
      const xml = await request.text();
      console.log('📨 受信:', xml);

      // 動画ID抽出
      const match = xml.match(/<yt:videoId>(.+?)<\/yt:videoId>/);
      if (match) {
        const videoId = match[1];
        const videoUrl = `https://youtu.be/${videoId}`;
        console.log('🎬 新動画:', videoUrl);

        // wikiwiki.jp API呼び出し
        const page = 'LatestVideos';
        const wikiUrl = `https://api.wikiwiki.jp/${env.WIKI_NAME}/page/${page}`;
        const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

        const source = `* 最終更新: ${now}\n* 新しい動画: ${videoUrl}`;

        await fetch(wikiUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${env.WIKI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ source }),
        });
      }

      return new Response('ok');
    }

    return new Response('YouTube→Wiki Webhook 稼働中！');
  },
};
