import styles from "./not-found.module.scss";
import LaggingText from '@/modules/ui/lagging-text/lagging-text.component';
import Image from 'next/image';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component';

export default function NotFound() {
  return (
    <div className={`${styles['page']} slide-animation`}>
      <div className="container">
        <div className={`${styles['page-inner']}`}>
          <Image src="/assets/parrot.svg" alt="404 Image" width={100} height={137}/>

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

          <PrettyButton href={'/'}>Go Back</PrettyButton>
        </div>
      </div>
    </div>
  );
}
