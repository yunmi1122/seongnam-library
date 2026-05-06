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
    const fromAge = req.query.from_age || '6';
    const toAge = req.query.to_age || '9';
    const gender = req.query.gender;
    const authKey = encodeURIComponent(getApiKey());
    let url = `https://data4library.kr/api/loanItemSrch?authKey=${authKey}&from_age=${encodeURIComponent(fromAge)}&to_age=${encodeURIComponent(toAge)}&pageSize=15&format=xml`;
    if (gender !== undefined && gender !== '') url += `&gender=${encodeURIComponent(gender)}`;
    await fetchXml(url, res);
  } catch (e) {
    res.status(500).send(`<error>${e.message}</error>`);
  }
}
