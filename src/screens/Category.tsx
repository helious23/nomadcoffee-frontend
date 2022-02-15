import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import CoffeeShop from "../components/home/CoffeeShop";
import Loading from "../components/Loading";
import PageTitle from "../components/PageTitle";
import { Title } from "../components/shared";
import { SHOP_DETAIL_FRAGMENT } from "../fragments";
import { seeCategories } from "../__generated__/seeCategories";
import {
  seeCategory,
  seeCategoryVariables,
} from "../__generated__/seeCategory";

import { SEE_CATEGORIES } from "./CreateOrEditCoffeeShop";

const SEE_CATEGORY_QUERY = gql`
  query seeCategory($categoryName: String!, $page: Int!) {
    seeCategory(categoryName: $categoryName, page: $page) {
      ...ShopDetailFragment
    }
  }
  ${SHOP_DETAIL_FRAGMENT}
`;

const Container = styled.div`
  margin-top: 5rem;
`;

const CategoryContainer = styled.div`
  margin-top: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const CategoryName = styled.div<{ screen: boolean }>`
  min-width: max-content;
  padding: 0.8rem 1rem;
  background-color: ${(props) =>
    props.screen ? props.theme.accent : "inherit"};
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 20px;
  color: ${(props) =>
    props.screen ? props.theme.bgColor : props.theme.accent};
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  :not(:last-child) {
    margin-right: 1rem;
  }
  :hover {
    background-color: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.bgColor};
  }
`;

const ShopContainer = styled.div``;

interface IParamsProps {
  categorySlug: string;
}
const Category = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const { categorySlug } = useParams<IParamsProps>();

  const { data, loading } = useQuery<seeCategories>(SEE_CATEGORIES);
  const { data: shopData, loading: shopLoading } = useQuery<
    seeCategory,
    seeCategoryVariables
  >(SEE_CATEGORY_QUERY, {
    variables: {
      categoryName: categorySlug,
      page,
    },
  });

  return (
    <Container>
      <PageTitle title={categorySlug} />
      <Title>카테고리</Title>
      <CategoryContainer>
        <Wrapper>
          {loading ? (
            <Loading screen={false} size={2} />
          ) : (
            data?.seeCategories?.map((category) => (
              <CategoryName
                screen={category?.slug === categorySlug}
                onClick={() => history.push(`/category/${category?.slug}`)}
                key={category?.slug}
              >
                # {category?.name}
              </CategoryName>
            ))
          )}
        </Wrapper>
      </CategoryContainer>
      <ShopContainer>
        {shopLoading ? (
          <Loading screen={true} size={8} />
        ) : (
          shopData?.seeCategory?.map(
            (shop) => shop && <CoffeeShop key={shop.slug} {...shop} />
          )
        )}
      </ShopContainer>
    </Container>
  );
};

export default Category;
