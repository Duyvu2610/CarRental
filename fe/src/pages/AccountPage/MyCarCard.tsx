import { Link } from "react-router-dom";
import { Booking, MyCarDto, Profile } from "../../types/types";
import { baseAxios } from "../../api/axios";
import { useEffect, useState } from "react";
import { convertStringToLocaleDate, convertStringToLocaleDateTime } from "../../utils/helper";
import { on } from "events";

interface MyCarCardProps {
  data: MyCarDto;
  onRejectSuccess: () => void;
onAcceptSuccess: () => void;
}

const MyCarCard: React.FC<MyCarCardProps> = ({ data,onAcceptSuccess, onRejectSuccess }) => {
  const [listUserBooking, setListUserBooking] = useState<Booking[]>([]);
  const [isToggleReload, setIsToggleReload] = useState(false);

  useEffect(() => {
    if (data.state !== 2) {
      baseAxios
        .get(`/user/renting-cars/list?state=${data.state}&carId=${data.id}`)
        .then((res) => {
          setListUserBooking(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data.id, data.state, isToggleReload]);

  const handleReject = (id: number) => {
    baseAxios
      .get(`/profile/booking/reject/${id}`)
      .then(() => {
        alert("Từ chối thành công");
        setIsToggleReload(!isToggleReload);
        onRejectSuccess();
      })
      .catch((error) => {
        alert("Từ chối thất bại");
      });
  };

    const handleAccept = (id: number) => {
        baseAxios
        .get(`/profile/booking/accept/${id}`)
        .then(() => {
            alert("Xác nhận thành công");
            setIsToggleReload(!isToggleReload);
            onAcceptSuccess();
        })
        .catch((error) => {
            alert("Xác nhận thất bại");
        });
    };

  

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={data.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{data.name}</div>
            <div className="text-sm opacity-50">{data.brand}</div>
          </div>
        </div>
      </td>
      <td>
        {data.description}
        <br />
        <button
          onClick={() =>
            (
              document.getElementById(
                `my_modal_${data.id}`
              ) as HTMLDialogElement
            ).showModal()
          }
          className="btn btn-ghost btn-xs"
        >
          Chi tiết
        </button>
        <dialog id={`my_modal_${data.id}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </td>
      <td>
        {data.state === 0 && (
          <div className="badge badge-success gap-2">Chờ xác nhận</div>
        )}
        {data.state === 1 && (
          <div className="badge badge-info gap-2">Đang được thuê</div>
        )}
        {data.state === 2 && (
          <div className="badge badge-error gap-2">Chưa thuê</div>
        )}
      </td>
      <th>
        {data.state !== 2 && (
          <button
            onClick={() =>
              (
                document.getElementById(`modal_${data.id}`) as HTMLDialogElement
              ).showModal()
            }
            className="btn btn-ghost btn-xs"
          >
            Chi tiết
          </button>
        )}
        <dialog id={`modal_${data.id}`} className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">
              {data.state === 0
                ? "Danh sách xe chờ xác nhận"
                : "Xe đang được thuê"}
            </h3>
            <p className="py-4">
              <div className="overflow-x-auto">
                <table className="table table-zebr">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Tên người đặt</th>
                      <th>Thời gian đặt</th>
                      <th>Thời gian checkIn</th>
                      <th>Thời gian checkOut</th>
                      <th>Điểm giao xe</th>
                      {data.state === 0 && <th>Thao tác</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {listUserBooking.map((item, index) => (
                        <tr key={item.id}>
                            <th>{index + 1}</th>
                            <td>{item.customerName}</td>
                            <td>{convertStringToLocaleDateTime(item.bookingDate)}</td>
                            <td>{convertStringToLocaleDate(item.checkin)}</td>
                            <td>{convertStringToLocaleDate(item.checkout)}</td>
                            <td>{item.location}</td>
                            {data.state === 0 && (<td>
                                <button onClick={() => handleAccept(item.id)} className="btn btn-sm btn-primary mr-4">Xác nhận</button>
                                <button onClick={() => handleReject(item.id)} className="btn btn-sm btn-error">Từ chối</button>
                            </td>)}
                        </tr>
                    ))}
                  </tbody>
                </table>
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
      </th>
    </tr>
  );
};

export default MyCarCard;