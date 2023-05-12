import Http, { BACKEND_URL } from "./Http";

const login = async (email, password) => {
  try {
    console.log("Sending POST Request to:", BACKEND_URL + "/auth/login");
    const response = await fetch(BACKEND_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) return new Error(data.error);
    return { data, token: response.headers.get("X-Auth-Token") };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const register = async (email, name, password) => {
  try {
    console.log("Sending POST Request to:", BACKEND_URL + "/auth/register");
    const response = await fetch(BACKEND_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    const data = await response.json();
    if (!response.ok) return new Error(data.error);
    return { data, token: response.headers.get("X-Auth-Token") };
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getConversations(id) {
  return Http.get(`/users/conversations`);
}

async function getMessages(conversationId) {
  return Http.get(`/conversations/${conversationId}/messages`);
}

function makeConversation(email) {
  return Http.post("/conversations", { email });
}

function isloggedIn() {
  return Http.get("/users/me");
}

export default {
  login,
  register,
  getConversations,
  getMessages,
  makeConversation,
  isloggedIn,
};
