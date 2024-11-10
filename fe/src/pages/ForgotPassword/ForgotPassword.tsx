import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";
import { callApi, forgotPass } from "../../api/axios";
import Logo from "../../assets/images/logo.png";

function ForgotPassword() {
  const input = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await callApi(() => forgotPass(input.current?.value || ""))
      .then((data) => {
        toast.success("Link thay đổi mật khẩu đã gửi đến email của bạn!", {autoClose: 3000});
      })
      .catch(() => {
        toast.error("Email không tồn tại!");
      });
  };
  return (
    <div className=" flex py-10 max-w-xl m-auto  flex-col gap-y-3 items-center shadow-custom mt-20 mb-44">
      <img className="w-40" src={Logo} alt="" />
      <h1 className="text-3xl">Quên mật khẩu</h1>
      <p>ok</p>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          ref={input}
          title="Email không hợp lệ"
          required
          pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          placeholder="Email"
          className="outline outline-1 outline-gray-300 focus:outline-primary rounded-lg  p-4"
          type="email"
        />
        <button
          type="submit"
          className="py-4 px-2 bg-gray-300 min-w-32 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
        >
         Tiếp tục
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
