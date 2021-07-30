import { Grid } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import HighlightItem from "./HighlightItem/HighlightItem";

export default function Highlight({ summary }) {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      {summary?.map((data) => (
        <Grid key={uuidv4()} item sm={4} xs={12}>
          <HighlightItem
            title={t(data.title)}
            count={data.count}
            type={data.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
