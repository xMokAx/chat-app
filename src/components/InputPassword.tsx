import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon from "../styled/Icon";
import Button from "../styled/Button";
import { FieldProps, Field } from "react-final-form";
import ErrorWithDelay from "./ErrorWithDelay";
import Error from "../styled/Error";

type Props = FieldProps<any, HTMLElement> & {
  placeholder: string;
  label?: string;
};

const InputPassword = ({ name, placeholder, label }: Props) => {
  const [isHidden, setIsHidden] = useState(true);
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  return (
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
          <InputGroup hasIconLeft hasIconRight>
            <Input
              {...input}
              type={isHidden ? "password" : "text"}
              placeholder={placeholder}
              aria-label={placeholder}
            />
            <Button
              css="right: 0"
              type="button"
              onClick={toggleVisibility}
              aria-label={
                isHidden ? `Show ${placeholder}` : `Hide ${placeholder}`
              }
            >
              <Icon>{isHidden ? "visibility" : "visibility_off"}</Icon>
            </Button>
            <Icon isLeft>lock</Icon>
          </InputGroup>
          <ErrorWithDelay name={name} delay={1000}>
            {(error: string) => <Error as="small">{error}</Error>}
          </ErrorWithDelay>
        </div>
      )}
    </Field>
  );
};

export default InputPassword;
