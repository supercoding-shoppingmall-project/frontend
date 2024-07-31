import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    gender: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "이메일을 입력해주세요";
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ||
      !/[A-Za-z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      newErrors.password = "비밀번호는 특수기호, 영어, 숫자를 포함해야 합니다";
    }
    if (!formData.name) newErrors.name = "이름을 입력해주세요";
    if (!formData.phone) newErrors.phone = "전화번호를 입력해주세요";
    if (!formData.gender) newErrors.gender = "성별을 선택해주세요";
    if (!formData.address) newErrors.address = "주소를 입력해주세요";
    return newErrors;
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // API 요청
      try {
        const response = await axios.post("/api/user/signup", formData, {
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 전송
          },
        });

        console.log("회원가입 성공:", response.data);
        // 회원가입 성공 후의 처리 (예: 리디렉션, 사용자 정보 저장 등)
      } catch (error) {
        if (error.response) {
          // 서버가 응답을 반환했지만 상태 코드가 2xx가 아닌 경우
          console.error("회원가입 오류:", error.response.data);
          setErrors({
            api: `회원가입 오류: ${
              error.response.data.message || "알 수 없는 오류입니다."
            }`,
          });
        } else if (error.request) {
          // 요청이 이루어졌지만 응답을 받지 못한 경우
          console.error(
            "회원가입 오류: 요청이 이루어졌으나 응답이 없습니다.",
            error.request
          );
          setErrors({ api: "서버 응답을 받을 수 없습니다." });
        } else {
          // 오류를 발생시킨 요청 설정 중에 문제가 발생한 경우
          console.error("회원가입 오류:", error.message);
          setErrors({ api: "회원가입 중 오류가 발생했습니다." });
        }
      }
    }
  };

  return (
    <form
      onSubmit={submitHandle}
      className="space-y-12 p-10 flex justify-center w-1/3 mx-auto"
    >
      <div className="border-b border-gray-900/10 pb-12 w-full">
        <h1 className="text-base font-semibold leading-7 text-gray-900">
          사용하실 email 과 password를 입력해주세요
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 pt-5"
            >
              email (아이디)
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xl">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email을 적어주세요"
                  autoComplete="email"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={formData.email}
                  onChange={changeHandle}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 pt-5"
            >
              password (비밀번호)
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xl">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password를 적어주세요"
                  autoComplete="password"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={formData.password}
                  onChange={changeHandle}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>
        </div>
        <h2 className="text-base font-semibold leading-7 text-gray-900 pt-20">
          개인 정보
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          물건을 받으실 주소를 적어주세요
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-4">
          <div className="sm:col-span-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              이름
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:max-w-2xl"
                value={formData.name}
                onChange={changeHandle}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              전화번호
            </label>
            <div className="signup-tel mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="phone"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:max-w-2xl"
                value={formData.phone}
                onChange={changeHandle}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              성별
            </label>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  value="MALE"
                  onChange={changeHandle}
                />
                <label
                  htmlFor="male"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  남성
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  value="FEMALE"
                  onChange={changeHandle}
                />
                <label
                  htmlFor="female"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  여성
                </label>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
          <div className="col-span-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              주소
            </label>
            <div className="mt-4">
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:max-w-2xl"
                value={formData.address}
                onChange={changeHandle}
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>
        </div>
      </div>
    </form>
  );
}
