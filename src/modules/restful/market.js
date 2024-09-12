"use strict";

const { validateRequiredParameters } = require("../../helpers/validation");

/**
 * API market endpoints
 * @module Market
 * @param {*} superclass
 */
const Market = (superclass) =>
  class extends superclass {
    /**
     * Test Connectivity<br>
     *
     * GET /fapi/v1/ping<br>
     *
     * Test connectivity to the Rest API.<br>
     * {@link https://binance-docs.github.io/apidocs/futures/en/#test-connectivity}
     */
    ping() {
      return this.publicRequest("GET", "/fapi/v1/ping");
    }

    /**
     * Check Server Time<br>
     *
     * GET /fapi/v1/time<br>
     *
     * Test connectivity to the Rest API and get the current server time.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#check-server-time}
     *
     */
    time() {
      return this.publicRequest("GET", "/fapi/v1/time");
    }

    /**
     * Exchange Information<br>
     *
     * GET /fapi/v1/exchangeInfo<br>
     *
     * Current exchange trading rules and symbol information<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information}
     *
     * @param {object} [options]
     * @param {string} [options.symbol] - symbol
     * @param {Array} [options.symbols] - an array of symbols
     *
     */
    exchangeInfo(options = {}) {
      if (Object.prototype.hasOwnProperty.call(options, "symbol")) {
        options.symbol = options.symbol.toUpperCase();
      }
      if (Object.prototype.hasOwnProperty.call(options, "symbols")) {
        options.symbols = options.symbols.map((symbol) => symbol.toUpperCase());
      }
      return this.publicRequest("GET", "/fapi/v1/exchangeInfo", options);
    }

    /**
     * Order Book<br>
     *
     * GET /fapi/v1/depth<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#order-book}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.limit] - Default 100; max 5000.
     *    If limit > 5000, then the response will truncate to 5000.
     */
    depth(symbol, options = {}) {
      validateRequiredParameters({ symbol });

      return this.publicRequest(
        "GET",
        "/fapi/v1/depth",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
        })
      );
    }

    /**
     * Recent Trades List<br>
     *
     * GET /fapi/v1/trades<br>
     *
     * Get recent trades.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#recent-trades-list}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    trades(symbol, options = {}) {
      validateRequiredParameters({ symbol });

      return this.publicRequest(
        "GET",
        "/fapi/v1/trades",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
        })
      );
    }

    /**
     * Old Trade Lookup<br>
     *
     * GET /fapi/v1/historicalTrades<br>
     *
     * Get older market trades.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#old-trade-lookup}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.limit] - Default 500; max 1000.
     * @param {number} [options.fromId] - Trade id to fetch from. Default gets most recent trades.
     */
    historicalTrades(symbol, options = {}) {
      validateRequiredParameters({ symbol });

      return this.publicRequest(
        "GET",
        "/fapi/v1/historicalTrades",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
        })
      );
    }

    /**
     * Compressed/Aggregate Trades List<br>
     *
     * GET /fapi/v1/aggTrades<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#compressed-aggregate-trades-list}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.fromId] - id to get aggregate trades from INCLUSIVE.
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    aggTrades(symbol, options = {}) {
      validateRequiredParameters({ symbol });

      return this.publicRequest(
        "GET",
        "/fapi/v1/aggTrades",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
        })
      );
    }

    /**
     * Kline/Candlestick Data<br>
     *
     * GET /fapi/v1/klines<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data}
     *
     * @param {string} symbol
     * @param {string} interval
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    klines(symbol, interval, options = {}) {
      validateRequiredParameters({ symbol, interval });
      return this.publicRequest(
        "GET",
        "/fapi/v1/klines",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          interval,
        })
      );
    }

    /**
     * Continuous Contract Kline/Candlestick Data<br>
     *
     * GET /fapi/v1/continuousKlines<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#continuous-contract-kline-candlestick-data}
     *
     * @param {string} pair
     * @param {string} contractType //PERPETUAL, CURRENT_QUARTER, NEXT_QUARTER
     * @param {string} interval
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    continousklines(pair, contractType, interval, options = {}) {
      validateRequiredParameters({ pair, contractType, interval });
      return this.publicRequest(
        "GET",
        "/fapi/v1/continuousKlines",
        Object.assign(options, {
          pair: pair.toUpperCase(),
          contractType,
          interval,
        })
      );
    }

    /**
     * Index Price Kline/Candlestick Data<br>
     *
     * GET /fapi/v1/indexPriceKlines<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#index-price-kline-candlestick-data}
     *
     * @param {string} pair
     * @param {string} interval
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    indexklines(pair, interval, options = {}) {
      validateRequiredParameters({ pair, interval });
      return this.publicRequest(
        "GET",
        "/fapi/v1/indexPriceKlines",
        Object.assign(options, {
          pair: pair.toUpperCase(),
          interval,
        })
      );
    }

    /**
     * Mark Price Kline/Candlestick Data<br>
     *
     * GET /fapi/v1/markPriceKlines<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#mark-price-kline-candlestick-data}
     *
     * @param {string} symbol
     * @param {string} interval
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    markklines(symbol, interval, options = {}) {
      validateRequiredParameters({ symbol, interval });
      return this.publicRequest(
        "GET",
        "/fapi/v1/markPriceKlines",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          interval,
        })
      );
    }

    /**
     * Mark Price Kline/Candlestick Data<br>
     *
     * GET /fapi/v1/markPriceKlines<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#mark-price-kline-candlestick-data}
     *
     * @param {string} symbol
     * @param {string} interval
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    markklines(symbol, interval, options = {}) {
      validateRequiredParameters({ symbol, interval });
      return this.publicRequest(
        "GET",
        "/fapi/v1/markPriceKlines",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          interval,
        })
      );
    }

    /**
     * Premium index Kline Data<br>
     *
     * GET /fapi/v1/premiumIndexKlines<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#premium-index-kline-data}
     *
     * @param {string} symbol
     * @param {string} interval
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    premiumindexklines(symbol, interval, options = {}) {
      validateRequiredParameters({ symbol, interval });
      return this.publicRequest(
        "GET",
        "/fapi/v1/premiumIndexKlines",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          interval,
        })
      );
    }

    /**
     * Mark Price <br>
     *
     * GET /fapi/v1/premiumIndex<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#mark-price}
     *
     * @param {string} symbol
     */
    premiumindex(symbol) {
      return this.publicRequest("GET", "/fapi/v1/premiumIndex", {
        symbol: symbol.toUpperCase(),
      });
    }

    /**
     * Get Funding Rate History <br>
     *
     * GET /fapi/v1/fundingRate<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#get-funding-rate-history}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    fundingRateHistory(symbol, options = {}) {
      return this.publicRequest(
        "GET",
        "/fapi/v1/fundingRate",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
        })
      );
    }

    /**
     * Get Funding Rate Info <br>
     *
     * GET /fapi/v1/fundingInfo<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#get-funding-rate-info}
     *
     */
    fundingInfo() {
      return this.publicRequest("GET", "/fapi/v1/fundingInfo", {});
    }

    /**
     * 24hr Ticker Price Change Statistics<br>
     *
     * GET /fapi/v1/ticker/24hr<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#24hr-ticker-price-change-statistics}
     *
     * @param {string} symbol
     */
    priceChange24H(symbol) {
      return this.publicRequest("GET", "/fapi/v1/ticker/24hr", {
        symbol: symbol.toUpperCase(),
      });
    }

    /**
     * Symbol Price Ticker <br>
     *
     * GET /fapi/v1/ticker/price<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-price-ticker}
     *
     * @param {string} symbol
     */
    symbolPriceTicker(symbol) {
      return this.publicRequest("GET", "/fapi/v1/ticker/price", {
        symbol: symbol.toUpperCase(),
      });
    }

    /**
     * Symbol Price Ticker V2 <br>
     *
     * GET /fapi/v2/ticker/price<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-price-ticker-v2}
     *
     * @param {string} symbol
     */
    symbolPriceTickerV2(symbol) {
      return this.publicRequest("GET", "/fapi/v2/ticker/price", {
        symbol: symbol.toUpperCase(),
      });
    }

    /**
     * Symbol Order Book Ticker <br>
     *
     * GET /fapi/v1/ticker/bookTicker<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-order-book-ticker}
     *
     * @param {string} symbol
     */
    bookTicker(symbol) {
      return this.publicRequest("GET", "/fapi/v1/ticker/bookTicker", {
        symbol: symbol.toUpperCase(),
      });
    }

    /**
     * Open Interest <br>
     *
     * GET /fapi/v1/openInterest<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#open-interest}
     *
     * @param {string} symbol
     */
    openInterest(symbol) {
      validateRequiredParameters({ symbol });
      return this.publicRequest("GET", "/fapi/v1/openInterest", {
        symbol: symbol.toUpperCase(),
      });
    }

    /**
     * Quarterly Contract Settlement Price <br>
     *
     * GET /futures/data/delivery-price<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#quarterly-contract-settlement-price}
     *
     * @param {string} pair
     */
    deliveryPrice(pair) {
      validateRequiredParameters({ pair });
      return this.publicRequest("GET", "/futures/data/delivery-price", {
        pair: pair.toUpperCase(),
      });
    }

    /**
     * Open Interest Statistics <br>
     *
     * GET /futures/data/openInterestHist<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#open-interest-statistics}
     *
     * @param {string} symbol
     * @param {string} period
     * @param {object} options
     * @param {number} options.limit
     * @param {number} options.startTime
     * @param {number} options.endTime
     *
     */
    openInterestHist(symbol, period, options = {}) {
      validateRequiredParameters({ symbol, period });
      return this.publicRequest(
        "GET",
        "/futures/data/openInterestHist",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          period,
        })
      );
    }

    /**
     * Top Trader Long/Short Ratio (Accounts) <br>
     *
     * GET /futures/data/topLongShortAccountRatio<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#top-trader-long-short-ratio-accounts}
     *
     * @param {string} symbol
     * @param {string} period
     * @param {object} options
     * @param {number} options.limit
     * @param {number} options.startTime
     * @param {number} options.endTime
     *
     */
    topLongShortAccountRatio(symbol, period, options = {}) {
      validateRequiredParameters({ symbol, period });
      return this.publicRequest(
        "GET",
        "/futures/data/topLongShortAccountRatio",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          period,
        })
      );
    }

    /**
     * Top Trader Long/Short Ratio (Positions) <br>
     *
     * GET /futures/data/topLongShortPositionRatio<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#top-trader-long-short-ratio-positions}
     *
     * @param {string} symbol
     * @param {string} period
     * @param {object} options
     * @param {number} options.limit
     * @param {number} options.startTime
     * @param {number} options.endTime
     *
     */
    topLongShortPositionRatio(symbol, period, options = {}) {
      validateRequiredParameters({ symbol, period });
      return this.publicRequest(
        "GET",
        "/futures/data/topLongShortPositionRatio",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          period,
        })
      );
    }

    /**
     * Long/Short Ratio <br>
     *
     * GET /futures/data/globalLongShortAccountRatio<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#long-short-ratio}
     *
     * @param {string} symbol
     * @param {string} period
     * @param {object} options
     * @param {number} options.limit
     * @param {number} options.startTime
     * @param {number} options.endTime
     *
     */
    globalLongShortAccountRatio(symbol, period, options = {}) {
      validateRequiredParameters({ symbol, period });
      return this.publicRequest(
        "GET",
        "/futures/data/globalLongShortAccountRatio",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          period,
        })
      );
    }

    /**
     * Taker Buy/Sell Volume <br>
     *
     * GET /futures/data/takerlongshortRatio<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#long-short-ratio}
     *
     * @param {string} symbol
     * @param {string} period
     * @param {object} options
     * @param {number} options.limit
     * @param {number} options.startTime
     * @param {number} options.endTime
     *
     */
    takerlongshortRatio(symbol, period, options = {}) {
      validateRequiredParameters({ symbol, period });
      return this.publicRequest(
        "GET",
        "/futures/data/takerlongshortRatio",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          period,
        })
      );
    }

    /**
     * Basis <br>
     *
     * GET /futures/data/basis<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#basis}
     *
     * @param {string} pair
     * @param {string} contractType [CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL]
     * @param {string} period
     * @param {number} limit
     * @param {object} options
     * @param {number} options.startTime
     * @param {number} options.endTime
     *
     */
    basis(pair, contractType, period, limit, options = {}) {
      validateRequiredParameters({ pair, contractType, period, limit });
      return this.publicRequest(
        "GET",
        "/futures/data/basis",
        Object.assign(options, {
          pair: pair.toUpperCase(),
          contractType,
          period,
          limit,
        })
      );
    }

    /**
     * Historical BLVT NAV Kline/Candlestick <br>
     *
     * GET /fapi/v1/lvtKlines<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#historical-blvt-nav-kline-candlestick}
     *
     * @param {string} symbol
     * @param {string} interval
     * @param {object} options
     * @param {number} options.startTime
     * @param {number} options.endTime
     * @param {number} options.limit
     *
     */
    lvtKlines(symbol, interval, options = {}) {
      validateRequiredParameters({ symbol, interval });
      return this.publicRequest(
        "GET",
        "/fapi/v1/lvtKlines",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          interval,
        })
      );
    }

    /**
     * Composite Index Symbol Information <br>
     *
     * GET /fapi/v1/indexInfo <br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#composite-index-symbol-information}
     *
     * @param {string} symbol
     *
     */
    indexInfo(symbol) {
      return this.publicRequest("GET", "/fapi/v1/indexInfo", {
        symbol: symbol.toUpperCase(),
      });
    }

    /**
     * Multi-Assets Mode Asset Index <br>
     *
     * GET /fapi/v1/assetIndex <br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#multi-assets-mode-asset-index}
     *
     * @param {string} symbol
     *
     */
    assetIndex(symbol) {
      return this.publicRequest("GET", "/fapi/v1/assetIndex", {
        symbol: symbol.toUpperCase(),
      });
    }

    /**
     * Query Index Price Constituents <br>
     *
     * GET /fapi/v1/constituents <br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/en/#query-index-price-constituents}
     *
     * @param {string} symbol
     *
     */
    constituents(symbol) {
      validateRequiredParameters({ symbol });
      return this.publicRequest("GET", "/fapi/v1/constituents", {
        symbol: symbol.toUpperCase(),
      });
    }
  };

module.exports = Market;
