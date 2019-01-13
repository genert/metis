# Metis

[![NPM Version](https://badge.fury.io/js/metis-data.svg)](https://badge.fury.io/js/metis-data)

> Asynchronous data sender library

- Asynchronous-first :zap:
- Uses [navigator.sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) to send data over HTTP to configured host without waiting for a response. Falls back to XHR when not supported.
- Sends event collection at configured interval or when maximum event collection size is reached.
- Sends all accepted events when the document or a child resource is being unloaded.
- Does not block the process of unloading the document.
- 2.08 kB kB gzipped of minified version.
- Dependency-free :tada:

## Getting Started

#### Step 1: Install

[Download the latest release](https://raw.githubusercontent.com/Genert/metis-data/master/dist/main.js) or install with npm.

```sh
npm install metis-data --save
```

#### Step 2: Reference
If you linked `metis-data` directly in your HTML, you can use `window.MetisData`. If you're using a module bundler, you'll need to import it.

```javascript
// CommonJS
const MetisData = require('metis-data');

// ES2015
import MetisData from 'metis-data';
```

### Step 3: Usage

Minimal example. See configuration options below.

```javascript
const analytics = new MetisData({
  api: {
    host: 'https://yourapi.com/path'
  }
}));

analytics.addEvent({
  name: 'your-event-name',
  data: {
    // Data payload
    something: 'mock-data'
  }
});
```

With default settings, following event will be sent to configured host as POST request within default buffer time (2s).

The payload will be array of event objects converted to a JSON string as following:

```
[
  {
    "id":"b9e601f6-462a-413b-af98-3f5e28fe2f12",
    "name":"your-event-name",
    "timestamp":1547411367556,
    "data":{
      "something":"mock-data"
    }
  }
]
```

Each event has unique RFC4122 version 4 compliant UUID by default, which can be overridden by your prefered id.

Also, timestamp is added when the event was added to the event collection. This can be also overriden as following example shows:

```javascript
analytics.addEvent({
  id: 'your-id', // Must be string
  name: 'your-event-name',
  timestamp: Date.now(),
  data: {
    // Data payload
  }
});
```

## Options
You can set options on `metis-data` during initialization.

```javascript
// During initialize
new MetisData({
  api: {
    host: 'https://yourapi.com/path',
    method: 'POST',
    query: {
      param: 123
    }
  },
  bufferTime: 10000,
  batchSize: 32768
});
```

### `options.bufferTime`

> Describes timespan in what event collection is gathered and sent to configured host.
>
> **Default:** *(integer)* `2000` (2s).

### `options.batchSize`

> Defines maximum batch size for both event collection and event itself.
>
> **Default:** *(integer)* `32768` (32 kB)

## Polyfill

The library uses [navigator.sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) and [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) that you might need polyfill for. You can for instance use *babel-polyfill* in this case.

## Contributions & Issues

Contributions are welcome. Please clearly explain the purpose of the PR and follow the current style.

Issues can be resolved quickest if they are descriptive and include both a reduced test case and a set of steps to reproduce.

## Licence

Licensed under the [MIT License](LICENSE) © 2019 Genert Org