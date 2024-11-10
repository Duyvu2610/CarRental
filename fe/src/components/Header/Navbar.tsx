import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/alphabet.png";
import routes from "../../config/routes";
import { RootState } from "../../redux/store";
import { GetUserInfoDto } from "../../types/types";

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isLogin = localStorage.getItem("user");

  const user: GetUserInfoDto | null = useSelector(
    (state: RootState) => state.auth.currentUser
  );
  console.log(user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

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
            {true ? (
              <>
                <NavLink
                  to={routes.carregistermodel}
                  key={routes.carregistermodel}
                  className={"font-semibold"}
                >
                  Đăng ký cho thuê
                </NavLink>

                <div className="border-r h-6"></div>

                <NavLink
                  to={routes.account}
                  key={routes.account}
                >
                  Xin chào! vuj
                </NavLink>
              </>
            ) : (
              <>
                <div className="border-r h-6"></div>

                <NavLink
                  to={routes.product}
                  key={routes.product}
                  className={"font-semibold"}
                >
                  Đăng ký
                </NavLink>
                <Link
                  to={"/login"}
                  className="hidden lg:block border py-2 px-3 rounded-lg border-black font-semibold"
                >
                  Đăng nhập
                </Link>
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
