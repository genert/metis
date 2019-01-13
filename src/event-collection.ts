import Event, { EventInterface } from './event';

export default class EventCollection {
    public constructor(private _events: Event[] = [], private _size: number = 0) {}

    public add(event: Event): void {
        this._events.push(event);
        this._size += event.getSize();
    }

    public getContent(): string {
        const content: EventInterface[] = this._events.reduce((content: EventInterface[], currentEvent: Event) => {
            content.push(currentEvent.getEvent());
            return content;
        }, []);

        return JSON.stringify(content);
    }

    public reset(): void {
        this._events = [];
        this._size = 0;
    }

    public getEvents(): Event[] {
        return this._events;
    }

    public getEventsCount(): number {
        return this._events.length;
    }

    public getSize(): number {
        return this._size;
    }

    public getSizeWith(event: Event): number {
        return this.getSize() + event.getSize();
    }
}
