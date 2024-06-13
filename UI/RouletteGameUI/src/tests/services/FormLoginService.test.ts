import { ref } from 'vue';
import { FormLoginService } from '../../composables/FormLoginService';
import { IFormData } from '../../interfaces/IRoulette';
import { describe, expect, it, vitest } from 'vitest';
import { Router } from 'vue-router';

describe('FormLoginService', () => {
  it('isFormComplete returns correct value', () => {
    const formData: IFormData = { name: 'User', balance: 100 };
    const router: Router | string[] = [];
    const service = FormLoginService(formData, router);
    expect(service.isFormComplete.value).toBe(true);
  });

  it('submitForm saves data and navigates', async () => {
    const formData: IFormData = { name: 'User', balance: 100 };
    const router = { push: vitest.fn() };
    // vi.mockResponseOnce(JSON.stringify(formData));

    const service = FormLoginService(formData, router);
    await service.submitForm();
    expect(sessionStorage.getItem('userData')).toEqual(JSON.stringify(formData));
    expect(router.push).toHaveBeenCalledWith('/roulette');
  });
});
