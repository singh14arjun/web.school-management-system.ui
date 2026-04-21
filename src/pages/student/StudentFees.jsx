import React, { useState } from "react";
import { BiCheck, BiNote } from "react-icons/bi";
import { GiCash } from "react-icons/gi";
import { IoCash } from "react-icons/io5";
import { PiCheckLight, PiWarningCircle } from "react-icons/pi";
import { CiCircleCheck } from "react-icons/ci";
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

const StudentFees = () => {
  // 🔹 Filters
  const [month, setMonth] = useState("All");
  const [year, setYear] = useState("2026");

  // 🔹 Data
  const payments = [
    {
      id: 1,
      month: "April",
      year: 2026,
      desc: "Tuition Fee",
      amount: 5000,
      status: "Paid",
      mode: "Online",
      dueDate: "2026-04-10",
      paidDate: "2026-04-09",
    },
    {
      id: 2,
      month: "March",
      year: 2026,
      desc: "Lab Fee",
      amount: 2000,
      status: "Paid",
      mode: "Cash",
      dueDate: "2026-03-10",
      paidDate: "2026-03-10",
    },
    {
      id: 3,
      month: "April",
      year: 2026,
      desc: "Transport",
      amount: 1500,
      status: "Paid",
      mode: "Online",
      dueDate: "2026-04-15",
      paidDate: "2026-04-20",
    },
    {
      id: 4,
      month: "March",
      year: 2026,
      desc: "Monthly Fee",
      amount: 2500,
      status: "Pending",
      mode: null,
      dueDate: "2026-03-15",
      paidDate: null,
    },
  ];

  const monthName = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredPayments = payments.filter((p) => {
    return (month === "All" || p.month === month) && p.year.toString() === year;
  });

  const total = filteredPayments.reduce((acc, p) => acc + p.amount, 0);

  const paid = filteredPayments
    .filter((p) => p.status === "Paid")
    .reduce((acc, p) => acc + p.amount, 0);

  const pending = total - paid;

  const paidPercentage = total > 0 ? Math.round((paid * 100) / total) : 0;

  const lastPayment = filteredPayments
    .filter((p) => p.paidDate)
    .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate))[0];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Financial Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row justify-between gap-5">
          <div className="flex flex-col gap-3">
            <IoCash className="text-green-500 bg-green-200 p-1 text-4xl rounded" />
            <p className="text-gray-500">Total Fees</p>
            <h2 className="text-2xl font-bold">₹{total}</h2>
            <p className="flex items-center gap-2 text-sm">
              <span>
                <PiWarningCircle />
              </span>
              Includes tuition, lab fees, and housing
            </p>
          </div>
          <div className="bg-gray-200 w-fit h-fit p-1 rounded text-sm font-semibold">
            Total liability
          </div>
        </div>

        <div className="bg-blue-600 text-white p-4 rounded-2xl shadow flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <CiCircleCheck className="bg-white/50 text-6xl rounded p-2" />
            <p className="bg-white/50 px-2 rounded-2xl font-bold">
              {paidPercentage} % Completed
            </p>
          </div>
          <div>
            <p className="text-xl text-white/50 font-semibold">Paid amount</p>
            <p className="text-4xl font-bold">₹{paid}</p>
          </div>
          <div>
            <div className="h-2 bg-gray-100 rounded-2xl">
              <div
                className="h-2 bg-green-500 rounded-2xl"
                style={{ width: `${paidPercentage}%` }}
              ></div>
            </div>
            <p>Last payment on {lastPayment ? lastPayment.paidDate : "N/A"}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-2xl shadow flex flex-col gap-5">
          <div className="flex justify-between">
            <PiCheckLight className="bg-gray-500 text-6xl p-2 rounded" />
            <p className="bg-gray-300 h-fit px-2 rounded font-semibold">
              Action Required
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold text-black/50">
              Pending Balance
            </p>
            <p className="text-4xl font-bold">₹{pending}</p>
          </div>
          <div className="text-center bg-black/90 text-white font-bold text-2xl rounded">
            Pay Now
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded bg-blue-600 text-white "
        >
          {monthName.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded bg-blue-600 text-white"
        >
          <option>2026</option>
          <option>2025</option>
        </select>

        {(month !== "All" || year !== "2026") && (
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setYear("2026");
              setMonth("All");
            }}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-3">Payment History</h2>

        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Due</TableCell>
                <TableCell>Paid On</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredPayments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.month} {p.year}
                  </TableCell>

                  <TableCell>{p.desc}</TableCell>

                  <TableCell>₹{p.amount}</TableCell>

                  <TableCell>
                    <span
                      className={
                        p.status === "Paid"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {p.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    {p.status === "Paid" ? (
                      p.mode
                    ) : (
                      <Button variant="contained" color="success" size="small">
                        Pay Now
                      </Button>
                    )}
                  </TableCell>

                  <TableCell>{p.dueDate}</TableCell>

                  <TableCell>{p.paidDate || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default StudentFees;
