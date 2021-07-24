import React from 'react';
import Grid from '@material-ui/core/Grid';
import LineChart from '../Chart/LineChart/LineChart';

export default function Summary() {
  return (
    <div style={{ height: '500px', marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LineChart title='Tổng số ca nhiểm' type='Confirmed' />
        </Grid>
        <Grid item xs={12}>
          <LineChart title='Tổng số ca khỏi' type='Recovered' />
        </Grid>
        <Grid item xs={12}>
          <LineChart title='Tổng số ca chết' type='Deaths' />
        </Grid>
      </Grid>
    </div>
  );
}
