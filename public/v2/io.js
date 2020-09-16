

params = {finalTime:100}
theChart = document.getElementById('theChart');

document.querySelectorAll('.model-param').forEach( param => {
    param.addEventListener('change',ev=>{
        params[ev.target.name]=ev.target.valueAsNumber;
        updateRun();
    });
});

cupTempCanvas = document.querySelector('.canvas[name="cupTemperature"]');
// tempChangeCanvas = document.querySelector('.canvas[name="temperatureChange"]');

// console.log(cupTempChart,tempChangeChart);

const updateRun = ()=>{
    const data = myTeaCup.run(params);
    // const data = res.data
    console.dir(data);
    // console.dir(res.series('cupTemperature'));

    Plotly.newPlot( theChart, 
        [{
            x: data.time,
            y: data.cupTemperature
        }],
        {
            autosize: false,
            width: 800,
            height: 500,
            xaxis: {
                title: {
                  text: 'mins'
                }
            },
            yaxis: {
                title: {
                  text: 'Temperature [`C]'
                }
            },
            title: {
                  text: 'Temperature over Time'
            }
        }
    );


    // const cupTempChart = new Chart(cupTempCanvas,{
    //     type:'line',
    //     data: {
    //         label: res.time,
    //         datasets: [{
    //             label: 'Current',
    //             borderColor: "#1E90FF",
    //             data: res.cupTemperature,
    //             fill: false,
    //         }]
    //     }    
    // });
}

updateRun();

