import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  chartcontainer: {
    height: "400px",
    flexGrow: 1,
    [theme.breakpoints.only("xs")]: {
      height: "400px",
    },
  },
}));
