import React from "react";
import { Grid } from "@material-ui/core";
import HighlightItem from "./HighlightItem/HighlightItem";
import { v4 as uuidv4 } from "uuid";

export default function Highlight({ summary }) {
  return (
    <Grid container spacing={3}>
      {summary.map((data) => (
        <Grid key={uuidv4()} item sm={4} xs={12}>
          <HighlightItem
            title={data.title}
            count={data.count}
            type={data.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
