import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

export default styled(NavLink)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
  margin: 3px;
  :first-child {
    margin-left: 0;
  }
  border-radius: 0.25rem;
  color: ${props => props.theme.colors.grey};
  font-weight: 500;
  &:hover,
  &:focus {
    text-decoration: none;
    color: ${props => props.theme.colors.textMain};
  }
  &.active {
    color: ${props => props.theme.colors.textMain};
    background-color: ${props => props.theme.colors.bgSec};
  }
`;
