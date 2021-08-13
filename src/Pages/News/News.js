import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import newsAPI from "../../API/news/newsAPI";
import Loading from "../../Components/Loading/Loading";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { NewsActions } from "../../Redux/rootActions";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6),
    width: "50%",
    margin: "0 auto",
  },
  card: {
    transitionDuration: "0.3s",
    height: "525px",
    overflow: "hidden",
  },
  input: {
    width: "100%",
  },
  time: {
    textAlign: "right",
    display: "block",
  },
  cardAction: {
    "& button": {
      padding: "10px 20px",
      justifyContent: "flex-end",
    },
  },
  btnLoadMore: {
    display: "block",
    width: "100%",
    margin: " 16px ",
  },
}));

export default function News() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [visible, setVisible] = useState(3);
  const showMoreItems = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setVisible((prevValue) => prevValue + 3);
      setLoadingButton(false);
    }, 3000);
  };
  const handleChange = _.debounce((e) => {
    setData(e.target.value);
  }, 500);
  const handleGetAllNews = () => {
    setLoading(true);
    newsAPI
      .getAllNews()
      .then((response) => {
        const value = response.filter((index) =>
          index.title.toLowerCase().includes(data)
        );
        setSearch(value);
        dispatch(NewsActions.getNews(response));
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  };
  const handleGetNewsByTitle = useCallback((id) => {
    dispatch(NewsActions.getSelectedNews(id));
    history.push(`/news/${id}`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(handleGetAllNews, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainLayout>
      <div className={classes.root}>
        <TextField
          id="outlined-search"
          label={t("news.search")}
          type="search"
          variant="outlined"
          onChange={handleChange}
          className={classes.input}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Grid container spacing={4}>
            {search.slice(0, visible).map((item) => (
              <Grid item xs={12} sm={6} md={4} key={uuidv4()}>
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
                      title={item.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="span"
                        className={classes.time}
                      >
                        {moment(item.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h5">
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
                  <CardActions className={classes.cardAction}>
                    <Box flex="1 0 auto" />
                    <Button
                      startIcon={<VisibilityIcon />}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        handleGetNewsByTitle(
                          moment(item.publishedAt).format("X")
                        );
                      }}
                    >
                      {t("news.detail")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Button
              variant="contained"
              color="secondary"
              onClick={showMoreItems}
              className={classes.btnLoadMore}
            >
              {loadingButton && <CircularProgress size={15} />}
              {!loadingButton && t("news.loadmore")}
            </Button>
          </Grid>
        </div>
      )}
    </MainLayout>
  );
}
