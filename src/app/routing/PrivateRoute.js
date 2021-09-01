import { Component } from "react";
import { Redirect, Route } from "react-router";

function PrivateRoute ({ component: Component, auth, ...rest }) {
    return(
        <Route
            {...rest}
            render={(props) => auth === true
                ? <Component {...props}/>
                : <Redirect to={{ pathname: '/', state: {from: props.location }}}/>
            }
        />
    )
}

export default PrivateRoute