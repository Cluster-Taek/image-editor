'use client';

import { useStageContext } from '@/contexts/stage-provider';
import { Stage as KonvaStage } from 'react-konva';

interface IStageProps {
  children?: React.ReactNode;
}

const Stage = ({ children }: IStageProps) => {
  const { stageRef, handleDeselect } = useStageContext();
  return (
    <KonvaStage
      ref={stageRef}
      width={window.innerWidth - 400}
      height={window.innerHeight}
      onMouseDown={handleDeselect}
      onTouchStart={handleDeselect}
    >
      {children}
    </KonvaStage>
  );
};

export default Stage;
