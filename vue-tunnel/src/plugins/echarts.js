import * as echarts from "echarts"
import china from '../assets/json/china.json'

export default {
    //将ercharts 挂载到全局对象
    install: app => {
        app.config.globalProperties.$line = (element, data) => {
            var myChart = echarts.init(document.getElementById(element))
            const option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['隧道增加数量', '地质预测数量', ]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: data
            }
            myChart.setOption(option)
        },

        app.config.globalProperties.$radar = (element, data) => {
            var myChart = echarts.init(document.getElementById(element))
            const option = {
                legend: {
                    data: ['Allocated Budget', 'Actual Spending']
                },
                radar: {
                    // shape: 'circle',
                    indicator: [{
                            name: 'Sales',
                            max: 6500
                        },
                        {
                            name: 'Administration',
                            max: 16000
                        },
                        {
                            name: 'Information Technology',
                            max: 30000
                        },
                        {
                            name: 'Customer Support',
                            max: 38000
                        },
                        {
                            name: 'Development',
                            max: 52000
                        },
                        {
                            name: 'Marketing',
                            max: 25000
                        }
                    ]
                },
                series: [{
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [{
                            value: [4200, 3000, 20000, 35000, 50000, 18000],
                            name: 'Allocated Budget'
                        },
                        {
                            value: [5000, 14000, 28000, 26000, 42000, 21000],
                            name: 'Actual Spending'
                        }
                    ]
                }]
            }
            myChart.setOption(option)
        },
        app.config.globalProperties.$rose = (element, data) => {
            var myChart = echarts.init(document.getElementById(element))
            const option = {
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                series: [{
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [25, 150],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [{
                            value: 40,
                            name: 'rose 1'
                        },
                        {
                            value: 38,
                            name: 'rose 2'
                        },
                        {
                            value: 32,
                            name: 'rose 3'
                        },
                        {
                            value: 30,
                            name: 'rose 4'
                        },
                        {
                            value: 28,
                            name: 'rose 5'
                        }
                    ]
                }]
            }
            myChart.setOption(option)
        },
        app.config.globalProperties.$bar = (element, data) => {
            var myChart = echarts.init(document.getElementById(element))
            const option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        120,
                        {
                            value: 200,
                            itemStyle: {
                                color: '#a90000'
                            }
                        },
                        150,
                        80,
                        70,
                        110,
                        130
                    ],
                    type: 'bar'
                }]
            }
            myChart.setOption(option)
        },
        app.config.globalProperties.$china = (element, data) => {
            var myChart = echarts.init(document.getElementById(element))
            // 注册地图
            echarts.registerMap("china", china)
            const option = {
                // 鼠标点击弹窗
                tooltip: {
                    trigger: "item", // 点击触发
                    enterable: true // 是否出现弹框
                },
                visualMap: {
                    origin: "vertical",
                    type: "piecewise",
                    pieces: [{
                            min: 0,
                            max: 0,
                            color: "#fff"
                        },
                        {
                            min: 0,
                            max: 10,
                            color: "#fdfdcf"
                        },
                        {
                            min: 10,
                            max: 20,
                            color: "#fe9e83"
                        },
                        {
                            min: 20,
                            max: 30,
                            color: "#e55a4e"
                        },
                        {
                            min: 30,
                            max: 40,
                            color: "#ff0000"
                        },
                        {
                            min: 40,
                            max: 100,
                            color: "#4f070d"
                        },
                    ]
                },
                series: [{
                    name: "中国地图",
                    type: "map",
                    map: "china",
                    roam: false, // 鼠标滚轮是否可以缩放
                    zoom: 1.2, // 默认地图的倍数
                    label: {
                        show: true, // 是否显示地图上的文本信息
                        fontSize: 8
                    },
                    itemStyle: {
                        areaColor: "rgba(255,255,255,1)",
                        borderColor: "rgba(0,0,0,0.2)"
                    },
                    data: [
                        {
                            name: "内蒙古",
                            value: 10
                        },
                        {
                            name: "江苏",
                            value: 2
                        },
                        {
                            name: "黑龙江",
                            value: 20
                        },
                        {
                            name: "山东",
                            value: 67
                        },
                        {
                            name: "河南",
                            value: 35
                        },
                        {
                            name: "河北",
                            value: 76
                        },
                        {
                            name: "江西",
                            value: 9
                        },
                        {
                            name: "新疆",
                            value: 11
                        },
                        {
                            name: "青海",
                            value: 32
                        },
                        {
                            name: "山西",
                            value: 99
                        },
                        {
                            name: "吉林",
                            value: 8
                        },
                        {
                            name: "辽宁",
                            value: 81
                        },
                        {
                            name: "宁夏",
                            value: 29
                        },
                        {
                            name: "浙江",
                            value: 33
                        },
                        {
                            name: "香港",
                            value: 11
                        },
                        {
                            name: "澳门",
                            value: 14
                        },
                        {
                            name: "云南",
                            value: 4
                        },
                        {
                            name: "西藏",
                            value: 1
                        },
                        {
                            name: "陕西",
                            value: 39
                        },
                        {
                            name: "四川",
                            value: 10
                        },
                        {
                            name: "重庆",
                            value: 13
                        },
                        {
                            name: "天津",
                            value: 40
                        },
                        {
                            name: "海南",
                            value: 4
                        },
                        {
                            name: "甘肃",
                            value: 43
                        },
                        {
                            name: "广东",
                            value: 3
                        },
                        {
                            name: "广西",
                            value: 31
                        },
                        {
                            name: "北京",
                            value: 50
                        },
                        {
                            name: "安徽",
                            value: 30
                        },
                        {
                            name: "贵州",
                            value: 3
                        },
                        {
                            name: "福建",
                            value: 38
                        },
                        {
                            name: "湖南",
                            value: 74
                        },
                        {
                            name: "湖北",
                            value: 65
                        },
                        {
                            name: "台湾",
                            value: 64
                        },
                        {
                            name: "南海诸岛",
                            value: 9
                        },
                    ]
                }]
            }
            myChart.setOption(option)
        }
    },
}