import React from "react";
import { FetchData } from "./FetchData";
import { Link } from "react-router-dom";

export const Candidates = () => {
  const { loading, candidates } = FetchData();

  if (loading) {
    <div>
      <h1>Loading...</h1>
    </div>;
  }
  return (
    <article>
      <div className="card-container">
        {candidates?.map((candidate, index) => {
          const { name, category, id, sex, imgUrl, votes } = candidate;

          return (
            <div className="items" key={id} index={index}>
              <img src={imgUrl} alt="name" />
              <h5> name: {name}</h5>
              <p>
                sex : <span>{sex}</span>
              </p>
              <p> category : {category}</p>
              <p>
                votes : <span>{votes}</span>
              </p>

              <Link to={`/payment/${id}`} className="vote-btn">
                Vote
              </Link>
            </div>
          );
        })}
      </div>
    </article>
  );
};
