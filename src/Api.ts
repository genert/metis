import EventCollection from './event-collection';
import { ApiConfigurationInterface } from '.';
import { createQueryString } from './utils';

export default class Api {
    public constructor(private _config: ApiConfigurationInterface) {}

    public submitEvents(collection: EventCollection): Promise<any> {
        return new Promise((resolve, reject) => {
            const request = {
                method: this._config.method ? this._config.method : 'POST',
                host: this._config.host ? this._config.host : '',
                query: this._config.query ? this._config.query : {},
                body: collection.getContent(),
            };
            const url = `${request.host}?${createQueryString(request.query)}`;

            if (!!navigator.sendBeacon && navigator.sendBeacon(url, request.body)) {
                return resolve();
            }

            // Use XHR instead
            const xhr = new XMLHttpRequest();

            xhr.open(request.method, url, true);
            xhr.withCredentials = false;
            xhr.setRequestHeader('content-type', 'text/plain');

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const status = xhr.status;
                    const statusCategory = parseInt(String(status / 100), 10);

                    if (statusCategory === 2) {
                        return resolve();
                    }

                    return reject(new Error(`Request to ${url} failed with status "${status}"`));
                }
            };

            xhr.send(request.body);
        });
    }
}
