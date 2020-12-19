import "./Home.css";
import { useState } from "react";

import Header from "../../component/Header/Header";
import ListPosts from "../../Pages/Home/ListPosts";

function Home() {
  const [time, setTime] = useState("today");

  let [search, setSearch] = useState();

  const handleSearch = (e) => {
    let keyword = e.target.value;

    setSearch((search = keyword));
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container home">
        <div className="content">
          <div className="filter">
            <div className="date-filter">
              <span>Today</span>
            </div>
            <div className="search">
              <input
                onChange={(e) => handleSearch(e)}
                type="text"
                name="find"
                placeholder="Search"
                className="bg-gray-300 rounded px-4 py-1"
              />
            </div>
          </div>

          <h4>Today's posts</h4>
          <div className="cards">
            <ListPosts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
