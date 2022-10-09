import { ContactListProps } from "../typings";

export const fetchContactLists = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users`
  );
  const data = await response.json();
  const lists: ContactListProps[] = data;

  return lists;
};
