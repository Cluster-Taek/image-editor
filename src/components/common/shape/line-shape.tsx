'use client';

import { useStageContext } from '@/contexts/stage-provider';
import { Line as LineType } from 'konva/lib/shapes/Line';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Line as KonvaLine, Transformer } from 'react-konva';

interface ILineShapeProps {
  layer: ILayer;
}

const LineShape = ({ layer }: ILineShapeProps) => {
  const { selectedId, handleSelect } = useStageContext();
  const textRef = useRef<LineType>(null);
  const trRef = useRef<TransformerType>(null);

  const isSelected = useMemo(() => selectedId === layer.id, [selectedId, layer.id]);

  const handleSelectLine = useCallback(() => {
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
      <KonvaLine
        width={layer.mask?.width}
        height={layer.mask?.height}
        fill={layer.fill?.color}
        onClick={handleSelectLine}
        onTap={handleSelectLine}
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

export default LineShape;
