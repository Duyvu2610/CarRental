import { useEffect, useState } from "react";
import { getPullDownBranch } from "../../api/carApi";
import BrandPullDown from "../../interfaces/car";
import { callApi } from "../../api/axios";
const SelfDriver: React.FC = () => {
  const [brand, setBrand] = useState<BrandPullDown[]>([]);

    useEffect(() => {
        const fetchBrand = async () => {
        try {
            callApi(() => getPullDownBranch()).then((res) => {
                setBrand(res);
            });
            
        } catch (error) {
            console.log(error);
        }
        };
        fetchBrand();
    }, []);
    
  return (
    <div className="bg-bg py-12 min-h-[calc(100vh-69px)] ">
      <div className="max-w-[1280px] mx-auto  flex flex-col relative">
        <span className="absolute top-0 left-0">bb</span>
        <div className="flex flex-col w-[770px] mx-auto">
          <h2 className="font-bold text-4xl pb-6 text-center">Đăng ký xe</h2>
          <div className="w-full bg-white flex justify-around p-4 border-b-4 border-bg">
            <div className="flex flex-col items-center">
              <p className="h-16 w-16 flex justify-center items-center rounded-full text-white bg-primary">
                1
              </p>
              <p className="text-[#aaa]">Thông tin</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="h-16 w-16 flex justify-center items-center rounded-full text-black bg-[#f7fbff]">
                2
              </p>
              <p className="text-[#aaa]">Cho thuê</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="h-16 w-16 flex justify-center items-center rounded-full text-black bg-[#f7fbff]">
                3
              </p>
              <p className="text-[#aaa]">Hình ảnh</p>
            </div>
          </div>
          {/* dynamic */}
          <form className="bg-white p-8">
            <label htmlFor="" className="font-bold text-xl">
              Biến số xe
            </label>
            <p className="my-2 text-red-500">
              Lưu ý: Biển số sẽ không thể thay đổi sau khi đăng ký.
            </p>
            <input type="text" className="border rounded-lg px-4 py-1" />

            <p className="font-bold text-xl mt-6">Thông tin cơ bản</p>
            <p className="my-2 text-red-500 mb-6">
              Lưu ý: Các thông tin cơ bản sẽ không thể thay đổi sau khi đăng ký.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="">
                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="">Hãng xe</label>
                  <select className="border rounded-lg px-4 py-2">
                    {brand.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="">Số nghế</label>
                  <select className="border rounded-lg px-4 py-2">
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="">Truyền động</label>
                  <select className="border rounded-lg px-4 py-2">
                    <option value="">Số tự động</option>
                    <option value="">Số sàn</option>
                  </select>
                </div>
              </div>
              <div className="">
                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="">Mẫu</label>
                  <select className="border rounded-lg px-4 py-2">
                    <option value="">Chọn hãng xe</option>
                    <option value="">Audi</option>
                    <option value="">Suzuki</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="">Năm sản xuất</label>
                  <select className="border rounded-lg px-4 py-2">
                    <option value="">2024</option>
                    <option value="">2025</option>
                    <option value="">2026</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="">Loại nhiên liệu</label>
                  <select className="border rounded-lg px-4 py-2">
                    <option value="">Xăng</option>
                    <option value="">Điện</option>
                  </select>
                </div>
              </div>
            </div>

            <p className="font-bold text-xl mt-6 mb-2">Mô tả</p>
            <textarea
              className="h-[120px] py-3 px-5 w-full border"
              placeholder="Huyndai Elantra số tự động đăng ký tháng 06/2018. Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách. Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch. Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác..."
            ></textarea>
            <p className="font-bold text-xl mt-6 mb-2">Tính năng</p>
            <ul className="grid w-full gap-6 md:grid-cols-3">
              <li>
                <input
                  type="checkbox"
                  id="map"
                  value=""
                  className="hidden peer"
                />
                <label
                  htmlFor="map"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 "
                >
                  <div className="flex-1">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/map-v2.png"
                      alt=""
                      className="w-10 mx-auto"
                    />
                    <div className="w-full text-sm text-center">Bản đồ</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="bluetooth"
                  value=""
                  className="hidden peer"
                />
                <label
                  htmlFor="bluetooth"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 "
                >
                  <div className="flex-1">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/bluetooth-v2.png"
                      alt=""
                      className="w-10 mx-auto"
                    />
                    <div className="w-full text-sm text-center">Bluetooth</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="camera"
                  value=""
                  className="hidden peer"
                />
                <label
                  htmlFor="camera"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 "
                >
                  <div className="flex-1">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/360_camera-v2.png"
                      alt=""
                      className="w-10 mx-auto"
                    />
                    <div className="w-full text-sm text-center">Camera 360</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="pc"
                  value=""
                  className="hidden peer"
                />
                <label
                  htmlFor="pc"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 "
                >
                  <div className="flex-1">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/parking_camera-v2.png"
                      alt=""
                      className="w-10 mx-auto"
                    />
                    <div className="w-full text-sm text-center">
                      Camera cập lề
                    </div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="dc"
                  value=""
                  className="hidden peer"
                />
                <label
                  htmlFor="dc"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 "
                >
                  <div className="flex-1">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dash_camera-v2.png"
                      alt=""
                      className="w-10 mx-auto"
                    />
                    <div className="w-full text-sm text-center">
                      Camera hành trình
                    </div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="sc"
                  value=""
                  className="hidden peer"
                />
                <label
                  htmlFor="sc"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 "
                >
                  <div className="flex-1">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/reverse_camera-v2.png"
                      alt=""
                      className="w-10 mx-auto"
                    />
                    <div className="w-full text-sm text-center">Camera lùi</div>
                  </div>
                </label>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelfDriver;
