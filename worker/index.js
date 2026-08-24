const BLOCKED_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "metadata.google.internal",
  "169.254.169.254",
]);

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; OpenGraphStudio/1.0; +https://opengraph.apoorvdarshan.com)",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/fetch") {
      return proxyFetch(url);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    if (url.pathname === "/sitemap.xml") {
      headers.set("Content-Type", "application/xml; charset=utf-8");
      headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    } else if (url.pathname === "/robots.txt") {
      headers.set("Content-Type", "text/plain; charset=utf-8");
      headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

async function proxyFetch(requestUrl) {
  const target = requestUrl.searchParams.get("url");

  if (!target) {
    return json({ error: "Missing url parameter" }, 400);
  }

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    return json({ error: "Invalid URL" }, 400);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return json({ error: "Only http(s) URLs are allowed" }, 400);
  }

  const host = parsed.hostname.toLowerCase();
  if (
    BLOCKED_HOSTS.has(host) ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return json({ error: "Host not allowed" }, 403);
  }

  try {
    const upstream = await fetch(target, {
      headers: BROWSER_HEADERS,
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") || "application/octet-stream",
        "Cache-Control": "public, max-age=300, s-maxage=600",
        "Access-Control-Allow-Origin": "*",
        "X-Proxied-Status": String(upstream.status),
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch (error) {
    const message =
      error?.name === "TimeoutError" ? "Upstream timeout" : error?.message || "Fetch failed";
    return json({ error: message }, 502);
  }
}

function json(body, status) {
  return Response.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
