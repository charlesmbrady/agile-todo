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
    API.getBurnupData(id).then(response => {
      let dataValues = [];
      setData({
        labels: response.data.labels,
        datasets: [
          {
            label: "Burnup",
            data: response.data.data
          }
        ]
      });
    });
  };

  return (
    <div>
      <div className="chart">
        <Line
          data={data}
          options={{
            responsive: true
          }}
        />
      </div>
      <div>
        {sprints
          .reverse()
          .filter(sprint => sprint.status !== "notStarted")
          .map(sprint => (
            <div onClick={() => getBurnup(sprint._id)}>
              Name: {sprint.name} ID: {sprint._id}
            </div>
          ))}
      </div>
    </div>
  );
}
