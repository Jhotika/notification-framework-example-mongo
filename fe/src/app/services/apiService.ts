class ApiService {
  readonly BASE_URL = "http://localhost:8000";
  async get(endpoint: string, headers: Record<string, string> = {}) {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      if (!response.ok) {
        throw new Error(`GET request failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in GET request:", error);
      throw error;
    }
  }

  async post<T>(
    endpoint: string,
    body: T,
    headers: Record<string, string> = {}
  ) {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`POST request failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  }

  async patch<T>(
    endpoint: string,
    body: T,
    headers: Record<string, string> = {}
  ) {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`PATCH request failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in PATCH request:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default ApiService;
