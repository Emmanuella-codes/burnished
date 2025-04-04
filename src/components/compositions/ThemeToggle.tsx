"use client"
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";


export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  return (
    <div className="">
      <Switch
        checked={mounted && theme === "dark"}
        onCheckedChange={toggleTheme}
        className="shadow-md"
      />
      <span className="sr-only">toggle</span>
    </div>
  )
}
