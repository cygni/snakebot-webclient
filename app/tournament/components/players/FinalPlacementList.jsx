// import React from 'react';
// import { Table } from 'react-bootstrap';
//
// import Store from '../../../baseStore/BaseStore';
// import StoreWatch from '../../watch/StoreWatch';
//
// function getFinalPlacement() {
//   const finalPlacement = Store.getFinalPlacement();
//   return { finalPlacement };
// }
//
// const propTypes = {
//   finalPlacement: React.PropTypes.object,
// };
//
// function FinalPlacementList(props) {
//   if (props.finalPlacement && props.finalPlacement.list.length !== 0) {
//     return (
//       <div>
//         <h2> WINNER! {props.finalPlacement.winner.name} </h2>
//         <Table striped bordered condensed hover>
//           <thead>
//             <tr>
//               <th>Place</th>
//               <th>Name</th>
//               <th>Points</th>
//             </tr>
//           </thead>
//           <tbody>{
//             props.finalPlacement.list.map((player, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{player.name}</td>
//                 <td>{player.points}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     );
//   }
//   return (<div />);
// }
//
// FinalPlacementList.propTypes = propTypes;
//
// export default new StoreWatch(FinalPlacementList, getFinalPlacement);
