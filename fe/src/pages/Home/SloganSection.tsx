import BgSlogan from "../../assets/images/bg-slogan.jpg";


const SloganSection = () => {
  return (
    <div className="max-w-[1280px] mx-auto py-10">
      <div
        className="bg-slogan bg-cover bg-center h-[600px] w-full rounded-[16px] flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${BgSlogan})` }}
      >
        <div className="text-center flex flex-col items-center justify-center">
          <h1 className="text-white max-w-[600px] mx-auto text-4xl font-bold leading-tight mb-6">
            Carrental - Cùng Bạn Đến Mọi Hành Trình
          </h1>
          <div className="line-bg w-[280px] h-[1px] bg-white my-12"></div>
          <h4 className="text-white text-lg mx-auto">
            Trải nghiệm sự khác biệt từ <span className="text-green-500 font-bold">hơn 8000</span> xe gia đình đời mới khắp Việt Nam
          </h4>
        </div>
      </div>
      <div className="slider-page mt-8">
        {/* Slider component or content goes here */}
      </div>
    </div>
  );
};

export default SloganSection;
