import {css} from '../../../styled-system/css'

interface SocialButtonProps {
value? : string
children? : React.ReactNode
}

function SocialButton({value, children } : SocialButtonProps) {
const span = css({marginLeft : '1rem'})

const button = css({
  display : 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.5rem',
  border : '1px solid var(--colors-gray-light)',
  backgroundColor: {base :'white' , _hover : 'white-primary'},
  padding : '0.5rem 0',
  fontSize : '0.875rem',
  fontWeight : '400',
  color :'black',
  cursor : 'pointer',
  boxShadow : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  transition : 'background-color 0.2s ease-in-out',
})

  return (
    <div className={button}>
      {children}
      <span className={span}>{value}</span>
    </div>
  )
}

export default SocialButton