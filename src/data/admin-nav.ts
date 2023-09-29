import { TbLayoutDashboard } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { AiOutlineComment, AiOutlineTransaction } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { RiTodoLine } from 'react-icons/ri'

const adminNav = [{
  href: '/admin',
  name: 'Dashboard',
  icon: TbLayoutDashboard
}, {
  href: '/admin/products',
  name: 'Products',
  icon: CgFileDocument
}, {
  href: '/admin/orders',
  name: 'Orders',
  icon: RiTodoLine
}, {
  href: '/admin/reviews',
  name: 'Reviews',
  icon: AiOutlineComment
}, {
  href: '/admin/transactions',
  name: 'Transactions',
  icon: AiOutlineTransaction
}, {
  href: '/admin/settings',
  name: 'Settings',
  icon: GoGear
}]

export default adminNav