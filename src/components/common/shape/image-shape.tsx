'use client';

import { useStageContext } from '@/contexts/stage-provider';
import { Image as ImageType } from 'konva/lib/shapes/Image';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';

interface IImageShapeProps {
  layer: ILayer;
}

const ImageShape = ({ layer }: IImageShapeProps) => {
  const { selectedId, handleSelect } = useStageContext();
  const imageRef = useRef<ImageType>(null);
  const trRef = useRef<TransformerType>(null);
  const imageOrigin = new window.Image();
  imageOrigin.crossOrigin = 'anonymous';
  imageOrigin.src = layer.image?.src || '';

  const isSelected = useMemo(() => selectedId === layer.id, [selectedId, layer.id]);

  const handleSelectImage = useCallback(() => {
    handleSelect(layer.id);
  }, [handleSelect, layer.id]);

  useEffect(() => {
    if (isSelected && imageRef.current) {
      trRef.current?.nodes([imageRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage onClick={handleSelectImage} onTap={handleSelectImage} ref={imageRef} image={imageOrigin} draggable />
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

export default ImageShape;
