import React from "react"
import Layout from "../components/layout"
import StockList from "../components/StockList"
import ResetButton from "../components/ResetButton";

class IndexPage extends React.Component {

  state = {
    list: {}
  }

  constructor(props) {
    super(props)

    this.updateStock = this.updateStock.bind(this)
    this.resetStocks = this.resetStocks.bind(this)
  }

  resetStocks() {
    this.setState({ list: {} })
  }

  updateStock = (newStock) => {

    let currentTime = Date.now();

    newStock.map(([stkName, stkPrice]) => {

      let prevPrice;

      if (this.state.list[stkName]) {
        prevPrice = this.state.list[stkName].currentPrice;
      }


      this.state.list[stkName] = { currentPrice: stkPrice, prevPrice: prevPrice, lastUpdate: currentTime };
    })

    this.setState({ list: this.state.list })

  }

  componentDidMount = () => {

    const ws = new WebSocket("ws://stocks.mnet.website");

    ws.onmessage = (e) => {

      this.updateStock(JSON.parse(e.data));

    }
  }

  render() {
    return (
      <Layout>
        <ResetButton resetStocks={this.resetStocks} />
        <StockList stocks={this.state.list} />
      </Layout>
    )
  }
}


export default IndexPage
