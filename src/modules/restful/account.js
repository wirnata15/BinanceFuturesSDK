"use strict";

const { validateRequiredParameters } = require("../../helpers/validation");

/**
 * API market endpoints
 * @module Market
 * @param {*} superclass
 */
const Account = (superclass) =>
  class extends superclass {
    /**
     * Futures Account Balance V3 (USER_DATA)<br>
     *
     * GET /fapi/v3/balance <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Account-Balance-V3}
     */
    futuresAccountBalanceV3() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v3/balance",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Futures Account Balance V2 (USER_DATA)<br>
     *
     * GET /fapi/v2/balance <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Account-Balance-V2}
     */
    futuresAccountBalanceV2() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v2/balance",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Account Information V3(USER_DATA) <br>
     *
     * GET /fapi/v3/account <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Information-V3}
     */
    accountInformationV3() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v3/account",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Account Information V2(USER_DATA) <br>
     *
     * GET /fapi/v2/account <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Information-V2}
     */
    accountInformationV2() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v2/account",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * User Commission Rate (USER_DATA) <br>
     *
     * GET /fapi/v1/commissionRate <br>
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/User-Commission-Rate}
     */
    userComissionRate() {
      validateRequiredParameters({ symbol, timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/commissionRate",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Futures Account Configuration(USER_DATA) <br>
     *
     * GET /fapi/v1/accountConfig <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Config}
     */
    futuresAccountConfiguration() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/accountConfig",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Symbol Configuration(USER_DATA) <br>
     *
     * GET /fapi/v1/symbolConfig <br>
     *
     * @param {string} symbol
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Symbol-Config}
     */
    futuresSymbolConfiguration() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/symbolConfig",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * User's Force Orders (USER_DATA) <br>
     *
     * GET /fapi/v1/rateLimit/order <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Query-Rate-Limit}
     */
    queryOrderRateLimit() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/rateLimit/order",
        Object.assign(options, {
          symbol: symbol.toUpperCase(),
          timestamp,
        })
      );
    }

    /**
     * Notional and Leverage Brackets (USER_DATA) <br>
     *
     * GET /fapi/v1/leverageBracket <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Notional-and-Leverage-Brackets}
     */
    leverageBracket() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/leverageBracket",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Get Current Multi-Assets Mode (USER_DATA) <br>
     *
     * GET /fapi/v1/multiAssetsMargin <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Multi-Assets-Mode}
     */
    multiAssetMargin() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/multiAssetsMargin",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Get Current Position Mode(USER_DATA) <br>
     *
     * GET /fapi/v1/positionSide/dual <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Position-Mode}
     */
    currentPositionMode() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/positionSide/dual",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Get Income History (USER_DATA) <br>
     *
     * GET /fapi/v1/income <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {string} [options.incomeType]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.page]
     * @param {number} [options.limit]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Income-History}
     */
    getIncomeHistory() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/income",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Futures Trading Quantitative Rules Indicators (USER_DATA) <br>
     *
     * GET /fapi/v1/apiTradingStatus <br>
     *
     * @param {number} timestamp
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Trading-Quantitative-Rules-Indicators}
     */
    apiTradingStatus() {
      validateRequiredParameters({ timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/apiTradingStatus",
        Object.assign(options, {
          timestamp,
        })
      );
    }

    /**
     * Get Download Id For Futures Transaction History(USER_DATA) <br>
     *
     * GET /fapi/v1/income/asyn <br>
     *
     * @param {number} startTime
     * @param {number} endTime
     * @param {number} timestamp
     * @param {object} [options]
     * @param {number} [options.recvWindow]
     *
     * {@link https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Download-Id-For-Futures-Transaction-History}
     */
    getDownloadIdTransactionHistory() {
      validateRequiredParameters({ startTime, endTime, timestamp });
      return this.publicRequest(
        "GET",
        "/fapi/v1/income/asyn",
        Object.assign(options, {
          startTime,
          endTime,
          timestamp,
        })
      );
    }
  };

module.exports = Account;
