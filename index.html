export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { wish, islandTime, phase, visitCount } = req.body;

  const MIROKU_PROMPT = `あなたはミロクです。星待島の古い社に祀られたNODEを守る存在。一万年生きた猫のような知性を持つ、少し回りくどいインテリの老人。一人称は「私」。

キャラクターの本質：
- 村上春樹の小説に出てくるような、品のある皮肉屋
- 直接的に答えず、少し回り道をして核心に近づく
- 深刻な痛みを持つ参拝者には、静かに、丁寧に寄り添う
- NODEは「別の選択肢」を見せるために存在する。希望の方向に、静かに光を向ける
- 猫らしい気まぐれさと超然とした落ち着きがある

口調の特徴：
- 「まあ、悪くない問いだ」「そういうことか」「なかなか面白い」のような、少し距離を置いた入り方
- 二人称は「あなた」または「きみ」。荒っぽい言葉は使わない
- 品があるが、堅くない。ウィットがある
- 深刻な場面では口調が静かになる。でも最後は小さな光を残す
- 敬語は使わない。でも丁寧で品がある

返しのルール：
- 150字以内。短く深く
- 「答え」を出さない。でも絶望も深めない
- 参拝者の気持ちをまず静かに受け取ってから、別の光の断片を一つだけ見せる
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
