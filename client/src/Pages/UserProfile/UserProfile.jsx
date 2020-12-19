import { useState, useEffect } from "react";
import { getProfileById, baseURL } from "../../configs/services";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/Header/Header";
import "./UserProfile.css";
import { Button } from "react-bootstrap";

function UserProfile() {
  const [profile, setProfile] = useState();
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id, setProfile);
    console.log(getProfileById);
  }, []);

  return profile ? (
    <>
      <Header />
      {profile && (
        <div className="user">
          <div className="box-avatar">
            <img
              className="avatar"
              src={`${baseURL}${profile.profile.avatar}`}
            />
            <div className="greets">
              <h3>{profile.fullName}</h3>
              <h2>{profile.profile.greeting}</h2>
            </div>
          </div>

          <div className="img-post">
            <img
              className="img"
              src={`${baseURL}${profile.posts[0].photos[0].images}`}
            />
          </div>
          <div className="btn-hire">
            <Button className="follow">
              <p style={{ alignItems: "center", textAlign: "center" }}>
                Follow
              </p>
            </Button>
            <Link to={`/hire/${profile.id}`}>
              <Button className="hire">
                <p style={{ alignItems: "center", textAlign: "center" }}>
                  Hire
                </p>
              </Button>
            </Link>
          </div>
          <h1>{profile.fullName} Work </h1>
          <div className="box-arts">
            <div className="grid-container">
              <img
                src={`${"http://localhost:5000/"}${profile.arts[0].images}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div>
      <Header />
      <div>Apa tuh</div>
    </div>
  );
}
export default UserProfile;
