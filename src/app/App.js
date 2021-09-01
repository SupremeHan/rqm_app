import React, { useEffect } from "react";
import "./App.css";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from 'history'
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";

//COMPONENTS
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Teams from "./components/Teams";
import Project from "./components/Project";
import TableForm from "./components/table/TableForm";
import Navbar from './components/layout/Navbar'
import Rqm from "./components/Rqm";
import ClassDiagram from "./components/diagrams/ClassDiagram";
import UseCase from "./components/diagrams/UseCase";

//Redux
import { Provider } from 'react-redux';
import {store, persistor} from './store';
import setAuthToken from "./libs/setAuthToken";
import PrivateRoute from "./PrivateRoute";
import { PersistGate } from 'redux-persist/integration/react'
import Models from "./components/Models";






const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#184e77',
    },
    secondary: {
      main: '#40916c',
    },
    text: {
      primary: "#0E0E10"
    },
  },
});

if(localStorage.token) {
        setAuthToken(localStorage.token)
}

function App() {
  const history = createBrowserHistory()

  
    return(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Navbar/>
              <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/" component={Login}/>
                <PrivateRoute exact path="/rqm/:id" component={TableForm}/>
                <PrivateRoute exact path="/teams" component={Teams}/>
                <PrivateRoute exact path="/projects/:id" component={Project}/>
                <PrivateRoute exact path="/projects/models/:id" component={Models}/>
                <PrivateRoute exact path="/use-case/:id" component={UseCase}/>
                <PrivateRoute exact path="/class/:id" component={ClassDiagram}/>
              </Switch>
          </Router>
        </ThemeProvider>
        </PersistGate>
      </Provider>

    )
}

export default App;