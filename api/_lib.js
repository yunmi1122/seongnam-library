export function getApiKey() {
  const key = process.env.LIBRARY_API_KEY;
  if (!key) {
    const err = new Error('LIBRARY_API_KEY is not set in Vercel Environment Variables.');
    err.statusCode = 500;
    throw err;
  }
  return key;
}

export async function fetchXmlText(url) {
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`Data4Library API error: ${res.status}`);
    err.statusCode = res.status;
    err.body = text;
    throw err;
  }
  return text;
}

export function sendXml(res, xmlText) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xmlText);
}

export function handleError(res, error) {
  res.status(error.statusCode || 500).json({ error: error.message || 'Unknown error' });
}
