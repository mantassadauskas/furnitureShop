export interface IOrder {
  id: string;
  date: number;
  item: IFurniture;
}

export interface IFurniture {
  id: string;
  name: string;
  size: string;
  width: string;
  length: string;
  color: string;
  material: string;
  price: string;

}
