import { getApiKey, fetchXmlText, sendXml, handleError } from './_lib.js';

export default async function handler(req, res) {
  try {
    const title = String(req.query.title || '').trim();
    if (!title) return res.status(400).json({ error: 'title is required' });
    const key = getApiKey();
    const url = `https://data4library.kr/api/srchBooks?authKey=${encodeURIComponent(key)}&title=${encodeURIComponent(title)}&pageSize=3&format=xml`;
    const xml = await fetchXmlText(url);
    sendXml(res, xml);
  } catch (error) {
    handleError(res, error);
  }
}
