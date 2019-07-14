import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Writers from "./Writers";
import Layout from "./Layout/DrawerClass";
import { NotFound } from "./Errors";

class App extends Component {
  state = {
    writers: []
  };

  async componentDidMount() {
    const writers = await (await fetch(
      "http://localhost:3006/writers?_embed=texts"
    )).json();
    console.log(writers);
    this.setState({ writers });
    // fetch("http://localhost:3006/writers")
    //   .then(res => res.json())
    //   .then(writers => this.setState({ writers }));
  }

  render() {
    const { writers } = this.state;
    return (
      <BrowserRouter>
        <Layout writers={writers}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <h1>Home</h1>
                </div>
              )}
            />
            <Route
              path="/writers"
              render={props => <Writers writers={writers} {...props} />}
            />
            <Route render={() => <NotFound />} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
