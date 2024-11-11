import { useEffect, useState } from "react";
import { getPullDownBranch } from "../../api/carApi";
import BrandPullDown from "../../interfaces/car";
import { baseAxios, callApi } from "../../api/axios";
import { Feature } from "../../types/types";

interface CarRegisterDto {
  brandKbn: number;
  carTypeKbn: number;
  licensePlate: string;
  numOfSeat: number;
  driveShaftKbn: number;
  fuel: string;
  description: string;
  note: string;
  address: string;
  limitKm: number;
  priceLimitKm: number;
  imgUrl: string;
  limitDeliveryKm: number;
  price: number;
}

const SelfDriver: React.FC = () => {
  const [brand, setBrand] = useState<BrandPullDown[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [typeCar, setTypeCar] = useState<any[]>([]);
  const [carData, setCarData] = useState<CarRegisterDto>({
    brandKbn: 0,
    carTypeKbn: 0,
    licensePlate: "",
    numOfSeat: 0,
    driveShaftKbn: 1,
    fuel: "",
    description: "",
    note: "",
    address: "",
    limitKm: 0,
    priceLimitKm: 0,
    imgUrl: "",
    limitDeliveryKm: 0,
    price: 0,
  });

  const [imgUrl, setImgUrl] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgUrl(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    baseAxios.post("/car", carData)
    .then((res) => {
      console.log(res);
    }
    ).catch((error) => {
      console.log(error);
    }
    );
  };

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await callApi(() => getPullDownBranch());
        setBrand(res);
        fetchFeature();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFeature = async () => {
      try {
        const res = await baseAxios.get("/feature");
        setFeatures(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBrand();
  }, []);

  const fetchTypeCar = async (id: number) => {
    try {
      const res = await baseAxios.get("/brand/loai/" + id);
      setTypeCar(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="bg-bg py-12 min-h-[calc(100vh-69px)] ">
      <div className="max-w-[1280px] mx-auto flex flex-col relative">
        <div className="flex flex-col w-[770px] mx-auto">
          <h2 className="font-bold text-4xl pb-6 text-center">Đăng ký xe</h2>
          <form className="bg-white p-8 space-y-6">
            <div>
              <label className="font-bold text-xl">Biển số xe</label>
              <p className="text-red-500 my-2">
                Lưu ý: Biển số sẽ không thể thay đổi sau khi đăng ký.
              </p>
              <input
                type="text"
                name="licensePlate"
                value={carData.licensePlate}
                onChange={handleChange}
                className="border rounded-lg w-full px-4 py-2"
              />
            </div>
            <div className="mt-6">
              <label className="font-bold text-xl">Hình ảnh</label>
              <p className="text-red-500 my-2">Lưu ý: Tải lên ít nhất một hình ảnh của xe.</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border rounded-lg p-2 mt-2"
              />
              {imgUrl && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(imgUrl)}
                    alt="Car Preview"
                    className="w-36 h-auto rounded-lg border"
                  />
                </div>
              )}
            </div>

            <p className="font-bold text-xl">Thông tin cơ bản</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label>Hãng xe</label>
                <select
                  name="brandKbn"
                  className="border rounded-lg w-full px-4 py-2"
                  onChange={(e) => {
                    handleChange(e);
                    fetchTypeCar(Number(e.target.value));
                  }}
                >
                  <option value="">Chọn hãng xe</option>
                  {brand.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Số ghế</label>
                <input
                  type="number"
                  name="numOfSeat"
                  value={carData.numOfSeat}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div>
                <label>Truyền động</label>
                <select
                  name="driveShaftKbn"
                  value={carData.driveShaftKbn}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                >
                  <option value="1">Số tự động</option>
                  <option value="2">Số sàn</option>
                </select>
              </div>

              <div>
                <label>Mẫu</label>
                <select
                  name="carTypeKbn"
                  value={carData.carTypeKbn}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                >
                  <option value="">Chọn mẫu xe</option>
                  {typeCar.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Loại nhiên liệu</label>
                <select
                  name="fuel"
                  value={carData.fuel}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                >
                  <option value="1">Xăng</option>
                  <option value="2">Điện</option>
                </select>
              </div>

              {/* Additional Input Fields */}
              <div>
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={carData.address}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div>
                <label>Giới hạn KM</label>
                <input
                  type="number"
                  name="limitKm"
                  value={carData.limitKm}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div>
                <label>Giới hạn KM giá</label>
                <input
                  type="number"
                  name="priceLimitKm"
                  value={carData.priceLimitKm}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div>
                <label>Giới hạn KM giao</label>
                <input
                  type="number"
                  name="limitDeliveryKm"
                  value={carData.limitDeliveryKm}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div>
                <label>Giá</label>
                <input
                  type="number"
                  name="price"
                  value={carData.price}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label>Mô tả</label>
              <textarea
                name="description"
                value={carData.description}
                onChange={handleChange}
                className="h-[120px] py-3 px-5 w-full border rounded-lg"
                placeholder="Mô tả về xe..."
              ></textarea>
            </div>

            <div>
              <label>Tính năng</label>
              <ul className="grid w-full gap-6 md:grid-cols-3">
                {features.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={item.id}
                      name="features"
                      value={item.id}
                    />
                    <label htmlFor={item.id}>{item.name}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label>Ghi chú</label>
              <textarea
                name="note"
                value={carData.note}
                onChange={handleChange}
                className="h-[120px] py-3 px-5 w-full border rounded-lg"
                placeholder="Ghi chú..."
              ></textarea>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary text-white text-xl font-semibold rounded-full"
              >
                Đăng ký xe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelfDriver;
