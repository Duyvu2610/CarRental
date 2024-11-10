import React from 'react';

const InstructionSection = () => {
  const steps = [
    {
      number: "01",
      text: "Đặt xe trên\nweb Carrental",
      imgSrc: "https://www.mioto.vn/static/media/cho_thue_xe_co_taigia_re_tphcm.12455eba.svg",
      altText: "Đặt xe trên web Carrental"
    },
    {
      number: "02",
      text: "Nhận xe",
      imgSrc: "https://www.mioto.vn/static/media/gia_thue_xe_7cho_tai_tphcm.9455973a.svg",
      altText: "Nhận xe"
    },
    {
      number: "03",
      text: "Bắt đầu\nhành trình",
      imgSrc: "https://www.mioto.vn/static/media/gia_thue_xe_7cho_tai_hanoi.0834bed8.svg",
      altText: "Bắt đầu hành trình"
    },
    {
      number: "04",
      text: "Trả xe & kết thúc\nchuyến đi",
      imgSrc: "https://www.mioto.vn/static/media/gia_thue_xe_4cho_tai_tphcm.9dcd3930.svg",
      altText: "Trả xe & kết thúc chuyến đi"
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto py-20">
      <div className=" text-center">
        <div className="title-section mb-4">
          <h2 className="text-3xl font-bold">Hướng Dẫn Thuê Xe</h2>
        </div>
        <div className="sub-title mb-8">
          <h5 className="text-lg">
            Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Carrental một cách nhanh chóng
          </h5>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="items-ins flex flex-col items-center">
              <div className="ins-img mb-4">
                <img src={step.imgSrc} alt={step.altText} className="w-52 h-52 object-cover" />
              </div>
              <div className="flex">
                <h5 className="text-primary mr-2 text-left mb-0 font-bold text-xl ">{step.number}</h5>
                <h5 className="text-left font-bold text-xl">{step.text}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructionSection;
