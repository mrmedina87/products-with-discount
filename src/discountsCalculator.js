const _ = require('lodash');

/**
 * discounts.json is a file with the discounts description
 */
const discountsConf = require('./config/discounts.json');
const productsConfig = require('./config/productsConfig.json');

class DiscountsCalculator {
  /**
   * Calculates the discount to be applied on top of the total
   * (before discounts)
   * @param {array} scannedProds - the list of products added
   * @return {number} - get discount
   */
  getDiscount(scannedProds) {
    let discount = 0;
    const countedProds = _.countBy(scannedProds);
    /**
     * countedProds holds the ocurrencies of each valid product
     */
    const prodCodes = Object.keys(countedProds);
    const kslen = prodCodes.length;
    for (let i = 0; i < kslen; i += 1) {
      const code = prodCodes[i];
      const individualDiscount = this.getDiscountForOneItem(code, countedProds[code]);
      discount += individualDiscount;
      /**
       * Iterate over the ocurrencies object. For each prod
       * get its discount based on the prod's code and its ocurrencies
       * add the result to the accumulated discount
       */
    }
    return discount;
  }

  /**
   * Get discount for a single product
   * @param {string} code - prod's code
   * @param {number} ocurrencies - how many prods with that ID where purchased
   * @return {number} - discount for that item
   */
  getDiscountForOneItem (code, ocurrencies) {
    const {
      price,
      discountCodes,
      bulk,
    } = productsConfig[code];

    let discountForOneItem = 0;

    const discountCodesLen = discountCodes.length;

    for (let d = 0; d < discountCodesLen; d += 1) {
      const methodToUse = discountsConf[discountCodes[d]].method;
      const currentDiscount = this[methodToUse](ocurrencies, price, bulk);
      discountForOneItem += currentDiscount;
      /**
       * For each discount code in that product,
       * get the method to use to calculate,
       * use the correct method to calculate based on the ocurrencies number,
       * the price for each, and other discount optional data (like bulk)
       */
    }

    return discountForOneItem;
  }

  /**
   * retrieve the discount if the promo was 2x1
   * @param {number} ocurrencies
   * @param {number} individualPrice
   * @return {number} - the discount2x1
   */
  getTwoForOneDiscount (ocurrencies, individualPrice) {
    return parseInt(ocurrencies / 2) * individualPrice;
  }

  /**
   *
   * @param {*} ocurrencies
   * @param {*} individualPrice
   * @param {*} bulkConf - the configuration in case
   * the discount is based on bulk purchase
   * @returns - the discount Bulk Purcharse
   */
  getBulkPurchaseDiscount (ocurrencies, individualPrice, { count, price }) {
    if (ocurrencies >= count) {
      return ocurrencies * (individualPrice - price);
    }
    return 0;
  }
}

exports.DiscountsCalculator = DiscountsCalculator;
