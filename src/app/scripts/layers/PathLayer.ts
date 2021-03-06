import { Path } from '../commands';
import { AbstractLayer } from './AbstractLayer';
import { ColorUtil, MathUtil } from '../common';

/**
 * Model object that mirrors the VectorDrawable's '<path>' element.
 */
export class PathLayer extends AbstractLayer {
  constructor(
    id: string,
    public pathData: Path,
    public fillColor: string = undefined,
    public fillAlpha = 1,
    public strokeColor: string = undefined,
    public strokeAlpha = 1,
    public strokeWidth = 0,
    public strokeLinecap = 'butt',
    public strokeLinejoin = 'miter',
    public strokeMiterLimit = 4,
    public trimPathStart = 0,
    public trimPathEnd = 1,
    public trimPathOffset = 0,
  ) {
    super(undefined, id);
  }

  interpolate(start: PathLayer, end: PathLayer, fraction: number) {
    this.pathData = this.pathData.interpolate(start.pathData, end.pathData, fraction);
    if (start.fillColor && end.fillColor) {
      this.fillColor = this.lerpColor(start.fillColor, end.fillColor, fraction);
    }
    this.fillAlpha = MathUtil.lerp(start.fillAlpha, end.fillAlpha, fraction);
    if (start.strokeColor && end.strokeColor) {
      this.strokeColor = this.lerpColor(start.strokeColor, end.strokeColor, fraction);
    }
    this.strokeAlpha = MathUtil.lerp(start.strokeAlpha, end.strokeAlpha, fraction);
    this.strokeWidth = MathUtil.lerp(start.strokeWidth, end.strokeWidth, fraction);
    this.trimPathStart = MathUtil.lerp(start.trimPathStart, end.trimPathStart, fraction);
    this.trimPathEnd = MathUtil.lerp(start.trimPathEnd, end.trimPathEnd, fraction);
    this.trimPathOffset = MathUtil.lerp(start.trimPathOffset, end.trimPathOffset, fraction);
  }

  private lerpColor(start: string, end: string, fraction: number) {
    const startColor = ColorUtil.parseAndroidColor(start);
    const endColor = ColorUtil.parseAndroidColor(end);
    return ColorUtil.toAndroidString({
      r: MathUtil.clamp(Math.round(MathUtil.lerp(startColor.r, endColor.r, fraction)), 0, 255),
      g: MathUtil.clamp(Math.round(MathUtil.lerp(startColor.g, endColor.g, fraction)), 0, 255),
      b: MathUtil.clamp(Math.round(MathUtil.lerp(startColor.b, endColor.b, fraction)), 0, 255),
      a: MathUtil.clamp(Math.round(MathUtil.lerp(startColor.a, endColor.a, fraction)), 0, 255)
    });
  }
}
