import styled from "styled-components";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/common/Button";
import { theme } from "@themes/theme";

type ModalProps = {
  open: boolean;
  portal?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

export function Modal({ open, portal = false, onClose, children }: ModalProps) {
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
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
    <Dialog ref={modalRef} onKeyDown={handleKeyDown}>
      <CloseButton
        type="button"
        aria-label="Close modal"
        onClick={(_e) => {
          closeModal();
        }}
      >
        <IoMdClose />
      </CloseButton>
      {children}
    </Dialog>
  );

  if (portal) {
    return createPortal(modal, document.body);
  }

  return modal;
}

const Dialog = styled.dialog`
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
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0;
  min-width: initial;
  height: unset;
  border: none;
  border-radius: ${theme.borderRadius.pill};
  font-size: 1.5rem;
  color: ${theme.color.neutral.light};
  &:is(:focus-visible) {
    outline-offset: 2px;
  }
`;
