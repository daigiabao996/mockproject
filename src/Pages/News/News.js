import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import newsAPI from "../../API/news/newsAPI";
import MainLayout from "../../Components/MainLayout/MainLayout";

const useStyles = makeStyles((theme) => ({
  card: {
    transitionDuration: "0.3s",
    height: "525px",
  },
  mainGrid: {
    marginTop: theme.spacing(4),
  },
  input: {
    width: "100%",
  },
}));

export default function News() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

  const handleChange = (e) => {
    setData(e.target.value);
  };
  const handleGetAllNews = () => {
    newsAPI.getAllNews("covid").then((response) => {
      const value = response.articles.filter((index) =>
        index.title.toLowerCase().includes(data)
      );
      setSearch(value);
    });
  };
  useEffect(handleGetAllNews, [data]);

  return (
    <MainLayout>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
          onChange={handleChange}
          value={data}
          className={classes.input}
        />
      </div>
      <div>
        <Grid container spacing={4} className={classes.mainGrid}>
          {search.map((item) => (
            <Grid item xs={12} md={6} key={uuidv4()}>
              <Card>
                <CardActionArea
                  component="a"
                  href={item.url}
                  target="blank"
                  className={classes.card}
                >
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="240"
                    image={item.urlToImage}
                    // onError={(e) => {
                    //   e.target.onerror = null;
                    //   e.target.src = "https://unsplash.com/photos/FtmjYbEcqTo";
                    // }}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="span" component="span">
                      {moment(item.publishedAt).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h4">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </MainLayout>
  );
}
