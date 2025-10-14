class VehicleService {
  public static async GetOne(uuid: string) {
    const response = await fetch(`/api/user/vehicles/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static async GetMany() {
    const response = await fetch(
      `http://localhost:5173/api/user/vehicles?Pagination.Page=1&Pagination.PageSize=_10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export { VehicleService };
