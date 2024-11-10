import React from 'react';
import Item from '../../interfaces/Item';

interface ProductSectionProps {
    items: Item[];
}

const items: Item[] = [
    {
        Id: 1,
        IdChuXe: 101,
        Imgxe: 'car1.jpg',
        TruyenDong: 1,
        Name: 'Xe Hơi 1',
        Loca: 'Hà Nội',
        Gia: '500 triệu'
    },
    {
        Id: 2,
        IdChuXe: 102,
        Imgxe: 'car2.jpg',
        TruyenDong: 0,
        Name: 'Xe Hơi 2',
        Loca: 'TP.HCM',
        Gia: '400 triệu'
    },
    // Thêm các item khác
];

const ProductSection: React.FC<ProductSectionProps> = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
                <div key={item.Id} className="col-span-1 p-2 mb-2">
                    <div className="h-96 p-4 rounded-lg bg-white border border-gray-300">
                        <div className="relative">
                            <a
                                href={`/home/detail/${item.Id}?idowner=${item.IdChuXe}`}
                                className="block"
                            >
                                <img
                                    src={`/Upload/${item.Imgxe}`}
                                    alt={item.Name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </a>
                        </div>
                        <div className="bg-blue-100 px-2 py-1 rounded-full text-xs font-medium">
                            {item.TruyenDong === 1 ? (
                                <span>Số tự động</span>
                            ) : (
                                <span>Số sàn</span>
                            )}
                        </div>
                        <div className="my-2 font-bold text-lg text-black overflow-hidden text-ellipsis">
                            {item.Name}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="ml-1">{item.Loca}</p>
                        </div>
                        <div className="my-3 border-b border-gray-300"></div>
                        <p className="font-bold text-lg text-green-500">{item.Gia}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductSection;
