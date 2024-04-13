import "./HomePage.scss";
import Example from "../../components/Example/Example";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>
      {<Example />}
    </div>
  );
};

export default Home;
