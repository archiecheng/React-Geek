import * as echarts from "echarts";
import { useEffect } from "react";
// 柱状图组件

// 1. 把功能代码都放到组件中
// 2. 把可变的部分抽象成prop参数

const BarChart = ({title}) => {
  useEffect(() => {
    // 保证 dom 可用, 才进行图表的渲染
    // 1. 获取要渲染图表的DOM节点
    const chartDom = document.getElementById("main");

    // 2. 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom);

    // 3. 图表参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };

    // 4. 使用图表参数完成图表的渲染
    option && myChart.setOption(option);
  }, [title]);
  return <div id="main" style={{ width: "500px", height: "400px" }}></div>;
};


export default BarChart