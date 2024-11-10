interface Item {
    Id: number;
    IdChuXe: number;
    Imgxe: string;
    TruyenDong: number; // 1: số tự động, 0: số sàn
    Name: string;
    Loca: string;
    Gia: string; // Hoặc số nếu cần tính toán
}

export default Item;