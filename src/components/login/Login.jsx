import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const passwordChangeHandle = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError("비밀번호는 특수 문자, 영어, 숫자를 포함해야 합니다.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await axios.post("/api/user/login", {
        email: email,
        password: password,
      });

      // 로그인 성공 시의 처리
      console.log("Login successful:", response.data);
      navigate("/");

      // 응답에서 토큰을 추출하여 localStorage에 저장
      const token = response.headers.get("Authorization");
      localStorage.setItem("Authorization", token);

      // 예를 들어, 토큰을 저장하거나 리다이렉트 처리 등을 할 수 있습니다.
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/;
    return regex.test(password);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="shoes"
            src="/assets/shoes.jpg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            계정에 로그인하세요
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandle} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={passwordChangeHandle}
                />
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
              {loginError && (
                <p className="mt-2 text-sm text-red-600">{loginError}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인
              </button>
            </div>
          </form>
          <Link to="/signup">
            <p className="mt-10 text-center text-sm text-gray-500">
              회원가입이 필요하신가요?
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
