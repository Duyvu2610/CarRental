import React from 'react';

const benefits = [
  {
    img: "https://www.mioto.vn/static/media/dich_vu_thue_xe_tu_lai_hanoi.f177339e.svg",
    title: "An tâm đặt xe",
    description:
      "Không tính phí huỷ chuyến trong vòng 1h sau khi đặt cọc. Hoàn cọc và bồi thường 100% nếu chủ xe huỷ chuyến trong vòng 7 ngày trước chuyến đi.",
  },
  {
    img: "https://www.mioto.vn/static/media/cho_thue_xe_tu_lai_tphcm.1e7cb1c7.svg",
    title: "Thủ tục đơn giản",
    description:
      "Chỉ cần có CCCD gắn chip (Hoặc Passport) & Giấy phép lái xe là bạn đã đủ điều kiện thuê xe trên Carrental.",
  },
  {
    img: "https://www.mioto.vn/static/media/cho_thue_xe_tu_lai_hanoi.735438af.svg",
    title: "Thanh toán dễ dàng",
    description:
      "Đa dạng hình thức thanh toán: ATM, thẻ Visa & Ví điện tử (Momo, VnPay, ZaloPay).",
  },
  {
    img: "https://www.mioto.vn/static/media/thue_xe_tu_lai_gia_re_hcm.ffd1319e.svg",
    title: "Giao xe tận nơi",
    description:
      "Bạn có thể lựa chọn giao xe tận nhà/sân bay... Phí tiết kiệm chỉ từ 15k/km.",
  },
  {
    img: "https://www.mioto.vn/static/media/thue_xe_tu_lai_gia_re_hanoi.4035317e.svg",
    title: "Dòng xe đa dạng",
    description:
      "Hơn 100 dòng xe cho bạn tuỳ ý lựa chọn: Mini, Sedan, CUV, SUV, MPV, Bán tải.",
  },
  {
    img: "https://www.mioto.vn/static/media/thue_xe_co_tai_xe.a6f7dc54.svg",
    title: "Lái xe an toàn",
    description: "Vững tay lái với gói bảo hiểm thuê xe từ nhà bảo hiểm MIC & VNI.",
  },
];

const Benefit = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Ưu Điểm Của Carrental</h2>
      </div>
      <div className="text-center mb-8">
        <h5 className="text-lg text-gray-600">
          Những tính năng giúp bạn dễ dàng hơn khi thuê xe trên Carrental.
        </h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col w-[calc(33.33% - 37.33px)] items-center">
            <img src={benefit.img} alt={benefit.title} className="w-60 h-60 mb-9" />
            <h5 className="text-xl font-semibold mb-2">{benefit.title}</h5>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefit;
