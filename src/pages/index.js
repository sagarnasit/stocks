import React from "react"
import Layout from "../components/layout"
import StockList from "../components/StockList"
import ResetButton from "../components/ResetButton";

class IndexPage extends React.Component {

  state = {
    stocks: {}
  }

  constructor(props) {
    super(props)

    // bind methods with this.
    this.updateStock = this.updateStock.bind(this)
    this.resetStocks = this.resetStocks.bind(this)
  }

  resetStocks() {
    this.setState({ stocks: {} })
  }

  updateStock(newStock) {

    let currentTime = Date.now();

    newStock.map(([stkName, stkPrice]) => {

      let prevPrice;

      if (this.state.stocks[stkName]) {
        prevPrice = this.state.stocks[stkName].currentPrice;
      }

      this.state.stocks[stkName] = { currentPrice: stkPrice, prevPrice: prevPrice, lastUpdate: currentTime };
    })

    this.setState({ stocks: this.state.stocks })

  }

  componentDidMount = () => {

    const ws = new WebSocket("wss://stocks.mnet.website");

    ws.onmessage = (e) => {
      // Update stocks on every message.
      this.updateStock(JSON.parse(e.data));

    }
  }

  render() {
    return (
      <Layout>
        <ResetButton resetStocks={this.resetStocks} />
        <StockList stocks={this.state.stocks} />
      </Layout>
    )
  }
}


export default IndexPage
