const canvas = document.getElementById('myChart')
let myChart

export function createChart(columns, health) {
    const config = {
        type: 'bar',
        data: {
            datasets: [{
                label: 'fasting blood pressure vs the presence of heart disease',
                data: columns,
                backgroundColor: 'rgb(99, 99, 255)'
            }]
        },
        options: {
            scales: {
                x: {
                    title: { display: true, text: 'fasting blood pressure over 120 (0 is under and 1 is over 120)' }
                },
                y: {
                    title: { display: true, text: 'Presence of heart disease (0 is absent and 1 is present)' }
                },
              
                
            },
            layout: {
                padding: 30,
                
            }
        }
    }
    

    myChart = new Chart(canvas, config)
}

// update an existing chart
// https://www.chartjs.org/docs/latest/developers/updates.html
export function updateChart(label, data) {
    myChart.data.datasets.push({
        label,
        data,
        backgroundColor: 'rgb(255, 99, 55)'
    })
    myChart.update()
}