import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { baseAxios } from "../../api/axios";

// Xác thực với Yup
const UserSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
});

interface FormUserProps {
    onRegisterSuccess: () => void;
}


const FormUser = ({onRegisterSuccess}: FormUserProps) => {
  return (
    <div className="mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký người dùng</h2>

      <Formik
        initialValues={{ email: "", password: "123456a" }}
        validationSchema={UserSchema}
        onSubmit={(values, { resetForm }) => {
          baseAxios.post("/auth/register", values)
            .then(() => {
              Swal.fire({
                title: "Thành công!",
                text: "Người dùng đã được đăng ký thành công.",
                icon: "success",
                confirmButtonText: "OK",
              });
              resetForm();
                onRegisterSuccess();
            })
            .catch((error) => {
              Swal.fire({
                title: "Thất bại!",
                text: "Người dùng đã được đăng ký trước đó.",
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        }}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Nhập email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Mật khẩu mặc định */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Mật khẩu
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              value="123456a"
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="btn"
          >
            Đăng ký người dùng
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormUser;