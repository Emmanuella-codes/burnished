"use client"
import FormView from "./FormView";
import ResultView from "./ResultView";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation"

export default function Hero() {
  // const router = useRouter();

  const offers = [
    {title: "✨ CV/Resume Optimization", desc: "Transform your CV into an ATS-friendly powerhouse. Tailored to specific job descriptions with a built-in editor."},
    {title: "📝 Cover Letter", desc: "Generate compelling, personalized cover letters that complement your resume and grab recruiters' attention."},
    {title: "🔥 CV/Resume roast", desc: "Get honest feedback on your resume. no bull, just straight facts."},
  ];

  return (
    <div className="w-full px-3 flex flex-col gap-5 md:gap-9">
      <div className="w-full flex gap-2 md:gap-6 flex-col justify-center items-center">
        <h1 className="font-bold text-[1.4rem] leading-8 md:text-3xl md:max-w-[450px] lg:max-w-[480px] lg:text-4xl text-center">Get your <span className="text-blue-600">resume/cv</span> roasted and polished by AI</h1>
        <p className="lg:text-base lg:max-w-[77%] text-center">Think your resume is job-ready? Think again. Upload your CV for a brutal, no-nonsense critique—or let us transform it into an ATS-friendly masterpiece tailored to your dream job.</p>
      </div>
      <div className="flex justify-center flex-col gap-3">
        {/* <Button onClick={() => router.push("/get-roasted")}>Roast My CV</Button>
        <Button onClick={() => router.push("/cv-optimizer")}>Optimize My CV</Button> */}
        {/* <div className="">
          <FormView />
        </div> */}
        {/* <ResultView /> */}
        <div className="flex flex-col lg:flex-row gap-4 justify-center">
          {offers.map((offer, idx) => (
            <div key={`main-${idx}`} className="border border-slate-500 w-full lg:w-96 px-4 py-3 rounded-sm">
              <h2 className="font-semibold text-base">{offer.title}</h2>
              <p className="text-base">{offer.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="mx-auto">
            <button 
              className="bg-[#CF1259] lg:px-6 py-2 text-white rounded-xl"
            >
              Get Started
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome,</DialogTitle>
            <DialogDescription>Enter your name to get started</DialogDescription>
          </DialogHeader>
          <form>
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Anne Hathaway"
                  className="px-2 py-1 rounded-sm"
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-[#CF1259] px-3 py-1 text-white rounded-xl font-medium"
                >
                  Continue
                </button>
              </div>
              
            </div>
            
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}