import axios from "axios";
import Image from "next/image";
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { ContactListProps } from "../typings";
import { fetchContactLists } from "../utils/fetchContactLists";
import Button from "./Button";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  backdropStyle?: React.CSSProperties;
  outsideOff?: boolean;
  setContactListDatas: Dispatch<SetStateAction<ContactListProps[]>>;
  contactListDatas?: ContactListProps[];
  updateId?: string;
}

const ContactListModal = ({
  show,
  setShow,
  backdropStyle,
  outsideOff,
  setContactListDatas,
  contactListDatas,
  updateId,
}: Props) => {
  const bRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const modalRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;

  const inputRef = React.useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [file, setFile] = useState<string | Blob | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (show) {
      modalRef.current.classList.add("visible");
    } else {
      modalRef.current.classList.remove("visible");
    }
  }, [show]);

  useEffect(() => {
    if (updateId) {
      const contactList = async () => {
        const { data } = await axios.get(`/api/v1/users/${updateId}`);
        console.log(data);
        setName(data?.name);
        setPhone(data?.phone);
        setEmail(data?.email);
        setSelectedFile(data?.img);
      };
      contactList();
    }
  }, [updateId]);

  const handleOutsideClick = (e: any) => {
    if (!outsideOff) {
      if (!bRef.current.contains(e.target)) setShow(false);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChangePhoto = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedFile(reader?.result as string);
        setFile(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const addNewContact = async () => {
    try {
      if (!name || !email || !phone) {
        return toast("Please, fill required fields!", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      let formData = new FormData();
      formData.append("img", file as string | Blob);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const addToast = toast.loading("Adding new contact...");

      const { status } = await axios.post(`/api/v1/users`, formData, config);
      if (status === 201) {
        toast.success("Contact added!", {
          id: addToast,
        });
        const contactLists = await fetchContactLists();
        setContactListDatas(contactLists);
        setShow(false);
        setName("");
        setEmail("");
        setPhone("");
        setSelectedFile(null);
        setFile(null);
      } else {
        return toast("Something went wrong, Please try again!", {
          icon: "😪",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async () => {
    try {
      if (!name || !email || !phone) {
        return toast("Please, fill required fields!", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      let formData = new FormData();
      formData.append("img", file as string | Blob);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const addToast = toast.loading("Updating exssisting contact...");

      const { status } = await axios.put(
        `/api/v1/users/${updateId}`,
        formData,
        config
      );
      if (status === 200) {
        toast.success("Contact updated!", {
          id: addToast,
        });
        const contactLists = await fetchContactLists();
        setContactListDatas(contactLists);
        setShow(false);
        setName("");
        setEmail("");
        setPhone("");
        setSelectedFile(null);
        setFile(null);
      } else {
        return toast("Something went wrong, Please try again!", {
          icon: "😪",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div
        ref={modalRef}
        style={backdropStyle}
        className="modal__wrap"
        onClick={handleOutsideClick}
      >
        <div ref={bRef} className="modal">
          <div className="modal-wrapper">
            <h2 className="modal-title">Add Contact</h2>
            <div className="modal-header">
              <Image
                src={selectedFile ? selectedFile : "/Default.png"}
                width={88}
                height={88}
              />
              <Button
                icon={<AiOutlinePlus className="icon" />}
                handleClick={handleClick}
                text="Add picture"
                type="btn-type-3a"
              />
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleChangePhoto}
              />
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Jamie Wright"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="number"
                  placeholder="+36203185691"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email address</label>
                <input
                  type="text"
                  placeholder="jamie.wright@mail.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button
                text="Cancel"
                handleClick={() => setShow(false)}
                type="btn-type-2a"
              />
              <Button
                text="Done"
                type="btn-type-2c"
                handleClick={updateId ? updateContact : addNewContact}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactListModal;
