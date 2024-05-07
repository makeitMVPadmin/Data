import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import userData from './example.json';
import searchIcon from "../../assets/icons/search-icon.svg";

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function ExperienceGraph({isOnDashboard}) {
  const [selectedYear, setSelectedYear] = useState('');
  const [submittedYear, setSubmittedYear] = useState('');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    setSubmittedYear(selectedYear); // Update the submitted year state
  };

  const handleReset = () => {
    setSelectedYear(''); // Reset the selected year
    setSubmittedYear(''); // Reset the submitted year
  };

  const filteredData = userData.filter(user => {
    if (!submittedYear) return true; // Show all data if no year has been submitted
    const year = new Date(user.joinedAt).getFullYear();
    return year.toString() === submittedYear;
  }).map(user => ({
    experience: user.experience,
    country: user.locationCountry
  }));

  function categorizeExperience(years) {
    if (years < 1) return 'Learner';
    if (years >= 1 && years <= 2) return 'Entry';
    if (years > 2 && years <= 3) return 'Junior';
    if (years > 3) return 'Senior';
  }

  const experienceCount = filteredData.map(user => user.experience).reduce((acc, exp) => {
    const category = categorizeExperience(exp);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const colorMapping = {
    'Learner': '#0954B0',
    'Entry': '#FFD22F',
    'Junior': '#FF7070',
    'Senior': '#52C059'
  };

  const datasets = Object.keys(experienceCount).map((experience) => {
    const color = colorMapping[experience] || '#FFFFFF';
    return {
        label: `${experience} (${experienceCount[experience]} users)`,
        data: [experienceCount[experience]],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        barThickness: 45
    };
  });

  const data = {
    labels: ['User Experience Distribution'],
    datasets: datasets
  };

  const options = {
    responsive: true, // Ensure the chart is responsive
    maintainAspectRatio: false, // Disable maintaining aspect ratio
    aspectRatio: 1, // Adjust aspect ratio for your needs
    scales: {
      x: {
        display: false,
        stacked: true,
      },
      y: {
        display: false,
        stacked: true
      }
    },
    indexAxis: 'y',
    plugins: {
      legend: { display: true, position: 'bottom' },
      title: {
        display: true,
        text: `Experience - (${submittedYear || 'All Years'})`,
        font: { size: 16, weight: 'bold' },
        color: '#333'
      },
      background: {
        color: 'rgba(135,206,250, 0.3)', // light blue background using rgba
        drawOnChartArea: true, // ensures the background is under the chart area
      }
    }
  };

  return (
    <div className="bg-lightBlue" style={{ padding: '20px', width: '100%' }}> 
    <div className="font-['Corben'] text-3xl not-italic font-bold text-black"> {/* commented out my-6 */}
      Experience
    </div>
    <div className={`${isOnDashboard ? "hidden" : ""}`}>
      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4 items-center">
        <select onChange={handleYearChange} value={selectedYear} className="col-span-3">
          <option value="">Select Year</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        <button
          className="flex items-center justify-center gap-3 border-2 rounded-[10px] border-black w-40 mx-2 bg-customYellow"
          type='submit'
        >
          <img src={searchIcon} alt="search" className="w-8 h-8" />
          <p className="text-xl font-['Gilroy'] font-bold not-italic">Search</p>
        </button>
        <button type="button" onClick={handleReset} className="col-span-1 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">
          Reset
        </button>
      </form>

    </div>
    <div style={{ height: '400px', width: '100%' }}> {/* This is where the chart goes */}
      <Bar className='experienceGraph' data={data} options={options} />
    </div>
  </div>
);
}

export default ExperienceGraph;
