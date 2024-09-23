export interface IPropertyBase {
  id: number;
  name: string;
  propertyType: string;
  price: number | null;
  fType: string;
  bhk: number;
  builtArea: number | null;
  city: string;
  readyToMove: boolean;
  image?: string;
  security: number | null;
  maintenance: number | null;
  carpetArea: number | null;
  floor: number | null;
  totalFloor: number | null;
  address: string;
  landmark: string;
  possessionDate: Date | null;
  ageOfProperty: number | null;
  gatedCommunity: number; // 0 or 1
}
