import {Metadata} from "next"

export const metadata: Metadata = {
  title: "Dashboard | MMISP OIDC Demo",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
