import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon, { UnicodeIcons } from "../styled/Icon";
import { FieldProps, Field, FieldRenderProps } from "react-final-form";
import ErrorWithDelay from "./ErrorWithDelay";
import Error from "../styled/Error";

export type MyFieldProps<T> = FieldProps<
  T,
  FieldRenderProps<T, HTMLElement>,
  HTMLInputElement
>;

type Props = MyFieldProps<string> & {
  placeholder: string;
  icon?: keyof UnicodeIcons;
  label?: string;
};

const InputField = ({ placeholder, icon, label, ...fieldProps }: Props) => (
  <Field {...fieldProps}>
    {({ input }) => {
      return (
        <div
          css={`
            width: 100%;
            max-width: 100%;
          `}
        >
          {label && (
            <label
              css={`
                text-align: left;
              `}
              htmlFor={input.name}
            >
              {label}
            </label>
          )}
          <InputGroup hasIconLeft={!!icon}>
            <Input
              {...input}
              type="text"
              placeholder={placeholder}
              aria-label={placeholder}
            />
            {icon && <Icon isLeft icon={icon} />}
          </InputGroup>
          <ErrorWithDelay name={input.name} delay={1000}>
            {(error: string) => <Error as="small">{error}</Error>}
          </ErrorWithDelay>
        </div>
      );
    }}
  </Field>
);

export default InputField;
