import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { ResponsiveLine } from "@nivo/line";
import { getSundaysUntilToday } from "../utils";
import { Typography } from "@material-ui/core";
import moment from "moment";
import { useStyles } from "../chartstyle";
// const data = [{ id: 1, data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }] }]
const id = "5eab69710b0013001761b119";

function getRequiredDateFormat(timeStamp, format = "DD/MM/YYYY") {
  return moment(timeStamp).format(format);
}
export default function Total() {
  const [dataSet, setDataSet] = useState([{ id: 1, data: [] }]);
  useEffect(() => {
    api.get(`/views/${id}`).then((response) => {
      const newdata = [];
      const details = response.data;
      const firstDate = new Date(details[0].date);
      const sundays = getSundaysUntilToday(
        firstDate.getMonth(),
        firstDate.getFullYear()
      );
      console.log(sundays);
      let index = 0;
      let lastMonth = -1;
      let acumulator = 0;
      sundays.forEach((element) => {
        let month = element.getMonth();
        if (month !== lastMonth) {
          let monthText = element.toLocaleString("default", { month: "long" });
          newdata.push({ x: monthText, y: acumulator });
          lastMonth = month;
          acumulator = 0;
        }
        if (index < details.length) {
          const date = new Date(details[index].date);
          if (element.toLocaleDateString() == date.toLocaleDateString()) {
            const count = details[index].selectedOng.count;
            const week = getRequiredDateFormat(date);
            acumulator += count;
            index++;
          }
        }
      });
      console.log(newdata);
      const newdataSet = [];
      newdataSet[0] = { ...dataSet[0], data: newdata };
      setDataSet(newdataSet);
    });
  }, []);
  const classes = useStyles();
  return (
    <div className = {classes.chartcontainer}>
      <div className="d-flex flex-row p-3">
        <Typography className="mt-3 ml-3">Grafico anual</Typography>
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
