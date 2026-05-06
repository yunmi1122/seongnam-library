function getApiKey() {
  const key = process.env.DATA4LIBRARY_KEY;
  if (!key) {
    throw new Error('DATA4LIBRARY_KEY 환경변수가 없습니다. Vercel Settings > Environment Variables에 추가해 주세요.');
  }
  return key;
}

async function fetchXml(url, res) {
  const response = await fetch(url);
  const text = await response.text();
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(response.status).send(text);
}

export default async function handler(req, res) {
  try {
    const title = req.query.title || '';
    if (!title) return res.status(400).send('<error>title is required</error>');
    const authKey = encodeURIComponent(getApiKey());
    const url = `https://data4library.kr/api/srchBooks?authKey=${authKey}&title=${encodeURIComponent(title)}&pageSize=3&format=xml`;
    await fetchXml(url, res);
  } catch (e) {
    res.status(500).send(`<error>${e.message}</error>`);
  }
}
