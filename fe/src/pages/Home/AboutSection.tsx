import React from 'react';
import About from "../../assets/images/about2.png";
import Logo from "../../assets/images/alphabet.png";



const AboutSection = () => {
  return (
    <div className="max-w-[1280px] mx-auto py-8">
      <div className="grid grid-cols-2 rounded-3xl p-9 bg-[#effaf3]">
        <div className="ml-16">
          <img src={About} alt="About Carrental" className="rounded-2xl object-cover block" />
        </div>
        <div className="flex flex-col items-center justify-between px-16">
          <img src={Logo} alt="Alphabet Icon" className="w-16 h-16" />
          <h2 className="text-3xl font-bold">
            Bạn muốn biết thêm <br />
            về Carrental?
          </h2>
          <p className="text-lg">
            Carrental kết nối khách hàng có nhu cầu thuê xe với hàng ngàn chủ xe ô tô ở TPHCM, Hà Nội & các tỉnh thành khác.
            Carrental hướng đến việc xây dựng cộng đồng người dùng ô tô văn minh & uy tín tại Việt Nam.
          </p>
          <div className="btn-about">
            <a href="/about" className="text-white bg-primary font-semibold py-2 px-6 rounded-lg">
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
