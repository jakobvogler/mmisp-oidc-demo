"use client"

import {API_URL} from "@/config"
import {useRouter} from "next/navigation"
import {useState} from "react"

interface IStartResponse {
  loginType: "password" | "idp"
  identityProviders: Array<{
    id: string
    name: string
  }>
}

export default function Home() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [startResponse, setStartResponse] = useState<IStartResponse | undefined>()

  async function startLogin() {
    const response = await fetch(API_URL() + "/auth/login/start", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({email}),
    })

    if (response.status >= 300) {
      alert(await response.text())
      return
    }

    setStartResponse(await response.json())
  }

  async function submitLogin() {
    const response = await fetch(API_URL() + "/auth/login/password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })

    if (response.status >= 300) {
      alert(await response.text())
      return
    }

    const {token} = await response.json()

    if (!token) {
      alert("No token provided!")
      return
    }

    localStorage.setItem("token", token)
    router.push("/dashboard")
  }

  return (
    <main className="absolute min-h-screen w-screen bg-slate-100 items-center justify-center">
      <div className="relative flex flex-col justify-center mx-[38vw] my-[20vh] px-12 py-16 rounded-lg border-neutral-400 border bg-white">
        <h1 className="text-3xl font-bold mb-12 w-full text-center">MMISP OIDC Demo</h1>

        <div className="text-sm text-neutral-700 font-semibold mb-1">Enter your E-Mail</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
          className="border border-neutral-400 rounded-lg h-10 px-4 font-medium mb-3"
        />

        {startResponse?.loginType === "password" && (
          <>
            <div className="text-sm text-neutral-700 font-semibold mb-1">Enter your Password</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border border-neutral-400 rounded-lg h-10 px-4 font-medium mb-3"
            />
          </>
        )}

        <button
          onClick={startResponse?.loginType === "password" ? submitLogin : startLogin}
          className="border border-neutral-600 rounded-lg font-semibold py-2 mt-3 mb-3 transition-colors hover:bg-neutral-300/30"
        >
          {startResponse?.loginType === "password" ? "Login" : "Continue"}
        </button>

        {(startResponse?.loginType === "idp" || !!startResponse?.identityProviders.length) && (
          <div className="border-b mt-3 mb-6 border-neutral-400" />
        )}

        <div className="w-full gap-2 flex flex-col text-left">
          {startResponse?.identityProviders.map((idp) => (
            <a
              key={idp.id}
              href={API_URL() + `/auth/login/idp/${idp.id}/authorize`}
              className="group rounded-lg border border-neutral-400 px-5 py-4 transition-colors hover:border-neutral-500 hover:bg-neutral-300/30"
            >
              <h2 className={`mb-3 text-lg font-semibold`}>
                {idp.name + " "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </a>
          ))}
        </div>

        {startResponse?.loginType === "idp" && !startResponse?.identityProviders.length && (
          <div className="flex justify-center">No Identity Providers available!</div>
        )}
      </div>
    </main>
  )
}
