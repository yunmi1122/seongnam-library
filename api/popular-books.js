import { getApiKey, fetchXmlText, sendXml, handleError } from './_lib.js';

export default async function handler(req, res) {
  try {
    const fromAge = String(req.query.from_age || '').trim();
    const toAge = String(req.query.to_age || '').trim();
    const gender = String(req.query.gender || '').trim();
    if (!fromAge || !toAge) return res.status(400).json({ error: 'from_age and to_age are required' });
    const key = getApiKey();
    let url = `https://data4library.kr/api/loanItemSrch?authKey=${encodeURIComponent(key)}&from_age=${encodeURIComponent(fromAge)}&to_age=${encodeURIComponent(toAge)}&pageSize=15&format=xml`;
    if (gender) url += `&gender=${encodeURIComponent(gender)}`;
    const xml = await fetchXmlText(url);
    sendXml(res, xml);
  } catch (error) {
    handleError(res, error);
  }
}
