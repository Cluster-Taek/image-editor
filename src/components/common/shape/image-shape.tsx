'use client';

import { useStageContext } from '@/contexts/stage-provider';
import Konva from 'konva';
import { Image as ImageType } from 'konva/lib/shapes/Image';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';

interface IImageShapeProps {
  layer: ILayer;
}

const ImageShape = ({ layer }: IImageShapeProps) => {
  const { stageRef, selectedId, handleSelect, updateLayer } = useStageContext();
  const imageRef = useRef<ImageType>(null);
  const trRef = useRef<TransformerType>(null);
  const imageOrigin = new window.Image();
  imageOrigin.crossOrigin = 'anonymous';
  imageOrigin.src = layer.image?.src || '';

  const stageWidth = stageRef.current?.width() || 0;
  const stageHeight = stageRef.current?.height() || 0;
  const isSelected = useMemo(() => selectedId === layer.id, [selectedId, layer.id]);

  const handleSelectImage = useCallback(() => {
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
      const node = imageRef.current;
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
      });
    },
    [layer, updateLayer]
  );

  useEffect(() => {
    if (isSelected && imageRef.current) {
      trRef.current?.nodes([imageRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        onClick={handleSelectImage}
        onTap={handleSelectImage}
        onDragEnd={handlePositionChange}
        onTransformEnd={handleTransformChange}
        ref={imageRef}
        image={imageOrigin}
        draggable
        x={layer.mask?.left * stageWidth}
        y={layer.mask?.top * stageHeight}
        width={layer.mask?.width}
        height={layer.mask?.height}
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

export default React.memo(ImageShape);
