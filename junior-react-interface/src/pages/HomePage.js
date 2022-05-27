import { PureComponent } from 'react'
import { NavBar } from 'src/components/NavBar'
import { AllProducts } from 'src/components/AllProducts'
import { TechProducts } from 'src/components/TechProducts'
import { ClothesProducts } from 'src/components/ClothesProducts'

import styled from 'styled-components'

const Wrapper = styled.div`
  .content {
    padding: 5px 50px;
    margin: 125px 0 50px 0;
    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      padding: 5px 25px
    }
  }
  .products--grid {
    display: grid;
    gap: 40px;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 130px);
    img {
      width: 100px;
    }
  }
`

export class HomePage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeCurrencyLabel: 'AUD',
    }
  }
  onCurrencyMenuClick = (e) => {
    this.setState({ activeCurrencyLabel: e.currentTarget.textContent.split(' ')[1] })
    
  }
  
  render() {
    const {
      onCurrencyMenuClick,
      props: { client },
      state: { activeCurrencyLabel },
    } = this

    return (
      <Wrapper>
        <NavBar
          client={client}
          activeCurrencyLabel={activeCurrencyLabel}
          onCurrencyMenuClick={onCurrencyMenuClick}
        >
          <div label="all">
            <div className="content">
              <AllProducts client={client} activeCurrencyLabel={activeCurrencyLabel} />
            </div>
          </div>
          <div label="tech">
            <div className="content">
              <TechProducts client={client} activeCurrencyLabel={activeCurrencyLabel} />
            </div>
          </div>
          <div label="clothes">
            <div className="content">
              <ClothesProducts client={client} activeCurrencyLabel={activeCurrencyLabel} />
            </div>
          </div>
        </NavBar>
      </Wrapper>
    )
  }
}

export default HomePage
