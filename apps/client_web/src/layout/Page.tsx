

function Page({children} : { children : React.ReactNode}) {

// backgroundColor: 'olive'

  return (
    <div className="min-h-screen bg-base relative">{children}</div>
  )
}

export default Page