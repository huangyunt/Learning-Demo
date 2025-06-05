import { CanvasRenderingTarget2D } from 'fancy-canvas';
import {
    ISeriesPrimitive,
    IPrimitivePaneRenderer,
    IPrimitivePaneView,
    SeriesAttachedParameter,
    Time,
    IChartApi,
    ISeriesApi,
    SeriesOptionsMap,
} from 'lightweight-charts';

type KlineData = {
    time: any;
    open: number;
    high: number;
    low: number;
    close: number;
};

interface UserProfileOptions {
    chart: IChartApi;
    series: ISeriesApi<keyof SeriesOptionsMap>;
    data: KlineData[];
    vertAlign: 'top' | 'middle' | 'bottom';
    horzAlign: 'left' | 'middle' | 'right';
    text: string;
    lineHeight: number;
    font: string;
    color: string;
}

class UserProfileRenderer implements IPrimitivePaneRenderer {
    _data: UserProfileOptions;
    _x: any;
    _y: any;

    constructor(options: UserProfileOptions, x: any, y: any) {
        this._data = options;
        this._x = x;
        this._y = y;
    }

    draw(target: CanvasRenderingTarget2D) {
        target.useBitmapCoordinateSpace(scope => {
            const ctx = scope.context;
        	ctx.scale(scope.horizontalPixelRatio, scope.verticalPixelRatio);
            // const data = this._data;
            const imgElement = new Image();
            imgElement.src = 'https://web.dev/images/authors/katiehempenius.jpg?hl=zh-cn';

            const { chart, series } = this._data
            const timeScale = chart.timeScale();
            const x = (timeScale.timeToCoordinate(this._x) || -100)  * scope.horizontalPixelRatio;
            const y = (series.priceToCoordinate(this._y) || -100) * scope.verticalPixelRatio;
            
            // console.log("xy: ", this._x, this._y, data)
            // console.log("scope: ", scope)
            const xScaled = Math.round(this._x * scope.horizontalPixelRatio);
        	const yScaled = Math.round(this._y * scope.verticalPixelRatio);

            imgElement.onload = () => {
                // const imageHeight = imgElement?.naturalHeight ?? 1;
                // const imageWidth = imgElement?.naturalWidth ?? 1;
                ctx.drawImage(
                    imgElement,
                    x,
                    y,
                    // xScaled,
                    // yScaled,
                    50,
                    50
                );
            };
        })

        // target.useBitmapCoordinateSpace(scope => {
        //     const { chart, series } = this._data
        //     const timeScale = chart.timeScale();
        //     const x = timeScale.timeToCoordinate(this._x);
        //     const y = series.priceToCoordinate(this._y);

        //     const ctx = scope.context;
        //     const yTop = 0;
        //     const height = scope.bitmapSize.height;
        //     const halfWidth =
        //         (scope.horizontalPixelRatio * 6) / 2;
        //     const cutOff = -1 * (halfWidth + 1);
        //     const maxX = scope.bitmapSize.width;

        //     const xScaled = this._x * scope.horizontalPixelRatio;
        //     if (xScaled < cutOff) return;
        //     ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        //     const x1 = Math.max(0, Math.round(xScaled - halfWidth));
        //     const x2 = Math.min(maxX, Math.round(xScaled + halfWidth));
        //     ctx.fillRect(x1, yTop, x2 - x1, height);
        // });
        // target.useMediaCoordinateSpace(scope => {
        //     const ctx = scope.context;
        //     const data = this._data;
        //     const imgElement = new Image();
        //     imgElement.src = 'https://web.dev/images/authors/katiehempenius.jpg?hl=zh-cn';

        //     console.log("xy: ", this._x, this._y, data)
        //     imgElement.onload = () => {
        //         // const imageHeight = imgElement?.naturalHeight ?? 1;
        //         // const imageWidth = imgElement?.naturalWidth ?? 1;
        //         ctx.drawImage(
        //             imgElement,
        //             this._x,
        //             this._y,
        //             50,
        //             50
        //         );
        //     };
        // });
    }
}

class UserProfilePaneView implements IPrimitivePaneView {
    private _source: UserProfile;
    public _x: any
    public _y: any

    constructor(source: UserProfile, posX: any, posY: any) {
        this._source = source;
        this._x = posX;
        this._y = posY;
    }

    update() {

    }
    renderer() {
        return new UserProfileRenderer(this._source._data, this._x, this._y);
    }
}

export class UserProfile implements ISeriesPrimitive<Time> {
    _paneViews: UserProfilePaneView[];
    _data: UserProfileOptions;

    constructor(options: UserProfileOptions) {
        // const y1 = series.priceToCoordinate(this._source._p1.price);
        // const y2 = series.priceToCoordinate(this._source._p2.price);
        // const timeScale = this._source._chart.timeScale();
        // const x1 = timeScale.timeToCoordinate(this._source._p1.time);
        // const x2 = timeScale.timeToCoordinate(this._source._p2.time);

        this._data = options;
        const { chart, series, data } = this._data;

        this._paneViews = data.map(({ time, high }) => {
            console.log("time: ", time, high)
            return new UserProfilePaneView(this, time, high)
        })
    }

    updateAllViews() {
        this._paneViews.forEach(pw => pw.update());
    }

    paneViews() {
        return this._paneViews;
    }

    requestUpdate?: () => void;
    attached({ requestUpdate }: SeriesAttachedParameter<Time>) {
        this.requestUpdate = requestUpdate;
    }

    detached() {
        this.requestUpdate = undefined;
    }

    applyOptions(options: Partial<UserProfileOptions>) {
        this._data = { ...this._data, ...options };
        if (this.requestUpdate) this.requestUpdate();
    }
}