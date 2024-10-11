import { NextUIProvider } from "@nextui-org/system"

/* Provider for the NextUI components */
export function Providers({children}: { readonly children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}