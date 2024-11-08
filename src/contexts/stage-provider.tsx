'use client';

import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

interface StageContextType {
  initialized?: boolean;
  stageRef: React.MutableRefObject<Stage | null>;
  selectedId: string | null;
  handleSelect: (id: string) => void;
  handleDeselect: (e: KonvaEventObject<Event>) => void;
  handleExport: () => void;
}

interface StageContextProps {
  children: React.ReactNode;
}

export const StageContext = createContext<StageContextType>({} as StageContextType);

const StageProvider: React.FC<StageContextProps> = ({ children }) => {
  const stageRef = useRef<Stage>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleDeselect = useCallback((e: KonvaEventObject<Event>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  }, []);

  const handleExport = useCallback(() => {
    const dataURL = stageRef.current?.toDataURL();
    if (dataURL) {
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [stageRef.current]);

  return (
    <StageContext.Provider
      value={{
        initialized: true,
        stageRef,
        selectedId,
        handleSelect,
        handleDeselect,
        handleExport,
      }}
    >
      {children}
    </StageContext.Provider>
  );
};

export default StageProvider;

export const useStageContext = () => {
  const { initialized, stageRef, selectedId, handleSelect, handleDeselect, handleExport } = useContext(StageContext);

  if (!initialized) {
    throw new Error('StageProvider is not initialized');
  }

  return {
    stageRef,
    selectedId,
    handleSelect,
    handleDeselect,
    handleExport,
  };
};
