import { generateUUIDV4 } from "./Utils";

export interface EventInterface {
    id?: string;
    name: string;
    data?: any;
    timestamp?: Date;
}

export default class Event {
    private _content: string;

    public constructor(private _eventConfiguration: EventInterface ) {
        const id = _eventConfiguration.id ? _eventConfiguration.id : generateUUIDV4();
        const name = _eventConfiguration.name;
        const timestamp = _eventConfiguration.timestamp ? _eventConfiguration.timestamp : Date.now();
        const data = _eventConfiguration.data ? _eventConfiguration.data : {};

        if (typeof name !== 'string') {
            throw new Error(`Invalid name, expected a string. Current value "${String(name)}`);
        }

        if (typeof timestamp !== 'number') {
            throw new Error(`Invalid time, expected an integer. Current value "${String(timestamp)}"`);
        }

        // Verify whether data is object type or not.
        try {
            Object.getPrototypeOf(data);
        } catch (error) {
            throw new Error(`Invalid data, expected object. Got "${typeof data}" instead`);
        }

        this._content = JSON.stringify({
            id,
            name,
            timestamp,
            data,
        });
    }

    public getContent(): string {
        return this._content;
    }

    public getSize(): number {
        return this._content.length;
    }
}
