export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    //
    // ✅ 1. 再購読エンドポイント（GitHub Actionsから呼ばれる）
    //
    if (url.pathname === "/resubscribe") {
      const hub = "https://pubsubhubbub.appspot.com/subscribe";
      const channels = [
        "UCgbQLx3kC5_i-0J_empIsxA", // 紅麗もあ🔥⚔️
        "UCSxorXiovSSaafcDp_JJAjg", // 矢筒あぽろ🍃🏹
        "UCyBaf1pv1dO_GnkFBg1twLA", // 魔儘まほ💧🪄
        "UCsy_jJ1qOyhr7wA4iKiq4Iw", // 戯びび🎰🪙
        "UCPFrZbMFbZ47YO7OBnte_-Q", // そちまる公式
      ];

      let results = [];

      for (const id of channels) {
        const topic = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${id}`;
        const params = new URLSearchParams({
          "hub.mode": "subscribe",
          "hub.topic": topic,
          "hub.callback": env.WORKER_CALLBACK_URL,
          "hub.verify_token": env.YT_VERIFY_TOKEN,
        });

        const res = await fetch(hub, { method: "POST", body: params });
        results.push(`${id}: ${res.status}`);
      }

      return new Response("resubscribe ok\n" + results.join("\n"));
    }

    //
    // ✅ 2. YouTube購読確認（hub.challenge）
    //
    const challenge = url.searchParams.get("hub.challenge");
    const verifyToken = url.searchParams.get("hub.verify_token");
    if (challenge) {
      if (verifyToken !== env.YT_VERIFY_TOKEN) {
        return new Response("Invalid token", { status: 403 });
      }
      return new Response(cha
