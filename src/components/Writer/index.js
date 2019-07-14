import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";

import Text from "./Text";
import { NotFound } from "../Errors";

export default ({
  image,
  id,
  name,
  description,
  born,
  deceased,
  texts,
  match: { url }
}) => (
  <Fragment>
    <h1>{name}</h1>
    <h3>
      {born} &mdash; {deceased}
    </h3>
    <p>{description}</p>
    <img src={image} alt={`${id}`} style={{ maxWidth: 300 }} />

    <ul>
      {texts.map(({ id, title }) => (
        <li>
          <Link to={`${url}/texts/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
    <Route
      path={`${url}/texts/:theTextId`}
      render={props => {
        const text = texts.find(
          ({ id }) => id === props.match.params.theTextId
        );

        if (!text) return <NotFound />;

        return <Text {...text} />;
      }}
    />
  </Fragment>
);
