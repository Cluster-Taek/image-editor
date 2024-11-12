'use client';

import { useStageContext } from '@/contexts/stage-provider';
import React from 'react';
import { Stage as KonvaStage } from 'react-konva';

interface IStageProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const Stage = ({ width, height, children }: IStageProps) => {
  const { stageRef, handleDeselect } = useStageContext();
  return (
    <KonvaStage
      ref={stageRef}
      width={width || window.innerWidth - 400}
      height={height || window.innerHeight}
      onMouseDown={handleDeselect}
      onTouchStart={handleDeselect}
    >
      {children}
    </KonvaStage>
  );
};

export default React.memo(Stage);
