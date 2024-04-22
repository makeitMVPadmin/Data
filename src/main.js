import { Link } from "react-router-dom";
import UserList from "./components/UserList/UserList";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title"> Welcome to COMMIT AI!</h1>
      <Link to="/prompt">Prompt the AI here</Link>
      <UserList />
    </div>
  );
};

export default Home;
