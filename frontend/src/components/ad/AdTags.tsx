import styled, { css } from "styled-components";
import { HTMLProps } from "react";
import { Tag } from "@tgc/common";
import { basePillStyle } from "@/themes/styles";
import { mapColor } from "@/themes/theme";

type AdTagsProps = {
  tags: Tag[];
};

export default function AdTags({ tags }: AdTagsProps) {
  return (
    <TagList>
      {tags.map((tag, index) => {
        return (
          <TagItem key={tag.id} $color={mapColor(index)}>
            {tag.name}
          </TagItem>
        );
      })}
    </TagList>
  );
}

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  row-gap: 8px;
`;

interface TagItemProps extends HTMLProps<HTMLLIElement> {
  $color: string;
}

const TagItem = styled.li<TagItemProps>`
  ${basePillStyle}

  ${({ $color }) => css`
    background-color: ${$color};
  `}
`;
