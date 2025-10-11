import "reflect-metadata";

import { Expose } from "class-transformer";

class Image {
  @Expose() public readonly ID: string;
  @Expose() public readonly URL: string;

  constructor(id: string, url: string) {
    this.ID = id;
    this.URL = url;
  }
}

export { Image };
