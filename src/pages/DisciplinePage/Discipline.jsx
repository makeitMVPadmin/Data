import "./DisciplinePage.scss";
import React, { useState, useEffect, useCallback } from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import mockData from "../../data/mockData.json"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const Discipline = () => {

    const [selectedYear, setSelectedYear] = useState('');
    const [filteredData, setFilteredData] = useState([]); 

    const aggregateData = useCallback((data) => {

      if (!Array.isArray(data)) {
        console.error('Invalid data: expected an array', data);
        return null;  
      }

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
      const filtered = mockData.filter(item => item.createdAt && item.createdAt.toString() === year.toString());


      if (Array.isArray(filtered) && filtered.length > 0) {
          setFilteredData(aggregateData(filtered));
      } else {
          console.log('No data matches the selected year:', year);
          setFilteredData([]);  
      }
    }, [aggregateData]);


    useEffect(() => {
        if (Array.isArray(mockData)) {  
            if (selectedYear) {
                filterDataByYear(selectedYear);
            } else {
                setFilteredData(aggregateData(mockData)); 
            }
        }
    }, [selectedYear, mockData, filterDataByYear, aggregateData]);

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

  return (
    <div className="discipline">
        <div className="discipline__overview">

            <h3 className="discipline__header">Discipline </h3>

            <div className='discipline__yearFilter'>
                <div className='discipline__leftYear'>
                    <select value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select Year</option>
                        {[2020, 2021, 2022, 2023, 2024].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <button onClick={() => filterDataByYear(selectedYear)}>Search</button>
                </div>

                <button className="" onClick={exportPDF}>Export to PDF</button>
            </div>

            <DisciplineChart data={filteredData}/>


        </div>
    </div>
  );
};

export default Discipline;