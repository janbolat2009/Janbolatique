module.exports = (request, response) => {
  response.setHeader("Cache-Control", "no-store");
  response.status(200).json({
    ...(process.env.BOOKING_URL ? { bookingUrl: process.env.BOOKING_URL } : {}),
    ...(process.env.CONTACT_ENDPOINT ? { contactEndpoint: process.env.CONTACT_ENDPOINT } : {})
  });
};
