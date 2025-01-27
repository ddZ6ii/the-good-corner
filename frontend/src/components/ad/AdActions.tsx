import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reference, useMutation } from "@apollo/client";
import { Button } from "@/common/Button";
import { ACTIONS } from "@/components/ad";
import { DELETE_AD } from "@/graphql/deleteAd";
import { theme } from "@/themes/theme";
import { notifyError, notifySuccess } from "@/utils/notify";

type AdActionsProps = {
  id: string;
};

export default function AdActions({ id }: AdActionsProps) {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [deleteAd, { loading }] = useMutation(DELETE_AD);

  const removeAd = async (id: string): Promise<void> => {
    try {
      setDisabled(true);
      const { data, errors } = await deleteAd({
        variables: { id },
        // Update Apollo's cache to reflect ad deletion on the UI displayed from other components fetching the ads.
        update(cache, { data }) {
          if (!data?.deleteAd) return;
          cache.modify({
            fields: {
              ads(existingAdRefs: readonly Reference[] = [], { readField }) {
                return existingAdRefs.filter(
                  (adRef) => readField("id", adRef) !== id,
                );
              },
            },
          });
        },
      });
      if (errors !== undefined || !data) {
        throw new Error("Failed to delete ad!");
      }
      notifySuccess("Ad successfully deleted!");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    } catch (error: unknown) {
      console.error(error);
      notifyError("Oops... an error has occured. Please try again later.");
      setDisabled(false);
    }
  };

  return (
    <ActionList>
      {ACTIONS.map((action) => (
        <ActionItem key={action.id}>
          <ActionButton
            type="button"
            title={action.title}
            aria-label={action.title}
            color="primary"
            disabled={loading || disabled}
            onClick={async (_e) => {
              if (action.title.toLowerCase() === "edit") {
                navigate(`/ads/${id}/edit`);
              }
              if (action.title.toLowerCase() === "delete") {
                await removeAd(id);
              }
            }}
          >
            {action.icon}
          </ActionButton>
        </ActionItem>
      ))}
    </ActionList>
  );
}

const ActionList = styled.ul`
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  gap: 8px;
`;

const ActionItem = styled.li`
  aspect-ratio: 1;
  font-size: 1.25em;
`;

const ActionButton = styled(Button)`
  padding: 8px;
  min-width: 24px;
  height: auto;
  aspect-ratio: 1;
  background-color: rgba(255, 164, 27, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.pill};
  font-size: 0.85em;
  box-shadow: ${theme.shadow.md};

  &:is(:hover, :focus-visible) {
    background-color: ${theme.color.primary.main};
    color: ${theme.color.white};
    animation: tilt-shaking 0.2s infinite;
  }

  ${({ title }) =>
    title?.toLowerCase() === "delete" &&
    css`
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.status.danger};
      }
    `}

  @keyframes tilt-shaking {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(7deg);
    }
    50% {
      transform: rotate(0eg);
    }
    75% {
      transform: rotate(-7deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;
