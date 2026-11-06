import BukuModel from "../model/buku.model.js";
import { storeBukuSchema, updateBukuSchema } from "../schemas/buku.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class BukuController {
  static async index(req, res) {
    const {
      search,
      sort,
      sortBy = "createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (currentPage - 1) * perPage;

    const allowedSortFields = [
      "judul_buku",
      "penulis",
      "tahun_terbit",
      "createdAt",
      "updatedAt",
    ];

    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const filter = {};

    const sortOption = {
      [sortField]: sort === "desc" ? -1 : 1,
    };

    if (search) {
      filter.judul_buku = {
        $regex: search,
        $options: "i",
      };
    }

    try {
      const [listBuku, totalData] = await Promise.all([
        BukuModel.find(filter)
          .sort(sortOption)
          .skip(skip)
          .limit(perPage),

        BukuModel.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(totalData / perPage);

      return apiResponse({
        res,
        status: 200,
        message: "List Buku",
        data: {
          items: listBuku,
          pagination: {
            totalData,
            totalPages,
            currentPage,
            perPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
          },
        },
      });
    } catch (error) {
      return apiResponse({
        res,
        status: 500,
        message: error.message,
      });
    }
  }

  static async show(req, res) {
    const buku = await BukuModel.findById(req.params.id);

    if (!buku) {
      return apiResponse({
        res,
        status: 404,
        message: "Buku tidak ada",
        data: null,
      });
    }

    return apiResponse({
      res,
      status: 200,
      message: "Detail Buku",
      data: buku,
    });
  }

  static async store(req, res) {
    const result = storeBukuSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      });
    }

    const newBuku = await BukuModel.create(result.data);

    return apiResponse({
      res,
      status: 201,
      message: "Buku berhasil dibuat",
      data: newBuku,
    });
  }

  static async update(req, res) {
    const result = updateBukuSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      });
    }

    const buku = await BukuModel.findById(req.params.id);

    if (!buku) {
      return apiResponse({
        res,
        status: 404,
        message: "Buku tidak ada",
        data: null,
      });
    }

    const updatedBuku = await BukuModel.findByIdAndUpdate(
      req.params.id,
      result.data,
      {
        new: true,
      },
    );

    return apiResponse({
      res,
      status: 200,
      message: "Data berhasil diupdate",
      data: updatedBuku,
    });
  }

  static async delete(req, res) {
    const buku = await BukuModel.findByIdAndDelete(req.params.id);

    if (!buku) {
      return apiResponse({
        res,
        status: 404,
        message: "Buku tidak ada",
        data: null,
      });
    }

    return apiResponse({
      res,
      status: 200,
      message: "Buku berhasil dihapus",
      data: null,
    });
  }
}

export default BukuController;