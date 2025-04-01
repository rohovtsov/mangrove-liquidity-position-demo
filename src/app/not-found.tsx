import styles from "./not-found.module.scss";
import LaggingText from '@/modules/ui/lagging-text/lagging-text.component';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component';
import Icon from '@/modules/ui/icon/icon.component';
import Background from '@/modules/ui/background/background.component';
import { randomStr } from '@/modules/utils/random';
import NotFoundImage from '@/modules/ui/not-found-image/not-found-image.component';

export default function NotFound() {
  return (
    <div className={`${styles['page']} slide-animation`}>
      <div className="container">
        <div className={`${styles['page-inner']}`}>
          <NotFoundImage className={styles['image']} />

          <h1>
            <LaggingText texts={[
              '404 – Not Found',
              'Checking again ...',
              '404 – Still not found',
            ]} duration={3200} laggingOffset={0} laggingRatio={0.35}/>
          </h1>

          <p>
            This
            <LaggingText texts={[
              ' page could not be found. ',
              ' resource is not available. ',
            ]} duration={4800} laggingRatio={0.05}/>
            Please check the<br/>
            <LaggingText texts={[
              ' URL ',
              ' link ',
            ]} duration={4800} laggingRatio={0.05}/>
            or return to the homepage.
          </p>

          <div className={styles['buttons-wrap']}>
            <PrettyButton href={'/'}>
              <span className="pretty-button-icon prefix"><Icon name="arrow_back" source="material" /></span>
              Go Back
            </PrettyButton>

            <PrettyButton href={`/not-found-${randomStr(10)}`} variant="secondary">
              <span className="pretty-button-icon prefix"><Icon name="refresh" source="material" /></span>
              Reload
            </PrettyButton>
          </div>
        </div>
      </div>
      <Background variant="full-fancy"/>
    </div>
  );
}
