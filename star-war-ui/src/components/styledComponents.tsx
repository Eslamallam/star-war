import { Row, Layout, Statistic } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const Counter = styled(Statistic)`
  text-align: end;
`;

export const CustomRow = styled(Row)`
  text-align: center;
`;

export const CharContainer = styled("div")`
  display: flex;
  align-items: baseline;

  span {
    margin-inline-end: 10px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Container = styled(Content)`
  margin: 50px;

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const Heading = styled("h2")`
  font-weight: bold;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 25px;
  text-align: center;

  @media (max-width: 768px) {
    font-weight: normal;
    font-size: 18px;
  }
`;

export const Center = styled("div")`
  display: flex;
  justify-content: center;
  margin: 25px;
`;

export const FavouriteContainer = styled("div")`
  display: flex;
  align-items: last baseline;
  border: 1px solid #f4f4f4;
  padding: 10px;
  border-radius: 5px;

  span.anticon {
    margin-inline-end: 10px;
  }
`;
