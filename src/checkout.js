const { DiscountsCalculator } = require('./discountsCalculator');

/** Class representing a Checkout Process Handler */
class Checkout {
  /**
   * create a checkout process handler
   * @param {Object} rules - the products configuration
   */
  constructor(rules) {
    this.scannedProds = [];
    this.rules = rules;
    this.totalBeforeDiscount = 0;
    this.dc = new DiscountsCalculator();
  }

  /**
   * If valid, add a product
   * @param {string} productCode
   */
  scan(productCode) {
    const prod = this.rules[productCode];
    if (prod) {
      this.scannedProds.push(productCode);
      this.totalBeforeDiscount += prod.price;
    }
  }

  /**
   * getTotal with the discounts already applied
   * @return {number} - the calculated total (after discounts)
   */
  getTotal() {
    const total = this.totalBeforeDiscount - this.dc.getDiscount(this.scannedProds);
    return total;
  }
}

exports.Checkout = Checkout;
