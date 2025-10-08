
export default function TemplateProfile({ profileSummary }: { profileSummary?: string }) {
  if (!profileSummary) return null;
  
  return (
    <section className="">
      <h2 className="temp-section-title">Profile</h2>
      <p className="text-sm">{profileSummary}</p>
    </section>
  )
}
