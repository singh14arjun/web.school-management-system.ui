import React from "react";
import { FaFileDownload, FaRegFileAlt, FaWallet } from "react-icons/fa";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoStatsChart } from "react-icons/io5";
import {
  MdEventAvailable,
  MdOutlineReceiptLong,
  MdVerified,
} from "react-icons/md";

const Salary = () => {
  const payments = [
    {
      date: "Sep 28, 2023",
      title: "Base Salary - September",
      subtitle: "Monthly recurring",
      amount: "$2,920.00",
      status: "paid",
    },
    {
      date: "Sep 15, 2023",
      title: "Performance Bonus",
      subtitle: "Annual review Q3",
      amount: "$500.00",
      status: "paid",
    },
    {
      date: "Aug 28, 2023",
      title: "Base Salary + Overtime",
      subtitle: "Includes 12h additional lab time",
      amount: "$3,140.00",
      status: "paid",
    },
    {
      date: "Oct 28, 2023",
      title: "Base Salary - October",
      subtitle: "Estimated amount",
      amount: "$2,920.00",
      status: "pending",
    },
  ];

  const getStatusStyle = (status) => {
    return status === "paid"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Salary Information</h1>
      <p className="text-gray-600 mt-2">
        This is the salary information page for staff members.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gray-100 rounded-2xl p-6 flex justify-between items-start shadow-sm">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-wide">
              CURRENT MONTHLY
            </p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">$5,840.00</h2>
            <p className="text-green-600 text-sm mt-2 font-medium">
              ↑ 4% increase from last period
            </p>
          </div>

          <div className="bg-gray-200 p-3 rounded-lg">
            <FaWallet className="text-blue-600 text-xl" />
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6 flex justify-between items-start shadow-sm">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-wide">
              ANNUAL YTD
            </p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">
              $42,120.50
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Fiscal year: Sept 2023 - Present
            </p>
          </div>

          <div className="bg-gray-200 p-3 rounded-lg">
            <IoStatsChart className="text-blue-600 text-xl" />
          </div>
        </div>

        <div className="bg-blue-700 rounded-2xl p-6 flex justify-between items-start text-white shadow-md">
          <div>
            <p className="text-xs font-semibold tracking-wide opacity-80">
              NEXT PAYDAY
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              October 28, 2023
            </h2>
            <p className="text-sm mt-2 opacity-90">
              Estimated amount: $2,920.00
            </p>
          </div>

          <div className="bg-blue-600 p-3 rounded-lg">
            <MdEventAvailable className="text-white text-xl" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-2/3 bg-gray-100 rounded-2xl p-6 mt-6 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
            <button className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
              Export CSV <FaFileDownload />
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-500 uppercase bg-gray-200 rounded-t-xl">
            <div className="col-span-3">Date</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* Rows */}
          {payments.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 items-center px-4 py-4 border-b last:border-none ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {/* Date */}
              <div className="col-span-3 text-gray-800 font-medium">
                {item.date}
              </div>

              {/* Description */}
              <div className="col-span-5">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>

              {/* Amount */}
              <div className="col-span-2 font-semibold text-gray-900">
                {item.amount}
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                    item.status,
                  )}`}
                >
                  {item.status.toUpperCase()}
                </span>

                {item.status === "paid" && (
                  <MdOutlineReceiptLong className="text-blue-600 text-xl cursor-pointer" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-1/3 mt-6 space-y-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900">Document Center</h2>

          {/* Card 1 */}
          <div className="bg-gray-100 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <FaRegFileAlt className="text-blue-600 text-xl" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  2022 Annual W-2 Form
                </p>
                <p className="text-sm text-gray-500">TAX DOCUMENT • PDF</p>
              </div>
            </div>

            <FaFileDownload className="text-gray-600 text-lg cursor-pointer hover:text-blue-600" />
          </div>

          <div className="bg-gray-100 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <MdVerified className="text-orange-500 text-xl" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Salary Certificate
                </p>
                <p className="text-sm text-gray-500">EMPLOYMENT VERIFICATION</p>
              </div>
            </div>

            <FaFileDownload className="text-gray-600 text-lg cursor-pointer hover:text-blue-600" />
          </div>

          {/* Recent Pay Slips */}
          <div className="bg-gray-100 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-gray-600 uppercase">
                Recent Pay Slips
              </p>
              <button className="text-blue-600 font-medium hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {["September 2023", "August 2023", "July 2023"].map(
                (month, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <p className="text-gray-800">{month}</p>
                    </div>

                    <FaFileDownload className="text-blue-600 cursor-pointer" />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 text-white flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Financial Questions?</p>
              <p className="text-sm text-gray-300 mt-1">
                Contact HR for discrepancies or bank account changes.
              </p>

              <button className="mt-4 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm">
                Email Support
              </button>
            </div>

            <div className="bg-gray-600/40 p-4 rounded-xl">
              <HiOutlineQuestionMarkCircle className="text-3xl opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
