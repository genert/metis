import * as expect from 'unexpected';
import Metis from '../src/index';

describe('testing', () => {
    it('should work', () => {
        const analytics = new Metis({
            api: {
                host: 'https://api.test.solcredito.es/api/v1/form_field_action',
            },
        });

        analytics.addEvent({
            name: 'impression',
            data: {
                action_type: 'shown',
                form_field_name: 'application_period',
                impression_hash: '625bdecd-f59e-49c8-984d-1c5160233405',
            },
        });

        setTimeout(() => {
            expect(true, 'to be true');
        }, 5000);
    });
});