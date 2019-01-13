import { ConfigurationInterface } from './index';
import Event, { EventInterface } from './event';
import EventCollection from './event-collection';
import Api from './api';

const MAX_BATCH_SIZE: number = 32768; // 32kb
const DEFAULT_BATCH_SIZE: number = 32768; // 32kb
const DEFAULT_BUFFER_TIME: number = 2000; // 2s

export interface Statistics {
    /**
     * Rejected number of events rejected due to invalid input
     */
    rejected: number;

    /**
     * Accepted number of accepted events.
     */
    accepted: number;

    /**
     * Buffered number of buffered events.
     */
    buffered: number;

    /**
     * Inflight number of in-flight events.
     */
    inflight: number;

    /**
     * Uploaded number of uploaded events.
     */
    uploaded: number;

    /**
     * Dropped number of events dropped due to upload failure.
     */
    dropped: number;

    /**
     * Evicted number of events evicted after calling reset
     */
    evicted: number;
}

export default class Client {
    private _batchSize: number;
    private _bufferTime: number;
    private _eventsCollection: EventCollection;
    private _api: Api;

    private _stats: Statistics = {
        rejected: 0,
        accepted: 0,
        buffered: 0,
        inflight: 0,
        uploaded: 0,
        dropped: 0,
        evicted: 0,
    };

    private _flushingCollector: number = null;

    public constructor(private _config: ConfigurationInterface) {
        this._batchSize = this._config.batchSize ? this._config.batchSize : DEFAULT_BATCH_SIZE;
        this._bufferTime = this._config.bufferTime ? this._config.bufferTime : DEFAULT_BUFFER_TIME;

        this._eventsCollection = new EventCollection();
        this._api = new Api(this._config.api);

        window.addEventListener('beforeunload', this.flushEventCollection.bind(this));
        window.addEventListener('unload', this.flushEventCollection.bind(this));
        document.addEventListener('visibilitychange', this.flushEventCollection.bind(this));
    }

    public addEvent(eventData: EventInterface) {
        return new Promise((resolve, reject) => {
            let event: Event = null;

            try {
                event = new Event(eventData);
            } catch (error) {
                this._stats.rejected++;

                return reject(error);
            }

            if (event.getSize() > this._batchSize) {
                return reject(
                    new Error(
                        `Event "${eventData.name}" size "${event.getSize()}" is larger than allowed batch size ${
                            this._batchSize
                        }`
                    )
                );
            }

            this._stats.accepted++;

            if (this._eventsCollection.getSizeWith(event) > this._batchSize) {
                this.flushEventCollection();
            }

            this._eventsCollection.add(event);

            this._stats.buffered++;

            if (this._eventsCollection.getSize() >= this._batchSize) {
                this.flushEventCollection();
            } else if (this._flushingCollector === null && this._bufferTime !== Infinity) {
                this._flushingCollector = setTimeout(this.flushEventCollection.bind(this), this._bufferTime);
            }

            resolve();
        });
    }

    private flushEventCollection() {
        this.clearFlushingCollector();

        if (this._eventsCollection.getEventsCount() === 0) {
            return;
        }

        this._stats.buffered -= this._eventsCollection.getEventsCount();
        this._stats.inflight += this._eventsCollection.getEventsCount();

        this._api.submitEvents(this._eventsCollection).then(() => {});

        this._eventsCollection.reset();
    }

    public reset(): void {
        this._stats.buffered -= this._eventsCollection.getEventsCount();
        this._stats.evicted += this._eventsCollection.getEventsCount();

        this._eventsCollection.reset();

        this.clearFlushingCollector();
    }

    public getStats(): Statistics {
        return this._stats;
    }

    private clearFlushingCollector() {
        clearTimeout(this._flushingCollector);

        this._flushingCollector = null;
    }
}
