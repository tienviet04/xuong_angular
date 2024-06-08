import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BidSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    price: {
      type: Number,
      required: true,
    },
    isWidBid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Bid = mongoose.model("Bid", BidSchema);

export default Bid;
