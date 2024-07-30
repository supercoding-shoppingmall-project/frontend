import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-500 text-white content-end">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h5 className="text-lg font-semibold mb-4">About Us</h5>
            <p className="text-sm text-white-400">
              We are a company dedicated to providing the best online shopping
              experience. Our products are sourced from top brands and we strive
              to offer the best prices and service.
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
