import { useState, useEffect } from "react";
import { getProfile, baseURL } from "../../configs/services";
import { Link } from "react-router-dom";
import Header from "../../component/Header/Header";
import { Button } from "react-bootstrap";
import userIcon from "../../assets/icon/userIcon.png";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState();
  useEffect(() => {
    getProfile(setProfile);
    console.log(getProfile);
  }, []);

  return (
    <>
      <Header />
      {profile && (
        <div className="user">
          <div className="kotak">
            <div className="kotak2"></div>
            {profile.user.posts.length === 0 ? (
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <h4 className="text-4xl">Not Have Post</h4>
              </div>
            ) : (
              <img
                className="img"
                src={`${baseURL}${profile.user.posts[0].photos[0].images}`}
              />
            )}
          </div>
          <div className="box-avatar">
            <img
              className="avatar"
              src={
                profile.user.profile.avatar === "default"
                  ? userIcon
                  : `${baseURL}${profile.user.profile.avatar}`
              }
            />
            <div className="greets">
              <h3>{profile.user.fullName}</h3>
              <h2>{profile.user.profile.greeting}</h2>
            </div>
          </div>

          <div className="btn-hire">
            <Link to="/edit-profile">
              <Button className="edit">Edit Profile</Button>
            </Link>
          </div>
          <h1>My Work Art</h1>
          <div className="box-arts">
            <div className="arts" style={{ display: "flex" , marginLeft: 15}}>
              {profile.user.arts.length > 0 &&
                profile.user.arts.map((art) => (
                  <img src={`${"http://localhost:5000/"}${art.images}`} style={{marginLeft: 15, marginBottom: 30}} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Profile;
