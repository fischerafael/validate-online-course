import { organisations } from "@/lib/organisations";
import {
  Currency,
  TransactionStatus,
  TransactionType,
} from "@/lib/organisations/entities";

export async function POST(request: Request) {
  const { headers } = request;
  try {
    if (headers.get("action") === "create_or_find_company") {
      const body = await request.json();

      const company = await organisations.companyServices.createOrFind({
        email: body.email as string,
      });

      return Response.json({
        data: company,
      });
    }

    if (headers.get("action") === "create_transaction") {
      const body = await request.json();

      const company = await organisations.companyServices.createTransaction({
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

      await organisations.companyServices.confirmTransaction({
        companyId: body.companyId,
        transactionId: body.transactionId,
      });

      return Response.json({
        data: "Ok",
      });
    }
  } catch (e: any) {
    const error = JSON.stringify(e);
    return Response.json(
      {
        message: "something went wrong",
        error,
      },
      {
        status: 400,
      }
    );
  }
}
