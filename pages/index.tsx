// import Link from 'next/link'
// import { useViewerQuery, ViewerDocument } from '../lib/viewer.graphql'
// import { initializeApollo } from '../lib/apollo'

// const Index = () => {
//   const { data } = useViewerQuery()
//   const { viewer } = data!

//   return (
//     <div>
//       You're signed in as {viewer.name} and you're {viewer.status} go to the{' '}
//       <Link href="/about">
//         <a>about</a>
//       </Link>{' '}
//       page.
//     </div>
//   )
// }

// export async function getStaticProps() {
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: ViewerDocument,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   }
// }

// export default Index

import React from "react";
import Items from "../components/items";

export interface HomeProps {}

export interface HomeState {}

<<<<<<< Updated upstream
class Index extends React.Component<IndexProps, IndexState> {
  render() {
    return <p> hey</p>;
=======
class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return <Items></Items>;
>>>>>>> Stashed changes
  }
}

export default Index;
