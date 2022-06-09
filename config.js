function chartData() {
    let centroid = []
    for(let i=0; i<k; i++) {
        centroid.push({x:Number((Math.random() * 9).toFixed(2)), y:Number((Math.random() * 11).toFixed(2))})
    }

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'hotpink', 'black', 'orange', 'brown', 'grey']

    return {
        datasets: [
            {
                label: 'KMeans',
                data: centroid.concat(dataSet().map((dataPoint)=> {
                    return {x: dataPoint.x, y: dataPoint.y}
                })),
                pointStyle: centroid.map(centroid => 'triangle').concat(dataSet().map(dataPoint => 'circle')),
                pointRadius: centroid.map(centroid => 10).concat(dataSet().map(dataPoint => 5.5)),
                pointBackgroundColor: colors.slice(0,k),
                showLine: false,
                backgroundColor: 'aqua'
            }
        ] 
    }
}

function chartOptions() {
    return {
        maintainAspectRatio: false,
        legend: {
            labels: {
                fontSize: 20
            }
        },
        responsive: true,
        scales: {
            xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'X',
                        fontSize: 20
                    },
                    ticks: {
                        fontSize: 20,
                        max: 10,
                        min: 0
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Y',
                        fontSize: 20
                    },
                    ticks: {
                        fontSize: 20,
                        max: 12,
                        min: 0
                    }
                }
            ]
        }
    }
}