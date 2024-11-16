import styled from "styled-components";
import { useSuspenseQuery } from "@apollo/client";
import { Id, Tag } from "@tgc/common";
import { Fieldset } from "@/components/form/Fieldset";
import { Legend } from "@/components/form/Legend";
import { GET_TAGS } from "@/graphql/tags";
import { Input } from "@/components/form/Input";
import { Field } from "@/components/form/Field";
import { Label } from "@/components/form/Label";
import { Text } from "@/components/form/Text";

type TagsProps = {
  submittting: boolean;
  tagsData: Id[];
  tagsError: string;
  onTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Tags({
  submittting,
  tagsData,
  tagsError,
  onTagChange,
}: TagsProps) {
  const { data: { tags = [] } = {}, error } = useSuspenseQuery<{ tags: Tag[] }>(
    GET_TAGS,
  );

  if (error) {
    return <p>Could not retrieve tags...</p>;
  }

  return (
    <Fieldset disabled={submittting}>
      <Legend>Tag(s)</Legend>
      <Wrapper>
        {tags.map((tag) => (
          <Field key={tag.id} $inline>
            <Input
              type="checkbox"
              id={tag.name}
              name="tags"
              value={tag.id}
              checked={tagsData.some((t) => t.id === Number(tag.id))}
              onChange={onTagChange}
            />
            <Label htmlFor={tag.name}>{tag.name}</Label>
          </Field>
        ))}
      </Wrapper>
      {tagsError && <Text>{tagsError}</Text>}
    </Fieldset>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
`;
