import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon, { UnicodeIcons } from "../styled/Icon";
import { FieldProps, Field } from "react-final-form";
import ErrorWithDelay from "./ErrorWithDelay";
import Error from "../styled/Error";

type Props = FieldProps<any, HTMLElement> & {
  placeholder: string;
  icon?: keyof UnicodeIcons;
  label?: string;
};

const InputField = ({ name, placeholder, icon, label }: Props) => (
  <Field name={name}>
    {({ input }) => (
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
            htmlFor={name}
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
        <ErrorWithDelay name={name} delay={1000}>
          {(error: string) => <Error as="small">{error}</Error>}
        </ErrorWithDelay>
      </div>
    )}
  </Field>
);

export default InputField;
