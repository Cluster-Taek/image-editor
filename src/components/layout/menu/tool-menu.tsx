'use client';

import { useStageContext } from '@/contexts/stage-provider';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { Image as ImageIcon, Square, Type as TypeIcon } from 'lucide-react';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

const ToolMenu = () => {
  const toolMenuStyle = ToolMenuSva();
  const { handleExport, addLayer } = useStageContext();

  const addTextLayer = () => {
    addLayer({
      type: 'text',
      text: { content: 'Test Text', fontSize: 24 },
      id: uuid(),
      name: 'Test Text',
      visible: true,
      mask: { top: 0.5, left: 0.5, bottom: 0, right: 0, rotate: 0, disabled: false },
      opacity: 1,
    });
  };

  const addImageLayer = () => {
    addLayer({
      type: 'image',
      image: { src: 'https://picsum.photos/200/300', width: 50, height: 50 },
      id: uuid(),
      name: 'Test Image',
      visible: true,
      mask: { top: 0.5, left: 0.5, bottom: 0, right: 0, rotate: 0, disabled: false, width: 50, height: 50 },
      opacity: 1,
    });
  };

  const addSquareLayer = () => {
    addLayer({
      type: 'shape',
      shape: { type: 'rectangle' },
      id: uuid(),
      name: 'Test Shape',
      visible: true,
      fill: { color: 'blue' },
      mask: { top: 0.5, left: 0.5, bottom: 0, right: 0, rotate: 0, disabled: false, width: 100, height: 100 },
      opacity: 1,
    });
  };

  const toolMenuList = useMemo<IToolMenu[]>(
    () => [
      {
        icon: <TypeIcon size={24} />,
        name: 'text',
        onClick: addTextLayer,
      },
      {
        icon: <ImageIcon size={24} />,
        name: 'image',
        onClick: addImageLayer,
      },
      {
        icon: <Square size={24} />,
        name: 'square',
        onClick: addSquareLayer,
      },
    ],
    []
  );

  return (
    <Box className={toolMenuStyle.wrapper}>
      <Box className={toolMenuStyle.toolMenuWrapper}>
        {toolMenuList.map((toolMenu) => (
          <Box key={toolMenu.name} className={toolMenuStyle.toolMenu} onClick={toolMenu.onClick}>
            {toolMenu.icon}
          </Box>
        ))}
      </Box>
      <Box className={toolMenuStyle.toolButtonWrapper}>
        <button className={toolMenuStyle.toolButton} onClick={handleExport}>
          export
        </button>
      </Box>
    </Box>
  );
};

export default ToolMenu;

const ToolMenuSva = sva({
  slots: ['wrapper', 'toolMenuWrapper', 'toolMenu', 'toolButtonWrapper', 'toolButton'],
  base: {
    wrapper: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    toolMenuWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 2,
    },
    toolMenu: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      padding: 2,
      _hover: {
        backgroundColor: 'gray.100',
      },
    },
    toolButtonWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    },
    toolButton: {
      cursor: 'pointer',
      padding: 2,
      _hover: {
        backgroundColor: 'gray.100',
      },
    },
  },
});
