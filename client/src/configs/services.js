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
    localStorage.setItem("user", JSON.stringify(getUser.data.data));

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
  localStorage.removeItem("user");

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

export const addPost = (data, cbSuccess) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.post("/post/add", data, config)
    .then((res) => {
      cbSuccess();
    })
    .catch((err) => console.log(err));
};

export const editProfile = (data, cbSuccess) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.patch("/user", data, config)
    .then(() => cbSuccess())
    .catch((err) => console.log(err));
};

export const addArt = (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.post("/upload-arts", data, config)
    .then(() => alert("Berhasil Menambahkan Art"))
    .catch((err) => console.log(err));
};

export const addHired = (data, cbSuccess) => {
  API.post("/hired", data)
    .then((res) => cbSuccess(res.data.data.hired))
    .catch((err) => console.log(err));
};

export const getOrder = (cbSuccess) => {
  API.get("/my-order")
    .then((res) => cbSuccess(res.data.data.order))
    .catch((err) => console.log(err));
};

export const getOffer = (cbSuccess) => {
  API.get("/my-offer")
    .then((res) => cbSuccess(res.data.data.offer))
    .catch((err) => console.log(err));
};

export const editStatusHired = (id, status, cbSuccess) => {
  API.patch(`/hired/${id}`, status)
    .then(() => cbSuccess("sukses edit status silahkan refresh"))
    .catch((err) => console.log(err));
};

export const addProject = async (id, cbSuccess, data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    API.post(`/send-project/${id}`, data, config)
      .then((res) => {
        cbSuccess();
        editStatusHired(id, { status: "Success" }, null);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const getProject = (id, cbSuccess) => {
  API.get(`/project/${id}`)
    .then((res) => cbSuccess(res.data.data.project))
    .catch((err) => console.log(err));
};
