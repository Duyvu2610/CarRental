import { FC, useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/alphabet.png";
import routes from "../../config/routes";
import FormSignUp from "../FormSignUp";
import FormLogin from "../FormLogin";
import { Profile } from "../../types/types";
import { baseAxios } from "../../api/axios";

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [myProfile, setMyProfile] = useState<Profile | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await baseAxios.get("/profile");
        setMyProfile(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();


    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [isMenuOpen]);

  return (
    <nav className="py-4 bg-white border-b">
      <div className="max-w-[1280px] px-6 xl:px-0 mx-auto">
        <div className="grid grid-cols-12">
          <Link
            to="/"
            className="font-[IntegralCf] text-[24px] flex justify-start items-center col-span-8"
          >
            <img src={Logo} alt="" className="inline-block w-6 h-6" />
            arRental
          </Link>

          <ul className="flex justify-between items-center flex-1 col-span-4">
            <NavLink
              to={routes.about}
              key={routes.about}
              className={"font-semibold"}
            >
              Về chúng tôi
            </NavLink>
            {isLogin ? (
              <>
                <NavLink
                  to={routes.carregistermodel}
                  key={routes.carregistermodel}
                  className={"font-semibold"}
                >
                  Đăng ký cho thuê
                </NavLink>

                <div className="border-r h-6"></div>

                <NavLink to={routes.account} key={routes.account}>
                  {myProfile?.name === null ? myProfile?.email.split("@")[0] : myProfile?.name}
                </NavLink>
              </>
            ) : (
              <>
                <div className="border-r h-6"></div>

                <li
                onClick={() =>
                  (
                    document.getElementById("my_modal_3") as HTMLDialogElement
                  ).showModal()
                }
                  className={"font-semibold"}
                >
                  Đăng ký
                </li>
                <li
                  className="hidden lg:block border py-2 px-3 rounded-lg border-black font-semibold cursor-pointer"
                  onClick={() =>
                    (
                      document.getElementById("my_modal_3") as HTMLDialogElement
                    ).showModal()
                  }
                >
                  Đăng nhập
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      {isShowSignUp ? (
                        <FormSignUp
                          onClickLogin={() => setIsShowSignUp(false)}
                        />
                      ) : (
                        <FormLogin
                          onClickSignUp={() => setIsShowSignUp(true)}
                          onLoginSuccess={() => setIsLogin(true)}
                        />
                      )}
                    </div>
                  </dialog>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-4 lg:hidden">
            {/* Mobile menu */}
            <div className="lg:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? (
                  <FaXmark className="w-6 h-6 mt-2" />
                ) : (
                  <FaBars className="w-6 h-6 mt-2" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          ref={menuRef}
          className={`bg-black w-custom-width h-full text-white z-50 ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          <Link
            to="/"
            onClick={toggleMenu}
            className="font-[IntegralCf] block text-[24px] py-4 px-4"
          >
            SEEDLING
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
