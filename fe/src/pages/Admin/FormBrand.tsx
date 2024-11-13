import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { baseAxios, callApi } from "../../api/axios";
import FormCarType from "./FormCarType";
import BrandPullDown from "../../interfaces/car";
import { getPullDownBranch } from "../../api/carApi";

// Xác thực với Yup
const BrandSchema = Yup.object().shape({
  name: Yup.string().required("Tên hãng là bắt buộc"),
});

const FormBrand = () => {
    const [brand, setBrand] = useState<BrandPullDown[]>([]);
    
  useEffect(() => {

    const fetchBrand = async () => {
      try {
        const res = await callApi(() => getPullDownBranch());
        setBrand(res);
      } catch (error) {
        console.log(error);
      }
    };

      fetchBrand();
}, []);
  return (
    <div className="mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký hãng xe</h2>

      <Formik
        initialValues={{ name: ""}}
        validationSchema={BrandSchema}
        onSubmit={(values, { resetForm }) => {
          baseAxios.post("/brand", values)
            .then(async () => {
                const res = await callApi(() => getPullDownBranch());
                setBrand(res);
              Swal.fire({
                title: "Thành công!",
                text: "Hãng xe đã được đăng ký thành công.",
                icon: "success",
                confirmButtonText: "OK",
              });
              resetForm();
            })
            .catch((error) => {
              Swal.fire({
                title: "Thất bại!",
                text: "Hãng xe đã được đăng ký trước đó.",
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        }}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Tên Hãng
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              placeholder="Nhập tên hãng"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>


          <button
            type="submit"
            className="btn"
          >
            Đăng ký hãng xe
          </button>
        </Form>
      </Formik>
      <FormCarType  BrandPullDown={brand}/>
    </div>
  );
};

export default FormBrand;
