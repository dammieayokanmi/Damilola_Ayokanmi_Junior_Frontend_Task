import { HomePage } from 'src/pages/HomePage'
import { SingleProduct } from 'src/pages/product/SingleProduct'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Theme from './Theme'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Theme>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage client={client} />} />
            {/* <Route path="/:id" render={(props) => <SingleProduct {...props} />} /> */}
            <Route exact path="/product/:id" element={<SingleProduct />} />
            </Routes>
        </Router>
      </Theme>
    </ApolloProvider>
  )
}

export default App
