export interface SasaranBakPan {
  amunisi: number;
  nilai: number;
  urutan: number;
}

export interface SikapBakPan {
  id: number;
  nama: string;
  amunisi: number;
  amunisi_kena_sasaran: number;
  bak_pan_id: number;
  sasaran_bak_pan: SasaranBakPan[];
}

export interface BakPan {
  id: number;
  jarak: string;
  tanggal: string;
  nilai_akhir: number;
  keterangan: string;
  amunisi: number;
  created_at: string;
  updated_at: string;
  prajurit_id: string;
  sikap_bak_pan: SikapBakPan[];
}
