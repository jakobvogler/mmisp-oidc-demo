"use client"

import {API_URL} from "@/config"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>()

  function logout() {
    localStorage.removeItem("token")
    router.push("/login")
  }

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/login")
      }

      const response = await fetch(API_URL() + "/users/view/me", {
        headers: {
          authorization: "Bearer " + token,
        },
      })

      setUser(await response.json())
    })()
  }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
      <div className="relative px-12 pt-16 pb-28 w-[30vw] rounded-lg border-neutral-400 border bg-white">
        <h1 className="text-lg font-bold">User</h1>
        <Divider />

        <div className="w-fit mb-3">
          <div className="text-md font-semibold text-neutral-600">Email</div>
          <div className="text-xl font-bold">{user?.User?.email}</div>
        </div>
        <div className="w-fit mb-12">
          <div className="text-md font-semibold text-neutral-600">Role</div>
          <div className="text-xl font-bold">{user?.Role?.name}</div>
        </div>

        <h1 className="text-lg font-bold">Organisation</h1>
        <Divider />

        <div className="w-fit mb-3">
          <div className="text-md font-semibold text-neutral-600">Name</div>
          <div className="text-xl font-bold">{user?.Organisation?.name}</div>
        </div>
        <div className="w-fit">
          <div className="text-md font-semibold text-neutral-600">Sector</div>
          <div className="text-xl font-bold">{user?.Organisation?.sector}</div>
        </div>

        <button
          onClick={logout}
          className="absolute bottom-8 right-8 border border-neutral-600 rounded-lg font-semibold py-1 px-4 transition-colors hover:bg-neutral-300/30"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

function Divider() {
  return <div className="border-b border-neutral-400 rounded-md mb-3" />
}
