export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "tweet";
  blockTweet: string;
}

export type TweetBody = {
  text: string;
  username: string;
  profileImg: string;
  image?: string;
};

export interface ContactListProps {
  _id: string;
  name: string;
  phone: string;
  email: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
