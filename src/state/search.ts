import { reactive } from 'vue';
import { SortDirection, SortField } from '@/types/search-types';

export interface Search {
  baseUrl: string;
  query: string;
  page: number;
  perPage: number;
  key: string|null;
  sortDirection: SortDirection;
  sortField: SortField;
}

export default reactive<Search>({
  baseUrl: 'https://derpibooru.org',
  query: '*',
  page: 1,
  perPage: 50,
  key: null,
  sortDirection: 'desc',
  sortField: 'id',
});
