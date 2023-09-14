import { css } from "../../styled-system/css"

function Page({children} : { children : React.ReactNode}) {
const page = css({
minHeight : '100vh',
backgroundColor: 'grassA1'
})

  return (
    <div className={page}>{children}</div>
  )
}

export default Page