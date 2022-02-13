import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  gql,
  useQuery,
  useMutation,
  MutationUpdaterFunction,
  DefaultContext,
  ApolloCache,
  Reference,
} from "@apollo/client";
import { seeCategories } from "../__generated__/seeCategories";
import Loading from "../components/Loading";
import { OutlineBtn } from "../components/shared";
import AddressInput from "../components/AddressInput";
import { SButton } from "../components/auth/Button";
import {
  createCoffeeShop,
  createCoffeeShopVariables,
} from "../__generated__/createCoffeeShop";
import { useHistory, useLocation } from "react-router-dom";
import routes from "../routes";
import {
  deleteCoffeeShopPhoto,
  deleteCoffeeShopPhotoVariables,
} from "../__generated__/deleteCoffeeShopPhoto";
import {
  editCoffeeShop,
  editCoffeeShopVariables,
} from "../__generated__/editCoffeeShop";
import { AnimatePresence, motion } from "framer-motion";
import { scrollVar } from "../apollo";
import ConfirmNotice from "../components/ConfirmNotice";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const DELETE_COFFEESHOP_PHOTO = gql`
  mutation deleteCoffeeShopPhoto($id: Int!) {
    deleteCoffeeShopPhoto(id: $id) {
      ok
      error
      id
    }
  }
`;

const SEE_CATEGORIES = gql`
  query seeCategories {
    seeCategories {
      id
      name
    }
  }
`;

const EDIT_COFFEE_SHOP = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $description: String
    $categories: [String]
    $photos: [Upload]
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      description: $description
      categories: $categories
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $address: String
    $description: String
    $categories: [String]!
    $photos: [Upload]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      address: $address
      description: $description
      categories: $categories
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  margin-top: 5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  font-size: 1.2rem;
  width: 15rem;
`;
const Text = styled.div`
  font-size: 1.2rem;
  width: 15rem;
`;

const Input = styled.input<{ hasError: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.boxBgColor};
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  transition: all 0.5s ease-in-out;
  font-size: 1rem;
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  div {
    display: flex;
    align-items: center;
  }
`;

const CheckInput = styled.input<{ hasError: boolean }>`
  padding: 1rem;
  background-color: ${(props) => props.theme.boxBgColor};
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  border-radius: 5px;
`;

const CheckboxLabel = styled.label`
  margin-left: 0.2rem;
  color: ${(props) => props.theme.fontColor};
  font-size: 1rem;
`;

const AddInput = styled(Input)`
  width: 85%;
`;

const AddressBtnContainer = styled.div`
  width: 15%;
  margin: 0 1rem;
`;

const AddressBtn = styled(OutlineBtn)``;

const SubmitBtn = styled(SButton)`
  width: 20vw;
  cursor: pointer;
  padding: 0.5rem;
`;

const InvisibleInput = styled.input``;

const PhotoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  height: 10rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  background-color: ${(props) => props.theme.boxBgColor};
  transition: background-color 0.5s ease-in-out;
`;

const PhotoFile = styled(motion.div)`
  width: 10rem;
  height: 10rem;
  background-size: cover;
  background-position: center center;
