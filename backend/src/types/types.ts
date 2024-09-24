export type IdParam = {
  id: string;
};

export type Ad = {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
};

export type AdContent = Omit<Ad, 'id' | 'createdAt'>;

// symbolic link
