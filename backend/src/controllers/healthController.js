const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "EcoTrade Campus API Running"
  });
};

module.exports = {
  healthCheck
};