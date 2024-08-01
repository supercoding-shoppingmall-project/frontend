// import React from "react";
// import axios from "axios"; // axios import 추가
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import { Link, useNavigate } from "react-router-dom";

// const User = () => {
//   const navigate = useNavigate();

//   const logoutHandle = async () => {
//     try {
//       const token = localStorage.getItem("Authorization");
//       await axios.post(
//         "/api/user/logout",
//         {},
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       localStorage.removeItem("Authorization");
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const userProfileClickHandle = async () => {
//     try {
//       const token = localStorage.getItem("Authorization");
//       const userId = getUserIdToken(token);

//       if (!userId || !token) {
//         console.error("User ID or token is missing.");
//         navigate("/login");
//         return;
//       }

//       const response = await axios.get(`/api/mypage/${userId}`, {
//         headers: {
//           Authorization: token,
//         },
//       });

//       navigate("/userprofile", { state: { userInfo: response.data } });
//     } catch (error) {
//       console.error("Failed to fetch user info:", error);
//       navigate("/login");
//     }
//   };

//   const getUserIdToken = (token) => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         return payload.userId; // userId를 반환
//       } catch (error) {
//         console.error("토큰 디코딩 오류:", error);
//         return null;
//       }
//     }
//     return null;
//   };

//   return (
//     <div className="sm:w-60 w-full py-3">
//       <div className="bg-white text-center border border-gray-300 p-7 block">
//         <div className="mt-2 flex items-center gap-x-3 ">
//           <UserCircleIcon
//             aria-hidden="true"
//             className="h-30 w-20 text-gray-300"
//           />
//           <button
//             type="button"
//             className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//           >
//             변경
//           </button>
//         </div>
//       </div>
//       <div>
//         <label
//           htmlFor="cover-photo"
//           className="block font-medium leading-6 text-gray-900 px-1"
//         >
//           파일 찾기
//         </label>
//         <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-5">
//           <div className="text-center">
//             <PhotoIcon
//               aria-hidden="true"
//               className="mx-auto h-12 w-12 text-gray-300"
//             />
//             <div className="mt-4 flex text-sm leading-6 text-gray-600">
//               <label
//                 htmlFor="file-upload"
//                 className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//               >
//                 <span>Upload a file</span>
//                 <input
//                   id="file-upload"
//                   name="file-upload"
//                   type="file"
//                   className="sr-only"
//                 />
//               </label>
//               <p className="pl-1">or drag and drop</p>
//             </div>
//             <p className="text-xs leading-5 text-gray-600">
//               PNG, JPG, GIF up to 10MB
//             </p>
//           </div>
//         </div>
//       </div>

//       <div
//         className="font-light text-gray-700 py-1.5 px-1 mt-3 border-b border-solid border-gray-200 cursor-pointer"
//         onClick={userProfileClickHandle}
//       >
//         내 프로필
//       </div>

//       <Link to="/cartlist">
//         <div className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200">
//           장바구니 상품 조회
//         </div>
//       </Link>
//       <Link to="/purchaselist">
//         <div className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200">
//           구매 목록 조회
//         </div>
//       </Link>
//       <div
//         className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200 cursor-pointer"
//         onClick={logoutHandle}
//       >
//         로그 아웃
//       </div>
//     </div>
//   );
// };

// export default User;

import React, { useState, useEffect } from "react";
import axios from "axios"; // axios import 추가
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const encodedEmail = encodeURIComponent(getUserEmailFromToken(token));
        const response = await axios.get(
          `/api/mypage/profile-image/${encodedEmail}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setProfileImageUrl(response.data.profileImageUrl);
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
        // 기본 이미지를 설정합니다.
        setProfileImageUrl(null);
      }
    };

    fetchProfileImage();
  }, []);

  const getUserEmailFromToken = (token) => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.email; // 이메일 반환
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null;
      }
    }
    return null;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("Authorization");
      const encodedEmail = encodeURIComponent(getUserEmailFromToken(token));

      const response = await axios.post(
        `/api/mypage/profile-image/${encodedEmail}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 업로드 후 프로필 이미지를 업데이트합니다.
      setProfileImageUrl(response.data.profileImageUrl);
    } catch (error) {
      console.error("Failed to upload profile image:", error);
    }
  };

  const logoutHandle = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      await axios.post(
        "/api/user/logout",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      localStorage.removeItem("Authorization");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userProfileClickHandle = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const userId = getUserIdToken(token);

      if (!userId || !token) {
        console.error("User ID or token is missing.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`/api/mypage/${userId}`, {
        headers: {
          Authorization: token,
        },
      });

      navigate("/userprofile", { state: { userInfo: response.data } });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      navigate("/login");
    }
  };

  const getUserIdToken = (token) => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId; // userId를 반환
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null;
      }
    }
    return null;
  };

  return (
    <div className="sm:w-60 w-full py-3">
      <div className="bg-white text-center border border-gray-300 p-7 block">
        <div className="mt-2 flex items-center gap-x-3">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="h-30 w-20 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon
              aria-hidden="true"
              className="h-30 w-20 text-gray-300"
            />
          )}
          <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">
            변경
            <input
              type="file"
              className="sr-only"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      <div>
        <label
          htmlFor="cover-photo"
          className="block font-medium leading-6 text-gray-900 px-1"
        >
          파일 찾기
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-5">
          <div className="text-center">
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-300"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>

      <div
        className="font-light text-gray-700 py-1.5 px-1 mt-3 border-b border-solid border-gray-200 cursor-pointer"
        onClick={userProfileClickHandle}
      >
        내 프로필
      </div>

      <Link to="/cartlist">
        <div className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200">
          장바구니 상품 조회
        </div>
      </Link>
      <Link to="/purchaselist">
        <div className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200">
          구매 목록 조회
        </div>
      </Link>
      <div
        className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200 cursor-pointer"
        onClick={logoutHandle}
      >
        로그 아웃
      </div>
    </div>
  );
};

export default User;
