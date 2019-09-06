import React from "react";
import styled from "styled-components/macro";
import { Link, LinkProps } from "@reach/router";

type Props<TState> = Omit<LinkProps<TState>, "ref" | "getProps"> & {
  exact?: boolean;
  aRef?: React.MutableRefObject<null>;
};

export default styled(
  ({ exact, to, aRef, ...props }: Props<{ [key: string]: any }>) => (
    <Link
      ref={aRef}
      to={to}
      {...props}
      // this will pass the active prop to the a element if the Link is active or partiallyActive (depending on exact)
      // which i target using css to style active or partiallyActive NavLink
      getProps={linkProps => ({
        active: exact
          ? linkProps.isCurrent
            ? "true"
            : "false"
          : linkProps.isPartiallyCurrent
          ? "true"
          : "false"
      })}
    />
  )
)`
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
    background-color: ${props => props.theme.colors.bgSec};
  }
  &[active="true"] {
    color: ${props => props.theme.colors.textMain};
    background-color: ${props => props.theme.colors.bgSec};
  }
`;
