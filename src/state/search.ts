import { reactive } from 'vue';

export interface Search {
  baseUrl: string;
  query: string;
  page: number;
  perPage: number;
  key: string|null;
  sortDirection: 'asc'|'desc';
  sortField: 'id'|'updated_at'|'first_seen_at'|'aspect_ratio'|'faves'|'upvotes'|'downvotes'|'score'|'wilson_score'|'_score'|'width'|'height'|'comment_count'|'tag_count'|'pixels'|'size'|'duration'|'random';
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
