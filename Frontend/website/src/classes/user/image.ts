import type { tImageModel } from "@/models/image";

class clsImage {
  public uuid: string;
  public url: string;

  public constructor(image: tImageModel) {
    this.uuid = image.uuid;
    this.url = image.url;
  }
}

export { clsImage };
