
export interface Photo {
  id: string;
  url: string;
  caption: string;
  year?: string;
  category: 'Childhood' | 'Education' | 'Career' | 'Family' | 'Wedding' | 'Celebration';
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  photos: Photo[];
}
