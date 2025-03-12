export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <main className="mt-24 pb-20">
        {children}
      </main>
    </div>
  )
}
