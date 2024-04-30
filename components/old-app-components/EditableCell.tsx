"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { TableCell } from "../ui/table";
import { Pen } from "lucide-react";
import axios from "axios";
import { useTableLoadingStore } from "@/hooks/tableLoading.hook";
import { Text } from "../app-components/typography";

export const EditableCell = ({
  children,
  overall,
}: {
  children: string | number;
  overall: any;
}) => {
  const [text, setText] = useState<string | number>(children);
  const [newText, setNewText] = useState<string | number>(children);

  const [saving, setSaving] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const store: any = useTableLoadingStore();

  useEffect(() => {
    if (saving) {
      store.setLoading();
      axios
        .post(`http://localhost:3001/patients/update/${overall.patient_id}`, {
          full_name: newText.toString().trim(),
        })
        .then(() => {
          store.notLoading();
          setSaving(false);
          setText(newText);
        });
    }
  }, [saving]);

  const keydownEvent = (event: any) => {
    if (event.key.toLowerCase() === "enter") {
      setEditing(false);
      setSaving(true);
      return;
    }

    if (event.key.toLowerCase() === "escape") {
      setEditing(false);
      setNewText(text);
      return;
    }
  };

  const Children = (): ReactElement => {
    if (!editing) {
      return <Text>{text}</Text>;
    } else {
      return (
        <input
          className="h-5 bg-inherit w-auto border-1 outline-none border-0 font-medium text-[15px]"
          autoFocus
          onKeyDown={keydownEvent}
          onBlur={() => {
            setNewText(text);
            setEditing(false);
          }}
          onChange={(event) => {
            setNewText(event.target.value);
          }}
          value={newText}
        />
      );
    }
  };

  return (
    <TableCell
      onClick={() => {
        setEditing(true);
      }}
      className="flex flex-row items-center gap-2 hover:underline cursor-default"
    >
      <Children /> <Pen size={12} strokeWidth={2.75} />
    </TableCell>
  );
};
