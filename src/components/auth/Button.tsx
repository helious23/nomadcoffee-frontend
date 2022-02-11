import styled from "styled-components";
import Loading from "../Loading";

export const SButton = styled.button<{ valid?: Boolean }>`
  border: none;
  margin-top: 1rem;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.valid ? "0.3" : "1")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ActionText = styled.div`
  padding: 0.5rem 0;
`;

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <SButton disabled={loading ? true : false} valid={Boolean(canClick)}>
      {loading ? (
        <Loading size={2.2} screen={false} />
      ) : (
        <ActionText>{actionText}</ActionText>
      )}
    </SButton>
  );
};
