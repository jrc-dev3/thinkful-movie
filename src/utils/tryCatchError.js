const tryCatchError = (delegate) => {
  return async (req, res, next) => {
    try {
      return delegate(req, res, next);
    } catch (error) {
      const { status = 500, message = "Something went wrong!" } = error;
      next({
        status,
        message,
      });
    }
  };
};

module.exports = tryCatchError;
