import Link from 'next/link';
import style from './style.module.scss';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  href?: string;
}

function PrettyButtonContent({ href, children, ...other }: any = {}) {
  return href ? <Link href={href} {...other}>{children}</Link> : <button {...other}>{children}</button>;
}

export default function PrettyButton({ href, children, ...other }: Props = {}) {
  return <PrettyButtonContent href={href} className={style['pretty-button']} {...other}>{children}</PrettyButtonContent>;
}
