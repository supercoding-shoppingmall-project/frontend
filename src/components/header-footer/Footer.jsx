import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-500 text-white content-end mt-45">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h5 className="text-lg font-semibold mb-4">Source</h5>
            <p className="text-sm text-white-700">
              모든 상품의 가격 및 이미지의 출처는 다음과 같습니다.
              <br />
              https://www.nike.com/kr/ (한국 나이키 웹사이트)
            </p>
          </div>

          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <p className="text-sm text-gray-200">Email: support@example.com</p>
            <p className="text-sm text-gray-200">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-white-400">
            &copy; 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
