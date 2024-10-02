export type Category = {
  id: number;
  name: string;
};

export type Ad = {
  id: number;
  title: string;
  description: string;
  owner: string;
  location: string;
  picture: string;
  price: number;
  createdAt: string;
  category: Category;
};
