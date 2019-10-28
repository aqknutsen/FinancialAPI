import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import SimpleLineChart from './SimpleLineChart';
import Months from './common/Months';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Loading from './common/Loading';
import MultiSelect from './selects/multiselect';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import StockChart from './Stock.jsx'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Topbar from './Topbar';

require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)



const numeral = require('numeral');
numeral.defaultFormat('0,000');



const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing(2),
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
});

const monthRange = Months;

class Dashboard extends Component {


  
  state = {
    loading: true,
    amount: 15000,
    period: 3,
    start: 0,
    monthlyInterest: 0,
    totalInterest: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    data: [],
    stockdata: {
      yAxis: [{
        height: '75%',
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'AAPL'
        }
      }, {
        top: '75%',
        height: '25%',
        labels: {
          align: 'right',
          x: -3
        },
        offset: 0,
        title: {
          text: 'MACD'
        }
      }],
      options:  {
        title: {
          text: 'My chart'
        },
        series: [{
          data: [1, 2, 3]
        }]
      },
      testdata: [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59], [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02], [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68], [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87], [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91], [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84], [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16], [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86], [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86], [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03], [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87], [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59], [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5], [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97], [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7], [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06], [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29], [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04], [1229299200000, 13.54]],

      series: [{
        data: [
          /* Jan 2017 */
          [1483401600000,115.80,116.33,114.76,116.15],
          [1483488000000,115.85,116.51,115.75,116.02],
          [1483574400000,115.92,116.86,115.81,116.61],
          [1483660800000,116.78,118.16,116.47,117.91],
          [1483920000000,117.95,119.43,117.94,118.99],
          [1484006400000,118.77,119.38,118.30,119.11],
          [1484092800000,118.74,119.93,118.60,119.75],
          [1484179200000,118.90,119.30,118.21,119.25],
          [1484265600000,119.11,119.62,118.81,119.04],
          [1484611200000,118.34,120.24,118.22,120.00],
          [1484697600000,120.00,120.50,119.71,119.99],
          [1484784000000,119.40,120.09,119.37,119.78],
          [1484870400000,120.45,120.45,119.73,120.00],
          [1485129600000,120.00,120.81,119.77,120.08],
          [1485216000000,119.55,120.10,119.50,119.97],
          [1485302400000,120.42,122.10,120.28,121.88],
          [1485388800000,121.67,122.44,121.60,121.94],
          [1485475200000,122.14,122.35,121.60,121.95],
          [1485734400000,120.93,121.63,120.66,121.63],
          [1485820800000,121.15,121.39,120.62,121.35],
          /* Feb 2017 */
          [1485907200000,127.03,130.49,127.01,128.75],
          [1485993600000,127.98,129.39,127.78,128.53],
          [1486080000000,128.31,129.19,128.16,129.08],
          [1486339200000,129.13,130.50,128.90,130.29],
          [1486425600000,130.54,132.09,130.45,131.53],
          [1486512000000,131.35,132.22,131.22,132.04],
          [1486598400000,131.65,132.44,131.12,132.42],
          [1486684800000,132.46,132.94,132.05,132.12],
          [1486944000000,133.08,133.82,132.75,133.29],
          [1487030400000,133.47,135.09,133.25,135.02],
          [1487116800000,135.52,136.27,134.62,135.51],
          [1487203200000,135.67,135.90,134.84,135.34],
          [1487289600000,135.10,135.83,135.10,135.72],
          [1487635200000,136.23,136.75,135.98,136.70],
          [1487721600000,136.43,137.12,136.11,137.11],
          [1487808000000,137.38,137.48,136.30,136.53],
          [1487894400000,135.91,136.66,135.28,136.66],
          [1488153600000,137.14,137.44,136.28,136.93],
          [1488240000000,137.08,137.44,136.70,136.99],
          /* Mar 2017 */
          [1488326400000,137.89,140.15,137.60,139.79],
          [1488412800000,140.00,140.28,138.76,138.96],
          [1488499200000,138.78,139.83,138.59,139.78],
          [1488758400000,139.36,139.77,138.60,139.34],
          [1488844800000,139.06,139.98,138.79,139.52],
          [1488931200000,138.95,139.80,138.82,139.00],
          [1489017600000,138.74,138.79,137.05,138.68],
          [1489104000000,139.25,139.36,138.64,139.14],
          [1489363200000,138.85,139.43,138.82,139.20],
          [1489449600000,139.30,139.65,138.84,138.99],
          [1489536000000,139.41,140.75,139.02,140.46],
          [1489622400000,140.72,141.02,140.26,140.69],
          [1489708800000,141.00,141.00,139.89,139.99],
          [1489968000000,140.40,141.50,140.23,141.46],
          [1490054400000,142.11,142.80,139.73,139.84],
          [1490140800000,139.84,141.60,139.76,141.42],
          [1490227200000,141.26,141.58,140.61,140.92],
          [1490313600000,141.50,141.74,140.35,140.64],
          [1490572800000,139.39,141.22,138.62,140.88],
          [1490659200000,140.91,144.04,140.62,143.80],
          [1490745600000,143.68,144.49,143.19,144.12],
          [1490832000000,144.19,144.50,143.50,143.93],
          [1490918400000,143.72,144.27,143.01,143.66],
          /* Apr 2017 */
          [1491177600000,143.71,144.12,143.05,143.70],
          [1491264000000,143.25,144.89,143.17,144.77],
          [1491350400000,144.22,145.46,143.81,144.02],
          [1491436800000,144.29,144.52,143.45,143.66],
          [1491523200000,143.73,144.18,143.27,143.34],
          [1491782400000,143.60,143.88,142.90,143.17],
          [1491868800000,142.94,143.35,140.06,141.63],
          [1491955200000,141.60,142.15,141.01,141.80],
          [1492041600000,141.91,142.38,141.05,141.05],
          [1492387200000,141.48,141.88,140.87,141.83],
          [1492473600000,141.41,142.04,141.11,141.20],
          [1492560000000,141.88,142.00,140.45,140.68],
          [1492646400000,141.22,142.92,141.16,142.44],
          [1492732800000,142.44,142.68,141.85,142.27],
          [1492992000000,143.50,143.95,143.18,143.64],
          [1493078400000,143.91,144.90,143.87,144.53],
          [1493164800000,144.47,144.60,143.38,143.68],
          [1493251200000,143.92,144.16,143.31,143.79],
          [1493337600000,144.09,144.30,143.27,143.65],
          /* May 2017 */
          [1493596800000,145.10,147.20,144.96,146.58],
          [1493683200000,147.54,148.09,146.84,147.51],
          [1493769600000,145.59,147.49,144.27,147.06],
          [1493856000000,146.52,147.14,145.81,146.53],
          [1493942400000,146.76,148.98,146.76,148.96],
          [1494201600000,149.03,153.70,149.03,153.01],
          [1494288000000,153.87,154.88,153.45,153.99],
          [1494374400000,153.63,153.94,152.11,153.26],
          [1494460800000,152.45,154.07,152.31,153.95],
          [1494547200000,154.70,156.42,154.67,156.10],
          [1494806400000,156.01,156.65,155.05,155.70],
          [1494892800000,155.94,156.06,154.72,155.47],
          [1494979200000,153.60,154.57,149.71,150.25],
          [1495065600000,151.27,153.34,151.13,152.54],
          [1495152000000,153.38,153.98,152.63,153.06],
          [1495411200000,154.00,154.58,152.91,153.99],
          [1495497600000,154.90,154.90,153.31,153.80],
          [1495584000000,153.84,154.17,152.67,153.34],
          [1495670400000,153.73,154.35,153.03,153.87],
          [1495756800000,154.00,154.24,153.31,153.61],
          [1496102400000,153.42,154.43,153.33,153.67],
          [1496188800000,153.97,154.17,152.38,152.76],
          /* Jun 2017 */
          [1496275200000,153.17,153.33,152.22,153.18],
          [1496361600000,153.58,155.45,152.89,155.45],
          [1496620800000,154.34,154.45,153.46,153.93],
          [1496707200000,153.90,155.81,153.78,154.45],
          [1496793600000,155.02,155.98,154.48,155.37],
          [1496880000000,155.25,155.54,154.40,154.99],
          [1496966400000,155.19,155.19,146.02,148.98],
          [1497225600000,145.74,146.09,142.51,145.42],
          [1497312000000,147.16,147.45,145.15,146.59],
          [1497398400000,147.50,147.50,143.84,145.16],
          [1497484800000,143.32,144.48,142.21,144.29],
          [1497571200000,143.78,144.50,142.20,142.27],
          [1497830400000,143.66,146.74,143.66,146.34],
          [1497916800000,146.87,146.87,144.94,145.01],
          [1498003200000,145.52,146.07,144.61,145.87],
          [1498089600000,145.77,146.70,145.12,145.63],
          [1498176000000,145.13,147.16,145.11,146.28],
          [1498435200000,147.17,148.28,145.38,145.82],
          [1498521600000,145.01,146.16,143.62,143.73],
          [1498608000000,144.49,146.11,143.16,145.83],
          [1498694400000,144.71,145.13,142.28,143.68],
          [1498780800000,144.45,144.96,143.78,144.02],
          /* Jul 2017 */
          [1499040000000,144.88,145.30,143.10,143.50],
          [1499212800000,143.69,144.79,142.72,144.09],
          [1499299200000,143.02,143.50,142.41,142.73],
          [1499385600000,142.90,144.75,142.90,144.18],
          [1499644800000,144.11,145.95,143.37,145.06],
          [1499731200000,144.73,145.85,144.38,145.53],
          [1499817600000,145.87,146.18,144.82,145.74],
          [1499904000000,145.50,148.49,145.44,147.77],
          [1499990400000,147.97,149.33,147.33,149.04],
          [1500249600000,148.82,150.90,148.57,149.56],
          [1500336000000,149.20,150.13,148.67,150.08],
          [1500422400000,150.48,151.42,149.95,151.02],
          [1500508800000,151.50,151.74,150.19,150.34],
          [1500595200000,149.99,150.44,148.88,150.27],
          [1500854400000,150.58,152.44,149.90,152.09],
          [1500940800000,151.80,153.84,151.80,152.74],
          [1501027200000,153.35,153.93,153.06,153.46],
          [1501113600000,153.75,153.99,147.30,150.56],
          [1501200000000,149.89,150.23,149.19,149.50],
          [1501459200000,149.90,150.33,148.13,148.73],
          /* Aug 2017 */
          [1501545600000,149.10,150.22,148.41,150.05],
          [1501632000000,159.28,159.75,156.16,157.14],
          [1501718400000,157.05,157.21,155.02,155.57],
          [1501804800000,156.07,157.40,155.69,156.39],
          [1502064000000,157.06,158.92,156.67,158.81],
          [1502150400000,158.60,161.83,158.27,160.08],
          [1502236800000,159.26,161.27,159.11,161.06],
          [1502323200000,159.90,160.00,154.63,155.32],
          [1502409600000,156.60,158.57,156.07,157.48],
          [1502668800000,159.32,160.21,158.75,159.85],
          [1502755200000,160.66,162.20,160.14,161.60],
          [1502841600000,161.94,162.51,160.15,160.95],
          [1502928000000,160.52,160.71,157.84,157.86],
          [1503014400000,157.86,159.50,156.72,157.50],
          [1503273600000,157.50,157.89,155.11,157.21],
          [1503360000000,158.23,160.00,158.02,159.78],
          [1503446400000,159.07,160.47,158.88,159.98],
          [1503532800000,160.43,160.74,158.55,159.27],
          [1503619200000,159.65,160.56,159.27,159.86],
          [1503878400000,160.14,162.00,159.93,161.47],
          [1503964800000,160.10,163.12,160.00,162.91],
          [1504051200000,163.80,163.89,162.61,163.35],
          [1504137600000,163.64,164.52,163.48,164.00],
          /* Sep 2017 */
          [1504224000000,164.80,164.94,163.63,164.05],
          [1504569600000,163.75,164.25,160.56,162.08],
          [1504656000000,162.71,162.99,160.52,161.91],
          [1504742400000,162.09,162.24,160.36,161.26],
          [1504828800000,160.86,161.15,158.53,158.63],
          [1505088000000,160.50,162.05,159.89,161.50],
          [1505174400000,162.61,163.96,158.77,160.86],
          [1505260800000,159.87,159.96,157.91,159.65],
          [1505347200000,158.99,159.40,158.09,158.28],
          [1505433600000,158.47,160.97,158.00,159.88],
          [1505692800000,160.11,160.50,158.00,158.67],
          [1505779200000,159.51,159.77,158.44,158.73],
          [1505865600000,157.90,158.26,153.83,156.07],
          [1505952000000,155.80,155.80,152.75,153.39],
          [1506038400000,151.54,152.27,150.56,151.89],
          [1506297600000,149.99,151.83,149.16,150.55],
          [1506384000000,151.78,153.92,151.69,153.14],
          [1506470400000,153.80,154.72,153.54,154.23],
          [1506556800000,153.89,154.28,152.70,153.28],
          [1506643200000,153.21,154.13,152.00,154.12],
          /* Oct 2017 */
          [1506902400000,154.26,154.45,152.72,153.81],
          [1506988800000,154.01,155.09,153.91,154.48],
          [1507075200000,153.63,153.86,152.46,153.48],
          [1507161600000,154.18,155.44,154.05,155.39],
          [1507248000000,154.97,155.49,154.56,155.30],
          [1507507200000,155.81,156.73,155.48,155.84],
          [1507593600000,156.06,158.00,155.10,155.90],
          [1507680000000,155.97,156.98,155.75,156.55],
          [1507766400000,156.35,157.37,155.73,156.00],
          [1507852800000,156.73,157.28,156.41,156.99]
        ],
        type: 'ohlc',
        name: 'AAPL Stock Price',
        id: 'aapl'
      }, {
        type: 'pivotpoints',
        linkedTo: 'aapl',
        zIndex: 0,
        lineWidth: 1,
        dataLabels: {
          overflow: 'none',
          crop: false,
          y: 4,
          style: {
            fontSize: 9
          }
        }
      }, {
        type: 'macd',
        yAxis: 1,
        linkedTo: 'aapl'
      }]
    },
    names: [
      'AAPL',
      'MSFT',
      'GRMN',
      'CERN',
      'FB',
      'TSLA',
      'XOM',
      'DOX'
    ]
    
  };

  updateValues() {
    const { amount, period, start } = this.state;
    const monthlyInterest = (amount)*(Math.pow(0.01*(1.01), period))/(Math.pow(0.01, period - 1));
    const totalInterest = monthlyInterest * (period + start);
    const totalPayment = amount + totalInterest;
    const monthlyPayment = period > start ? totalPayment/(period - start) : totalPayment/(period);

    const data = Array.from({length: period + start}, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i],
        'Type': delayed ? 0 : Math.ceil(monthlyPayment).toFixed(0),
        'OtherType': Math.ceil(monthlyInterest).toFixed(0)
      };
    })

    this.setState({monthlyInterest, totalInterest, totalPayment, monthlyPayment, data});
  }

  componentDidMount() {
    this.updateValues();
  }

  

  handleChangeAmount = (event, value) => {
    const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get('http://127.0.0.1:5000/post/5')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    this.setState({amount: value, loading: false});
    this.updateValues();
  }

  handleChangePeriod = (event, value) => {
    this.setState({period: value, loading: false});
    this.updateValues();
  }

  handleChangeStart = (event, value) => {
    this.setState({start: value, loading: false});
    this.updateValues();
  }
  handleChangeStock = (event, value) => {
    //loop through all the values
    let parsed_data = JSON.parse(event.data[0].stock_data)
    let newArray = [];
    for ( let i=0; i < Object.keys(parsed_data.Date).length; i++){
      //let temp = { date:parsed_data.Date[i], close:parsed_data.Close[i], high:parsed_data.High[i], volume:parsed_data.Volume[i], open:parsed_data.Open[i], low:parsed_data.Low[i] };
      let temp = [ parsed_data.Date[i], parsed_data.Open[i], parsed_data.High[i], parsed_data.Low[i], parsed_data.Close[i]];
      newArray.push(temp);
    }
    console.log(newArray);
    let options = {
      title: {
        text: 'My stock chart'
      },

      series: [
        {
          data: newArray
        }
      ]
    };


    this.setState({stockdata: options});
  }
  

  render() {
    const { classes } = this.props;
    const { amount, period, start, monthlyPayment,
      monthlyInterest, data, loading, options, stockdata, names } = this.state;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
        </div>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center" >
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    <Typography variant="h6" gutterBottom>Financial Analysis Dashboard</Typography>
                    <Typography variant="body1">
                      Pick the Stocks to Analyze
                    </Typography>
                  </div>
                  <div>
                    <Button variant="outlined" className={classes.outlinedButtom}>
                      Get help
                    </Button>
                  </div>
                </div>
              </Grid>


              <MultiSelect names={names} dashChange={this.handleChangeStock}/>
              <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
              </div>
              <StockChart options={stockdata} highcharts={Highcharts} />

              
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      How much you want to transfer
                    </Typography>
                    <Typography variant="body1">
                      Use slider to set the amount you need.
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        {numeral(amount).format()} USD
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={amount}
                        min={20000}
                        max={150000}
                        step={15000}
                        onChange={this.handleChangeAmount}
                      />
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          15,000 USD
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          150,000 USD
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Period
                    </Typography>
                    <Typography variant="body1">
                      A sample period
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        {period} months
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={period}
                        min={1}
                        max={6}
                        step={1}
                        onChange={this.handleChangePeriod}
                      />
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          1 month
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          6 months
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Start date
                    </Typography>
                    <Typography variant="body1">
                      Set your preferred start date.
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        {monthRange[start]}
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={start}
                        min={0}
                        max={5}
                        step={1}
                        onChange={this.handleChangeStart}
                      />
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          Dec 2018
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          May 2019
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid container spacing={4} justify="center">
                <Grid item xs={12} md={8} >
                  <Paper className={classes.paper} style={{position: 'relative'}}>
                    <Loading loading={loading} />
                    <div className={loading ? classes.loadingState : ''}>
                      <Typography variant="subtitle1" gutterBottom>
                        Some details
                      </Typography>
                      <Typography variant="body1">
                        Details about the graph
                      </Typography>
                      <div style={{marginTop: 14, marginBottom: 14}}>
                        <div className={classes.inlining}>
                          <Avatar className={classes.loanAvatar}></Avatar>
                          <Typography className={classes.inlining} variant="subtitle2" gutterBottom>
                            Type
                          </Typography>
                          <Typography className={classes.inlining} color='secondary' variant="h6" gutterBottom>
                            {numeral(monthlyPayment).format()} units
                          </Typography>
                        </div>
                        <div className={classes.inlining}>
                          <Avatar className={classes.interestAvatar}></Avatar>
                          <Typography className={classes.inlining} variant="subtitle2" gutterBottom>
                            Othe type
                          </Typography>
                          <Typography className={classes.inlining} color="secondary" variant="h6" gutterBottom>
                            {numeral(monthlyInterest).format()} units
                          </Typography>
                        </div>
                      </div>
                      <div >
                        <SimpleLineChart data={data} />
                      </div>
                    </div>
                  </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper} style={{position: 'relative'}}>
                  <Loading loading={loading} />
                  <div className={loading ? classes.loadingState : ''}>
                    <Typography variant="subtitle1" gutterBottom>
                      State
                    </Typography>
                    <div className={classes.mainBadge}>
                      <VerifiedUserIcon style={{fontSize: 72}} fontSize={'large'} color={'secondary'} />
                      <Typography variant="h5" color={'secondary'} gutterBottom>
                        Verified
                      </Typography>
                    </div>
                    <div className={classes.buttonBar}>
                      <Button to={{ pathname: "/dashboard", search: `?type=save` }} component={Link} variant="outlined" className={classes.actionButtom}>
                        Save
                      </Button>
                      <Button to={{ pathname: "/dashboard", search: `?type=apply` }} component={Link} color='primary' variant="contained" className={classes.actionButtom}>
                        Apply
                      </Button>
                    </div>
                  </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Dashboard));
