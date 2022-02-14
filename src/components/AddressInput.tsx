import { useEffect } from "react";

interface IAddressInputProps {
  setAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressData: React.Dispatch<React.SetStateAction<any>>;
}

const AddressInput: React.FC<IAddressInputProps> = ({
  setAddressOpen,
  setAddressData,
}) => {
  //@ts-ignore
  const daum = window.daum;

  const daumPostcode = () => {
    new daum.Postcode({
      oncomplete: function (data: any) {
        setAddressData(data.roadAddress);
      },
      onclose: setAddressOpen(false),
    }).open();
  };

  useEffect(() => {
    daumPostcode();
  }, [daumPostcode]);

  return <></>;
};

export default AddressInput;
