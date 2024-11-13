import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { baseAxios, callApi } from "../../api/axios";
import BrandPullDown from "../../interfaces/car";
import { getPullDownBranch } from "../../api/carApi";
import FormUser from "./FormUser";

// Xác thực với Yup
const FeatureSchema = Yup.object().shape({
  name: Yup.string().required("Tên tính năng là bắt buộc"),
  icon: Yup.string()
    .url("URL biểu tượng không hợp lệ")
    .required("Biểu tượng là bắt buộc"),
});

interface FormUserProps {
    onRegisterSuccess: () => void;
}

const FeatureRegistrationForm = ({onRegisterSuccess}: FormUserProps) => {

  return (
    <div className="mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký tính năng</h2>

      <Formik
        initialValues={{ name: "", description: "", icon: "" }}
        validationSchema={FeatureSchema}
        onSubmit={(values, { resetForm }) => {
          baseAxios.post("/feature", values).then(() => {

            // Xử lý khi submit thành công, ví dụ như gọi API hoặc hiển thị thông báo
            Swal.fire({
              title: "Thành công!",
              text: "Tính năng đã được đăng ký thành công.",
              icon: "success",
              confirmButtonText: "OK",
            });
            resetForm();
          });
        }}
      >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-1"
              >
                Tên tính năng
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Nhập tên tính năng"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="icon"
                className="block text-gray-700 font-semibold mb-1"
              >
                Biểu tượng (URL)
              </label>
              <Field
                type="text"
                name="icon"
                id="icon"
                placeholder="Nhập URL biểu tượng"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="icon"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="btn "
            >
               Đăng ký tính năng
            </button>
          </Form>
      </Formik>
      <FormUser onRegisterSuccess={onRegisterSuccess}/>
    </div>
    
  );
};

export default FeatureRegistrationForm;
