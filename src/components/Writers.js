import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
//import { Redirect } from "react-router-dom";

import Writer from "./Writer";
import { NotFound } from "./Errors";

export default ({ match: { url }, writers }) => {
  return (
    <Fragment>
      {writers.map(({ id, name }) => (
        <li key={id}>
          <Link to={`${url}/${id}`}>{name}</Link>
        </li>
      ))}
      <Route exact path={url} render={() => <h1>Please select a writer</h1>} />
      <Route
        path={`${url}/:theWriterId`}
        render={props => {
          const writer = writers.find(
            theWriter => theWriter.id === props.match.params.theWriterId
          );

          //   if (!writer) <Redirect to="/404" />;
          if (!writer) return <NotFound />;

          return <Writer {...props} {...writer} />;
        }}
      />
    </Fragment>
  );
};
