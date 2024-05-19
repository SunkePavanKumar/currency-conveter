# Currency Converter API

A fast and reliable Node.js/Express-based currency converter API that leverages an external exchange rate provider.

## Features

- **Accurate Conversion:** Uses real-time exchange rate data for precise currency conversions.
- **Rate Limiting:** Protects the API from abuse by limiting the number of requests per IP address.
- **Customizable:** Easy to integrate with different frontend applications.
- **CORS Support:** Allows requests from any origin.
- **Error Handling:** Provides clear error messages for failed conversions.
- **Detailed Logs:** Helps in debugging and monitoring.

## Getting Started

1. **Prerequisites**

   - Node.js and npm (or yarn) installed on your machine.

2. **Installation**

   ```bash
   git clone <the repo uri>
   ```

3. **Checkout to backend**
   ```
   cd backend
   npm install
   npm start
   <application will listen to the configured port in env>
   ```
4. **checkout to frotend**
   ```
   cd fronend
   npm install
   npm start
   <application will listen to the port 5173>
   ```
5. **ENV setup**

   ```
   <visit the website : https://www.exchangerate-api.com/>
   <get the api key from there>
   PORT = 3000
   CONVERTER_URI = https://v6.exchangerate-api.com/v6
   CONVERTER_SECRET = <your secret>

   ```
