import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="w-full px-3 flex flex-col gap-5 md:gap-9">
      <div className="w-full flex gap-2 md:gap-6 flex-col justify-center items-center">
        <h1 className="font-bold text-2xl md:text-3xl md:max-w-[450px] lg:max-w-[480px] lg:text-4xl text-center">Get your <span className="text-blue-600">resume/cv</span> roasted and polished by AI</h1>
        <p className="lg:text-xl lg:max-w-[77%] text-center">Think your resume is job-ready? Think again. Upload your CV for a brutal, no-nonsense critique—or let us transform it into an ATS-friendly masterpiece tailored to your dream job.</p>
      </div>
      <div className="flex justify-center flex-col md:flex-row gap-3">
        <Button>Roast My CV</Button>
        <Button>Optimize My CV</Button>
      </div>
    </div>
  )
}