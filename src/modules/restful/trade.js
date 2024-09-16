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
     * @param {number} [options.activationPrice] - The value cannot be less than 1000000.
     * @param {number} [options.callbackRate]
     * @param {string} [options.workingType]
     * @param {string} [options.priceProtect]
     * @param {string} [options.newOrderRespType]
     * @param {string} [options.priceMatch] - The value cannot be greater than 60000
     * @param {string} [options.selfTradePreventionMode]
     * @param {number} [options.goodTillDate]
     * @param {number} [options.recvWindow]
     */

    /**
     * Additional mandatory parameters based on type:
     * type LIMIT => timeInForce, quantity, price,
     * type MARKET => quantity,
     * type STOP/TAKE_PROFIT => quantity, price, stopPrice
     * type STOP_MARKET/TAKE_PROFIT_MARKET => stopPrice
     * type TRAILING_STOP_MARKET	=> callbackRate
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
     * Place Multiple Orders(TRADE) <br>
     *
     * POST /fapi/v1/batchOrders <br>
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Place-Multiple-Orders}
     *
     * @param {object[]} batchOrders => reffer to New Order params (:13)
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
     * @param {number} [options.priceMatch] only avaliable for LIMIT/STOP/TAKE_PROFIT order; can be set to OPPONENT/ OPPONENT_5/ OPPONENT_10/ OPPONENT_20: /QUEUE/ QUEUE_5/ QUEUE_10/ QUEUE_20; Can't be passed together with price
     * @param {number} [options.recvWindow]
     *
     */

    modifyOrder(symbol, side, number, price, timestamp, options = {}) {
      validateRequiredParameters({ symbol, side, number, price, timestamp });
      return this.signRequest(
        "PUT",
        "/fapi/v1/order",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          side: side.toUpperCase(),
          number,
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
     * @param {object[]} batchOrders => reffer to Modify Order params (:97)
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */

    modifyMultipleOrder(batchOrders, timestamp, options = {}) {
      for (let i = 0; i < batchOrders.length; i++) {
        const { symbol, side, quantity, price, timestamp } = batchOrders[i];
        validateRequiredParameters({
          symbol,
          side,
          quantity,
          price,
          timestamp,
        });
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
     * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade}
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
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
     * @param {number} timestamp
     * @param {number} countdownTime
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     */

    countDownCancelAll(symbol, timestamp, countdownTime, options = {}) {
      validateRequiredParameters({ symbol, timestamp, countdownTime });
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
     * Query All Order (USER_DATA) <br>
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
        Object.assign(options, {
          timestamp,
        })
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
     * @param {string} [options.startTime]
     * @param {string} [options.endTime]
     * @param {string} [options.limit]
     * @param {number} [options.recvWindow]
     */

    forceOrders(timestamp, options = {}) {
      validateRequiredParameters({ symbol, timestamp });
      return this.signRequest(
        "GET",
        "/fapi/v1/forceOrders",
        Object.assign(options, {
          timestamp,
        })
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
     * @param {number} marginType
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

    // WIP - Agung add neworder trade endpoint
  };

module.exports = Trade;
