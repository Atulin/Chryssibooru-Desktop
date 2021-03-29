import axios from 'axios';
import { PhilomenaResponse } from '@/types/derpi-types';
import DerpisSource from '@/state/derpis';
import SearchSource from '@/state/search';
import URI from 'urijs';
import { isNullOrWhitespace } from '@/helpers';

function createQuery(): string {
  const url = URI(SearchSource.baseUrl)
    .directory('/api/v1/json/search/')
    .search({
      q: isNullOrWhitespace(SearchSource.query) ? '*' : SearchSource.query,
      page: SearchSource.page.toString(),
      per_page: SearchSource.perPage.toString(),
      sd: SearchSource.sortDirection,
      sf: SearchSource.sortField,
    } as URI.QueryDataMap);
  if (SearchSource.key !== null) url.addSearch({ key: SearchSource.key });
  return url.toString();
}

export default async function load(): Promise<boolean> {
  try {
    const { data } = await axios.get<PhilomenaResponse>(createQuery());
    data.images.forEach((i) => {
      if (![...DerpisSource.derpis].some((d) => d.id === i.id)) { DerpisSource.derpis.add(i); }
    });
    return true;
  } catch (e) {
    return false;
  }
}
