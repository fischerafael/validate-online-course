import { useState } from "react";
import { IOption, InputSelect, InputSelectProps } from "../InputSelect";

import { C } from "../Chakra";
import { Tag } from "../Tag";

interface InputSelectMultipleProps extends InputSelectProps {
  updateOptions: (options: IOption[]) => void;
}

export const InputSelectMultiple = ({
  value,
  options,

  updateOptions,
  ...props
}: InputSelectMultipleProps) => {
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const placeholderOption: IOption = {
    key: "0",
    value: "Select",
  };

  const syncState = (updatedOptions: IOption[]) => {
    setSelectedOptions(updatedOptions);
    updateOptions(updatedOptions);
  };

  const onRemove = (optionKey: string) => {
    const updated = selectedOptions.filter((op) => op.key !== optionKey);
    syncState(updated);
  };

  const onSelect = (optionValue: string) => {
    const option = options?.find((op) => op.value === optionValue)!;
    const alreadySelected = selectedOptions.some(
      (selected) => selected.key === option?.key
    );
    if (alreadySelected) return;
    const updated = [...selectedOptions, option];
    syncState(updated);
  };

  const filteredOptions = [
    placeholderOption,
    ...(options?.filter((op) => {
      const isSelected = selectedOptions.some(
        (option) => option.key === op.key
      );
      return !isSelected;
    }) || []),
  ];

  return (
    <C.VStack w="full" spacing="2">
      <InputSelect
        onChange={(e) => onSelect(e.target.value)}
        options={filteredOptions}
        value={value}
        size={"sm"}
        {...props}
      />
      <C.HStack justify="flex-start" flexFlow="wrap" w="full">
        {selectedOptions.map((selected) => (
          <Tag key={selected.key} onClick={() => onRemove(selected.key)}>
            {selected.value}
          </Tag>
        ))}
      </C.HStack>
    </C.VStack>
  );
};
