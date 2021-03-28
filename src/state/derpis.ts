// eslint-disable-next-line max-classes-per-file
import { reactive } from 'vue';

export class Derpi {
  id: number;

  url: string;

  constructor(id: number, url: string) {
    this.id = id;
    this.url = url;
  }
}

export class DerpisStore {
  derpis: Derpi[];

  constructor(derpis: Derpi[]) {
    this.derpis = derpis;
  }

  public getDerpi(id: number) : Derpi|null {
    return this.derpis.find((d) => d.id === id) ?? null;
  }
}

export default reactive<DerpisStore>(new DerpisStore([]));
