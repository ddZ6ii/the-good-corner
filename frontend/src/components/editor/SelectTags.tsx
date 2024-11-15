import styled from "styled-components";
import { useSuspenseQuery } from "@apollo/client";
import { Id, Tag } from "@tgc/common";
import { Field, Input, Label, Text } from "@/components/editor";
import { GET_TAGS } from "@/graphql/tags";
import { theme } from "@/themes/theme";

type SelectTagsProps = {
  selectedTags: Id[];
  error: string;
  disabled: boolean;
  onTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SelectTags({
  disabled,
  selectedTags,
  error,
  onTagChange,
}: SelectTagsProps) {
  const { data: { tags = [] } = {}, error: errorTags } = useSuspenseQuery<{
    tags: Tag[];
  }>(GET_TAGS);

  if (errorTags) {
    return <p>Could not retrieve tags...</p>;
  }

  return (
    <Fieldset disabled={disabled}>
      <Legend>Tag(s)</Legend>
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
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
`;

const Fieldset = styled.fieldset`
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
