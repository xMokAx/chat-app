import React from "react";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon from "../styled/Icon";
import { FieldProps, Field } from "react-final-form";
import ErrorWithDelay from "./ErrorWithDelay";
import Text from "../styled/Text";

type Props = FieldProps<any, HTMLElement> & {
  placeholder: string;
  icon: string;
};

const InputField = ({ name, placeholder, icon }: Props) => (
  <Field name={name}>
    {({ input }) => (
      <div>
        <InputGroup hasIconLeft hasIconRight>
          <Input
            {...input}
            type="text"
            placeholder={placeholder}
            aria-label={placeholder}
          />
          <Icon isLeft>
            <i aria-hidden className="material-icons">
              {icon}
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

export default InputField;
