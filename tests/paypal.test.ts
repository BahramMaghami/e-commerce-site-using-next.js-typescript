import { generateAccessToken } from '../lib/paypal'
import { test, expect, describe } from '@jest/globals'

// Test to generate access token form paypal
test('generate token from paypal', async () => {
  const tokenResponse = await generateAccessToken()
  console.log(tokenResponse)
  expect(typeof tokenResponse).toBe('string')
  expect(tokenResponse.length).toBeGreaterThan(0)
})
