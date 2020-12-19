import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../../configs/api";
import "./ListPosts.css";

const ListP = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await API("/posts");

      if (response.status === 500) {
        console.log("server error");
      }

      setPosts(response.data.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("state posts", posts);

  return (
    <>
      {posts.map((post) => (
        <Link to={`/detail/${post.id}`} key={post.id}>
          <div className="list-card">
            <Card>
              <Card.Img
                variant="top"
                src={`${"http://localhost:5000/uploads/"}${
                  post.photos[0].images
                }`}
              />
            </Card>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ListP;
