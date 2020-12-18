import "./Home.css";
import Header from "../../elements/Header/Header";
import ListPosts from "../../Pages/Home/ListPosts";

function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div
        style={{ marginTop: "200px", marginBottom: "51px", marginLeft: 100 }}
      >
        <div className="d-flex justify-content-center">
          <ListPosts />
        </div>
      </div>
    </div>
  );
}

export default Home;
