import Vni from "../../assets/images/vni.d1b15e7a.jpg";
import Global from "../../assets/images/global-care.e4fc7ef6.jpg";
import Mic from "../../assets/images/mic.ad48f066.jpg";
import Pvi from "../../assets/images/pvi.cfd48052.jpg";

const ProtectSection = () => {
  const images = [
    { src: Vni, alt: "VNI Insurance" },
    { src: Global, alt: "Global Care" },
    { src: Mic, alt: "MIC Insurance" },
    { src: Pvi, alt: "PVI Insurance" }
  ];

  return (
    <div className="py-14 bg-[#f6f6f6]">
      <div className="max-w-[1280px] mx-auto text-center">
        <h2 className=" font-bold text-center text-3xl mb-8">Hành Trình Của Bạn Luôn Được Bảo Vệ</h2>
        <div className="flex flex-wrap gap-8 justify-between">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-72 h-36 rounded-2xl border border-gray-200 bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProtectSection;
