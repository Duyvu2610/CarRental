import { CiLocationOn } from "react-icons/ci";
import { BookingRequestDto, CarDetails, Feedback } from "../../types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseAxios, callApi } from "../../api/axios";
import Swal from "sweetalert2";
const CarPage: React.FC = () => {
  const { id } = useParams();

  const [car, setCar] = useState<CarDetails>();
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  // value for booking
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [pickupLocation, setPickupLocation] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await callApi(() => baseAxios.get(`/car/${id}`));
        const resFeedback = await callApi(() =>
          baseAxios.get(`/feedback/${id}`)
        );
        setCar(res.data);
        setFeedback(resFeedback.data);
        console.log(resFeedback.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleBooking = async () => {
    if (!car) return;

    const booking: BookingRequestDto = {
      carId: car.id,
      ownerId: car.idOwner,
      location: pickupLocation,
      checkIn: pickupDate,
      checkOut: returnDate,
      // Add other necessary fields here
    };

    console.log(booking);
    await baseAxios
      .post("/booking", booking)
      .then((data) => {
        Swal.fire({
          title: "Success",
          text: "Booking successful!",
          icon: "success",
          confirmButtonText: "Okay",
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Booking failed!';
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <div className="flex justify-between gap-8 mb-8">
        <img
          src={`${car?.imgUrl}`}
          alt="Car"
          className="h-[600px] w-[60%] rounded-2xl object-cover"
        />
        <div className="w-[40%] flex flex-col gap-2">
          <img
            src={`${car?.imgUrl}`}
            alt="Car"
            className="h-[190px] object-cover rounded-2xl"
          />
          <img
            src={`${car?.imgUrl}`}
            alt="Car"
            className="h-[200px] object-cover rounded-2xl"
          />
          <img
            src={`${car?.imgUrl}`}
            alt="Car"
            className="h-[200px] object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="py-4 border-b">
            <h1 className="text-4xl font-semibold uppercase">{car?.name}</h1>
            <p className="text-gray-600 flex items-center my-2">
              <CiLocationOn className="mr-1" />
              {car?.address}
            </p>
            <div className="flex gap-4">
              <p className="mt-2 bg-[#eef7ff] px-2 py-1 my-4 rounded-full text-sm w-fit">
                {car?.driveShaftKbn === 1 ? "Số tự động" : "Số sàn"}
              </p>
              <p className="mt-2 bg-[#fff0cb] px-2 py-1 my-4 rounded-full text-sm w-fit">
                Đặt xe nhanh
              </p>
              <p className="mt-2 bg-[#dff5e7] px-2 py-1 my-4 rounded-full text-sm w-fit">
                Miễn thế chấp
              </p>
              <p className="mt-2 bg-[#cde8ff] px-2 py-1 my-4 rounded-full text-sm w-fit">
                Thuê giờ
              </p>
            </div>
          </div>

          <div className="py-4 border-b">
            <h2 className="text-xl font-semibold">Đặc điểm</h2>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center flex-1">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.9163 7.99992C25.9163 9.05846 25.0582 9.91659 23.9997 9.91659C22.9411 9.91659 22.083 9.05846 22.083 7.99992C22.083 6.94137 22.9411 6.08325 23.9997 6.08325C25.0582 6.08325 25.9163 6.94137 25.9163 7.99992Z"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></path>
                  <circle
                    cx="23.9997"
                    cy="23.9999"
                    r="1.91667"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M17.9163 7.99992C17.9163 9.05846 17.0582 9.91659 15.9997 9.91659C14.9411 9.91659 14.083 9.05846 14.083 7.99992C14.083 6.94137 14.9411 6.08325 15.9997 6.08325C17.0582 6.08325 17.9163 6.94137 17.9163 7.99992Z"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M17.9163 23.9999C17.9163 25.0585 17.0582 25.9166 15.9997 25.9166C14.9411 25.9166 14.083 25.0585 14.083 23.9999C14.083 22.9414 14.9411 22.0833 15.9997 22.0833C17.0582 22.0833 17.9163 22.9414 17.9163 23.9999Z"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></path>
                  <circle
                    cx="7.99967"
                    cy="7.99992"
                    r="1.91667"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M10.1025 26.6666V21.3333H7.99837C7.59559 21.3333 7.25184 21.4053 6.96712 21.5494C6.68066 21.6918 6.46278 21.894 6.31348 22.1562C6.16244 22.4166 6.08691 22.723 6.08691 23.0754C6.08691 23.4296 6.1633 23.7343 6.31608 23.9895C6.46886 24.243 6.69021 24.4374 6.98014 24.5728C7.26834 24.7083 7.6173 24.776 8.02702 24.776H9.43587V23.8697H8.20931C7.99403 23.8697 7.81521 23.8402 7.67285 23.7812C7.53049 23.7221 7.42459 23.6336 7.35514 23.5155C7.28396 23.3975 7.24837 23.2508 7.24837 23.0754C7.24837 22.8984 7.28396 22.7491 7.35514 22.6275C7.42459 22.506 7.53136 22.414 7.67546 22.3515C7.81782 22.2872 7.9975 22.2551 8.21452 22.2551H8.97493V26.6666H10.1025ZM7.22233 24.2395L5.89681 26.6666H7.1416L8.43848 24.2395H7.22233Z"
                    fill="#5FCF86"
                  ></path>
                  <path
                    d="M24 10.6665V15.9998M24 21.3332V15.9998M16 10.6665V21.3332M8 10.6665V15.4998C8 15.776 8.22386 15.9998 8.5 15.9998H24"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <div className="ml-2">
                  <p className="text-gray-400 text-md">Truyền động</p>
                  <p className="font-semibold text-xl">
                    {car?.driveShaftKbn === 1 ? "Số tự động" : "Số sàn"}
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-1">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M14.667 7.35815V9.8901"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M17.334 7.35815V9.8901"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                  ></path>
                </svg>
                <div className="ml-2">
                  <p className="text-gray-400 text-md">Số ghế</p>
                  <p className="font-semibold text-xl">{car?.numOfSeat}</p>
                </div>
              </div>
              <div className="flex items-center flex-1">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.3337 27.2499H7.66699C7.52892 27.2499 7.41699 27.138 7.41699 26.9999V12.4599C7.41699 12.3869 7.44888 12.3175 7.5043 12.27L14.652 6.14344L14.1639 5.574L14.652 6.14344C14.6973 6.1046 14.755 6.08325 14.8147 6.08325H24.3337C24.4717 6.08325 24.5837 6.19518 24.5837 6.33325V26.9999C24.5837 27.138 24.4717 27.2499 24.3337 27.2499Z"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M12.0001 5.33325L7.42285 9.46712"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M17.888 19.5212L16.7708 15.93C16.5378 15.1812 15.4785 15.1798 15.2436 15.928L14.1172 19.5164C13.7178 20.7889 14.6682 22.0833 16.0019 22.0833C17.3335 22.0833 18.2836 20.7927 17.888 19.5212Z"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M23.2503 3.66675V5.66675C23.2503 5.80482 23.1384 5.91675 23.0003 5.91675H14.667C14.5827 5.91675 14.5365 5.8916 14.5072 5.86702C14.4721 5.83755 14.44 5.78953 14.4245 5.72738C14.4089 5.66524 14.4147 5.60775 14.4318 5.56523C14.4461 5.52975 14.4749 5.48584 14.5493 5.44616L18.2993 3.44616C18.3356 3.42685 18.376 3.41675 18.417 3.41675H23.0003C23.1384 3.41675 23.2503 3.52868 23.2503 3.66675Z"
                    stroke="#5FCF86"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <div className="ml-2">
                  <p className="text-gray-400 text-md">Nhiên liệu</p>
                  <p className="font-semibold text-xl">
                    {car?.fuel === "1"
                      ? "Xăng"
                      : car?.fuel === "2"
                      ? "Điện"
                      : "Dầu"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-4 border-b">
            <h2 className="text-xl font-semibold my-2">Mô tả</h2>
            <p className="text-[#767676]">{car?.description}</p>
          </div>

          <div className="py-4 border-b">
            <h2 className="text-xl font-semibold mb-4">Các tiện nghi khác</h2>
            <ul className="grid grid-cols-4 gap-y-6">
              {car?.listFeature.map((feature, index) => (
                <li key={index} className="flex gap-2">
                  <img
                    className="w-6 h-6"
                    loading="lazy"
                    src={feature.icon}
                    alt={feature.name}
                  />
                  {feature.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="py-4">
            <h2 className="text-xl font-semibold">Đánh giá sản phẩm</h2>
            {feedback && feedback.length > 0 ? (
              <ul>
                {feedback.map((cmt, index) => (
                  <li key={index} className="border-b py-2 flex gap-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded">
                        <img
                          src={cmt.customerImg}
                          alt="Tailwind-CSS-Avatar-component"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-center">
                        <span>{cmt.customerName}</span>
                        <div className="rating ml-4">
                          {Array.from({ length: cmt.danhgia }).map((_, i) => (
                            <input
                              key={i}
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              disabled
                            />
                          ))}
                        </div>
                      </div>
                      <p className="flex items-center mt-1">{cmt.noidung}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="my-4">Chưa có đánh giá nào</p>
            )}
          </div>
        </div>

        <div>
          <div className="p-4 mb-4 bg-[#f7fbff] rounded-lg">
            <h4 className="text-xl font-bold mb-3">
              <span className="text-3xl">{car?.price}</span>{" "}
              <span className="text-lg text-gray-400">VND / ngày</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label>Nhận xe</label>
                <input
                  type="date"
                  value={pickupDate.toISOString().split("T")[0]}
                  onChange={(e) => setPickupDate(new Date(e.target.value))}
                  placeholder="Ngày checkin"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label>Trả xe</label>
                <input
                  type="date"
                  value={returnDate.toISOString().split("T")[0]}
                  placeholder="Ngày checkout"
                  onChange={(e) => setReturnDate(new Date(e.target.value))}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <label>Địa điểm nhận xe</label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Vị trí giao"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Đơn giá thuê</span>
              <span>{car?.price}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Phí dịch vụ</span>
              <span>{((car?.price ?? 0) * 0.13).toFixed(0)}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Tổng phí thuê xe</span>
              <span>{((car?.price ?? 0) * 1.13).toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold py-2">
              <span>Tổng cộng</span>
              <span>{((car?.price ?? 0) * 1.13).toFixed(0)}</span>
            </div>
            <button
              onClick={handleBooking}
              className="w-full mt-3 bg-[#5fcf86] text-white px-2 py-4 rounded flex justify-center items-center"
            >
              <svg
                className="mr-2"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9733 7.70015L8.46667 14.2668C8.29334 14.5268 8.01335 14.6668 7.71335 14.6668C7.62002 14.6668 7.52667 14.6535 7.43334 14.6268C7.05334 14.5068 6.79335 14.1668 6.79335 13.7735V10.0135C6.79335 9.86015 6.64667 9.72682 6.46667 9.72682L3.78001 9.6935C3.44001 9.6935 3.12668 9.50016 2.97335 9.20682C2.82668 8.92016 2.84668 8.5735 3.03335 8.30017L7.53335 1.7335C7.76001 1.40016 8.18001 1.25349 8.56668 1.37349C8.94668 1.49349 9.20668 1.83349 9.20668 2.22682V5.98683C9.20668 6.14017 9.35335 6.2735 9.53335 6.2735L12.22 6.30682C12.56 6.30682 12.8733 6.49349 13.0267 6.79349C13.1733 7.08016 13.1533 7.42682 12.9733 7.70015Z"
                  fill="#FFC634"
                ></path>
              </svg>
              CHỌN THUÊ
            </button>
          </div>

          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold text-primary">
              Phụ phí có thể phát sinh
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex text-sm gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7.33398V10.4407"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                    fill="#666666"
                  ></path>
                  <path
                    d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex justify-between flex-col">
                  <div className="flex justify-between font-semibold">
                    <span>Phí vượt giới hạn</span>
                    <span>5000 đ/km</span>
                  </div>
                  <span className="text-sm text-[#666666]">
                    Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 400km khi
                    thuê xe 1 ngày
                  </span>
                </div>
              </li>
              <li className="flex text-sm gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7.33398V10.4407"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                    fill="#666666"
                  ></path>
                  <path
                    d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex justify-between flex-col">
                  <div className="flex justify-between font-semibold">
                    <span>Phí quá giờ</span>
                    <span>70000 đ/h</span>
                  </div>
                  <span className="text-sm text-[#666666]">
                    Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ
                    quá 5 giờ, phụ phí thêm 1 ngày thuê
                  </span>
                </div>
              </li>
              <li className="flex text-sm gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7.33398V10.4407"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                    fill="#666666"
                  ></path>
                  <path
                    d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex justify-between flex-col">
                  <div className="flex justify-between font-semibold">
                    <span>Phí vệ sinh</span>
                    <span>120000 đ</span>
                  </div>
                  <span className="text-sm text-[#666666]">
                    Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh
                    (nhiều vết bẩn, bùn cát, sình lầy...)
                  </span>
                </div>
              </li>
              <li className="flex text-sm gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7.33398V10.4407"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                    fill="#666666"
                  ></path>
                  <path
                    d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex justify-between flex-col">
                  <div className="flex justify-between font-semibold">
                    <span>Phí khử mùi</span>
                    <span>100000 đ</span>
                  </div>
                  <span className="text-sm text-[#666666]">
                    Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi
                    thuốc lá, thực phẩm nặng mùi...)
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
