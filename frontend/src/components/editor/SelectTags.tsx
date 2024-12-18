import styled from "styled-components";
import { useState } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Id, Tag } from "@tgc/common";
import { Button } from "@/common/Button";
import { Modal } from "@/common/Modal";
import { Field, Input, Label, Text } from "@/components/editor";
import { TagEditor } from "@/components/TagEditor";
import { GET_TAGS } from "@/graphql";
import { theme } from "@/themes/theme";

type SelectTagsProps = {
  selectedTags: Id[];
  error: string;
  disabled: boolean;
  onTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTagAdd: (newTagId: string) => void;
};

export default function SelectTags({
  disabled,
  selectedTags,
  error,
  onTagChange,
  onTagAdd,
}: SelectTagsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: { tags = [] } = {}, error: errorTags } = useSuspenseQuery<{
    tags: Tag[];
  }>(GET_TAGS);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (errorTags) {
    return <p>Could not retrieve tags...</p>;
  }

  return (
    <>
      <Fieldset disabled={disabled}>
        <Legend>Tag(s)</Legend>

        <AddTagButton
          type="button"
          title="Add new tag(s)"
          aria-label="Add new tag(s)"
          $primary
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <IoMdAddCircleOutline />
        </AddTagButton>

        <Wrapper>
          {tags.map((tag) => (
            <Field key={tag.id} $inline>
              <Input
                type="checkbox"
                id={tag.name}
                name="tags"
                value={tag.id}
                checked={selectedTags.some((t) => t.id === Number(tag.id))}
                onChange={onTagChange}
              />
              <Label htmlFor={tag.name}>{tag.name}</Label>
            </Field>
          ))}
        </Wrapper>
        {error && <Text>{error}</Text>}
      </Fieldset>

      {/* Pass the "portal" prop to avoid nested forms (prevents inner form submission to trigger parent form submission). */}
      <Modal portal open={isModalOpen} onClose={closeModal}>
        <TagEditor
          label="tag"
          data={tags}
          onTagAdd={(newTagId: string) => {
            onTagAdd(newTagId);
            closeModal();
          }}
        />
      </Modal>
    </>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
`;

const Fieldset = styled.fieldset`
  position: relative;
  padding: 16px;
  border: ${theme.borderRadius.rounded_sm} solid ${theme.color.neutral.lightest};
  border-radius: ${theme.borderRadius.rounded_md};
  & input[type="checkbox"] + label {
    color: black;
  }
  &::placeholder {
    color: color-mix(in srgb, ${theme.color.neutral.light} 50%, transparent);
  }
  &:focus-visible {
    outline-color: ${theme.color.primary};
  }
`;

const Legend = styled.legend`
  text-align: left;
  font-size: 14px;
  color: ${theme.color.neutral.light};
  font-weight: bold;
`;

const AddTagButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  translate: 80px -20px;
  padding: 0;
  min-width: initial;
  height: unset;
  border: none;
  background-color: ${theme.color.white};
  border-radius: ${theme.borderRadius.pill};
  font-size: 1.5rem;
  & > svg {
    fill: ${theme.color.primary};
  }
  &:is(:hover, :focus-visible) {
    background-color: ${theme.color.primary};
    & > svg {
      fill: ${theme.color.white};
    }
  }
`;
