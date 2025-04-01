import style from './style.module.scss';
import Liane from '@/modules/ui/background/liane/liane.component';

interface Props {
  variant: 'full-fancy' | 'mild-fancy';
}

export default function Background({ variant }: Props) {
  return (
    <div className={`${style['background']} ${style[`variant-${variant}`]}`}>
      <Liane className={style['background-liane']} />
      <div className={style['background-blob1']}></div>
      <div className={style['background-blob2']}></div>
    </div>
  )
}
