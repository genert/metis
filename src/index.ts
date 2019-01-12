import Client, { Statistics } from "./Client";
import { EventInterface } from "./Event";

export interface ApiConfigurationInterface {
    host: string;
    method?: string;
    query?: any;
}

export interface ConfigurationInterface {
    api: ApiConfigurationInterface;
    batchSize?: number;
    bufferTime?: number;
}

export default class Metis {
    private _client: Client;

    public constructor(private _config: ConfigurationInterface) {
        this._client = new Client(_config);
    }

    /**
     * Enqueues an event to be uploaded at a later time.
     * 
     * @param event 
     */
    public addEvent(event: EventInterface): Promise<any> {
        return this._client.addEvent(event);
    }

    /**
     * Discards all buffered events.
     */
    public reset(): void {
        this._client.reset();
    }

    /**
     * Get run-time statistics.
     */
    public getStats(): Statistics {
        return this._client.getStats();
    }
}
