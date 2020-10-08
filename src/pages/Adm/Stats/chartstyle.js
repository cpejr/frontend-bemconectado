import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  chartcontainer: {
    height: "600px",
    [theme.breakpoints.only("xs")]: {
      height: "400px",
    },
  },
}));
