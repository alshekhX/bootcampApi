//@des     get all bootcamps
//@route   GET :'api/v1/bootcamps'
//@access   'public'

exports.getBootCamps = (req, res, next) => {
  res.status(200).json({
    status: "show all booty",
    hellp: req.hello,
  });
};

//@des     get one bootcamps
//@route   GET :'api/v1/bootcamps/:id'
//@access   'public'

exports.getBootCamp = (req, res, next) => {
  res.status(200).json({
    status: `show some booty ${req.params.id}`,
  });
};

//@des     post bootcamps
//@route   POST :'api/v1/bootcamps'
//@access   'private'
exports.postBootCamp = (req, res, next) => {
  res.status(200).json({
    status: "send some booty",
  });
};

//@des     update bootcamps
//@route   PUT :'api/v1/bootcamps'
//@access   'public'
exports.putBootCamp = (req, res, next) => {
  res.status(200).json({
    status: `update  booty number ${req.params.id}`,
  });
};

//@des     delete bootcamps
//@route   DELETE :'api/v1/bootcamps'
//@access   'private'

exports.deleteBootCamp = (req, res, next) => {
  res.status(200).json({
    status: `delete booty number ${req.params.id}`,
  });
};
