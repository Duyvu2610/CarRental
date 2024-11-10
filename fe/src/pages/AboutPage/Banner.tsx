import BannerImg from "../../assets/images/aboutus1.4c31a699.png";
import IntroBannerImg from "../../assets/images/introimg.png";
import Suitcases from "../../assets/images/suitcases.png";
import People from "../../assets/images/people.png";
import Cap from "../../assets/images/cap.png";
import ElectricCar from "../../assets/images/electric-car.png";
import Maps from "../../assets/images/maps.png";
import Star from "../../assets/images/star.png";

function Banner() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="pt-20 pb-20 flex">
          <h1 className="font-bold text-5xl text-black w-[454px] leading-[72px] mr-[5%]">
            CarRental - Cùng bạn đến mọi hành trình
          </h1>
          <div className="w-[calc(95%-440px)]">
            <p className="text-lg text-black leading-7 pt-4">
              Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới
              xung quanh, là cơ hội học hỏi và chinh phục những điều mới lạ của
              mỗi cá nhân để trở nên tốt hơn. Do đó, chất lượng trải nghiệm của
              khách hàng là ưu tiên hàng đầu và là nguồn cảm hứng của đội ngũ
              CarRental.
              <br />
              <br />
              CarRental là nền tảng chia sẻ ô tô, sứ mệnh của chúng tôi không
              chỉ dừng lại ở việc kết nối chủ xe và khách hàng một cách Nhanh
              chóng - An toàn - Tiện lợi, mà còn hướng đến việc truyền cảm hứng
              KHÁM PHÁ những điều mới lạ đến cộng đồng qua những chuyến đi trên
              nền tảng của chúng tôi.
            </p>
          </div>
        </div>
        <div>
          <img src={BannerImg} alt="bannerImg" className="relative w-full" />
        </div>
        <div className="pt-20 pb-20 flex justify-between gap-24">
          <div className="intro-info flex flex-col gap-10">
            <h2 className="text-3xl font-bold">Drive. Explore. Inspire</h2>
            <p className="text-lg">
              <strong>Cầm lái</strong> và <strong>Khám phá </strong>
              thế giới đầy <strong>Cảm hứng</strong>
            </p>
            <p className="text-lg">
              CARRENTAL đặt mục tiêu trở thành cộng động người dùng ô tô Văn
              minh & Uy tín #1 tại Việt Nam, nhằm mang lại những giá trị thiết
              thực cho tất cả những thành viên hướng đến một cuộc sống tốt đẹp
              hơn.
              <br />
              <br />
              Chúng tôi tin rằng mỗi hành trình đều quan trọng, vì vậy đội ngũ
              và các đối tác của CARRENTAL với nhiều kinh nghiệm về lĩnh vực cho
              thuê xe, công nghệ, bảo hiểm & du lịch sẽ mang đến cho hành trình
              của bạn thêm nhiều trải nghiệm mới lạ, thú vị cùng sự an toàn ở
              mức cao nhất.
            </p>
          </div>
          <div className="intro-img">
            <img
              src={IntroBannerImg}
              alt="banner"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#f6f6f6] py-20">
        <div className="container mx-auto px-4">
          <div className="title-section mb-10 text-center">
            <h2 className="text-2xl font-bold">Carrental và những con số</h2>
          </div>
          <div className="list-info flex justify-center flex-wrap gap-y-12">
            <div className="item-info w-1/3 flex flex-col items-center gap-2">
              <div className="item-img">
                <img src={Suitcases} alt="sui" className="w-14 h-15" />
              </div>
              <h5 className="text-center text-2xl font-bold">100,000+</h5>
              <p className="text-gray-600 text-center px-5">
                Chuyến đi đầy cảm hứng
                <br />
                Carrental đã đồng hành
              </p>
            </div>
            <div className="item-info w-1/3 flex flex-col items-center gap-2">
              <div className="item-img">
                <img src={People} alt="people" className="w-14 h-15" />
              </div>
              <h5 className="text-center text-2xl font-bold">50,000+</h5>
              <p className="text-gray-600 text-center px-5">
                Khách hàng
                <br />
                đã trải nghiệm dịch vụ
              </p>
            </div>
            <div className="item-info w-1/3 flex flex-col items-center gap-2">
              <div className="item-img">
                <img src={Cap} alt="cap" className="w-14 h-15" />
              </div>
              <h5 className="text-center text-2xl font-bold">5,000+</h5>
              <p className="text-gray-600 text-center px-5">
                Đối tác chủ xe
                <br />
                trong cộng đồng Carrental
              </p>
            </div>
            <div className="item-info w-1/3 flex flex-col items-center gap-2">
              <div className="item-img">
                <img src={ElectricCar} alt="car" className="w-14 h-15" />
              </div>
              <h5 className="text-center text-2xl font-bold">100+</h5>
              <p className="text-gray-600 text-center px-5">
                Dòng xe
                <br />
                khác nhau đang cho thuê
              </p>
            </div>
            <div className="item-info w-1/3 flex flex-col items-center gap-2">
              <div className="item-img">
                <img src={Maps} alt="map" className="w-14 h-15" />
              </div>
              <h5 className="text-center text-2xl font-bold">10+</h5>
              <p className="text-gray-600 text-center px-5">
                Thành phố
                <br />
                Carrental đã có mặt
              </p>
            </div>
            <div className="item-info w-1/3 flex flex-col items-center gap-2">
              <div className="item-img">
                <img src={Star} alt="star" className="w-14 h-15" />
              </div>
              <h5 className="text-center text-2xl font-bold">4.95/5*</h5>
              <p className="text-gray-600 text-center px-5">
                Là số điểm nhận được từ &gt; 50,000 khách hàng
                <br />
                đánh giá về dịch vụ của chúng tôi
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
