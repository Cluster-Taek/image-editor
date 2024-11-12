'use client';

import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

interface StageContextType {
  initialized?: boolean;
  stageRef: React.MutableRefObject<Stage | null>;
  layers?: ILayer[];
  selectedId: string | null;
  addLayer: (layer: ILayer) => void;
  updateLayer: (id: string, layer: ILayer) => void;
  removeLayer: (id: string) => void;
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
  const [layers, setLayers] = useState<ILayer[]>([
    {
      id: '1',
      type: 'text',
      text: {
        content: 'Test Text',
        font: 'Arial',
        fontSize: 16,
        color: 'red',
        textAlign: 'left',
        fontWeight: 800,
      },
      name: 'Test Text',
      visible: true,
      mask: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        rotate: 0,
        disabled: false,
      },
      opacity: 1,
    },
    {
      id: '2',
      type: 'image',
      image: {
        src: 'https://picsum.photos/200/300',
        width: 50,
        height: 50,
      },
      name: 'Test Image',
      visible: true,
      mask: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        rotate: 0,
        disabled: false,
        width: 50,
        height: 50,
      },
      opacity: 1,
    },
    {
      id: '3',
      type: 'shape',
      shape: {
        type: 'rectangle',
      },
      name: 'Test Shape',
      visible: true,
      fill: {
        color: 'blue',
      },
      mask: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        rotate: 0,
        disabled: false,
        width: 50,
        height: 50,
      },
      opacity: 1,
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addLayer = useCallback((layer: ILayer) => {
    setLayers((prev) => [...prev, layer]);
    handleSelect(layer.id);
  }, []);

  const updateLayer = useCallback((id: string, layer: ILayer) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? layer : l)));
  }, []);

  const removeLayer = useCallback((id: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
  }, []);

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
        layers,
        selectedId,
        addLayer,
        updateLayer,
        removeLayer,
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
  const {
    initialized,
    stageRef,
    layers,
    selectedId,
    addLayer,
    updateLayer,
    removeLayer,
    handleSelect,
    handleDeselect,
    handleExport,
  } = useContext(StageContext);

  if (!initialized) {
    throw new Error('StageProvider is not initialized');
  }

  return {
    stageRef,
    layers,
    selectedId,
    addLayer,
    updateLayer,
    removeLayer,
    handleSelect,
    handleDeselect,
    handleExport,
  };
};
