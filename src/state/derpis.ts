import { reactive } from 'vue';
import { clamp } from '@/helpers';
import { DerpiImage } from '@/types/derpi-types';

export class DerpisStore {
  derpis: Set<DerpiImage>;

  constructor(derpis: Set<DerpiImage>) {
    this.derpis = derpis;
  }

  public getDerpi(id: number) : DerpiImage {
    return [...this.derpis][clamp(id, 0, this.derpis.size - 1)];
  }

  public clear() : void {
    this.derpis = new Set<DerpiImage>();
  }
}

export default reactive<DerpisStore>(new DerpisStore(new Set<DerpiImage>()));
