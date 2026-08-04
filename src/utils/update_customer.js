import _ from "lodash";
// import shopify from "../../../config/shopify.js";

// export default async (customer, payload) => {

//     const {
//         location,
//     } = payload;


//     const tags = _.split(customer.tags);

//     if (!_.includes(tags, location)) tags.push(location);

//     try {
//         await shopify.customer.update(customer.id, { tags: _.join(tags)});
//     } catch (err) {
//         console.log(`Error updating customer: ${customer.id}`);
//     }
// }