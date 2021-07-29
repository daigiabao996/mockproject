import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CovidDetail from "./Pages/CovidDetail/CovidDetail";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/Login/SignIn";
import News from "./Pages/News/News";
import NewsDetail from "./Pages/NewsDetail/NewsDetail";
import NotFound from "./Pages/NotFound/NotFound";
import OverView from "./Pages/OverView/OverView";
import Register from "./Pages/Register/Register";
import AuthRoute from "./Router/AuthRoute";
import PrivateRoute from "./Router/PrivateRoute";

function App() {
  const globalState = useSelector((state) => state.GlobalReducer);
  const theme = createTheme({
    palette: {
      type: globalState.theme,
    },
  });
  useEffect(() => {
    i18next.changeLanguage(globalState.language);
  }, [globalState.language]);

  return (
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
            <PrivateRoute exact path="/overview" component={OverView} />
            <Route exact path="/news" component={News} />
            <Route exact path="/news/:newsid" component={NewsDetail} />
            <AuthRoute exact path="/login" component={SignIn} />
            <Route exact path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
