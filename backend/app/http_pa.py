"""HTTP client helper — PythonAnywhere free tier needs the platform proxy."""

import os

import httpx


def proxy_url() -> str | None:
    return (
        os.environ.get("HTTPS_PROXY")
        or os.environ.get("https_proxy")
        or os.environ.get("HTTP_PROXY")
        or os.environ.get("http_proxy")
    )


def make_client(**kwargs) -> httpx.Client:
    proxy = proxy_url()
    if proxy:
        return httpx.Client(proxy=proxy, **kwargs)
    return httpx.Client(trust_env=False, **kwargs)
