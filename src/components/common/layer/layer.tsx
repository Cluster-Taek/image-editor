'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Layer as KonvaLayer } from 'react-konva';

const ImageShape = dynamic(() => import('@/components/common/shape/image-shape'), { ssr: false });
const RectShape = dynamic(() => import('@/components/common/shape/rect-shape'), { ssr: false });
const TextShape = dynamic(() => import('@/components/common/shape/text-shape'), { ssr: false });

interface ILayerProps {
  layer?: ILayer;
}

const Layer = ({ layer }: ILayerProps) => {
  return (
    <KonvaLayer>
      {layer?.type === 'text' && <TextShape layer={layer} />}
      {layer?.type === 'image' && <ImageShape layer={layer} />}
      {layer?.type === 'shape' && <RectShape layer={layer} />}
    </KonvaLayer>
  );
};

export default React.memo(Layer);
