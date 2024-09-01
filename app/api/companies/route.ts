import { companyServices } from "@/server";

export async function POST(request: Request) {
  if (request.headers.get("action") === "create_or_find_company") {
    const company = await companyServices.createOrFind({
      email: "rafaelsanfischer@gmail.com",
    });

    return Response.json({
      data: company,
    });
  }

  if (request.headers.get("action") === "create_transaction") {
    const company = await companyServices.createTransaction({
      currency: request.body.currency,
    });

    return Response.json({
      data: company,
    });
  }

  return Response.json({
    data: "Hi",
  });
}
