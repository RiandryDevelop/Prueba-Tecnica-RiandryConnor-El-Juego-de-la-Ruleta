import { FormLoginService } from '../../composables/FormLoginService';
import { describe, expect, it, vitest } from 'vitest';
describe('FormLoginService', () => {
    it('isFormComplete returns correct value', () => {
        const formData = { name: 'User', balance: 100 };
        const router = [];
        const service = FormLoginService(formData, router);
        expect(service.isFormComplete.value).toBe(true);
    });
    it('submitForm saves data and navigates', async () => {
        const formData = { name: 'User', balance: 100 };
        const router = { push: vitest.fn() };
        // vi.mockResponseOnce(JSON.stringify(formData));
        const service = FormLoginService(formData, router);
        await service.submitForm();
        expect(sessionStorage.getItem('userData')).toEqual(JSON.stringify(formData));
        expect(router.push).toHaveBeenCalledWith('/roulette');
    });
});
