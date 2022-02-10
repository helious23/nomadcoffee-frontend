//@ts-nocheck
/*global kakao*/

import { useEffect } from "react";
import styled from "styled-components";

const Map = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.fontColor};
`;

interface IDaumMapProps {
  id: number;
  longitude: string;
  latitude: string;
  title: string;
}

const DaumMap: React.FC<IDaumMapProps> = ({
  id,
  latitude,
  longitude,
  title,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6ac687f0179a12faf4ca9a48014908e4&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById(id);
        let options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        let markerPosition = new kakao.maps.LatLng(latitude, longitude);

        new kakao.maps.Marker({
          position: markerPosition,
          map,
          title,
        });
      });
    };
  });
  return <Map id={id}></Map>;
};

export default DaumMap;
