"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function ForgetPasswordFinal() {
  const [msg, setMsg] = useState("");
  const [err, seterr] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    const body = e.preventDefault();

    const result = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/forgotPassword",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      }
    );
    const finalresult = await result.json();

    if (finalresult.message == "success") {
      setMsg(finalresult.info);
      setTimeout(() => {
        router.push("/verifyOTP");
      }, 2000);
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
        <p className="font-semibold text-lg">Forgot Your Password?</p>
        <input
          type="email"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Recover account
        </button>
      </form>
    </div>
  );
}
