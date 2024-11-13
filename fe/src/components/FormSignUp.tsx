import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseAxios } from '../api/axios';
import Swal from 'sweetalert2';

interface FormSignUpProps {
  onClickLogin: () => void;
}

const FormSignUp: FC<FormSignUpProps> = ({ onClickLogin }) => {
   // Định nghĩa schema validation với Yup
   const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
    password: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .matches(/[a-zA-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái')
      .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 chữ số')
      .required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'),], 'Mật khẩu nhập lại không khớp')
      .required('Vui lòng nhập lại mật khẩu'),
  });

  // Khởi tạo formik với cấu hình ban đầu và schema validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      baseAxios.post('/auth/register', values)
        .then(() => {
          Swal.fire({
            title: "Thành công",
            text: "Đăng ký thành công",
            icon: "success",
            confirmButtonText: "Okay",
          });
          onClickLogin();
        })
        .catch((error) => {
          Swal.fire({
            title: "Thất bại",
            text: "Dăng ký thất bại",
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
        <h2 className="mb-6 text-2xl font-bold text-center">Đăng ký</h2>
        
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="confirmPassword">
              Nhập lại mật khẩu
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="mt-1 text-sm text-red-500">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-primary rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Đăng ký
          </button>
        </form>

        {/* Link to login page */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <button className="text-primary hover:underline" onClick={onClickLogin}>
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default FormSignUp;
