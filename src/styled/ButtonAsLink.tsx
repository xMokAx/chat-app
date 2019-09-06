/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, LinkProps } from "@reach/router";
import Button, { ButtonProps } from "../styled/Button";

// this solution seems like an overkill but it filters unwanted props to be passed to Link
// which will pass it to a element
// type Props<TState> = Omit<LinkProps<TState>, "ref"> & {
//   aRef?: React.MutableRefObject<null>;
// } & ButtonProps;

// export default Button.withComponent(
//   ({ bg, large, aRef, to, ...props }: Props<{ [key: string]: any }>) => (
//     <Link ref={aRef} to={to} {...props} />
//   )
// );

// this solution will pass all props to Link which will pass all of them to a element which is not ideal
// (React will not complain about lowercase non standard string attributes)
export default Button.withComponent(Link);
