"use strict";

const { validateRequiredParameters } = require("../../helpers/validation");

/**
 * API trade endpoints
 * @module Trade
 * @param {*} superclass
 */
const Trade = (superclass) =>
  class extends superclass {
    /**
     * New Order (TRADE)<br>
     *
     * POST /fapi/v1/order <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api}
     *
     * @param {string} symbol
     * @param {string} side
     * @param {string} type
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.positionSide]
     * @param {string} [options.timeInForce]
     * @param {number} [options.quantity]
     * @param {string} [options.reduceOnly]
     * @param {number} [options.price]
     * @param {string} [options.newClientOrderId]
     * @param {number} [options.stopPrice]
     * @param {string} [options.closePosition]
     * @param {number} [options.activationPrice]
     * @param {number} [options.callbackRate]
     * @param {string} [options.workingType]
     * @param {string} [options.priceProtect]
     * @param {string} [options.newOrderRespType]
     * @param {string} [options.priceMatch]
     * @param {string} [options.selfTradePreventionMode]
     * @param {number} [options.goodTillDate]
     * @param {number} [options.recvWindow]
     *
     * Additional mandatory parameters based on type:
     * type LIMIT => timeInForce, quantity, price
     * type MARKET => quantity
     * type STOP/TAKE_PROFIT => quantity, price, stopPrice
     * type STOP_MARKET/TAKE_PROFIT_MARKET => stopPrice
     * type TRAILING_STOP_MARKET => callbackRate
     */
    newOrder(symbol, side, type, timestamp, options = {}) {
      validateRequiredParameters({ symbol, side, type, timestamp });

      return this.signRequest(
        "POST",
        "/fapi/v1/order",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          side: side.toUpperCase(),
          type: type.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Test New Order (TRADE)<br>
     *
     * POST /fapi/v1/order/test <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/New-Order-Test}
     *
     * @param {string} symbol
     * @param {string} side
     * @param {string} type
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.positionSide]
     * @param {string} [options.timeInForce]
     * @param {number} [options.quantity]
     * @param {string} [options.reduceOnly]
     * @param {number} [options.price]
     * @param {string} [options.newClientOrderId]
     * @param {number} [options.stopPrice]
     * @param {string} [options.closePosition]
     * @param {number} [options.activationPrice]
     * @param {number} [options.callbackRate]
     * @param {string} [options.workingType]
     * @param {string} [options.priceProtect]
     * @param {string} [options.newOrderRespType]
     * @param {string} [options.priceMatch]
     * @param {string} [options.selfTradePreventionMode]
     * @param {number} [options.goodTillDate]
     * @param {number} [options.recvWindow]
     */
    newOrderTest(symbol, side, type, timestamp, options = {}) {
      validateRequiredParameters({ symbol, side, type, timestamp });

      return this.signRequest(
        "POST",
        "/fapi/v1/order/test",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          side: side.toUpperCase(),
          type: type.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Place Multiple Orders(TRADE) <br>
     *
     * POST /fapi/v1/batchOrders <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Place-Multiple-Orders}
     *
     * @param {object[]} batchOrders
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    placeMultipleOrder(batchOrders, timestamp, options = {}) {
      for (let i = 0; i < batchOrders.length; i++) {
        const { symbol, side, type, quantity } = batchOrders[i];
        validateRequiredParameters({ symbol, side, type, quantity });
      }
      validateRequiredParameters({ timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/batchOrders",
        Object.assign(options, {
          batchOrders,
          timestamp,
        })
      );
    }

    /**
     * Modify Order (TRADE) <br>
     *
     * PUT /fapi/v1/order <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Order}
     *
     * @param {string} symbol
     * @param {string} side
     * @param {number} quantity
     * @param {number} price
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.priceMatch]
     * @param {number} [options.recvWindow]
     */
    modifyOrder(symbol, side, quantity, price, timestamp, options = {}) {
      validateRequiredParameters({ symbol, side, quantity, price, timestamp });
      return this.signRequest(
        "PUT",
        "/fapi/v1/order",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          side: side.toUpperCase(),
          quantity,
          price,
          timestamp,
        })
      );
    }

    /**
     * Modify Multiple Orders(TRADE) <br>
     *
     * PUT /fapi/v1/batchOrders <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Multiple-Orders}
     *
     * @param {object[]} batchOrders
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    modifyMultipleOrder(batchOrders, timestamp, options = {}) {
      for (let i = 0; i < batchOrders.length; i++) {
        const { symbol, side, quantity, price, timestamp: ts } = batchOrders[i];
        validateRequiredParameters({ symbol, side, quantity, price, timestamp: ts });
      }
      validateRequiredParameters({ timestamp });
      return this.signRequest(
        "PUT",
        "/fapi/v1/batchOrders",
        Object.assign(options, {
          batchOrders,
          timestamp,
        })
      );
    }

    /**
     * Get Order Modify History (USER_DATA) <br>
     *
     * GET /fapi/v1/orderAmendment <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Get-Order-Modify-History}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit]
     * @param {number} [options.recvWindow]
     */
    orderModifyHistory(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/orderAmendment",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Cancel Order (TRADE)<br>
     *
     * DELETE /fapi/v1/order<br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-Order}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow]
     */
    cancelOrder(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });

      return this.signRequest(
        "DELETE",
        "/fapi/v1/order",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Cancel Multiple Orders (TRADE) <br>
     *
     * DELETE /fapi/v1/batchOrders <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-Multiple-Orders}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number[]} [options.orderIdList]
     * @param {string[]} [options.origClientOrderIdList]
     * @param {number} [options.recvWindow]
     */
    cancelMultipleOrders(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "DELETE",
        "/fapi/v1/batchOrders",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Cancel All Open Orders (TRADE) <br>
     *
     * DELETE /fapi/v1/allOpenOrders <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-All-Open-Orders}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    cancelAllOpenOrders(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "DELETE",
        "/fapi/v1/allOpenOrders",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Auto-Cancel All Open Orders (TRADE) <br>
     *
     * POST /fapi/v1/countdownCancelAll <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Auto-Cancel-All-Open-Orders}
     *
     * @param {string} symbol
     * @param {number} countdownTime
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    countDownCancelAll(symbol, countdownTime, timestamp, options = {}) {
      validateRequiredParameters({ symbol, countdownTime, timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/countdownCancelAll",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          countdownTime,
          timestamp,
        })
      );
    }

    /**
     * Query Order (USER_DATA) <br>
     *
     * GET /fapi/v1/order <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Query-Order}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow]
     */
    queryOrder(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/order",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Query All Orders (USER_DATA) <br>
     *
     * GET /fapi/v1/allOrders <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/All-Orders}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow]
     */
    queryAllOrders(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/allOrders",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Current All Open Orders (USER_DATA) <br>
     *
     * GET /fapi/v1/openOrders <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Current-All-Open-Orders}
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow]
     */
    queryCurrentAllOpenOrders(timestamp, options = {}) {
      validateRequiredParameters({ timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/openOrders",
        Object.assign(options, { timestamp })
      );
    }

    /**
     * Query Current Open Order (USER_DATA) <br>
     *
     * GET /fapi/v1/openOrder <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Query-Current-Open-Order}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow]
     */
    queryCurrentOpenOrder(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/openOrder",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * User's Force Orders (USER_DATA) <br>
     *
     * GET /fapi/v1/forceOrders <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Users-Force-Orders}
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {string} [options.autoCloseType]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit]
     * @param {number} [options.recvWindow]
     */
    forceOrders(timestamp, options = {}) {
      validateRequiredParameters({ timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/forceOrders",
        Object.assign(options, { timestamp })
      );
    }

    /**
     * Account Trade List (USER_DATA) <br>
     *
     * GET /fapi/v1/userTrades <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Account-Trade-List}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.fromId]
     * @param {number} [options.limit]
     * @param {number} [options.recvWindow]
     */
    queryUserTrades(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/userTrades",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Change Margin Type(TRADE) <br>
     *
     * POST /fapi/v1/marginType <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Margin-Type}
     *
     * @param {string} symbol
     * @param {string} marginType
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    changeMarginType(symbol, marginType, timestamp, options = {}) {
      validateRequiredParameters({ symbol, marginType, timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/marginType",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          marginType: marginType.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Change Position Mode(TRADE) <br>
     *
     * POST /fapi/v1/positionSide/dual <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Position-Mode}
     *
     * @param {string} dualSidePosition
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    changePositionMode(dualSidePosition, timestamp, options = {}) {
      validateRequiredParameters({ dualSidePosition, timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/positionSide/dual",
        Object.assign(options, {
          dualSidePosition,
          timestamp,
        })
      );
    }

    /**
     * Change Initial Leverage(TRADE) <br>
     *
     * POST /fapi/v1/leverage <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Initial-Leverage}
     *
     * @param {string} symbol
     * @param {number} leverage
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    changeLeverage(symbol, leverage, timestamp, options = {}) {
      validateRequiredParameters({ symbol, leverage, timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/leverage",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          leverage,
          timestamp,
        })
      );
    }

    /**
     * Change Multi-Assets Mode (TRADE) <br>
     *
     * POST /fapi/v1/multiAssetsMargin <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Multi-Assets-Mode}
     *
     * @param {string} multiAssetsMargin
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    changeMultiAssetType(multiAssetsMargin, timestamp, options = {}) {
      validateRequiredParameters({ multiAssetsMargin, timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/multiAssetsMargin",
        Object.assign(options, {
          multiAssetsMargin,
          timestamp,
        })
      );
    }

    /**
     * Modify Isolated Position Margin(TRADE) <br>
     *
     * POST /fapi/v1/positionMargin <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Isolated-Position-Margin}
     *
     * @param {string} symbol
     * @param {number} amount
     * @param {number} type - 1: Add position margin, 2: Reduce position margin
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.positionSide]
     * @param {number} [options.recvWindow]
     */
    modifyIsolatedMargin(symbol, amount, type, timestamp, options = {}) {
      validateRequiredParameters({ symbol, amount, type, timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/positionMargin",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          amount,
          type,
          timestamp,
        })
      );
    }

    /**
     * New Algo Order (TRADE)<br>
     *
     * POST /fapi/v1/algoOrder <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/New-Algo-Order}
     *
     * @param {string} symbol
     * @param {string} side
     * @param {string} type - TAKE_PROFIT_MARKET or STOP_MARKET
     * @param {number} triggerPrice
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.positionSide]
     * @param {number} [options.quantity]
     * @param {string} [options.workingType]
     * @param {string} [options.priceProtect]
     * @param {number} [options.recvWindow]
     */
    newAlgoOrder(symbol, side, type, triggerPrice, timestamp, options = {}) {
      validateRequiredParameters({ symbol, side, type, triggerPrice, timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/algoOrder",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          side: side.toUpperCase(),
          type: type.toUpperCase(),
          algoType: "CONDITIONAL",
          triggerPrice,
          timestamp,
        })
      );
    }

    /**
     * Change Initial Leverage (TRADE)<br>
     *
     * POST /fapi/v1/leverage<br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Initial-Leverage}
     *
     * @param {string} symbol
     * @param {number} leverage - target initial leverage: int from 1 to 125
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */
    setLeverage(symbol, leverage, timestamp, options = {}) {
      validateRequiredParameters({ symbol, leverage, timestamp });
      return this.signRequest(
        "POST",
        "/fapi/v1/leverage",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          leverage,
          timestamp,
        })
      );
    }

    /**
     * Position Information V2 (USER_DATA) <br>
     *
     * GET /fapi/v2/positionRisk <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-Information-V2}
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow]
     */
    positionInformationV2(timestamp, options = {}) {
      validateRequiredParameters({ timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v2/positionRisk",
        Object.assign(options, { timestamp })
      );
    }

    /**
     * Position Information V3 (USER_DATA) <br>
     *
     * GET /fapi/v3/positionRisk <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-Information-V3}
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow]
     */
    positionInformationV3(timestamp, options = {}) {
      validateRequiredParameters({ timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v3/positionRisk",
        Object.assign(options, { timestamp })
      );
    }

    /**
     * Position ADL Quantile Estimation(USER_DATA) <br>
     *
     * GET /fapi/v1/adlQuantile <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-ADL-Quantile-Estimation}
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow]
     */
    adlQuantile(timestamp, options = {}) {
      validateRequiredParameters({ timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/adlQuantile",
        Object.assign(options, { timestamp })
      );
    }

    /**
     * Get Position Margin Change History (TRADE) <br>
     *
     * GET /fapi/v1/positionMargin/history <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Get-Position-Margin-Change-History}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.type]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit]
     * @param {number} [options.recvWindow]
     */
    positionMarginHistory(symbol, timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/positionMargin/history",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }
  };

module.exports = Trade;
