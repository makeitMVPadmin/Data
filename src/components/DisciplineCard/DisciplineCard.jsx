import React from 'react';
import "./Discipline.scss";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const DisciplineChart = ({ data }) => {

    if (!data || !data.labels || !data.datasets) {
        console.error('DisciplineChart expects data with labels and datasets', data);
        return <div>No data available</div>;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                align: 'middle', 
                labels: {
                  boxWidth: 10,
                  padding: 20, 
                }
            }
        }
    };

    return (
        <div className='chart' id='chart-container'>

            <div className='chart__container'>
                <Doughnut data={data} options={options} />
            </div>
            
        </div>
    );
};

export default DisciplineChart;