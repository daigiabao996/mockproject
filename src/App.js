import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CovidDetail from "./Pages/CovidDetail/CovidDetail";
import Home from "./Pages/Home/Home";
import News from "./Pages/News/News";
import NewsDetail from "./Pages/NewsDetail/NewsDetail";
import SignIn from "./Pages/Login/SignIn";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import "./App.css";
import AuthRoute from "./Router/AuthRoute";
import PrivateRoute from "./Router/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const globalState = useSelector((state) => state.GlobalReducer);
  const { t } = useTranslation();
  const theme = createTheme({
    palette: {
      type: globalState.theme,
    },
  });
  useEffect(() => {
    i18next.changeLanguage(globalState.language);
  }, [globalState.language]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute
                exact
                path="/countries/:country"
                component={CovidDetail}
              />
              <Route exact path="/news" component={News} />
              <Route exact path="/news/:newsid" component={NewsDetail} />
              <AuthRoute exact path="/login" component={SignIn} />
              <Route path="/register" component={Register} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
