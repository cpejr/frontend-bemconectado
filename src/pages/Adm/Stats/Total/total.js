import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
// const data = [{ id: 1, data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }] }]
const id = "5eab69710b0013001761b119";

function getRequiredDateFormat(timeStamp, format = "DD/MM/YYYY") {
  return moment(timeStamp).format(format);
}
export default function Total() {
  const [dataSet, setDataSet] = useState([{ id: 1, data: [] }]);
  useEffect(() => {
    api
      .get(`/views/${id}`)
      .then((response) => {
        const newdata = [];
        const details = response.data;
        details.forEach((element) => {
          const count = element.selectedOng.count;
          const week = getRequiredDateFormat(element.date);
          newdata.push({ x: week, y: count });
        });
        const newdataSet = [];
        newdataSet[0] = { ...dataSet[0], data: newdata };
        setDataSet(newdataSet);
      });
  }, []);
  return (
    <div className="h-100">
      Grafico 2
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
          legend: "Semana",
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
