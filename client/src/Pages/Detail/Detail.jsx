import { useContext, useState, useEffect } from "react";
import Header from "./../../elements/Header/Header";

import { getPostById, baseURL } from "../../configs/services";
import { useParams } from "react-router-dom";

import "./Detail.css";

function Detail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      const post = await getPostById(id);
      console.log(post);
      if (post) {
        return setPost(post.data.data.post);
      }
    })();
  }, [id]);

  return post ? (
    <>
      <Header />
      <div className="page-detail" style={{ marginTop: 80 }}>
        <div className="form-detail">
          <div>
            {post.photos.map((images) => (
              <img
                className="img"
                alt={post.id}
                src={`${baseURL}${images.images}`}
              />
            ))}
          </div>
          <p className="title">{post.title}</p>

          <p className="desc">{post.description}</p>

          {post.user.map((fullName) => (
            <p className="price">{fullName.fullName}</p>
          ))}
        </div>
      </div>
    </>
  ) : (
    <>
      <Header />
      <h1 style={{ textAlign: "center", marginTop: 300 }}>Post Tidak Ada</h1>
    </>
  );
}

export default Detail;
