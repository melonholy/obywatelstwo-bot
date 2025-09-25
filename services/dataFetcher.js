const axios = require("axios");
const https = require("https");
const config = require("../config");

class DataFetcher {
  constructor() {
    this.url = config.API_URL;

    // Configure axios instance with SSL settings
    this.axiosInstance = axios.create({
      timeout: 30000, // 30 second timeout
      httpsAgent: new https.Agent({
        rejectUnauthorized: false // Ignore SSL certificate errors
      }),
      headers: {
        'User-Agent': 'ObywatelstwBot/1.0',
        'Accept': 'application/json'
      }
    });
  }

  async fetchData() {
    try {
      console.log("Fetching data from API...");

      const response = await this.axiosInstance.get(this.url);

      console.log("API Response:", response.data);
      console.log(`Status: ${response.status} ${response.statusText}`);

      return response.data;

    } catch (error) {
      // Enhanced error handling with axios error structure
      if (error.response) {
        // Server responded with error status
        console.log("API Error Response:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
      } else if (error.request) {
        // Request was made but no response received
        console.log("Network error - no response received:", error.message);
      } else {
        // Something else went wrong
        console.log("Request setup error:", error.message);
      }

      console.log("Fetch error:", error.message);
      throw error;
    }
  }

  isDataAvailable(data) {
    return data && Array.isArray(data) && data.length > 0;
  }
}

module.exports = DataFetcher;
