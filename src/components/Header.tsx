import Link from "next/link";
// import ThemeToggle from "./compositions/ThemeToggle";

export default function Header() {
  return (
    <header className="w-full flex flex-row justify-between fixed top-0 py-5 z-10 backdrop-filter bg-opacity-60 
    bg-slate-300/50 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-5 lg:px-8">
      <Link href="/" className="font-oswald font-semibold lg:text-xl">burnished.</Link>
      {/* <ThemeToggle /> */}
    </header>
  )
}