import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon from "../styled/Icon";
import Button from "../styled/Button";
import { FieldProps, Field } from "react-final-form";
import ErrorWithDelay from "./ErrorWithDelay";
import Text from "../styled/Text";

type Props = FieldProps<any, HTMLElement> & {
  placeholder: string;
};

const InputPassword = ({ name, placeholder }: Props) => {
  const [isHidden, setIsHidden] = useState(true);
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  return (
    <Field name={name}>
      {({ input }) => (
        <div>
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
              aria-label={isHidden ? "Show password" : "Hide password"}
            >
              <i className="material-icons">
                {isHidden ? "visibility" : "visibility_off"}
              </i>
            </Button>
            <Icon isLeft>
              <i aria-hidden className="material-icons">
                lock
              </i>
            </Icon>
          </InputGroup>
          <ErrorWithDelay name={name} delay={1000}>
            {(error: string) => (
              <Text as="small" color="red">
                {error}
              </Text>
            )}
          </ErrorWithDelay>
        </div>
      )}
    </Field>
  );
};

export default InputPassword;
