import React, { ReactNode } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { rgba } from "polished";

ReactModal.setAppElement("#root");

interface Props extends ReactModal.Props {
  className?: string;
  children: ReactNode;
}

const ReactModalAdapter = ({ className, children, ...props }: Props) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <ReactModal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export default styled(ReactModalAdapter)`
  &__overlay {
    position: fixed;
    z-index: 100;
    top:0;
    left: 0
    width: 100vw;
    height: 100vh;
    background-color: ${props => rgba(props.theme.colors.textMain, 0.7)};
    display: flex;
    align-items: center;
    justify-content: center;

    &.ReactModal__Overlay--after-open {

    }
    &.ReactModal__Overlay--before-close {

    }
  }

  &__content {
    width: fit-content;
    height: fit-content;
    text-align: center;
    padding: 16px;
    border-radius: 0.25rem;
    background-color: ${props => props.theme.colors.bgMain};
    color: ${props => props.theme.colors.textMain};
    overflow-y: auto;
    max-height: 95vh;
    max-width: 95vw;
    &.ReactModal__Content--after-open {

    }
    &.ReactModal__Content--before-close {

    }
  }
`;
