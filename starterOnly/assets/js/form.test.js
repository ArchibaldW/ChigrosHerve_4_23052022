import {validateField} from "./form.js"

test('Hello', () => {
  expect(validateField("text","qsdfz")).toBe(true)
  expect(validateField("text","q")).toBe(false)
})