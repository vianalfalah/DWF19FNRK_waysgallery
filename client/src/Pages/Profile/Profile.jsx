import { useState, useEffect } from "react";
import Header from "./../../elements/Header/Header";
import { getProfile, baseURL } from "../../configs/services";
import { useParams, Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState();
  useEffect(() => {
    (async () => {
      const profile = await getProfile(id);
      console.log(profile);
      if (profile) {
        return setProfile(profile.data.data.profile);
      }
    })();
  }, [id]);

  return (
    <>
      {profile && (
        <div>
          <div className="row">
            <div>
              <img src={`${baseURL}${profile.profile.avatar}`} />
              <h1>{profile.fullName}</h1>
              <h3>{profile.profile.greeting}</h3>
              <Link to="/edit/my-profile">
                <button className="btn">Edit Profile</button>
              </Link>
            </div>
            <div>
              {profile.post.length > 0 && profile.post[0].photo && (
                <img
                  className="img-post"
                  src={`${baseURL}${profile.post[0].photo[0].image}`}
                />
              )}
            </div>
          </div>
          <div className="mt-50">
            <h1>My Work Art</h1>
            <div className="grid-container">
              {profile.art.length > 0 &&
                profile.art.map((art) => (
                  <img src={`${baseURL}${art.image}`} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
