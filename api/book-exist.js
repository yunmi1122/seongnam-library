import { getApiKey, fetchXmlText, sendXml, handleError } from './_lib.js';

export default async function handler(req, res) {
  try {
    const isbn13 = String(req.query.isbn13 || '').trim();
    const libCode = String(req.query.libCode || '').trim();
    if (!isbn13 || !libCode) return res.status(400).json({ error: 'isbn13 and libCode are required' });
    const key = getApiKey();
    const url = `https://data4library.kr/api/bookExist?authKey=${encodeURIComponent(key)}&libCode=${encodeURIComponent(libCode)}&isbn13=${encodeURIComponent(isbn13)}&format=xml`;
    const xml = await fetchXmlText(url);
    sendXml(res, xml);
  } catch (error) {
    handleError(res, error);
  }
}
