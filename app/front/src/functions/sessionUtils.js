import axios from "axios";

export async function getSession() {
  const storedSessionData = localStorage.getItem("userSession");
  if (storedSessionData && storedSessionData !== "null") {
    const sessionData = JSON.parse(storedSessionData);
    return sessionData;
  } else {
    try {
      const response = await axios.get("/api/auth/session");
      const sessionData = response.data.session;
      localStorage.setItem("userSession", JSON.stringify(sessionData));
      return sessionData;
    } catch (error) {
      console.error("Error fetching session data from API:", error);
      return null;
    }
  }
}
