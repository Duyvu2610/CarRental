import { useEffect, useState } from "react";
import { getPullDownBranch } from "../../api/carApi";
import BrandPullDown from "../../interfaces/car";
import { baseAxios, callApi } from "../../api/axios";
import { Feature } from "../../types/types";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import Swal from "sweetalert2";

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
  featureList?: number[];
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
    fuel: "1",
    description: "",
    note: "",
    address: "",
    limitKm: 0,
    priceLimitKm: 0,
    imgUrl: "",
    limitDeliveryKm: 0,
    price: 0,
  });

  const [uploading, setUploading] = useState(false);
  const [listFeature, setListFeature] = useState<number[]>([]);


  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const cld = new Cloudinary({ cloud: { cloudName: "dnp8wwi3r" } });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (carData.limitKm < 0 || carData.priceLimitKm < 0 || carData.limitDeliveryKm < 0 || carData.price < 0) {
        Swal.fire({
          title: "Lỗi",
          text: "Giá trị không hợp lệ",
          icon: "error",
          confirmButtonText: "Okay",
        });
        return;
      }
      setUploading(true);
      const urlImg = await handleUpload();
      const carDataBody = {
        ...carData,
        imgUrl: urlImg,
        featureList: listFeature,
      };
      const res = await baseAxios.post("/car", carDataBody);

      console.log(res.data);
      Swal.fire({
        title: "Thành công",
        text: "Cập nhật thông tin thành công",
        icon: "success",
        confirmButtonText: "Okay",
      });
    } catch (error) {
    } finally {
      setUploading(false);
    }
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListFeature((prev) => {
      if (e.target.checked) {
        return [...prev, Number(e.target.value)];
      } else {
        return prev.filter((item) => item !== Number(e.target.value));
      }
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnp8wwi3r/image/upload`,
        formData
      );
      const publicId = response.data.public_id;
      const secureUrl = response.data.secure_url;

      setUploadedImageId(publicId);
      setUploading(false);
      return secureUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      setError("Failed to upload image.");
    }
  };

  const uploadedImg = uploadedImageId
    ? cld
        .image(uploadedImageId)
        .format("auto")
        .quality("auto")
        .resize(auto().gravity(autoGravity()).width(500).height(500))
    : null;

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
              <p className="text-red-500 my-2">
                Lưu ý: Tải lên ít nhất một hình ảnh của xe.
              </p>
              <div>
                <input type="file" onChange={handleFileChange} />
                {uploading && <p>Uploading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                {uploadedImg && (
                  <div>
                    <AdvancedImage
                      cldImg={uploadedImg}
                      className="w-32 rounded avatar"
                    />
                  </div>
                )}
              </div>
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
                  <option value="3">Dầu</option>
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
                  min="0"
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
                  min="0"
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
                  min="0"
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
                  min="0"
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
                      onChange={handleFeatureChange}
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
                disabled={uploading}
                className="px-6 py-2 bg-primary text-white text-xl font-semibold rounded-full"
              >
                {uploading ? "Đang tải..." : "Đăng ký xe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelfDriver;
