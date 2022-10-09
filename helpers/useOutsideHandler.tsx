import { MutableRefObject, useEffect, useRef, useState } from "react";

const useOutsideHandler = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);
  return { isMenuOpen, setIsMenuOpen, ref };
};

export default useOutsideHandler;
