import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Profile } from '../../types/types';
import { baseAxios } from '../../api/axios';

const AdminPage = () => {
  const [topCarOwners, setTopCarOwners] = useState([]);
  const [topRenters, setTopRenters] = useState([]);
  const [serviceRevenue, setServiceRevenue] = useState(0);
  const [userAccounts, setUserAccounts] = useState<Profile[]>([]);
  const [rentersCount, setRentersCount] = useState(0);
  const [ownersCount, setOwnersCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>  {

    fetchDashboardData();
    fetchUserAccounts();
  }, [isLoading]);

  const fetchUserAccounts = async () => {
    try {
      const response = await baseAxios.get('/user');
      setUserAccounts(response.data);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  }

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      
      const { carOwners, renters, revenue, accounts, rentersCount, ownersCount } = response.data;

      setTopCarOwners(carOwners);
      setTopRenters(renters);
      setServiceRevenue(revenue);
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
      alert("User account deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Top Car Owners</h2>
          <ul>
            {topCarOwners.map((owner, index) => (
              <li key={index} className="mb-2">
                {/* {owner.name} - {owner.rentals} rentals */}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Top Renters</h2>
          <ul>
            {topRenters.map((renter, index) => (
              <li key={index} className="mb-2">
                {/* {renter.name} - {renter.rentals} rentals */}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Service Revenue</h2>
          <p className="text-2xl font-bold">${serviceRevenue}</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Customer Statistics</h2>
          <p>Renters: {rentersCount}</p>
          <p>Car Owners: {ownersCount}</p>
        </div>
      </div>

      {/* User Accounts Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
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
