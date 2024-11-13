import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Profile } from '../../types/types';
import { baseAxios } from '../../api/axios';
import Swal from 'sweetalert2';
import { Form } from 'react-router-dom';
import FormFeature from './FormFeature';
import FormBrand from './FormBrand';

const AdminPage = () => {
  const [topCarOwners, setTopCarOwners] = useState<any[]>([]);
  const [userAccounts, setUserAccounts] = useState<Profile[]>([]);
  const [rentersCount, setRentersCount] = useState(0);
  const [ownersCount, setOwnersCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [renters, setRenters] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>({});
  const [isReload, setIsReload] = useState<boolean>(false);

  useEffect(() =>  {

    fetchDashboardData();
    fetchUserAccounts();
    fetchRentals();
    fetchCarOwner();
    fetchStatis();
  }, [isLoading, isReload]);

  const fetchUserAccounts = async () => {
    try {
      const response = await baseAxios.get('/user');
      setUserAccounts(response.data);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  }

  const fetchRentals = async () => {
    try {
      const response = await baseAxios.get('/admin/top-user');
      setRenters(response.data);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  }

  const fetchCarOwner = async () => {
    try {
      const response = await baseAxios.get('/admin/top-owner');
      setTopCarOwners(response.data);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  }

  const fetchStatis = async () => {
    try {
      const response = await baseAxios.get('/admin/statistics');
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  }



  const fetchDashboardData = async () => {
    try {
      
      setRentersCount(rentersCount);
      setOwnersCount(ownersCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteUserAccount = async (userId: number) => {
    try {
      await baseAxios.delete(`/user/${userId}`);
      setIsLoading(!isLoading);
      Swal.fire({
        title: "Thành công",
        text: "Xóa tài khoản thành công",
        icon: "success",
        confirmButtonText: "Okay",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Trang Admin</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Top người cho thuê</h2>
          <ul className='max-h-[100px] overflow-auto'>
            {topCarOwners.map((owner, index) => (
              <li key={index} className="mb-2">
                {owner.name} - {owner.rentals} đơn đã cho thuê
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Top người thuê</h2>
          <ul className='max-h-[100px] overflow-auto'>
            {renters.map((renter, index) => (
              <li key={index} className="mb-2">
                {renter.name} - {renter.rentals} đơn đã thuê
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Thống kê người dùng</h2>
          <p>Người thuê xe: {statistics.rentersCount} người</p>
          <p>Người cho thuê: {statistics.ownersCount} người</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 my-8">
      <FormFeature onRegisterSuccess={() => setIsReload(!isReload)}/>
      <FormBrand />
      </div>

      {/* User Accounts Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Quản lý tài khoản người dùng</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.map((user) => (
              <tr key={user.idUser}>
                <td className="p-2 border">{user.idUser}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <button
                    className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => deleteUserAccount(user.idUser)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default AdminPage;
