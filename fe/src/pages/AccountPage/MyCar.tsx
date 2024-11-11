import { useEffect, useState } from "react";
import { MyCarDto } from "../../types/types";
import { baseAxios } from "../../api/axios";
import MyCarCard from "./MyCarCard";

const MyCar: React.FC = () => {
  const [carList, setCarList] = useState<MyCarDto[]>([]);
  const [isToggleReload, setIsToggleReload] = useState(false);

  useEffect(() => {
    baseAxios
      .get("/profile/my-car")
      .then((res) => {
        setCarList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isToggleReload]);

  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Xe của tôi</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Tên xe</th>
              <th>Thông tin xe</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carList.map((item) => (
              <MyCarCard
                key={item.id}
                data={item}
                onAcceptSuccess={() => setIsToggleReload(!isToggleReload)}
                onRejectSuccess={() => setIsToggleReload(!isToggleReload)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCar;
