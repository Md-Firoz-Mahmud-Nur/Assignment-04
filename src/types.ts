export type AddBookForm = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BorrowBook = {
  totalQuantity: number;
  book: { isbn: string; title: string }[];
};

export type ShowBorrowBook = {
  totalQuantity: number;
  book: {
    isbn: string;
    title: string;
  };
};
