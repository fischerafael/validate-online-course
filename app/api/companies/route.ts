import { companyServices } from "@/server";

export async function POST(request: Request) {
  if (request.headers.get("action") === "create_or_find") {
    const company = await companyServices.createOrFind({
      email: "rafaelsanfischer@gmail.com",
    });

    return Response.json({
      data: company,
    });
  }

  return Response.json({
    data: "Hi",
  });
}
