import EventCollection from '../src/event-collection';
import * as expect from 'unexpected';
import Event from '../src/event';

describe('event-collection', () => {
    it('should initialize empty collection', () => {
        const collection: EventCollection = new EventCollection();

        expect(collection.getEvents(), 'to equal', []);
        expect(collection.getSize(), 'to equal', 0);
    });

    it('should add event to the collection', () => {
        const collection: EventCollection = new EventCollection();
        const mockEvent: Event = new Event({
            name: 'mock-event',
            data: {
                mock: true
            }
        });

        collection.add(mockEvent);

        expect(collection.getEvents(), 'to equal', [mockEvent]);
        expect(collection.getEventsCount(), 'to equal', 1);
        expect(collection.getSize(), 'to equal', mockEvent.getSize());
    });
});
