import styled from "styled-components/macro";
import Text from "./Text";

export default styled(Text).attrs({
  role: "alert"
})`
  color: ${props => (props.color ? props.color : props.theme.colors.red)};
  font-size: ${props => (props.size ? props.size : "14px")};
`;
