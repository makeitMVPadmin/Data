import React, { useState, useEffect } from 'react';
import ExperienceGraph from '../../components/Example/experienceCard';
import Modal from 'react-modal'; // Import if using react-modal
import './DashboardPage.scss';
import main from "../../functions/fetchUserData.js"
// import {main} from '../../functions/fetchUserData.js'
import { useParams } from 'react-router-dom';

Modal.setAppElement('#root'); // Properly hide app content for screen readers

function DashboardPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
    const [userData, setUserData] = useState(null)
    const { communityId } = useParams();

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        if(!communityId) return;

        const request = { communityId }
        main(request)
            .then(data => {
                setUserData(data)
                console.log('User data fetched:', data)
            })
            .catch(error => {
                console.error('Error fetching user data:', error)
            })
    }, [communityId])

    return (
        <div>
            <ul className="dataCards">
                {Array(3).fill().map((_, index) => (
                    <li key={index} className="experienceCard" onClick={openModal}>
                        <ExperienceGraph />
                    </li>
                ))}
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Experience Graph"
                className="modalContent"
                overlayClassName="modalOverlay"
            >
                <button onClick={closeModal}>Close</button>
                <ExperienceGraph  userData = {userData} />
            </Modal>
        </div>
    );
}

export default DashboardPage;
