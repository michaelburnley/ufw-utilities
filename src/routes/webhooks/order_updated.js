import _ from "lodash";
import shopify from "../../../config/shopify.js";
import moment from 'moment'

const GetMonthWeek = (date) => {

  var day = moment(date).day(); //6 = saturday
  var nthOfMoth = Math.ceil(moment(date).date() / 7); //1

  var currMonthName  = moment(date).format('MMMM');
  return currMonthName + nthOfMoth;
}

const GetFormattedDate = (item) => {
  const date = moment(item).set('year', moment().year()).format('M/D');
  return date;
}

const locations = {
  106262790459: "San Bernardino",
  88475402555: "Pomona"
}

export default async (req, res) => {
  res.sendStatus(200);

  const order = req.body;

  const { note, line_items } = order;

  const note_test = _.split(note, "\n");
  const tags = [];

  if (order.location_id) {
    const location_tag = locations[order.location_id];

    tags.push(location_tag);
  }

  if (!order.customer) {
      const payload = {
        tags: _.uniq(tags),
      };


      try {
        await shopify.order.update(order.id, payload);
      } catch (err) {
        console.log(`Error uploading tags for ${order.id}: ${err}`);
      }
    return;
  }

  const note_attributes = [];

  tags.push(..._.split(order.tags, ","));
  note_attributes.push(...order.note_attributes);

  _.each(note_test, (line) => {
    const item = _.trim(_.last(_.split(line, ": ")));
    const note_line = _.lowerCase(line);

    if (_.includes(note_line, "delivery time")) {
      tags.push("delivery");

      note_attributes.push({
        name: "Delivery Time",
        value: item,
      });
    }
    if (_.includes(note_line, "delivery date")) {
      tags.push("delivery");

      const date = moment(item).set('year', moment().year()).format('M/D');
      const month_week = GetMonthWeek(item);
      tags.push(month_week);

      note_attributes.push({
        name: "Delivery Date",
        value: item,
      });
    }

    if (_.includes(note_line, "address")) {
      note_attributes.push({
        name: "Delivery Address",
        value: item,
      });
    }
    if (_.includes(note_line, "drop off")) {
    const date = moment(item).set('year', moment().year()).format('M/D');
    const month_week = GetMonthWeek(item);
    tags.push(month_week);
      note_attributes.push({
        name: "Pickup Date",
        value: date,
      });
      tags.push("drop-offs");
    }



    if (_.includes(note_line, "pickup time") || _.includes(note_line, "pick up time")) {
note_attributes.push({
        name: "Pickup Time",
        value: item,
      });
    } else if (_.includes(note_line, "pickup") || _.includes(note_line, "pick up")) {
          const date = moment(item).set('year', moment().year()).format('M/D');
          const month_week = GetMonthWeek(item);

      tags.push("orders");
      tags.push(month_week);
      note_attributes.push({
        name: "Pickup Date",
        value: date,
      });
    }
  });

  _.each(line_items, (item) => {
    const product_name = _.lowerCase(item.name);

    if (
      _.includes(product_name, "funeral") ||
      _.includes(product_name, "bridal") ||
      _.includes(product_name, "bridesmaid") ||
      _.includes(product_name, "buchon") ||
      _.includes(product_name, "arrangement") ||
      _.includes(product_name, "centerpiece") ||
      _.includes(product_name, "corsage") ||
      _.includes(product_name, "bouquet") ||
      _.includes(product_name, "boutonn")
    ) {

      if (order.note && !_.includes(product_name, "tropical bouquet")) {
        tags.push("orders letty");
        tags.push("orders");
      }
    }

    if (_.includes(product_name, "valentines pre-order")) tags.push("vday");
    if (_.includes(product_name, "valentines mix box"))
      tags.push("mother's day");
    if (_.includes(product_name, "mothers day pre")) tags.push("mother's day");

    // console.log(product_name);
    if (_.includes(product_name, "mothers day mix box"))
      tags.push("mother's day");

    if (_.includes(product_name, "floral workshop fee")) tags.push("workshop");
    if (_.includes(product_name, "orchid graduation lei") && order.note) tags.push("leis");

    if (
      _.includes(product_name, "bunch of 25 roses") ||
      _.includes(product_name, "spray roses / mini roses (shipped)") ||
      _.includes(product_name, "gypsophilia (shipped)")
    )
      tags.push("Farm Direct");
  });

    if (_.includes(tags, "completed")) {
      note_attributes.push({
        name: "Completion Date",
        value: moment().format("M/D/YYY"),
      })
    }


  const payload = {
    note_attributes,
    tags: _.uniq(tags),
  };


  try {
    await shopify.order.update(order.id, payload);
  } catch (err) {
    console.log(`Error uploading tags for ${order.id}: ${err}`);
  }

};


