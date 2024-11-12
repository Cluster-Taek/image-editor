'use client';

import { useStageContext } from '@/contexts/stage-provider';
import Konva from 'konva';
import { Rect as RectType } from 'konva/lib/shapes/Rect';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Rect as KonvaRect, Transformer } from 'react-konva';

interface IRectShapeProps {
  layer: ILayer;
}

const RectShape = ({ layer }: IRectShapeProps) => {
  const { stageRef, selectedId, updateLayer, handleSelect } = useStageContext();
  const textRef = useRef<RectType>(null);
  const trRef = useRef<TransformerType>(null);

  const stageWidth = stageRef.current?.width() || 0;
  const stageHeight = stageRef.current?.height() || 0;
  const isSelected = useMemo(() => selectedId === layer.id, [selectedId, layer.id]);

  const handleSelectRect = useCallback(() => {
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
      const scaleY = node.scaleY();

      node.scaleX(1);
      node.scaleY(1);

      updateLayer(layer.id, {
        ...layer,
        mask: {
          ...layer.mask,
          top: node.y() / stageHeight,
          left: node.x() / stageWidth,
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
          rotate: node.rotation(),
        },
        text: {
          ...layer.text,
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
      <KonvaRect
        width={layer.mask?.width}
        height={layer.mask?.height}
        x={layer.mask?.left * stageWidth}
        y={layer.mask?.top * stageHeight}
        fill={layer.fill?.color}
        rotation={layer.mask?.rotate}
        onClick={handleSelectRect}
        onTap={handleSelectRect}
        onDragEnd={handlePositionChange}
        onTransformEnd={handleTransformChange}
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
