// import React from "react";
// import axios from "axios"; // axios import 추가
// import { UserCircleIcon } from "@heroicons/react/24/solid";
// import { Link, useNavigate } from "react-router-dom";

// const User = () => {
//   const navigate = useNavigate();

//   //로그아웃기능
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

//   //유저정보 기능
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
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const [profileImageUrl, setProfileImageUrl] = useState(null); // 프로필 이미지 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const encodedEmail = getUserEmailFromToken(token);

        const response = await axios.get(
          `/api/mypage/profile-image/${encodedEmail}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setProfileImageUrl(response.data.profileImageUrl); // 프로필 이미지 URL 설정
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else {
          console.error("Error message:", error.message);
        }
      }
    };

    fetchProfileImage();
  }, []);

  const fileUploadHandle = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("Authorization");
      const encodedEmail = getUserEmailFromToken(token);

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

      setProfileImageUrl(response.data.profileImageUrl); // 새 프로필 이미지로 업데이트
    } catch (error) {
      console.error("Failed to upload profile image:", error);
    }
  };

  const getUserEmailFromToken = (token) => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId; // 유저 아이디 반환
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null;
      }
    }
    return null;
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
        <div className="mt-2 flex items-center gap-x-3 ">
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
              onChange={fileUploadHandle}
            />
          </label>
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
