"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      firstName,
      lastName,
      username: userName,
      email,
      rePassword,
      password,
      phone,
    };
    // check if any input is empty
    if (
      Object.values(body).some(
        (value) =>
          value.trim() == "" ||
          value.trim() === null ||
          value.trim() === undefined
      )
    ) {
      setErrorMsg("all inputs are Required");
      return;
    }
    // email regex
    const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm;
    if (!emailRegex.test(body.email)) {
      setErrorMsg("email is not valid");
      return;
    }
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(body.password)) {
      setErrorMsg(
        "Password Must contain capital letter, small letter, numbers and special characters and not less than 8"
      );
      return;
    }
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(body.phone)) {
      setErrorMsg("phone number is not valid");
      return;
    }

    console.log(email);

    const result = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/signup",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    const finalresult = await result.json();

    if (finalresult.token) {
      router.push("/signin");
    } else {
      if (finalresult.message.includes("in not allowed to be empty"))
        setErrorMsg("all inputs are required");
      else {
        setErrorMsg(finalresult.message);
      }
    }
    console.log(body);
    console.log(finalresult);
  };

  return (
    <div className=" flex flex-col gap-8 justify-center items-center h-full ">
      <form onSubmit={handleSubmit} className="  w-[35%] flex flex-col gap-6  ">
        <p className="font-semibold text-lg">Sign in</p>
        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="confirm Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <input
          type="tel"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errorMsg == "" ? null : (
          <p className="text-center text-red-600">{errorMsg}</p>
        )}
        <p className="text-sm text-center tracking-widest">
          Already have an account?{" "}
          <Link href={"/login"} className="text-[#4461F2] ">
            {" "}
            Login{" "}
          </Link>
        </p>
        <button
          type="submit"
          className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
