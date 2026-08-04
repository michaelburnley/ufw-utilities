import { DataTypes } from "sequelize";

export default {
  attributes: {
    id: { type: DataTypes.BIGINT, primaryKey: false },
    option1: { type: DataTypes.STRING },
    option2: { type: DataTypes.STRING },
    option3: { type: DataTypes.STRING },
    weight: { type: DataTypes.DATE },
    compare_at_price: { type: DataTypes.DATE },
    inventory_management: { type: DataTypes.STRING },
    available: { type: DataTypes.STRING },
    sku: { type: DataTypes.STRING },
    requires_shipping: { type: DataTypes.STRING },
    taxable: { type: DataTypes.STRING },
    barcode: { type: DataTypes.STRING },
  },
  options: {},
};
