import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full absolute bottom-0 px-5 lg:px-8 py-2">
      <div className="flex flex-row justify-between">
        <Link href="/" className="font-oswald font-semibold lg:text-xl">burnished.</Link>
        <p className="lg:text-lg">© <span>{currentYear}</span></p>
      </div>
      <div className="w-full text-center">
        <p>Built with ❤️ by Emmanuella ✨</p>
      </div>
    </footer>
  )
}