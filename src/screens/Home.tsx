import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import Loading from "../components/Loading";
import styled from "styled-components";
import CoffeeShop from "../components/home/CoffeeShop";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../__generated__/seeCoffeeShops";

const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
      slug
      latitude
      longitude
      description
      photos {
        url
      }
      categories {
        name
        slug
      }
      likes
      commentNumber
      averageRating
    }
  }
`;

const LoaderContainer = styled.div`
  margin-top: 5rem;
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<seeCoffeeShops, seeCoffeeShopsVariables>(
    SEE_COFFEE_SHOPS_QUERY,
    {
      variables: {
        page,
      },
    }
  );
  return loading ? (
    <LoaderContainer>
      <Loading size={6} />
    </LoaderContainer>
  ) : (
    <div>
      <PageTitle title="홈" />
      {data?.seeCoffeeShops?.map((shop) =>
        shop ? <CoffeeShop key={shop.id} {...shop} /> : null
      )}
    </div>
  );
};

export default Home;
