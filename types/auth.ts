export interface UserProfile {
  golongan: number;
  jenis_kelamin: string;
  pangkat: {
    name: string;
  };
  umur: number;
  berat_badan: number;
  tinggi_badan: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  avatar: string;
  lastLogin: string;
  role: 'admin' | 'penilai' | 'user' | string;
  kesatuan_id: string;
  profile: UserProfile;
}
