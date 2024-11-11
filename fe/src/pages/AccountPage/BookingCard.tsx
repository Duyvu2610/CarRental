import { Link } from "react-router-dom";
import { Booking } from "../../types/types";
import { baseAxios } from "../../api/axios";
import { convertStringToLocaleDateTime } from "../../utils/helper";
import { useState } from "react";

interface BookingCardProps {
  data: Booking;
  onDedeleteSuccess: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  data,
  onDedeleteSuccess,
}) => {
    const [isPaid, setIsPaid] = useState<boolean>(false);

    // Xử lý thanh toán khi nhấn nút
    const handlePayment = () => {
      // Tạo các thao tác thanh toán tại đây (ví dụ: gọi API)
      setIsPaid(true);
    };


  const handleCancelBooking = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn thuê xe này không?")) {
      baseAxios
        .delete(`/profile/booking/${data.id}`)
        .then(() => {
          alert("Hủy đơn thuê xe thành công");
          onDedeleteSuccess();
        })
        .catch((error) => {
          alert("Hủy đơn thuê xe thất bại");
        });
    }
  };
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <Link to={`/car/` + data.idCar}>
        <img
          src={data.imageCar}
          alt="Car img"
          className="w-96 h-full object-cover"
        />
      </Link>
      <div className="card-body">
        <h2 className="card-title">{data.nameCar}</h2>
        <p>
          <span className="font-semibold">Điểm nhận xe: </span>
          {data.location}
        </p>
        <p>
          <span className="font-semibold">Ngày đặt: </span>
          {convertStringToLocaleDateTime(data.bookingDate)}
        </p>
        <p>
          <span className="font-semibold">Ngày checkin: </span>
          {convertStringToLocaleDateTime(data.checkin)}
        </p>
        <p>
          <span className="font-semibold">Ngày checkout: </span>
          {convertStringToLocaleDateTime(data.checkout)}
        </p>
        <div className="card-actions justify-end">
          {data.state === 0 && (
            <button onClick={handleCancelBooking} className="btn btn-primary">
              Hủy đơn
            </button>
          )}
          {data.state === 1 && (
            <>
              <button
                className="btn"
                onClick={() =>
                  (
                    document.getElementById(`modal_pay`) as HTMLDialogElement
                  ).showModal()
                }
              >
                Thanh Toán
              </button>
              <dialog id="modal_pay" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                  <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Thanh Toán Hóa Đơn</h2>

      {/* Thông tin khách hàng */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Thông tin khách hàng</h3>
        <p>ID Khách hàng: 1</p>
        <p>Tên: 1</p>
        <p>Email: 1</p>
      </div>

      {/* Thông tin chủ xe */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Thông tin chủ xe</h3>
        <p>ID Chủ xe: 1</p>
      </div>

      {/* Thông tin đặt xe */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Thông tin đặt xe</h3>
        <p>ID Đặt xe: 1</p>
        <p>Ngày thanh toán: 1</p>
      </div>

      {/* Tổng tiền */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Tổng tiền</h3>
        <p className="text-2xl font-bold text-blue-600">1 VND</p>
      </div>

      {/* Nút thanh toán */}
      <button
        onClick={handlePayment}
        className={`w-full py-2 mt-4 text-white font-semibold rounded ${
          isPaid ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={isPaid}
      >
        {isPaid ? 'Đã Thanh Toán' : 'Thanh Toán'}
      </button>

      {/* Thông báo thanh toán thành công */}
      {isPaid && <p className="mt-4 text-center text-green-600 font-semibold">Thanh toán thành công!</p>}
    </div>
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          )}
          {data.state === 2 && (
            <button className="btn btn-primary">Đã hủy</button>
          )}
          {data.state === 3 && (
            <button className="btn btn-primary">Đã trả</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
