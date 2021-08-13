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
import { RegisterSchema } from "../../yup/yup";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.GlobalReducer);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      handleRegister(values);
    },
    validationSchema: RegisterSchema,
  });

  const handleChangeLanguage = (value) => {
    dispatch(GlobalActions.changeLanguage({ language: value }));
  };
  const handleRegister = (values) => {
    setLoading(true);
    setTimeout(() => {
      const newAccount = {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        password: values.password,
      };
      let account = JSON.parse(localStorage.getItem("account"));
      if (!account) {
        account = new Array([]);
        account[0] = newAccount;
        localStorage.setItem("account", JSON.stringify(account));
        enqueueSnackbar(t("register.mess_success"), {
          variant: "success",
        });
        history.push("/login");
        setLoading(false);
      } else if (values.username === "admin") {
        enqueueSnackbar(t("register.mess_notAdmin"), {
          variant: "error",
        });
        setLoading(false);
      } else if (
        account.filter((account) => account.username === values.username)
          .length !== 0
      ) {
        enqueueSnackbar(t("register.mess_exist"), {
          variant: "error",
        });
        setLoading(false);
      } else {
        account.push(newAccount);
        localStorage.setItem("account", JSON.stringify(account));
        enqueueSnackbar(t("register.mess_success"), {
          variant: "success",
        });
        history.push("/login");
        setLoading(false);
      }
    }, 3000);
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("common.signup")}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label={t("common.firstname")}
                  name="firstname"
                  autoComplete="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label={t("common.lastname")}
                  name="lastname"
                  autoComplete="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
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
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
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
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      variant="outlined"
                    />
                  }
                  label={t("common.signup_checkBox")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("common.register")}
            </Button>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Link to={"/login"}>{t("common.signup_haveAccount")}</Link>
              </Grid>
              <Grid item className={classes.changeLanguageButton}>
                <SelectionLanguage
                  onChangeLanguage={handleChangeLanguage}
                  currentLanguage={globalState.language}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      {!!loading && <Loading />}
    </>
  );
}
