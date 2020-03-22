import React from "react"
import StockRow from "../components/StockRow"

const StockList = ({ stocks }) => {

    const isStockAvailable = () => {
        return Object.keys(stocks).length > 0;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Stock Name</th>
                    <th>Current Price</th>
                    <th>last Updated</th>
                </tr>
            </thead>
            <tbody>
                {!isStockAvailable() ? <tr><td colSpan="4">Stocks are loading. Please wait...</td></tr> : ''}
                {
                    // loop though all the stocks.
                    Object.entries(stocks).map(([stockName, stockDetail], i) => {
                        return <StockRow name={stockName} currentPrice={stockDetail.currentPrice} prevPrice={stockDetail.prevPrice} lastUpdate={stockDetail.lastUpdate} key={i} />
                    })

                }
            </tbody>
        </table>
    )

}


export default StockList
