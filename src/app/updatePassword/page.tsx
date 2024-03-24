"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function updatePasswordPage() {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
        token: ""
    })
    const onupdatePassword = async () => {
        if (data.password !== data.confirmPassword) { 
            toast.error("Password do not match")
        } else {
               try {
                 setLoading(true);
                  const res =  await axios.post("/api/users/updatePassword", data);
                 if (res.data.success) {
                   toast.success(res.data.message),
                   router.push("/login");
                 }
               } catch (error: any) {
                 toast.error("Error while updating the password");
                 setError(true);
                 console.log(error.res.data);
               } finally {
                 setLoading(false);
               }
        }
    }

    useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
        setData({...data, token: (urlToken || "") });
    }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-center text-2xl mb-2">
            {loading ? "Loading..." : "Update Password"}
          </h1>
          <label htmlFor="email">New Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600
          text-black"
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter new password"
          />

          <label htmlFor="email">Confirm Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600
          text-black"
            type="password"
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            placeholder="Enter confirm password"
          />

          <button
            onClick={onupdatePassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600
          "
          >
            Update Password
          </button>
        </div>
    </div>
  );
}