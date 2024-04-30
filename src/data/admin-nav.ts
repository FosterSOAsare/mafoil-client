import { TbLayoutDashboard } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { AiOutlineComment, AiOutlineTransaction } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { RiTodoLine } from 'react-icons/ri'

const adminNav = [{
  href: '',
  name: 'Dashboard',
  icon: TbLayoutDashboard
}, {
  href: '/products',
  name: 'Products',
  icon: CgFileDocument
}, {
  href: '/orders',
  name: 'Orders',
  icon: RiTodoLine
}, {
  href: '/reviews',
  name: 'Reviews',
  icon: AiOutlineComment
}, {
  href: '/transactions',
  name: 'Transactions',
  icon: AiOutlineTransaction
},
  //  {
  //   href: '/admin/settings',
  //   name: 'Settings',
  //   icon: GoGear
  // }
]

export default adminNav