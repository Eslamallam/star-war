import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Row, Col, Divider, Tabs, Spin } from "antd";
import { StarOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import { FilmList } from "./FilmList";
import { FavouriteCharacters } from "./FavouriteCharacters";
import {
  Counter,
  CustomRow,
  CharContainer,
  Container,
  Heading,
  Center,
} from "./styledComponents";

const { TabPane } = Tabs;

const getStarWarsQuery = gql`
  query GetStarData {
    allPeople {
      people {
        id
        name
        filmConnection {
          films {
            id
            title
            director
          }
        }
      }
    }
  }
`;

type Star = {
  id: string;
  name: string;
  isFavourite: boolean;
  films: { id: string; title: string; director: string }[];
};

export const StarWarCharacters: React.FC = () => {
  const { data, loading, error } = useQuery(getStarWarsQuery);
  const [filmtitle, setFilmTitle] = useState<string>("");
  const [starWarData, setStarWarData] = useState<Array<Star>>([]);
  const [starWarDataFiltered, setStarWarDataFiltered] = useState<Array<any>>(
    []
  );
  const [favCharacters, setFavCharacters] = useState<Array<any>>([]);

  useEffect(() => {
    if (data) {
      setStarWarData(restructureStarData());
      filter(starWarData, filmtitle);
    }
  }, [data]);

  useEffect(() => {
    if (filmtitle) {
      filter(starWarData, filmtitle);
    }
  }, [filmtitle]);

  if (loading) {
    return (
      <Center>
        <Spin size="large" />
      </Center>
    );
  }

  if (error) {
    return <div>Error...</div>;
  }

  const handleFilmChange = (value: string) => {
    if (value) {
      setFilmTitle(value);
    } else {
      filter(starWarData, "");
    }
  };

  const filter = (arr: Array<Star>, title: string) => {
    if (title) {
      const starData = arr.filter((star) => {
        return star.films.some((film) => film.title === title);
      });

      setStarWarDataFiltered(starData);
    } else {
      setStarWarDataFiltered(restructureStarData());
    }
  };

  const addToFavourite = (id: string) => {
    starWarDataFiltered.map((star) =>
      star.id === id ? (star.isFavourite = true) : star.isFavourite
    );
    const characterFound = favCharacters.find((fav) => fav.id === id);
    if (characterFound) {
      toast.warning(`${characterFound?.name} Already added to Favourites`);
    } else {
      const favCharacter = starWarDataFiltered.find((star) => star.id === id);

      setFavCharacters([
        ...favCharacters,
        { id: favCharacter?.id, name: favCharacter?.name },
      ]);
      toast.success(`"${favCharacter?.name}" added to Favourites`);
    }
  };

  //re-structure data to make it easier to use and more readable
  const restructureStarData = () => {
    return data?.allPeople?.people?.map((star: any) => {
      let result = {
        id: star.id,
        name: star.name,
        films: star?.filmConnection?.films,
        isFavourite: false,
      };

      return result;
    });
  };

  return (
    <Container>
      <Heading>Star Wars Characters</Heading>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Characters" key="1">
          <CustomRow>
            <Col xs={24} md={24} lg={24}>
              <p>Filter by Film</p>
              <FilmList handleFilmChange={handleFilmChange} />
            </Col>
          </CustomRow>
          <Row>
            <Col xs={24} md={24} lg={24}>
              <Counter title="Count" value={starWarDataFiltered?.length} />
              {starWarDataFiltered?.map((star: Star) => {
                return (
                  <div key={star.id}>
                    <CharContainer>
                      <span onClick={() => addToFavourite(star?.id)}>
                        {star.isFavourite ? <HeartFilled /> : <HeartOutlined />}
                      </span>
                      <h3>{star?.name}</h3>
                    </CharContainer>
                    <Divider />
                  </div>
                );
              })}
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <StarOutlined />
              Favourites
            </span>
          }
          key="2"
        >
          <FavouriteCharacters favList={favCharacters} />
        </TabPane>
      </Tabs>
      <ToastContainer />
    </Container>
  );
};
