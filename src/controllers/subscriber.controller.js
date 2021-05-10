const Subscriber = require("../models/Subscriber");

export const getSubscribers = async (req, res) => {
  let { page = 1, count = 5, criteria, sortOrder, sortType } = req.query;

  if (sortOrder && !criteria) {
    return res.json("Por favor indique un filtro de busqueda");
  } else if (criteria && !sortOrder) {
    return res.json("Por favor indique un campo para filtrar");
  }
  // criteria = String(criteria)

  let searchType = "asc";
  if (sortType) {
    if (sortType === 0) {
      searchType = "asc";
    } else if (sortType == 1) {
      searchType = "desc";
    }
  }

  const options = {
    page: page,
    limit: 5,
    collation: {
      locale: "en",
    },
    sort: { sortOrder: searchType },
  };

  let subscribers = "";
  if (sortOrder && criteria) {
    let queryParam = {};
    let sortParam = {};
    queryParam[sortOrder] = criteria;
    sortParam[sortOrder] = searchType;
    subscribers = await Subscriber.paginate(queryParam, options);
  } else {
    subscribers = await Subscriber.paginate({}, options);
    //       .sort({ sortOrder: searchType })
    //       .limit(count * 1)
    //       .skip((page - 1) * count);
  }

  // const subscribers = await Subscriber.find().sort({sortOrder: searchType}).limit(count*1).skip((page-1)*count);
  // const cantity = await Subscriber.count().limit(count*1).skip((page-1)*count)
  let cantity = subscribers.length;

  res.json({
    criteria: criteria,
    sortType: sortType,
    sortOrder: sortOrder,
    sortType: searchType,
    Count: cantity,
    Data: subscribers,
  });
};

export const getSubscriber = async (req, res) => {
  let elId = req.params.id;
  const suscriptor = await Subscriber.find({ Id: elId });
  res.json(suscriptor);
};

export const createSubscriber = async (req, res) => {
  const {
    Name,
    Email,
    CountryCode,
    CountryName,
    PhoneCode,
    PhoneNumber,
    JobTitle,
    Area,
    Topics,
  } = req.body;
  const newSubscriber = new Subscriber({
    Name,
    Email,
    CountryCode,
    CountryName,
    PhoneCode,
    PhoneNumber,
    JobTitle,
    Area,
    Topics,
    Id: Date.now(),
  });
  if (!Name) {
    return res.send(
      "Debe ingresar por lo menos el nombre y el correo electrónico"
    );
  } else if (!Email && (!CountryCode || !PhoneNumber)) {
    return res.send(
      "Se debe enviar o el correo electrónico +o el numero de teléfono y el código del país"
    );
  }
  console.log(newSubscriber);
  await newSubscriber.save();

  res.status(200).json("New subscriber created");
};

export const modifySubscriber = async (req, res) => {
  let elId = req.params.id;
  const {
    Name,
    Email,
    CountryCode,
    CountryName,
    PhoneCode,
    PhoneNumber,
    JobTitle,
    Area,
    Topics,
  } = req.body;
  await Subscriber.findOneAndUpdate(
    { Id: elId },
    {
      Name,
      Email,
      CountryCode,
      CountryName,
      PhoneCode,
      PhoneNumber,
      JobTitle,
      Area,
      Topics,
    }
  );
  res.status(200).json("User modified");
};

export const deleteSubscriber = async (req, res) => {
  let elId = req.params.id;
  await Subscriber.findOneAndDelete({ Id: elId }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete User: ", docs);
    }
  });
  res.status(200).json("User deleted sucessfully");
};
