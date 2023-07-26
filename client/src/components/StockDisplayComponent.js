import React from 'react'

function StockDisplayComponent(stocksData) {

    let stockDataObject = stocksData.stocksData

    return (
        <div>
            <h2>Stock Data {stockDataObject.name}</h2>
            <p>
                <strong>Close:</strong> {stockDataObject.c ? stockDataObject.c : "__"}
            </p>
            <p>
                <strong>High:</strong> {stockDataObject.h ? stockDataObject.h : "__"}
            </p>
            <p>
                <strong>Low:</strong> {stockDataObject.l ? stockDataObject.l : "__"}
            </p>
            <p>
                <strong>Open:</strong> {stockDataObject.o ? stockDataObject.o : "__"}
            </p>
            <p>
                <strong>Volume:</strong> {stockDataObject.v ? stockDataObject.v : "__"}
            </p>
        </div>
    )
}

export default StockDisplayComponent