import Event, { EventInterface } from '../src/event';
import * as expect from 'unexpected';

describe('event', () => {
    it('should return expected content', () => {
        const timestamp: number = Date.now();
        const event: EventInterface = {
            id: '1',
            name: 'mock-event',
            timestamp,
            data: {
                mock: true
            },
        };

        expect(new Event(event).getContent(), 'to equal', JSON.stringify(event))
    });
});
