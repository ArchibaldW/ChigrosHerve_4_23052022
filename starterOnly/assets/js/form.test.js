import {
  validateText,
  validateEmail,
  validateDate,
  validateNumber,
} from './form.js';

describe('Test validateField', () => {
  it('Format text should be valid', () => {
    expect(validateText('qsdfdsfz').isValid).toBe(true);
    expect(validateText('s').isValid).toBe(false);
    expect(validateText('').isValid).toBe(false);
  });

  test('email', () => {
    expect(validateEmail('qfqzf@zefq.zd').isValid).toBe(true);
    expect(validateEmail('qf-q.zf@ze2fq.zd').isValid).toBe(true);
    expect(validateEmail('qfqzf@zefq.z').isValid).toBe(false);
    expect(validateEmail('qfqzf@zefq.z').message).toEqual('Veuillez entrer une adresse email valide.');
    expect(validateEmail('qfqzf@zefq.zddsf').isValid).toBe(false);
    expect(validateEmail('qfqzf@zefq').isValid).toBe(false);
    expect(validateEmail('qfqzf@zefq..zd').isValid).toBe(false);
    expect(validateEmail('qfqzf.@zefq..zd').isValid).toBe(false);
    expect(validateEmail('qfqzf').isValid).toBe(false);
    expect(validateEmail('').isValid).toBe(false);
  });

  test('date', () => {
    expect(validateDate('1920-10-31').isValid).toBe(true);
    expect(validateDate('1800-10-20').isValid).toBe(true);
    expect(validateDate('2099-02-31').isValid).toBe(false);
    expect(validateDate('1980-15-20').isValid).toBe(false); // Month between 1 et 12
    expect(validateDate('1980-09-60').isValid).toBe(false); // Day between 1 et 31
    expect(validateDate('').isValid).toBe(false);
  });

  test('number', () => {
    expect(validateNumber(2547274537).isValid).toBe(true);
    expect(validateNumber(4527).isValid).toBe(true);
    expect(validateNumber(0).isValid).toBe(true);
    expect(validateNumber('45e54').isValid).toBe(false);
    expect(validateNumber('fqzd').isValid).toBe(false);
    expect(validateNumber('').isValid).toBe(false);
  });
});
