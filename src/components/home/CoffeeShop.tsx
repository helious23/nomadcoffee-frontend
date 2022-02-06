import styled from "styled-components";
import { seeCoffeeShops_seeCoffeeShops } from "../../__generated__/seeCoffeeShops";
import defaultImage from "../../asset/default_cafe_img.jpeg";
import DaumMap from "../DaumMap";

interface ICoffeeShopPhotoProps {
  url: string | null | undefined;
}

const Container = styled.div`
  display: flex;
  margin: 3rem 0;
`;

const CoffeeShopPhoto = styled.div<ICoffeeShopPhotoProps>`
  background-image: url(${(props) => (props.url ? props.url : defaultImage)});
  background-position: center;
  background-size: cover;
  width: 40vw;
  height: 50vh;
  border-radius: 1rem;
`;

const CoffeeShop: React.FC<seeCoffeeShops_seeCoffeeShops> = ({
  id,
  name,
  photos,
  categories,
  commentNumber,
  description,
  slug,
  likes,
  averageRating,
  latitude,
  longitude,
}) => {
  return (
    <Container>
      <CoffeeShopPhoto url={photos && photos[1]?.url} />
      <div>{name}</div>
      <DaumMap id={id} latitude={latitude} longitude={longitude} title={name} />
    </Container>
  );
};

export default CoffeeShop;
