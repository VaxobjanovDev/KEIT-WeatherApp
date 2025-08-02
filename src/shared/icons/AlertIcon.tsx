import React from 'react'

export const AlertIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path strokeLinecap="round" d="M12 7v6m0 3.5v.5"></path>
      </g>
    </svg>
  )
}
