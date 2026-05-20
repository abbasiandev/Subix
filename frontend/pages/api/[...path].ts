import type { NextApiRequest, NextApiResponse } from "next";

const TARGET =
  process.env.API_PROXY_TARGET ?? "https://subix.pythonanywhere.com";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const segments = req.query.path;
  const path = Array.isArray(segments) ? segments.join("/") : "";
  const qs = req.url?.includes("?") ? `?${req.url.split("?")[1]}` : "";
  const url = `${TARGET}/api/${path}${qs}`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (typeof req.headers.authorization === "string") {
      headers.Authorization = req.headers.authorization;
    }

    const upstream = await fetch(url, {
      method: req.method ?? "GET",
      headers,
      body:
        req.method && !["GET", "HEAD"].includes(req.method)
          ? JSON.stringify(req.body ?? {})
          : undefined,
    });

    const contentType = upstream.headers.get("content-type") ?? "application/json";
    const body = await upstream.text();
    res.status(upstream.status).setHeader("Content-Type", contentType);
    res.send(body);
  } catch {
    res.status(502).json({ detail: "خطا در ارتباط با سرور" });
  }
}
