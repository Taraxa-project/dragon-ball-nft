import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    media: {
      height: "450px",
    },
    content: {
      height: "180px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      justifyContent: "start",
    },
  };
});
