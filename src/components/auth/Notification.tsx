import styled from "styled-components";

const SNotification = styled.span`
  color: #2ecc71;
  font-weight: 500;
  font-size: 0.8rem;
  margin-top: 1rem;
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

interface INotificationProps {
  message?: string;
}

const Notification: React.FC<INotificationProps> = ({ message }) => {
  return message ? <SNotification>{message}</SNotification> : null;
};

export default Notification;
