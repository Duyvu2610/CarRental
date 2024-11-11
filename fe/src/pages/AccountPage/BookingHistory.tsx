import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import { Booking } from "../../types/types";
import { baseAxios } from "../../api/axios";

const BookingHistory: React.FC = () => {
  const tab = [
    { title: "Xe đang chờ xác nhận" },
    { title: "Xe đang thuê" },
    { title: "Xe đã hủy" },
    { title: "Xe đã trả" },
  ];

  const [activeTab, setActiveTab] = useState<number>(0);
  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    baseAxios.get(`/profile/history/booking?status=${activeTab}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
  }, [activeTab]);

  const handleChangeTab = (index: number) => {
    setActiveTab(index);
  };

  const handleDeleteSuccess = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Lịch sử đặt xe</h1>
      <div role="tablist" className="tabs tabs-lifted my-4">
        {tab.map((item, index) => (
          <button
            onClick={() => handleChangeTab(index)}
            role="tab"
            className={index === activeTab ? "tab tab-active" : "tab"}
            key={index}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {data.map((item) => (
            <BookingCard key={item.id} data={item} onDedeleteSuccess={() => handleDeleteSuccess(item.id)}/>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
