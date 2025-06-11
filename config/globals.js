import _ from "lodash";
import Sequelize from "sequelize";
import shopify from "./shopify";

export default () => {
  global._ = _;
  global.Sequelize = Sequelize;
  global.Shopify = shopify;
};
