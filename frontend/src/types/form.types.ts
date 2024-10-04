import { Id } from "@tgc/common";

export type FormState = {
  title: string;
  owner: string;
  price: number;
  picture: string;
  description: string;
  location: string;
  category: Id | undefined;
  tags: Id[];
};

export type FormError = Partial<{
  title: string;
  owner: string;
  price: string;
  picture: string;
  description: string;
  location: string;
  category: string;
  tags: string;
}>;
