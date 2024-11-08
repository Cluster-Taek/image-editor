'use client';

import dynamic from 'next/dynamic';

const testData: ILayer[] = [
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
      width: 50,
      height: 50,
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
];

const Home = () => {
  const Stage = dynamic(() => import('@/components/common/stage/stage'), { ssr: false });
  const Layer = dynamic(() => import('@/components/common/layer/layer'), { ssr: false });

  return (
    <Stage>
      {testData.map((layer) => {
        return <Layer key={layer.id} layer={layer} />;
      })}
    </Stage>
  );
};

export default Home;
