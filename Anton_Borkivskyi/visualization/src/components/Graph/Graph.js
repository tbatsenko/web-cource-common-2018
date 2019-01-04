// import { Component } from 'react'
// import React from 'react'
// import './Graph.css'
//
// class Graph extends Component {
//   state = {}
//   text_keys = []
//   text_keys_empty = true
//
//   renderBars(key) {
//     const { women, men, activeYear} = this.props.state
//
//     let gender = null
//     if (key == 'men') {
//       gender = men
//     } else if (key == 'women') {
//       gender = women
//     }
//     let genderNumbers = []
//     let localSum
//     let maxSum = Object.values(gender[gender.length - 1])[activeYear - 2010]
//     let i = 0
//     while (i < gender.length - 1) {
//       let localSum = 0
//       for (let c = 0; c < 5; c++) {
//         if (i < gender.length - 1) {
//           localSum += Object.values(gender[i])[activeYear - 2010]
//           // if (localSum > maxSum) {
//           //   maxSum = localSum
//           // }
//
//         }
//         i = i + 1
//       }
//       if (this.text_keys_empty) {
//         let text_key = (i - 5).toString() + ' - ' + (i - 1).toString()
//         this.text_keys.push(text_key)
//       }
//       genderNumbers.push(localSum)
//     }
//     this.text_keys.pop()
//     this.text_keys.push('85 +')
//     this.text_keys_empty = false
//
//     return genderNumbers.map((number) => {
//       const percent = (number / maxSum) * 1000
//       return (<Bar percent={percent} number={number}/>)
//     })
//   }
//
//   render() {
//     return (
//       <div className="graph">
//         <BarTextContent keys={this.text_keys}/>
//
//         <div className={'graph__bar-container left'}>
//           {this.renderBars('men')}
//         </div>
//         <div className="graph__bar-container right">
//           {this.renderBars('women')}
//         </div>
//       </div>
//     )
//   }
// }
//
//
// const BarTextContent = ({ keys }) => {
//   return (
//     <div className="graph__text-container">
//       {
//         keys.map((key) => (
//           <div className='graph__text-container_text'>
//             {key}
//           </div>
//         ))
//       }
//
//     </div>
//   )
// }
//
// const Bar = ({ percent, number }) => {
//   const barStyle = { width: `${percent}%`, height: 'calc(5.6% - 1px)' }
//   return (
//     <div className="bar" style={barStyle}>
//       {number}
//     </div>
//   )
// }
//
// export default Graph
