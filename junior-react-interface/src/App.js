import { HomePage } from 'src/pages/HomePage'
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
            <Route exact path="/" element={<HomePage client={client}/>} />
            {/* <Route exact path="/men" element={<MenCategory />} /> */}

            {/* <Route
            exact
            path="/user/:id"
            render={({ match }) => (
              <ProductDescription user={clients.find((p) => p.id === match.params.id)} />
            )}
          /> */}
            {/* <Route exact path="/comparables" component={Comparables} />
          <Route exact path="/companyPage" component={CompanyPage} />
          <Route exact path="/searchResult" component={SearchResult} /> */}
          </Routes>
        </Router>
      </Theme>
    </ApolloProvider>
  )
}

export default App
