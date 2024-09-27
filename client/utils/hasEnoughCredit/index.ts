export const hasEnoughCredit = ({
  balance,
  cost,
}: {
  balance: number;
  cost: number;
}) => {
  const hasEnoughCredit = balance >= cost;
  if (!hasEnoughCredit)
    throw new Error("You don't have enough credits for this!");
};
