import { Redirect } from "react-router";
import { API, setAuthToken } from "../configs/api";

// for image and static file
export const baseURL = "http://localhost:5000/uploads/";

export const login = async (dispatch, body, seterrLogin) => {
  try {
    const response = await API.post("/login", body);
    await setAuthToken(response.data.data.user.token);
    localStorage.setItem("token", response.data.data.user.token);

    const getUser = await API.get("/user");
    // localStorage.setItem("user", JSON.stringify(getUser.data.data));
    dispatch({
      type: "LOGIN",
      payload: { ...getUser.data.data },
    });
  } catch (error) {
    seterrLogin(true);
    console.log(error);
  }
};

export const register = async (dispatch, body, seterrRegis) => {
  try {
    console.log(body);
    const response = await API.post("/register", body);
    console.log(response.data.data.token);
    await setAuthToken(response.data.data.user.token);
    localStorage.setItem("token", response.data.data.user.token);
    const getUser = await API.get("/user");
    localStorage.setItem("user", JSON.stringify(getUser.data.data));

    dispatch({
      type: "LOGIN",
      payload: { ...getUser.data.data },
    });
  } catch (error) {
    seterrRegis(true);
    console.log(error);
  }
};

export const loadedService = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    setAuthToken(token);
    const getProfile = await API.get("/user");
    dispatch({
      type: "LOADED",
      payload: { ...getProfile.data.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutService = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("users");
  Redirect("./");
  setAuthToken();
  dispatch({
    type: "LOGOUT",
  });
};

export const getPostById = async (id) => {
  try {
    const post = await API.get(`/post/${id}`);
    if (!post) {
      return null;
    }
    return post;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProfile = async (cbSuccess) => {
  try {
    const profile = await API.get("/user");
    cbSuccess(profile.data.data);
  } catch (error) {
    console.log(error);
  }
};

export const getProfileById = async (id, cbSuccess) => {
  try {
    const profile = await API.get(`/user/${id}`);
    cbSuccess(profile.data.data);
  } catch (error) {
    console.log(error);
  }
};

export const getTransactions = async (cbSuccess) => {
  try {
    const transactions = await API.get("/transactions");
    console.log(transactions.data.data.transactions);
    cbSuccess(transactions.data.data.transactions);
  } catch (error) {
    console.log(error);
  }
};
export const editStatusTransaction = (id, status) => {
  API.patch(`transaction/${id}`, status)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const addTransaction = (data, cbSuccess) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.post("/transaction", data, config)
    .then(() => cbSuccess())
    .catch((err) => console.log(err));
};

export const getMyTransactions = (setTransactions) => {
  API.get("/my-transactions")
    .then((res) => setTransactions(res.data.data.transactions))
    .catch((err) => console.log(err));
};

////////Use Query
// export const getProfile = () => {
//   const url = "/user";
//   return API.get(url).then((res) => res.data.data);
// };

// export const getProfileById = ({ queryKey }) => {
//   const id = queryKey[1];
//   const url = `/user/${id}`;
//   return API.get(url).then((res) => res.data.data);
// };
