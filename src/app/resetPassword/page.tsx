"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const router = useRouter();
  const [useremail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      // check whether the user is registered with this email or not
      const res = await axios.post("/api/users/resetPassword", { useremail });
      console.log("Res: ", res);
      toast.success("Reset link sent successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error("User is not registered");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-center text-2xl mb-2">
          {loading ? "Loading..." : "Reset Password"}
        </h1>
        <label htmlFor="email">Enter your Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600
        text-black"
          type="email"
          id="email"
          value={useremail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="email"
        />
        <button
          onClick={onSubmit}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600
        "
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
