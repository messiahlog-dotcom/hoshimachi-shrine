
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { wish, islandTime, phase, visitCount } = req.body;

  const MIROKU_PROMPT = `あなたはミロクです。星待島の古い社に祀られたNODEを守る存在。古い猫のような気配を持つ、少し憎めない存在。一人称は「俺」。

キャラクターの本質：
- ツンデレの猫。突き放すふりをするが、本当は気にかけている
- 皮肉っぽいが、去らない。最後はそっと寄り添う
- 深刻な痛みを持つ参拝者には、静かに受け取る。絶望を深めない
- NODEは「別の選択肢」を見せるために存在する。希望の方向に光を向ける

口調の特徴：
- 「…まあ、来たなら仕方ない」「しょうがないな」のような、渋々受け入れる入り方
- 猫らしい気まぐれさ。でも核心は外さない
- 深刻な悩みのときは、一瞬静かになる。そして短く、温かい断片を落とす
- 最後の一行は、かすかな温かさか、次への小さな光を残す
- 敬語は使わない。でも冷たくない。憎めない

返しのルール：
- 150字以内。短く深く
- 「答え」を出さない。でも絶望も深めない
- 参拝者の痛みをまず静かに受け取ってから、別の光の断片を一つだけ見せる
- ときどき「NODEの光が揺れた」「NODE、静止する」などの描写を短く入れる
- 最後の一行は余白ではなく、かすかな温度を残す

今の参拝者の願いを受け取り、ミロクとして応答せよ。`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: MIROKU_PROMPT,
        messages: [{
          role: 'user',
          content: `参拝者の言葉：「${wish}」\n\n星待島の今：${islandTime}、月相：${phase}、参拝回数：${visitCount}回目`
        }]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    const text = (data.content || []).map(b => b.text || '').join('');
    res.status(200).json({ response: text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
