import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ExperienceGraph() {
    const userExperience = [
        {'user': 'Dan', 'experience': 'Learner'},
        {'user': 'Tim', 'experience': 'Learner'},
        {'user': 'Nick', 'experience': 'Learner'},
        {'user': 'Mike', 'experience': 'Entry'},
        {'user': 'Sara', 'experience': 'Junior'},
        {'user': 'Jean', 'experience': 'Junior'},
        {'user': 'Sam', 'experience': 'Senior'},
        {'user': 'Donald', 'experience': 'Senior'},
        {'user': 'Eli', 'experience': 'Senior'},
        {'user': 'Isa', 'experience': 'Senior'},
        {'user': 'JP', 'experience': 'Expert'},
        {'user': 'Sabo', 'experience': 'Expert'},
        {'user': 'Matt', 'experience': 'Senior'},
        {'user': 'Daniel', 'experience': 'Senior'},
    ];

    // Color mapping for each experience level
    const colorMapping = {
        'Learner': '#0954B0',
        'Entry': '#FFD22F',
        'Junior': '#FF7070',
        'Senior': '#FFF9F4',
        'Expert': '#52C059'
    };


    // Counting the number of users in each experience category
    const experienceCounts = userExperience.reduce((acc, cur) => {
        acc[cur.experience] = (acc[cur.experience] || 0) + 1;
        return acc;
    }, {});

    // Creating a dataset for each experience category
    const datasets = Object.keys(experienceCounts).map((experience, index) => {
        const color = colorMapping[experience] || '#FFFFFF';
        return {
            label: experience,
            data: [experienceCounts[experience]], // Each dataset has only one data point
            backgroundColor: color,
            borderColor: color.replace('0.6', '1'),
            borderWidth: 1,
            barThickness: 45
        };
    });

    // Chart data
    const data = {
        labels: ['User Experience Distribution'], // Single bar label
        datasets: datasets
    };

    // Chart options
    const options = {
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            }
        },
        indexAxis: 'y',
        elements: {
            bar: {borderWidth: 2}
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        }
    };

    return (
        <div style={{ width: '600px', height: '400px', alignSelf: 'center', justifySelf: 'center' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default ExperienceGraph;
