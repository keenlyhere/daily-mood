import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loadMonthlyMoods } from "../../store/dayentries";
import cow_ecstatic from "../../assets/cow_ecstatic.png";
import cow_happy from "../../assets/cow_happy.png";
import cow_content from "../../assets/cow_content.png";
import cow_meh from "../../assets/cow_meh.png";
import cow_sad from "../../assets/cow_sad.png";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import "./Chart.css";

const moodImages = {
    1: cow_sad,
    2: cow_meh,
    3: cow_content,
    4: cow_happy,
    5: cow_ecstatic
}

const imagePlugin = {
  id: 'customImageTicks',
  afterDraw: function (chart, easing) {
    const ctx = chart.ctx;
    const yAxis = chart.scales['y-axis-0'];
    const tickGap = yAxis.getPixelForTick(1) - yAxis.getPixelForTick(0);

    chart.data.datasets.forEach((dataset, i) => {
      const data = dataset.data;
      data.forEach((value, index) => {
        const moodImage = new Image();
        moodImage.src = moodImages[value];
        const yPos = yAxis.getPixelForValue(value) - tickGap / 2;

        // draw the mood image on the y-axis
        ctx.drawImage(moodImage, yAxis.left - 15, yPos, 20, 20);
      });
    });
  }
};

ChartJS.register(...registerables);
// ChartJS.plugins.register(imagePlugin);

export default function TestChart() {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const [ monthlyMoods, setMonthlyMoods ] = useState([]);
    const [ daysOfMonth, setDaysOfMonth ] = useState([]);
    const [ chartData, setChartData ] = useState({});
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [ isLoaded, setIsLoaded ] = useState(true);

    const numDaysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
    console.log("numDaysInMonth", numDaysInMonth);

    const daysInMonth = [];
    for (let i = 1; i <= numDaysInMonth; i++) {
        daysInMonth.push(i);
    }
    console.log("daysInMonth !!! ===>", daysInMonth)

    const moodValues = {
        "Sad": 1,
        "Meh": 2,
        "Content": 3,
        "Happy": 4,
        "Ecstatic": 5
    }

    useEffect(() => {
        dispatch(loadMonthlyMoods(currentDate.getFullYear(), 1))
        // dispatch(loadMonthlyMoods(currentDate.getFullYear(), currentDate.getMonth()))
            .then((res) => {
                const moodData = [];
                const days = [];
                res.monthlyMoods.forEach((day) => moodData.push(moodValues[day.entryData]));
                res.monthlyMoods.forEach((day) => {
                    const [ year, month, date ] = day.day.split("-");
                    days.push(date);
                })
                setMonthlyMoods(moodData);
                setDaysOfMonth(days);
            })
            .then(() => setIsLoaded(true));
    }, [dispatch])

    console.log("daysOfMonth", daysOfMonth)

    const data = {
        labels: daysOfMonth,
        datasets: [
            {
            label: `${currentDate.toLocaleDateString("default", { month: "long" })} Mood Flow`,
            data: monthlyMoods,
            fill: false,
            borderWidth: 5,
            borderColor: "rgb(90, 161, 62)",
            tension: 0.1
            }
        ]
    };

    const moodLabels = {
        1: "Sad",
        2: "Meh",
        3: "Content",
        4: "Happy",
        5: "Ecstatic"
    };

    // const yAxisCallback = (value, index, values) => {
    //     // return (
    //     //     <img src={`${moodLabels[value]}`} alt="Mood image" />
    //     // )
    //     return moodLabels[value];
    // };

    const yAxisCallback = (value, index, values) => {
        // return (
        //     <img src={`${moodLabels[value]}`} alt="Mood image" />
        // )
        return moodLabels[value];
    };

    const xAxisCallback = (value, index, values) => {
        console.log("value", value)
        return daysInMonth[value];
    };

    const options = {
        animations: {
            y: {
                easing: 'easeInOutElastic',
                from: (ctx) => {
                if (ctx.type === 'data') {
                    if (ctx.mode === 'default' && !ctx.dropped) {
                    ctx.dropped = true;
                    return 0;
                    }
                }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: (ctx) => `${currentDate.toLocaleDateString("default", { month: "long" })} Mood Flow`
            },
            tooltip: {
                mode: 'index'
            },
        },
        radius: 5,
        pointBackgroundColor: "#fff",
        scales: {
            y: {
                ticks: {
                    callback: yAxisCallback
                },
                title: {
                    display: true,
                    text: 'Mood'
                }
            },
            x: {
                ticks: {
                    callBack: daysInMonth
                },
                title: {
                    display: true,
                    text: 'Day'
                }
            }
        }
    }

    if (isLoaded) {
        // console.log("monthlyMoods ===>", monthlyMoods);

        return (
            <div className="Stats-container">
                {/* <Chart type="bar" data={chartData} redraw /> */}
                <Line
                    options={options}
                    data={data}
                />
            </div>
        )
    } else {
        return (
            <div className="Stats-container">
                Loading...
            </div>
        )
    }

}
