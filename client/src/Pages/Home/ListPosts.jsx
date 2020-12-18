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
        <Link
          to={`/detail/${post.id}`}
          key={post.id}
          className="text-decoration-none"
        >
          <Col>
            <Card className="c-list-card">
              {post.photos.map((images) => (
                <Card.Img
                  className="c-list-card-img"
                  variant="top"
                  src={`${"http://localhost:5000/uploads/"}${images.images}`}
                />
              ))}
            </Card>
          </Col>
        </Link>
      ))}
    </>
  );
};

export default ListP;
