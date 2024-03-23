"use client"

import {API_URL} from "@/config"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect} from "react"

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    ;(async () => {
      const exchangeToken = searchParams.get("exchangeToken")

      if (!exchangeToken) {
        alert("No exchangeToken provided")
        return
      }

      const response = await fetch(API_URL() + "/auth/login/token", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({exchangeToken}),
      })

      if (response.status >= 300) {
        alert("Login failed")
        return
      }

      const {token} = await response.json()

      if (!token) {
        alert("No token provided")
        return
      }

      localStorage.setItem("token", token)
      router.push("/dashboard")
    })()
  }, [])
}
