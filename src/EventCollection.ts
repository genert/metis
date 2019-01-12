import Event from "./Event";

class EventCollection {
	public constructor(private _events: Event[] = [], private _size: number = 0) {}

	public add(event: Event): void {
		this._events.push(event);
		this._size += event.getSize();
	}

	public getContent(): string {
		return this._events.reduce((content: string, currentEvent: Event) => content += currentEvent.getSize(), '');
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

export default EventCollection;
