import React from "react";
import Profile from "./Profile";

const AccountPage: React.FC = () => {

  const [activeTab, setActiveTab] = React.useState(0);
  const activeTabClass = "after:absolute after:content-[''] after:h-full after:w-1 after:left-0 after:bg-primary"

  const handleChangeTab = (index: number) => {
    setActiveTab(index);
  }

  const sidebarItems = [
    { icon: "👤", label: "Tài khoản của tôi"},
    { icon: "❤️", label: "Xe yêu thích" },
    { icon: "🚗", label: "Xe của tôi" },
    { icon: "🧳", label: "Chuyến của tôi" },
    { icon: "📄", label: "Đơn hàng Thuê xe dài hạn" },
    { icon: "🎁", label: "Quà tặng" },
    { icon: "📍", label: "Địa chỉ của tôi" },
    { icon: "🔒", label: "Đổi mật khẩu" },
    { icon: "🚪", label: "Đăng xuất", specialClass: "text-red-600" },
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
                  <button onClick={() => handleChangeTab(index)} className=" p-4 w-full text-left">{item.icon}<span className="ml-2">{item.label}</span></button> 
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 p-4">
            {activeTab === 0 && <Profile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
