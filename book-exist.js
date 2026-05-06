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
    const libCode = req.query.libCode || '';
    const isbn13 = req.query.isbn13 || '';
    if (!libCode || !isbn13) return res.status(400).send('<error>libCode and isbn13 are required</error>');
    const authKey = encodeURIComponent(getApiKey());
    const url = `https://data4library.kr/api/bookExist?authKey=${authKey}&libCode=${encodeURIComponent(libCode)}&isbn13=${encodeURIComponent(isbn13)}&format=xml`;
    await fetchXml(url, res);
  } catch (e) {
    res.status(500).send(`<error>${e.message}</error>`);
  }
}
