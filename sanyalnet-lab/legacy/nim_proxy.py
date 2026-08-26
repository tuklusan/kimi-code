#!/usr/bin/env python3
"""
Tiny HTTP proxy that forwards to NVIDIA NIM (https://integrate.api.nvidia.com)
and strips OpenAI-only params that NIM does not accept (currently:
"prompt_cache_key"). Streams SSE responses back verbatim.

Bind:  127.0.0.1:11434   (localhost only)
Usage: point kimi-code base_url at http://127.0.0.1:11434/v1
"""
import http.server
import json
import ssl
import urllib.request

UPSTREAM = "https://integrate.api.nvidia.com"
STRIP_TOP_LEVEL = {"prompt_cache_key"}

class Proxy(http.server.BaseHTTPRequestHandler):
    def _forward(self, method: str) -> None:
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length) if length else b""

        # Strip params for JSON bodies only
        ctype = (self.headers.get("Content-Type") or "").lower()
        if body and "json" in ctype:
            try:
                doc = json.loads(body)
                if isinstance(doc, dict):
                    for k in list(doc.keys()):
                        if k in STRIP_TOP_LEVEL:
                            doc.pop(k, None)
                body = json.dumps(doc).encode("utf-8")
            except Exception:
                pass  # not JSON we can parse; forward as-is

        url = UPSTREAM + self.path
        req = urllib.request.Request(url, data=body if body else None, method=method)
        for h, v in self.headers.items():
            if h.lower() in ("host", "content-length", "connection"):
                continue
            req.add_header(h, v)
        if body:
            req.add_header("Content-Length", str(len(body)))

        try:
            resp = urllib.request.urlopen(req, timeout=600, context=ssl.create_default_context())
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            for h, v in e.headers.items():
                if h.lower() in ("transfer-encoding", "connection"):
                    continue
                self.send_header(h, v)
            self.end_headers()
            try:
                self.wfile.write(e.read())
            except Exception:
                pass
            return
        except Exception as e:
            self.send_response(502)
            self.end_headers()
            self.wfile.write(f"proxy error: {e}\n".encode())
            return

        self.send_response(resp.status)
        for h, v in resp.headers.items():
            if h.lower() in ("transfer-encoding", "connection", "content-length"):
                continue
            self.send_header(h, v)
        self.end_headers()
        while True:
            chunk = resp.read(8192)
            if not chunk:
                break
            try:
                self.wfile.write(chunk)
                self.wfile.flush()
            except Exception:
                break

    def do_GET(self): self._forward("GET")
    def do_POST(self): self._forward("POST")
    def do_PUT(self): self._forward("PUT")
    def do_DELETE(self): self._forward("DELETE")
    def log_message(self, fmt, *a): pass  # quiet

if __name__ == "__main__":
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 11434), Proxy)
    print("nim_proxy listening on http://127.0.0.1:11434 -> " + UPSTREAM)
    srv.serve_forever()
