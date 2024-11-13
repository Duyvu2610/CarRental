import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { baseAxios, callApi } from "../../api/axios";
import { getPullDownBranch } from "../../api/carApi";
import BrandPullDown from "../../interfaces/car";

// Xác thực với Yup
const CarTypeSchema = Yup.object().shape({
  brandId: Yup.string().required("Hãng xe là bắt buộc"),
  carType: Yup.string().required("Loại xe là bắt buộc"),
});

interface FormCarTypeProps {
  BrandPullDown: BrandPullDown[];
}

const FormCarType: React.FC<FormCarTypeProps> = ({ BrandPullDown }) => {


  return (
    <div className="mt-10 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký loại xe</h2>

      <Formik
        initialValues={{ brandId: "", carType: "" }}
        validationSchema={CarTypeSchema}
        onSubmit={(values, { resetForm }) => {
          baseAxios.post("/brand/loaixe", values)
            .then(() => {
              Swal.fire({
                title: "Thành công!",
                text: "Loại xe đã được đăng ký thành công.",
                icon: "success",
                confirmButtonText: "OK",
              });
              resetForm();
            })
            .catch((error) => {
              Swal.fire({
                title: "Thất bại!",
                text: "Loại xe đã được đăng ký trước đó.",
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        }}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="brandId" className="block text-gray-700 font-semibold mb-1">
              Hãng Xe
            </label>
            <Field
              as="select"
              name="brandId"
              id="brandId"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn hãng xe</option>
              {BrandPullDown.map((bran) => (
                <option key={bran.id} value={bran.id}>
                  {bran.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="brandId" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="carType" className="block text-gray-700 font-semibold mb-1">
              Loại Xe
            </label>
            <Field
              type="text"
              name="carType"
              id="carType"
              placeholder="Nhập loại xe"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="carType" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="btn"
          >
            Đăng ký loại xe
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormCarType;
