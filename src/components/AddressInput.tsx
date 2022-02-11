import { useEffect, useState } from "react";

interface IAddressInputProps {
  setAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressData: React.Dispatch<React.SetStateAction<any>>;
}

const AddressInput: React.FC<IAddressInputProps> = ({
  setAddressOpen,
  setAddressData,
}) => {
  const [daumPostFn, setDaumPostFn] = useState<() => void>();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = process.env.REACT_APP_DAUM_POSTCODE!;
    document.head.appendChild(script);

    script.onload = () => {
      function daumPostcode() {
        //@ts-ignore
        new window.daum.Postcode({
          oncomplete: function (data: any) {
            setAddressData(data.roadAddress);
          },
          onclose: setAddressOpen(false),
        }).open();
      }
      setDaumPostFn(daumPostcode);
    };
  }, [setAddressData, setAddressOpen]);

  return <></>;
};

export default AddressInput;
