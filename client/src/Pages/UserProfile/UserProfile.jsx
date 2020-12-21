import { useState, useEffect } from "react";
import { getProfileById, baseURL } from "../../configs/services";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/Header/Header";
import "./UserProfile.css";
import { Button } from "react-bootstrap";
import userIcon from "../../assets/icon/userIcon.png";

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
          <div className="kotak">
            <div className="kotak2"></div>
            {profile.posts.length === 0 ? (
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
                src={`${baseURL}${profile.posts[0].photos[0].images}`}
              />
            )}
          </div>
          <div className="box-avatar">
            <img
              className="avatar"
              src={
                profile.profile.avatar === "default"
                  ? userIcon
                  : `${baseURL}${profile.profile.avatar}`
              }
            />
            <div className="greets">
              <h3>{profile.fullName}</h3>
              <h2>{profile.profile.greeting}</h2>
            </div>
          </div>
          <div className="btn-hire" style={{ display: localStorage.user.fullName === profile.fullName ? 'none' : '' }} >
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
          <div className="btn-hire" style={{ display: localStorage.user.fullName === profile.fullName ? '' : 'none' }}>
            <Link to="/edit-profile">
              <Button className="edit">Edit Profile</Button>
            </Link>
          </div>
          <h1>{profile.fullName}'s Work </h1>
          <div className="box-arts">        
          <div className="arts" style={{ display: "flex" , marginLeft: 15}}> 
              
                {profile.arts.length > 0 &&
                  profile.arts.map((art) => (
                    <img src={`${"http://localhost:5000/"}${art.images}`} style={{marginLeft: 15, marginBottom: 30}} />
                  ))}
              
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
