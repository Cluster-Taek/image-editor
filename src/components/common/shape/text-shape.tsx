'use client';

import { useStageContext } from '@/contexts/stage-provider';
import { Text as TextType } from 'konva/lib/shapes/Text';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text as KonvaText, Transformer } from 'react-konva';

interface ITextShapeProps {
  layer: ILayer;
}

const TextShape = ({ layer }: ITextShapeProps) => {
  const { selectedId, handleSelect } = useStageContext();
  const textRef = useRef<TextType>(null);
  const trRef = useRef<TransformerType>(null);

  const isSelected = useMemo(() => selectedId === layer.id, [selectedId, layer.id]);

  const handleSelectText = useCallback(() => {
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
      <KonvaText
        text={layer.text?.content}
        onClick={handleSelectText}
        onTap={handleSelectText}
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

export default TextShape;