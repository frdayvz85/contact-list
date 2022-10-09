import React, { Dispatch, SetStateAction, useState } from "react";
import { FiSettings } from "react-icons/fi";
import Image from "next/image";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import ContactListModal from "./ContactListModal";
import { ContactListProps } from "../typings";

interface Props {
  setContactListDatas: Dispatch<SetStateAction<ContactListProps[]>>;
}

const Navbar = ({ setContactListDatas }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="contact-container">
      <div className="logo">Contacts</div>
      <div className="navbar-actions">
        <FiSettings />
        <Image src="/Photo.png" width={20} height={20} />
        <Button
          icon={<AiOutlinePlus className="icon" />}
          text="Add new"
          type="btn-type-3a"
          handleClick={() => setShow(true)}
        />
      </div>

      <ContactListModal
        show={show}
        setShow={setShow}
        setContactListDatas={setContactListDatas}
      />
    </div>
  );
};

export default Navbar;
