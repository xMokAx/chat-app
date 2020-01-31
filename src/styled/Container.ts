import styled from "styled-components/macro";

interface Props {
  p?: string;
}

export default styled.div<Props>`
  width: 100%;
  padding-right: 16px;
  padding-left: 16px;
  p: ${props => props.p && props.p};
  margin-right: auto;
  margin-left: auto;
  flex: 1;
`;
