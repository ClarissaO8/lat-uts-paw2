import z from "zod";

export const storeBukuSchema = z.object({
    judul_buku: z.string().trim().min(3, "Judul buku minimal 3 karakter"),
    penulis: z.string().trim().min(3, "Nama penulis minimal 3 karakter"),
    tahun_terbit: z.number().int().min(1000, "Tahun terbit tidak valid"),
});

export const updateBukuSchema = z.object({
    judul_buku: z.string().trim().min(3, "Judul buku minimal 3 karakter").optional(),
    penulis: z.string().trim().min(3, "Nama penulis minimal 3 karakter").optional(),
    tahun_terbit: z.number().int().min(1000, "Tahun terbit tidak valid").optional(),
});