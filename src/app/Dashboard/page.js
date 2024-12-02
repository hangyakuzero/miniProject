"use client";
import React from "react";
import CreatePage from "@/Components/CreatePage/page";
import SellingPage from "@/Components/SellingPage/page";
import LogsPage from "@/Components/LogsPage/page";
import { useState } from "react";

export default function page() {
  const [currentPage, setPage] = useState("create");

  return (
    <div className=" flex flex-row h-screen bg-base-100">
      <div className="  w-[35%] border-r-2 border-gray-600 flex justify-center items-center">
        <div className=" w-[80%] h-[90%] ">
          <text className=" font-bold text-4xl">DASHBOARD</text>
          <br></br>
          <br></br>
          <div className=" space-y-4">
            <button
              onClick={() => setPage("create")}
              className="text-2xl text-center  btn btn-wide hover:border-white  focus:bg-slate-800 focus:border-white"
            >
              Create
            </button>
            <button
              onClick={() => setPage("sell")}
              className="text-2xl text-center  btn btn-wide hover:border-white focus:bg-slate-800 focus:border-white"
            >
              Sell
            </button>
            <button
              onClick={() => setPage("logs")}
              className="text-2xl text-center  btn btn-wide hover:border-white focus:bg-slate-800 focus:border-white"
            >
              Logs
            </button>
            {/*<button className="text-2xl text-center  btn btn-wide hover:border-white">
              Wide
            </button>*/}
          </div>
        </div>
      </div>
      <div className=" w-full ">
        {currentPage == "create" && <CreatePage />}
        {currentPage == "sell" && <SellingPage />}
        {currentPage == "logs" && <LogsPage />}
      </div>
    </div>
  );
}
