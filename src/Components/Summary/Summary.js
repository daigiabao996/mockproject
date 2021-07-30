import Grid from "@material-ui/core/Grid";
import React from "react";
import LineChart from "../Chart/LineChart/LineChart";

export default function Summary({ country }) {
  return (
    <div style={{ height: "500px", marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LineChart
            type={["Confirmed", "Recovered", "Deaths"]}
            country={country}
          />
        </Grid>
      </Grid>
    </div>
  );
}
