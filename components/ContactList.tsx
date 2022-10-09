import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiHeadphones, FiSettings } from "react-icons/fi";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { BiDotsHorizontalRounded, BiTrashAlt } from "react-icons/bi";
import Button from "./Button";
import { MdFavoriteBorder } from "react-icons/md";
import toast from "react-hot-toast";
import { ContactListProps } from "../typings";
import { fetchContactLists } from "../utils/fetchContactLists";
import ContactListModal from "./ContactListModal";

interface Props {
  contactList: ContactListProps;
  setContactListDatas: Dispatch<SetStateAction<ContactListProps[]>>;
}

const ContactList = ({ contactList, setContactListDatas }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const removeContactList = async (id: string) => {
    try {
      const commentToast = toast.loading("Deleting contact...");

      const result = await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
      });

      const json = await result.json();
      toast.success("Contact deleted!", {
        id: commentToast,
      });
      const contactLists = await fetchContactLists();
      setContactListDatas(contactLists);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`${show ? "contact active" : "contact"}`}>
      <div className="contact-left">
        <div className="contact--user__image">
          <Image
            src={contactList.img ? contactList.img : "/Default.png"}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="contact-user__details">
          <h2 className="user-name">{contactList.name}</h2>
          <span className="phone-number">{contactList.phone}</span>
        </div>
      </div>
      <div className="contact-right">
        <Button
          icon={<IoNotificationsOffOutline className="icon" />}
          type="btn-type-2c"
        />
        <Button icon={<FiHeadphones className="icon" />} type="btn-type-2c" />
        <div className="contact-single-actions">
          <Button
            icon={<BiDotsHorizontalRounded className="icon" />}
            type="btn-type-2c"
            handleClick={() => setShow(!show)}
          />
          <div
            onMouseLeave={() => setShow(!show)}
            className={`${
              show ? "contact-single-wrapper active" : "contact-single-wrapper"
            }`}
          >
            <Button
              icon={<FiSettings className="icon" />}
              type="btn-type-2c"
              text="Edit"
              handleClick={() => setShowModal(true)}
            />
            <Button
              icon={<MdFavoriteBorder className="icon" />}
              type="btn-type-2c"
              text="Favourite"
              handleClick={() => console.log("Favourite")}
            />
            <Button
              icon={<BiTrashAlt className="icon" />}
              type="btn-type-2c"
              text="Remove"
              handleClick={() => removeContactList(contactList._id)}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <ContactListModal
          show={showModal}
          setShow={setShowModal}
          setContactListDatas={setContactListDatas}
          updateId={contactList._id}
        />
      )}
    </div>
  );
};

export default ContactList;
