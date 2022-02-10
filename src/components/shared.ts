import styled from "styled-components";

export const FatLink = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const AuthLabel = styled.label`
  width: 100%;
  position: relative;
`;

export const AuthPlaceholder = styled.span<{ change: Boolean }>`
  position: absolute;
  top: ${(props) => (props.change ? "0.8rem" : "1.2rem")};
  left: 0.6rem;
  transition: all 0.1s ease-in-out;
  font-size: ${(props) => (props.change ? "0.6rem" : "0.8rem")};
  color: ${(props) => props.theme.placeholderFontColor};
`;

export const ErrorOutput = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const DarkModeContainer = styled.div`
  position: absolute;
  right: 51vw;
  top: 1.5rem;
`;

export const LogOutPage = styled.div`
  color: ${(props) => props.theme.accent};
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
  svg {
    font-size: 1.2rem;
  }
`;

export const Icon = styled.span`
  margin-left: 3rem;
`;

export const HeaderText = styled.span`
  color: white;
  font-weight: 500;
  font-size: 1rem;
`;

export const Category = styled.div`
  width: max-content;
  padding: 0.4rem 0.5rem;
  color: ${(props) => props.theme.accent};
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 5px;
  margin: 0.2rem 0;
  margin-right: 0.5rem;
`;

export const OutlineBtn = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 2px solid ${(props) => props.theme.accent};
  color: ${(props) => props.theme.accent};
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
