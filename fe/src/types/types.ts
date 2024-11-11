import { ReactNode } from "react";

export interface Product {
  id: number;
  image: string;
  description: string;
  detail: string;
  name: string;
  rating: number;
  price: number;
  quantitySold: number;
  remainingQuantity: number;
  category: string;
  date: string;
}

export interface Review {
  id: number;
  userId: number,
  userName: string,
  content: string,
  rating: number;
  updated: [number, number, number, number, number, number, number]
}

export interface RoomData {
  data: Room[];
}

export interface MeetingData {
  code: number;
  data: {
    sessionId: string;
    start: string;
    end: string | null;
    meetingId: string;
    duration: number;
    links: {
      get_room: string;
      get_session: string;
    };
    playbackHlsUrl: string;
    id: string;
  };
}

export interface Room {
  roomId: string;
  customRoomId: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
    name: string;
    discontinuedReason: string | null;
    id: string;
  };
  id: string;
  links: {
    get_room: string;
    get_session: string;
  };
}

export interface Meta {
  createdAt: string;
  width: number;
  height: number;
  format: string;
}

export interface ThumbnailResponse {
  message: string;
  roomId: string;
  meta: Meta;
  filePath: string;
  fileSize: number;
  fileName: string;
}

export interface ChatHistory {
  role: string;
  content: string;
}

export interface CardInfo {
  price: number;
  quantity: number;
  productName: string
  id: number;
  productId: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface CartItem {
  id?: number;
  productId: number;
  quantity: number;
}

export interface CartRequestDto {
  userId: number;
  productId?: number;
  quantity: number;
}

export interface ReviewRequestDto {
  userId: number|null;
  productId: number|null;
  content: string;
  rating: number;
}

export interface GetCartReponseDto {
  cartId: number;
  productImage: string;
  price: number;
  productName: string;
  quantity: number;
  productId: number;
  remainingQuantity: number;
}

export interface Cart {
  id: string;
  listCartItem: Array<CartItem>;
}


export interface SignUpInfo {
  name: string;
  email: string; 
  password: string; 
}

export interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  children: ReactNode;
}

export interface GetUserInfoDto {
  id: number;
  name: string;
  email: string;
}

export interface CarInfo {
  id: number;
  idOwner: number;
  name: string;
  imgUrl: string;
  address: string;
  driveShaftKbn: number;
  numOfSeat: number;
  fuel: string;
  description: string;
  listFeature: any[];
  price: number;
}

export interface Feature {
  name: string;
  icon: string;
}

export interface CarDetails {
  name: string;
  id: number;
  idOwner: number;
  imgUrl: string;
  address: string;
  driveShaftKbn: number;
  numOfSeat: number;
  fuel: string;
  description: string;
  listFeature: Feature[];
  price: number;
}

export interface Feedback {
  customerName: string;
  customerImg: string;
  date: Date;
  noidung: string;
  danhgia: number;
}

export interface BookingRequestDto {
  carId: number;
  ownerId: number;
  location: string;
  checkIn: Date;
  checkOut: Date;
}

export interface ProfileRequestDto {
  name: string;
  identityCard: number;
  drivingLicense: string;
  dob: Date;
  // 1: Nam, 2: Nu, 3: Khac
  gender: number;
}

export interface Profile {
  idUser: number;
  name: string;
  cccd: string;
  gplx: string;
  imgGplx: string;
  img: string;
  ngaysinh: Date;
  // 1: Nam, 2: Nu, 3: Khac
  gioiTinh: number;
  createdDate: Date;
  phone: string
  email: string;

}

export interface Booking {
  id: number;
  idCar: number;
  idCustomer: number;
  idOwner: number;
  location: string;
  bookingDate: Date;
  checkin: Date;
  checkout: Date;
  state: number;
  imageCar: string;
  nameCar: string;
  customerName: string;
}

export interface MyCarDto {
  id: number;
  name: string;
  brand: string;
  image: string;
  description: string;
  state: number;
}

export interface CarRequestDto {
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