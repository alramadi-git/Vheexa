import "reflect-metadata";

import { Expose } from "class-transformer";

class Image {
  @Expose() public readonly UUID: string;
  @Expose() public readonly URL: string;

  constructor(uuid: string, url: string) {
    this.UUID = uuid;
    this.URL = url;
  }
}

export { Image };
