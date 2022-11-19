import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Select, Spin } from "antd";
import { Center } from "./styledComponents";

const { Option } = Select;

const getFilmsQuery = gql`
  query GetAllFilms {
    allFilms {
      films {
        id
        title
      }
    }
  }
`;

type Film = {
  id: string;
  title: string;
};

type Props = {
  handleFilmChange: (value: string) => void;
};

export const FilmList = ({ handleFilmChange }: Props) => {
  const { data, loading, error } = useQuery(getFilmsQuery);

  if (loading) {
    return (
      <Center>
        <Spin size="small" />
      </Center>
    );
  }

  if (error) {
    return <Center>Error...</Center>;
  }

  return (
    <div>
      <Select onChange={handleFilmChange} style={{ width: 190 }} allowClear>
        {data?.allFilms?.films?.map((film: Film) => {
          return (
            <Option value={film.title} key={film.id}>
              {film.title}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
