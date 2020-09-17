import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import { Select } from "@material-ui/core";
// const data = [{ id: 1, data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }] }]
const id = "5eab69710b0013001761b119";
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const date = new Date();

function getRequiredDateFormat(timeStamp, format = "DD/MM/YYYY") {
  return moment(timeStamp).format(format);
}

function getQueryParams(month) {
  let currentmonth = month;
  if (!month) {
    currentmonth = date.getMonth();
  }
  let currentyear = date.getFullYear();
  if (month > date.getMonth()) {
    currentyear -= 1;
  }
  let queryParams = `?month=${currentmonth}&year=${currentyear}`;
  return queryParams;
}

function getMondays(month) {
  let currentmonth = month;
  if (!month) {
    currentmonth = date.getMonth();
  }
  let currentyear = date.getFullYear();
  if (month > date.getMonth()) {
    currentyear -= 1;
  }

  var d = new Date(currentyear, currentmonth, 17, 0, 0, 0, 0);
  month = d.getMonth()
  let mondays = [];

  d.setDate(1);

  // Get the first Monday in the month
  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other Mondays in the month
  while (d.getMonth() === month) {
    mondays.push(new Date(d.getTime()));
    d.setDate(d.getDate() + 7);
  }

  return mondays;
}

export default function Month() {
  const [dataSet, setDataSet] = useState([{ id: 1, data: [] }]);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());

  function processRequestData(response) {
    const newdata = [];
    const details = response.data;
    const mondays = getMondays(currentMonth-1);
    console.log(currentMonth)
    mondays.forEach((monday) => {
      let exist = false;
      console.log(details)
      for (let i = 0; i < details.length; i++) {
        const detailsDate = new Date(details[i].date)
        console.log(detailsDate.toLocaleDateString(), "---", monday.toLocaleDateString())
        if (detailsDate.getTime() === monday.getTime()) {
          console.log("DEUUUUUUUUUUUUUUUUUUUUUUUUUUU")
        }
      }
    })
    details.forEach((element) => {
      const count = element.selectedOng.count;
      const week = getRequiredDateFormat(element.date);
      newdata.push({ x: week, y: count });
    });
    const newdataSet = [];
    newdataSet[0] = { ...dataSet[0], data: newdata };
    setDataSet(newdataSet);
  }

  function handlerMonthChange(event) {
    let newvalue = event.target.value;
    setCurrentMonth(newvalue);
    console.log(newvalue);
    api.get(`/views/${id}${getQueryParams(newvalue)}`).then(processRequestData);
  }

  useEffect(() => {
    api.get(`/views/${id}${getQueryParams()}`).then(processRequestData);
  }, []);
  return (
    <div className="h-100">
      Grafico Mensal
      <Select value={currentMonth} onChange={handlerMonthChange}>
        {months.map((month, index) => (
          <option value={index}>{month}</option>
        ))}
      </Select>
      <ResponsiveLine
        data={dataSet}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Mês",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Visualizações",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "nivo" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        enableArea={true}
        areaBlendMode="darken"
        areaOpacity={0.3}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
