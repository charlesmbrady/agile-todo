import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
import { Line as LineChart } from "react-chartjs-2";

export default function Dashboard({ setAuthenticated }) {
  const [user, setUser] = useState({});
  const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2
  };

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
      <h1>Dashboard</h1>
      <button onClick={() => ping()}>Ping</button>
      <button>Get Cookie not functional</button>
      <LineChart
        data={[
          { x: 5, y: 1 },
          { x: 3, y: 1 },
          { x: 2, y: 3 }
        ]}
        options={options}
        width="600"
        height="250"
      />
    </div>
  );
}
