import {
  companyServices,
  Currency,
  TransactionStatus,
  TransactionType,
} from "@/server/services/company";

export async function POST(request: Request) {
  const { headers, json } = request;
  if (headers.get("action") === "create_or_find_company") {
    const body = await request.json();

    const company = await companyServices.createOrFind({
      email: body.email as string,
    });

    return Response.json({
      data: company,
    });
  }

  if (headers.get("action") === "create_transaction") {
    const body = await request.json();

    const company = await companyServices.createTransaction({
      email: body.email as string,
      type: body.type as TransactionType,
      product: body.product as string,
      quantity: body.quantity as number,
      total: body.total as number,
      currency: body.currency as Currency,
      status: body.status as TransactionStatus,
    });

    return Response.json({
      data: company,
    });
  }

  if (headers.get("action") === "confirm_transaction") {
    const body = await request.json();

    await companyServices.confirmTransaction({
      companyId: body.companyId,
      transactionId: body.transactionId,
    });

    return Response.json({
      data: "Ok",
    });
  }

  return Response.json({
    data: "Hi",
  });
}
