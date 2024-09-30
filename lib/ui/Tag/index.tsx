import { C } from "../Chakra";
import { IconHi } from "../Icons";

interface TagProps extends C.TagProps {
  children: React.ReactNode;
  hasIconLeft?: boolean;
  onClick?: () => void;
}

export const Tag = ({
  children,
  onClick,
  hasIconLeft = false,
  ...props
}: TagProps) => {
  return (
    <C.Tag
      fontWeight="regular"
      fontSize="xs"
      cursor="pointer"
      py="1"
      size="sm"
      onClick={onClick}
      {...props}
    >
      {hasIconLeft && <C.TagLeftIcon boxSize="12px" as={IconHi.HiOutlineX} />}
      {children}
    </C.Tag>
  );
};
