# Metis

> Asynchronous analytics data sender library.

- Asynchronous-first
- Uses [navigation.sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) to send data over HTTP to configured host without waiting for a response. Falls back to XHR when not supported.
- Sends event collection at configured interval or when maximum event collection size is reached.
- Sends all accepted events when the document or a child resource is being unloaded.
- Does not block user