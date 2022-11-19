import { Empty } from "antd";
import { StarFilled } from "@ant-design/icons";

import { FavouriteContainer } from "./styledComponents";

type Props = {
  favList: Array<any>;
};

type Favourite = {
  name: string;
};

export const FavouriteCharacters = ({ favList }: Props) => {
  return (
    <div>
      {favList.length > 0 &&
        favList.map((fav: Favourite, index) => {
          return (
            <div key={index}>
              <FavouriteContainer>
                <StarFilled />
                <p>{fav.name}</p>
              </FavouriteContainer>
            </div>
          );
        })}
      {!favList.length && <Empty />}
    </div>
  );
};
