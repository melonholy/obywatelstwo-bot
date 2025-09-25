const https = require("https");
const config = require("../config");

class DataFetcher {
  constructor() {
    this.url = config.API_URL;
  }

  async fetchData() {
    try {
      console.log("Fetching data from API...");

      return new Promise((resolve, reject) => {
        const options = {
          rejectUnauthorized: false, // Ignore SSL certificate errors
        };

        https
          .get(this.url, options, (response) => {
            let data = "";

            response.on("data", (chunk) => {
              data += chunk;
            });

            response.on("end", () => {
              try {
                const jsonData = JSON.parse(data);
                console.log("API Response:", jsonData);
                resolve(jsonData);
              } catch (parseError) {
                console.log("Parse error:", parseError);
                console.log("Raw response:", data);
                reject(parseError);
              }
            });
          })
          .on("error", (error) => {
            console.log("Request error:", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Fetch error:", error);
      throw error;
    }
  }

  isDataAvailable(data) {
    return data && Array.isArray(data) && data.length > 0;
  }
}

module.exports = DataFetcher;
