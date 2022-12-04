import { Card } from "./Card";
import { FC, useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import * as Web3 from "@solana/web3.js";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export const MovieList: FC = () => {
  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    connection.getProgramAccounts(new Web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)).then(async (accounts) => {
      const movies: Movie[] = accounts.reduce((accoum: Movie[], { pubkey, account }) => {
        const movie = Movie.deserialize(account.data);
        if (!movie) {
          return accoum;
        }
        return [...accoum, movie];
      }, []);
      setMovies(movies);
    });
  }, []);

  return (
    <div>
      {movies.map((movie, i) => {
        return <Card key={i} movie={movie} />;
      })}
    </div>
  );
};
