import "./Home.css";
import Header from "../../elements/Header/Header";
import ListPosts from "../../Pages/Home/ListPosts";

function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="container waves-box wrapper-list-product">
        <ListPosts />
      </div>
    </div>
  );
}

export default Home;
