import React, { useRef, useEffect, useState } from 'react';
import {
  createChart,
  CandlestickSeries,
  createSeriesMarkers,
  UTCTimestamp
} from 'lightweight-charts';
import { useAsyncEffect } from 'ahooks';
import { ImageWatermark } from './plugin';


// K线数据类型定义
type KlineData = {
  time: number | string;
  open: number;
  high: number;
  low: number;
  close: number;
};

const KlineChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useAsyncEffect(async () => {
    const chartOptions = { layout: { textColor: 'white', background: { type: 'solid', color: 'black' } } };
    const chart = createChart('container', chartOptions as any);

    const candlestickSeries = chart.addSeries(CandlestickSeries,
      {
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350'
      });

    const response = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=100');
    const klines = await response.json();

    const formattedData: KlineData[] = klines.map((kline: any[]) => ({
      time: new Date(kline[0]).getTime() / 1000 as UTCTimestamp, // 转换为秒
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4])
    }));

    // 定义标记数据
    // const createMarkers = (): any => {
    //   return [
    //     {
    //       time: '2023-06-10',  // 时间点
    //       position: 'aboveBar', // 位置：bar上方
    //       color: 'rgba(0, 0, 0, 0)', // 透明背景
    //       shape: 'custom',      // 自定义形状
    //       customElement: createAvatarElement('https://example.com/avatar1.png'),
    //     },
    //     {
    //       time: '2023-06-20',
    //       position: 'belowBar',
    //       color: 'rgba(0, 0, 0, 0)',
    //       shape: 'custom',
    //       customElement: createAvatarElement('https://example.com/avatar2.png'),
    //     },
    //   ];
    // };

    // const createAvatarElement = (src: string) => {
    //   const div = document.createElement('div');
    //   div.style.width = '24px';
    //   div.style.height = '24px';
    //   div.style.borderRadius = '50%';
    //   div.style.overflow = 'hidden';
    //   div.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';

    //   const img = document.createElement('img');
    //   img.src = src;
    //   img.style.width = '100%';
    //   img.style.height = '100%';
    //   img.style.objectFit = 'cover';

    //   div.appendChild(img);
    //   return div;
    // };

    // const markers = formattedData.map((data) => {
    //   return {
    //     time: data.time as UTCTimestamp,
    //     color: 'green',
    //     position: 'inBar',
    //     shape: 'arrowDown',
    //     text: 'hello',

    //   }
    // })
    const watermark = new ImageWatermark('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', {
      maxHeight: 1100,
      maxWidth: 400,
      padding: 50,
      alpha: 0.4,
    });


    console.log("candlestickSeries: ", candlestickSeries)
    // createSeriesMarkers(candlestickSeries, markers as any)

    candlestickSeries.setData(formattedData as any);

    candlestickSeries.attachPrimitive(watermark);

    console.log("chart: ", chart, candlestickSeries)
    // 创建图片标记插件

    chart.timeScale().fitContent();
  }, [])

  return (
    <div
      // ref={chartContainerRef}
      id='container'
      style={{ width: '100%', height: '600px', minHeight: '500px', margin: '20px 0' }}
    />
  );
};

export default KlineChart;    