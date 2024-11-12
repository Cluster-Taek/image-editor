'use client';

import { useStageContext } from '@/contexts/stage-provider';
import Konva from 'konva';
import { Text as TextType } from 'konva/lib/shapes/Text';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text as KonvaText, Transformer } from 'react-konva';

interface ITextShapeProps {
  layer: ILayer;
}

const TextShape = ({ layer }: ITextShapeProps) => {
  const { stageRef, selectedId, handleSelect, updateLayer } = useStageContext();
  const textRef = useRef<TextType>(null);
  const trRef = useRef<TransformerType>(null);

  const stageWidth = stageRef.current?.width() || 0;
  const stageHeight = stageRef.current?.height() || 0;
  const isSelected = useMemo(() => selectedId === layer.id, [selectedId, layer.id]);

  const handleSelectText = useCallback(() => {
    handleSelect(layer.id);
  }, [handleSelect, layer.id]);

  const handlePositionChange = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      updateLayer(layer.id, {
        ...layer,
        mask: {
          ...layer.mask,
          top: e.target.y() / stageHeight,
          left: e.target.x() / stageWidth,
        },
      });
    },
    [layer, updateLayer]
  );

  const handleTransformChange = useCallback(
    (e: Konva.KonvaEventObject<Event>) => {
      const node = textRef.current;
      if (!node) return;
      const scaleX = node.scaleX();

      node.scaleX(1);
      node.scaleY(1);

      updateLayer(layer.id, {
        ...layer,
        mask: {
          ...layer.mask,
          top: node.y() / stageHeight,
          left: node.x() / stageWidth,
          rotate: node.rotation(),
        },
        text: {
          ...layer.text,
          fontSize: Math.max(5, node.fontSize() * scaleX),
        },
      });
    },
    [layer, updateLayer]
  );

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
        onDragEnd={handlePositionChange}
        onTransformEnd={handleTransformChange}
        ref={textRef}
        draggable
        x={layer.mask?.left * stageWidth}
        y={layer.mask?.top * stageHeight}
        width={layer.mask?.width}
        height={layer.mask?.height}
        fontSize={layer.text?.fontSize}
        fontFamily={layer.text?.font}
        fill={layer.text?.color}
        rotation={layer.mask?.rotate}
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
