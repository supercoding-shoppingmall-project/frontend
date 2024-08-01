import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";

export default function Modal({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    try {
      // localStorage에서 Authorization 토큰 가져오기
      const token = localStorage.getItem("Authorization");

      // 사용자가 입력한 자격증명으로 로그인 요청
      const response = await axios.delete("/api/user/delete", {
        headers: {
          Authorization: token, // Authorization 헤더에 토큰 추가
        },
        data: {
          email: email,
          password: password,
        },
      });

      console.log(response);

      // 회원 탈퇴 성공 후 처리 (예: 로그아웃 및 리다이렉트)
      localStorage.removeItem("Authorization");
      alert("회원 탈퇴가 성공적으로 처리되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during account deletion:", error);
      setErrorMessage(
        "회원 탈퇴에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    회원정보를 지우시겠습니까?
                  </DialogTitle>
                  <p className="text-sm text-gray-500 mt-2 mb-2">
                    회원탈퇴시 모든정보는 지워지며 다시 되돌릴 수 없습니다.
                    <br />
                    이메일 / 비밀번호를 입력해 주세요.
                  </p>
                  <div className="rounded-md ring-1 ring-gray-300 mb-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email"
                      autoComplete="email"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="rounded-md ring-1 ring-gray-300 mb-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="password"
                      autoComplete="current-password"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
