import { NextUIProvider } from "@nextui-org/system"

export function Providers({children}: { readonly children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}