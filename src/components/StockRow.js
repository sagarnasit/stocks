import React from 'react';

const StockRow = ({ name, currentPrice, prevPrice, lastUpdate }) => {

    let marketTrend, marketTrendArrow = '';
    // Check share trend status.
    if (prevPrice && currentPrice > prevPrice) {
        marketTrend = 'red'
        marketTrendArrow = '▾'
    } else if (prevPrice && currentPrice < prevPrice) {
        marketTrend = 'green'
        marketTrendArrow = '▴'
    } else {
        marketTrend = 'black'
    }

    // Return date in redable format.
    const getLastUpdatedDate = (timestamp) => {
        let date = new Date(timestamp);
        // get hours, minutes and seconds in 2 digits.
        let hours = `${date.getHours()}`.padStart(2, '0');
        let minutes = `${date.getMinutes()}`.padStart(2, '0');
        let seconds = `${date.getSeconds()}`.padStart(2, '0');

        // Formated time.
        return `${hours} : ${minutes} : ${seconds}`;
    }

    return (
        <tr>
            <td>{name.toUpperCase()}</td>
            <td style={{
                color: `${marketTrend}`
            }}
            >{marketTrendArrow}&nbsp;{currentPrice.toFixed(2)}</td>
            <td>{getLastUpdatedDate(lastUpdate)}</td>
        </tr>
    );

}

export default StockRow;