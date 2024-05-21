import React, { useState, useEffect, useCallback } from 'react';
import "./Discipline.scss";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PDFButton from '../PDFButton';
import SearchButton from '../SearchButton';
import Icons from '../../functions/icons_holder';

ChartJS.register(ArcElement, Tooltip, Legend);

const DisciplineChart = ({ isOnDashboard, userData }) => {
    
    const [selectedYear, setSelectedYear] = useState('');
    const [filteredData, setFilteredData] = useState(null); 

    const aggregateData = useCallback((userData) => {
        const disciplineCounts = userData.reduce((acc, item) => {
            acc[item.discipline] = (acc[item.discipline] || 0) + 1;
            return acc;
        }, {});
        return {
            labels: Object.keys(disciplineCounts),
            datasets: [{
                label: 'Number of Members by Discipline',
                data: Object.values(disciplineCounts),
                backgroundColor: [
                    '#0954B0', '#FFD22F', '#FF7070', '#F5EAE0', '#9966FF', '#FF9F40'
                ],
                hoverBackgroundColor: [
                    '#0954B0', '#FFD22F', '#FF7070', '#F5EAE0', '#9966FF', '#FF9F40'
                ]
            }]
        };
    }, []);

    const filterDataByYear = useCallback((year) => {
        const filtered = userData.filter(item => item.createdAt.toString() === year);
        setFilteredData(aggregateData(filtered));
    }, [userData, aggregateData]);

    useEffect(() => {
        if (userData) {
            if (selectedYear) {
                filterDataByYear(selectedYear);
            } else {
                setFilteredData(aggregateData(userData)); 
            }
        }
    }, [selectedYear, userData, filterDataByYear, aggregateData]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const exportPDF = () => {
        const input = document.getElementById('chart-container');
        html2canvas(input, {
            scale: 2, 
            useCORS: true 
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: "landscape",
            });
    
            // const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
    
           
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
            const imageWidth = imgWidth * ratio;
            const imageHeight = imgHeight * ratio;
            const marginLeft = (pdfWidth - imageWidth) / 2;
            const marginTop = (pdfHeight - imageHeight) / 2;
    
            pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imageWidth, imageHeight);
            pdf.save("chart.pdf");
        });
    };

    if (!filteredData) {
        return <div>Loading...</div>; 
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
        <div className="bg-lightBlue" style={{ padding: '20px', width: '100%'}}>
            <div className="grid grid-cols-1 gap-4 bg-lightBlue">
            <img className={`${isOnDashboard ? "hidden" : ""}`} src={Icons().IconArrowBack} alt="Back Arrow" onClick={() => window.history.back()} />
                <div className="font-['Corben'] text-3xl not-italic font-bold text-black"> {/* commented out my-6 */}
                    Discipline
                    {/* <h3>5 <br />Disciplines</h3> */}
                </div>

                <div className={`grid grid-cols-6 gap-4 my-6 ${isOnDashboard ? "hidden" : ""}`}>
                    <div className='chart__leftYear'>
                        <select value={selectedYear} onChange={handleYearChange}>
                            <option value="">All Years</option>
                            {[2020, 2021, 2022, 2023, 2024].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        < SearchButton onClick={() => filterDataByYear(selectedYear)}/>
                        {/* <button onClick={() => filterDataByYear(selectedYear)}>Search</button> */}
                    </div>
                    <div className="col-end-7 max-w-max">
                        <button  onClick={exportPDF}>
                            <PDFButton />
                        </button>
                    </div>
                </div>

                <div className='chart__container'>
                    <Doughnut data={filteredData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default DisciplineChart;