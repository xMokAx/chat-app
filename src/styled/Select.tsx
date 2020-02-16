import React, { ChangeEvent } from "react";
import styled from "styled-components/macro";
import { lighten, darken, rgba } from "polished";

const Container = styled.div`
  height: 2.5em;
  display: inline-block;
  max-width: 100%;
  position: relative;
  vertical-align: top;
  &::after {
    right: 1.125em;
    z-index: 4;
    border: 3px solid ${props => props.theme.colors.primary};
    border-radius: 2px;
    border-right: 0;
    border-top: 0;
    content: " ";
    display: block;
    height: 0.625em;
    margin-top: -0.4375em;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: rotate(-45deg);
    transform-origin: center;
    width: 0.625em;
  }
`;

const SelectElement = styled.select`
  -webkit-appearance: none;
  cursor: pointer;
  display: block;
  font-size: 1em;
  max-width: 100%;
  outline: none;
  height: 2.5rem;
  padding: 0.375rem 0.75rem;
  padding-right: 2.5em;
  line-height: 1.5;
  color: ${props => props.theme.colors.textMain};
  background-color: ${props => props.theme.colors.bgSec};
  background-clip: padding-box;
  border: 1px solid
    ${props =>
      props.theme.isDarkMode
        ? lighten(0.2, props.theme.colors.bgSec)
        : darken(0.2, props.theme.colors.bgSec)};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    border-color: ${props => props.theme.colors.textMain};
  }
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${props => rgba(props.theme.colors.primary, 0.25)};
  }
`;

export interface Option {
  text: string;
  value: string;
}

interface Props {
  options: Option[];
  defaultOption?: Option;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
}

const Select = ({ options, defaultOption, ...selectProps }: Props) => (
  <Container>
    <SelectElement {...selectProps}>
      {defaultOption && (
        <option defaultValue={defaultOption.value} value={defaultOption.value}>
          {defaultOption.text}
        </option>
      )}
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      ))}
    </SelectElement>
  </Container>
);

export default Select;
