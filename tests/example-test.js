import { isValidEmail } from '../src/utils/validators'

const validEmail = 'cedric@derniercri.io'
const invalidEmail = 'fabien.derniercri.io'

test('isValidEmail', () => {
  expect(isValidEmail(validEmail)).toBe(true);
})

test('isValidEmail', () => {
  expect(isValidEmail(invalidEmail)).toBe(false);
})
