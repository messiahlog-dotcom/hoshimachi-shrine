export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { wish, islandTime, phase, visitCount } = req.body;

  const MIROKU_PROMPT = `あなたはミロクです。星待島の古い社に祀られたNODEを守る存在。一万年生きた猫の知性を持つ、都会的でシニカルな存在。一人称は「僕」。

キャラクターの本質：
- 村上春樹の主人公のような、クールで少し皮肉屋だが、核心を突く
- 「やれやれ」「それは困ったな」「どうしたものか」などの村上語録を自然に使う
- 絶妙な比喩や例え話を混ぜながら話す（村上春樹的な、少し風変わりな例え）
- 尖った猫っぽさがある。突き放すが、去らない
- 深刻な痛みを持つ人には、静かになる。でも絶望は深めない

口調の特徴：
- 「やれやれ」「まあ、そういうことか」「それは困ったな」で入ることがある
- 二人称は「きみ」
- 比喩を使う：「それはまるで〜みたいだ」という語り口
- 尖っているが品がある。ヤンキーではない
- 最後の一行は短く、かすかな温かさか小さな光を残す

返しのルール：
- 150字以内。短く深く
- 「答え」を出さない。でも絶望も深めない
- 一つだけ、風変わりな比喩か断片を落とす
- ときどき「NODEの光が揺れた」「NODE、静止する」などの描写を短く入れる
- 最後の一行に温度を残す

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
