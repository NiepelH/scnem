import { Guid } from 'guid-typescript';

// structure of every site-object for viewing in lists and maps
export interface Site {
    name: string;
    no: number;
    guid: Guid;
    description: string;
    lat: number;
    lng: number;
  }
