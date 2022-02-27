import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CoffeeShop from "../components/home/CoffeeShop";
import PageTitle from "../components/PageTitle";
import { Title } from "../components/shared";
import { SHOP_DETAIL_FRAGMENT } from "../fragments";
import {
  searchShops,
  searchShopsVariables,
} from "../__generated__/searchShops";

const SEARCH_SHOPS_QUERY = gql`
  query searchShops($keyword: String!, $lastId: Int) {
    searchShops(keyword: $keyword, lastId: $lastId) {
      ...ShopDetailFragment
    }
  }
  ${SHOP_DETAIL_FRAGMENT}
`;

const Container = styled.div`
  margin-top: 4rem;
`;

const Search: React.FC = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, loading } = useQuery<searchShops, searchShopsVariables>(
    SEARCH_SHOPS_QUERY,
    {
      variables: {
        keyword: keyword ? keyword : "",
      },
    }
  );
  console.log(data);

  return (
    <Container>
      <PageTitle title={keyword ? keyword : "검색 중..."} />
      <Title>"{keyword}" 검색 결과</Title>
      {data?.searchShops?.map((shop) =>
        shop ? <CoffeeShop key={shop.id} {...shop} /> : null
      )}
    </Container>
  );
};

export default Search;
