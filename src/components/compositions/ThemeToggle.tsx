import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";


export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  
  return (
    <div className="">
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <span className="sr-only">toggle</span>
    </div>
  )
}