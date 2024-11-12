'use client';

import { useStageContext } from '@/contexts/stage-provider';
import { sva } from '@/styled-system/css';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';

const Stage = dynamic(() => import('@/components/common/stage/stage'), { ssr: false });
const Layer = dynamic(() => import('@/components/common/layer/layer'), { ssr: false });

const Home = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const homeStyle = HomeSva();
  const { layers } = useStageContext();

  return (
    <div className={homeStyle.wrapper}>
      <div ref={divRef} className={homeStyle.stageWrapper}>
        <Stage width={divRef.current?.clientWidth} height={divRef.current?.clientHeight}>
          {layers?.map((layer) => {
            return <Layer key={layer.id} layer={layer} />;
          })}
        </Stage>
      </div>
    </div>
  );
};

export default React.memo(Home);

const HomeSva = sva({
  slots: ['wrapper', 'stageWrapper'],
  base: {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    stageWrapper: {
      width: 'calc(100vw - 500px)',
      height: 'calc((100vw - 500px) * 9 / 16)',
      background: 'white',
      display: 'block',
    },
  },
});
