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
  Legend,
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
        {'user': 'JP', 'experience': 'Entry'},
        {'user': 'Sabo', 'experience': 'Entry'},
        {'user': 'Matt', 'experience': 'Senior'},
        {'user': 'Daniel', 'experience': 'Senior'},
    ];

    // Color mapping for each experience level
    const colorMapping = {
        'Learner': '#0954B0',
        'Entry': '#FFD22F',
        'Junior': '#FF7070',
        'Senior': '#52C059'
    };

    const experienceYearMapping = {
        'Learner': 'Less than 1 year',
        'Entry': '1-2 years',     
        'Junior': '2-3 years',
        'Senior': 'Over 3 years'
    };
      
    // Counting the number of users in each experience category
    const experienceCounts = userExperience.reduce((acc, cur) => {
        acc[cur.experience] = (acc[cur.experience] || 0) + 1;
        return acc;
    }, {});

    const datasets = Object.keys(experienceCounts).map((experience) => {
        const color = colorMapping[experience] || '#FFFFFF';
        const experienceLabel = `${experience}\n(${experienceYearMapping[experience] || 'Not specified'})`;  // Adding a line break
        return {
            label: experienceLabel,
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
                display: false,
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            },
            y: {
                display: false,
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
                position: 'bottom',
                fullWidth: false,
                labels: {
                    boxWidth: 10,
                    padding: 21,
                    font: {
                        size: 10
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            },
            title: {
                display: true,
                text: 'Experience - Avg',
                padding: {
                    top: 10,
                    bottom: 10
                },
                font: {
                    size: 16,
                    weight: 'bold'
                },
                color: '#333'
            }
        }
    };

    return (
        <Bar className='experienceGraph' data={data} options={options} />
    );
}

export default ExperienceGraph;
