import React from 'react'

export const NavigationIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M24.5 4 9 44l15.5-9.09L40 44z"
      ></path>
    </svg>
  )
}
