import { useEffect, useState } from "react";

interface IAddressProps {
  latitude: string;
  longitude: string;
}

const LatLngToAddress: React.FC<IAddressProps> = ({ latitude, longitude }) => {
  const [address, setAddress] = useState();
  //@ts-ignore
  const kakao = window.kakao;

  useEffect(() => {
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      const coord = new kakao.maps.LatLng(+latitude, +longitude);
      const callback = function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
        }
      };
      //@ts-ignore
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    });
  }, [kakao, latitude, longitude]);

  return <div>{address}</div>;
};

export default LatLngToAddress;
