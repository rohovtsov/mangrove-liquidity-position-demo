import Link from 'next/link';
import style from './style.module.scss';

type Props = any & {
  children?: React.ReactNode | React.ReactNode[];
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

function PrettyButtonContent({ href, children, ...other }: Props = {}) {
  return href ? <Link href={href} {...other}>{children}</Link> : <button {...other}>{children}</button>;
}

export default function PrettyButton({ href, children, variant = 'primary', size = 'medium', ...other }: Props = {}) {
  return (
    <PrettyButtonContent
      href={href}
      className={`${style['pretty-button']} ${style[`variant-${variant}`]} ${style[`size-${size}`]}`}
      {...other}
    >{children}</PrettyButtonContent>
  );
}
