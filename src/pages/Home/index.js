import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Home = () => {
  useEffect(() => {
    // 保证 dom 可用, 才进行图表的渲染
    // 1. 获取要渲染图表的DOM节点
    const chartDom = document.getElementById("main");

    // 2. 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom);

    // 3. 图表参数
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    // 4. 使用图表参数完成图表的渲染
    option && myChart.setOption(option);
  },[]);
  return (
    <div>
      <div id="main" style={{width:'500px', height:'400px'}}></div>
    </div>
  );
};

export default Home;
