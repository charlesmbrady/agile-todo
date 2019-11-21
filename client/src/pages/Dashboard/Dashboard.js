import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
import { Line } from "react-chartjs-2";

export default function Dashboard({ setAuthenticated }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Burn",
        data: [0, 2, 2, 3, 3, 5]
      },
      {
        label: "Guideline",
        data: [0, 1, 2, 3, 4, 5]
      }
    ]
  });
  // const options = {
  //   scaleShowGridLines: true,
  //   scaleGridLineColor: "rgba(0,0,0,.05)",
  //   scaleGridLineWidth: 1,
  //   scaleShowHorizontalLines: false,
  //   scaleShowVerticalLines: true,
  //   bezierCurve: true,
  //   bezierCurveTension: 0.4,
  //   pointDot: true,
  //   pointDotRadius: 4,
  //   pointDotStrokeWidth: 1,
  //   pointHitDetectionRadius: 20,
  //   datasetStroke: true,
  //   datasetStrokeWidth: 2
  // };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    AUTH.checkToken().then(res => {
      if (res.status === 200) {
        // setAuthenticated(true);
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          id: res.data.id
        });
      } else {
        setAuthenticated(false);
        setUser({});
      }
    });
  };

  const ping = () => {
    API.ping().then(res => {
      console.log(res);
    });
  };
  return (
    <div>
      <div className="chart">
        <Line
          // datasets={[10, 20, 30, 40, 50, 60]}
          // labels={["January", "February", "March", "April", "May", "June"]}
          data={data}
          options={{
            responsive: true
            // maintainAspectRatio: false,
            // scales: {
            //   yAxes: [{ ticks: { beginAtZero: true } }],
            //   xAxes: [{ ticks: { beginAtZero: true } }]
            // }
          }}
          // width="100px"
          // height="100px"
        />
      </div>
    </div>
  );
}
