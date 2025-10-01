export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      console.log("TRY", err);
      
      await controller(req, res, next);
    } catch (err) {
      // console.log("error", err);
      next(err);
    }
  };
};

