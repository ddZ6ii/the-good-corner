import styled, { css } from "styled-components";
import { DialogHTMLAttributes, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/common/Button";
import { theme } from "@themes/theme";

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  open: boolean;
  portal?: boolean;
  hideCloseButton?: boolean;
  closeOnEscape?: boolean;
  $transparent?: boolean;
  onClose?: () => void;
}

type StyledModalProps = DialogHTMLAttributes<HTMLDialogElement> & {
  $transparent?: boolean;
};

export function Modal({
  open,
  onClose,
  portal = false,
  hideCloseButton = false,
  closeOnEscape = true,
  $transparent = false,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const closeModal = (): void => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    if (onClose) {
      onClose();
    }
    modalEl.close();
  };

  // Close modal on Escape key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape" && closeOnEscape) {
      e.preventDefault();
      closeModal();
    }
  };

  // Open/close modal using dialog API
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    if (open) {
      modalEl.showModal();
    } else {
      modalEl.close();
    }
  }, [open]);

  const modal = (
    <Dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      $transparent={$transparent}
    >
      {!hideCloseButton && (
        <CloseButton
          type="button"
          aria-label="Close modal"
          onClick={(_e) => {
            closeModal();
          }}
        >
          <IoMdClose />
        </CloseButton>
      )}
      {children}
    </Dialog>
  );

  if (portal) {
    return createPortal(modal, document.body);
  }

  return modal;
}

const Dialog = styled.dialog<StyledModalProps>`
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: max(min(200px, 100%), 480px);
  padding: 1rem;
  border: 1px solid ${theme.color.neutral.lightest};
  border-radius: ${theme.borderRadius.rounded_lg};
  &::backdrop {
    background-color: ${theme.color.neutral.darkest};
    opacity: 0.95;
  }
  ${({ $transparent }) =>
    $transparent &&
    css`
      border: none;
      background-color: transparent;
      &:is(:focus-visible) {
        outline: none;
      }
      &::backdrop {
        opacity: 0.2;
      }
    `};
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0;
  min-width: initial;
  height: unset;
  background-color: ${theme.color.neutral.light};
  border: none;
  border-radius: ${theme.borderRadius.pill};
  font-size: 1.5rem;
  color: ${theme.color.white};
  &:is(:focus-visible, :hover) {
    outline-offset: 2px;
    background-color: ${theme.color.primary.main};
    color: ${theme.color.white};
  }
`;
