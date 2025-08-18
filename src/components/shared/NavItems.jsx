import React from 'react'
import { headerLinks } from '../../../constants'
import { NavLink } from 'react-router'

const NavItems = () => {

  return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
        {headerLinks.map((link) => {
            return (
                <li key={link.route} className='flex-center p-medium-16 whitespace-nowrap'>
                    <NavLink to={link.route} className={({isActive}) => isActive ? "text-primary-500": ""}>{link.label}</NavLink>
                </li>
            )
        })}
    </ul>
  )
}

export default NavItems