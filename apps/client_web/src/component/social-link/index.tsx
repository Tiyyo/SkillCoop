
interface SocialButtonProps {
value? : string
children? : React.ReactNode
}

function SocialButton({value, children } : SocialButtonProps) {


// const button = css({
//   bg: {base: 'olive', _hover: 'red'},
//   fontSize : '0.875rem',
//   fontWeight : '400',
//   color :'grassA12',
//   transition : 'background-color 0.2s ease-in-out',
// })

  return (
    <div className="ml-3">
      {children}
      <span className="flex items-center justify-center rounded-lg border border-gray-300 cursor-pointer py-2 shadow-md">{value}</span>
    </div>
  )
}

export default SocialButton