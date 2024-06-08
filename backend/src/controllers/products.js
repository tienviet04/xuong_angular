import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel";
import ApiError from "../utils/ApiError";
import Bid from "../models/BidModel";
import User from "../models/UserModel";

class ProductsController {
  // GET /products
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find().populate("category");
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }
  //Search
  async search(req, res) {
    try {
      const { q } = req.query;
      const prd = await Product.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
        ],
      }).populate("category")
      res.status(200).json({
        message: "success",
        data: prd,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  // GET /products/:id
  async getProductDetail(req, res, next) {
    try {
      const product = await Product.findById(req.params.id).populate({
        path: "bids",
        populate: {
          path: "user",
          model: User,
          select: "email username",
        },
      }).populate('category')

      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  }
  // POST /products
  async createProduct(req, res, next) {
    try {
      const endAtTime =
        new Date(req.body.startAt).getTime() + req.body.bidTime * 60 * 1000;

      const newProduct = await Product.create({
        ...req.body,
        endAt: new Date(endAtTime),
      });
      res.status(StatusCodes.CREATED).json({
        message: "Create Product Successfull",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  // PUT /products/:id
  async updateProduct(req, res, next) {
    try {
      const endAtTime =
        new Date(req.body.startAt).getTime() + req.body.bidTime * 60 * 1000;
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, endAt: new Date(endAtTime) },
        { new: true }
      );
      if (!updateProduct) throw new ApiError(404, "Product Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Product Successfull",
        data: updateProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /products/:id
  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Product Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductsController;
