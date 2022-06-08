// const validateField = require('./index')

test('Hello', () => {
  expect(validateField("text","qsdfdsfz").isValid).toBe(true)
  expect(validateField("text","qsdfdsfz").isValid).toBe(true)
  expect(validateField("text","s").isValid).toBe(false)
  expect(validateField("text","").isValid).toBe(false)

  expect(validateField("email","qfqzf@zefq.zd").isValid).toBe(true)
  expect(validateField("email","qf-q.zf@ze2fq.zd").isValid).toBe(true)
  expect(validateField("email","qfqzf@zefq.z").isValid).toBe(false)
  expect(validateField("email","qfqzf@zefq.zddsf").isValid).toBe(false)
  expect(validateField("email","qfqzf@zefq").isValid).toBe(false)
  expect(validateField("email","qfqzf@zefq..zd").isValid).toBe(false)
  expect(validateField("email","qfqzf.@zefq..zd").isValid).toBe(false)
  expect(validateField("email","qfqzf").isValid).toBe(false)
  expect(validateField("email","").isValid).toBe(false)

  expect(validateField("date","1920-10-31").isValid).toBe(true)
  expect(validateField("date","2099-02-31").isValid).toBe(true) // Il faudrait que ce soit faux
  expect(validateField("date","1800-10-20").isValid).toBe(false) // Year between 1900 et 2099
  expect(validateField("date","1980-15-20").isValid).toBe(false) // Month between 1 et 12
  expect(validateField("date","1980-09-60").isValid).toBe(false) // Day between 1 et 31
  expect(validateField("date","1980-9-7").isValid).toBe(false) // Two digits day and month
  expect(validateField("date","190-08-09").isValid).toBe(false) // Four digits years
  expect(validateField("date","01/02/1910").isValid).toBe(false) // Valid format : xxxx-xx-xx
  expect(validateField("date","").isValid).toBe(false)
  
  expect(validateField("number",2547274537).isValid).toBe(true)
  expect(validateField("number",4527).isValid).toBe(true)
  expect(validateField("number",0).isValid).toBe(true)
  expect(validateField("number","45e54").isValid).toBe(false)
  expect(validateField("number","fqzd").isValid).toBe(false)
  expect(validateField("number","").isValid).toBe(false)

  expect(validateField("radio",true).isValid).toBe(true)
  expect(validateField("radio",false).isValid).toBe(false)

  expect(validateField("checkbox",true).isValid).toBe(true)
  expect(validateField("checkbox",false).isValid).toBe(false)
})