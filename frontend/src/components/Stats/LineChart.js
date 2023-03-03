// import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { loadMonthlyMoods } from "../../store/dayentries";

// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);

// export default function LineChart() {
//     const dispatch = useDispatch();
//     const canvasRef = useRef(null);
//     const [ monthlyMoods, setMonthlyMoods ] = useState([]);
//     const [ chartData, setChartData ] = useState({});
//     const today = new Date();
//     const [currentDate, setCurrentDate] = useState(today);
//     const [ isLoaded, setIsLoaded ] = useState(false);

//     useEffect(() => {
//         dispatch(loadMonthlyMoods(currentDate.getFullYear(), currentDate.getMonth()))
//             .then((res) => {
//                 setMonthlyMoods(res.monthlyMoods)
//             .catch((err) => console.log("*** error caught ===>", err))

//                 // const labels = res.monthlyMoods.map((mood) => mood.day);
//                 // console.log("labels ===>", labels);

//                 // setChartData({
//                 //     labels: labels,
//                 //     dataSets: [{
//                 //         label: "Mood",
//                 //         data: moodData,
//                 //         fill: false,
//                 //         borderColor: 'rgb(75, 192, 192)',
//                 //         tension: 0.1
//                 //     }]
//                 // })
//             })
//             .then(() => setIsLoaded(true));
//     }, [dispatch])

//     useEffect(() => {
//         const chartData = {
//             labels: monthlyMoods.map((mood) => mood.day),
//             datasets: [
//                 {
//                     label: "Mood",
//                     data: monthlyMoods.map((mood) => mood.entryData),
//                     backgroundColor: "rgba(255, 99, 132, 0.2)",
//                     borderColor: "rgba(255, 99, 132, 1)",
//                     borderWidth: 1,
//                 }
//             ]
//         }

//         const chartOptions = {
//             scales: {
//                 yAxes: [
//                     {
//                         ticks: {
//                             beginAtZero: true
//                         }
//                     }
//                 ]
//             }
//         }

//         const context = document.getElementById("monthlyMoodChart").getContext("2d");

//         new Chart(context, {
//             type: "line",
//             data: {
//                 datasets: [
//                 {
//                     label: "Mood",
//                     data: chartData,
//                     borderColor: "blue",
//                     fill: false,
//                 },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                 xAxes: [
//                     {
//                     type: "time",
//                     time: {
//                         unit: "day",
//                     },
//                     },
//                 ],
//                 yAxes: [
//                     {
//                     ticks: {
//                         min: 0,
//                         max: 10,
//                     },
//                     },
//                 ],
//                 },
//             },
//             });
//     }, [chartData])

//     console.log("chartData", chartData)

//     if (isLoaded) {
//         return (
//             <div className="Stats-container">
//                 {/* <Chart type="bar" data={chartData} redraw /> */}
//                 {/* <Line
//                     datasetIdKey='id'
//                     data={{
//                         labels: ['Jun', 'Jul', 'Aug'],
//                         datasets: [
//                         {
//                             id: 1,
//                             label: '',
//                             data: [5, 6, 7],
//                         },
//                         {
//                             id: 2,
//                             label: '',
//                             data: [3, 2, 1],
//                         },
//                         ],
//                     }}
//                     /> */}
//             </div>
//         )
//     } else {
//         return (
//             <div className="Stats-container">
//                 Loading...
//             </div>
//         )
//     }

// }

// import React, { useState, useEffect } from "react";
// import { Chart } from "chart.js";
// import { useDispatch } from "react-redux";
// import { loadMonthlyMoods } from "../../store/dayentries";

// function LineChart() {
//   const [chartData, setChartData] = useState([]);
//     const dispatch = useDispatch();
//     const today = new Date();
//     const [currentDate, setCurrentDate] = useState(today);
//   // Fetch the mood data from the Express backend API endpoint
//   useEffect(() => {
//     dispatch(loadMonthlyMoods(currentDate.getFullYear(), currentDate.getMonth()))
//       .then((res) => {
//         const moodData = [];
//         res.monthlyMoods.forEach((mood) => moodData.push(mood.dayEntry));
//         setChartData(moodData)

//       } )
//   }, []);

//   // Use Chart.js to create a line chart from the mood data
//   useEffect(() => {
//     const ctx = document.getElementById("moodChart").getContext("2d");

//     new Chart(ctx, {
//       type: "line",
//       data: {
//         datasets: [
//           {
//             label: "Mood",
//             data: chartData,
//             borderColor: "blue",
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           xAxes: [
//             {
//               type: "time",
//               time: {
//                 unit: "day",
//               },
//             },
//           ],
//           yAxes: [
//             {
//               ticks: {
//                 min: 0,
//                 max: 10,
//               },
//             },
//           ],
//         },
//       },
//     });
//   }, [chartData]);

//   return (
//     <div>
//       <canvas id="moodChart"></canvas>
//     </div>
//   );
// }

// export default LineChart;
