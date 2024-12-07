"use client";

import { FormEvent, useEffect, useState } from "react";

export default function VerifyOTP() {
  const [msg, setMsg] = useState("");
  const [err, seterr] = useState(false);
  const [resetCode, setResetCode] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    const body = e.preventDefault();

    const result = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/verifyResetCode",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          resetCode,
        }),
      }
    );
    const finalresult = await result.json();

    if (finalresult.message == "success") {
      setMsg(finalresult.message);
      seterr(false);
    } else {
      setMsg(finalresult.message);
      seterr(true);
    }
    console.log(body);
    console.log(finalresult);
  };
  useEffect(() => {
    console.log("Updated msg:", msg);
  }, [msg]); // Runs when msg changes

  return (
    <div className=" flex flex-col gap-8 justify-center items-center h-full ">
      <form onSubmit={handleSubmit} className="  w-[35%] flex flex-col gap-6  ">
        <p className="font-semibold text-lg">Verify OTP</p>
        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Enter OTP"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
        />
        {msg == "" ? null : (
          <p
            className={`text-center ${err ? "text-red-600" : "text-green-500"}`}
          >
            {msg}
          </p>
        )}
        <button
          type="submit"
          className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        >
          verify
        </button>
      </form>
    </div>
  );
}
