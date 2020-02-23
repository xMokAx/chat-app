import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon from "../styled/Icon";
import Button from "../styled/Button";
import { Field } from "react-final-form";
import ErrorWithDelay from "./ErrorWithDelay";
import Error from "../styled/Error";
import { MyFieldProps } from "./InputField";

type Props = MyFieldProps<string> & {
  placeholder: string;
  label?: string;
};

const InputPassword = ({ placeholder, label, ...fieldProps }: Props) => {
  const [isHidden, setIsHidden] = useState(true);
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  return (
    <Field {...fieldProps}>
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
              htmlFor={input.name}
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
              <Icon icon={isHidden ? "visibility" : "visibility_off"} />
            </Button>
            <Icon isLeft icon="lock" />
          </InputGroup>
          <ErrorWithDelay name={input.name} delay={1000}>
            {(error: string) => <Error as="small">{error}</Error>}
          </ErrorWithDelay>
        </div>
      )}
    </Field>
  );
};

export default InputPassword;
