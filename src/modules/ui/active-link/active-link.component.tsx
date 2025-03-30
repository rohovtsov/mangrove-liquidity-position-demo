'use client';
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type ActiveLinkProps = {
  as?: string;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  activeClassName?: string;
  href: string;
}

export default function ActiveLink({children, activeClassName = 'active', className, ...props}: ActiveLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === props.href || pathname === props.as;
  const classNames =
    isActive
      ? `${className ?? ''} ${activeClassName ?? ''}`.trim()
      : (className ?? '');

  return (
    <Link {...props} className={classNames}>
      {children}
    </Link>
  )
}
