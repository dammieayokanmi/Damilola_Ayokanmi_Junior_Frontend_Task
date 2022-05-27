import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { gql } from '@apollo/client'
// import { withRouter } from "react-router";

const Wrapper = styled.div``

export class  SingleProduct extends Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
  };
//   constructor(props){
//     super(props);

//     this.state = {
//         id : 'this.props.match.params.id'
//     }
// }

//   componentDidMount = () => {
//     this.props.client
//       .query({
//         query: gql`
//         {
//           product(id:${this.state.id}) {
//             id
//             name
//             inStock
//             gallery
//             description
//             category
//             attributes {
//               id
//               name
//               type
//               items {
//                 displayValue
//                 value
//                 id
//               }
//             }
//             prices {
//               currency {
//                 label
//                 symbol
//               }
//               amount
//             }
      
//             brand
//           }
//         }
//       }`,
//       })
//       .then((response) => {
//         console.log(response)
//       })
//   }


  render() {
    // const { match, location, history } = this.props;

    return <Wrapper>ji</Wrapper>
  }
}

export default SingleProduct;
