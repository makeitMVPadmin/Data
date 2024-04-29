import React, { useState, useEffect, useCallback } from 'react';
import "./Discipline.scss";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(ArcElement, Tooltip, Legend);

const DisciplineChart = ({ data }) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [filteredData, setFilteredData] = useState(null); 

    const aggregateData = useCallback((data) => {
        const disciplineCounts = data.reduce((acc, item) => {
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
        const filtered = data.filter(item => item.createdAt.toString() === year);
        setFilteredData(aggregateData(filtered));
    }, [data, aggregateData]);

    useEffect(() => {
        if (data) {
            if (selectedYear) {
                filterDataByYear(selectedYear);
            } else {
                setFilteredData(aggregateData(data)); 
            }
        }
    }, [selectedYear, data, filterDataByYear, aggregateData]);

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
        <div className='chart' id='chart-container'>
            <div className='chart__header'>
                <h3>Discipline </h3>
                <h3>5 <br />Disciplines</h3>
            </div>

            <div className='chart__yearFilter'>
                <div className='chart__leftYear'>
                    <select value={selectedYear} onChange={handleYearChange}>
                        <option value="">All Years</option>
                        {[2020, 2021, 2022, 2023, 2024].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <button onClick={() => filterDataByYear(selectedYear)}>Search</button>
                </div>

                <button  onClick={exportPDF}>Export to PDF</button>
            </div>

            <div className='chart__container'>
                <Doughnut data={filteredData} options={options} />
            </div>
            
        </div>
    );
};

export default DisciplineChart;