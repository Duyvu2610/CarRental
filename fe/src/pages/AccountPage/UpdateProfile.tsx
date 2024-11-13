import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseAxios } from '../../api/axios';
import { Profile, ProfileRequestDto } from '../../types/types';
import Swal from 'sweetalert2';

interface UpdateProps {
    onUpdateSuccess: () => void;
    data : Profile
  }

const FormUpdateUser: FC<UpdateProps> = ({onUpdateSuccess, data}) => {
  // Schema validation with Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Vui lòng nhập tên người dùng'),
    identityCard: Yup.string()
      .required('Vui lòng nhập số căn cước công dân'),
    drivingLicense: Yup.string()
      .required('Vui lòng nhập bằng lái xe'),
    gender: Yup.number()
      .oneOf([0, 1, 2], 'Giới tính không hợp lệ')
      .required('Vui lòng chọn giới tính'),
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại'),
  });

  // Initialize formik with initial configuration and validation schema
  const formik = useFormik({
    initialValues: {
      name: data.name,
      identityCard: data.cccd,
      drivingLicense: data.gplx,
      dob: data.ngaysinh,
      gender: data.gioiTinh,
      phone: data.phone,
    },
    validationSchema,
    onSubmit: (values) => {
      baseAxios.put('/profile', values)
        .then(() => {
          Swal.fire({
            title: "Thành công",
            text: "Cập nhật thông tin thành công",
            icon: "success",
            confirmButtonText: "Okay",
          });
          onUpdateSuccess();
        })
        .catch((error) => {
          Swal.fire({
            title: "Thất bại",
            text: "Cập nhật thông tin thất bại",
            icon: "error",
            confirmButtonText: "Okay",
          });
          console.error(error);
        });
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white">
        <h2 className="mb-6 text-2xl font-bold text-center">Cập nhật thông tin người dùng</h2>
        
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="name">
              Tên người dùng
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="mt-1 text-sm text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>

          {/* Identity Card */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="identityCard">
              Số căn cước công dân
            </label>
            <input
              id="identityCard"
              name="identityCard"
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.identityCard}
            />
            {formik.touched.identityCard && formik.errors.identityCard ? (
              <div className="mt-1 text-sm text-red-500">{formik.errors.identityCard}</div>
            ) : null}
          </div>

          {/* Driving License */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="drivingLicense">
              Bằng lái xe
            </label>
            <input
              id="drivingLicense"
              name="drivingLicense"
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.drivingLicense}
            />
            {formik.touched.drivingLicense && formik.errors.drivingLicense ? (
              <div className="mt-1 text-sm text-red-500">{formik.errors.drivingLicense}</div>
            ) : null}
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="dob">
              Ngày sinh
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dob.toString().split('T')[0]}
            />
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="gender">
              Giới tính
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
            >
              <option value="">Chọn giới tính</option>
              <option value="1">Nam</option>
              <option value="2">Nữ</option>
              <option value="3">Khác</option>
            </select>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="mt-1 text-sm text-red-500">{formik.errors.gender}</div>
            ) : null}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="mt-1 text-sm text-red-500">{formik.errors.phone}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-primary rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Cập nhật
          </button>

        </form>
      </div>
    </div>
  );
};

export default FormUpdateUser;
