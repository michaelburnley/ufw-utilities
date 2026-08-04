import { DataTypes } from "sequelize";

export default {
  shopify_product: {
    attributes: {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      handle: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      published_at: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      type: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      available: {
        type: DataTypes.BOOLEAN,
      },
    },
    options: {
      modelName: "product",
    },
  },
};
