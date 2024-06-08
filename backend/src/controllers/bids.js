import { StatusCodes } from "http-status-codes";
import Bid from "../models/BidModel";
import ApiError from "../utils/ApiError";
import Product from "../models/ProductModel";

class BidsController {
  // POST /bids
  async createBid(req, res, next) {
    try {
      const newBid = await Bid.create(req.body);
      await Product.findByIdAndUpdate(req.body.product, {
        bids: [...req.body.bids, newBid._id],
        bidPriceMax:
          req.body.price > req.body.bidPriceMax
            ? req.body.price
            : req.body.bidPriceMax,
      },
    { new: true }
      );
      res.status(StatusCodes.CREATED).json({
        message: "Create Bid Successfull",
        data: newBid,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BidsController;
