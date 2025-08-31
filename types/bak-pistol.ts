export interface SasaranBakPistol {
  amunisi: number;
  nilai: number;
  urutan: number;
}

export interface BakPistol {
  id: number;
  jarak: string;
  tanggal: string;
  nilai_akhir: number;
  keterangan: string;
  amunisi: number;
  amunisi_kena_sasaran: number;
  created_at: string;
  updated_at: string;
  prajurit_id: string;
  sasaran_bak_pistol: SasaranBakPistol[];
}
