declare module "react-plotly.js" {
  import { Component } from "react";

  interface PlotParams {
    data: Array<any>;
    layout?: any;
    config?: any;
    frames?: Array<any>;
    revision?: number;
    onInitialized?: (figure: any) => void;
    onUpdate?: (figure: any) => void;
    onPurge?: (figure: any) => void;
    onError?: (err: Error) => void;
    onClick?: (event: any) => void;
    onClickAnnotation?: (event: any) => void;
    onHover?: (event: any) => void;
    onUnhover?: (event: any) => void;
    onSelected?: (event: any) => void;
    onRelayout?: (event: any) => void;
    onRestyle?: (event: any) => void;
    onRedraw?: () => void;
    onAnimated?: () => void;
    onAfterExport?: () => void;
    onAfterPlot?: () => void;
    onAnimatingFrame?: (event: any) => void;
    onAnimationInterrupted?: () => void;
    onAutoSize?: () => void;
    onBeforeExport?: () => void;
    onButtonClicked?: (event: any) => void;
    onDeselect?: () => void;
    onDoubleClick?: () => void;
    onFramework?: () => void;
    onLegendClick?: (event: any) => void;
    onLegendDoubleClick?: (event: any) => void;
    onSliderChange?: (event: any) => void;
    onSliderEnd?: (event: any) => void;
    onSliderStart?: (event: any) => void;
    onTransitioning?: () => void;
    onTransitionInterrupted?: () => void;
    onSelecting?: (event: any) => void;
    [key: string]: any;
  }

  export default class Plot extends Component<PlotParams> {}
}
