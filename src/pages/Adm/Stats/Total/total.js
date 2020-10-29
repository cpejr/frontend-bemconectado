import React, { useContext, useEffect, useState } from "react";
import api from "../../../../services/api";
import { ResponsiveLine } from "@nivo/line";
import { getSundaysUntilToday } from "../utils";
import { Typography } from "@material-ui/core";
import { useStyles } from "../chartstyle";
import { LoginContext } from "../../../../contexts/LoginContext";
// const data = [{ id: 1, data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }] }]
// const id = "5eab69710b0013001761b119";

export default function Total() {
  const [dataSet, setDataSet] = useState([{ id: 1, data: [] }]);
  const [textData, setTextData] = useState({ totalCount: 0, averageCount: 0 });
  const { user } = useContext(LoginContext);
  const id = user._id;

  useEffect(() => {
    api.get(`/views/${id}`).then((response) => {
      const newdata = [];
      if (response.data[0]) {
        const details = response.data;
        const firstDate = new Date(details[0].date);
        const sundays = getSundaysUntilToday(
          firstDate.getMonth(),
          firstDate.getFullYear()
        );

        let index = 0;
        let lastMonth = -1;
        let acumulator = 0;
        let total = 0;
        let monthCount = 0;
        sundays.forEach((element) => {
          let month = element.getMonth();
          if (month !== lastMonth) {
            let monthText = element.toLocaleString("default", {
              month: "long",
            });
            newdata.push({ x: monthText, y: acumulator });
            lastMonth = month;
            monthCount++;
            acumulator = 0;
          }
          if (index < details.length) {
            const date = new Date(details[index].date);
            if (element.toLocaleDateString() === date.toLocaleDateString()) {
              const count = details[index].selectedOng.count;
              // const week = getRequiredDateFormat(date);
              acumulator += count;
              total += count;
              index++;
            }
          }
        });

        const newdataSet = [];
        newdataSet[0] = { ...dataSet[0], data: newdata };
        setDataSet(newdataSet);
        const newTextData = {
          totalCount: total,
          averageCount: total / monthCount,
        };
        setTextData(newTextData);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();
  return (
    <div>
      <div className="d-flex flex-column p-3 mt-3">
        <Typography className="ml-3">
          Quantidade total de acessos no ano: {textData.totalCount}
        </Typography>

        <Typography className="ml-3">
          Média de acessos mensal: {textData.averageCount.toFixed(2)}
        </Typography>
      </div>
      <div className="d-flex flex-row p-3">
        <Typography className="mt-3 ml-3">Grafico anual</Typography>
      </div>
      <div className={classes.chartcontainer}>
        <ResponsiveLine
          data={dataSet}
          margin={{ top: 5, right: 50, bottom: 50, left: 60 }}
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
    </div>
  );
}
