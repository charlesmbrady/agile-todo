import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
// import Moment from "react-moment";
import { Line } from "react-chartjs-2";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default function Dashboard({ setAuthenticated }) {
  const [events, setEvents] = useState([]);
  const [sprint, setSprint] = useState();
  const [sprints, setSprints] = useState([]);
  const [data, setData] = useState();

  // TODO: Look up ReCharts instead of chart.js

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

  useEffect(() => {
    if (sprint !== undefined) {
      getBurnup(sprint);
    }
  }, [sprint]);

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
      <Form className="myform">
        <FormGroup>
          <Label for="sprint">Select Sprint to display burnup chart:</Label>
          <Input
            type="select"
            name="select"
            id="sprint"
            value={sprint}
            onChange={e => setSprint(e.target.value)}
          >
            <option value={""}>Select Sprint</option>
            {sprints
              .reverse()
              .filter(sprint => sprint.status !== "notStarted")
              .map((sprint, i) => (
                <option key={i} value={sprint._id}>
                  {sprint.name}
                </option>
              ))}
          </Input>
        </FormGroup>
      </Form>
      {data && (
        <div className="chart">
          <Line
            data={data}
            options={{
              responsive: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                      // suggestedMax: totalPoints
                    }
                  }
                ]
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
