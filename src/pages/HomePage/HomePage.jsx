import "./HomePage.scss";
import React, { useState } from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import mockData from "../../data/mockData.json"
import { aggregateDataForChart } from "../../utils/dataAggregator";
// import Modal from "../../modal/Modal";


const Home = () => {
  // const [isModalOpen, setModalOpen] = useState(false);
  const chartData = aggregateDataForChart(mockData);

  // const handleCardClick = () => {
  //   setModalOpen(true);  // Open the modal when the card is clicked
  // };

  // const closeModal = () => {
  //   setModalOpen(false);  // Close the modal
  // };

  return (
    <div className="home">
      <div className="home__upper">
        <div className="home__overview">
          <div className="home__date">
            <h2 className="home__date-font">Aprel 28, 2014</h2>
          </div>
          <div className="home__total-members">
            <h2 className="home__members-font">Total Members</h2>
            <h1 className="home__number">13823</h1>
          </div>
        </div>

        <div className="cards home__members">Members</div>
        <div className="cards home__discipline" >
          <div className="home__discipline-heading">
            <h3>Discipline </h3>
            <h3>5 <br />Disciplines</h3>
          </div>
          <DisciplineChart data={chartData}/>
        </div>
      </div>

      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DisciplineChart data={chartData}/>
      </Modal> */}

      <div className="home__lower">
        <div className="cards home-location">Location</div>
        <div className="cards home-industry">Industry</div>
        <div className="cards home-experience">Experience</div>
      </div>

    </div>
  );
};

export default Home;
