const k = Number(prompt('Insira o Valor de K'))
const chart = new Chart(document.querySelector('#chart'), {
    type: 'scatter',
    data: chartData(),
    options: chartOptions()
})

let preventCallback = false

document.addEventListener('keydown', async()=>{
    if(!preventCallback) {
        preventCallback = true
        let centroidVal = ['1']
        let centroidNewVal = ['2']
    
        while(JSON.stringify(centroidVal)!= (JSON.stringify(centroidNewVal))) {
            centroidVal = []
            for(let i=0; i<k; i++) {
                centroidVal.push(chart.data.datasets[0].data[i])
            }
            await labelDataPoints()
            await recalculateCentroid()
    
            centroidNewVal = []
            for(let i=0; i<k; i++) {
                centroidNewVal.push(chart.data.datasets[0].data[i])
            }
        }
        alert('Reajustes Concluídos, Verificar Console!')
        consoleResults()
    }
})

function consoleResults() {
    const clusters = getClusters()
    for(let i=0; i<clusters.length; i++) {
        console.log(`Grupo ${String.fromCharCode(i+65)}: `)
        console.table(clusters[i])
    }
}

function recalculateCentroid() {
    return new Promise(async(resolve, reject) => {
        const clusters = getClusters()

    clusters.forEach((cluster, i) => {
        let sumX = 0
        let sumY = 0

        cluster.forEach((dataPoint, j) => {
            sumX = sumX + dataPoint.x
            sumY = sumY + dataPoint.y
        })
        if(cluster.length){
            chart.data.datasets[0].data[i] = {x:Number((sumX/cluster.length).toFixed(2)), y:Number((sumY/cluster.length).toFixed(2))}
        }
    })

        chart.update(1000)
        await new Promise(resolve => setTimeout(resolve, 3000))
        resolve()
    })
}

function getClusters() {
    let clusters = []
    for(let i=0;i<k;i++) {
        clusters.push([])
    }

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'hotpink', 'black', 'orange', 'brown', 'grey'].slice(0,k)
    for(i=k; i<chart.data.datasets[0].data.length;i++){
        for(let j = 0; j<colors.length; j++){
            if(chart.data.datasets[0].pointBackgroundColor[i]==colors[j]) {
                clusters[j].push(chart.data.datasets[0].data[i])
            }
        }
    }

    return clusters

}

function labelDataPoints() {
    return new Promise(async(resolve, reject) => {
        dataSet().forEach((dataPoint, i) => {
            let distances = []
            for(let j=0; j<k; j++) {
                const centroidX = chart.data.datasets[0].data[j].x
                const centroidY = chart.data.datasets[0].data[j].y
                distances.push(Math.sqrt(((centroidX-dataPoint.x)**2)+((centroidY-dataPoint.y)**2)))
            }
            const minValue = Math.min.apply(Math, distances)
            const index = distances.indexOf(minValue)
            chart.data.datasets[0].pointBackgroundColor[i+k] = chart.data.datasets[0].pointBackgroundColor[index]
        })
        chart.update(2000)
        await new Promise(resolve => setTimeout(resolve, 2000))
        resolve()
    })
}