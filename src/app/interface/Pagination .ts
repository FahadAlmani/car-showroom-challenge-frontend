export default interface Pagination<T> {
  content: T[];
  number: number;
  numberOfElement: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
