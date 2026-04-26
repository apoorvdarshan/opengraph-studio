// Vercel Edge function: server-side fetch proxy for OpenGraph Studio.
// Bypasses CORS so the client can read remote pages and og:image bytes
// without depending on third-party CORS proxies.
//
// Usage:  /api/fetch?url=https%3A%2F%2Fexample.com

export const config = { runtime: 'edge' };

const BLOCKED_HOSTS = new Set([
  'localhost', '127.0.0.1', '0.0.0.0', '::1',
  'metadata.google.internal', '169.254.169.254'
]);

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; OpenGraphStudio/1.0; +https://opengraph-studio.vercel.app)',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('url');

  if (!target) {
    return json({ error: 'Missing url parameter' }, 400);
  }

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    return json({ error: 'Invalid URL' }, 400);
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return json({ error: 'Only http(s) URLs are allowed' }, 400);
  }

  const host = parsed.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host) || host.endsWith('.local') || host.endsWith('.internal')) {
    return json({ error: 'Host not allowed' }, 403);
  }

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 10_000);

  try {
    const upstream = await fetch(target, {
      headers: BROWSER_HEADERS,
      redirect: 'follow',
      signal: ctrl.signal
    });
    clearTimeout(timeout);

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=300, s-maxage=600',
        'Access-Control-Allow-Origin': '*',
        'X-Proxied-Status': String(upstream.status)
      }
    });
  } catch (err) {
    clearTimeout(timeout);
    const msg = err && err.name === 'AbortError' ? 'Upstream timeout' : (err && err.message) || 'Fetch failed';
    return json({ error: msg }, 502);
  }
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
