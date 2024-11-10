import React, { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import {baseAxios} from '../../api/axios';
import { CarInfo } from '../../types/types';
import Loading from '../../components/Loading/Loading';

const ProductSection = () => {
  const [data, setData] = useState<CarInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await baseAxios.get('/car');
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <Loading/>;
  }
  return (
    <div className="product bg-gray-100 p-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="title-section text-center mb-6">
          <h2 className="text-3xl font-bold">Xe dành cho bạn</h2>
        </div>
        <div className="grid grid-cols-4">
          {data.map((item) => (
            <div key={item.id} className="col-span-1 px-4 mb-6 relative">
              <div className="h-96 p-4 border bg-white shadow-sm rounded-lg">
                <div className='absolute top-6 left-12 text-white bg-[#0c0c0c80] py-1 px-2 rounded-full text-sm flex justify-center items-center'>
                    Đặt xe nhanh
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9733 7.70015L8.46667 14.2668C8.29334 14.5268 8.01335 14.6668 7.71335 14.6668C7.62002 14.6668 7.52667 14.6535 7.43334 14.6268C7.05334 14.5068 6.79335 14.1668 6.79335 13.7735V10.0135C6.79335 9.86015 6.64667 9.72682 6.46667 9.72682L3.78001 9.6935C3.44001 9.6935 3.12668 9.50016 2.97335 9.20682C2.82668 8.92016 2.84668 8.5735 3.03335 8.30017L7.53335 1.7335C7.76001 1.40016 8.18001 1.25349 8.56668 1.37349C8.94668 1.49349 9.20668 1.83349 9.20668 2.22682V5.98683C9.20668 6.14017 9.35335 6.2735 9.53335 6.2735L12.22 6.30682C12.56 6.30682 12.8733 6.49349 13.0267 6.79349C13.1733 7.08016 13.1533 7.42682 12.9733 7.70015Z" fill="#FFC634"></path></svg>
                </div>
                <div className="item-pic">
                  <div className="bg">
                    <a
                      href={`/car/${item.id}`}
                      className="block"
                    >
                      <img
                        src={`${item.imgUrl}`}
                        alt={item.name}
                        className="w-full h-44 object-cover rounded-lg"
                      />
                    </a>
                  </div>
                </div>
                <div className="bg-[#eef7ff] px-2 py-1 my-4 rounded-full font-medium text-sm w-fit">
                  {item.driveShaftKbn === 1 ? 'Số tự động' : 'Số sàn'}
                </div>
                <div className="product-item-name font-semibold text-lg uppercase my-2">
                  {item.name}
                </div>
                <div className="flex justify-between items-center gap-2 text-[#767676] font-medium text-sm">
                  <div className="location flex items-center justify-center">
                    <CiLocationOn className="mr-1" />
                    <p>{item.address}</p>
                  </div>
                </div>
                <div className="line-item border-b border-gray-200 my-3"></div>
                <p className="product-item-price text-lg font-bold text-primary">
                  {item.price} VNĐ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
