import { gql, useQuery } from "@apollo/client";
import PageTitle from "../components/PageTitle";
import Loading from "../components/Loading";
import styled from "styled-components";
import CoffeeShop from "../components/home/CoffeeShop";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../__generated__/seeCoffeeShops";
import { SHOP_DETAIL_FRAGMENT } from "../fragments";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Title } from "../components/shared";

export const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      ...ShopDetailFragment
    }
  }
  ${SHOP_DETAIL_FRAGMENT}
`;

const Container = styled.div``;

const Home = () => {
  const { data, loading, fetchMore } = useQuery<
    seeCoffeeShops,
    seeCoffeeShopsVariables
  >(SEE_COFFEE_SHOPS_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  // const isBottomIntersection = useIntersectionObserver(
  //   ref,
  //   { threshold: 1 },
  //   false
  // );

  // console.log(isBottomIntersection);

  const dataLength = data?.seeCoffeeShops?.length ?? 0;
  const moreFetch = (offset: number) => {
    console.log(offset);
    fetchMore({
      variables: {
        offset,
      },
    });
  };

  // useEffect(() => {
  //   if (isBottomIntersection && data) {
  //     if (dataLength > 0 && data.seeCoffeeShops) {
  //       moreFetch(data.seeCoffeeShops[dataLength - 1]?.id!);
  //     }
  //   }
  // }, [isBottomIntersection, data, fetchMore]);

  return loading ? (
    <Loading size={6} screen={false} />
  ) : (
    <Container>
      <PageTitle title="홈" />
      <Title>찐 개발자들의 추천 카페</Title>
      <InfiniteScroll
        dataLength={dataLength}
        next={() =>
          data?.seeCoffeeShops && moreFetch(data.seeCoffeeShops.length)
        }
        hasMore={true}
        loader={null}
      >
        {data?.seeCoffeeShops?.map((shop) =>
          shop ? <CoffeeShop key={shop.id} {...shop} /> : null
        )}
      </InfiniteScroll>
      {/* <div ref={ref} style={{ width: "100%", height: "20px" }} /> */}
    </Container>
  );
};

export default Home;
