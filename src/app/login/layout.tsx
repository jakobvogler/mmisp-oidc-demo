import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "Login - MMISP OIDC Demo",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
