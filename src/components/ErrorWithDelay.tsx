import React from "react";
import { Field } from "react-final-form";

interface DisplayErrorProps {
  delay: number;
  active?: boolean;
  dirty?: boolean;
  error: string;
  touched?: boolean;
  children: (error: string) => React.ReactElement;
}

interface ErrorWithDelayProps {
  name: string;
  delay: number;
  children: (error: string) => React.ReactElement;
}

const DisplayError = ({
  delay,
  active,
  dirty,
  error,
  touched,
  children
}: DisplayErrorProps) => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    let timeout: number;
    if (active && error && dirty) {
      console.info("setting timeout");
      timeout = window.setTimeout(() => setShow(true), delay);
    }
    return () => {
      console.info("clearing timeout");
      clearTimeout(timeout);
    };
  }, [delay, error, active, dirty]);

  return error && ((touched && !active) || (touched && !show && active) || show)
    ? children(error)
    : null;
};

const ErrorWithDelay = ({ name, children, delay }: ErrorWithDelayProps) => (
  <Field
    name={name}
    subscription={{ active: true, error: true, dirty: true, touched: true }}
  >
    {({ meta: { active, dirty, error, touched } }) => (
      <DisplayError
        delay={delay}
        active={active}
        dirty={dirty}
        error={error}
        touched={touched}
      >
        {children}
      </DisplayError>
    )}
  </Field>
);

export default ErrorWithDelay;
