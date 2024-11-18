import { Ad, AdSchema } from "@tgc/common";
import { AdFormData } from "@/types/adForm.types";

export function mapAdToFormData(ad: Ad): AdFormData {
  // Parse ad data to remove extra query fields.
  const parsedAd = AdSchema.parse(ad);
  // Remove catagory's name and set tags to [] if undedined.
  const {
    id: _,
    category: { id: categoryId } = {},
    tags = [],
    ...initialForm
  } = parsedAd;
  const nextTags = tags.length
    ? tags.map((tag) => ({ id: tag.id }))
    : [...tags];
  Object.assign(initialForm, { category: { id: categoryId } });
  Object.assign(initialForm, { tags: nextTags });
  return initialForm as AdFormData;
}
