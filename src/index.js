const { Checkout } = require('./checkout');

/**
 * Use productsConfig.json to set the products and its associated discounts
 */
const productsConfig = require('./config/productsConfig.json');

/**
 * Use 'prods' to set the input of the getPrice method
 */
const prods = 'VOUCHER, TSHIRT, VOUCHER, VOUCHER, MUG, TSHIRT, TSHIRT';

/**
 * Get total to pay given a let of products
 * @param {string} input - list of products. It can be an Array as well.
 * @return {number} total - the total (after discounts)
 */
const getPrice = input => {
  const isAr = Array.isArray(input);
  const isString = typeof input === 'string';
  if (isAr || isString) {
    let toScan = isAr ?
      input :
      input.split(',').map(p => p.trim());
    /**
     * After some input control, scan all the products
     * and finally get the total
     */
    const co = new Checkout(productsConfig);
    const toScanLen = toScan.length;
    for (let ts = 0; ts < toScanLen; ts += 1) {
      co.scan(toScan[ts]);
    }
    return co.getTotal();
  } else {
    /**
     * Otherwise, just return a warning message
     */
    return 'Wrong Input';
  }
};

console.log('Total: ', getPrice(prods));
exports.getPrice = getPrice;
