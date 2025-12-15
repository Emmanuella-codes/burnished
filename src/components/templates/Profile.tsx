
export default function TemplateProfile({ profileSummary }: { profileSummary?: string }) {
  if (!profileSummary) return null;
  
  return (
    <section className="">
      <p className="text-[14px]">{profileSummary}</p>
    </section>
  )
}
