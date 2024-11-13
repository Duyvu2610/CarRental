import React from "react";
import Profile from "./Profile";
import BookingHistory from "./BookingHistory";
import MyCar from "./MyCar";
import ChangePassword from "./ChangePassword";
import { baseAxios } from "../../api/axios";
import Swal from "sweetalert2";

const AccountPage: React.FC = () => {

  const [activeTab, setActiveTab] = React.useState(0);
  const activeTabClass = "after:absolute after:content-[''] after:h-full after:w-1 after:left-0 after:bg-primary"

  const handleChangeTab = (index: number) => {
    setActiveTab(index);
  }

  const sidebarItems = [
    { icon: "👤", label: "Thông tin cá nhân"},
    { icon: "🚗", label: "Xe của tôi" },
    { icon: "🧳", label: "Đổi mật khẩu" },
    { icon: "📄", label: "Lịch sử thuê xe" },
    { icon: "🎁", label: "Xóa tài khoản" , onclick : () => {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa tài khoản không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it"
      }).then((result) => {
        if (result.isConfirmed) {
          baseAxios.delete("/profile")
            .then(() => {
              Swal.fire({
                title: "Thành công",
                text: "Xóa tài khoản thành công",
                icon: "success",
                confirmButtonText: "Okay",
              });
              localStorage.removeItem("token");
              window.location.href = "/";
            })
            .catch((error) => {
              Swal.fire({
                title: "Error",
                text: "Xoá tài khoản thất bại",
                icon: "error",
                confirmButtonText: "Okay",
              });
            });
        }
      });
    }},
    { icon: "🚪", label: "Đăng xuất", specialClass: "text-red-600", onclick : () => {
      Swal.fire({
        title: "Bạn có chắc chắn muốn đăng xuất không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      });
    }},
  ];

  return (
    <div className=" bg-[#f6f6f6]">
      <div className=" max-w-[1280px] mx-auto ">
        <div className="flex flex-col md:flex-row pt-8 min-h-screen">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 p-4">
            <h2 className="text-3xl font-bold mb-6 border-b pb-6">
              Xin chào bạn!
            </h2>
            <ul className=" text-gray-700">
              {sidebarItems.map((item, index) => (
                <li
                  key={index}
                  className={`transition-all duration-300 flex items-center text-lg font-semibold relative hover:bg-[#f3f2f2] ${
                    item.specialClass || ""
                  } ${activeTab === index ? activeTabClass : ""}`}
                >
                  <button onClick={() => {
                    if (item.onclick) {
                      item.onclick();
                    } else {
                      handleChangeTab(index);
                    }
                  }} className=" p-4 w-full text-left">{item.icon}<span className="ml-2">{item.label}</span></button>  
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 p-4">
            {activeTab === 0 && <Profile />}
            {activeTab === 1 && <MyCar />}
            {activeTab === 2 && <ChangePassword />}
            {activeTab === 3 && <BookingHistory />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
