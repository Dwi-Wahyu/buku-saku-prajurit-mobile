export interface LatihanSatuan {
  id: number;
  nilai: number;
  keterangan: string;
  tanggal: string;
  nama: string;
  deskripsi: string;
  kesatuan_id: string;
  created_at: string;
  updated_at: string;
}

export interface UtpUtpUmumDanJabatanOptions {
  tingkat_kecakapan: string;
}

export interface Utp {
  id: number;
  nilai_umum: number;
  nilai_jabatan: number;
  keterangan: string;
  tanggal: string;
  created_at: string;
  updated_at: string;
  utp_umum_dan_jabatan_options_id: number;
  prajurit_id: string;
  pangkat_id: number;
  utp_umum_dan_jabatan_options: UtpUtpUmumDanJabatanOptions;
}

export interface NilaiLatihan {
  latihan_satuan: LatihanSatuan[];
  utp: Utp;
}
