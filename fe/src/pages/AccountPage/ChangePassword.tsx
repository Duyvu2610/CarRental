import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { baseAxios } from '../../api/axios';
import Swal from 'sweetalert2';

const ChangePassword: React.FC = () => {
  // Validation schema
  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu cũ'),
    newPassword: Yup.string()
      .min(6, 'Mật khẩu mới phải ít nhất 6 ký tự')
      .matches(/[A-Za-z]/, 'Mật khẩu mới phải bao gồm cả chữ')
      .matches(/[0-9]/, 'Mật khẩu mới phải bao gồm cả số')
      .required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
      .required('Vui lòng xác nhận lại mật khẩu mới'),
  });

  // Initial values
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  // Handle form submission
  const handleSubmit = (values: typeof initialValues) => {
    baseAxios.post('/auth/password', values)
        .then(() => {
          Swal.fire({
            title: "Thành công",
            text: "Đổi mật khẩu thành công",
            icon: "success",
            confirmButtonText: "Okay",
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Đổi mật khẩu thất bại",
            icon: "error",
            confirmButtonText: "Okay",
          });
        });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="font-bold text-3xl mb-6 text-center">Đổi mật khẩu</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block font-semibold text-gray-700" htmlFor="oldPassword">
              Mật khẩu cũ
            </label>
            <Field
              name="oldPassword"
              type="password"
              placeholder="Nhập mật khẩu cũ"
              className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
          </div>

          {/* New Password */}
          <div>
            <label className="block font-semibold text-gray-700" htmlFor="newPassword">
              Mật khẩu mới
            </label>
            <Field
              name="newPassword"
              type="password"
              placeholder="Nhập mật khẩu mới"
              className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block font-semibold text-gray-700" htmlFor="confirmPassword">
              Xác nhận mật khẩu mới
            </label>
            <Field
              name="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Đổi mật khẩu
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
