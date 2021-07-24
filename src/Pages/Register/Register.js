import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import SelectionLanguage from "../../Components/SelectionLanguage/SelectionLanguage";
import { RegisterSchema } from "../../yup/yup";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
    width: "100%",
    margin: theme.spacing(3, 0, 2),
    border: "0",
    padding: "0",
  },
  [theme.breakpoints.up("sm")]: {
    paper: {
      marginTop: theme.spacing(8),
    },
    changeLanguageButton: {
      "&>div>*": {
        color: "black",
      },
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      handleRegister(values);
    },
    validationSchema: RegisterSchema,
  });

  const handleChangeLanguage = (value) => {
    i18next.changeLanguage(value);
  };
  const handleRegister = (values) => {
    localStorage.setItem("user", JSON.stringify(values));
  };

  return (
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} marginTop="0">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label={t("common.firstname")}
                name="firstname"
                autoComplete="firstname"
                autoFocus
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6} marginTop="0">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label={t("common.lastname")}
                name="lastname"
                autoComplete="lastname"
                autoFocus
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
                autoFocus
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
          <Box className={classes.submit} component="button" type="submit">
            <Button>{t("common.register")}</Button>
          </Box>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link href="#" variant="body2">
                {t("common.signup_haveAccount")}
              </Link>
            </Grid>
            <Grid item className={classes.changeLanguageButton}>
              <SelectionLanguage onChangeLanguage={handleChangeLanguage} />
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
