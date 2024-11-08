'use client';

import { useStageContext } from '@/contexts/stage-provider';
import { Rect as RectType } from 'konva/lib/shapes/Rect';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Rect as KonvaRect, Transformer } from 'react-konva';

interface IRectShapeProps {
  layer: ILayer;
}

const RectShape = ({ layer }: IRectShapeProps) => {
  const { selectedId, handleSelect } = useStageContext();
  const textRef = useRef<RectType>(null);
  const trRef = useRef<TransformerType>(null);

  const isSelected = useMemo(() => selectedId === layer.id, [selectedId, layer.id]);

  const handleSelectRect = useCallback(() => {
    handleSelect(layer.id);
  }, [handleSelect, layer.id]);

  useEffect(() => {
    if (isSelected && textRef.current) {
      trRef.current?.nodes([textRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaRect
        width={layer.mask?.width}
        height={layer.mask?.height}
        fill={layer.fill?.color}
        onClick={handleSelectRect}
        onTap={handleSelectRect}
        ref={textRef}
        draggable
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default RectShape;
