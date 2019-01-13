import { generateUUIDV4 } from './utils';

export interface EventInterface {
    id?: string;
    name: string;
    data?: any;
    timestamp?: number;
}

export default class Event {
    private _content: EventInterface;

    public constructor(private _eventConfiguration: EventInterface) {
        const name = _eventConfiguration.name;

        if (typeof name !== 'string') {
            throw new Error(`Invalid name, expected a string. Current value "${String(name)}`);
        }

        const id = this._eventConfiguration.id ? this._eventConfiguration.id : generateUUIDV4();
        const timestamp = this._eventConfiguration.timestamp ? this._eventConfiguration.timestamp : Date.now();
        const data = this._eventConfiguration.data ? this._eventConfiguration.data : {};

        if (typeof timestamp !== 'number') {
            throw new Error(`Invalid time, expected an integer. Current value "${String(timestamp)}"`);
        }

        // Verify whether data is object type or not.
        try {
            Object.getPrototypeOf(data);
        } catch (error) {
            throw new Error(`Invalid data, expected object. Got "${typeof data}" instead`);
        }

        this._content = {
            id,
            name,
            timestamp,
            data,
        };
    }

    public getEvent(): EventInterface {
        return this._content;
    }

    public getSize(): number {
        const content: string = this.toString();

        return content.length;
    }

    public toString(): string {
        return JSON.stringify(this._content);
    }
}
