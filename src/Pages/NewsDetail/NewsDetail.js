import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../Components/MainLayout/MainLayout";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    margin: "0 auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
    width: "70px",
    height: "70px",
  },
}));
export default function NewsDetail() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [news, setNews] = useState([]);
  const [color, setColor] = useState(null);
  const newsData = useSelector((state) => state.NewsReducer.news);
  const selectedNewsID = useSelector((state) => state.NewsReducer.selectedNews);
  const handleChangeColor = () => {
    if (color === "red") {
      setColor(null);
    } else setColor("red");
  };
  const getNewsByTitle = () => {
    if (selectedNewsID) {
      const selectedNews = newsData.filter(
        (data) => moment(data.publishedAt).format("X") === selectedNewsID
      );
      setNews(selectedNews);
    }
  };
  useEffect(getNewsByTitle, [selectedNewsID, newsData]);
  return (
    <MainLayout>
      {news?.map((item) => (
        <Card className={classes.root} key={item.publishedAt}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {item.source.name}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={<Typography variant="h4">{item.title}</Typography>}
            subheader={
              <Typography variant="subtitle1" color="textSecondary">
                {moment(item.publishedAt).format("YYYY-MM-DD HH:mm:ss")} by
                Mr/Mrs. {item.author}
              </Typography>
            }
          />
          <CardMedia
            className={classes.media}
            image={item.urlToImage}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={handleChangeColor}
            >
              <FavoriteIcon style={{ color: color }} />
            </IconButton>
            <IconButton
              aria-label="share"
              onClick={() => {
                window.open(
                  "http://www.facebook.com/sharer.php?u=https://www.covid-19news.com"
                );
                return false;
              }}
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{item.content}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </MainLayout>
  );
}
