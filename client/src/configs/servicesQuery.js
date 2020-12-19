import { API, setAuthToken } from "../configs/api";

// for image and static file
export const baseURL = "http://localhost:5000/uploads";

export const getPosts = () => {
  const url = "/posts";
  return API.get(url).then((res) => {
    return res.data.data.posts.map((post) => {
      const img = new Image();
      img.src = `${baseURL}${post.photo[0].image}`;
      if (!img.width && !img.height) {
        return {
          src: `${baseURL}${post.photo[0].image}`,
          alt: post.id.toString(),
          width: 2,
          height: 2,
        };
      }
      return {
        src: `${baseURL}${post.photo[0].image}`,
        alt: post.id.toString(),
        width: img.width,
        height: img.height,
      };
    });
  });
};

export const getPostsById = ({ queryKey }) => {
  const id = queryKey[1];
  const url = `/post/${id}`;
  return API.get(url).then((res) => res.data.data.post);
};

export const getMyProfile = () => {
  const url = "/user";
  return API.get(url).then((res) => res.data.data);
};

export const getProfileById = ({ queryKey }) => {
  const id = queryKey[1];
  const url = `/user/${id}`;
  return API.get(url).then((res) => res.data.data);
};
