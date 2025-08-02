const base = process.env.RAZORPAY_API_URL || "https://api.razorpay.com/v1"

export const razorpay = {
    createOrder: async function createOrder(price: number) {
  const { RAZORPAY_CLIENT_ID, RAZORPAY_APP_SECRET } = process.env
  const auth = Buffer.from(RAZORPAY_CLIENT_ID + ':' + RAZORPAY_APP_SECRET).toString('base64')
  const url = `${base}/orders`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount: price * 100, // amount in paise
      currency: 'INR',
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: 1,
    }),
  })
  return handleResponse(response)
    },
    capturePayment: async function capturePayment(paymentId: string, amount: number) {
  const { RAZORPAY_CLIENT_ID, RAZORPAY_APP_SECRET } = process.env
  const auth = Buffer.from(RAZORPAY_CLIENT_ID + ':' + RAZORPAY_APP_SECRET).toString('base64')
  const url = `${base}/payments/${paymentId}/capture`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount: amount * 100, // in paise
      currency: 'INR',
    }),
  })
  return handleResponse(response)
},
}


// async function generateAccessToken() {
//   const { RAZORPAY_CLIENT_ID, RAZORPAY_APP_SECRET } = process.env
//   const auth = Buffer.from(RAZORPAY_CLIENT_ID + ':' + RAZORPAY_APP_SECRET).toString(
//     'base64'
//   )
//   const response = await fetch(`${base}/v1/oauth2/token`, {
//     method: 'post',
//     body: 'grant_type=client_credentials',
//     headers: {
//       Authorization: `Basic ${auth}`,
//     },
//   })

//   const jsonData = await handleResponse(response)
//   return jsonData.access_token
// }

async function handleResponse(response: any) {
  if (response.status === 200 || response.status === 201) {
    return response.json()
  }

  const errorMessage = await response.text()
  throw new Error(errorMessage)
}

