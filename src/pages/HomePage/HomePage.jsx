import "./HomePage.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title"> Welcome to COMMIT AI!</h1>
      <Link to="/prompt">Prompt the AI here</Link>
    </div>
  );
};

export default Home;
