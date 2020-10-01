import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import { Select } from "@material-ui/core";
import { getSundays } from "../utils";
import { Typography } from "@material-ui/core";
import { useStyles } from "../chartstyle";
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

export default function Month() {
  const [dataSet, setDataSet] = useState([{ id: 1, data: [] }]);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());

  function processRequestData(response) {
    const newdata = [];
    const details = response.data;
    const sundays = getSundays(currentMonth - 1);
    sundays.forEach((sunday) => {
      let exist = false;
      for (let i = 0; i < details.length; i++) {
        const detailsDate = new Date(details[i].date);
        if (detailsDate.toLocaleDateString() === sunday.toLocaleDateString()) {
          const count = details[i].selectedOng.count;
          const week = getRequiredDateFormat(details[i].date);
          newdata.push({ x: week, y: count });
          exist = true;
          break;
        }
      }
      if (exist == false) {
        const week = getRequiredDateFormat(sunday);
        newdata.push({ x: week, y: 0 });
      }
    });
    const newdataSet = [];
    newdataSet[0] = { ...dataSet[0], data: newdata };
    setDataSet(newdataSet);
  }

  function handlerMonthChange(event) {
    let newvalue = event.target.value;
    setCurrentMonth(newvalue);
    // api.get(`/views/${id}${getQueryParams(newvalue)}`).then(processRequestData);
  }

  useEffect(() => {
    api
      .get(`/views/${id}${getQueryParams(currentMonth)}`)
      .then(processRequestData);
  }, [currentMonth]);

  useEffect(() => {
    api.get(`/views/${id}${getQueryParams()}`).then(processRequestData);
  }, []);
  //   const useStyles = makeStyles({
  //       chartcontainer:{height:"600px"}
  //   })

  const classes = useStyles();
  return (
    <div className={classes.chartcontainer}>
      <div className="d-flex flex-row p-3">
        <Typography className="mt-3 ml-3 mr-3">Grafico mensal</Typography>
        <Select
          className="mt-2"
          value={currentMonth}
          onChange={handlerMonthChange}
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </Select>
      </div>
      <ResponsiveLine
        data={dataSet}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
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
        legends={[]}
      />
    </div>
  );
}