`;

interface IFormProps {
  name: string;
  latitude: string;
  longitude: string;
  description: string;
  address: string;
  categories: string[];
  photos: FileList;
}
interface ILatLng {
  latitude: string;
  longitude: string;
}

type ImageInfo = {
  localUrl: string | ArrayBuffer | null;
  id?: number;
};

interface ILocationState {
  edit: boolean;
  shopId: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  photos: {
    id: number;
    url: string;
  }[];
  description: string;
  categories: {
    name: string;
    slug: string;
  }[];
}

const CreateCafe = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [addressData, setAddressData] = useState("");

  const [latLng, setLatLng] = useState<ILatLng>();
  const [fileList, setFileList] = useState<FileList>();
  const [images, setImages] = useState<ImageInfo[]>([]);
  const history = useHistory();
  const { state } = useLocation<ILocationState>();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    scrollVar(true);
  };
  const handleClose = () => {
    setOpen(false);
    scrollVar(false);
  };

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const length = fileList.length > 5 ? 5 : fileList.length;
      for (let i = 0; i < length; i++) {
        const file = fileList[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          setImages((prev) => [...prev, { localUrl: reader.result }]);
        };
      }
    }
  }, [fileList]);

  useEffect(() => {
    if (state?.edit) {
      if (state.photos && state.photos.length > 0) {
        const length = state.photos.length > 5 ? 5 : state.photos.length;
        for (let i = 0; i < length; i++) {
          const file = state.photos[i];
          setImages((prev) => [...prev, { localUrl: file.url, id: file.id }]);
        }
      }
      if (state.latitude && state.longitude) {
        setLatLng({ latitude: state.latitude, longitude: state.longitude });
      }
      if (state.address) {
        setAddressData(state.address);
      }
    }
  }, [
    state?.edit,
    state?.latitude,
    state?.longitude,
    state?.photos,
    state?.address,
  ]);

  const { handleSubmit, register, formState, getValues, setValue } =
    useForm<IFormProps>({
      defaultValues: {
        name: state?.name || "",
        categories: state?.categories?.map((category) => category.name) || [],
        description: state?.description || "",
      },
    });

  useEffect(() => {
    if (addressData) {
      setValue("address", addressData);
    }
  }, [addressData, setValue]);

  const { data: categoryData, loading: categoryLoading } =
    useQuery<seeCategories>(SEE_CATEGORIES);

  const updateDeletePhoto: MutationUpdaterFunction<
    deleteCoffeeShopPhoto,
    deleteCoffeeShopPhotoVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          deleteCoffeeShopPhoto: { ok, id: photoId },
        },
      } = result;
      console.log(result);
      if (ok) {
        cache.evict({
          id: `CoffeeShopPhoto:${photoId}`,
        });
        cache.modify({
          id: `CoffeeShop:${state.shopId}`,
          fields: {
            photos(prev: Reference[]) {
              const remain = prev.filter(
                (photo) => photo.__ref !== `CoffeeShopPhoto:${photoId}`
              );
              console.log(remain);
              return [...remain];
            },
          },
        });
      }
    }
  };

  const onCompleted = () => {
    if (state?.edit) {
      alert("카페가 수정되었습니다");
      history.push(routes.home);
    } else {
      alert("카페가 등록되었습니다");
      history.push(routes.home);
    }
  };

  const [createCoffeeShopMutation, { loading }] = useMutation<
    createCoffeeShop,
    createCoffeeShopVariables
  >(CREATE_COFFEE_SHOP, {
    onCompleted,
  });

  const [editCoffeeShopMutation, { loading: editLoading }] = useMutation<
    editCoffeeShop,
    editCoffeeShopVariables
  >(EDIT_COFFEE_SHOP, {
    onCompleted,
  });

  const [deleteCoffeeshopPhotoMutation, { loading: deletePhotoLoading }] =
    useMutation<deleteCoffeeShopPhoto, deleteCoffeeShopPhotoVariables>(
      DELETE_COFFEESHOP_PHOTO,
      {
        update: updateDeletePhoto,
      }
    );

  const deletePhoto = (photoId: number, photoIndex: number) => {
    deleteCoffeeshopPhotoMutation({
      variables: {
        id: photoId,
      },
    });
  };

  const onValid: SubmitHandler<IFormProps> = () => {
    handleOpen();
  };

  const mutationTrigger = () => {
    handleClose();
    if (loading) return;
    const { name, categories, latitude, longitude, description } = getValues();

    if (state?.edit) {
      editCoffeeShopMutation({
        variables: {
          id: state?.shopId,
          name,
          description,
          address: addressData,
          latitude: latLng?.latitude,
          longitude: latLng?.longitude,
          categories,
          //@ts-ignore
          photos: fileList,
        },
      });
    } else {
      createCoffeeShopMutation({
        variables: {
          name,
          description,
          address: addressData,
          latitude,
          longitude,
          categories,
          //@ts-ignore
          photos: fileList,
        },
      });
    }
  };

  const onNotValid: SubmitErrorHandler<IFormProps> = (error) => {
    console.log("validation Error:", error);
  };

  const onAddressClick = () => {
    setAddressOpen(true);
    setAddressData("");
  };

  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const files = event.target.files;
    if (files) {
      setImages([]);
      setFileList(files);
    }
  };

  return (
    <Container>
      <PageTitle title="카페 등록" />
      {loading || editLoading ? (
        <Loading screen={true} size={6} />
      ) : (
        <Form onSubmit={handleSubmit(onValid, onNotValid)}>
          <FormContainer>
            <Label htmlFor="name">카페 이름</Label>
            <Input
              id="name"
              {...register("name", {
                required: true,
              })}
              hasError={Boolean(formState.errors.name)}
            />
          </FormContainer>
          <FormContainer>
            <Text>카테고리를 선택하세요</Text>
            <CheckboxContainer>
              {categoryLoading ? (
                <Loading screen={false} size={3} />
              ) : (
                <Grid>
                  {categoryData?.seeCategories?.map((category) => (
                    <div key={`Category:${category?.id}`}>
                      {category && (
                        <>
                          <CheckInput
                            type="checkbox"
                            id={category?.id + ""}
                            {...register("categories", {
                              required: true,
                            })}
                            hasError={Boolean(formState.errors.categories)}
                            value={category.name}
                          />
                          <CheckboxLabel htmlFor={category.id + ""}>
                            {category?.name}
                          </CheckboxLabel>
                        </>
                      )}
                    </div>
                  ))}
                </Grid>
              )}
            </CheckboxContainer>
          </FormContainer>
          <FormContainer>
            <Label htmlFor="address">주소</Label>
            {addressOpen ? (
              <AddressInput
                setAddressOpen={setAddressOpen}
                setAddressData={setAddressData}
              />
            ) : null}
            <AddInput
              type="text"
              id="address"
              {...register("address")}
              hasError={Boolean(formState.errors.address)}
            />

            <AddressBtnContainer>
              <AddressBtn onClick={onAddressClick}>주소 입력</AddressBtn>
            </AddressBtnContainer>
            {latLng && (
              <>
                <InvisibleInput
                  type="hidden"
                  {...register("latitude", {
                    required: true,
                  })}
                  value={latLng.latitude}
                />
                <InvisibleInput
                  type="hidden"
                  {...register("longitude", {
                    required: true,
                  })}
                  value={latLng.longitude}
                />
              </>
            )}
          </FormContainer>
          <FormContainer>
            <Label htmlFor="description">카페 소개</Label>
            <Input
              type="text"
              id="description"
              {...register("description", {
                required: true,
              })}
              hasError={Boolean(formState.errors.description)}
            />
          </FormContainer>
          <FormContainer>
            <Label htmlFor="photo">카페 사진</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              id="photo"
              maxLength={5}
              {...register("photos", {
                required: state?.edit ? false : true,
              })}
              hasError={Boolean(formState.errors.photos)}
              onChange={onFileUpload}
            />
          </FormContainer>
          <FormContainer>
            <PhotoContainer>
              <AnimatePresence>
                {images.length > 0 &&
                  images.map((image, index) => {
                    if (image.id) {
                      return (
                        <PhotoFile
                          key={`Photo:${index}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 1 },
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0,
                            transition: { duration: 1 },
                          }}
                          // onClick={() => deletePhoto(image.id!, index)}
                          style={{ backgroundImage: `url(${image.localUrl})` }}
                        />
                      );
                    } else {
                      return (
                        <PhotoFile
                          key={`Photo:${index}`}
                          style={{ backgroundImage: `url(${image.localUrl})` }}
                        />
                      );
                    }
                  })}
              </AnimatePresence>
            </PhotoContainer>
          </FormContainer>
          <div>{images.length}/5</div>

          {state?.edit ? (
            <SubmitBtn>카페 수정하기</SubmitBtn>
          ) : (
            <SubmitBtn>카페 등록하기</SubmitBtn>
          )}
        </Form>
      )}
      {open ? (
        <ConfirmNotice
          handleClose={handleClose}
          mutationTrigger={mutationTrigger}
          title={state?.edit ? "카페 수정" : "카페 등록"}
          text={
            state?.edit
              ? `카페를 수정 하시겠습니까?`
              : `카페를 등록 하시겠습니까?`
          }
          iconName={faEdit}
        />
      ) : null}
    </Container>
  );
};

export default CreateCafe;
