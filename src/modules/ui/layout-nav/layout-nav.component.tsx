import ActiveLink from '@/modules/ui/active-link/active-link.component';
import Image from 'next/image';
import styles from './style.module.scss';
import Link from 'next/link';
import Icon from '@/modules/ui/icon/icon.component';

export default function LayoutNav() {
  return (
    <div className={`${styles['layout-nav']} container`}>
      <ActiveLink className={styles['logo']} href={'/'} activeClassName={styles['active']}>
        <Image src="/assets/logo.svg" alt="Logo" width={32} height={26}/>
        <span>Mangrove</span>
      </ActiveLink>
      <ul>
        <li>
          <ActiveLink className={styles['nav-link']} href={'/add-liquidity'} activeClassName={styles['active']}>
            <Icon name="trade" />
            Add Liquidity
          </ActiveLink>
        </li>
        <li>
          <Link className={styles['nav-link']} href={'/not-found'}>
            <Icon name="search" source="material" className={styles['icon-search']} />
            Check out 404
          </Link>
        </li>
      </ul>
    </div>
  )
}
