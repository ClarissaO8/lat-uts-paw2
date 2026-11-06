import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        judul_buku: {
            type: String,
            required: true,
        },
        penulis: {
            type: String,
            required: true,
        },
        tahun_terbit: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const BukuModel = mongoose.model("Buku", schema);

export default BukuModel;