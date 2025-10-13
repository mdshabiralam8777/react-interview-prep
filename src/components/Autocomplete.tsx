import React, { ChangeEvent, useState } from "react";

interface movie {
  id: number;
  title: string;
  year: number;
  genre: string;
}
const MOVIES_LIST: movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    genre: "Action",
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    genre: "Crime",
  },
  {
    id: 9,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: "Fantasy",
  },
  {
    id: 10,
    title: "Fight Club",
    year: 1999,
    genre: "Drama",
  },
  {
    id: 11,
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
    genre: "Sci-Fi",
  },
  {
    id: 12,
    title: "The Silence of the Lambs",
    year: 1991,
    genre: "Thriller",
  },
  {
    id: 13,
    title: "Parasite",
    year: 2019,
    genre: "Thriller",
  },
  {
    id: 14,
    title: "The Godfather Part II",
    year: 1974,
    genre: "Crime",
  },
  {
    id: 15,
    title: "Spirited Away",
    year: 2001,
    genre: "Animation",
  },
  {
    id: 16,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
  },
  {
    id: 17,
    title: "The Green Mile",
    year: 1999,
    genre: "Drama",
  },
  {
    id: 18,
    title: "La La Land",
    year: 2016,
    genre: "Musical",
  },
  {
    id: 19,
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action",
  },
  {
    id: 20,
    title: "The Lion King",
    year: 1994,
    genre: "Animation",
  },
];
const Autocomplete: React.FC = () => {
  const [movies, setMovies] = useState<movie[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const filtertedMovies = MOVIES_LIST.filter((movie: movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setMovies(filtertedMovies);
    } else setMovies([]);
  };

  return (
    <div className="container justify-content-center">
      <input
        type="text"
        placeholder="Search Movies..."
        className="p-2 mb-3 rounded border"
        onChange={handleChange}
      />
      {movies?.map((movie: movie) => (
        <li className="mx-4" key={movie.id}>
          {movie.title}
        </li>
      ))}
    </div>
  );
};

export default Autocomplete;
