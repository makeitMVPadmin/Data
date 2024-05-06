export const aggregateDataForChart = (data) => {
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
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ],
            hoverBackgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ]
        }]
    };
};
