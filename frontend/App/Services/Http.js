async function login(email, password) {
  try {
    const response = await fetch(
      process.env.STAY_CONNECT_BACKEND_URL + "/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      return new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function register(email, name, password) {
  try {
    const response = await fetch(
      process.env.STAY_CONNECT_BACKEND_URL + "/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      return new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default {
  login,
  register,
};
