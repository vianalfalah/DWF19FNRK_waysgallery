import { useState, useEffect } from "react";
import { getProfile, baseURL } from "../../configs/services";
import { Link } from "react-router-dom";
import Header from "../../component/Header/Header";
import { Button } from "react-bootstrap";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState();
  useEffect(() => {
    getProfile(setProfile);
    console.log(getProfile);
  }, []);

  return profile ? (
    <>
      <Header />
      {profile && (
        <div className="user">
          <div className="box-avatar">
            <img
              className="avatar"
              src={`${baseURL}${profile.user.profile.avatar}`}
            />
            <div className="greets">
              <h3>{profile.user.fullName}</h3>
              <h2>{profile.user.profile.greeting}</h2>
            </div>
          </div>
          <div className="img-post">
            <img
              className="img"
              src={`${baseURL}${profile.user.posts[0].photos[0].images}`}
            />
          </div>
          <div className="btn-hire">
            <Link to="/edit/my-profile">
              <Button className="edit">Edit Profile</Button>
            </Link>
          </div>
          <h1>My Work Art</h1>
          <div className="box-arts">
            <div className="grid-container">
              <img
                src={`${"http://localhost:5000/"}${
                  profile.user.arts[0].images
                }`}
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
export default Profile;
