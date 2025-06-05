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
        target.useMediaCoordinateSpace(scope => {
            const ctx = scope.context;
            const data = this._data;
            const imgElement = new Image();
            imgElement.src = 'https://web.dev/images/authors/katiehempenius.jpg?hl=zh-cn';

            imgElement.onload = () => {
                // const imageHeight = imgElement?.naturalHeight ?? 1;
                // const imageWidth = imgElement?.naturalWidth ?? 1;
                ctx.drawImage(
                    imgElement,
                    this._x,
                    this._y,
                    50,
                    50
                );
            };
        });
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

    update() { }
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
            const timeScale = chart.timeScale();
            const x = timeScale.timeToCoordinate(time);
            const y = series.priceToCoordinate(high);
            return new UserProfilePaneView(this, x, y)
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