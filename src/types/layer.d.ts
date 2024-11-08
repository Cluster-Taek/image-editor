interface ILayer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  opacity: number;
  mask: IMask;
  fill?: IFill;
  stroke?: IStroke;
  shape?: IShape;
  text?: IText;
  image?: IImage;
}

interface IMask {
  top: number;
  left: number;
  bottom: number;
  right: number;
  rotate: number;
  width: number;
  height: number;
  disabled: boolean;
}

interface IFill {
  color: string;
}

interface IStroke {
  color: string;
  width: number;
}

interface IShape {
  type: ShapeType;
  points?: number[][];
}

interface IText {
  content: string;
  font?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  textAlign?: TextAlign;
}

interface IImage {
  src: string;
  width: number;
  height: number;
}

type LayerType = 'shape' | 'text' | 'image';

type ShapeType = 'rectangle' | 'circle' | 'polygon';

type TextAlign = 'left' | 'center' | 'right';
