import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import SelectionLanguage from "../../Components/SelectionLanguage/SelectionLanguage";
import { GlobalActions } from "../../Redux/rootActions";
import { SignInSchema } from "../../yup/yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.GlobalReducer);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const account = JSON.parse(localStorage.getItem("account"));

  const handleSignIn = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username === "admin" && values.password === "admin") {
        localStorage.setItem("user", JSON.stringify(values));
        enqueueSnackbar(t("login.mess_success"), {
          variant: "success",
        });
        history.push("/home");
        setLoading(false);
      } else if (
        account.filter(
          (account) =>
            account.username === values.username &&
            account.password === values.password
        ).length !== 0
      ) {
        localStorage.setItem("user", JSON.stringify(values));
        enqueueSnackbar(t("login.mess_success"), {
          variant: "success",
        });
        history.push("/home");
        setLoading(false);
      } else {
        setLoading(false);
        enqueueSnackbar(t("login.mess_fail"), {
          variant: "error",
        });
      }
    }, 3000);
  };
  const handleChangeLanguage = (value) => {
    dispatch(GlobalActions.changeLanguage({ language: value }));
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSignIn(values);
    },
    validationSchema: SignInSchema,
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("common.signin")}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={t("common.username")}
              name="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("common.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("common.login_remember")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("common.signin")}
            </Button>
            <Grid container>
              <Grid item xs>
                <SelectionLanguage
                  onChangeLanguage={handleChangeLanguage}
                  currentLanguage={globalState.language}
                />
              </Grid>
              <Grid item>
                <Link to={"/register"}>{t("common.login_haveAccount")}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      {!!loading && <Loading />}
    </>
  );
}
