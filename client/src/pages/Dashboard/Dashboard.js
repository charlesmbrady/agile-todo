import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
// import Moment from "react-moment";
import { Line } from "react-chartjs-2";

export default function Dashboard({ setAuthenticated }) {
  const [events, setEvents] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [data, setData] = useState({
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Burn",
        data: [0, 2, 2, 3, 3, 5]
      }
      // ,
      // {
      //   label: "Guideline",
      //   data: [0, 1, 2, 3, 4, 5]
      // }
    ]
  });

  useEffect(() => {
    AUTH.checkToken().then(res => {
      if (res.status === 200) {
        API.getAllSprints(res.data.id).then(sprintsResponse => {
          setSprints(sprintsResponse.data);
        });
      } else {
        setAuthenticated(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  const getBurnup = id => {
    API.getEventsBySprintId(id).then(response => {
      console.log(response.data);
      response.data.forEach(event => {
        console.log(event.createdDate);
        console.log(event.totalPoints);
        console.log(event.completedPoints);
      });
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
      <div>
        {sprints
          .filter(sprint => sprint.status !== "active")
          .map(sprint => (
            <div onClick={() => getBurnup(sprint._id)}>
              Name: {sprint.name} ID: {sprint._id}
            </div>
          ))}
      </div>
    </div>
  );
}
